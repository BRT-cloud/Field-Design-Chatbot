import JSZip from 'jszip';
import { HWPX_TEMPLATE_BASE64 } from './hwpx-template-base64.js';

/**
 * 안전한 XML 이스케이프 유틸리티
 */
export function escapeXml(unsafe) {
  if (!unsafe) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * plan 객체와 차시 목록을 받아 실제 유효한 .hwpx 파일을 생성하고 다운로드합니다.
 * 표준 공문서 양식 필드(제목, 요약설명, 작성기관, 본문 상세)에 데이터를 주입합니다.
 */
export async function generateAndDownloadHwpx(plan, periodsList) {
  try {
    // 1. base64 템플릿 디코딩
    const binaryString = atob(HWPX_TEMPLATE_BASE64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const zip = await JSZip.loadAsync(bytes.buffer);

    // 2. section0.xml 로드
    let secXml = await zip.file("Contents/section0.xml").async("string");

    // 3. 문서 메타데이터 및 본문 구성
    const docTitle = `2026학년도 ${plan.schoolLevel || '특수학교'} 현장체험학습 운영 계획(안)`;
    const orgName = `${plan.schoolLevel || '학교'} 특수학급`;
    const docSummary = `1. 주제: ${plan.theme || '체험학습'} | 2. 장소: ${plan.locationName || '현장'} | 3. 차시: 총 ${plan.periodCount || 10}차시 (${plan.difficultyLevel || '기본 수준'})`;

    const bodyParagraphs = [
      `1. 추진 목적 및 개요`,
      `  가. 주제: ${plan.theme || '체험학습'}`,
      `  나. 장소: ${plan.locationName || '현장'} (총 ${plan.periodCount || 10}차시 / ${plan.difficultyLevel || '기본 수준'})`,
      `  다. 주요 수업 방식: ${plan.teachingMethod || '프로젝트 학습'}`,
      ``,
      `2. 연계 교육과정 성취기준`,
      ...(plan.standards || []).map(s => `  - ${s.code} ${s.title}: ${s.desc || ''}`),
      ``,
      `3. 체험학습 목표 (3차원 학습 목표)`,
      `  가. [지식·이해] ${plan.goalKnowledge || ''}`,
      `  나. [기능·수행] ${plan.goalSkill || ''}`,
      `  다. [가치·태도] ${plan.goalAttitude || ''}`,
      ``,
      `4. 학생 맞춤형 지원 및 안전 대책 (개인식별정보 배제)`,
      ...(plan.functionalNeeds || []).map(fn => `  - ${fn}`),
      ``,
      `5. 차시별 세부 운영 계획 (사전·현장·사후 로드맵)`,
      ...(periodsList || []).flatMap(p => [
        `  [${p.num}차시 / ${p.phaseBadge || '수업'}] ${p.title} (연계: ${(p.standardsCodes || []).join(', ') || '공통'})`,
        `    - 주요 활동: ${p.summary || ''}`,
        `    - 평가 관점: ${p.eval || ''}`
      ]),
      ``,
      `6. 안전지도 및 비상 대책`,
      `  가. 사전 답사를 통한 배리어 프리(무단차, 경사로, 비상구) 동선 확보`,
      `  나. 돌발 상황 대비 1:1 보조인력 배치 및 비상연락망 유지`,
      `  다. 학생 특성별 보완대체의사소통(AAC) 도구 및 비상 명찰 착용`
    ];

    // 4. 누름틀 필드 치환 (CLICK_HERE)
    // 4-1. 제목 필드
    const titleRegex = /(<hp:fieldBegin\b[^>]*name=["']제목["'][^>]*>[\s\S]*?<\/hp:fieldBegin><\/hp:ctrl>)/;
    if (titleRegex.test(secXml)) {
      secXml = secXml.replace(titleRegex, `$1<hp:t>${escapeXml(docTitle)}</hp:t>`);
    }

    // 4-2. 작성기관 필드
    const orgRegex = /(<hp:fieldBegin\b[^>]*name=["']작성기관["'][^>]*>[\s\S]*?<\/hp:fieldBegin><\/hp:ctrl>)/;
    if (orgRegex.test(secXml)) {
      secXml = secXml.replace(orgRegex, `$1<hp:t>${escapeXml(orgName)}</hp:t>`);
    }

    // 4-3. 요약설명 필드
    const summaryRegex = /(<hp:fieldBegin\b[^>]*name=["']요약설명["'][^>]*>[\s\S]*?<\/hp:fieldBegin><\/hp:ctrl>)/;
    if (summaryRegex.test(secXml)) {
      secXml = secXml.replace(summaryRegex, `$1<hp:t>${escapeXml(docSummary)}</hp:t>`);
    }

    // 4-4. 본문 단락들을 section0.xml의 문서 끝</hs:sec> 직전에 깔끔한 단락 태그로 추가
    const extraParagraphsXml = bodyParagraphs.map((line, pIdx) => {
      const escaped = escapeXml(line);
      return `<hp:p id="${1900000000 + pIdx}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:t>${escaped}</hp:t></hp:run></hp:p>`;
    }).join("");

    secXml = secXml.replace("</hs:sec>", `${extraParagraphsXml}</hs:sec>`);

    zip.file("Contents/section0.xml", secXml);

    // 5. 미리보기 텍스트 파일(Preview/PrvText.txt) 동기화
    const prvText = `${docTitle}\n${orgName}\n\n${docSummary}\n\n${bodyParagraphs.join("\n")}`;
    zip.file("Preview/PrvText.txt", prvText);

    // 6. .hwpx Zip 바이너리 생성
    const blob = await zip.generateAsync({
      type: "blob",
      mimeType: "application/hwp+zip",
      compression: "DEFLATE",
      compressionOptions: { level: 6 }
    });

    // 7. 브라우저 안전 다운로드 트리거 (지연 URL 해제로 브라우저 안정성 보장)
    const safeName = (plan.locationName || "현장체험학습").replace(/[\/\\:*?"<>|]/g, "_").trim();
    const fileName = `현장체험학습_계획서_${safeName}.hwpx`;

    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 브라우저가 다운로드를 완료할 때까지 안전하게 지연 해제
    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl);
    }, 1500);

    return true;
  } catch (err) {
    console.error("HWPX 생성 및 다운로드 오류:", err);
    throw err;
  }
}
