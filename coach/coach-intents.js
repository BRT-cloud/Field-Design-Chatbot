/**
 * coach/coach-intents.js
 * AI 코치와의 한국어 자연어 대화 해석 및 대화형 수정 패치(PlanPatch) 생성 모듈
 * 
 * - 자연어 의도(Intent) 분석: 교사의 자유 발화("8차시로 줄여줘", "의사소통 중심으로 바꿔줘" 등)를 파싱
 * - 제안(Proposal) 연계: 대화 답변과 함께 사용자가 클릭 한 번으로 적용(Apply)할 수 있는 PlanPatch 반환
 * - Zero-Backend: 규칙 기반 정규식 및 키워드 매핑으로 100% 브라우저 로컬 구동
 */

import { recommendThemes, recommendEvalFocus, recommendTeachingMethods, generateGoals } from '../recommend-engine.js';
import { getRecommendedStandards } from '../standards-data.js';

/**
 * 교사의 입력 메시지를 분석하여 코치 답변과 수정 제안(PlanPatch)을 생성합니다.
 * @param {number} step - 현재 단계 번호 (1 ~ 11)
 * @param {Object} plan - 현재 작성 중인 플랜 객체
 * @param {string} userInput - 교사가 입력한 대화 텍스트
 * @returns {{ replyText: string, proposal: Object | null }}
 */
/**
 * 개별 차시 수정 의도를 파싱합니다.
 * 예: "3차시 활동을 마트 계산대 역할극으로 바꿔줘", "2차시 주제를 안전한 이동으로 수정해줘", "4차시 평가를 체크리스트 관찰로 바꿔줘"
 */
function parsePeriodSpecificIntent(rawInput, plan) {
  const trimmed = rawInput.trim();

  // "총 8차시", "전체 6차시" 또는 "8차시로 줄여줘/변경해줘"처럼 'N차시로' 형태는 전체 차시 수 변경이므로 제외
  if (/^(?:총|전체)\s*\d{1,2}\s*차시/i.test(trimmed) || /^\d{1,2}\s*차시\s*로\b/i.test(trimmed) || /^\d{1,2}\s*차시\s*로\s+/i.test(trimmed)) {
    return null;
  }

  // 전체 차시 수 증감/변경 단순 발화 제외
  if (/^\d{1,2}\s*차시\s*(?:로|으로)?\s*(?:줄여|줄이|감소|축소|단축|늘려|늘리|확장|확대|변경|바꿔|조정|설정|구성|맞춰|해\s*줘|해주세요|할래|할게).*$/i.test(trimmed)) {
    return null;
  }

  // 모든 차시 개별 수정 초기화
  if (/^(?:모든|전체)\s*차시\s*(?:수정\s*)?(?:초기화|원래대로|복원)/.test(trimmed)) {
    return {
      replyText: '개별 차시에 적용된 모든 맞춤형 수정 내역을 초기화하고 기본 자동 생성안으로 복원합니다.',
      proposal: {
        id: `intent-period-reset-all-${Date.now()}`,
        title: '전체 차시 맞춤 수정 초기화',
        reason: '모든 차시를 기본 교육과정 활동안으로 복원',
        patch: {
          changes: { periodOverrides: null }
        }
      }
    };
  }

  // 특정 차시 초기화 (예: "3차시 초기화해줘", "2차시 원래대로 돌려줘")
  const resetMatch = trimmed.match(/^(\d{1,2})\s*차시\s*(?:내용|활동|주제|평가|계획)?\s*(?:을|를)?\s*(?:초기화|원래대로|복원|되돌려)/);
  if (resetMatch) {
    const pNum = parseInt(resetMatch[1], 10);
    return {
      replyText: `${pNum}차시에 적용된 맞춤 수정을 해제하고 기본 계획안으로 되돌립니다.`,
      proposal: {
        id: `intent-period-reset-${pNum}-${Date.now()}`,
        title: `${pNum}차시 기본안 복원`,
        reason: `${pNum}차시 개별 수정 해제`,
        periodNum: pNum,
        patch: {
          changes: { periodOverrides: { [pNum]: null } }
        }
      }
    };
  }

  // 특정 차시 내용 수정 매칭
  const match = trimmed.match(/^(\d{1,2})\s*차시\s*(?:의\s*)?(평가\s*기준|평가\s*관점|평가|주요\s*활동|활동\s*내용|활동|차시\s*주제|주제|제목|도입|전개|정리|내용|수업|미션)?\s*(?:을|를|은|는|에|에서|:)?\s*(.+)$/i);
  if (!match) return null;

  const pNum = parseInt(match[1], 10);
  const fieldKeyword = (match[2] || '').replace(/\s+/g, '');
  let bodyText = (match[3] || '').trim();

  // 후행 서술어("으로 바꿔줘", "로 수정해줘", "추가해줘", "변경해줘" 등) 제거
  bodyText = bodyText
    .replace(/\s*(?:으로|로)\s*(?:바꿔\s*줘|바꿔\s*주세요|바꿔|변경\s*해\s*줘|변경\s*해\s*주세요|변경|수정\s*해\s*줘|수정\s*해\s*주세요|수정|교체\s*해\s*줘|교체|설정\s*해\s*줘|설정|반영\s*해\s*줘|반영|해\s*줘|해주세요|할래|할게)\.?$/i, '')
    .replace(/\s*(?:을|를)?\s*(?:넣어\s*줘|넣어\s*주세요|추가\s*해\s*줘|추가\s*해\s*주세요|추가|반영\s*해\s*줘|수정\s*해\s*줘|바꿔\s*줘|변경\s*해\s*줘)\.?$/i, '')
    .replace(/^['"“”‘’]+|['"“”‘’]+$/g, '')
    .trim();

  if (!bodyText || /^(?:줄여|늘려|변경|바꿔|조정|단축|축소|확장)$/.test(bodyText)) {
    return null;
  }

  const maxPeriods = parseInt(plan?.periodCount, 10) || 10;
  if (pNum < 1 || pNum > maxPeriods) {
    return {
      replyText: `현재 계획안은 총 ${maxPeriods}차시로 설정되어 있어 ${pNum}차시를 수정할 수 없습니다. 1~${maxPeriods}차시 범위에서 지정해 주시거나 먼저 총 차시 수를 변경해 주세요.`,
      proposal: null
    };
  }

  let override = {};
  let fieldLabel = '활동 및 주제';

  if (fieldKeyword.includes('평가')) {
    fieldLabel = 'UDL 맞춤 평가';
    override = { eval: bodyText };
  } else if (fieldKeyword.includes('주제') || fieldKeyword.includes('제목')) {
    fieldLabel = '차시 주제';
    override = { title: bodyText };
  } else if (fieldKeyword === '도입') {
    fieldLabel = '도입 활동';
    override = { intro: bodyText };
  } else if (fieldKeyword === '전개') {
    fieldLabel = '전개 활동';
    override = { body: bodyText, summary: bodyText };
  } else if (fieldKeyword === '정리') {
    fieldLabel = '정리 활동';
    override = { outro: bodyText };
  } else {
    fieldLabel = '주요 활동 및 주제';
    override = {
      title: `${pNum}차시 맞춤: ${bodyText}`,
      summary: `${bodyText} 중심 학생 맞춤형 활동 수행`,
      body: `${bodyText} 활동을 학생 수준과 시각적 단서에 맞추어 단계적으로 연습하고 수행하기.`
    };
  }

  return {
    replyText: `${pNum}차시의 ${fieldLabel}을(를) "${bodyText}"(으)로 수정하는 제안을 준비했습니다. [지금 적용하기]를 누르시면 차시 계획표와 세부 지도안에 즉시 반영됩니다.`,
    proposal: {
      id: `intent-period-edit-${pNum}-${Date.now()}`,
      title: `${pNum}차시 ${fieldLabel} 수정`,
      reason: `교사 요청: ${pNum}차시 "${bodyText}" 반영`,
      periodNum: pNum,
      patch: {
        changes: {
          periodOverrides: {
            [pNum]: override
          }
        }
      }
    }
  };
}

export function interpretUserInput(step, plan, userInput) {
  if (!userInput || typeof userInput !== 'string' || !userInput.trim()) {
    return {
      replyText: '수정하고 싶은 차시나 조건을 편하게 말씀해 주세요! (예: "3차시 활동을 마트 계산대 역할극으로 바꿔줘", "8차시로 줄여줘")',
      proposal: null
    };
  }

  const text = userInput.trim().toLowerCase();
  const currentStep = Number(step) || 10;

  // --------------------------------------------------------------------------
  // 0. 개별 차시 수정 의도 ("3차시 활동을 ...로 바꿔줘", "2차시 평가를 ...로 수정해줘")
  // --------------------------------------------------------------------------
  const periodSpecific = parsePeriodSpecificIntent(userInput, plan);
  if (periodSpecific) {
    return periodSpecific;
  }

  // --------------------------------------------------------------------------
  // 1. 차시 수 변경 의도 ("N차시로", "차시 줄여줘", "차시 늘려줘")
  // --------------------------------------------------------------------------
  const periodMatch = text.match(/(\d{1,2})\s*차시/);
  if (periodMatch) {
    const targetPeriod = parseInt(periodMatch[1], 10);
    if (targetPeriod >= 1 && targetPeriod <= 30) {
      return {
        replyText: `총 차시를 ${targetPeriod}차시로 변경하는 제안을 준비했습니다. 아래 [적용하기]를 누르시면 사전·현장·사후 황금 비율(4:2:4)로 즉시 재분배됩니다.`,
        proposal: {
          id: `intent-period-${Date.now()}`,
          title: `${targetPeriod}차시로 변경`,
          reason: `교사 요청: ${targetPeriod}차시 재분배`,
          patch: {
            changes: { periodCount: targetPeriod }
          }
        }
      };
    }
  }

  if (/차시.*(줄|감소|적게|축소|단기)/.test(text)) {
    const cur = parseInt(plan.periodCount, 10) || 10;
    const target = Math.max(cur - 2, 4);
    return {
      replyText: `현재 ${cur}차시에서 조금 더 집중적인 ${target}차시로 축소하는 제안입니다.`,
      proposal: {
        id: `intent-period-reduce-${Date.now()}`,
        title: `${target}차시로 단축`,
        reason: '현장 중심 단기 집중형 차시 구성',
        patch: {
          changes: { periodCount: target }
        }
      }
    };
  }

  if (/차시.*(늘|확장|길게|많이)/.test(text)) {
    const cur = parseInt(plan.periodCount, 10) || 10;
    const target = Math.min(cur + 2, 16);
    return {
      replyText: `현재 ${cur}차시에서 사전 모의훈련과 사후 나눔을 더 넉넉히 다룰 수 있는 ${target}차시로 확대하는 제안입니다.`,
      proposal: {
        id: `intent-period-expand-${Date.now()}`,
        title: `${target}차시로 확장`,
        reason: '사전 훈련 및 사후 심화 시간 추가 확보',
        patch: {
          changes: { periodCount: target }
        }
      }
    };
  }

  // --------------------------------------------------------------------------
  // 2. 난이도 변경 의도 ("기초 수준", "쉬운 난이도", "심화", "자립 수준")
  // --------------------------------------------------------------------------
  if (/기초|쉬운|하향|낮춰|탐색 수준|실물/.test(text)) {
    return {
      replyText: '실물 및 사진 단서 중심의 "기초/탐색 수준"으로 난이도를 변경합니다. 10단계 활동지에서 실물 스티커 짝 맞추기 및 시각적 안내가 기본으로 제공됩니다.',
      proposal: {
        id: `intent-diff-basic-${Date.now()}`,
        title: '기초/탐색 수준으로 변경',
        reason: '시각적 단서 및 전폭적 촉진 지원',
        patch: {
          changes: { difficultyLevel: '기초/탐색 수준 (상당한 도움 및 1:1 신체적·언어적 촉진 제공)' }
        }
      }
    };
  }

  if (/심화|높여|상향|자기주도|독립 수행/.test(text)) {
    return {
      replyText: '자기주도 미션 및 계산 역량을 강조하는 "심화/자립 수준"으로 난이도를 변경합니다.',
      proposal: {
        id: `intent-diff-adv-${Date.now()}`,
        title: '심화/자립 수준으로 변경',
        reason: '독립 수행 및 자기주도적 문제해결 중심',
        patch: {
          changes: { difficultyLevel: '심화/자립 수준 (최소한의 안내로 스스로 판단하고 독립적으로 완수)' }
        }
      }
    };
  }

  // --------------------------------------------------------------------------
  // 3. 학교급 변경 의도 ("초등", "중학", "고등")
  // --------------------------------------------------------------------------
  if (/초등/.test(text) && plan.schoolLevel !== '초등학교') {
    return {
      replyText: '초등학교 교육과정으로 변경합니다. 성취기준과 활동 팩이 초등 특수교육 수준으로 재정렬됩니다.',
      proposal: {
        id: `intent-school-elem-${Date.now()}`,
        title: '초등학교 교육과정으로 변경',
        reason: '초등 특수교육과정 연계',
        patch: {
          changes: { schoolLevel: '초등학교' }
        }
      }
    };
  }
  if (/중학/.test(text) && plan.schoolLevel !== '중학교') {
    return {
      replyText: '중학교 교육과정으로 변경합니다. 실생활 자립 및 시설 이용 중심의 성취기준이 추천됩니다.',
      proposal: {
        id: `intent-school-mid-${Date.now()}`,
        title: '중학교 교육과정으로 변경',
        reason: '중학교 실생활 자립 중심 재구성',
        patch: {
          changes: { schoolLevel: '중학교' }
        }
      }
    };
  }
  if (/고등|전공과|직업|진로/.test(text) && plan.schoolLevel !== '고등학교') {
    return {
      replyText: '고등학교(직무·진로) 교육과정으로 변경합니다. 성인기 전환 및 현장 직무 탐색 활동이 강화됩니다.',
      proposal: {
        id: `intent-school-high-${Date.now()}`,
        title: '고등학교 교육과정으로 변경',
        reason: '직무 탐색 및 성인기 전환 역량 강화',
        patch: {
          changes: { schoolLevel: '고등학교' }
        }
      }
    };
  }

  // --------------------------------------------------------------------------
  // 4. 평가 중점 변경 의도 ("의사소통", "자립", "안전", "학업", "신체")
  // --------------------------------------------------------------------------
  if (/의사소통|상호작용|소통|대화|aac/.test(text)) {
    return {
      replyText: '평가 중점을 "의사소통 및 상호작용 (AAC / 구어)"으로 변경합니다. 7단계 학습 목표와 10단계 평가표가 직원·친구와의 대화 및 표현 역량 중심으로 맞춰집니다.',
      proposal: {
        id: `intent-focus-comm-${Date.now()}`,
        title: '의사소통 및 상호작용 평가로 변경',
        reason: '현장 상호작용 및 AAC 의사소통 역량 집중 평가',
        patch: {
          changes: {
            evalFocusId: 'eval-communication',
            evalFocusTitle: '의사소통 및 상호작용 (AAC / 구어)'
          }
        }
      }
    };
  }

  if (/자립|독립|스스로|생활 기능/.test(text)) {
    return {
      replyText: '평가 중점을 "독립적 수행도 (자립 생활 역량)"으로 변경합니다. 최소한의 촉진으로 스스로 완수하는 과정을 관찰합니다.',
      proposal: {
        id: `intent-focus-indep-${Date.now()}`,
        title: '독립적 수행도 (자립 생활 역량) 평가로 변경',
        reason: '일상생활 자립 및 현장 미션 독립 수행 중심',
        patch: {
          changes: {
            evalFocusId: 'eval-independence',
            evalFocusTitle: '독립적 수행도 (자립 생활 역량)'
          }
        }
      }
    };
  }

  if (/안전|규칙|질서|보행/.test(text)) {
    return {
      replyText: '평가 중점을 "안전 수칙 준수 및 공공 에티켓"으로 변경합니다. 보행 안전 및 공공장소 에티켓 실천도를 중심으로 관찰 평가가 진행됩니다.',
      proposal: {
        id: `intent-focus-safety-${Date.now()}`,
        title: '안전 수칙 준수 및 공공 에티켓 평가로 변경',
        reason: '보행 안전 및 비상시 대처 수칙 준수 중심',
        patch: {
          changes: {
            evalFocusId: 'eval-safety',
            evalFocusTitle: '안전 수칙 준수 및 공공 에티켓'
          }
        }
      }
    };
  }

  // --------------------------------------------------------------------------
  // 5. 장애특성 맞춤 지원 요구 추가 의도 ("휠체어", "aac", "소음", "안전 동행")
  // --------------------------------------------------------------------------
  const currentNeeds = Array.isArray(plan.functionalNeeds) ? plan.functionalNeeds : [];

  if (/휠체어|무단차|경사로|승강기|엘리베이터/.test(text)) {
    const tag = '휠체어 이동 지원 1명 (무단차 경사로 필요)';
    if (!currentNeeds.includes(tag)) {
      return {
        replyText: '휠체어 이동 학생을 위한 맞춤 지원 사항을 추가합니다. 10단계와 11단계 공문서에 무단차 동선 및 승강기 탑승 안전 계획이 명시됩니다.',
        proposal: {
          id: `intent-need-wheelchair-${Date.now()}`,
          title: '+ 휠체어 무단차 동선 지원 추가',
          reason: '배리어 프리 이동 지원 확보',
          patch: {
            changes: { functionalNeeds: [...currentNeeds, tag] }
          }
        }
      };
    }
  }

  if (/소음|감각|쉼터|시끄|조용한/.test(text)) {
    const tag = '소음 민감성 대비 저소음 휴식 쉼터 동선 1명';
    if (!currentNeeds.includes(tag)) {
      return {
        replyText: '청각/감각 민감 학생을 위한 쉼터 동선 지원을 추가합니다. 현장 이동 시 사전 쉼터 위치 파악이 지도안에 포함됩니다.',
        proposal: {
          id: `intent-need-sensory-${Date.now()}`,
          title: '+ 저소음 쉼터 동선 지원 추가',
          reason: '감각 과부하 예방 및 휴식 지원',
          patch: {
            changes: { functionalNeeds: [...currentNeeds, tag] }
          }
        }
      };
    }
  }

  if (/이탈|동행|1:1|밀착|돌발/.test(text)) {
    const tag = '돌발 이탈 예방 1:1 보조인력 밀착 동행 1명';
    if (!currentNeeds.includes(tag)) {
      return {
        replyText: '돌발 이탈 예방을 위한 1:1 보조인력 밀착 동행 지원을 추가합니다. 공문서 안전 관리 계획에 전담 안전 인력 배치가 반영됩니다.',
        proposal: {
          id: `intent-need-escort-${Date.now()}`,
          title: '+ 1:1 안전 동행 인력 지원 추가',
          reason: '현장 돌발 위험 예방 및 밀착 안전 확보',
          patch: {
            changes: { functionalNeeds: [...currentNeeds, tag] }
          }
        }
      };
    }
  }

  // --------------------------------------------------------------------------
  // 6. 수업 방식 변경 의도 ("프로젝트", "직접 교수", "모의 훈련", "역할놀이")
  // --------------------------------------------------------------------------
  if (/모의|롤플|역할놀이|시뮬레이션/.test(text)) {
    return {
      replyText: '수업 방식을 "상황 모의 훈련 및 역할놀이"로 변경합니다. 교실에서 사전 모의 부스를 차려 현장 행동을 충분히 연습한 뒤 출발합니다.',
      proposal: {
        id: `intent-method-roleplay-${Date.now()}`,
        title: '상황 모의 훈련 (역할놀이) 방식으로 변경',
        reason: '사전 불안 완화 및 단계적 모델링 훈련',
        patch: {
          changes: { teachingMethod: '상황 모의 훈련 및 역할놀이' }
        }
      }
    };
  }

  if (/직접 교수|단계적 모델링|설명|시범/.test(text)) {
    return {
      replyText: '수업 방식을 "체험 중심 직접 교수법"으로 변경합니다. 교사의 명확한 시범-안내된 연습-독립 연습 순서로 지도안이 재구성됩니다.',
      proposal: {
        id: `intent-method-direct-${Date.now()}`,
        title: '체험 중심 직접 교수법으로 변경',
        reason: '명시적 시범 및 체계적 단계별 촉진 제공',
        patch: {
          changes: { teachingMethod: '체험 중심 직접 교수법' }
        }
      }
    };
  }

  // --------------------------------------------------------------------------
  // 7. 주제(Theme) 변경 의도 ("주제 바꿔줘", "더 쉬운 주제", "재미있는 주제")
  // --------------------------------------------------------------------------
  if (/주제|프로젝트명|제목|이름/.test(text)) {
    const themes = recommendThemes(plan);
    const altTheme = themes.find(t => t.theme !== plan.theme) || themes[0];
    if (altTheme) {
      return {
        replyText: `현재 맥락(${plan.locationName}, ${plan.schoolLevel})에 맞춘 새로운 주제 후보("${altTheme.theme}")를 제안합니다. 마음에 드시면 적용해 보세요.`,
        proposal: {
          id: `intent-theme-alt-${Date.now()}`,
          title: `주제 변경: ${altTheme.theme}`,
          reason: `${altTheme.reasonBadge} 중심의 새로운 배움 프로젝트`,
          patch: {
            changes: { theme: altTheme.theme }
          }
        }
      };
    }
  }

  // --------------------------------------------------------------------------
  // 8. 학습 목표(Goals) 재작성 의도 ("목표 바꿔줘", "목표 다시 써줘")
  // --------------------------------------------------------------------------
  if (/목표|지식|기능|태도/.test(text)) {
    const newGoals = generateGoals(plan);
    return {
      replyText: `현재 평가 중점("${plan.evalFocusTitle}")과 주제에 가장 적합한 3차원 학습 목표(지식·기능·태도) 세트를 새롭게 합성했습니다.`,
      proposal: {
        id: `intent-goals-refresh-${Date.now()}`,
        title: '3차원 학습 목표 일괄 갱신',
        reason: '평가 중점 및 장소 연계 최신 목표 합성',
        patch: {
          changes: {
            goalKnowledge: newGoals.goalKnowledge,
            goalSkill: newGoals.goalSkill,
            goalAttitude: newGoals.goalAttitude
          }
        }
      }
    };
  }

  // --------------------------------------------------------------------------
  // 9. 일반 질문 및 조언 요청 ("어떻게 해야 해?", "조언해줘", "설명해줘")
  // --------------------------------------------------------------------------
  const stepAdvice = {
    1: '1단계에서는 지도하실 학생들의 학령기에 맞는 학교급을 선택해 주세요. 초등은 생활체험 중심, 중등은 실생활 자립, 고등은 직무/진로 교육과정이 연결됩니다.',
    2: '2단계에서는 방문할 장소를 선택하거나 직접 입력해 주세요. 장소에 맞추어 사전·현장·사후 활동 팩과 추천 성취기준이 자동으로 준비됩니다.',
    3: '3단계에서는 이번 체험에서 달성할 성취기준을 2~4개 선택해 주세요. [장소 특화 추천] 항목을 클릭하면 손쉽게 등록할 수 있습니다.',
    4: '4단계에서는 체험학습의 주제를 정합니다. 추천 목록에서 하나를 고르거나, 직접 수정 입력란에서 원하는 문구로 다듬을 수 있습니다.',
    5: '5단계에서는 수업 차시(권장 8~10차시)와 학생 발달 수준에 맞는 난이도를 선택해 주세요. 황금 비율(4:2:4)로 차시가 자동 배분됩니다.',
    6: '6단계에서는 이번 체험에서 가장 중점적으로 관찰·평가할 영역(자립, 의사소통, 안전 등)을 선택해 주세요. 이후 목표와 평가 기준에 반영됩니다.',
    7: '7단계에서는 지식·기능·태도 3차원 목표를 확인하고 필요시 어휘를 수정해 주세요. 평가 중점에 맞게 자동 완성되어 있습니다.',
    8: '8단계에서는 휠체어 이동, 시각 일과표, AAC 등 학생들의 개별 지원 요구를 선택해 주세요. 개인정보(실명 등)는 기재하지 않도록 주의해 주세요.',
    9: '9단계에서는 배움을 이끌 교수학습 방식을 선택합니다. 상황 모의 훈련이나 프로젝트 학습(PBL)이 특수교육 현장에서 널리 활용됩니다.',
    10: '완성된 차시 계획안을 검토하고 계십니다! "3차시 활동을 마트 계산대 역할극으로 바꿔줘", "2차시 평가를 사진 카드 선택으로 수정해줘", "8차시로 줄여줘"처럼 원하는 수정 내용을 말씀해 주시면 즉시 반영해 드립니다.'
  };

  return {
    replyText: stepAdvice[currentStep] || '차시별 활동이나 전체 계획(차시 수, 난이도, 주제, 지원 요구 등) 중 수정하고 싶은 내용을 편하게 입력해 주세요!',
    proposal: null
  };
}
