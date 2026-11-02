/**
 * coach/plan-patch.js
 * AI 코치 플랜 수정(PlanPatch) 적용 및 차이(Diff) 계산 유틸리티
 * 
 * - 보안 원칙: 화이트리스트에 등록된 키만 수정을 허용하여 임의 속성 오염(__proto__ 등) 방지
 * - 불변성 원칙: 기존 plan 객체를 직접 변경하지 않고 structuredClone 후 안전하게 갱신
 * - 무결성 보장: 변경 후 sanitizePlan을 거쳐 타입 및 범위 검증
 */

import { sanitizePlan } from '../app.js';

export const WHITELISTED_PLAN_KEYS = new Set([
  'academicYear',
  'schoolLevel',
  'locationId',
  'locationName',
  'standards',
  'theme',
  'themeManuallyEdited',
  'periodCount',
  'difficultyLevel',
  'evalFocusId',
  'evalFocusTitle',
  'goalKnowledge',
  'goalSkill',
  'goalAttitude',
  'functionalNeeds',
  'teachingMethod',
  'periodOverrides'
]);

export const PLAN_FIELD_LABELS = {
  schoolLevel: '학교급',
  locationName: '체험 장소',
  theme: '체험 주제',
  periodCount: '총 차시',
  difficultyLevel: '수업 난이도',
  evalFocusTitle: '평가 중점',
  goalKnowledge: '지식·이해 목표',
  goalSkill: '기능·수행 목표',
  goalAttitude: '가치·태도 목표',
  functionalNeeds: '맞춤 지원 요구',
  teachingMethod: '교수학습 방식',
  standards: '연계 성취기준',
  periodOverrides: '개별 차시 계획'
};

/**
 * 플랜에 패치를 안전하게 적용합니다.
 * @param {Object} plan - 원본 플랜 객체
 * @param {Object} patch - { changes: Object, reason?: string, sideEffects?: string[] }
 * @returns {Object} 갱신되고 검증된 새 플랜 객체
 */
export function applyPlanPatch(plan, patch) {
  if (!plan || typeof plan !== 'object') {
    throw new Error('Invalid plan object provided to applyPlanPatch.');
  }
  if (!patch || typeof patch !== 'object' || !patch.changes || typeof patch.changes !== 'object') {
    throw new Error('Invalid patch object provided to applyPlanPatch.');
  }

  const next = structuredClone(plan);

  for (const [key, value] of Object.entries(patch.changes)) {
    if (!WHITELISTED_PLAN_KEYS.has(key)) {
      continue; // 화이트리스트 외 키 무시
    }

    if (key === 'standards') {
      if (Array.isArray(value)) {
        next.standards = value.map(s => ({ ...s }));
      }
    } else if (key === 'functionalNeeds') {
      if (Array.isArray(value)) {
        next.functionalNeeds = value.filter(v => typeof v === 'string' && v.trim()).map(v => v.trim());
      }
    } else if (key === 'theme') {
      next.theme = String(value).trim();
      next.themeManuallyEdited = true; // 교사/코치 명시적 수정 플래그 활성화
    } else if (key === 'periodCount') {
      const num = parseInt(value, 10);
      if (!isNaN(num) && num >= 1 && num <= 30) {
        next.periodCount = num;
      }
    } else if (key === 'periodOverrides') {
      if (value === null) {
        next.periodOverrides = {};
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        if (!next.periodOverrides || typeof next.periodOverrides !== 'object' || Array.isArray(next.periodOverrides)) {
          next.periodOverrides = {};
        }
        for (const [pKey, pVal] of Object.entries(value)) {
          if (pKey === '__proto__' || pKey === 'constructor' || pKey === 'prototype') continue;
          const pNum = parseInt(pKey, 10);
          if (isNaN(pNum) || pNum < 1 || pNum > 30) continue;
          const normKey = String(pNum);
          if (pVal === null) {
            delete next.periodOverrides[normKey];
          } else if (typeof pVal === 'object' && !Array.isArray(pVal)) {
            next.periodOverrides[normKey] = {
              ...(next.periodOverrides[normKey] || {}),
              ...pVal
            };
          }
        }
      }
    } else {
      next[key] = value;
    }
  }

  return sanitizePlan(next);
}

function summarizePeriodOverride(entry) {
  if (!entry || typeof entry !== 'object') return '(기본 자동 생성안)';
  const parts = [];
  if (entry.title) parts.push(`주제: ${entry.title}`);
  if (entry.summary) parts.push(`활동: ${entry.summary}`);
  if (entry.eval) parts.push(`평가: ${entry.eval}`);
  return parts.length > 0 ? parts.join(' | ') : '(맞춤 수정)';
}

/**
 * 두 플랜 간의 사용자 표시용 변경사항(Diff)을 계산합니다.
 * @param {Object} oldPlan 
 * @param {Object} newPlan 
 * @returns {Array<{ field: string, label: string, oldValue: any, newValue: any, periodNum?: number }>}
 */
export function diffPlan(oldPlan, newPlan) {
  if (!oldPlan || !newPlan) return [];
  const diffs = [];

  for (const key of WHITELISTED_PLAN_KEYS) {
    if (key === 'themeManuallyEdited' || key === 'academicYear' || key === 'locationId' || key === 'evalFocusId') {
      continue;
    }

    const oldVal = oldPlan[key];
    const newVal = newPlan[key];

    if (key === 'standards') {
      const oldCodes = Array.isArray(oldVal) ? oldVal.map(s => s.code).sort().join(', ') : '';
      const newCodes = Array.isArray(newVal) ? newVal.map(s => s.code).sort().join(', ') : '';
      if (oldCodes !== newCodes) {
        diffs.push({
          field: key,
          label: PLAN_FIELD_LABELS[key] || key,
          oldValue: oldCodes || '(없음)',
          newValue: newCodes || '(없음)'
        });
      }
    } else if (key === 'functionalNeeds') {
      const oldStr = Array.isArray(oldVal) ? oldVal.join(', ') : '';
      const newStr = Array.isArray(newVal) ? newVal.join(', ') : '';
      if (oldStr !== newStr) {
        diffs.push({
          field: key,
          label: PLAN_FIELD_LABELS[key] || key,
          oldValue: oldStr || '(없음)',
          newValue: newStr || '(없음)'
        });
      }
    } else if (key === 'periodOverrides') {
      const oldMap = (oldVal && typeof oldVal === 'object' && !Array.isArray(oldVal)) ? oldVal : {};
      const newMap = (newVal && typeof newVal === 'object' && !Array.isArray(newVal)) ? newVal : {};
      const allKeys = Array.from(new Set([...Object.keys(oldMap), ...Object.keys(newMap)]))
        .sort((a, b) => Number(a) - Number(b));

      for (const pKey of allKeys) {
        const oldEntry = oldMap[pKey] || null;
        const newEntry = newMap[pKey] || null;
        if (JSON.stringify(oldEntry) !== JSON.stringify(newEntry)) {
          diffs.push({
            field: 'periodOverrides',
            periodNum: Number(pKey),
            label: `${pKey}차시 계획`,
            oldValue: summarizePeriodOverride(oldEntry),
            newValue: summarizePeriodOverride(newEntry)
          });
        }
      }
    } else if (oldVal !== newVal) {
      diffs.push({
        field: key,
        label: PLAN_FIELD_LABELS[key] || key,
        oldValue: oldVal ?? '(없음)',
        newValue: newVal ?? '(없음)'
      });
    }
  }

  return diffs;
}
