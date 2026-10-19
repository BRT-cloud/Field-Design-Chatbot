import JSZip from 'jszip';
import { HWPX_TEMPLATE_BASE64 } from './hwpx-template-base64.js';

/**
 * 안전한 XML 이스케이프 유틸리티
 */
export function escapeXml(unsafe) {
  if (unsafe === null || unsafe === undefined) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * 학년도 산출 헬퍼: 사용자가 지정한 academicYear가 있으면 사용,
 * 없으면 8월 이후는 다음 학년도, 그 외는 당해 연도로 기본 지정
 */
export function getAcademicYear(plan) {
  if (plan && plan.academicYear) {
    const parsed = parseInt(plan.academicYear, 10);
    if (!isNaN(parsed) && parsed > 2000) return parsed;
  }
  const now = new Date();
  return now.getMonth() >= 8 ? now.getFullYear() + 1 : now.getFullYear();
}

/**
 * 문서 데이터 모델 단일 진실 공급원(SSOT)
 * HWPX, 클립보드 복사 텍스트, 11단계 미리보기, 인쇄 뷰에서 공통 사용
 */
export function buildPlanDocument(plan, periodsList) {
  const year = getAcademicYear(plan);
  const schoolLevel = plan.schoolLevel || '특수학교';
  const docTitle = `${year}학년도 ${schoolLevel} 특수학급 현장체험학습 운영 계획(안)`;
  const orgName = `${schoolLevel} 특수학급`;
  const locationName = plan.locationName || '현장체험학습지';
  const periodCount = plan.periodCount || 10;
  const difficultyLevel = plan.difficultyLevel || '기본/적용 수준';
  const teachingMethod = plan.teachingMethod || '프로젝트 학습';
  const theme = plan.theme || '지역사회 탐색 및 자립생활 프로젝트';

  const docSummary = `1. 주제: ${theme} | 2. 장소: ${locationName} | 3. 차시: 총 ${periodCount}차시 (${difficultyLevel})`;

  const bodyParagraphs = [
    `1. 추진 목적 및 개요`,
    `  가. 주제: ${theme}`,
    `  나. 장소: ${locationName} (총 ${periodCount}차시 / ${difficultyLevel})`,
    `  다. 주요 수업 방식: ${teachingMethod}`,
    ``,
    `2. 연계 교육과정 성취기준`,
    ...(plan.standards && plan.standards.length > 0
      ? plan.standards.map(s => `  - ${s.code} ${s.title || s.subject || ''}: ${s.desc || ''}`)
      : [`  - [공통] 실생활 중심 자립생활 및 지역사회 적응 기술`]),
    ``,
    `3. 체험학습 목표 (3차원 학습 목표)`,
    `  가. [지식·이해] ${plan.goalKnowledge || `${locationName}의 환경 및 이용 방법을 이해한다.`}`,
    `  나. [기능·수행] ${plan.goalSkill || '필요한 활동을 스스로 선택하고 안전하게 완수한다.'}`,
    `  다. [가치·태도] ${plan.goalAttitude || '자립심과 공공장소 에티켓을 기른다.'}`,
    ``,
    `4. 학생 맞춤형 지원 및 안전 대책 (개인식별정보 배제)`,
    ...(plan.functionalNeeds && plan.functionalNeeds.length > 0
      ? plan.functionalNeeds.map(fn => `  - ${fn}`)
      : [`  - 이동 및 안전을 위한 인솔 보조 인력 밀착 지원`]),
    ``,
    `5. 차시별 세부 운영 계획 (사전·현장·사후 로드맵)`,
    ...(periodsList && periodsList.length > 0
      ? periodsList.flatMap(p => [
          `  [${p.num}차시 / ${p.phaseBadge || '수업'}] ${p.title} (연계: ${(p.standardsCodes || []).join(', ') || '공통'})`,
          `    - 주요 활동: ${p.summary || ''}`,
          `    - 평가 관점: ${p.eval || ''}`
        ])
      : [`  [1차시 / 사전] 사전 안전 지도 및 탐색`]),
    ``,
    `6. 안전지도 및 비상 대책`,
    `  가. 사전 답사를 통한 배리어 프리(무단차, 경사로, 비상구) 동선 확보`,
    `  나. 돌발 상황 대비 1:1 보조인력 배치 및 비상연락망 유지`,
    `  다. 학생 특성별 보완대체의사소통(AAC) 도구 및 비상 명찰 착용`
  ];

  return {
    year,
    schoolLevel,
    docTitle,
    orgName,
    docSummary,
    locationName,
    periodCount,
    difficultyLevel,
    teachingMethod,
    theme,
    bodyParagraphs
  };
}

/**
 * plan 객체와 차시 목록, 그리고 사용자 지정 커스텀 템플릿(ArrayBuffer)을 받아
 * 유효한 .hwpx 파일을 생성하고 다운로드합니다.
 */
export async function generateAndDownloadHwpx(plan, periodsList, customTemplateBuffer = null) {
  try {
    let zip = null;
    let isCustomTemplate = false;

    // 1. 커스텀 템플릿 제공 시 우선 로드 검증
    if (customTemplateBuffer && customTemplateBuffer.byteLength > 0) {
      try {
        const customZip = await JSZip.loadAsync(customTemplateBuffer);
        if (customZip.file("Contents/section0.xml")) {
          zip = customZip;
          isCustomTemplate = true;
        } else {
          console.warn("등록된 파일에 Contents/section0.xml이 없어 표준 템플릿을 대체 사용합니다.");
        }
      } catch (customErr) {
        console.warn("커스텀 템플릿 파싱 실패, 표준 템플릿으로 자동 대체됩니다:", customErr);
      }
    }

    // 2. 기본 내장 base64 템플릿 디코딩 (커스텀 템플릿이 없거나 실패한 경우)
    if (!zip) {
      const binaryString = atob(HWPX_TEMPLATE_BASE64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      zip = await JSZip.loadAsync(bytes.buffer);
    }

    // 3. section0.xml 로드
    const secFile = zip.file("Contents/section0.xml");
    if (!secFile) {
      throw new Error("HWPX 템플릿 내에 Contents/section0.xml이 존재하지 않습니다.");
    }
    let secXml = await secFile.async("string");

    // 4. 통합 문서 모델 생성
    const { docTitle, orgName, docSummary, bodyParagraphs, locationName } = buildPlanDocument(plan, periodsList);

    // 5. 누름틀 필드 치환 (CLICK_HERE 필드가 있는 경우 주입)
    const titleRegex = /(<hp:fieldBegin\b[^>]*name=["']제목["'][^>]*>[\s\S]*?<\/hp:fieldBegin><\/hp:ctrl>)/;
    if (titleRegex.test(secXml)) {
      secXml = secXml.replace(titleRegex, `$1<hp:t>${escapeXml(docTitle)}</hp:t>`);
    }

    const orgRegex = /(<hp:fieldBegin\b[^>]*name=["']작성기관["'][^>]*>[\s\S]*?<\/hp:fieldBegin><\/hp:ctrl>)/;
    if (orgRegex.test(secXml)) {
      secXml = secXml.replace(orgRegex, `$1<hp:t>${escapeXml(orgName)}</hp:t>`);
    }

    const summaryRegex = /(<hp:fieldBegin\b[^>]*name=["']요약설명["'][^>]*>[\s\S]*?<\/hp:fieldBegin><\/hp:ctrl>)/;
    if (summaryRegex.test(secXml)) {
      secXml = secXml.replace(summaryRegex, `$1<hp:t>${escapeXml(docSummary)}</hp:t>`);
    }

    // 6. 본문 단락 태그 생성 및 </hs:sec> 직전에 주입
    const extraParagraphsXml = bodyParagraphs.map((line, pIdx) => {
      const escaped = escapeXml(line);
      return `<hp:p id="${1900000000 + pIdx}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:t>${escaped}</hp:t></hp:run></hp:p>`;
    }).join("");

    if (secXml.includes("</hs:sec>")) {
      secXml = secXml.replace("</hs:sec>", `${extraParagraphsXml}</hs:sec>`);
    } else {
      secXml += extraParagraphsXml;
    }

    zip.file("Contents/section0.xml", secXml);

    // 7. 미리보기 텍스트 파일 동기화
    const prvText = `${docTitle}\n${orgName}\n\n${docSummary}\n\n${bodyParagraphs.join("\n")}`;
    zip.file("Preview/PrvText.txt", prvText);

    // 8. .hwpx Zip 바이너리 생성
    const blob = await zip.generateAsync({
      type: "blob",
      mimeType: "application/hwp+zip",
      compression: "DEFLATE",
      compressionOptions: { level: 6 }
    });

    // 9. 파일 다운로드 트리거
    const safeName = locationName.replace(/[\/\\:*?"<>|]/g, "_").trim();
    const fileName = `현장체험학습_계획서_${safeName}.hwpx`;

    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl);
    }, 1500);

    return {
      success: true,
      isCustomTemplate,
      fileName
    };
  } catch (err) {
    console.error("HWPX 생성 및 다운로드 오류:", err);
    throw err;
  }
}
