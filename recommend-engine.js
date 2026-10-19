/**
 * recommend-engine.js
 * 특수교육 현장체험학습 교육과정 설계를 위한 상황 맞춤형 실시간 추천 엔진
 * 
 * - 이전 단계(학교급, 장소, 성취기준, 차시, 난이도, 평가중점, 특성 등)를 분석하여
 *   4단계(주제), 6단계(평가중점), 7단계(학습목표), 9단계(수업방식)를 실시간으로 맞춤 추천합니다.
 * - 순수 함수(Pure Function)로 구현되어 UI와 분리되며 단위 테스트가 용이합니다.
 */

// ============================================================================
// 1. 장소명 키워드 기반 카테고리 자동 판별
// ============================================================================
export function detectLocationCategory(locationId, locationName) {
  if (locationId && locationId !== "loc-custom") {
    const map = {
      "loc-mart": "mart",
      "loc-cafe": "cafe",
      "loc-garden": "nature",
      "loc-museum": "museum",
      "loc-transit": "transit",
      "loc-farm": "farm"
    };
    if (map[locationId]) return map[locationId];
  }

  const name = (locationName || "").toLowerCase();
  if (!name.trim()) return "general";

  // 1) 특수 생태/농장 (스마트팜 등 '마트' 포함어 오탐 방지를 위해 우선 검사)
  if (/농장|스마트팜|과수원|목장|텃밭|농촌|체험마을|비닐하우스/.test(name)) return "farm";
  // 2) 자연/공원
  if (/공원|수목원|숲|식물원|생태|산책|정원|동물원|호수|자연|휴양림/.test(name)) return "nature";
  // 3) 문화/전시
  if (/박물관|과학관|미술관|전시관|기념관|역사관|천문대|갤러리|체험관/.test(name)) return "museum";
  // 4) 교통
  if (/지하철|역|터미널|버스|정류장|공항|기차|KTX|승강장/.test(name)) return "transit";
  // 5) 공공기관
  if (/도서관|소방서|경찰서|우체국|주민센터|동사무소|구청|시청|은행/.test(name)) return "public";
  // 6) 여가/엔터테인먼트
  if (/영화관|극장|공연장|아쿠아리움|놀이공원|테마파크|키즈카페|롯데월드|에버랜드|cgv|메가박스/.test(name)) return "culture";
  // 7) 식음료/카페
  if (/카페|베이커리|빵집|제과|커피|디저트|식당|음식점|레스토랑|분식|스타벅스|투썸|이디야/.test(name)) return "cafe";
  // 8) 상점/마트
  if (/마트|시장|백화점|슈퍼|다이소|상점|가게|쇼핑|편의점|문구점|홈플러스|이마트|롯데마트|코스트코|노브랜드|하나로마트/.test(name)) return "mart";

  return "general";
}

// ============================================================================
// 2. 통합 플랜 맥락(Plan Context) 추출
// ============================================================================
export function buildPlanContext(plan = {}) {
  const schoolLevel = plan.schoolLevel || "초등학교";
  const isElem = schoolLevel.includes("초등");
  const isMid = schoolLevel.includes("중학");
  const isHigh = schoolLevel.includes("고등");

  const locationName = (plan.locationName || "").trim() || "체험 현장";
  const locationId = plan.locationId || "loc-custom";
  const locCategory = detectLocationCategory(locationId, locationName);

  const standards = Array.isArray(plan.standards) ? plan.standards : [];
  const standardsText = standards.map(s => `${s.code || ''} ${s.title || ''} ${s.subject || ''} ${s.desc || ''}`).join(" ").toLowerCase();

  // 핵심 영역별 점수 계산
  const domainScores = {
    economy: 0,
    communication: 0,
    safety: 0,
    nature: 0,
    career: 0,
    math: 0,
    culture: 0,
    selfcare: 0,
    social: 0
  };

  const domainKeywords = {
    economy: ["구매", "화폐", "돈", "소비", "계산", "거스름돈", "가격", "마트", "시장", "영수증", "상점", "물건", "구입"],
    communication: ["인사", "말하기", "대화", "표현", "언어", "듣기", "질문", "요청", "의사소통", "감사", "소통", "글자", "단어"],
    safety: ["안전", "규칙", "질서", "보행", "교통", "신호", "예절", "대처", "위험", "보호", "줄서기", "승하차"],
    nature: ["식물", "동물", "생태", "환경", "자연", "계절", "숲", "나무", "꽃", "흙", "생명", "날씨", "친환경"],
    career: ["직업", "진로", "일", "일자리", "노동", "탐색", "바리스타", "농부", "직무", "직업인", "일터"],
    math: ["수", "셈", "세기", "숫자", "더하기", "빼기", "양", "크기", "길이", "시간", "시계", "분류", "비교"],
    culture: ["문화", "역사", "유물", "전통", "유산", "전시", "관람", "예술", "미술", "음악", "유적"],
    selfcare: ["자립", "식생활", "식사", "건강", "옷", "정리", "정돈", "일상", "독립", "위생", "몸"],
    social: ["협력", "친구", "나눔", "배려", "참여", "모둠", "공동체", "함께", "도움"]
  };

  for (const [domain, kws] of Object.entries(domainKeywords)) {
    for (const kw of kws) {
      if (standardsText.includes(kw)) {
        domainScores[domain] += 2;
      }
    }
  }

  // 장소 카테고리에 따른 기본 가중치 부여
  if (locCategory === "mart") { domainScores.economy += 4; domainScores.math += 2; }
  else if (locCategory === "cafe") { domainScores.communication += 3; domainScores.career += 3; }
  else if (locCategory === "nature") { domainScores.nature += 5; domainScores.selfcare += 1; }
  else if (locCategory === "museum") { domainScores.culture += 5; domainScores.safety += 2; }
  else if (locCategory === "transit") { domainScores.safety += 5; domainScores.selfcare += 3; }
  else if (locCategory === "farm") { domainScores.nature += 4; domainScores.career += 3; }

  // 차시 및 난이도 특성
  const periodCount = parseInt(plan.periodCount, 10) || 10;
  const periodBand = periodCount <= 3 ? "short" : periodCount <= 7 ? "mid" : "long";

  const diffStr = plan.difficultyLevel || "";
  const isBasic = diffStr.includes("기초") || diffStr.includes("탐색");
  const isApplied = diffStr.includes("기본") || diffStr.includes("적용");
  const isAdvanced = diffStr.includes("심화") || diffStr.includes("자립");

  // 지원 요구 특성
  const needsArr = Array.isArray(plan.functionalNeeds) ? plan.functionalNeeds : [];
  const needsText = needsArr.join(" ");
  const needsAac = /aac|의사소통|상징|말하기/.test(needsText);
  const needsWheelchair = /휠체어|경사로|무단차|보행/.test(needsText);
  const needsSensory = /소음|감각|휴식|쉼터|시각/.test(needsText);
  const needsEscort = /동행|밀착|이탈|1:1/.test(needsText);

  return {
    schoolLevel,
    isElem,
    isMid,
    isHigh,
    locationName,
    locationId,
    locCategory,
    standards,
    standardsText,
    domainScores,
    periodCount,
    periodBand,
    difficulty: { isBasic, isApplied, isAdvanced, raw: diffStr },
    needs: { needsAac, needsWheelchair, needsSensory, needsEscort, raw: needsArr },
    evalFocusId: plan.evalFocusId || "eval-independence",
    currentTheme: plan.theme || "",
    teachingMethod: plan.teachingMethod || ""
  };
}

// ============================================================================
// 3. 4단계 주제(Theme) 동적 추천 생성기
// ============================================================================
export function recommendThemes(plan, options = {}) {
  const ctx = buildPlanContext(plan);
  const { locationName: loc, isElem, isMid, isHigh, domainScores, locCategory } = ctx;
  const cycleIndex = options.cycleIndex || 0;

  // 도메인 우선순위 산출
  const sortedDomains = Object.entries(domainScores).sort((a, b) => b[1] - a[1]);
  const primaryDomain = sortedDomains[0] ? sortedDomains[0][0] : "selfcare";
  const secondaryDomain = sortedDomains[1] ? sortedDomains[1][0] : "communication";

  // 학교급별 어조
  // 초등: 즐거운, 스스로, 탐험대, 쏙쏙, 배우는
  // 중학: 우리 동네, 슬기로운, 미션, 자립 생활, 탐구
  // 고등: 실전 자립, 진로 직무, 예산 소비, 책임과 실천, 지역사회 참여

  const pool = [];

  // (1) 경제/소비 도메인
  if (locCategory === "mart" || domainScores.economy > 0 || domainScores.math > 0) {
    if (isElem) {
      pool.push({
        theme: `스스로 쏙쏙 고르고 계산하는 ${loc} 장보기 탐험대`,
        reasonBadge: "화폐·구매 성취기준 연계",
        domain: "economy",
        score: 10 + domainScores.economy
      });
      pool.push({
        theme: `알뜰살뜰 장바구니! 친구와 함께하는 ${loc} 미션`,
        reasonBadge: "사회성 & 실생활 수학 연계",
        domain: "economy",
        score: 8 + domainScores.economy
      });
    } else if (isHigh) {
      pool.push({
        theme: `예산 수립부터 결제·영수증 정산까지, ${loc} 자립 소비 프로젝트`,
        reasonBadge: "고교 실전 자립 경제",
        domain: "economy",
        score: 11 + domainScores.economy
      });
      pool.push({
        theme: `${loc}에서 실천하는 성인기 대비 자립생활 경제 실무`,
        reasonBadge: "전환교육 직무수학 연계",
        domain: "economy",
        score: 9 + domainScores.economy
      });
    } else {
      pool.push({
        theme: `나 스스로 고르고 결제하는 슬기로운 ${loc} 장보기`,
        reasonBadge: "실생활 자립 기능 연계",
        domain: "economy",
        score: 10 + domainScores.economy
      });
      pool.push({
        theme: `우리 동네 ${loc} 탐험: 필요한 물품 찾기와 현명한 소비`,
        reasonBadge: "지역사회 참여 연계",
        domain: "economy",
        score: 8 + domainScores.economy
      });
    }
  }

  // (2) 소통/진로 (카페, 식당 등)
  if (locCategory === "cafe" || domainScores.career > 0 || domainScores.communication > 0) {
    if (isElem) {
      pool.push({
        theme: `달콤한 냄새 가득! 내 손으로 주문하고 받아오는 ${loc} 나들이`,
        reasonBadge: "기초 의사소통 연계",
        domain: "communication",
        score: 10 + domainScores.communication
      });
      pool.push({
        theme: `안녕! 인사하고 음료를 주문하는 ${loc} 에티켓 배움터`,
        reasonBadge: "공공장소 바른생활 연계",
        domain: "communication",
        score: 8 + domainScores.communication
      });
    } else if (isHigh) {
      pool.push({
        theme: `${loc} 직무 현장 탐방 및 고객 응대·주문 시뮬레이션 진로 프로젝트`,
        reasonBadge: "진로와 직업 교과 연계",
        domain: "career",
        score: 11 + domainScores.career
      });
      pool.push({
        theme: `성인기 여가 선용과 식음료 매장 독립적 이용 자립 훈련`,
        reasonBadge: "전환기 자립생활 연계",
        domain: "career",
        score: 9 + domainScores.career
      });
    } else {
      pool.push({
        theme: `바리스타의 하루와 키오스크 주문 정복! ${loc} 진로 체험`,
        reasonBadge: "직업 탐색 & 디지털 리터러시",
        domain: "career",
        score: 10 + domainScores.career
      });
      pool.push({
        theme: `내 목소리로 당당하게 주문하는 ${loc} 의사소통 미션`,
        reasonBadge: "실생활 의사소통 연계",
        domain: "communication",
        score: 9 + domainScores.communication
      });
    }
  }

  // (3) 자연/생태 (공원, 수목원, 숲 등)
  if (locCategory === "nature" || domainScores.nature > 0) {
    if (isElem) {
      pool.push({
        theme: `오감으로 만나는 초록빛 ${loc} 생태 보물찾기`,
        reasonBadge: "오감 탐색 & 즐거운생활 연계",
        domain: "nature",
        score: 10 + domainScores.nature
      });
      pool.push({
        theme: `자연물 찰칵! 계절의 변화를 느끼는 ${loc} 숲 놀이터`,
        reasonBadge: "계절 식물 관찰 연계",
        domain: "nature",
        score: 8 + domainScores.nature
      });
    } else {
      pool.push({
        theme: `자연과 교감하며 심신을 힐링하는 ${loc} 생태 탐구 프로젝트`,
        reasonBadge: "생태 환경 & 정서 안정",
        domain: "nature",
        score: 10 + domainScores.nature
      });
      pool.push({
        theme: `자연물 채집과 관찰 기록으로 완성하는 ${loc} 생태 지도 만들기`,
        reasonBadge: "과학 탐구 역량 연계",
        domain: "nature",
        score: 8 + domainScores.nature
      });
    }
  }

  // (4) 역사/문화/과학 (박물관, 미술관 등)
  if (locCategory === "museum" || domainScores.culture > 0) {
    if (isElem) {
      pool.push({
        theme: `보고 만지며 신나게 배우는 ${loc} 문화 탐험대`,
        reasonBadge: "체험형 전시 탐색 연계",
        domain: "culture",
        score: 10 + domainScores.culture
      });
      pool.push({
        theme: `쉿! 관람 예절을 지키며 완성하는 ${loc} 스탬프 투어`,
        reasonBadge: "공공장소 질서·에티켓 연계",
        domain: "culture",
        score: 8 + domainScores.culture
      });
    } else {
      pool.push({
        theme: `스탬프 투어로 우리 역사와 과학을 탐구하는 ${loc} 프로젝트`,
        reasonBadge: "사회·역사·과학 성취기준 연계",
        domain: "culture",
        score: 10 + domainScores.culture
      });
      pool.push({
        theme: `공공 문화 시설을 스스로 관람하고 기록하는 ${loc} 문화 나들이`,
        reasonBadge: "지역사회 문화 향유 연계",
        domain: "culture",
        score: 8 + domainScores.culture
      });
    }
  }

  // (5) 교통/이동 (지하철, 버스 등)
  if (locCategory === "transit" || domainScores.safety > 0) {
    if (isElem) {
      pool.push({
        theme: `카드를 삑! 혼자서도 척척 타는 ${loc} 안전 원정대`,
        reasonBadge: "대중교통 안전 보행 연계",
        domain: "safety",
        score: 10 + domainScores.safety
      });
    } else {
      pool.push({
        theme: `노선도 확인부터 승하차까지, ${loc} 대중교통 완전 정복`,
        reasonBadge: "지역사회 이동 자립 역량 연계",
        domain: "safety",
        score: 10 + domainScores.safety
      });
      pool.push({
        theme: `질서와 배려를 실천하며 안전하게 이동하는 ${loc} 보행 프로젝트`,
        reasonBadge: "공공 교통 에티켓 연계",
        domain: "safety",
        score: 8 + domainScores.safety
      });
    }
  }

  // (6) 농장/스마트팜
  if (locCategory === "farm") {
    pool.push({
      theme: `씨앗에서 수확까지: ${loc} 생태 농부 체험과 수확의 기쁨`,
      reasonBadge: "생태 노작 및 식물 수확",
      domain: "nature",
      score: 10 + domainScores.nature
    });
    pool.push({
      theme: `친환경 농작물을 직접 수확하고 나누는 ${loc} 나눔 프로젝트`,
      reasonBadge: "협력 및 사회성 발달 연계",
      domain: "career",
      score: 9 + domainScores.career
    });
  }

  // (7) 일반/공공 시설 및 공통 폴백 (풍부한 보편 주제)
  const generalTemplates = [
    {
      theme: `우리 마을 ${loc}에서 스스로 해보는 자립 생활 미션`,
      reasonBadge: "자립 생활 & 지역사회 참여",
      domain: "selfcare",
      score: 7
    },
    {
      theme: `친구와 함께 협력하여 미션을 완수하는 ${loc} 배움 원정대`,
      reasonBadge: "또래 협력 & 사회적 기술",
      domain: "social",
      score: 6
    },
    {
      theme: `공공장소 에티켓을 지키며 즐겁게 참여하는 ${loc} 현장 체험`,
      reasonBadge: "공공 에티켓 & 안전 준수",
      domain: "safety",
      score: 6
    },
    {
      theme: `질문하고 직접 경험하며 나만의 배움을 만드는 ${loc} 탐방`,
      reasonBadge: "학생 주도 탐구 학습",
      domain: "culture",
      score: 5
    }
  ];

  for (const t of generalTemplates) {
    if (!pool.some(p => p.theme === t.theme)) {
      pool.push(t);
    }
  }

  // 중복 제거 및 점수 정렬
  const uniquePool = [];
  const seen = new Set();
  for (const item of pool) {
    if (!seen.has(item.theme)) {
      seen.add(item.theme);
      uniquePool.push(item);
    }
  }
  uniquePool.sort((a, b) => b.score - a.score);

  // 사이클 적용: cycleIndex가 주어지면 다른 후보들을 회전
  const pageSize = 5;
  const total = uniquePool.length;
  const start = (cycleIndex * pageSize) % Math.max(1, total);
  let sliced = uniquePool.slice(start, start + pageSize);
  if (sliced.length < pageSize && total >= pageSize) {
    sliced = sliced.concat(uniquePool.slice(0, pageSize - sliced.length));
  }

  return sliced;
}

// ============================================================================
// 4. 6단계 평가 중점(Evaluation Focus) 동적 추천 (10개 풀)
// ============================================================================
export const FULL_EVALUATION_FOCUS_OPTIONS = [
  {
    id: "eval-independence",
    title: "독립적 수행도 (자립 생활 역량)",
    category: "selfcare",
    baseScore: 10
  },
  {
    id: "eval-communication",
    title: "의사소통 및 상호작용 (AAC / 구어)",
    category: "communication",
    baseScore: 9
  },
  {
    id: "eval-safety",
    title: "안전 수칙 준수 및 공공 에티켓",
    category: "safety",
    baseScore: 9
  },
  {
    id: "eval-participation",
    title: "정서적 참여도 및 자기결정 역량",
    category: "social",
    baseScore: 8
  },
  {
    id: "eval-functional-academic",
    title: "기능적 학업 기술 적용 (수·화폐·문해)",
    category: "economy",
    baseScore: 7
  },
  {
    id: "eval-career-vocational",
    title: "진로·직업 기초 기능 및 직무 태도",
    category: "career",
    baseScore: 6
  },
  {
    id: "eval-social-cooperation",
    title: "또래 협력 및 사회적 문제 해결",
    category: "social",
    baseScore: 7
  },
  {
    id: "eval-sensory-regulation",
    title: "감각 조절 및 환경 적응성",
    category: "sensory",
    baseScore: 6
  },
  {
    id: "eval-mobility",
    title: "지역사회 이동 및 시설 탐색 능력",
    category: "mobility",
    baseScore: 7
  },
  {
    id: "eval-self-advocacy",
    title: "자기 표현 및 능동적 도움 요청",
    category: "self-advocacy",
    baseScore: 7
  }
];

export function recommendEvalFocus(plan) {
  const ctx = buildPlanContext(plan);
  const { locationName: loc, domainScores, isHigh, isElem, needs, difficulty } = ctx;

  const scored = FULL_EVALUATION_FOCUS_OPTIONS.map(opt => {
    let score = opt.baseScore;
    let reasonBadge = "핵심 평가 관점";

    if (opt.id === "eval-functional-academic") {
      score += (domainScores.economy + domainScores.math);
      if (domainScores.economy > 0 || domainScores.math > 0) {
        reasonBadge = "성취기준(화폐·수학) 맞춤";
      }
    } else if (opt.id === "eval-communication") {
      score += domainScores.communication;
      if (needs.needsAac) {
        score += 5;
        reasonBadge = "AAC 지원 학생 맞춤";
      } else if (domainScores.communication > 0) {
        reasonBadge = "의사소통 성취기준 연계";
      }
    } else if (opt.id === "eval-career-vocational") {
      score += domainScores.career;
      if (isHigh) {
        score += 6;
        reasonBadge = "고교 진로·직무 연계 권장";
      } else if (domainScores.career > 0) {
        reasonBadge = "직업 성취기준 연계";
      }
    } else if (opt.id === "eval-sensory-regulation") {
      if (needs.needsSensory) {
        score += 7;
        reasonBadge = "소음·감각 지원 맞춤";
      }
    } else if (opt.id === "eval-safety") {
      score += domainScores.safety;
      if (ctx.locCategory === "transit") {
        score += 5;
        reasonBadge = "교통 시설 안전 최우선";
      }
    } else if (opt.id === "eval-mobility") {
      if (needs.needsWheelchair || ctx.locCategory === "transit") {
        score += 5;
        reasonBadge = "이동 지원 & 동선 탐색";
      }
    } else if (opt.id === "eval-participation") {
      if (isElem) {
        score += 3;
        reasonBadge = "초등 긍정 참여 중심";
      }
    } else if (opt.id === "eval-social-cooperation") {
      if (domainScores.social > 0) {
        score += 3;
        reasonBadge = "협력 학습 연계";
      }
    }

    // 동적 설명(desc) 생성: 장소명 및 난이도 수준 반영
    let desc = "";
    if (opt.id === "eval-independence") {
      desc = difficulty.isBasic
        ? `${loc} 현장에서 촉진 단계를 점진적으로 줄이며 최소한의 도움으로 과제를 완수하는 수행도 중심 평가`
        : `${loc}의 주요 시설에서 스스로 물품을 선택하거나 결제·이용을 독립적으로 완수하는 자립 역량 중심 평가`;
    } else if (opt.id === "eval-communication") {
      desc = needs.needsAac
        ? `${loc} 직원 및 또래에게 AAC 상징판이나 보완의사소통 기기를 능동적으로 활용하여 요구와 인사를 전달하는지 평가`
        : `${loc} 현장 직원이나 동료에게 상황에 맞는 인사말과 선택, 감사 표현을 명확하게 전달하는 의사소통 평가`;
    } else if (opt.id === "eval-safety") {
      desc = `${loc} 이동 동선과 현장 내 보행 안전 수칙, 질서 지키기, 비상 대처 행동을 올바르게 실천하는지 평가`;
    } else if (opt.id === "eval-participation") {
      desc = `${loc} 활동에 자신의 흥미와 선호를 반영하여 능동적으로 참여하고 긍정적인 성취 감정을 표현하는지 평가`;
    } else if (opt.id === "eval-functional-academic") {
      desc = `${loc} 현장에서 가격 확인, 예산 계산, 화폐·카드 결제, 수량 파악 등 실생활 기능적 학업 기술을 적용하는지 평가`;
    } else if (opt.id === "eval-career-vocational") {
      desc = `${loc}의 직업인 관찰 및 직무 모의 실습 시 작업 태도, 지시 따르기, 책임감 있는 미션 수행 태도 중심 평가`;
    } else if (opt.id === "eval-social-cooperation") {
      desc = `${loc} 미션 수행 중 짝꿍과 역할을 분담하고 서로 양보하고 도우며 협력하는 친사회적 행동 중심 평가`;
    } else if (opt.id === "eval-sensory-regulation") {
      desc = `${loc}의 낯선 소음과 시각 자극 속에서 안정적으로 감각을 조절하고 휴식 쉼터를 활용하며 적응하는지 평가`;
    } else if (opt.id === "eval-mobility") {
      desc = `${loc}에서 안내 표지판과 배리어 프리 동선을 확인하며 목적지까지 안전하고 바르게 이동하는 능력 평가`;
    } else {
      desc = `${loc}에서 예상치 못한 어려움이나 도움이 필요한 상황 발생 시 당당하게 조력을 요청하는 자기옹호 역량 평가`;
    }

    return {
      id: opt.id,
      title: opt.title,
      desc,
      score,
      reasonBadge
    };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored;
}

// ============================================================================
// 5. 7단계 학습 목표(Goals) 동적 생성기 (지식/기능/태도)
// ============================================================================
export function generateGoals(plan) {
  const ctx = buildPlanContext(plan);
  const { locationName: loc, evalFocusId, needs } = ctx;
  const theme = plan.theme || `${loc} 체험학습`;

  let knowledge = "";
  let skill = "";
  let attitude = "";

  switch (evalFocusId) {
    case "eval-functional-academic":
      knowledge = `${loc}에서 물건의 가격표와 영수증, 금액 표기 등 실생활 수·화폐 정보를 바르게 이해한다.`;
      skill = `정해진 예산 내에서 필요한 물품을 선택하고 카드 또는 현금으로 결제 절차를 직접 완수한다.`;
      attitude = `자신의 소비 선택에 만족감을 느끼며 계획적인 경제 습관을 스스로 기른다.`;
      break;

    case "eval-communication":
      knowledge = `${loc}에서 상황에 맞는 적절한 인사말과 도움 요청 발문의 필요성을 이해한다.`;
      skill = needs.needsAac
        ? `현장 직원이나 친구에게 AAC 상징 카드나 보완의사소통 도구를 활용하여 원하는 것을 명확하게 전달한다.`
        : `현장 직원이나 동료에게 구어 또는 시각 단서로 자신의 요구와 선택을 표현하고 감사 인사를 나눈다.`;
      attitude = `타인과의 상호작용에 긍정적인 흥미를 느끼고 예의 바르게 소통하는 태도를 지닌다.`;
      break;

    case "eval-safety":
      knowledge = `${loc}의 이동 경로와 시설 내에서 지켜야 할 보행 안전 규칙 및 공공 에티켓을 안다.`;
      skill = `차례 지키기, 질서 유지, 위험 구역 피하기 등 현장 안전 수칙을 스스로 실천한다.`;
      attitude = `인솔 교사 및 친구들과 함께 안전 약속을 성실히 지키며 배려하는 마음을 갖는다.`;
      break;

    case "eval-career-vocational":
      knowledge = `${loc}에서 일하는 직업인들의 역할과 서비스 진행 절차를 이해한다.`;
      skill = `지정된 직무 과제를 순서에 맞게 단계별로 성실히 수행하고 결과를 확인한다.`;
      attitude = `노동의 가치와 직업에 대한 흥미를 느끼며 책임감 있는 직무 태도를 형성한다.`;
      break;

    case "eval-social-cooperation":
      knowledge = `친구와 함께 역할을 분담하여 미션을 수행하는 협력의 가치를 안다.`;
      skill = `짝꿍과 함께 안내도를 보고 물품을 찾는 등 상호 협동하여 프로젝트를 해결한다.`;
      attitude = `서로를 격려하고 도움을 주고받으며 공동체 유대감을 형성한다.`;
      break;

    case "eval-sensory-regulation":
      knowledge = `${loc}의 다양한 감각 자극(소음, 빛, 인파)에 대처하는 쉼터와 휴식 방법을 안다.`;
      skill = `과도한 자극 시 이어플러그나 쉼터를 능동적으로 활용하여 심리적 안정을 조절한다.`;
      attitude = `자신의 신체 신호를 인식하고 편안한 마음으로 배움에 참여하려는 태도를 지닌다.`;
      break;

    case "eval-mobility":
      knowledge = `${loc}의 주요 시설 배치와 배리어 프리 안내 표지판의 의미를 이해한다.`;
      skill = `교통수단 승하차 및 유도 동선을 따라 지정된 장소까지 독립적으로 이동한다.`;
      attitude = `스스로 길을 찾아 목적지에 도달하는 보행 자립심과 자신감을 기른다.`;
      break;

    case "eval-self-advocacy":
      knowledge = `어려움이 생겼을 때 도움을 요청해야 하는 상대와 방법을 바르게 안다.`;
      skill = `안내데스크나 직원에게 명찰 또는 표현 단서를 제시하며 주도적으로 도움을 청한다.`;
      attitude = `자신의 권리와 의사를 당당하게 표현하는 자기결정 태도를 기른다.`;
      break;

    case "eval-participation":
      knowledge = `${loc}에서 경험할 수 있는 다양한 문화와 활동 내용을 파악한다.`;
      skill = `자신의 선호와 흥미에 따라 능동적으로 활동을 선택하고 즐겁게 참여한다.`;
      attitude = `새로운 배움에 대한 호기심을 갖고 성취의 기쁨을 친구들과 나눈다.`;
      break;

    case "eval-independence":
    default:
      knowledge = `${loc}의 주요 시설 구조와 이용 절차를 이해한다.`;
      skill = `최소한의 촉진으로 스스로 필요한 활동을 선택하고 이용 절차를 독립적으로 완수한다.`;
      attitude = `스스로 해냈다는 자립 생활의 성취감과 주도적인 자신감을 갖는다.`;
      break;
  }

  return { knowledge, skill, attitude };
}

// ============================================================================
// 6. 9단계 수업 방식(Teaching Method) 동적 추천 (10개 풀)
// ============================================================================
export const FULL_TEACHING_METHOD_OPTIONS = [
  {
    id: "method-project",
    name: "프로젝트 학습 (PBL)",
    baseBadge: "체험 중심 권장",
    baseScore: 10
  },
  {
    id: "method-cooperation",
    name: "협력 학습 (Cooperative Learning)",
    baseBadge: "사회성 촉진",
    baseScore: 9
  },
  {
    id: "method-question",
    name: "질문식 수업 (Inquiry Questioning)",
    baseBadge: "사고력 증진",
    baseScore: 8
  },
  {
    id: "method-direct",
    name: "직접교수 및 시연 (Direct Instruction)",
    baseBadge: "기초 기능 습득",
    baseScore: 9
  },
  {
    id: "method-cbi",
    name: "지역사회 중심 교수 (CBI)",
    baseBadge: "실생활 자립 훈련",
    baseScore: 10
  },
  {
    id: "method-task-analysis",
    name: "과제분석 기반 단계 교수",
    baseBadge: "체계적 소단계 습득",
    baseScore: 8
  },
  {
    id: "method-video-modeling",
    name: "비디오 모델링 & 시각 스캐폴딩",
    baseBadge: "시각 단서 선행 학습",
    baseScore: 7
  },
  {
    id: "method-roleplay",
    name: "모의 체험 및 시뮬레이션 (Role-Play)",
    baseBadge: "사전 롤플레잉",
    baseScore: 8
  },
  {
    id: "method-play",
    name: "놀이 및 감각 탐색 학습",
    baseBadge: "오감 중심 배움",
    baseScore: 7
  },
  {
    id: "method-career",
    name: "직무 체험 및 현장 견학",
    baseBadge: "진로·직업 특화",
    baseScore: 6
  }
];

export function recommendTeachingMethods(plan) {
  const ctx = buildPlanContext(plan);
  const { locationName: loc, isElem, isHigh, periodBand, difficulty, needs, evalFocusId } = ctx;
  const theme = plan.theme || `${loc} 체험학습`;

  const scored = FULL_TEACHING_METHOD_OPTIONS.map(opt => {
    let score = opt.baseScore;
    let badge = opt.baseBadge;

    // 차시 비중
    if (periodBand === "long") {
      if (opt.id === "method-project") { score += 4; badge = "다차시 PBL 최적화"; }
      if (opt.id === "method-cooperation") score += 2;
    } else if (periodBand === "short") {
      if (opt.id === "method-direct") { score += 4; badge = "단기 집중 핵심 습득"; }
      if (opt.id === "method-cbi") score += 3;
      if (opt.id === "method-project") score -= 3;
    }

    // 학교급
    if (isElem) {
      if (opt.id === "method-play") { score += 5; badge = "초등 오감 놀이 권장"; }
      if (opt.id === "method-cooperation") score += 2;
    } else if (isHigh) {
      if (opt.id === "method-career") { score += 6; badge = "고교 진로·직무 최적"; }
      if (opt.id === "method-cbi") { score += 4; badge = "전환기 지역사회 자립"; }
    }

    // 난이도
    if (difficulty.isBasic) {
      if (opt.id === "method-task-analysis") { score += 5; badge = "기초 단계별 촉진 맞춤"; }
      if (opt.id === "method-direct") score += 3;
      if (opt.id === "method-video-modeling") score += 3;
    }

    // 장애 특성
    if (needs.needsAac || needs.needsSensory) {
      if (opt.id === "method-video-modeling") { score += 5; badge = "시각·AAC 친화"; }
    }

    // 평가 중점 연계
    if (evalFocusId === "eval-communication") {
      if (opt.id === "method-roleplay") { score += 5; badge = "의사소통 평가 최적"; }
      if (opt.id === "method-cooperation") score += 3;
    } else if (evalFocusId === "eval-independence") {
      if (opt.id === "method-cbi") { score += 4; badge = "자립 수행도 평가 최적"; }
    } else if (evalFocusId === "eval-social-cooperation") {
      if (opt.id === "method-cooperation") { score += 6; badge = "또래 협력 평가 최적"; }
    } else if (evalFocusId === "eval-career-vocational") {
      if (opt.id === "method-career") { score += 6; badge = "직무 평가 맞춤"; }
    }

    // 동적 설명 생성: 고정 마트 예시를 탈피하고 실제 장소명과 주제를 반영!
    let desc = "";
    if (opt.id === "method-project") {
      desc = `실제 삶의 문제(예: ${loc}에서 '${theme}' 미션 완수하기)를 해결하기 위해 사전 기획부터 현장 실행, 사후 결과물 제작까지 학생 주도로 탐구하는 방식`;
    } else if (opt.id === "method-cooperation") {
      desc = `2~3명의 동료 짝꿍을 이루어 역할을 분담(안내도 확인자, 물품·미션 확인자, 결제·정리 담당자)하고 서로 도움을 주고받으며 ${loc} 미션을 완수하는 방식`;
    } else if (opt.id === "method-question") {
      desc = `교사의 구조화된 발문과 시각 단서 질문(예: '${loc} 표지판은 무엇을 뜻할까?', '가장 먼저 어디로 가야 할까?')을 통해 학생의 능동적 탐색을 유도하는 방식`;
    } else if (opt.id === "method-direct") {
      desc = `교사의 단계적 모델링과 설명 → 학생의 모의 연습(Role-Play) → ${loc} 현장 즉각 적용 및 1:1 피드백으로 이어지는 체계적 기술 습득 방식`;
    } else if (opt.id === "method-cbi") {
      desc = `가상 교실이 아닌 실제 ${loc} 자연적 환경에서 자연스러운 단서와 결과를 경험하며 실생활 자립 기능을 직접 훈련하는 지역사회 중심 교수 방식`;
    } else if (opt.id === "method-task-analysis") {
      desc = `${loc} 이용 절차(입장-선택-결제-퇴장)를 작은 단위의 세부 행동으로 쪼개어 단계별로 모델링하고 촉진을 점진적으로 줄여가는 교수 방식`;
    } else if (opt.id === "method-video-modeling") {
      desc = `${loc}의 현장 동선 및 주문·이용 행동을 영상이나 사진 단서로 사전에 충분히 시청·숙지하여 현장 불안을 줄이고 모방을 돕는 방식`;
    } else if (opt.id === "method-roleplay") {
      desc = `교실에 ${loc} 간이 부스를 재현하고 손님과 직원 역할을 번갈아 시뮬레이션하여 현장 돌발 상황 대처 능력과 자신감을 기르는 방식`;
    } else if (opt.id === "method-play") {
      desc = `${loc}의 다양한 사물과 자연물을 만지고 느끼는 오감 놀이와 스탬프 보물찾기 게임을 통해 자연스러운 호기심과 즐거움을 이끌어내는 방식`;
    } else {
      desc = `${loc}의 실제 작업 환경을 둘러보고 직무 체험 활동에 직접 참여하여 미래 직업 생활에 필요한 기본 소양을 익히는 방식`;
    }

    return {
      id: opt.id,
      name: opt.name,
      badge,
      desc,
      score
    };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored;
}
