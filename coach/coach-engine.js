/**
 * coach/coach-engine.js
 * 각 단계별 AI 코칭 예측(Forecast) 및 대화형 수정 제안(Proposal) 생성 엔진
 * 
 * - Zero-Backend: 외부 API나 LLM 호출 없이 브라우저 내에서 순수 자바스크립트로 실행
 * - 결정론적(Deterministic) 및 문맥 반응형(Context-Aware)
 * - recommend-engine.js의 추천 분석 함수들을 직접 활용하여 신뢰성 있는 교육과정 예측 생성
 */

import {
  detectLocationCategory,
  buildPlanContext,
  recommendThemes,
  recommendEvalFocus,
  generateGoals,
  recommendTeachingMethods
} from '../recommend-engine.js';
import { getStandardsForSchoolLevel, getRecommendedStandards } from '../standards-data.js';
import { calculatePeriodRatioCounts, getActiveActivityPack } from '../app.js';

/**
 * 특정 스텝에 대한 AI 코치 브리핑(요약, 다운스트림 예측, 제안, 경고, 추천 질문)을 생성합니다.
 * @param {number} step - 현재 단계 (1 ~ 11)
 * @param {Object} plan - 현재 작성 중인 plan 객체
 * @returns {Object} { summary, forecasts, proposals, warnings, quickPrompts }
 */
export function buildStepForecast(step, plan = {}) {
  const currentStep = Math.min(Math.max(Number(step) || 1, 1), 11);
  const context = buildPlanContext(plan);
  const locationName = plan.locationName || '체험 현장';
  const schoolLevel = plan.schoolLevel || '초등학교';

  switch (currentStep) {
    case 1:
      return generateStep1Forecast(plan, context);
    case 2:
      return generateStep2Forecast(plan, context);
    case 3:
      return generateStep3Forecast(plan, context);
    case 4:
      return generateStep4Forecast(plan, context);
    case 5:
      return generateStep5Forecast(plan, context);
    case 6:
      return generateStep6Forecast(plan, context);
    case 7:
      return generateStep7Forecast(plan, context);
    case 8:
      return generateStep8Forecast(plan, context);
    case 9:
      return generateStep9Forecast(plan, context);
    case 10:
      return generateStep10Forecast(plan, context);
    case 11:
      return generateStep11Forecast(plan, context);
    default:
      return generateStep1Forecast(plan, context);
  }
}

// ----------------------------------------------------------------------------
// 1단계: 학교급
// ----------------------------------------------------------------------------
function generateStep1Forecast(plan, ctx) {
  const level = plan.schoolLevel || '초등학교';
  const standardsPool = getStandardsForSchoolLevel(level);

  const forecasts = [
    `3단계 성취기준 풀이 2022 개정 특수교육 '${level}' 교육과정(총 ${standardsPool.length}개 기준)으로 동기화됩니다.`,
    level.includes('초등') 
      ? '기초 생활 습관, 친숙한 사물 탐색, 즐거운 놀이 및 오감 중심의 차시 활동이 자동 배정됩니다.'
      : level.includes('중학')
        ? '실생활 자립, 지역사회 시설 독립 이용, 또래 협력 중심의 역동적 활동이 자동 배정됩니다.'
        : '직무 탐색, 직업 에티켓, 성인기 전환 교육 및 실전 자립 프로젝트가 기본 모델로 채택됩니다.'
  ];

  const proposals = [];
  if (level !== '중학교') {
    proposals.push({
      id: 'prop-step1-mid',
      title: '중학교 교육과정으로 전환',
      reason: '자립 생활과 또래 소통 활동을 균형 있게 다루려면 중학교 과정이 적합합니다.',
      patch: {
        changes: { schoolLevel: '중학교' }
      }
    });
  }
  if (level !== '고등학교') {
    proposals.push({
      id: 'prop-step1-high',
      title: '고등학교(직무·진로)로 전환',
      reason: '현장 실전 직무 체험과 성인기 전환 역량을 강화할 수 있습니다.',
      patch: {
        changes: { schoolLevel: '고등학교' }
      }
    });
  }

  return {
    step: 1,
    summary: `현재 '${level}' 교육과정이 설정되어 있습니다.`,
    forecasts,
    proposals,
    warnings: [],
    quickPrompts: [
      '중학교 교육과정으로 바꾸면 어떻게 달라져?',
      '고등학교 직업·진로 연계 기준이 포함돼?',
      '초등학교 수준에 최적화된 추천 활동을 알려줘'
    ]
  };
}

// ----------------------------------------------------------------------------
// 2단계: 체험 장소
// ----------------------------------------------------------------------------
function generateStep2Forecast(plan, ctx) {
  const locName = plan.locationName || '미지정';
  const category = ctx.locCategory;
  const act = getActiveActivityPack(plan.locationId, locName);

  const categoryNames = {
    mart: '대형마트/상점 (경제·화폐)',
    cafe: '카페/베이커리 (의사소통·직업)',
    nature: '자연/수목원 (생태·오감)',
    museum: '박물관/전시관 (문화·관람)',
    transit: '대중교통/역사 (보행·안전)',
    farm: '농장/스마트팜 (노작·자연)',
    public: '공공기관/도서관 (질서·이용)',
    culture: '문화/여가시설 (여가·에티켓)',
    general: '일반 지역사회 시설'
  };

  const forecasts = [
    `장소 카테고리가 '${categoryNames[category] || category}'(으)로 분류되어 3단계에서 관련 핵심 성취기준이 최상위로 추천됩니다.`,
    `10단계 세부 계획안에 '${locName}' 전용 미션("${act.pptMission}")과 맞춤 사전·현장·사후 활동 팩이 결합됩니다.`,
    '장소 특성에 따라 8단계에서 배리어 프리(무단차, 쉼터 등) 맞춤 안전 전략이 가이드됩니다.'
  ];

  const proposals = [];
  if (plan.locationId !== 'loc-mart') {
    proposals.push({
      id: 'prop-step2-mart',
      title: '대형마트 / 전통시장으로 선택',
      reason: '물건 고르기, 가격 계산, 결제 등 자립 필수 기능을 훈련하기 가장 대중적인 장소입니다.',
      patch: {
        changes: { locationId: 'loc-mart', locationName: '대형마트 / 전통시장' }
      }
    });
  }
  if (plan.locationId !== 'loc-cafe') {
    proposals.push({
      id: 'prop-step2-cafe',
      title: '베이커리 / 카페로 선택',
      reason: '키오스크 주문 및 음료 수령, 직원 대화 등 의사소통 중심 현장 훈련에 최적입니다.',
      patch: {
        changes: { locationId: 'loc-cafe', locationName: '베이커리 / 카페' }
      }
    });
  }

  const warnings = [];
  if (!plan.locationName || plan.locationName.trim().length < 2) {
    warnings.push('구체적인 체험학습 장소명을 2자 이상 입력해 주셔야 맞춤 활동이 원활히 연결됩니다.');
  }

  return {
    step: 2,
    summary: `'${locName}' 장소가 선택되었습니다.`,
    forecasts,
    proposals,
    warnings,
    quickPrompts: [
      '이 장소에서 가장 추천하는 활동은 뭐야?',
      '대형마트 대신 카페나 베이커리로 변경해줘',
      '휠체어 이동이 편리한 수목원으로 바꿔줘'
    ]
  };
}

// ----------------------------------------------------------------------------
// 3단계: 성취기준
// ----------------------------------------------------------------------------
function generateStep3Forecast(plan, ctx) {
  const standards = Array.isArray(plan.standards) ? plan.standards : [];
  const count = standards.length;
  const recommended = getRecommendedStandards(plan.schoolLevel, plan.locationId);

  const forecasts = [
    `등록된 ${count}개 성취기준의 키워드 분석을 통해 4단계 추천 주제와 6단계 평가 중점이 조율됩니다.`,
    `10단계 차시별 세부 지도안에 각 성취기준(${standards.map(s => s.code).slice(0, 3).join(', ')}${count > 3 ? ' 외' : ''})이 차시별 학습 요소로 자동 분배됩니다.`
  ];

  const proposals = [];
  // 추천 성취기준 중 아직 추가되지 않은 것 추천
  const unselectedRec = recommended.find(rec => !standards.some(s => s.code === rec.code));
  if (unselectedRec) {
    proposals.push({
      id: 'prop-step3-add-rec',
      title: `추천 기준 추가: ${unselectedRec.code}`,
      reason: `'${plan.locationName}' 체험에 가장 밀접한 [${unselectedRec.subject}] 성취기준입니다.`,
      patch: {
        changes: {
          standards: [...standards, { ...unselectedRec, id: `std-coach-${Date.now()}` }]
        }
      }
    });
  }

  const warnings = [];
  if (count === 0) {
    warnings.push('성취기준이 최소 1개 이상 등록되어야 10단계 교육과정안이 정상 생성됩니다.');
  } else if (count > 5) {
    warnings.push('성취기준이 6개 이상이면 특수교육 현장체험학습 시 학생의 학습 부담이 커질 수 있습니다. 핵심 2~4개를 권장합니다.');
  }

  return {
    step: 3,
    summary: `현재 ${count}개의 국가/직접 성취기준이 등록되어 있습니다.`,
    forecasts,
    proposals,
    warnings,
    quickPrompts: [
      '이 장소에 딱 맞는 추천 성취기준 1개 더 추가해줘',
      '안전 및 공공질서 관련 성취기준을 넣어줘',
      '실생활 자립 중심 성취기준으로 골라줘'
    ]
  };
}

// ----------------------------------------------------------------------------
// 4단계: 체험 주제
// ----------------------------------------------------------------------------
function generateStep4Forecast(plan, ctx) {
  const currentTheme = plan.theme || '';
  const suggestions = recommendThemes(plan);

  const forecasts = [
    `설정하신 주제('${currentTheme}')를 바탕으로 7단계 3차원 학습 목표의 문맥이 구체화됩니다.`,
    '10단계 최종 교육과정안 및 11단계 HWPX 공문서 기안문의 공식 프로젝트명으로 자동 등재됩니다.'
  ];

  const proposals = [];
  // 현재 주제와 다른 추천 주제 2개 제안
  const altSuggestions = suggestions.filter(s => s.theme !== currentTheme).slice(0, 2);
  altSuggestions.forEach((sugg, idx) => {
    proposals.push({
      id: `prop-step4-theme-${idx}`,
      title: `주제 변경: ${sugg.theme}`,
      reason: `${sugg.reasonBadge} 중심의 매력적인 배움 프로젝트입니다.`,
      patch: {
        changes: { theme: sugg.theme }
      }
    });
  });

  return {
    step: 4,
    summary: `체험 프로젝트 주제: "${currentTheme}"`,
    forecasts,
    proposals,
    warnings: [],
    quickPrompts: [
      '더 신나고 학생 친화적인 제목으로 바꿔줘',
      '자립 실천과 안전을 강조하는 주제로 추천해줘',
      '공문서 기안에 어울리는 공식적인 표현으로 다듬어줘'
    ]
  };
}

// ----------------------------------------------------------------------------
// 5단계: 차시 수 및 수업 난이도
// ----------------------------------------------------------------------------
function generateStep5Forecast(plan, ctx) {
  const periodCount = parseInt(plan.periodCount, 10) || 10;
  const diff = plan.difficultyLevel || '기본/적용 수준';
  const ratio = calculatePeriodRatioCounts(periodCount);

  const forecasts = [
    `총 ${periodCount}차시가 '사전 ${ratio.pre}차시 : 현장 ${ratio.field}차시 : 사후 ${ratio.post}차시'의 최적 황금 비율(4:2:4)로 분배됩니다.`,
    `'${diff}' 설정에 맞추어 10단계 활동지 난이도(${diff.includes('기초') ? '실물·사진 스티커 중심' : diff.includes('심화') ? '자기주도 미션·계산' : '시각 단서 및 단계적 모델링'})가 연결됩니다.`
  ];

  const proposals = [];
  if (periodCount !== 8) {
    const ratio8 = calculatePeriodRatioCounts(8);
    proposals.push({
      id: 'prop-step5-period-8',
      title: '8차시로 조정 (사전 3 : 현장 2 : 사후 3)',
      reason: '교실 사전 훈련과 사후 정산을 내실 있게 유지하면서도 부담 없는 컴팩트한 차시입니다.',
      patch: {
        changes: { periodCount: 8 }
      }
    });
  }
  if (!diff.includes('기초')) {
    proposals.push({
      id: 'prop-step5-diff-basic',
      title: '기초/탐색 수준으로 변경',
      reason: '시각 단서, 사진 스티커 짝 맞추기 등 지원 요구가 높은 학생들에게 편안한 수업을 제공합니다.',
      patch: {
        changes: { difficultyLevel: '기초/탐색 수준 (상당한 도움 및 1:1 신체적·언어적 촉진 제공)' }
      }
    });
  }

  const warnings = [];
  if (periodCount < 4) {
    warnings.push('차시 수가 4차시 미만이면 사전 모의 훈련이나 사후 정산 활동이 생략될 수 있습니다.');
  }

  return {
    step: 5,
    summary: `총 ${periodCount}차시 (사전 ${ratio.pre} / 현장 ${ratio.field} / 사후 ${ratio.post}), ${diff}`,
    forecasts,
    proposals,
    warnings,
    quickPrompts: [
      '단기 집중형(4~6차시)으로 차시를 줄여줘',
      '차시를 10차시로 넉넉하게 늘려줘',
      '기초 탐색 수준으로 난이도를 낮춰줘'
    ]
  };
}

// ----------------------------------------------------------------------------
// 6단계: 평가 중점
// ----------------------------------------------------------------------------
function generateStep6Forecast(plan, ctx) {
  const currentTitle = plan.evalFocusTitle || '독립적 수행도';
  const allFocus = recommendEvalFocus(plan);

  const forecasts = [
    `'${currentTitle}'을(를) 기준으로 7단계의 3차원 학습 목표(지식·기능·태도)가 실시간 정렬됩니다.`,
    '10단계 세부 계획안의 차시별 평가 관점과 관찰 체크리스트 문구가 이 평가 중점을 중심으로 기술됩니다.'
  ];

  const proposals = [];
  const altFocus = allFocus.filter(f => f.id !== plan.evalFocusId).slice(0, 2);
  altFocus.forEach((af, idx) => {
    proposals.push({
      id: `prop-step6-focus-${idx}`,
      title: `평가 중점 변경: ${af.title}`,
      reason: `${af.reasonBadge}: ${af.desc}`,
      patch: {
        changes: {
          evalFocusId: af.id,
          evalFocusTitle: af.title
        }
      }
    });
  });

  return {
    step: 6,
    summary: `선택된 평가 중점: "${currentTitle}"`,
    forecasts,
    proposals,
    warnings: [],
    quickPrompts: [
      '의사소통 및 상호작용 중심으로 평가를 맞출래',
      '독립적 자립 생활 수행도 평가로 바꿔줘',
      '공공장소 안전 및 기본 규칙 평가를 강조해줘'
    ]
  };
}

// ----------------------------------------------------------------------------
// 7단계: 학습 목표
// ----------------------------------------------------------------------------
function generateStep7Forecast(plan, ctx) {
  const generated = generateGoals(plan);

  const forecasts = [
    '작성된 지식·기능·태도 3차원 목표는 10단계 프로젝트 개요 및 11단계 HWPX 공문서 "2. 학습 목표" 표에 1:1로 반영됩니다.',
    '특수교육 개별화교육계획(IEP)의 단기 교육목표와 직접 연계하여 활용할 수 있습니다.'
  ];

  const proposals = [
    {
      id: 'prop-step7-refresh',
      title: '평가 중점 최적화 목표로 재설정',
      reason: `현재 선택된 평가 중점('${plan.evalFocusTitle}') 및 장소에 최적화된 표준 3차원 목표로 갱신합니다.`,
      patch: {
        changes: {
          goalKnowledge: generated.goalKnowledge,
          goalSkill: generated.goalSkill,
          goalAttitude: generated.goalAttitude
        }
      }
    }
  ];

  const warnings = [];
  if (!plan.goalKnowledge || !plan.goalSkill || !plan.goalAttitude) {
    warnings.push('지식, 기능, 태도 세 영역의 목표가 모두 채워져야 공문서 양식에 빈칸 없이 반영됩니다.');
  }

  return {
    step: 7,
    summary: '지식·기능·태도 3차원 학습 목표 수립 중',
    forecasts,
    proposals,
    warnings,
    quickPrompts: [
      'AAC 상징판을 활용하는 기능 목표로 보완해줘',
      '목표 문장을 더 쉽고 직관적으로 다듬어줘',
      '현재 목표가 성취기준과 잘 맞는지 검토해줘'
    ]
  };
}

// ----------------------------------------------------------------------------
// 8단계: 장애특성 및 맞춤 지원
// ----------------------------------------------------------------------------
function generateStep8Forecast(plan, ctx) {
  const needs = Array.isArray(plan.functionalNeeds) ? plan.functionalNeeds : [];
  const needsText = needs.join(' ');

  const forecasts = [
    '등록된 지원 사항이 9단계 교수학습 방식(시각 일과표, AAC, 안전 동행) 추천 점수에 가중치를 부여합니다.',
    '10단계 UDL 맞춤 지원 전략 및 11단계 HWPX "학생 안전 및 이동 지원 계획" 표에 그대로 삽입됩니다.'
  ];

  const proposals = [];
  if (!/휠체어|경사로|무단차/.test(needsText)) {
    proposals.push({
      id: 'prop-step8-wheelchair',
      title: '+ 휠체어 이동 지원 태그 추가',
      reason: '배리어 프리 무단차 경사로 동선 및 엘리베이터 안전 확인이 포함됩니다.',
      patch: {
        changes: {
          functionalNeeds: [...needs, '휠체어 이동 지원 1명 (무단차 경사로 필요)']
        }
      }
    });
  }
  if (!/aac|의사소통|상징/.test(needsText)) {
    proposals.push({
      id: 'prop-step8-aac',
      title: '+ AAC 의사소통 지원 태그 추가',
      reason: '그림 상징판 및 스마트 AAC를 통한 현장 주문/인사 지원이 활성화됩니다.',
      patch: {
        changes: {
          functionalNeeds: [...needs, 'AAC 그림 상징판 및 스마트 보완의사소통 지원 1명']
        }
      }
    });
  }

  const warnings = [];
  // 개인정보(PII) 감지 가드: 이름 형태, 전화번호 등
  if (/010-\d{4}-\d{4}|\d{2,3}-\d{3,4}-\d{4}/.test(needsText)) {
    warnings.push('⚠️ 개인정보 경고: 전화번호가 포함되어 있습니다. 학생 안전을 위해 전화번호는 삭제해 주세요.');
  }

  return {
    step: 8,
    summary: `현재 ${needs.length}개의 맞춤 지원 요구가 등록되어 있습니다.`,
    forecasts,
    proposals,
    warnings,
    quickPrompts: [
      '휠체어 무단차 동선 지원 태그 추가해줘',
      '소음 민감 학생을 위한 쉼터 지원 추가해줘',
      '돌발 이탈 예방 1:1 안전 동행을 넣어줘'
    ]
  };
}

// ----------------------------------------------------------------------------
// 9단계: 수업 방식
// ----------------------------------------------------------------------------
function generateStep9Forecast(plan, ctx) {
  const currentMethod = plan.teachingMethod || '프로젝트 학습 (PBL)';
  const methods = recommendTeachingMethods(plan);

  const forecasts = [
    `'${currentMethod}'에 맞추어 10단계 사전·현장·사후 차시의 교수학습 전개 방식(도입-전개-정리)이 특화됩니다.`,
    '11단계 HWPX 공문서 지도안의 "수업 모형 및 교수학습 방법" 항목에 기술됩니다.'
  ];

  const proposals = [];
  const altMethods = methods.filter(m => !currentMethod.includes(m.name)).slice(0, 2);
  altMethods.forEach((m, idx) => {
    proposals.push({
      id: `prop-step9-method-${idx}`,
      title: `수업 방식 변경: ${m.name}`,
      reason: `${m.badge}: ${m.desc}`,
      patch: {
        changes: { teachingMethod: m.name }
      }
    });
  });

  return {
    step: 9,
    summary: `선택된 교수학습 방식: "${currentMethod}"`,
    forecasts,
    proposals,
    warnings: [],
    quickPrompts: [
      '상황 모의 훈련(교실 롤플레잉) 중심 방식으로 바꿔줘',
      '체험 중심 직접 교수법으로 설정해줘',
      '협동 프로젝트 학습(PBL)으로 진행할래'
    ]
  };
}

// ----------------------------------------------------------------------------
// 10단계: UDL 최종 교육과정 결과물
// ----------------------------------------------------------------------------
function generateStep10Forecast(plan, ctx) {
  const forecasts = [
    '전체 1~9단계의 모든 선택과 맞춤 데이터가 UDL 차시별 상세 지도안으로 완벽히 통합되었습니다.',
    '상단 [한글(HWPX) 다운로드] 버튼을 누르면 표준 한글 양식으로 즉시 내려받을 수 있습니다.'
  ];

  return {
    step: 10,
    summary: 'UDL 10개 차시별 상세 지도안 생성 완료',
    forecasts,
    proposals: [],
    warnings: [],
    quickPrompts: [
      '전체 계획안의 정합성을 검토해줘',
      '차시별 활동에 빠진 안전 수칙이 있는지 점검해줘',
      '공문서 기안 서식(11단계)으로 이동할게'
    ]
  };
}

// ----------------------------------------------------------------------------
// 11단계: 공문서 기안 서식 반영
// ----------------------------------------------------------------------------
function generateStep11Forecast(plan, ctx) {
  const forecasts = [
    '설계된 교육과정이 공문서 표준 서식(표, 개조식 번호 체계, 결재선)에 100% 자동 합성되었습니다.',
    '학교 고유 서식이 있다면 [학교 전용 서식 등록]을 통해 학교 고유 틀을 그대로 유지하며 내용을 채울 수 있습니다.'
  ];

  return {
    step: 11,
    summary: '공문서 기안 서식(.hwpx) 준비 완료',
    forecasts,
    proposals: [],
    warnings: [],
    quickPrompts: [
      '학교 자체 HWPX 양식에 어떻게 적용해?',
      '결재 올리기 전 최종 점검할 항목이 뭐야?',
      '클립보드에 전체 내용 복사하는 방법 알려줘'
    ]
  };
}
