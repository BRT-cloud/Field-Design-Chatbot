import { 
  SCHOOL_LEVEL_OPTIONS, 
  LOCATION_PRESETS, 
  THEME_SUGGESTIONS, 
  EVALUATION_FOCUS_OPTIONS, 
  TEACHING_METHOD_OPTIONS,
  getStandardsForSchoolLevel,
  getRecommendedStandards 
} from './standards-data.js';
import { generateAndDownloadHwpx } from './hwpx-generator.js';

// ============================================================================
// 애플리케이션 상태 (State)
// ============================================================================
const appState = {
  step: 1, // 1 ~ 11
  plan: {
    // 1. 학교급
    schoolLevel: "초등학교", // "초등학교" | "중학교" | "고등학교"
    
    // 2. 장소
    locationId: "loc-mart",
    locationName: "대형마트 / 전통시장",
    
    // 3. 성취기준
    standards: [],
    customStandardInput: "",
    
    // 4. 주제
    theme: "나 스스로 고르고 결제하는 슬기로운 마트 장보기",
    
    // 5. 차시 및 난이도 (사전 4 : 현장 2 : 사후 4 비율 적용)
    periodCount: 10,
    difficultyLevel: "기본/적용 수준 (언어적·시각적 단서 및 단계적 촉진)",
    
    // 6. 평가 중점
    evalFocusId: "eval-independence",
    evalFocusTitle: "독립적 수행도 (자립 생활 역량)",
    
    // 7. 목표
    goalKnowledge: "지역사회 매장의 구조와 물건 구매 및 결제 절차를 이해한다.",
    goalSkill: "시각 단서와 AAC를 활용하여 필요한 물건을 찾고 결제 과정을 독립적으로 수행한다.",
    goalAttitude: "공공장소 에티켓과 보행 안전 수칙을 지키며 즐겁게 참여한다.",
    
    // 8. 고려해야 할 장애특성 (기능적 지원 요구)
    functionalNeeds: [
      "휠체어 이동 지원 1명 (무단차 경사로 및 엘리베이터 동선 확보)",
      "시각적 일과표 및 사진 단서 필요 2명",
      "소음 민감성 대비 조용한 쉼터 동선 1명"
    ],
    
    // 9. 수업 방식
    teachingMethod: "프로젝트 학습 (PBL)",
    
    // 11. 업로드된 양식 정보
    uploadedFileName: "2026_현장체험학습_기안양식_기본형.hwpx",
    uploadedFileMerged: true
  }
};

// ============================================================================
// 초기화 및 이벤트 리스너
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 기본 성취기준 초기화
  initDefaultStandards();
  renderStep(appState.step);
  setupNavEvents();
});

function initDefaultStandards() {
  const recommended = getRecommendedStandards(appState.plan.schoolLevel, appState.plan.locationId);
  if (recommended.length > 0) {
    appState.plan.standards = [recommended[0]];
  }
}

function setupNavEvents() {
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
        window.resetWizard();
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      window.resetWizard();
    });
  }
}

window.resetWizard = () => {
  appState.step = 1;
  initDefaultStandards();
  goToStep(1);
  showToast("1단계로 돌아왔습니다. 새로 설계를 시작합니다.", "info");
};

function goToStep(targetStep) {
  appState.step = targetStep;
  renderStep(targetStep);
}

// ============================================================================
// 스텝 렌더러 (총 11단계)
// ============================================================================
function renderStep(step) {
  // 상단 인디케이터 업데이트
  document.getElementById("stepCounterText").textContent = `STEP ${String(step).padStart(2, '0')} / 11`;
  document.getElementById("stepProgressFill").style.width = `${(step / 11) * 100}%`;

  const prevBtn = document.getElementById("prevStepBtn");
  const nextBtn = document.getElementById("nextStepBtn");
  const nextBtnText = document.getElementById("nextStepBtnText");

  prevBtn.style.visibility = step > 1 ? "visible" : "hidden";
  
  // 10단계(UDL 결과물) 아래 버튼 텍스트: "체험학습 계획서 작성하러 가기 >"
  if (step === 10) {
    nextBtnText.textContent = "체험학습 계획서 작성하러 가기 >";
  } else if (step === 11) {
    nextBtnText.textContent = "처음으로 (다시 작성) >";
  } else {
    nextBtnText.textContent = "다음 단계 >";
  }

  const pill = document.getElementById("cardStepPill");
  const title = document.getElementById("cardQuestionTitle");
  const subtitle = document.getElementById("cardQuestionSubtitle");
  const box = document.getElementById("cardInteractionBox");

  switch (step) {
    case 1:
      renderStep1_SchoolLevel(pill, title, subtitle, box);
      break;
    case 2:
      renderStep2_Location(pill, title, subtitle, box);
      break;
    case 3:
      renderStep3_Standards(pill, title, subtitle, box);
      break;
    case 4:
      renderStep4_Theme(pill, title, subtitle, box);
      break;
    case 5:
      renderStep5_PeriodsAndDifficulty(pill, title, subtitle, box);
      break;
    case 6:
      renderStep6_EvalFocus(pill, title, subtitle, box);
      break;
    case 7:
      renderStep7_Goals(pill, title, subtitle, box);
      break;
    case 8:
      renderStep8_FunctionalNeeds(pill, title, subtitle, box);
      break;
    case 9:
      renderStep9_TeachingMethod(pill, title, subtitle, box);
      break;
    case 10:
      renderStep10_UdlDeliverable(pill, title, subtitle, box);
      break;
    case 11:
      renderStep11_TemplateSynthesis(pill, title, subtitle, box);
      break;
    default:
      break;
  }
}

// ----------------------------------------------------------------------------
// 1. 학교급 선택 (초등학교 / 중학교 / 고등학교)
// ----------------------------------------------------------------------------
function renderStep1_SchoolLevel(pill, title, subtitle, box) {
  pill.textContent = "1단계: 학교급 선택";
  title.textContent = "어느 학교급의 체험학습을 설계하시나요?";
  subtitle.textContent = "선택하신 학교급에 맞추어 국가 교육과정 성취기준을 연결하고 맞춤형 추천을 제공합니다.";

  box.innerHTML = `
    <div class="choice-grid-cards">
      ${SCHOOL_LEVEL_OPTIONS.map(opt => `
        <div class="choice-bubble-card ${appState.plan.schoolLevel === opt.name ? 'selected' : ''}" 
             onclick="window.selectSchoolLevel('${opt.name}')">
          <div class="choice-card-top">
            <span class="choice-card-badge">${opt.badge}</span>
          </div>
          <h3 class="choice-card-title">${opt.name}</h3>
          <p class="choice-card-desc">${opt.desc}</p>
        </div>
      `).join("")}
    </div>
  `;
}

window.selectSchoolLevel = (levelName) => {
  appState.plan.schoolLevel = levelName;
  // 학교급에 맞는 성취기준 자동 갱신
  const recommended = getRecommendedStandards(levelName, appState.plan.locationId);
  if (recommended.length > 0) {
    appState.plan.standards = [recommended[0]];
  }
  renderStep(1);
  showToast(`'${levelName}' 교육과정이 설정되었습니다.`, "info");
};

// ----------------------------------------------------------------------------
// 2. 체험학습 장소
// ----------------------------------------------------------------------------
function renderStep2_Location(pill, title, subtitle, box) {
  pill.textContent = "2단계: 체험학습 장소";
  title.textContent = "이번 체험학습은 어디로 떠나나요?";
  subtitle.textContent = "학생들과 함께 배움을 경험할 지역사회 공간을 선택하거나 직접 입력해 주세요.";

  box.innerHTML = `
    <div class="choice-grid-cards">
      ${LOCATION_PRESETS.map(loc => `
        <div class="choice-bubble-card ${appState.plan.locationId === loc.id ? 'selected' : ''}" 
             onclick="window.selectLocation('${loc.id}', '${loc.name}')">
          <div class="choice-card-top">
            <span class="choice-card-badge">${loc.icon}</span>
          </div>
          <h3 class="choice-card-title">${loc.name}</h3>
          <p class="choice-card-desc">${loc.desc}</p>
        </div>
      `).join("")}
    </div>
    <div class="soft-input-group">
      <label style="font-size: 0.92rem; font-weight: 700; color: var(--text-muted);">직접 입력하기:</label>
      <input type="text" class="soft-text-input" id="customLocationInput" 
             placeholder="예: 서울숲 곤충식물원, 뚜레쥬르 베이커리 등 직접 입력" 
             value="${appState.plan.locationName}" 
             oninput="window.updateLocationName(this.value)">
    </div>
  `;
}

window.selectLocation = (locId, locName) => {
  appState.plan.locationId = locId;
  appState.plan.locationName = locName;
  // 학교급과 장소에 맞춤형 성취기준 추천
  const recommended = getRecommendedStandards(appState.plan.schoolLevel, locId);
  if (recommended.length > 0) {
    appState.plan.standards = [recommended[0]];
  }
  const themes = THEME_SUGGESTIONS[locId];
  if (themes && themes.length > 0) {
    appState.plan.theme = themes[0];
  }
  renderStep(2);
  showToast(`'${locName}' 장소가 선택되었습니다.`, "info");
};

window.updateLocationName = (val) => {
  appState.plan.locationName = val;
};

// ----------------------------------------------------------------------------
// 3. 성취기준 설정 (입력 부분이 위로, 추천이 아래로 배치)
// ----------------------------------------------------------------------------
function renderStep3_Standards(pill, title, subtitle, box) {
  pill.textContent = "3단계: 성취기준 설정";
  title.textContent = "어떤 교육과정 성취기준을 연결할까요?";
  subtitle.textContent = `${appState.plan.schoolLevel} 교육과정 기반 성취기준을 직접 입력하거나 아래 추천 목록에서 선택해 주세요.`;

  const selectedCodes = appState.plan.standards.map(s => s.code);
  const recommended = getRecommendedStandards(appState.plan.schoolLevel, appState.plan.locationId);
  
  // 데이터 출처 안내 문구
  const sourceGuide = appState.plan.schoolLevel === "초등학교" 
    ? "교육과정 성취기준 체크리스트 (초등 국어·바생·슬생·즐생·사회·수학 발췌)"
    : "korean-secondary-learning-map 2022 개정 중·고등학교 교육과정";

  box.innerHTML = `
    <div class="standards-picker-container">
      <!-- [상단 배치] 성취기준 직접 입력 / 검색창 -->
      <div class="soft-input-group" style="margin-top: 0; background: #fff8f8; padding: 1.1rem; border-radius: 18px; border: 2px dashed #fecdd3;">
        <label style="font-size: 0.95rem; font-weight: 800; color: #e11d48;">
          성취기준 직접 입력 또는 검색하기 (상단 우선 입력):
        </label>
        <div style="display: flex; gap: 0.6rem; margin-top: 0.35rem;">
          <input type="text" class="soft-text-input" id="customStdInputField"
                 placeholder="예: [2국01-01] 상황에 어울리는 인사말을 주고받는다" 
                 value="${appState.plan.customStandardInput}" 
                 oninput="window.updateCustomStandard(this.value)">
          <button type="button" class="btn-bubble-tool" style="padding: 0 1.2rem; white-space: nowrap;" onclick="window.addCustomStandardFromInput()">
            추가하기
          </button>
        </div>
      </div>

      <!-- [하단 배치] 학교급 맞춤형 추천 성취기준 목록 -->
      <div style="margin-top: 0.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
          <span style="font-family: 'Jua', sans-serif; font-size: 1.1rem; color: var(--text-main);">
            '${appState.plan.locationName}' 맞춤 추천 성취기준 (${appState.plan.schoolLevel}):
          </span>
          <span style="font-size: 0.76rem; color: var(--text-muted); background: #fff1f2; padding: 0.2rem 0.6rem; border-radius: 12px;">
            출처: ${sourceGuide}
          </span>
        </div>

        <div class="standards-bubble-list">
          ${recommended.map(std => {
            const isSelected = selectedCodes.includes(std.code);
            return `
              <div class="standard-pick-item ${isSelected ? 'selected' : ''}" 
                   onclick="window.toggleStandardItem('${std.code}')">
                <div style="display: flex; flex-direction: column; gap: 0.35rem; flex: 1; text-align: left;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <span class="std-code-badge">${std.code}</span>
                    <span style="font-size: 0.78rem; background: #f1f5f9; color: #0f172a; padding: 0.15rem 0.6rem; border-radius: 9999px; font-weight: 700; border: 1px solid #e2e8f0;">${std.subject}</span>
                    <span style="font-weight: 800; font-size: 0.96rem; color: #0f172a;">${std.title}</span>
                  </div>
                  <div style="font-size: 0.92rem; color: #334155; line-height: 1.55; word-break: keep-all;">${std.desc}</div>
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

window.toggleStandardItem = (code) => {
  const all = getStandardsForSchoolLevel(appState.plan.schoolLevel);
  const idx = appState.plan.standards.findIndex(s => s.code === code);
  if (idx >= 0) {
    if (appState.plan.standards.length === 1) {
      showToast("최소 1개 이상의 성취기준이 필요합니다.", "info");
      return;
    }
    appState.plan.standards.splice(idx, 1);
  } else {
    const found = all.find(s => s.code === code) || { code, title: "성취기준", subject: "공통", desc: code };
    appState.plan.standards.push(found);
  }
  renderStep(3);
};

window.updateCustomStandard = (val) => {
  appState.plan.customStandardInput = val;
};

window.addCustomStandardFromInput = () => {
  const val = appState.plan.customStandardInput.trim();
  if (!val) {
    showToast("성취기준 내용을 입력해 주세요.", "info");
    return;
  }
  const customObj = {
    code: val.startsWith("[") ? val.slice(0, val.indexOf("]") + 1) : "[직접입력]",
    title: "사용자 직접 입력",
    subject: "공통",
    desc: val.startsWith("[") ? val.slice(val.indexOf("]") + 1).trim() : val
  };
  appState.plan.standards.push(customObj);
  appState.plan.customStandardInput = "";
  renderStep(3);
  showToast("새 성취기준이 추가되었습니다.", "success");
};

// ----------------------------------------------------------------------------
// 4. 체험학습 주제 선택
// ----------------------------------------------------------------------------
function renderStep4_Theme(pill, title, subtitle, box) {
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
             onclick="window.selectThemeOption('${thm}')">
          <div class="choice-card-top">
            <span class="choice-card-badge">추천 주제 0${i + 1}</span>
          </div>
          <h3 class="choice-card-title">${thm}</h3>
          <p class="choice-card-desc">실생활 맥락 중심의 학생 주도형 ${appState.plan.schoolLevel} 체험 프로젝트</p>
        </div>
      `).join("")}
    </div>
    <div class="soft-input-group">
      <label style="font-size: 0.92rem; font-weight: 700; color: var(--text-muted);">주제 직접 수정하기:</label>
      <input type="text" class="soft-text-input" 
             value="${appState.plan.theme}" 
             oninput="window.updateThemeTitle(this.value)">
    </div>
  `;
}

window.selectThemeOption = (thm) => {
  appState.plan.theme = thm;
  renderStep(4);
  showToast("수업 주제가 선택되었습니다.", "info");
};

window.updateThemeTitle = (val) => {
  appState.plan.theme = val;
};

// ----------------------------------------------------------------------------
// 차시 비율 분배 헬퍼 함수 (사전:현장:사후 = 4:2:4 / 40%:20%:40%)
// ----------------------------------------------------------------------------
export function calculatePeriodRatioCounts(total) {
  const n = Math.max(1, parseInt(total, 10) || 10);
  if (n === 1) return { pre: 0, field: 1, post: 0, total: 1 };
  if (n === 2) return { pre: 1, field: 1, post: 0, total: 2 };
  if (n === 3) return { pre: 1, field: 1, post: 1, total: 3 };

  // 4 : 2 : 4 비율 (40% : 20% : 40%)
  let pre = Math.round(n * 0.4);
  let field = Math.round(n * 0.2);
  let post = n - pre - field;

  // 최소 각 1차시씩 보장
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
// 5. 차시 수 직접 입력 안내 및 수업 난이도 (사전:현장:사후 4:2:4 비율)
// ----------------------------------------------------------------------------
function renderStep5_PeriodsAndDifficulty(pill, title, subtitle, box) {
  pill.textContent = "5단계: 차시 수 및 수업 난이도";
  title.textContent = "몇 차시 수업으로 계획하고, 난이도는 어떻게 할까요?";
  subtitle.textContent = "사전:현장:사후 4:2:4 비율을 기반으로 최적화된 로드맵을 설계합니다. 차시 수와 난이도를 선택해 주세요.";

  const counts = calculatePeriodRatioCounts(appState.plan.periodCount);
  const total = appState.plan.periodCount;
  const prePct = Math.round((counts.pre / total) * 100);
  const fieldPct = Math.round((counts.field / total) * 100);
  const postPct = 100 - prePct - fieldPct;

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
        <h4 class="sub-box-title">수업 운영 차시 수 (직접 입력 / 빠른 선택):</h4>
        <div style="display: flex; align-items: center; gap: 0.8rem; margin-top: 0.4rem;">
          <input type="number" min="1" max="20" class="soft-text-input" 
                 style="width: 110px; font-size: 1.4rem; font-family: 'Jua', sans-serif; text-align: center; padding: 0.6rem;" 
                 value="${appState.plan.periodCount}" 
                 onchange="window.setPeriodCountDirect(this.value, true)"
                 oninput="window.setPeriodCountDirect(this.value, false)">
          <span style="font-family: 'Jua', sans-serif; font-size: 1.3rem; color: var(--primary-pink);">차시</span>
        </div>

        <div style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.5rem;">
          자주 사용하는 차시 빠른 선택:
        </div>
        <div class="pill-option-group">
          ${quickOptions.map(opt => `
            <button type="button" class="pill-option-btn ${appState.plan.periodCount === opt.count ? 'selected' : ''}" 
                    onclick="window.setPeriodCountDirect(${opt.count}, true)">
              ${opt.label}
            </button>
          `).join("")}
        </div>

        <!-- 4:2:4 비율 시각적 배너 -->
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
      </div>

      <!-- 난이도 선택 영역 (기존 유지) -->
      <div class="selector-sub-box">
        <h4 class="sub-box-title">수업 수준 (난이도 및 촉진 지원):</h4>
        <div style="display: flex; flex-direction: column; gap: 0.65rem;">
          ${levels.map(lvl => `
            <div class="choice-bubble-card ${appState.plan.difficultyLevel.includes(lvl.title) ? 'selected' : ''}" 
                 style="padding: 0.95rem 1.1rem;" 
                 onclick="window.setDifficultyLevel('${lvl.title} (${lvl.desc})')">
              <span style="font-family: 'Jua', sans-serif; font-size: 1.1rem; color: var(--text-main);">${lvl.title}</span>
              <span style="font-size: 0.84rem; color: var(--text-muted);">${lvl.desc}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

window.setPeriodCountDirect = (val, shouldRerender = true) => {
  const num = parseInt(val, 10);
  if (!isNaN(num) && num > 0) {
    appState.plan.periodCount = Math.min(Math.max(num, 1), 30);
    if (shouldRerender) {
      renderStep(5);
    }
  }
};

window.setDifficultyLevel = (levelStr) => {
  appState.plan.difficultyLevel = levelStr;
  renderStep(5);
};

// ----------------------------------------------------------------------------
// 6. 평가 중점 선택
// ----------------------------------------------------------------------------
function renderStep6_EvalFocus(pill, title, subtitle, box) {
  pill.textContent = "6단계: 평가 중점 선택";
  title.textContent = "이번 체험학습에서 가장 중요하게 평가할 영역은 무엇인가요?";
  subtitle.textContent = "핵심 성취기준 및 학생 특성과 연결된 핵심 평가 관점을 선택해 주세요.";

  box.innerHTML = `
    <div class="choice-grid-cards">
      ${EVALUATION_FOCUS_OPTIONS.map(ef => `
        <div class="choice-bubble-card ${appState.plan.evalFocusId === ef.id ? 'selected' : ''}" 
             onclick="window.selectEvalFocus('${ef.id}', '${ef.title}')">
          <div class="choice-card-top">
            <span class="choice-card-badge">평가 관점</span>
          </div>
          <h3 class="choice-card-title">${ef.title}</h3>
          <p class="choice-card-desc">${ef.desc}</p>
        </div>
      `).join("")}
    </div>
  `;
}

window.selectEvalFocus = (id, title) => {
  appState.plan.evalFocusId = id;
  appState.plan.evalFocusTitle = title;
  if (id === "eval-independence") {
    appState.plan.goalKnowledge = `${appState.plan.locationName}의 시설 이용 절차와 물품 구매 방법을 이해한다.`;
    appState.plan.goalSkill = "최소한의 촉진으로 스스로 필요한 물품을 선택하고 결제를 독립적으로 완수한다.";
    appState.plan.goalAttitude = "스스로 해냈다는 자립 생활의 성취감과 자신감을 갖는다.";
  } else if (id === "eval-communication") {
    appState.plan.goalKnowledge = "상황에 맞는 인사말과 물품 요구 시 필요한 의사소통 표현을 안다.";
    appState.plan.goalSkill = "현장 직원에게 AAC 도구 또는 구어로 원하는 것을 명확히 표현한다.";
    appState.plan.goalAttitude = "상대방의 반응을 경청하고 감사하는 바른 태도를 형성한다.";
  } else if (id === "eval-safety") {
    appState.plan.goalKnowledge = "공공장소와 보행 환경에서 지켜야 할 안전 수칙 및 관람 에티켓을 안다.";
    appState.plan.goalSkill = "차례 지키기, 조용히 관람하기, 신호등 지키기 등의 안전 행동을 실천한다.";
    appState.plan.goalAttitude = "다른 이용자를 배려하고 공공질서를 준수하려는 태도를 지닌다.";
  } else {
    appState.plan.goalKnowledge = `${appState.plan.locationName}에서 경험할 수 있는 다양한 활동을 탐색한다.`;
    appState.plan.goalSkill = "자신의 흥미와 선호에 따라 적극적으로 활동에 참여하고 표현한다.";
    appState.plan.goalAttitude = "배움의 즐거움을 느끼고 긍정적인 정서적 유대감을 나눈다.";
  }
  renderStep(6);
  showToast(`평가 중점이 '${title}'(으)로 설정되었습니다.`, "info");
};

// ----------------------------------------------------------------------------
// 7. 평가 중점에 따른 목표 설정
// ----------------------------------------------------------------------------
function renderStep7_Goals(pill, title, subtitle, box) {
  pill.textContent = "7단계: 체험학습 목표 설정";
  title.textContent = "설정한 평가 중점에 맞춘 3차원 학습 목표입니다.";
  subtitle.textContent = "지식·기능·태도 측면에서 학생들이 도달할 구체적인 수업 목표를 확인하고 필요시 다듬어 주세요.";

  box.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div class="choice-bubble-card selected" style="cursor: default;">
        <span style="font-family: 'Jua', sans-serif; font-size: 0.95rem; color: var(--primary-pink);">[지식·이해 목표]</span>
        <input type="text" class="soft-text-input" style="padding: 0.75rem 1rem; font-size: 1rem;" 
               value="${appState.plan.goalKnowledge}" 
               oninput="appState.plan.goalKnowledge = this.value">
      </div>

      <div class="choice-bubble-card selected" style="cursor: default;">
        <span style="font-family: 'Jua', sans-serif; font-size: 0.95rem; color: #10b981;">[기능·수행 목표]</span>
        <input type="text" class="soft-text-input" style="padding: 0.75rem 1rem; font-size: 1rem;" 
               value="${appState.plan.goalSkill}" 
               oninput="appState.plan.goalSkill = this.value">
      </div>

      <div class="choice-bubble-card selected" style="cursor: default;">
        <span style="font-family: 'Jua', sans-serif; font-size: 0.95rem; color: #a855f7;">[가치·태도 목표]</span>
        <input type="text" class="soft-text-input" style="padding: 0.75rem 1rem; font-size: 1rem;" 
               value="${appState.plan.goalAttitude}" 
               oninput="appState.plan.goalAttitude = this.value">
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 8. 장애특성 및 개인정보 보호 (주의 문구 명시)
// ----------------------------------------------------------------------------
function renderStep8_FunctionalNeeds(pill, title, subtitle, box) {
  pill.textContent = "8단계: 장애특성 및 맞춤 지원";
  title.textContent = "현장에서 특별히 고려해야 할 장애특성이 있나요?";
  subtitle.textContent = "이동 지원(휠체어), 감각 조절, 의사소통 보조 등 안전하고 편안한 배움을 위해 필요한 지원을 적어주세요.";

  box.innerHTML = `
    <!-- 개인정보 보호 필수 주의 문구 강조 -->
    <div class="privacy-notice-bubble">
      <span class="privacy-notice-badge">개인정보 주의</span>
      <span>
        <strong>개인식별정보 입력 절대 금지:</strong> 학생 실명, 전화번호, 주민등록번호, 특정 질환명은 절대 입력하지 마세요! 
        (예: "휠체어 이동 지원 1명", "시각적 일과표 2명", "소음 민감성 1명" 형태로만 기재)
      </span>
    </div>

    <div style="font-family: 'Jua', sans-serif; font-size: 1rem; color: var(--text-main); margin-bottom: 0.5rem;">
      자주 활용되는 기능적 지원 요구 태그 (클릭 시 추가):
    </div>
    <div class="pill-option-group" style="margin-bottom: 1rem;">
      <button type="button" class="pill-option-btn" onclick="window.addFunctionalTag('휠체어 이동 지원 1명 (무단차 경사로 필요)')">+ 휠체어 이동 지원</button>
      <button type="button" class="pill-option-btn" onclick="window.addFunctionalTag('시각적 단계별 일과표 및 사진 단서 필요 2명')">+ 시각적 일과표</button>
      <button type="button" class="pill-option-btn" onclick="window.addFunctionalTag('AAC 그림 상징판 및 스마트 보완의사소통 지원 1명')">+ AAC 의사소통</button>
      <button type="button" class="pill-option-btn" onclick="window.addFunctionalTag('소음 민감성 대비 저소음 휴식 쉼터 동선 1명')">+ 소음 감각 조절</button>
      <button type="button" class="pill-option-btn" onclick="window.addFunctionalTag('돌발 이탈 예방 1:1 보조인력 밀착 동행 1명')">+ 1:1 안전 동행</button>
    </div>

    <div class="soft-input-group">
      <label style="font-size: 0.92rem; font-weight: 700; color: var(--text-muted);">현재 등록된 맞춤 지원 사항:</label>
      <textarea class="soft-text-input" rows="4" style="line-height: 1.5; resize: none;" 
                oninput="window.updateFunctionalNeeds(this.value)">${appState.plan.functionalNeeds.join("\n")}</textarea>
    </div>
  `;
}

window.addFunctionalTag = (tag) => {
  if (!appState.plan.functionalNeeds.includes(tag)) {
    appState.plan.functionalNeeds.push(tag);
    renderStep(8);
    showToast("지원 요구 사항이 추가되었습니다.", "info");
  }
};

window.updateFunctionalNeeds = (val) => {
  appState.plan.functionalNeeds = val.split("\n").filter(line => line.trim().length > 0);
};

// ----------------------------------------------------------------------------
// 9. 수업 방식 확인
// ----------------------------------------------------------------------------
function renderStep9_TeachingMethod(pill, title, subtitle, box) {
  pill.textContent = "9단계: 수업 방식 확인";
  title.textContent = "어떤 수업 방식으로 배움을 이끌어갈까요?";
  subtitle.textContent = "프로젝트 학습, 협력학습, 질문식 수업, 직접 시연 수업 중 이번 체험학습의 주요 방식을 선택해 주세요.";

  box.innerHTML = `
    <div class="choice-grid-cards">
      ${TEACHING_METHOD_OPTIONS.map(m => `
        <div class="choice-bubble-card ${appState.plan.teachingMethod.includes(m.name) ? 'selected' : ''}" 
             onclick="window.selectTeachingMethod('${m.name}')">
          <div class="choice-card-top">
            <span class="choice-card-badge">${m.badge}</span>
          </div>
          <h3 class="choice-card-title">${m.name}</h3>
          <p class="choice-card-desc">${m.desc}</p>
        </div>
      `).join("")}
    </div>
  `;
}

window.selectTeachingMethod = (name) => {
  appState.plan.teachingMethod = name;
  renderStep(9);
  showToast(`수업 방식이 '${name}'(으)로 설정되었습니다.`, "info");
};

// ----------------------------------------------------------------------------
// 10. UDL 최종 결과물 (성취기준 연계 표시, 실제 HWPX 다운로드 구현)
// ----------------------------------------------------------------------------
function renderStep10_UdlDeliverable(pill, title, subtitle, box) {
  pill.textContent = "10단계: UDL 최종 교육과정 결과물";
  title.textContent = "설계하신 특수교육 현장체험학습 교육과정안입니다.";
  subtitle.textContent = "각 차시별 연계 성취기준과 세부 활동을 확인하고, 한글(HWPX) 또는 PDF 파일로 다운로드하세요.";

  const p = appState.plan;
  const periods = generatePeriodsDataWithStandards(p);

  box.innerHTML = `
    <div class="export-action-shelf">
      <button type="button" class="btn-bubble-tool" onclick="window.copyFullCurriculumText()">내용 전체 복사</button>
      <button type="button" class="btn-bubble-tool" style="background: #ffe4e6; color: #e11d48;" onclick="window.downloadRealHwpx()">
        한글(HWPX) 다운로드
      </button>
      <button type="button" class="btn-soft-primary" style="padding: 0.5rem 1.2rem; font-size: 0.88rem;" onclick="window.printPdfDocument()">
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
              <td><strong>${p.theme}</strong></td>
            </tr>
            <tr>
              <th>학교급 및 장소</th>
              <td><strong>${p.schoolLevel}</strong> | ${p.locationName} (${p.periodCount}차시 [사전 ${calculatePeriodRatioCounts(p.periodCount).pre} · 현장 ${calculatePeriodRatioCounts(p.periodCount).field} · 사후 ${calculatePeriodRatioCounts(p.periodCount).post} (4:2:4)] / ${p.difficultyLevel})</td>
            </tr>
            <tr>
              <th>핵심 개념 (Big Idea)</th>
              <td>자립 생활, 지역사회 상호작용, 안전한 이동 및 공공 에티켓</td>
            </tr>
            <tr>
              <th>핵심 질문 (Essential Question)</th>
              <td>"우리 마을 ${p.locationName}에서 나에게 필요한 것을 스스로 찾고 안전하게 이용하려면 어떻게 해야 할까?"</td>
            </tr>
            <tr>
              <th>연계 핵심 성취기준</th>
              <td>${p.standards.map(s => `<strong>${s.code}</strong> ${s.title}`).join(", ")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 2) 차시별 수업 계획 (전체 로드맵 표 - 사전:현장:사후 4:2:4 비율) -->
      <div class="result-section-box">
        <h2 class="result-section-title">2. 차시별 수업 계획 (전체 로드맵 - 사전:현장:사후 4:2:4 비율)</h2>
        ${(() => {
          const counts = calculatePeriodRatioCounts(p.periodCount);
          const total = p.periodCount;
          const prePct = Math.round((counts.pre / total) * 100);
          const fieldPct = Math.round((counts.field / total) * 100);
          const postPct = 100 - prePct - fieldPct;
          return `
            <div class="ratio-banner-box" style="margin-bottom: 0.8rem;">
              <div class="ratio-bar-wrapper">
                <div class="ratio-bar-segment pre" style="width: ${prePct}%;"></div>
                <div class="ratio-bar-segment field" style="width: ${fieldPct}%;"></div>
                <div class="ratio-bar-segment post" style="width: ${postPct}%;"></div>
              </div>
              <div class="ratio-legend-row">
                <span style="color: #be123c;">🌸 사전 준비: ${counts.pre}차시 (${prePct}%)</span>
                <span style="color: #0369a1;">🚌 현장 적용: ${counts.field}차시 (${fieldPct}%)</span>
                <span style="color: #15803d;">🌱 사후 정리: ${counts.post}차시 (${postPct}%)</span>
              </div>
            </div>
          `;
        })()}
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
                    <span class="phase-tag ${item.phase}">${item.phaseBadge}</span>
                    <span style="font-size: 1.05rem;">${item.num}차시</span>
                  </div>
                </td>
                <td><strong>${item.title}</strong></td>
                <td>
                  ${item.standardsCodes.map(code => `<span class="linked-std-pill">${code}</span>`).join(" ")}
                </td>
                <td>${item.summary}</td>
                <td>${item.eval}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- 3) 차시별 세부 수업 계획안 (도입-전개-정리 및 연계 성취기준 표시) -->
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
                <span class="phase-tag ${item.phase}">${item.phaseBadge}</span>
                <span>${item.num}차시: ${item.title}</span>
              </span>
              <div>
                ${item.standardsCodes.map(code => `<span class="linked-std-pill">${code}</span>`).join(" ")}
              </div>
            </div>
            <div style="font-size: 0.92rem; line-height: 1.6; color: var(--text-main);">
              <p><strong>[도입]</strong> ${item.intro}</p>
              <p style="margin-top: 0.35rem;"><strong>[전개]</strong> ${item.body}</p>
              <p style="margin-top: 0.35rem;"><strong>[정리]</strong> ${item.outro}</p>
              <p style="margin-top: 0.55rem; color: #0284c7;"><strong>교사 발문 예시:</strong> "${item.questionExample}"</p>
              <p style="margin-top: 0.35rem; color: #16a34a;"><strong>교사 지원 및 맞춤형 피드백 팁:</strong> ${item.feedbackTip}</p>
            </div>
          </div>
        `}).join("")}
      </div>

      <!-- 4) 교수·학습 자료 제작 지원 -->
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
              <li>${p.locationName} 실물 사진 및 동영상</li>
              <li>오늘의 탐험 미션 3가지 안내</li>
            </ul>
          </div>
          <div class="ppt-slide-card">
            <div class="ppt-slide-num">슬라이드 02</div>
            <div class="ppt-slide-title">시각적 일과표 순서</div>
            <ul class="ppt-slide-bullets">
              <li>이동하기 → 물건 찾기 → 계산하기</li>
              <li>단계별 사진 픽토그램 안내</li>
            </ul>
          </div>
          <div class="ppt-slide-card">
            <div class="ppt-slide-num">슬라이드 03</div>
            <div class="ppt-slide-title">약속해요! 안전 규칙</div>
            <ul class="ppt-slide-bullets">
              <li>선생님 손잡고 횡단보도 건너기</li>
              <li>차례대로 줄 서서 기다리기</li>
            </ul>
          </div>
          <div class="ppt-slide-card">
            <div class="ppt-slide-num">슬라이드 04</div>
            <div class="ppt-slide-title">나의 미션 성공 확인</div>
            <ul class="ppt-slide-bullets">
              <li>영수증 확인 스탬프 팡팡</li>
              <li>오늘의 기분 사진 카드 고르기</li>
            </ul>
          </div>
        </div>

        <div style="font-family: 'Jua', sans-serif; font-size: 1.1rem; margin: 1.3rem 0 0.5rem 0; color: var(--text-main);">
          나. 학생용 맞춤 활동지/워크시트 제안:
        </div>
        <div style="background: #f1f5f9; padding: 1.1rem; border-radius: 14px; font-size: 0.92rem; line-height: 1.65;">
          <p>- <strong>기초 수준 워크시트:</strong> 물건 사진 스티커 짝 맞추기, 영수증 그림에 참 잘했어요 도장 찍기</p>
          <p>- <strong>적용 수준 워크시트:</strong> 내가 사고 싶은 간식 2가지 오려 붙이기, 가격 숫자 선 긋기</p>
          <p>- <strong>심화 수준 워크시트:</strong> 예산(5,000원) 내 물품 목록 적기, 거스름돈 뺄셈 계산해 보기</p>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 11. 기존 학교 체험학습계획서 양식 업로드 및 자동 반영
// ----------------------------------------------------------------------------
function renderStep11_TemplateSynthesis(pill, title, subtitle, box) {
  pill.textContent = "11단계: 학교 양식 자동 반영";
  title.textContent = "기존 학교 계획서 양식을 업로드해 주세요.";
  subtitle.textContent = "학교에서 사용하는 체험학습계획서 양식을 올리시면, 이번에 설계한 교육과정 내용이 완벽하게 반영된 최종 계획서로 제작해 드립니다.";

  const p = appState.plan;

  box.innerHTML = `
    <!-- 업로드 드롭존 -->
    <div class="template-upload-zone" onclick="document.getElementById('schoolTemplateFileInput').click()">
      <div class="upload-icon-bubble">HWP</div>
      <div class="upload-title">학교 체험학습계획서 양식 파일 업로드 (.hwpx, .hwp, .docx)</div>
      <div class="upload-desc">클릭하여 파일을 선택하거나 이곳으로 드래그하세요. (기본 내장 양식 즉시 적용 가능)</div>
      <input type="file" id="schoolTemplateFileInput" style="display: none;" accept=".hwpx,.hwp,.docx,.txt" onchange="window.handleTemplateUpload(event)">
    </div>

    <!-- 양식 자동 반영 미리보기 카드 -->
    <div class="merged-plan-card">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem;">
        <span style="font-family: 'Jua', sans-serif; font-size: 1.25rem; color: #065f46;">
          [자동 반영 완료] ${p.uploadedFileName}
        </span>
        <span style="background: #d1fae5; color: #065f46; font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 20px;">
          학교 서식 + UDL 설계안 합성됨
        </span>
      </div>
      <div style="font-size: 0.92rem; color: var(--text-main); line-height: 1.65; background: #f0fdf4; padding: 1.15rem; border-radius: 12px;">
        <p><strong>수신:</strong> 내부결재 | <strong>제목:</strong> 2026학년도 ${p.schoolLevel} 특수학급 현장체험학습 운영 계획(안)</p>
        <p><strong>1. 목적 및 주제:</strong> ${p.theme} (${p.teachingMethod})</p>
        <p><strong>2. 체험 장소:</strong> ${p.locationName} (${p.periodCount}차시 / ${p.difficultyLevel})</p>
        <p><strong>3. 연계 성취기준:</strong> ${p.standards.map(s => s.code).join(", ")} 외</p>
        <p><strong>4. 맞춤 지원 대책:</strong> ${p.functionalNeeds.join(" / ")}</p>
        <p><strong>5. 평가 계획:</strong> ${p.evalFocusTitle} (지식·기능·태도 3차원 평가)</p>
      </div>
      <div style="display: flex; gap: 0.6rem; justify-content: flex-end; margin-top: 1.1rem;">
        <button type="button" class="btn-bubble-tool" onclick="window.resetWizard()">처음으로 다시 작성</button>
        <button type="button" class="btn-bubble-tool" onclick="window.copyFullCurriculumText()">기안문 복사</button>
        <button type="button" class="btn-soft-primary" onclick="window.downloadRealHwpx()">완성 계획서 다운로드 (.hwpx)</button>
      </div>
    </div>
  `;
}

window.handleTemplateUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    appState.plan.uploadedFileName = file.name;
    renderStep(11);
    showToast(`'${file.name}' 양식에 체험학습 내용이 성공적으로 반영되었습니다!`, "success");
  }
};

// ============================================================================
// 차시별 상세 데이터 생성 헬퍼 (사전:현장:사후 = 4:2:4 비율 분배 및 성취기준 연계)
// ============================================================================
function generatePeriodsDataWithStandards(p) {
  const count = p.periodCount;
  const list = [];
  const stdCodes = p.standards.map(s => s.code);
  const primaryStd = stdCodes.length > 0 ? stdCodes[0] : "[공통]";
  const counts = calculatePeriodRatioCounts(count);

  // 사전 활동 풀 (4단계 체계)
  const preActivities = [
    {
      title: `사전 탐색: ${p.locationName} 탐험 계획 수립 및 가고 싶은 곳 탐색`,
      summary: `${p.locationName} 실물 사진 및 영상 시청, 방문 목적 및 장소의 특징 알아보기, 가고 싶은 구역 및 관심 품목 탐색`,
      eval: "체험 장소 사진을 보고 가고 싶은 곳이나 관심 품목을 가리키거나 표현하는지 관찰",
      intro: "체험 장소 사진과 영상을 보며 어떤 곳인지 알아보고 오늘의 학습 목표를 확인합니다.",
      body: `${p.locationName}에서 할 수 있는 활동 알아보기, 내가 좋아하는 코너와 관심 물품 사진 카드 골라보기.`,
      outro: "방문 계획표에 내가 고른 장소/물품 사진 스티커를 붙이고 친구들과 나누기.",
      questionExample: `우리가 갈 ${p.locationName}에서 가장 먼저 보고 싶은 곳이나 찾아보고 싶은 것은 무엇일까?`,
      feedbackTip: "시각적 사진 카드나 동영상을 활용하여 실제 장소에 대한 친숙함과 기대감을 높여줍니다."
    },
    {
      title: "사전 계획: 나의 활동 계획서(쇼핑/미션 목록) 작성 및 준비물 점검",
      summary: "필요한 준비물(가방, 복장, 개인 카드/용돈) 확인, 나만의 미션 목록 및 구매 계획표 작성하기",
      eval: "시각 단서(사진/픽토그램)를 활용하여 자신의 준비물과 미션 목록을 스스로 구성하는지 점검",
      intro: "체험학습에 필요한 물품과 개인 소지품 바구니를 확인합니다.",
      body: "필요한 물품 사진 카드를 골라 나만의 미션 계획서에 붙이기, 가방 챙기기 모의 연습.",
      outro: "내 가방에 준비물이 빠짐없이 들어있는지 체크리스트로 확인하기.",
      questionExample: "우리가 내일 챙겨가야 할 가장 중요한 물건은 무엇일까요? 가방에 쏙 넣어볼까요?",
      feedbackTip: "글자 쓰기가 어려운 학생은 실물 사진 스티커 붙이기나 AAC 선택을 활용합니다."
    },
    {
      title: `사전 모의: 교실 모의 체험: 이동, 인사 및 결제/상호작용 롤플레잉`,
      summary: "교실 내 간이 매장 구성, 카드 태그 및 계산대 상호작용, AAC를 활용한 도움 요청 및 인사말 연습",
      eval: "교실 모의 부스에서 단계적 촉진에 따라 카드 결제 및 인사 표현을 수행하는지 점검",
      intro: `교실에 꾸며진 ${p.locationName} 모의 코너를 둘러보고 역할을 확인합니다.`,
      body: "장바구니 들고 코너 돌기, 직원 역할 교사에게 인사하기, 모의 카드 리더기에 카드 대어 결제하기.",
      outro: '성공적으로 결제 후 "감사합니다" 인사하고 영수증 챙기기 연습 마무리.',
      questionExample: "계산대 직원 선생님께 카드를 건넬 때, 어떤 인사를 건네면 좋을까요?",
      feedbackTip: "반복적인 롤플레잉을 통해 현장에서 발생할 수 있는 낯선 자극과 불안을 최소화합니다."
    },
    {
      title: "사전 안전: 안전 수칙 및 공공장소 에티켓 다짐 (시각적 일과표 숙지)",
      summary: "보행 안전(횡단보도, 짝꿍 손잡기), 길을 잃었을 때 대처법(안내데스크/명찰 활용), 공공장소 관람 예절 다짐",
      eval: "비상 상황 발생 시 도움 요청 행동(안전 명찰 보이기 등) 및 에티켓 수칙 이해도 평가",
      intro: "현장에서 지켜야 할 3대 안전 약속(선생님 시야 안에 있기, 차례 지키기, 조용히 관람하기) 안내.",
      body: "시각적 일과표 순서 암기, 짝꿍과 손잡고 걷기 연습, 비상 연락처 목걸이 확인 및 대처 훈련.",
      outro: "안전 약속 다짐 손도장 찍기 및 현장체험학습 출발 준비 완료 선언.",
      questionExample: "만약 선생님이나 친구를 놓쳤을 때는 어떻게 행동해야 할까요? 안전 목걸이를 어떻게 활용할까요?",
      feedbackTip: "비상시 대처를 위해 학생의 옷이나 가방에 시각적 긴급 연락처 카드와 배지를 부착하도록 안내합니다."
    }
  ];

  // 현장 활동 풀 (2단계 체계)
  const fieldActivities = [
    {
      title: `현장 탐색: ${p.locationName} 현장 도착 및 환경 탐색, 안전 이동 실천`,
      summary: "현장 도착 후 배리어 프리 동선(경사로, 엘리베이터) 확인, 안내 표지판 읽기, 짝꿍과 안전하게 이동하기",
      eval: "공공장소에서 이동 안전 수칙을 준수하고 안내 표지판을 보고 방향을 탐색하는지 실기 평가",
      intro: "현장 도착 후 집결지 및 비상구 확인, 안전 짝꿍 손잡고 주변 환경 관찰하기.",
      body: "안내 표지판 확인하며 목표 장소로 이동하기, 엘리베이터 차례 지켜 탑승하기.",
      outro: "중간 집결지에 안전하게 모여 인원 점검 및 1차 미션 성공 확인.",
      questionExample: "우리가 찾던 엘리베이터와 안내 표지판이 어디에 보이나요? 화살표를 따라가 볼까요?",
      feedbackTip: "휠체어 이용 학생의 무단차 동선을 사전 확보하고, 감각 자극에 민감한 학생을 위해 중간 휴식 지점을 지정합니다."
    },
    {
      title: `현장 실전: ${p.locationName} 실전 미션 수행: 직접 선택 및 결제/상호작용`,
      summary: "계획한 물품 직접 찾기, 바구니 담기, 계산대에서 점원과 상호작용하며 실전 결제 완수, 영수증 수령",
      eval: "현장 체크리스트를 바탕으로 물품 선택 및 결제 과정의 독립적 수행도 실기 평가",
      intro: "내가 사전 준비 시간에 작성한 미션 계획서와 장바구니를 꺼내어 확인하기.",
      body: "진열대에서 물건 찾아 담기, 계산대 줄서기, 직원에게 인사하고 결제 카드 제시하기.",
      outro: "구매 물품과 영수증 가방에 챙기기, 직원에게 감사 인사 후 최종 집결지로 이동하기.",
      questionExample: "스스로 고른 물건을 계산대 위에 올려놓고 카드 결제를 직접 해볼 수 있을까요?",
      feedbackTip: "독립 수행을 장려하되 어려움을 겪을 때는 5초 지연 후 최소한의 제스처(포인팅) 촉진부터 단계적으로 제공합니다."
    }
  ];

  // 사후 활동 풀 (4단계 체계)
  const postActivities = [
    {
      title: "사후 정산: 체험 결과 확인: 영수증 대조 및 활동 결과 정산",
      summary: "영수증과 구매 물품(체험 결과물) 대조하기, 지출 금액 확인 및 잔액/영수증 정산 활동지 작성",
      eval: "영수증의 금액과 구매 물품을 1:1 대응하여 확인하고 활동지에 기록할 수 있는지 평가",
      intro: "체험 당일 찍은 활동 사진과 구매 물품을 책상 위에 펼쳐놓고 감상하기.",
      body: "영수증에 적힌 품목과 실물 물품 하나씩 대조하기, 모의 화폐나 숫자로 지출 금액 확인하기.",
      outro: "정산 활동지에 영수증 부착하고 오늘의 지출 확인 도장 받기.",
      questionExample: "영수증에 적힌 물건과 내가 가방에서 꺼낸 물건이 서로 같은지 함께 찾아볼까요?",
      feedbackTip: "수 개념이 어려운 학생에게는 금액의 크고 작음 대신 물건의 개수(1:1 매칭)와 스티커를 활용합니다."
    },
    {
      title: "사후 나눔: 배움과 기쁨의 나눔: 친구들과 물품/간식 나누기 및 협동 활동",
      summary: "직접 구매한 간식이나 기념품을 친구들과 나누어 먹기/감상하기, 나눔 에티켓 실천 및 칭찬 격려",
      eval: "또래 친구들과 긍정적인 상호작용을 나누고 차례를 지켜 물품을 공유하는 태도 관찰",
      intro: "친구들과 둥글게 둘러앉아 각자 사 온 물건이나 체험 결과물 소개하기.",
      body: '간식 사이좋게 나누어 먹기, 친구에게 "이거 먹어봐", "고마워" 긍정적 언어 및 AAC로 표현하기.',
      outro: "자리 주변 쓰레기 분리수거 및 정리정돈 스스로 하기.",
      questionExample: "내가 사 온 맛있는 간식을 짝꿍 친구에게 어떻게 건네며 나누어 줄 수 있을까요?",
      feedbackTip: "식품 알레르기 유무를 사전에 철저히 확인하고, 나눔 과정에서 긍정적 피드백을 풍부하게 제공합니다."
    },
    {
      title: "사후 포트폴리오: 나만의 배움 포트폴리오: 체험학습 스탬프북 및 추억 신문 제작",
      summary: "체험 현장에서 찍은 나의 활동 사진 인화물 부착, 그림/문장/스티커로 나만의 체험 일기 완성",
      eval: "자신의 체험 경험을 사진 및 다양한 표현 양식(글, 그림, 스티커)을 통해 시각적으로 구성하는지 포트폴리오 평가",
      intro: "인쇄된 체험 당일 사진들을 보며 가장 기억에 남는 장면 2~3가지 선택하기.",
      body: "스탬프북/신문 양식에 사진 붙이기, 말풍선 스티커 꾸미기, 스스로 해낸 미션에 성공 도장 찍기.",
      outro: "완성된 나만의 체험학습 포트폴리오를 파일철에 보관하고 표지 꾸미기.",
      questionExample: "이 사진 속에서 나는 무엇을 하고 있었나요? 그때 기분은 어땠는지 스티커로 붙여볼까요?",
      feedbackTip: "소근육 조작이 어려운 학생에게는 굵은 펜, 벨크로 사진 카드, 엠보싱 스티커 등을 제공하여 참여를 극대화합니다."
    },
    {
      title: "사후 성찰: 배움 나눔 및 성찰: 나의 성장 소감 발표회 및 감사 편지 전달",
      summary: "감정 카드/AAC/구어로 소감 발표하기, 스스로 해낸 점 칭찬하기, 도움 주신 분께 감사 카드 쓰기",
      eval: "자신의 감정과 배운 점을 자기표현 방식으로 나타내고 타인의 발표를 경청하는 태도 평가",
      intro: "우리 반 체험학습 하이라이트 영상 시청 및 성장 박수 나누기.",
      body: '포트폴리오를 들고 한 명씩 앞으로 나와 "내가 혼자 해낸 것" 발표하기, 감사 카드 꾸미기.',
      outro: "전체 학생에게 '자립 탐험대 수료증' 수여 및 가정 연계 생활 실천 약속하기.",
      questionExample: "이번 체험학습을 통해 '나 혼자서도 할 수 있어요!'라고 자신 있게 말할 수 있는 것은 무엇인가요?",
      feedbackTip: "언어적 표현이 제한적인 학생도 박수, 태블릿 PC의 녹음된 음성, 미소 등을 통해 동등하게 주인공으로 인정받도록 지원합니다."
    }
  ];

  for (let i = 1; i <= count; i++) {
    // 차시별 연계 성취기준 분배
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
// HWPX 실제 다운로드 & 복사 & 인쇄
// ============================================================================
window.downloadRealHwpx = async () => {
  try {
    const periods = generatePeriodsDataWithStandards(appState.plan);
    showToast("한글(HWPX) 파일을 생성하고 있습니다...", "info");
    await generateAndDownloadHwpx(appState.plan, periods);
    showToast("한글(HWPX) 파일이 성공적으로 다운로드되었습니다!", "success");
  } catch (err) {
    console.error("HWPX 다운로드 실패:", err);
    showToast("HWPX 생성 중 오류가 발생했습니다. 브라우저 콘솔을 확인해 주세요.", "info");
  }
};

window.copyFullCurriculumText = () => {
  const p = appState.plan;
  const counts = calculatePeriodRatioCounts(p.periodCount);
  const periods = generatePeriodsDataWithStandards(p);
  const text = `[2026학년도 ${p.schoolLevel} 특수교육 현장체험학습 교육과정 설계안]

1. 프로젝트 개요
- 프로젝트명: ${p.theme}
- 학교급 및 장소: ${p.schoolLevel} | ${p.locationName}
- 차시 배분: 총 ${p.periodCount}차시 [사전 ${counts.pre}차시 : 현장 ${counts.field}차시 : 사후 ${counts.post}차시 (4:2:4 비율)] (${p.difficultyLevel})
- 수업 방식: ${p.teachingMethod}
- 핵심 질문: 우리 마을 ${p.locationName}에서 나에게 필요한 것을 스스로 찾고 안전하게 이용하려면 어떻게 해야 할까?

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

  navigator.clipboard.writeText(text).then(() => {
    showToast("교육과정 전체 내용이 클립보드에 복사되었습니다.", "success");
  });
};

window.printPdfDocument = () => {
  const printArea = document.getElementById("printContainer");
  const udlArea = document.getElementById("udlPrintArea");
  if (printArea && udlArea) {
    printArea.innerHTML = udlArea.innerHTML;
    window.print();
  }
};

function showToast(msg, type = "info") {
  const shelf = document.getElementById("toastShelf");
  if (!shelf) return;

  const t = document.createElement("div");
  t.className = "soft-toast";
  t.textContent = msg;
  shelf.appendChild(t);

  setTimeout(() => {
    t.style.opacity = "0";
    setTimeout(() => {
      if (t.parentNode) t.parentNode.removeChild(t);
    }, 300);
  }, 2400);
}
