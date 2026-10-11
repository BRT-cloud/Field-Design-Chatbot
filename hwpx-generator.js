import JSZip from 'jszip';
import { HWPX_TEMPLATE_BASE64 } from './hwpx-template-base64.js';

/**
 * plan 객체를 받아 실제 유효한 .hwpx 바이너리 파일을 생성하고 다운로드합니다.
 * 한컴오피스 한글 2020/2022/2024 및 네이버/공공 웹한글 뷰어에서 바로 열립니다.
 */
export async function generateAndDownloadHwpx(plan, periodsList) {
  try {
    // 1. base64 템플릿 로드
    const binaryString = atob(HWPX_TEMPLATE_BASE64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const zip = await JSZip.loadAsync(bytes.buffer);

    // 2. section0.xml 읽기
    let secXml = await zip.file("Contents/section0.xml").async("string");

    // 3. 본문 텍스트 구성
    const docSubject = `[기안] 2026학년도 ${plan.schoolLevel} 특수학급 현장체험학습 운영 계획(안)`;
    const bodyContent = `1. 추진 목적 및 주제
  가. 주제: ${plan.theme} (${plan.teachingMethod})
  나. 장소: ${plan.locationName} (${plan.periodCount}차시 [사전·현장·사후 4:2:4 비율] / ${plan.difficultyLevel})

2. 연계 교육과정 성취기준
${plan.standards.map(s => `  - ${s.code} ${s.title}: ${s.desc}`).join("\n")}

3. 학습 목표
  가. [지식·이해] ${plan.goalKnowledge}
  나. [기능·수행] ${plan.goalSkill}
  다. [가치·태도] ${plan.goalAttitude}

4. 참가 학생 현황 및 맞춤형 지원 대책 (익명화 완료)
${plan.functionalNeeds.map(fn => `  - ${fn}`).join("\n")}

5. 차시별 세부 운영 계획 (사전:현장:사후 = 4:2:4 배분)
${periodsList.map(p => `  [${p.num}차시 / ${p.phaseBadge || '수업'}] ${p.title} (연계: ${p.standardsCodes ? p.standardsCodes.join(', ') : '기본 성취기준'})\n    - 주요 활동: ${p.summary}\n    - 평가: ${p.eval}`).join("\n\n")}

6. 안전지도 및 비상 대책
  가. 사전 답사를 통한 배리어 프리(무단차, 경사로, 비상구) 동선 확보
  나. 돌발 상황 대비 1:1 보조인력 배치 및 비상연락망 유지`;

    // 4. XML 텍스트 치환 (템플릿 내 기본 텍스트를 실제 계획서 내용으로 치환)
    secXml = secXml.replace("2026년 ○○ 시범사업 추진계획 보고", escapeXml(docSubject));
    secXml = secXml.replace("○○○○부 ○○○○국", escapeXml(`${plan.schoolLevel} 특수학급`));
    secXml = secXml.replace("보고근거: ○○법 제00조. 시범사업 추진계획을 별첨과 같이 보고함.", escapeXml(bodyContent));

    zip.file("Contents/section0.xml", secXml);

    // 5. 미리보기 텍스트 파일(PrvText.txt) 동기화
    const prvText = `${docSubject}\n\n${bodyContent}`;
    zip.file("Preview/PrvText.txt", prvText);

    // 6. 실제 .hwpx 바이너리 Zip 생성
    const blob = await zip.generateAsync({
      type: "blob",
      mimeType: "application/hwp+zip",
      compression: "DEFLATE",
      compressionOptions: { level: 6 }
    });

    // 7. 다운로드 트리거
    const safeName = (plan.locationName || "체험학습").replace(/[\/\\:*?"<>|]/g, "_").trim();
    const fileName = `현장체험학습_계획서_${safeName}.hwpx`;

    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);

    return true;
  } catch (err) {
    console.error("HWPX 생성 오류:", err);
    throw err;
  }
}

function escapeXml(unsafe) {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
