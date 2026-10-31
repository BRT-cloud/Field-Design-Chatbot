import { HWPX_TEMPLATE_BASE64 } from './hwpx-template-base64.js';

/**
 * JSZip 인스턴스 획득 헬퍼
 * 브라우저 환경(window.JSZip) 및 Node/테스트 환경(dynamic import) 모두 지원
 */
async function getJSZip() {
  if (typeof window !== 'undefined' && window.JSZip) {
    return window.JSZip;
  }
  if (typeof globalThis !== 'undefined' && globalThis.JSZip) {
    return globalThis.JSZip;
  }
  try {
    const mod = await import('jszip');
    return mod.default || mod;
  } catch (err) {
    throw new Error('JSZip 라이브러리를 로드할 수 없습니다: ' + (err?.message || err));
  }
}

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
 * 플랜 텍스트 단일 진실 공급원(SSOT)
 * HWPX PrvText, 클립보드 복사 텍스트, 플레인 텍스트 다운로드 등에서 공통 사용
 */
export function formatPlanText(plan, periodsList) {
  const doc = buildPlanDocument(plan, periodsList);
  return `[${doc.docTitle}]\n${doc.orgName}\n\n[개요]\n${doc.docSummary}\n\n${doc.bodyParagraphs.join("\n")}\n`;
}

/**
 * 차시별 세부 운영 계획을 위한 표준 HWPX 네이티브 표 XML 생성기
 */
export function buildPeriodTableXml(periodsList) {
  if (!periodsList || periodsList.length === 0) return "";

  const colWidths = [6000, 11000, 15000, 8000];
  const totalW = 40000;
  const headerCols = ["차시 (구분)", "수업 주제", "주요 교수·학습 활동", "평가 관점"];

  const headerCells = headerCols.map((col, idx) => `
    <hp:tc name="" header="1" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="2">
      <hp:subList id="" textDirection="HORIZONTAL" lineWrap="BREAK" vertAlign="CENTER" linkListIDRef="0" linkListNextIDRef="0" textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0">
        <hp:p id="0" paraPrIDRef="2" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
          <hp:run charPrIDRef="2"><hp:t>${escapeXml(col)}</hp:t></hp:run>
        </hp:p>
      </hp:subList>
      <hp:cellAddr colAddr="${idx}" rowAddr="0"/>
      <hp:cellSpan colSpan="1" rowSpan="1"/>
      <hp:cellSz width="${colWidths[idx]}" height="1200"/>
      <hp:cellMargin left="141" right="141" top="141" bottom="141"/>
    </hp:tc>
  `).join("");

  const rowCount = periodsList.length + 1;
  const rows = [`<hp:tr>${headerCells}</hp:tr>`];

  periodsList.forEach((p, rIdx) => {
    const rowAddr = rIdx + 1;
    const badge = p.phaseBadge ? `\n(${p.phaseBadge})` : "";
    const cellsData = [
      `${p.num}차시${badge}`,
      p.title || "",
      p.summary || "",
      p.eval || ""
    ];

    const cellsXml = cellsData.map((txt, cIdx) => `
      <hp:tc name="" header="0" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="3">
        <hp:subList id="" textDirection="HORIZONTAL" lineWrap="BREAK" vertAlign="CENTER" linkListIDRef="0" linkListNextIDRef="0" textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0">
          <hp:p id="0" paraPrIDRef="${cIdx === 0 ? "2" : "0"}" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
            <hp:run charPrIDRef="0"><hp:t>${escapeXml(txt)}</hp:t></hp:run>
          </hp:p>
        </hp:subList>
        <hp:cellAddr colAddr="${cIdx}" rowAddr="${rowAddr}"/>
        <hp:cellSpan colSpan="1" rowSpan="1"/>
        <hp:cellSz width="${colWidths[cIdx]}" height="1600"/>
        <hp:cellMargin left="141" right="141" top="141" bottom="141"/>
      </hp:tc>
    `).join("");

    rows.push(`<hp:tr>${cellsXml}</hp:tr>`);
  });

  return `<hp:p id="1900500000" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:tbl id="1900500001" zOrder="0" numberingType="TABLE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" pageBreak="CELL" repeatHeader="1" rowCnt="${rowCount}" colCnt="4" cellSpacing="0" borderFillIDRef="3" noAdjust="0"><hp:sz width="${totalW}" widthRelTo="ABSOLUTE" height="${1200 + periodsList.length * 1600}" heightRelTo="ABSOLUTE" protect="0"/><hp:pos treatAsChar="0" affectLSpacing="0" flowWithText="1" allowOverlap="1" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="COLUMN" vertAlign="TOP" horzAlign="CENTER" vertOffset="0" horzOffset="0"/><hp:outMargin left="0" right="0" top="141" bottom="283"/><hp:inMargin left="141" right="141" top="141" bottom="141"/>${rows.join("")}</hp:tbl><hp:t></hp:t></hp:run></hp:p>`;
}

/**
 * plan 객체와 차시 목록, 그리고 사용자 지정 커스텀 템플릿(ArrayBuffer)을 받아
 * 유효한 .hwpx 파일을 생성하고 다운로드합니다.
 */
export async function generateAndDownloadHwpx(plan, periodsList, customTemplateBuffer = null) {
  try {
    const JSZip = await getJSZip();
    let zip = null;
    let isCustomTemplate = false;

    // 1. 커스텀 템플릿 제공 시 크기 및 Zip 매직 넘버 방어적 검증 (P1/S3)
    if (customTemplateBuffer && customTemplateBuffer.byteLength > 0) {
      if (customTemplateBuffer.byteLength > 30 * 1024 * 1024) {
        throw new Error("서식 파일 크기가 30MB를 초과하여 안전상 처리할 수 없습니다.");
      }
      const view = new Uint8Array(customTemplateBuffer.slice(0, 4));
      const isZip = view[0] === 0x50 && view[1] === 0x4B && view[2] === 0x03 && view[3] === 0x04;
      if (!isZip) {
        throw new Error("올바른 HWPX(Zip 압축) 문서 형식이 아닙니다.");
      }

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

    // 6. 본문 서식(단락 위계 및 표) 생성 (P0/H1, H2)
    const tableXml = buildPeriodTableXml(periodsList);
    let extraParagraphsXml = "";

    bodyParagraphs.forEach((line, pIdx) => {
      const escaped = escapeXml(line);
      const isMainHeading = /^\d+\.\s/.test(line);
      const paraPrRef = isMainHeading ? "1" : "0";
      const charPrRef = isMainHeading ? "2" : "0";

      extraParagraphsXml += `<hp:p id="${1900000000 + pIdx}" paraPrIDRef="${paraPrRef}" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="${charPrRef}"><hp:t>${escaped}</hp:t></hp:run></hp:p>`;

      // 5번 "차시별 세부 운영 계획" 제목 바로 아래에 네이티브 표 삽입
      if (line.startsWith("5. 차시별 세부 운영 계획") && tableXml) {
        extraParagraphsXml += tableXml;
      }
    });

    if (secXml.includes("</hs:sec>")) {
      secXml = secXml.replace("</hs:sec>", `${extraParagraphsXml}</hs:sec>`);
    } else {
      secXml += extraParagraphsXml;
    }

    zip.file("Contents/section0.xml", secXml);

    // 7. 미리보기 텍스트 파일 동기화 (SSOT formatPlanText 사용)
    const prvText = formatPlanText(plan, periodsList);
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
