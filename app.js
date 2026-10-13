import { 
  SCHOOL_LEVEL_OPTIONS, 
  LOCATION_PRESETS, 
  THEME_SUGGESTIONS, 
  EVALUATION_FOCUS_OPTIONS, 
  TEACHING_METHOD_OPTIONS,
  getStandardsForSchoolLevel,
  getRecommendedStandards 
} from './standards-data.js';
import { generateAndDownloadHwpx, escapeXml } from './hwpx-generator.js';

// ============================================================================
// 안전한 HTML 이스케이프 유틸리티 (XSS 원천 차단)
// ============================================================================
export function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================================
// 기본 상태(Default State) 및 세션 스토리지 영속화
// ============================================================================
const SESSION_STORAGE_KEY = "fieldtrip_plan_session_state";

const DEFAULT_PLAN = {
  schoolLevel: "초등학교",
  locationId: "loc-mart",
  locationName: "대형마트 / 전통시장",
  standards: [],
  customStandardInput: "",
  standardsSearchKeyword: "",
  standardsSubjectFilter: "전체",
  theme: "나 스스로 고르고 결제하는 슬기로운 마트 장보기",
  periodCount: 10,
  difficultyLevel: "기본/적용 수준 (시각적 단서 및 단계적 모델링)",
  evalFocusId: "eval-independence",
  evalFocusTitle: "독립적 수행도 (자립 생활 역량)",
  goalKnowledge: "지역사회 매장의 구조와 물건 구매 및 결제 절차를 이해한다.",
  goalSkill: "시각 단서와 AAC를 활용하여 필요한 물건을 찾고 결제 과정을 독립적으로 수행한다.",
  goalAttitude: "공공장소 에티켓과 보행 안전 수칙을 지키며 즐겁게 참여한다.",
  functionalNeeds: [
    "휠체어 이동 지원 1명 (무단차 경사로 및 엘리베이터 동선 확보)",
    "시각적 일과표 및 사진 단서 필요 2명",
    "소음 민감성 대비 조용한 쉼터 동선 1명"
  ],
  teachingMethod: "프로젝트 학습 (PBL)",
  uploadedFileName: "2026_현장체험학습_기안양식_표준형.hwpx",
  uploadedFileMerged: true
};

const appState = {
  step: 1, // 1 ~ 11
  plan: structuredClone(DEFAULT_PLAN)
};

// ============================================================================
// 장소별 특화 활동 팩 (P1: 마트 외 6개 장소별 고유 교육과정 활동)
// ============================================================================
const LOCATION_ACTIVITY_PACKS = {
  "loc-mart": {
    preIntro: "방문할 대형마트와 전통시장의 위치와 판매 구역을 알아봅니다.",
    preBody: "필요한 물품 사진 카드를 고르고 나만의 쇼핑 목록 및 예산 계획서 작성하기.",
    preOutro: "장바구니와 계산 모의 연습을 마치고 체크리스트를 확인합니다.",
    fieldIntro: "마트 입구에서 장바구니를 챙기고 이동 동선과 비상구를 확인합니다.",
    fieldBody: "진열대에서 목표 물건을 직접 찾고 계산대에서 카드/현금으로 결제 완수하기.",
    fieldOutro: "영수증과 구매 물품을 챙기고 계산원에게 감사 인사를 나눕니다.",
    postIntro: "영수증 품목과 실제 사 온 물건을 대조하며 정산 활동을 시작합니다.",
    postBody: "구매한 물품을 친구들과 나누고 지출 내역 정산 활동지 작성하기.",
    postOutro: "스스로 장보기를 해낸 성취감을 나누고 나만의 소감 신문을 완성합니다.",
    pptMission: "원하는 물건 1가지 스스로 찾아서 결제하기",
    worksheetBasic: "마트 물건 사진 스티커 짝 맞추기 및 영수증 도장 찍기",
    worksheetApply: "내가 사고 싶은 물건 2가지 오려 붙이고 가격 적기",
    worksheetAdvanced: "정해진 예산(5,000원) 내 물품 목록 및 거스름돈 계산하기"
  },
  "loc-cafe": {
    preIntro: "베이커리 및 카페 공간의 특징과 판매되는 메뉴를 탐색합니다.",
    preBody: "음료 및 베이커리 메뉴판 읽기, 키오스크 및 구두 주문 시뮬레이션 연습.",
    preOutro: "내가 마시고 싶은 음료 카드와 모의 결제 수단을 준비합니다.",
    fieldIntro: "카페에 도착하여 차례대로 줄을 서고 메뉴판을 확인합니다.",
    fieldBody: "키오스크 또는 카운터 직원에게 원하는 메뉴를 직접 주문하고 결제하기.",
    fieldOutro: "진동벨이 울리면 음료를 안전하게 수령하여 지정된 자리에 착석합니다.",
    postIntro: "주문하여 받은 음료와 빵을 감상하며 식음료 에티켓을 되짚어봅니다.",
    postBody: "친구들과 간식을 나누어 먹으며 카페 이용 소감과 직업(바리스타) 이야기 나누기.",
    postOutro: "음료 잔과 트레이를 퇴식구에 스스로 정리하고 자리를 정돈합니다.",
    pptMission: "카운터나 키오스크에서 내 메뉴 직접 주문하고 받아오기",
    worksheetBasic: "카페 빵/음료 사진 스티커 붙이기 및 감사 인사 표현하기",
    worksheetApply: "주문할 메뉴 픽토그램 선택 및 결제 카드 태그 연습하기",
    worksheetAdvanced: "카페 메뉴판 금액 합산하기 및 바리스타 직업 인터뷰 작성"
  },
  "loc-garden": {
    preIntro: "수목원과 생태공원의 계절별 나무와 꽃, 자연환경을 사진으로 만납니다.",
    preBody: "숲속 관찰 돋보기와 자연물 채집 봉투를 챙기고 야외 안전 수칙을 익힙니다.",
    preOutro: "숲 탐방 지도에서 휠체어 산책로와 쉼터 위치를 확인합니다.",
    fieldIntro: "수목원 입구에서 상쾌한 공기를 마시며 숲속 관찰 약속을 다집니다.",
    fieldBody: "오감으로 나뭇잎과 꽃의 질감, 향기를 느끼고 떨어진 자연물 관찰 채집하기.",
    fieldOutro: "쉼터에 모여 수분 보충을 하고 자연의 소리를 경청하며 휴식합니다.",
    postIntro: "채집한 나뭇잎, 솔방울 등 자연물을 책상 위에 펼쳐놓고 관찰합니다.",
    postBody: "자연물을 활용한 나만의 액자 만들기 및 숲에서 느낀 감정 나누기.",
    postOutro: "친구들의 자연물 작품을 감상하고 환경을 아끼는 마음을 다짐합니다.",
    pptMission: "숲길을 따라 안전하게 걸으며 서로 다른 나뭇잎 3종류 찾아보기",
    worksheetBasic: "나뭇잎 모양 맞추기 및 초록빛 자연 스티커 붙이기",
    worksheetApply: "자연물 프로타주(나뭇잎 탁본) 뜨기 및 질감 낱말 고르기",
    worksheetAdvanced: "계절 식물 관찰 일지 작성 및 생태 지도 만들기"
  },
  "loc-museum": {
    preIntro: "박물관과 과학관에 전시된 신기한 유물과 체험 전시물을 탐색합니다.",
    preBody: "공공장소 관람 예절(조용히 걷기, 차례 지켜 만지기)과 동선을 숙지합니다.",
    preOutro: "전시관 스탬프 투어 용지와 관람 미션 카드를 준비합니다.",
    fieldIntro: "전시관 입구에서 안내원의 안내를 듣고 차례를 지켜 입장합니다.",
    fieldBody: "체험형 전시물을 조작해보고 안내 표지판을 읽으며 미션 스탬프 찍기.",
    fieldOutro: "인원 점검 후 기념 스탬프를 확인하고 질서 있게 퇴장합니다.",
    postIntro: "전시관에서 찍은 사진과 완성된 스탬프 투어 지도를 확인합니다.",
    postBody: "가장 인상 깊었던 전시물 그림 그리기 및 친구들에게 소개하기.",
    postOutro: "전시 관람 매너를 잘 실천한 나를 칭찬하고 수료증을 받습니다.",
    pptMission: "조용히 걷는 예절을 지키며 체험 전시물 3가지 완수하기",
    worksheetBasic: "전시물 그림 카드 맞추기 및 조용히 걷기 스티커 붙이기",
    worksheetApply: "전시물 스탬프 찍기 및 체험 느낌 이모티콘 고르기",
    worksheetAdvanced: "내가 큐레이터가 되어 전시물 소개 글 3줄 작성하기"
  },
  "loc-transit": {
    preIntro: "지하철역과 버스터미널의 대중교통 이용 절차를 사진과 영상으로 배웁니다.",
    preBody: "교통카드 잔액 확인, 개찰구 카드 태그 및 스크린도어 안전선 지키기 모의 훈련.",
    preOutro: "목적지 노선 색깔과 환승역 안내 표지판을 시각 카드로 익힙니다.",
    fieldIntro: "역사에 도착하여 유도 블록과 표지판을 보며 승강장으로 이동합니다.",
    fieldBody: "교통카드를 태그하고 안전선 안에서 대기 후 질서 있게 승하차 실습하기.",
    fieldOutro: "목적지 출구로 안전하게 나와 일행과 함께 다음 행선지를 확인합니다.",
    postIntro: "오늘 이용한 교통수단과 승차권을 살펴보며 이동 경험을 되돌아봅니다.",
    postBody: "대중교통 안전 수칙 실천 체크리스트를 완성하고 안전 배지 받기.",
    postOutro: "혼자서도 안전하게 이동할 수 있다는 자신감을 나누며 일정을 마무리합니다.",
    pptMission: "교통카드 스스로 찍고 차례 지켜 승하차하기",
    worksheetBasic: "지하철/버스 픽토그램 선 긋기 및 신호등 색칠하기",
    worksheetApply: "교통카드 태그 순서 번호 매기기 및 안전선 스티커 붙이기",
    worksheetAdvanced: "지하철 노선도에서 출발역-도착역 경로 표시 및 요금 계산"
  },
  "loc-farm": {
    preIntro: "스마트팜과 농촌체험장에서 자라는 친환경 채소와 작물을 알아봅니다.",
    preBody: "장갑과 모자 등 수확 복장을 준비하고 안전한 도구 사용법을 익힙니다.",
    preOutro: "수확할 작물 사진 카드를 확인하고 바구니를 준비합니다.",
    fieldIntro: "농장에 도착하여 농부 선생님의 설명을 듣고 수확 구역으로 이동합니다.",
    fieldBody: "익은 열매를 손으로 조심스럽게 따서 바구니에 담고 무게를 재어보기.",
    fieldOutro: "수확한 농작물을 상자에 정성스레 포장하고 손을 깨끗이 씻습니다.",
    postIntro: "직접 수확해 온 신선한 농작물을 관찰하고 향기를 맡아봅니다.",
    postBody: "가족과 친구들에게 선물할 나눔 라벨을 꾸미고 감사 편지 쓰기.",
    postOutro: "농부의 노고와 생명의 소중함을 느끼며 오늘의 소감을 나눕니다.",
    pptMission: "소중한 농작물 다치지 않게 조심스럽게 수확하기",
    worksheetBasic: "채소/과일 실물 사진 스티커 붙이기 및 색칠하기",
    worksheetApply: "수확한 열매 개수 세기 및 나눔 상자 이름표 꾸미기",
    worksheetAdvanced: "식물의 성장 과정 순서 배열 및 친환경 식물 일기 작성"
  }
};

function getActiveActivityPack(locId, locName) {
  if (LOCATION_ACTIVITY_PACKS[locId]) {
    return LOCATION_ACTIVITY_PACKS[locId];
  }
  // 직접 입력 장소에 대한 범용 고품질 팩
  const name = locName || "체험학습지";
  return {
    preIntro: `우리가 방문할 ${name}의 시설 환경과 방문 목적을 알아봅니다.`,
    preBody: `${name}에서 지켜야 할 규칙을 확인하고 나만의 탐험 미션 계획서를 세웁니다.`,
    preOutro: "개인 준비물과 비상 연락망을 점검하며 안전한 출발을 준비합니다.",
    fieldIntro: `${name}에 도착하여 안내 지도를 확인하고 배리어 프리 동선으로 이동합니다.`,
    fieldBody: `현장에서 계획한 탐험 미션을 친구들과 협력하며 스스로 완수하기.`,
    fieldOutro: "활동 결과를 정리하고 주변을 정돈한 후 집결지에 모입니다.",
    postIntro: `${name}에서 촬영한 활동 사진을 감상하며 배움의 순간을 되짚어봅니다.`,
    postBody: "활동 결과물을 정리하고 서로의 노력과 성장을 칭찬하는 나눔 활동하기.",
    postOutro: "나만의 체험학습 포트폴리오를 완성하고 스스로 해낸 자립심을 기릅니다.",
    pptMission: `${name}에서 내 미션 당당하게 완수하기`,
    worksheetBasic: `${name} 관련 사진 스티커 붙이기 및 참 잘했어요 도장 찍기`,
    worksheetApply: `내가 참여한 활동 2가지 그림으로 표현하기 및 소감 고르기`,
    worksheetAdvanced: `${name} 탐험 보고서 작성 및 친구들과 성장 소감 발표하기`
  };
}

// ============================================================================
// 애플리케이션 초기화
// ============================================================================
if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
    loadPlanFromSession();
    ensureDefaultStandards();
    renderStep(appState.step);
    setupEventDelegation();
  });
}

function loadPlanFromSession() {
  try {
    const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.step === "number" && parsed.plan) {
        appState.step = parsed.step;
        appState.plan = { ...DEFAULT_PLAN, ...parsed.plan };
      }
    }
  } catch (err) {
    console.warn("세션 복원 건너뜀:", err);
  }
}

function savePlanToSession() {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
      step: appState.step,
      plan: appState.plan
    }));
  } catch (err) {
    console.warn("세션 저장 실패:", err);
  }
}

function ensureDefaultStandards() {
  if (!appState.plan.standards || appState.plan.standards.length === 0) {
    const recommended = getRecommendedStandards(appState.plan.schoolLevel, appState.plan.locationId);
    if (recommended.length > 0) {
      appState.plan.standards = [recommended[0]];
    }
  }
}

// ============================================================================
// 이벤트 위임 시스템 (CSP 완전 준수: 인라인 onclick/oninput 일체 없음)
// ============================================================================
function setupEventDelegation() {
  // 1. 상단 글로벌 네비게이션 버튼
  const prevBtn = document.getElementById("prevStepBtn");
  const nextBtn = document.getElementById("nextStepBtn");
  const resetBtn = document.getElementById("resetWizardBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (appState.step > 1) {
        goToStep(appState.step - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (appState.step < 11) {
        goToStep(appState.step + 1);
      } else {
        handleResetConfirmation();
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      handleResetConfirmation();
    });
  }

  // 2. 메인 인터랙션 박스 클릭 위임
  const interactionBox = document.getElementById("cardInteractionBox");
  if (interactionBox) {
    interactionBox.addEventListener("click", handleInteractionClick);
    interactionBox.addEventListener("input", handleInteractionInput);
    interactionBox.addEventListener("change", handleInteractionChange);
    interactionBox.addEventListener("keydown", handleInteractionKeydown);
  }
}

function handleResetConfirmation() {
  const confirmed = window.confirm("작성 중인 모든 내용이 초기화됩니다. 처음부터 다시 설계하시겠습니까?");
  if (confirmed) {
    appState.step = 1;
    appState.plan = structuredClone(DEFAULT_PLAN);
    ensureDefaultStandards();
    savePlanToSession();
    renderStep(1);
    showToast("1단계로 돌아왔습니다. 새로 설계를 시작합니다.", "info");
  }
}

function goToStep(targetStep) {
  appState.step = Math.min(Math.max(targetStep, 1), 11);
  savePlanToSession();
  renderStep(appState.step);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ----------------------------------------------------------------------------
// 클릭 이벤트 디스패처
// ----------------------------------------------------------------------------
function handleInteractionClick(e) {
  const target = e.target.closest("[data-action]");
  if (!target) return;

  const action = target.getAttribute("data-action");
  const id = target.getAttribute("data-id");
  const val = target.getAttribute("data-val");

  switch (action) {
    // 1단계: 학교급
    case "select-school-level": {
      appState.plan.schoolLevel = val;
      const rec = getRecommendedStandards(val, appState.plan.locationId);
      if (rec.length > 0) {
        appState.plan.standards = [rec[0]];
      }
      savePlanToSession();
      renderStep(1);
      showToast(`'${val}' 교육과정이 설정되었습니다.`, "info");
      break;
    }

    // 2단계: 장소
    case "select-location": {
      appState.plan.locationId = id;
      appState.plan.locationName = val;
      const rec = getRecommendedStandards(appState.plan.schoolLevel, id);
      if (rec.length > 0) {
        appState.plan.standards = [rec[0]];
      }
      const themes = THEME_SUGGESTIONS[id];
      if (themes && themes.length > 0) {
        appState.plan.theme = themes[0];
      }
      savePlanToSession();
      renderStep(2);
      showToast(`'${val}' 장소가 선택되었습니다.`, "info");
      break;
    }

    // 3단계: 성취기준 토글
    case "toggle-standard": {
      const code = id;
      const all = getStandardsForSchoolLevel(appState.plan.schoolLevel);
      const idx = appState.plan.standards.findIndex(s => s.code === code);
      if (idx >= 0) {
        if (appState.plan.standards.length === 1) {
          showToast("최소 1개 이상의 성취기준이 필요합니다.", "info");
          return;
        }
        appState.plan.standards.splice(idx, 1);
      } else {
        const found = all.find(s => s.code === code) || {
          code,
          title: "선택 성취기준",
          subject: "공통",
          desc: code
        };
        appState.plan.standards.push(found);
      }
      savePlanToSession();
      renderStep(3);
      break;
    }

    // 3단계: 직접 입력 성취기준 추가
    case "add-custom-standard": {
      const input = document.getElementById("customStdInputField");
      const textVal = (input ? input.value : appState.plan.customStandardInput).trim();
      if (!textVal) {
        showToast("성취기준 내용을 입력해 주세요.", "info");
        return;
      }
      const match = textVal.match(/^\[([^\]]+)\](.*)$/);
      const code = match ? `[${match[1].trim()}]` : `[직접-${appState.plan.standards.length + 1}]`;
      const desc = match ? match[2].trim() : textVal;

      appState.plan.standards.push({
        code,
        title: "사용자 직접 입력",
        subject: "공통",
        desc: desc || textVal
      });
      appState.plan.customStandardInput = "";
      savePlanToSession();
      renderStep(3);
      showToast("새 성취기준이 추가되었습니다.", "success");
      break;
    }

    // 3단계: 성취기준 삭제
    case "remove-standard": {
      const code = id;
      if (appState.plan.standards.length === 1) {
        showToast("최소 1개 이상의 성취기준이 필요합니다.", "info");
        return;
      }
      appState.plan.standards = appState.plan.standards.filter(s => s.code !== code);
      savePlanToSession();
      renderStep(3);
      showToast("성취기준이 제거되었습니다.", "info");
      break;
    }

    // 3단계: 교과목 필터 칩
    case "filter-standards-subject": {
      appState.plan.standardsSubjectFilter = val;
      renderStep(3);
      break;
    }

    // 4단계: 주제 선택
    case "select-theme": {
      appState.plan.theme = val;
      savePlanToSession();
      renderStep(4);
      showToast("수업 주제가 선택되었습니다.", "info");
      break;
    }

    // 5단계: 차시 빠른 선택
    case "select-period-count": {
      const count = parseInt(val, 10);
      if (!isNaN(count)) {
        appState.plan.periodCount = count;
        savePlanToSession();
        renderStep(5);
      }
      break;
    }

    // 5단계: 난이도 선택
    case "select-difficulty": {
      appState.plan.difficultyLevel = val;
      savePlanToSession();
      renderStep(5);
      showToast("수업 난이도가 설정되었습니다.", "info");
      break;
    }

    // 6단계: 평가 중점 선택
    case "select-eval-focus": {
      const title = val;
      appState.plan.evalFocusId = id;
      appState.plan.evalFocusTitle = title;
      const loc = appState.plan.locationName || "체험 현장";

      if (id === "eval-independence") {
        appState.plan.goalKnowledge = `${loc}의 주요 시설 구조와 이용 절차를 이해한다.`;
        appState.plan.goalSkill = "최소한의 촉진으로 스스로 필요한 활동을 선택하고 결제·이용을 독립적으로 완수한다.";
        appState.plan.goalAttitude = "스스로 해냈다는 자립 생활의 성취감과 주도적인 자신감을 갖는다.";
      } else if (id === "eval-communication") {
        appState.plan.goalKnowledge = `${loc}에서 상황에 맞는 인사말과 요구 표현을 이해한다.`;
        appState.plan.goalSkill = "현장 직원이나 동료에게 AAC 도구 또는 구어로 원하는 것을 명확하게 전달한다.";
        appState.plan.goalAttitude = "상대방의 반응을 경청하고 감사하는 마음을 바른 태도로 표현한다.";
      } else if (id === "eval-safety") {
        appState.plan.goalKnowledge = `${loc}과 보행 환경에서 지켜야 할 안전 수칙 및 관람 에티켓을 안다.`;
        appState.plan.goalSkill = "차례 지키기, 질서 유지, 표지판 확인 등의 안전 행동을 실천한다.";
        appState.plan.goalAttitude = "다른 시민을 배려하고 공공질서를 준수하려는 올바른 태도를 지닌다.";
      } else {
        appState.plan.goalKnowledge = `${loc}에서 경험할 수 있는 다양한 문화와 활동을 탐색한다.`;
        appState.plan.goalSkill = "자신의 흥미와 선호에 따라 적극적으로 활동에 참여하고 표현한다.";
        appState.plan.goalAttitude = "배움의 즐거움을 느끼고 친구들과 긍정적인 유대감을 나눈다.";
      }
      savePlanToSession();
      renderStep(6);
      showToast(`평가 중점이 '${title}'(으)로 설정되었습니다.`, "info");
      break;
    }

    // 8단계: 기능적 지원 태그 추가
    case "add-functional-tag": {
      if (!appState.plan.functionalNeeds.includes(val)) {
        appState.plan.functionalNeeds.push(val);
        savePlanToSession();
        renderStep(8);
        showToast("지원 요구 사항이 추가되었습니다.", "info");
      }
      break;
    }

    // 9단계: 수업 방식
    case "select-teaching-method": {
      appState.plan.teachingMethod = val;
      savePlanToSession();
      renderStep(9);
      showToast(`수업 방식이 '${val}'(으)로 설정되었습니다.`, "info");
      break;
    }

    // 10단계 / 11단계: 다운로드 및 복사
    case "download-hwpx": {
      triggerHwpxDownload();
      break;
    }
    case "copy-curriculum": {
      triggerCopyCurriculum();
      break;
    }
    case "print-pdf": {
      triggerPrintPdf();
      break;
    }
    case "reset-all": {
      handleResetConfirmation();
      break;
    }
    case "trigger-file-upload": {
      const fileInput = document.getElementById("schoolTemplateFileInput");
      if (fileInput) fileInput.click();
      break;
    }
    default:
      break;
  }
}

// ----------------------------------------------------------------------------
// 입력/변경 이벤트 디스패처 (실시간 데이터 동기화)
// ----------------------------------------------------------------------------
function handleInteractionInput(e) {
  const model = e.target.getAttribute("data-model");
  if (!model) return;

  const val = e.target.value;
  switch (model) {
    case "locationName":
      appState.plan.locationName = val;
      savePlanToSession();
      break;
    case "theme":
      appState.plan.theme = val;
      savePlanToSession();
      break;
    case "customStandardInput":
      appState.plan.customStandardInput = val;
      break;
    case "standardsSearchKeyword":
      appState.plan.standardsSearchKeyword = val;
      renderStep(3);
      break;
    case "periodCount": {
      const num = parseInt(val, 10);
      if (!isNaN(num) && num > 0) {
        appState.plan.periodCount = Math.min(Math.max(num, 1), 30);
        savePlanToSession();
        updatePeriodRatioVisualizer();
      }
      break;
    }
    case "goalKnowledge":
      appState.plan.goalKnowledge = val;
      savePlanToSession();
      break;
    case "goalSkill":
      appState.plan.goalSkill = val;
      savePlanToSession();
      break;
    case "goalAttitude":
      appState.plan.goalAttitude = val;
      savePlanToSession();
      break;
    case "functionalNeeds":
      appState.plan.functionalNeeds = val.split("\n").filter(line => line.trim().length > 0);
      savePlanToSession();
      break;
    default:
      break;
  }
}

function handleInteractionChange(e) {
  if (e.target.id === "schoolTemplateFileInput") {
    const file = e.target.files && e.target.files[0];
    if (file) {
      appState.plan.uploadedFileName = file.name;
      appState.plan.uploadedFileMerged = true;
      savePlanToSession();
      renderStep(11);
      showToast(`'${file.name}' 서식이 등록되었습니다. 한글 기안 시 제목과 양식에 완벽 반영됩니다.`, "success");
    }
  }
}

function handleInteractionKeydown(e) {
  if (e.key === "Enter" || e.key === " ") {
    const card = e.target.closest(".choice-bubble-card, .standard-pick-item, .pill-option-btn");
    if (card && card.hasAttribute("data-action")) {
      e.preventDefault();
      card.click();
    }
  }
}

// ============================================================================
// 스텝 렌더러 (총 11단계)
// ============================================================================
function renderStep(step) {
  const stepText = document.getElementById("stepCounterText");
  const stepFill = document.getElementById("stepProgressFill");
  if (stepText) stepText.textContent = `STEP ${String(step).padStart(2, '0')} / 11`;
  if (stepFill) stepFill.style.width = `${(step / 11) * 100}%`;

  const prevBtn = document.getElementById("prevStepBtn");
  const nextBtn = document.getElementById("nextStepBtn");
  const nextBtnText = document.getElementById("nextStepBtnText");

  if (prevBtn) prevBtn.style.visibility = step > 1 ? "visible" : "hidden";
  if (nextBtnText) {
    if (step === 10) {
      nextBtnText.textContent = "공문서 기안 서식 확인하기 >";
    } else if (step === 11) {
      nextBtnText.textContent = "처음으로 (다시 설계) >";
    } else {
      nextBtnText.textContent = "다음 단계 >";
    }
  }

  const pill = document.getElementById("cardStepPill");
  const title = document.getElementById("cardQuestionTitle");
  const subtitle = document.getElementById("cardQuestionSubtitle");
  const box = document.getElementById("cardInteractionBox");

  switch (step) {
    case 1: renderStep1(pill, title, subtitle, box); break;
    case 2: renderStep2(pill, title, subtitle, box); break;
    case 3: renderStep3(pill, title, subtitle, box); break;
    case 4: renderStep4(pill, title, subtitle, box); break;
    case 5: renderStep5(pill, title, subtitle, box); break;
    case 6: renderStep6(pill, title, subtitle, box); break;
    case 7: renderStep7(pill, title, subtitle, box); break;
    case 8: renderStep8(pill, title, subtitle, box); break;
    case 9: renderStep9(pill, title, subtitle, box); break;
    case 10: renderStep10(pill, title, subtitle, box); break;
    case 11: renderStep11(pill, title, subtitle, box); break;
    default: break;
  }
}

// ----------------------------------------------------------------------------
// 1단계: 학교급 선택
// ----------------------------------------------------------------------------
function renderStep1(pill, title, subtitle, box) {
  pill.textContent = "1단계: 학교급 선택";
  title.textContent = "어느 학교급의 체험학습을 설계하시나요?";
  subtitle.textContent = "선택하신 학교급에 맞추어 국가 교육과정 성취기준을 연결하고 맞춤형 추천을 제공합니다.";

  box.innerHTML = `
    <div class="choice-grid-cards">
      ${SCHOOL_LEVEL_OPTIONS.map(opt => `
        <div class="choice-bubble-card ${appState.plan.schoolLevel === opt.name ? 'selected' : ''}" 
             role="button" tabindex="0"
             data-action="select-school-level" data-val="${escapeHtml(opt.name)}">
          <div class="choice-card-top">
            <span class="choice-card-badge">${escapeHtml(opt.badge)}</span>
          </div>
          <h2 class="choice-card-title">${escapeHtml(opt.name)}</h2>
          <p class="choice-card-desc">${escapeHtml(opt.desc)}</p>
        </div>
      `).join("")}
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 2단계: 체험학습 장소
// ----------------------------------------------------------------------------
function renderStep2(pill, title, subtitle, box) {
  pill.textContent = "2단계: 체험학습 장소";
  title.textContent = "이번 체험학습은 어디로 떠나나요?";
  subtitle.textContent = "학생들과 함께 배움을 경험할 지역사회 공간을 선택하거나 직접 입력해 주세요.";

  box.innerHTML = `
    <div class="choice-grid-cards">
      ${LOCATION_PRESETS.map(loc => `
        <div class="choice-bubble-card ${appState.plan.locationId === loc.id ? 'selected' : ''}" 
             role="button" tabindex="0"
             data-action="select-location" data-id="${escapeHtml(loc.id)}" data-val="${escapeHtml(loc.name)}">
          <div class="choice-card-top">
            <span class="choice-card-badge">${escapeHtml(loc.icon)}</span>
          </div>
          <h2 class="choice-card-title">${escapeHtml(loc.name)}</h2>
          <p class="choice-card-desc">${escapeHtml(loc.desc)}</p>
        </div>
      `).join("")}
    </div>
    <div class="soft-input-group">
      <label for="customLocationInput" style="font-size: 0.92rem; font-weight: 700; color: var(--text-muted);">장소 직접 입력하기:</label>
      <input type="text" class="soft-text-input" id="customLocationInput" 
             placeholder="예: 서울숲 곤충식물원, 뚜레쥬르 베이커리 등 직접 입력" 
             value="${escapeHtml(appState.plan.locationName)}" 
             data-model="locationName">
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 3단계: 성취기준 설정 (실시간 검색 + 과목 필터 + 직접 추가)
// ----------------------------------------------------------------------------
function renderStep3(pill, title, subtitle, box) {
  pill.textContent = "3단계: 성취기준 설정";
  title.textContent = "어떤 교육과정 성취기준을 연결할까요?";
  subtitle.textContent = `${appState.plan.schoolLevel} 교육과정 기반 성취기준을 검색하여 선택하거나 직접 입력해 주세요.`;

  const allStandards = getStandardsForSchoolLevel(appState.plan.schoolLevel);
  const selectedCodes = appState.plan.standards.map(s => s.code);
  const keyword = (appState.plan.standardsSearchKeyword || "").trim().toLowerCase();
  const subjectFilter = appState.plan.standardsSubjectFilter || "전체";

  // 사용 가능한 과목군 추출
  const subjects = ["전체", ...new Set(allStandards.map(s => s.subject))].slice(0, 8);

  let filteredList = [];
  if (keyword) {
    filteredList = allStandards.filter(s => {
      const matchSubject = subjectFilter === "전체" || s.subject === subjectFilter;
      const matchKeyword = s.code.toLowerCase().includes(keyword) ||
                           s.title.toLowerCase().includes(keyword) ||
                           s.desc.toLowerCase().includes(keyword) ||
                           s.subject.toLowerCase().includes(keyword);
      return matchSubject && matchKeyword;
    }).slice(0, 15);
  } else {
    const recommended = getRecommendedStandards(appState.plan.schoolLevel, appState.plan.locationId);
    filteredList = recommended.filter(s => subjectFilter === "전체" || s.subject === subjectFilter);
  }

  box.innerHTML = `
    <div class="standards-picker-container">
      <!-- 1) 현재 선택된 성취기준 칩 목록 -->
      <div style="background: #ffffff; border: 1.5px solid #e2e8f0; padding: 1rem; border-radius: 16px; margin-bottom: 0.8rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-weight: 800; font-size: 0.95rem; color: #0f172a;">
            현재 선택된 성취기준 (${appState.plan.standards.length}개):
          </span>
          <span style="font-size: 0.78rem; color: #64748b;">(최소 1개 이상 유지)</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${appState.plan.standards.map(s => `
            <span style="background: #fff1f2; border: 1px solid #fecdd3; color: #e11d48; padding: 0.35rem 0.75rem; border-radius: 9999px; font-size: 0.84rem; display: inline-flex; align-items: center; gap: 0.4rem;">
              <strong>${escapeHtml(s.code)}</strong> ${escapeHtml(s.title || s.subject)}
              <button type="button" style="border: none; background: transparent; cursor: pointer; color: #e11d48; font-weight: 900; margin-left: 2px;" 
                      data-action="remove-standard" data-id="${escapeHtml(s.code)}" title="삭제">×</button>
            </span>
          `).join("")}
        </div>
      </div>

      <!-- 2) 성취기준 검색 및 직접 입력창 -->
      <div class="soft-input-group" style="margin-top: 0; background: #fff8f8; padding: 1rem; border-radius: 16px; border: 1.5px dashed #fecdd3;">
        <label for="standardsSearchField" style="font-size: 0.92rem; font-weight: 800; color: #e11d48;">
          성취기준 실시간 검색 또는 직접 입력:
        </label>
        <div style="display: flex; gap: 0.5rem; margin-top: 0.4rem; flex-wrap: wrap;">
          <input type="text" class="soft-text-input" id="standardsSearchField" style="flex: 2; min-width: 200px;"
                 placeholder="검색어 입력 (예: 구매, 화폐, 인사, 안전, [2국01-01])" 
                 value="${escapeHtml(appState.plan.standardsSearchKeyword)}" 
                 data-model="standardsSearchKeyword">
          <input type="text" class="soft-text-input" id="customStdInputField" style="flex: 2; min-width: 200px;"
                 placeholder="직접 추가 (예: [2국01-01] 알맞은 인사말 주고받기)" 
                 value="${escapeHtml(appState.plan.customStandardInput)}" 
                 data-model="customStandardInput">
          <button type="button" class="btn-bubble-tool" style="padding: 0 1.2rem; white-space: nowrap;" data-action="add-custom-standard">
            직접 추가
          </button>
        </div>

        <!-- 교과목 필터 칩 -->
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.6rem;">
          ${subjects.map(subj => `
            <button type="button" class="pill-option-btn ${subjectFilter === subj ? 'selected' : ''}" 
                    style="padding: 0.25rem 0.75rem; font-size: 0.8rem;"
                    data-action="filter-standards-subject" data-val="${escapeHtml(subj)}">
              ${escapeHtml(subj)}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- 3) 추천 / 검색 결과 목록 -->
      <div style="margin-top: 0.8rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-family: 'Jua', sans-serif; font-size: 1.05rem; color: var(--text-main);">
            ${keyword ? `'${escapeHtml(keyword)}' 검색 결과 (${filteredList.length}건):` : `'${escapeHtml(appState.plan.locationName)}' 추천 성취기준:`}
          </span>
          <span style="font-size: 0.78rem; color: #64748b;">
            클릭하여 추가하거나 선택 해제하세요
          </span>
        </div>

        <div class="standards-bubble-list">
          ${filteredList.length === 0 ? `
            <div style="text-align: center; padding: 2rem; color: #94a3b8; font-size: 0.95rem;">
              일치하는 성취기준이 없습니다. 직접 추가 기능을 이용해 등록할 수 있습니다.
            </div>
          ` : filteredList.map(std => {
            const isSelected = selectedCodes.includes(std.code);
            return `
              <div class="standard-pick-item ${isSelected ? 'selected' : ''}" 
                   role="button" tabindex="0"
                   data-action="toggle-standard" data-id="${escapeHtml(std.code)}">
                <div style="display: flex; flex-direction: column; gap: 0.35rem; flex: 1; text-align: left;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <span class="std-code-badge">${escapeHtml(std.code)}</span>
                    <span style="font-size: 0.78rem; background: #f1f5f9; color: #0f172a; padding: 0.15rem 0.6rem; border-radius: 9999px; font-weight: 700; border: 1px solid #e2e8f0;">${escapeHtml(std.subject)}</span>
                    <span style="font-weight: 800; font-size: 0.96rem; color: #0f172a;">${escapeHtml(std.title)}</span>
                  </div>
                  <div style="font-size: 0.92rem; color: #334155; line-height: 1.55; word-break: keep-all;">${escapeHtml(std.desc)}</div>
                </div>
                <div style="margin-left: 0.8rem;">
                  <span style="font-family: 'Jua', sans-serif; font-size: 0.92rem; color: ${isSelected ? '#0f172a' : '#94a3b8'}; padding: 0.3rem 0.75rem; border-radius: 9999px; background: ${isSelected ? '#e2e8f0' : 'transparent'};">
                    ${isSelected ? '선택됨' : '선택'}
                  </span>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 4단계: 체험학습 주제 선택
// ----------------------------------------------------------------------------
function renderStep4(pill, title, subtitle, box) {
  pill.textContent = "4단계: 체험학습 주제";
  title.textContent = "어떤 배움의 주제로 프로젝트를 열어갈까요?";
  subtitle.textContent = "선택하신 장소와 성취기준을 연결한 추천 주제입니다. 마음에 드는 주제를 고르거나 직접 다듬어 주세요.";

  const suggestions = THEME_SUGGESTIONS[appState.plan.locationId] || [
    "스스로 탐색하고 실천하는 우리 마을 배움 여행",
    "공공장소 에티켓과 자립 기능을 기르는 현장 체험",
    "친구와 함께 협력하여 미션을 완수하는 배움 원정대"
  ];

  box.innerHTML = `
    <div class="choice-grid-cards" style="grid-template-columns: 1fr;">
      ${suggestions.map((thm, i) => `
        <div class="choice-bubble-card ${appState.plan.theme === thm ? 'selected' : ''}" 
             role="button" tabindex="0"
             data-action="select-theme" data-val="${escapeHtml(thm)}">
          <div class="choice-card-top">
            <span class="choice-card-badge">추천 주제 0${i + 1}</span>
          </div>
          <h2 class="choice-card-title">${escapeHtml(thm)}</h2>
          <p class="choice-card-desc">실생활 맥락 중심의 학생 주도형 ${escapeHtml(appState.plan.schoolLevel)} 체험 프로젝트</p>
        </div>
      `).join("")}
    </div>
    <div class="soft-input-group">
      <label for="themeInput" style="font-size: 0.92rem; font-weight: 700; color: var(--text-muted);">주제 직접 수정하기:</label>
      <input type="text" class="soft-text-input" id="themeInput"
             value="${escapeHtml(appState.plan.theme)}" 
             data-model="theme">
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 차시 비율 분배 헬퍼 함수 (사전:현장:사후 = 4:2:4 비율)
// ----------------------------------------------------------------------------
export function calculatePeriodRatioCounts(total) {
  const n = Math.max(1, parseInt(total, 10) || 10);
  if (n === 1) return { pre: 0, field: 1, post: 0, total: 1 };
  if (n === 2) return { pre: 1, field: 1, post: 0, total: 2 };
  if (n === 3) return { pre: 1, field: 1, post: 1, total: 3 };

  let pre = Math.round(n * 0.4);
  let field = Math.round(n * 0.2);
  let post = n - pre - field;

  if (field < 1) field = 1;
  if (pre < 1) pre = 1;
  if (post < 1) post = 1;

  while (pre + field + post > n) {
    if (pre > post && pre > field) pre--;
    else if (post > pre && post > field) post--;
    else if (pre >= post) pre--;
    else post--;
  }
  while (pre + field + post < n) {
    if (pre <= post) pre++;
    else post++;
  }

  return { pre, field, post, total: n };
}

// ----------------------------------------------------------------------------
// 5단계: 차시 수 및 수업 난이도
// ----------------------------------------------------------------------------
function renderStep5(pill, title, subtitle, box) {
  pill.textContent = "5단계: 차시 수 및 수업 난이도";
  title.textContent = "몇 차시 수업으로 계획하고, 난이도는 어떻게 할까요?";
  subtitle.textContent = "사전:현장:사후 4:2:4 비율을 기반으로 최적화된 로드맵을 설계합니다.";

  const levels = [
    { title: "기초/탐색 수준", desc: "상당한 도움 및 1:1 신체적·언어적 촉진 제공" },
    { title: "기본/적용 수준", desc: "시각적 단서 및 단계적 모델링을 통한 협력 수행" },
    { title: "심화/자립 수준", desc: "최소한의 안내로 스스로 판단하고 독립적으로 완수" }
  ];

  const quickOptions = [
    { count: 10, label: "10차시 (추천 4:2:4)" },
    { count: 5, label: "5차시 (압축 4:2:4)" },
    { count: 8, label: "8차시" },
    { count: 3, label: "3차시 (기본)" }
  ];

  box.innerHTML = `
    <div class="dual-selector-row">
      <!-- 차시 수 직접 입력 및 4:2:4 비율 시각화 영역 -->
      <div class="selector-sub-box">
        <h3 class="sub-box-title">수업 운영 차시 수 (직접 입력 / 빠른 선택):</h3>
        <div style="display: flex; align-items: center; gap: 0.8rem; margin-top: 0.4rem;">
          <input type="number" min="1" max="30" class="soft-text-input" id="periodCountInput"
                 style="width: 110px; font-size: 1.4rem; font-family: 'Jua', sans-serif; text-align: center; padding: 0.6rem;" 
                 value="${escapeHtml(appState.plan.periodCount)}" 
                 data-model="periodCount">
          <span style="font-family: 'Jua', sans-serif; font-size: 1.3rem; color: var(--primary-pink);">차시</span>
        </div>

        <div style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.5rem;">
          자주 사용하는 차시 빠른 선택:
        </div>
        <div class="pill-option-group">
          ${quickOptions.map(opt => `
            <button type="button" class="pill-option-btn ${appState.plan.periodCount === opt.count ? 'selected' : ''}" 
                    data-action="select-period-count" data-val="${opt.count}">
              ${escapeHtml(opt.label)}
            </button>
          `).join("")}
        </div>

        <!-- 4:2:4 비율 시각적 배너 -->
        <div id="ratioBannerContainer">
          ${getRatioBannerHtml(appState.plan.periodCount)}
        </div>
      </div>

      <!-- 난이도 선택 영역 -->
      <div class="selector-sub-box">
        <h3 class="sub-box-title">수업 수준 (난이도 및 촉진 지원):</h3>
        <div style="display: flex; flex-direction: column; gap: 0.65rem;">
          ${levels.map(lvl => {
            const isSel = appState.plan.difficultyLevel.includes(lvl.title);
            return `
              <div class="choice-bubble-card ${isSel ? 'selected' : ''}" 
                   role="button" tabindex="0"
                   style="padding: 0.95rem 1.1rem;" 
                   data-action="select-difficulty" data-val="${escapeHtml(`${lvl.title} (${lvl.desc})`)}">
                <span style="font-family: 'Jua', sans-serif; font-size: 1.1rem; color: var(--text-main);">${escapeHtml(lvl.title)}</span>
                <span style="font-size: 0.84rem; color: var(--text-muted);">${escapeHtml(lvl.desc)}</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </div>
  `;
}

function getRatioBannerHtml(periodCount) {
  const counts = calculatePeriodRatioCounts(periodCount);
  const total = counts.total;
  const prePct = Math.round((counts.pre / total) * 100);
  const fieldPct = Math.round((counts.field / total) * 100);
  const postPct = 100 - prePct - fieldPct;

  return `
    <div class="ratio-banner-box" style="margin-top: 0.8rem;">
      <div style="font-family: 'Jua', sans-serif; font-size: 0.96rem; color: var(--text-main); display: flex; justify-content: space-between;">
        <span>🎯 차시 배분 비율: 사전 4 : 현장 2 : 사후 4</span>
        <span style="color: var(--primary-pink); font-weight: 800;">총 ${total}차시</span>
      </div>
      <div class="ratio-bar-wrapper">
        <div class="ratio-bar-segment pre" style="width: ${prePct}%;"></div>
        <div class="ratio-bar-segment field" style="width: ${fieldPct}%;"></div>
        <div class="ratio-bar-segment post" style="width: ${postPct}%;"></div>
      </div>
      <div class="ratio-legend-row">
        <span style="color: #be123c;">🌸 사전 ${counts.pre}차시 (${prePct}%)</span>
        <span style="color: #0369a1;">🚌 현장 ${counts.field}차시 (${fieldPct}%)</span>
        <span style="color: #15803d;">🌱 사후 ${counts.post}차시 (${postPct}%)</span>
      </div>
    </div>
  `;
}

function updatePeriodRatioVisualizer() {
  const container = document.getElementById("ratioBannerContainer");
  if (container) {
    container.innerHTML = getRatioBannerHtml(appState.plan.periodCount);
  }
}

// ----------------------------------------------------------------------------
// 6단계: 평가 중점 선택
// ----------------------------------------------------------------------------
function renderStep6(pill, title, subtitle, box) {
  pill.textContent = "6단계: 평가 중점 선택";
  title.textContent = "이번 체험학습에서 가장 중요하게 평가할 영역은 무엇인가요?";
  subtitle.textContent = "핵심 성취기준 및 학생 특성과 연결된 핵심 평가 관점을 선택해 주세요.";

  box.innerHTML = `
    <div class="choice-grid-cards">
      ${EVALUATION_FOCUS_OPTIONS.map(ef => `
        <div class="choice-bubble-card ${appState.plan.evalFocusId === ef.id ? 'selected' : ''}" 
             role="button" tabindex="0"
             data-action="select-eval-focus" data-id="${escapeHtml(ef.id)}" data-val="${escapeHtml(ef.title)}">
          <div class="choice-card-top">
            <span class="choice-card-badge">평가 관점</span>
          </div>
          <h2 class="choice-card-title">${escapeHtml(ef.title)}</h2>
          <p class="choice-card-desc">${escapeHtml(ef.desc)}</p>
        </div>
      `).join("")}
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 7단계: 학습 목표 설정 (P0: ReferenceError 방지 및 양방향 모델링)
// ----------------------------------------------------------------------------
function renderStep7(pill, title, subtitle, box) {
  pill.textContent = "7단계: 체험학습 목표 설정";
  title.textContent = "설정한 평가 중점에 맞춘 3차원 학습 목표입니다.";
  subtitle.textContent = "지식·기능·태도 측면에서 학생들이 도달할 구체적인 수업 목표를 확인하고 필요시 다듬어 주세요.";

  box.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div class="choice-bubble-card selected" style="cursor: default;">
        <label for="goalKnowledgeInput" style="font-family: 'Jua', sans-serif; font-size: 0.95rem; color: var(--primary-pink); display: block; margin-bottom: 0.3rem;">[지식·이해 목표]</label>
        <input type="text" class="soft-text-input" id="goalKnowledgeInput" style="padding: 0.75rem 1rem; font-size: 1rem;" 
               value="${escapeHtml(appState.plan.goalKnowledge)}" 
               data-model="goalKnowledge">
      </div>

      <div class="choice-bubble-card selected" style="cursor: default;">
        <label for="goalSkillInput" style="font-family: 'Jua', sans-serif; font-size: 0.95rem; color: #10b981; display: block; margin-bottom: 0.3rem;">[기능·수행 목표]</label>
        <input type="text" class="soft-text-input" id="goalSkillInput" style="padding: 0.75rem 1rem; font-size: 1rem;" 
               value="${escapeHtml(appState.plan.goalSkill)}" 
               data-model="goalSkill">
      </div>

      <div class="choice-bubble-card selected" style="cursor: default;">
        <label for="goalAttitudeInput" style="font-family: 'Jua', sans-serif; font-size: 0.95rem; color: #a855f7; display: block; margin-bottom: 0.3rem;">[가치·태도 목표]</label>
        <input type="text" class="soft-text-input" id="goalAttitudeInput" style="padding: 0.75rem 1rem; font-size: 1rem;" 
               value="${escapeHtml(appState.plan.goalAttitude)}" 
               data-model="goalAttitude">
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 8단계: 장애특성 및 맞춤 지원 (개인정보 보호 원칙 강화)
// ----------------------------------------------------------------------------
function renderStep8(pill, title, subtitle, box) {
  pill.textContent = "8단계: 장애특성 및 맞춤 지원";
  title.textContent = "현장에서 특별히 고려해야 할 장애특성이 있나요?";
  subtitle.textContent = "이동 지원(휠체어), 감각 조절, 의사소통 보조 등 안전하고 편안한 배움을 위해 필요한 지원을 적어주세요.";

  box.innerHTML = `
    <div class="privacy-notice-bubble">
      <span class="privacy-notice-badge">개인정보 주의</span>
      <span>
        <strong>개인식별정보 입력 절대 금지:</strong> 학생 실명, 전화번호, 주민등록번호는 절대 입력하지 마세요! 
        (예: "휠체어 이동 지원 1명", "시각적 일과표 2명", "소음 민감성 1명" 형태로만 기재)
      </span>
    </div>

    <div style="font-family: 'Jua', sans-serif; font-size: 1rem; color: var(--text-main); margin-bottom: 0.5rem;">
      자주 활용되는 기능적 지원 요구 태그 (클릭 시 추가):
    </div>
    <div class="pill-option-group" style="margin-bottom: 1rem;">
      <button type="button" class="pill-option-btn" data-action="add-functional-tag" data-val="휠체어 이동 지원 1명 (무단차 경사로 필요)">+ 휠체어 이동 지원</button>
      <button type="button" class="pill-option-btn" data-action="add-functional-tag" data-val="시각적 단계별 일과표 및 사진 단서 필요 2명">+ 시각적 일과표</button>
      <button type="button" class="pill-option-btn" data-action="add-functional-tag" data-val="AAC 그림 상징판 및 스마트 보완의사소통 지원 1명">+ AAC 의사소통</button>
      <button type="button" class="pill-option-btn" data-action="add-functional-tag" data-val="소음 민감성 대비 저소음 휴식 쉼터 동선 1명">+ 소음 감각 조절</button>
      <button type="button" class="pill-option-btn" data-action="add-functional-tag" data-val="돌발 이탈 예방 1:1 보조인력 밀착 동행 1명">+ 1:1 안전 동행</button>
    </div>

    <div class="soft-input-group">
      <label for="functionalNeedsArea" style="font-size: 0.92rem; font-weight: 700; color: var(--text-muted);">현재 등록된 맞춤 지원 사항:</label>
      <textarea class="soft-text-input" id="functionalNeedsArea" rows="4" style="line-height: 1.5; resize: none;" 
                data-model="functionalNeeds">${escapeHtml(appState.plan.functionalNeeds.join("\n"))}</textarea>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 9단계: 수업 방식 확인
// ----------------------------------------------------------------------------
function renderStep9(pill, title, subtitle, box) {
  pill.textContent = "9단계: 수업 방식 확인";
  title.textContent = "어떤 수업 방식으로 배움을 이끌어갈까요?";
  subtitle.textContent = "프로젝트 학습, 협력학습, 질문식 수업, 직접 시연 수업 중 이번 체험학습의 주요 방식을 선택해 주세요.";

  box.innerHTML = `
    <div class="choice-grid-cards">
      ${TEACHING_METHOD_OPTIONS.map(m => `
        <div class="choice-bubble-card ${appState.plan.teachingMethod.includes(m.name) ? 'selected' : ''}" 
             role="button" tabindex="0"
             data-action="select-teaching-method" data-val="${escapeHtml(m.name)}">
          <div class="choice-card-top">
            <span class="choice-card-badge">${escapeHtml(m.badge)}</span>
          </div>
          <h2 class="choice-card-title">${escapeHtml(m.name)}</h2>
          <p class="choice-card-desc">${escapeHtml(m.desc)}</p>
        </div>
      `).join("")}
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 10단계: UDL 최종 교육과정 결과물 (장소별 동적 팩 반영)
// ----------------------------------------------------------------------------
function renderStep10(pill, title, subtitle, box) {
  pill.textContent = "10단계: UDL 최종 교육과정 결과물";
  title.textContent = "설계하신 특수교육 현장체험학습 교육과정안입니다.";
  subtitle.textContent = "각 차시별 연계 성취기준과 세부 활동을 확인하고, 한글(HWPX) 또는 PDF 파일로 다운로드하세요.";

  const p = appState.plan;
  const periods = generatePeriodsDataWithStandards(p);
  const actPack = getActiveActivityPack(p.locationId, p.locationName);

  box.innerHTML = `
    <div class="export-action-shelf">
      <button type="button" class="btn-bubble-tool" data-action="copy-curriculum">내용 전체 복사</button>
      <button type="button" class="btn-bubble-tool" style="background: #ffe4e6; color: #e11d48;" data-action="download-hwpx">
        한글(HWPX) 다운로드
      </button>
      <button type="button" class="btn-soft-primary" style="padding: 0.5rem 1.2rem; font-size: 0.88rem;" data-action="print-pdf">
        PDF 인쇄 / 저장
      </button>
    </div>

    <div class="udl-result-scroller" id="udlPrintArea">
      <!-- 1) 프로젝트 개요 -->
      <div class="result-section-box">
        <h2 class="result-section-title">1. 프로젝트 개요</h2>
        <table class="result-table">
          <tbody>
            <tr>
              <th style="width: 25%;">프로젝트명</th>
              <td><strong>${escapeHtml(p.theme)}</strong></td>
            </tr>
            <tr>
              <th>학교급 및 장소</th>
              <td><strong>${escapeHtml(p.schoolLevel)}</strong> | ${escapeHtml(p.locationName)} (총 ${p.periodCount}차시 [사전·현장·사후 4:2:4 비율] / ${escapeHtml(p.difficultyLevel)})</td>
            </tr>
            <tr>
              <th>수업 방식 및 평가</th>
              <td>${escapeHtml(p.teachingMethod)} | ${escapeHtml(p.evalFocusTitle)}</td>
            </tr>
            <tr>
              <th>핵심 질문 (Essential Question)</th>
              <td>"우리 마을 ${escapeHtml(p.locationName)}에서 나에게 필요한 것을 스스로 찾고 안전하게 참여하려면 어떻게 해야 할까?"</td>
            </tr>
            <tr>
              <th>연계 핵심 성취기준</th>
              <td>${p.standards.map(s => `<strong>${escapeHtml(s.code)}</strong> ${escapeHtml(s.title || s.subject)}`).join(", ")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 2) 차시별 수업 계획 (전체 로드맵 표) -->
      <div class="result-section-box">
        <h2 class="result-section-title">2. 차시별 수업 계획 (전체 로드맵 - 사전:현장:사후 4:2:4 비율)</h2>
        ${getRatioBannerHtml(p.periodCount)}
        <table class="result-table">
          <thead>
            <tr>
              <th style="width: 12%;">구분/차시</th>
              <th style="width: 25%;">차시 주제</th>
              <th style="width: 20%;">연계 성취기준</th>
              <th style="width: 28%;">주요 교수·학습 활동 내용</th>
              <th style="width: 15%;">UDL 맞춤 평가</th>
            </tr>
          </thead>
          <tbody>
            ${periods.map(item => `
              <tr>
                <td style="text-align: center; font-weight: 800; font-family: 'Jua', sans-serif;">
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.3rem;">
                    <span class="phase-tag ${escapeHtml(item.phase)}">${escapeHtml(item.phaseBadge)}</span>
                    <span style="font-size: 1.05rem;">${item.num}차시</span>
                  </div>
                </td>
                <td><strong>${escapeHtml(item.title)}</strong></td>
                <td>
                  ${item.standardsCodes.map(code => `<span class="linked-std-pill">${escapeHtml(code)}</span>`).join(" ")}
                </td>
                <td>${escapeHtml(item.summary)}</td>
                <td>${escapeHtml(item.eval)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- 3) 차시별 세부 수업 계획안 -->
      <div class="result-section-box">
        <h2 class="result-section-title">3. 차시별 세부 수업 계획안 (도입-전개-정리 및 발문 예시)</h2>
        ${periods.map(item => {
          const bgMap = {
            pre: { bg: '#fff8f8', border: '#fecdd3', color: '#e11d48' },
            field: { bg: '#f0f9ff', border: '#bae6fd', color: '#0284c7' },
            post: { bg: '#f0fdf4', border: '#bbf7d0', color: '#16a34a' }
          };
          const styleInfo = bgMap[item.phase] || bgMap.pre;
          return `
          <div style="background: ${styleInfo.bg}; border: 2px solid ${styleInfo.border}; border-radius: 16px; padding: 1.3rem; margin-bottom: 0.9rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
              <span style="font-family: 'Jua', sans-serif; font-size: 1.25rem; color: ${styleInfo.color}; display: flex; align-items: center; gap: 0.5rem;">
                <span class="phase-tag ${escapeHtml(item.phase)}">${escapeHtml(item.phaseBadge)}</span>
                <span>${item.num}차시: ${escapeHtml(item.title)}</span>
              </span>
              <div>
                ${item.standardsCodes.map(code => `<span class="linked-std-pill">${escapeHtml(code)}</span>`).join(" ")}
              </div>
            </div>
            <div style="font-size: 0.92rem; line-height: 1.6; color: var(--text-main);">
              <p><strong>[도입]</strong> ${escapeHtml(item.intro)}</p>
              <p style="margin-top: 0.35rem;"><strong>[전개]</strong> ${escapeHtml(item.body)}</p>
              <p style="margin-top: 0.35rem;"><strong>[정리]</strong> ${escapeHtml(item.outro)}</p>
              <p style="margin-top: 0.55rem; color: #0284c7;"><strong>교사 발문 예시:</strong> "${escapeHtml(item.questionExample)}"</p>
              <p style="margin-top: 0.35rem; color: #16a34a;"><strong>교사 지원 및 맞춤형 피드백 팁:</strong> ${escapeHtml(item.feedbackTip)}</p>
            </div>
          </div>
        `}).join("")}
      </div>

      <!-- 4) 교수·학습 자료 제작 지원 (장소 특화 PPT 및 활동지) -->
      <div class="result-section-box">
        <h2 class="result-section-title">4. 교수·학습 자료 제작 지원 (PPT 슬라이드 및 활동지)</h2>
        <div style="font-family: 'Jua', sans-serif; font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-main);">
          가. 차시별 PPT 슬라이드 구성안:
        </div>
        <div class="ppt-slides-grid">
          <div class="ppt-slide-card">
            <div class="ppt-slide-num">슬라이드 01</div>
            <div class="ppt-slide-title">오늘의 탐험 떠나기</div>
            <ul class="ppt-slide-bullets">
              <li>${escapeHtml(p.locationName)} 실물 사진 및 영상</li>
              <li>${escapeHtml(actPack.pptMission)}</li>
            </ul>
          </div>
          <div class="ppt-slide-card">
            <div class="ppt-slide-num">슬라이드 02</div>
            <div class="ppt-slide-title">시각적 일과표 순서</div>
            <ul class="ppt-slide-bullets">
              <li>이동하기 → 목표 활동 → 정리 및 소감</li>
              <li>단계별 사진 픽토그램 안내</li>
            </ul>
          </div>
          <div class="ppt-slide-card">
            <div class="ppt-slide-num">슬라이드 03</div>
            <div class="ppt-slide-title">약속해요! 안전 규칙</div>
            <ul class="ppt-slide-bullets">
              <li>선생님 시야 안에서 이동하기</li>
              <li>차례대로 줄 서서 기다리기</li>
            </ul>
          </div>
          <div class="ppt-slide-card">
            <div class="ppt-slide-num">슬라이드 04</div>
            <div class="ppt-slide-title">나의 미션 성공 확인</div>
            <ul class="ppt-slide-bullets">
              <li>미션 완료 확인 도장 팡팡</li>
              <li>오늘의 기분 사진 카드 고르기</li>
            </ul>
          </div>
        </div>

        <div style="font-family: 'Jua', sans-serif; font-size: 1.1rem; margin: 1.3rem 0 0.5rem 0; color: var(--text-main);">
          나. 학생용 맞춤 활동지/워크시트 제안:
        </div>
        <div style="background: #f1f5f9; padding: 1.1rem; border-radius: 14px; font-size: 0.92rem; line-height: 1.65;">
          <p>- <strong>기초 수준 워크시트:</strong> ${escapeHtml(actPack.worksheetBasic)}</p>
          <p>- <strong>적용 수준 워크시트:</strong> ${escapeHtml(actPack.worksheetApply)}</p>
          <p>- <strong>심화 수준 워크시트:</strong> ${escapeHtml(actPack.worksheetAdvanced)}</p>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 11단계: 공문서 기안 서식 합성 및 완료 안내 (투명한 안내 및 파일 반영)
// ----------------------------------------------------------------------------
function renderStep11(pill, title, subtitle, box) {
  pill.textContent = "11단계: 공문서 기안 서식 반영";
  title.textContent = "공문서 기안 서식에 설계 내용이 완벽히 반영되었습니다.";
  subtitle.textContent = "표준 공문서 양식(.hwpx)에 UDL 교육과정이 자동 합성되어 있습니다. 필요시 학교 전용 서식을 등록할 수 있습니다.";

  const p = appState.plan;

  box.innerHTML = `
    <!-- 업로드 드롭존 -->
    <div class="template-upload-zone" data-action="trigger-file-upload">
      <div class="upload-icon-bubble">HWP</div>
      <div class="upload-title">학교 고유 계획서 양식 추가 등록 (.hwpx, .hwp, .docx)</div>
      <div class="upload-desc">클릭하여 학교 전용 서식을 선택하면 기안 파일 정보로 즉시 동기화됩니다. (현재 기본 내장 공문서 양식 적용 완료)</div>
      <input type="file" id="schoolTemplateFileInput" style="display: none;" accept=".hwpx,.hwp,.docx,.txt">
    </div>

    <!-- 양식 자동 반영 미리보기 카드 -->
    <div class="merged-plan-card">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem; flex-wrap: wrap; gap: 0.5rem;">
        <span style="font-family: 'Jua', sans-serif; font-size: 1.25rem; color: #065f46;">
          [기안 준비 완료] ${escapeHtml(p.uploadedFileName)}
        </span>
        <span style="background: #d1fae5; color: #065f46; font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 20px;">
          표준 기안 서식 + UDL 설계안 합성 완료
        </span>
      </div>
      <div style="font-size: 0.92rem; color: var(--text-main); line-height: 1.65; background: #f0fdf4; padding: 1.15rem; border-radius: 12px;">
        <p><strong>수신:</strong> 내부결재 | <strong>제목:</strong> 2026학년도 ${escapeHtml(p.schoolLevel)} 특수학급 현장체험학습 운영 계획(안)</p>
        <p><strong>1. 목적 및 주제:</strong> ${escapeHtml(p.theme)} (${escapeHtml(p.teachingMethod)})</p>
        <p><strong>2. 체험 장소:</strong> ${escapeHtml(p.locationName)} (총 ${p.periodCount}차시 / ${escapeHtml(p.difficultyLevel)})</p>
        <p><strong>3. 연계 성취기준:</strong> ${p.standards.map(s => escapeHtml(s.code)).join(", ")} 외</p>
        <p><strong>4. 맞춤 지원 대책:</strong> ${escapeHtml(p.functionalNeeds.join(" / "))}</p>
        <p><strong>5. 평가 중점:</strong> ${escapeHtml(p.evalFocusTitle)} (지식·기능·태도 3차원 평가)</p>
      </div>
      <div style="display: flex; gap: 0.6rem; justify-content: flex-end; margin-top: 1.1rem; flex-wrap: wrap;">
        <button type="button" class="btn-bubble-tool" data-action="reset-all">처음으로 다시 작성</button>
        <button type="button" class="btn-bubble-tool" data-action="copy-curriculum">기안문 텍스트 복사</button>
        <button type="button" class="btn-soft-primary" data-action="download-hwpx">완성 계획서 다운로드 (.hwpx)</button>
      </div>
    </div>
  `;
}

// ============================================================================
// 차시별 상세 데이터 생성 (장소별 콘텐츠 팩 + 4:2:4 비율 분배)
// ============================================================================
function generatePeriodsDataWithStandards(p) {
  const count = p.periodCount;
  const list = [];
  const stdCodes = p.standards.map(s => s.code);
  const primaryStd = stdCodes.length > 0 ? stdCodes[0] : "[공통]";
  const counts = calculatePeriodRatioCounts(count);
  const act = getActiveActivityPack(p.locationId, p.locationName);

  // 사전 활동 풀 (4단계)
  const preActivities = [
    {
      title: `사전 탐색: ${p.locationName} 탐험 계획 수립 및 가고 싶은 구역 탐색`,
      summary: `${act.preIntro} 가고 싶은 곳과 관심 품목/전시물 알아보기.`,
      eval: "체험 장소 사진을 보고 가고 싶은 곳이나 관심 품목을 스스로 선택하고 표현하는지 관찰",
      intro: act.preIntro,
      body: act.preBody,
      outro: act.preOutro,
      questionExample: `우리가 갈 ${p.locationName}에서 가장 먼저 찾아보고 싶은 것은 무엇일까요?`,
      feedbackTip: "실물 사진 카드나 영상을 제시하여 낯선 장소에 대한 불안을 낮추고 흥미를 높입니다."
    },
    {
      title: "사전 계획: 나의 활동 계획서(미션/구매 목록) 작성 및 준비물 점검",
      summary: "개인 소지품 바구니 확인, 나만의 활동 미션 계획서 작성 및 가방 챙기기 연습.",
      eval: "시각 단서(사진/픽토그램)를 활용하여 자신의 준비물과 미션 목록을 스스로 구성하는지 점검",
      intro: "체험학습에 필요한 가방, 복장, 안전 명찰을 확인합니다.",
      body: "필요한 물품 사진 카드를 나만의 계획서에 부착하고 짝꿍과 점검하기.",
      outro: "내 가방에 준비물이 빠짐없이 들어있는지 체크리스트로 확인하기.",
      questionExample: "우리가 내일 챙겨가야 할 가장 중요한 물건은 무엇일까요? 가방에 쏙 넣어볼까요?",
      feedbackTip: "글자 쓰기가 어려운 학생은 실물 사진 스티커나 AAC 선택 판을 활용합니다."
    },
    {
      title: `사전 모의: 교실 모의 체험: 이동, 인사 및 상호작용 롤플레잉`,
      summary: `교실 내 간이 부스 구성, 모의 카드 태그 및 인사말, 도움 요청 연습.`,
      eval: "교실 모의 부스에서 단계적 촉진에 따라 상호작용 및 인사 표현을 수행하는지 점검",
      intro: `교실에 꾸며진 ${p.locationName} 모의 코너를 둘러보고 역할을 확인합니다.`,
      body: "직원 역할 교사에게 인사하기, 모의 카드 리더기에 카드 대어 결제하기.",
      outro: '성공적으로 미션 수행 후 "감사합니다" 인사하고 영수증/티켓 챙기기.',
      questionExample: "현장 직원 선생님을 만났을 때 어떤 인사를 건네면 좋을까요?",
      feedbackTip: "반복적인 롤플레잉을 통해 현장에서 발생할 수 있는 낯선 자극을 완화합니다."
    },
    {
      title: "사전 안전: 안전 수칙 및 공공장소 에티켓 다짐 (시각적 일과표 숙지)",
      summary: "보행 안전(신호등, 짝꿍 손잡기), 길을 잃었을 때 대처법(안내데스크/명찰 활용) 다짐.",
      eval: "비상 상황 발생 시 도움 요청 행동 및 에티켓 수칙 이해도 평가",
      intro: "현장에서 지켜야 할 3대 안전 약속 안내.",
      body: "시각적 일과표 순서 암기, 짝꿍과 손잡고 걷기 연습, 비상 연락처 목걸이 확인.",
      outro: "안전 약속 다짐 손도장 찍기 및 현장체험학습 출발 준비 완료 선언.",
      questionExample: "만약 선생님이나 친구를 놓쳤을 때는 어떻게 행동해야 할까요?",
      feedbackTip: "비상시 대처를 위해 학생의 옷이나 가방에 시각적 긴급 연락처 카드를 부착합니다."
    }
  ];

  // 현장 활동 풀 (2단계)
  const fieldActivities = [
    {
      title: `현장 탐색: ${p.locationName} 현장 도착 및 환경 탐색, 안전 이동 실천`,
      summary: `${act.fieldIntro} 배리어 프리 동선 확인 및 안전 이동 실천.`,
      eval: "공공장소에서 이동 안전 수칙을 준수하고 안내 표지판을 보고 방향을 탐색하는지 실기 평가",
      intro: act.fieldIntro,
      body: act.fieldBody,
      outro: act.fieldOutro,
      questionExample: "우리가 찾던 엘리베이터와 안내 표지판이 어디에 보이나요?",
      feedbackTip: "휠체어 이용 학생의 무단차 동선을 확보하고 중간 쉼터를 지정합니다."
    },
    {
      title: `현장 실전: ${p.locationName} 실전 미션 수행: 직접 선택 및 상호작용 완수`,
      summary: `${act.fieldBody} 현장 직무 상호작용 및 실전 완수.`,
      eval: "현장 체크리스트를 바탕으로 목표 미션의 독립적 수행도 실기 평가",
      intro: "내가 사전 준비 시간에 작성한 미션 계획서를 꺼내어 확인하기.",
      body: act.fieldBody,
      outro: act.fieldOutro,
      questionExample: "스스로 선택한 미션을 직접 완수해 볼 수 있을까요?",
      feedbackTip: "독립 수행을 장려하되 어려움을 겪을 때는 5초 지연 후 최소한의 제스처 촉진부터 제공합니다."
    }
  ];

  // 사후 활동 풀 (4단계)
  const postActivities = [
    {
      title: "사후 정산: 체험 결과 확인: 영수증/결과물 대조 및 활동 결과 정산",
      summary: `${act.postIntro} ${act.postBody}`,
      eval: "체험 결과물을 대조하여 확인하고 정산 활동지에 기록할 수 있는지 평가",
      intro: act.postIntro,
      body: act.postBody,
      outro: act.postOutro,
      questionExample: "체험 장소에서 가져온 결과물과 내 활동지를 함께 비교해 볼까요?",
      feedbackTip: "수 개념이 어려운 학생에게는 1:1 매칭 스티커를 활용합니다."
    },
    {
      title: "사후 나눔: 배움과 기쁨의 나눔: 친구들과 결과물 나누기 및 협동 활동",
      summary: "체험 결과물이나 간식을 친구들과 나누기, 나눔 에티켓 실천 및 칭찬 격려.",
      eval: "또래 친구들과 긍정적인 상호작용을 나누고 차례를 지켜 공유하는 태도 관찰",
      intro: "친구들과 둥글게 둘러앉아 각자 경험한 활동 소개하기.",
      body: '결과물 사이좋게 나누기, 친구에게 "고마워" 긍정적 언어 및 AAC로 표현하기.',
      outro: "자리 주변 쓰레기 분리수거 및 정리정돈 스스로 하기.",
      questionExample: "내가 경험한 기쁨을 친구들과 어떻게 나누어 볼 수 있을까요?",
      feedbackTip: "나눔 과정에서 긍정적 피드백을 풍부하게 제공합니다."
    },
    {
      title: "사후 포트폴리오: 나만의 배움 포트폴리오: 체험학습 스탬프북 및 추억 신문 제작",
      summary: "체험 현장에서 찍은 나의 활동 사진 인화물 부착, 나만의 체험 일기 완성.",
      eval: "자신의 체험 경험을 사진 및 다양한 표현 양식을 통해 시각적으로 구성하는지 포트폴리오 평가",
      intro: "인쇄된 활동 사진들을 보며 가장 기억에 남는 장면 2~3가지 선택하기.",
      body: "스탬프북/신문 양식에 사진 붙이기, 말풍선 스티커 꾸미기, 스스로 해낸 미션에 도장 찍기.",
      outro: "완성된 나만의 체험학습 포트폴리오를 파일철에 보관하기.",
      questionExample: "이 사진 속에서 나는 무엇을 하고 있었나요? 그때 기분은 어땠나요?",
      feedbackTip: "소근육 조작이 어려운 학생에게는 벨크로 사진 카드나 굵은 펜을 제공합니다."
    },
    {
      title: "사후 성찰: 배움 나눔 및 성찰: 나의 성장 소감 발표회 및 감사 편지 전달",
      summary: "감정 카드/AAC/구어로 소감 발표하기, 스스로 해낸 점 칭찬하기, 감사 카드 쓰기.",
      eval: "자신의 감정과 배운 점을 자기표현 방식으로 나타내고 경청하는 태도 평가",
      intro: "우리 반 체험학습 하이라이트 영상 시청 및 성장 박수 나누기.",
      body: '포트폴리오를 들고 한 명씩 앞으로 나와 "내가 혼자 해낸 것" 발표하기.',
      outro: "전체 학생에게 '자립 탐험대 수료증' 수여 및 생활 실천 약속하기.",
      questionExample: "이번 체험학습을 통해 '나 혼자서도 할 수 있어요!'라고 말할 수 있는 것은 무엇인가요?",
      feedbackTip: "언어적 표현이 제한적인 학생도 박수, 태블릿 음성 등을 통해 동등하게 주인공으로 인정받도록 지원합니다."
    }
  ];

  for (let i = 1; i <= count; i++) {
    let assignedCodes = [];
    if (i === 1) {
      assignedCodes = [primaryStd];
    } else if (i === count) {
      assignedCodes = stdCodes.length > 1 ? [stdCodes[stdCodes.length - 1]] : [primaryStd];
    } else {
      assignedCodes = stdCodes.length > 1 ? [stdCodes[i % stdCodes.length]] : [primaryStd];
    }

    let itemData;
    let phase = "pre";
    let phaseBadge = "사전 준비";

    if (i <= counts.pre) {
      phase = "pre";
      phaseBadge = "사전 준비";
      const pIdx = i - 1;
      const tIdx = counts.pre === 4 ? pIdx : Math.floor((pIdx / counts.pre) * preActivities.length);
      itemData = { ...preActivities[Math.min(tIdx, preActivities.length - 1)] };
    } else if (i <= counts.pre + counts.field) {
      phase = "field";
      phaseBadge = "현장 적용";
      const pIdx = i - counts.pre - 1;
      const tIdx = counts.field === 2 ? pIdx : Math.floor((pIdx / counts.field) * fieldActivities.length);
      itemData = { ...fieldActivities[Math.min(tIdx, fieldActivities.length - 1)] };
    } else {
      phase = "post";
      phaseBadge = "사후 정리";
      const pIdx = i - counts.pre - counts.field - 1;
      const tIdx = counts.post === 4 ? pIdx : Math.floor((pIdx / counts.post) * postActivities.length);
      itemData = { ...postActivities[Math.min(tIdx, postActivities.length - 1)] };
    }

    list.push({
      num: i,
      phase,
      phaseBadge,
      title: itemData.title,
      standardsCodes: assignedCodes,
      summary: itemData.summary,
      eval: itemData.eval,
      intro: itemData.intro,
      body: itemData.body,
      outro: itemData.outro,
      questionExample: itemData.questionExample,
      feedbackTip: itemData.feedbackTip
    });
  }
  return list;
}

// ============================================================================
// HWPX 다운로드, 클립보드 복사, PDF 인쇄 트리거
// ============================================================================
async function triggerHwpxDownload() {
  try {
    const periods = generatePeriodsDataWithStandards(appState.plan);
    showToast("한글(HWPX) 공문서 파일을 생성하고 있습니다...", "info");
    await generateAndDownloadHwpx(appState.plan, periods);
    showToast("한글(HWPX) 파일이 성공적으로 다운로드되었습니다!", "success");
  } catch (err) {
    console.error("HWPX 다운로드 실패:", err);
    showToast("HWPX 생성 중 오류가 발생했습니다. 브라우저 콘솔을 확인해 주세요.", "error");
  }
}

function triggerCopyCurriculum() {
  const p = appState.plan;
  const counts = calculatePeriodRatioCounts(p.periodCount);
  const periods = generatePeriodsDataWithStandards(p);
  const text = `[2026학년도 ${p.schoolLevel} 특수교육 현장체험학습 교육과정 설계안]

1. 프로젝트 개요
- 프로젝트명: ${p.theme}
- 학교급 및 장소: ${p.schoolLevel} | ${p.locationName}
- 차시 배분: 총 ${p.periodCount}차시 [사전 ${counts.pre}차시 : 현장 ${counts.field}차시 : 사후 ${counts.post}차시 (4:2:4 비율)] (${p.difficultyLevel})
- 수업 방식: ${p.teachingMethod}
- 핵심 질문: 우리 마을 ${p.locationName}에서 나에게 필요한 것을 스스로 찾고 안전하게 참여하려면 어떻게 해야 할까?

2. 연계 성취기준
${p.standards.map(s => `- ${s.code} ${s.title}: ${s.desc}`).join("\n")}

3. 학습 목표
- [지식] ${p.goalKnowledge}
- [기능] ${p.goalSkill}
- [태도] ${p.goalAttitude}

4. 참가 학생 맞춤 지원 대책 (익명화 완료)
${p.functionalNeeds.join("\n")}

5. 차시별 수업 계획 (사전:현장:사후 4:2:4 비율 구성)
${periods.map(item => `[${item.num}차시 / ${item.phaseBadge}] ${item.title} (연계: ${item.standardsCodes.join(', ')})\n  - 활동: ${item.summary}\n  - 평가: ${item.eval}`).join("\n\n")}
`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("교육과정 전체 내용이 클립보드에 복사되었습니다.", "success");
    }).catch(() => {
      fallbackCopyText(text);
    });
  } else {
    fallbackCopyText(text);
  }
}

function fallbackCopyText(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    showToast("교육과정 전체 내용이 클립보드에 복사되었습니다.", "success");
  } catch (err) {
    showToast("클립보드 복사에 실패했습니다.", "error");
  }
  document.body.removeChild(ta);
}

function triggerPrintPdf() {
  const printArea = document.getElementById("printContainer");
  const udlArea = document.getElementById("udlPrintArea");
  if (printArea && udlArea) {
    printArea.innerHTML = udlArea.innerHTML;
    window.print();
  }
}

function showToast(msg, type = "info") {
  const shelf = document.getElementById("toastShelf");
  if (!shelf) return;

  const t = document.createElement("div");
  t.className = `soft-toast ${type === "error" ? "toast-error" : type === "success" ? "toast-success" : ""}`;
  t.setAttribute("role", "status");
  t.setAttribute("aria-live", "polite");
  t.textContent = msg;
  shelf.appendChild(t);

  setTimeout(() => {
    t.style.opacity = "0";
    setTimeout(() => {
      if (t.parentNode) t.parentNode.removeChild(t);
    }, 300);
  }, 2400);
}
