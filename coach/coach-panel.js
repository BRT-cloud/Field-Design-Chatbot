/**
 * coach/coach-panel.js
 * 최종 결과물(10단계: 차시 계획) 전용 실시간 대화형 수정 챗봇 컴포넌트
 * 
 * - 1~9단계 입력 과정에서는 챗봇 패널을 완전히 숨겨 몰입형 위저드 경험 유지
 * - 10단계(최종 차시 계획) 진입 시 우측에 자동 활성화되어 개별 차시 및 전체 계획 실시간 수정 지원
 * - 수정 이력 스택(Undo Stack, 최대 10단계)을 통해 언제든 이전 차시 계획 상태로 되돌리기 지원
 * - 완전한 클라이언트 단독 구동 & CSP 준수 (인라인 스크립트 0건, 100% 이벤트 위임)
 */

import { escapeHtml } from '../app.js';
import { buildStepForecast } from './coach-engine.js';
import { interpretUserInput } from './coach-intents.js';
import { applyPlanPatch, diffPlan } from './plan-patch.js';

const COACH_STORAGE_KEY = 'fieldtrip_coach_state_v2';
const MAX_UNDO_STACK = 10;

export class CoachPanel {
  constructor(options = {}) {
    this.getPlan = options.getPlan || (() => ({}));
    this.setPlan = options.setPlan || (() => { });
    this.onPlanChanged = options.onPlanChanged || (() => { });
    this.getCurrentStep = options.getCurrentStep || (() => 1);
    this.showToast = options.showToast || (() => { });

    this.isOpen = true;
    this.chatThreads = {};
    this.undoStack = [];
    this.dismissedProposals = new Set();
    this.activeForecast = null;
    this.lastStep = null;

    this.container = null;
    this.toggleBtn = null;
    this.floatingTrigger = null;

    this.loadState();
  }

  loadState() {
    try {
      if (typeof sessionStorage === 'undefined') return;
      const saved = sessionStorage.getItem(COACH_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          if (typeof parsed.isOpen === 'boolean') {
            this.isOpen = parsed.isOpen;
          }
          if (parsed.chatThreads && typeof parsed.chatThreads === 'object') {
            this.chatThreads = parsed.chatThreads;
          }
          if (Array.isArray(parsed.undoStack)) {
            this.undoStack = parsed.undoStack.slice(-MAX_UNDO_STACK);
          }
        }
      }
    } catch (e) {
      console.warn('챗봇 세션 복원 실패:', e);
    }
  }

  saveState() {
    try {
      if (typeof sessionStorage === 'undefined') return;
      sessionStorage.setItem(COACH_STORAGE_KEY, JSON.stringify({
        isOpen: this.isOpen,
        chatThreads: this.chatThreads,
        undoStack: this.undoStack.slice(-MAX_UNDO_STACK)
      }));
    } catch (e) {
      console.warn('챗봇 세션 저장 실패:', e);
    }
  }

  /**
   * DOM에 패널 및 토글 요소들을 마운트하고 이벤트 위임을 등록합니다.
   */
  mount() {
    this.container = document.getElementById('coachSlidePanel');
    this.toggleBtn = document.getElementById('toggleCoachBtn');
    this.floatingTrigger = document.getElementById('floatingCoachTrigger');

    if (!this.container) return;

    this.setupEvents();
    this.refresh();
  }

  setupEvents() {
    if (this.container) {
      this.container.addEventListener('click', (e) => this.handleClick(e));
      this.container.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }

    if (this.floatingTrigger) {
      this.floatingTrigger.addEventListener('click', () => this.open());
    }
  }

  toggle() {
    if (this.getCurrentStep() !== 10) return;
    this.isOpen = !this.isOpen;
    this.applyOpenState();
    this.saveState();
  }

  open() {
    if (this.getCurrentStep() !== 10) return;
    this.isOpen = true;
    this.applyOpenState();
    this.saveState();
  }

  close() {
    this.isOpen = false;
    this.applyOpenState();
    this.saveState();
  }

  applyOpenState() {
    const step = this.getCurrentStep();
    const isFinalStep = step === 10;
    const mainViewport = document.querySelector('.main-viewport-container');
    const badge = document.getElementById('coachUnreadBadge');

    // 1~9단계에서는 챗봇 버튼 및 패널을 모두 숨김
    if (!isFinalStep) {
      if (this.container) {
        this.container.classList.remove('open');
        this.container.setAttribute('aria-hidden', 'true');
      }
      if (mainViewport) mainViewport.classList.remove('coach-open');
      if (this.toggleBtn) this.toggleBtn.classList.add('hidden');
      if (this.floatingTrigger) this.floatingTrigger.classList.add('hidden');
      return;
    }

    // 10단계(최종 차시 계획)에서는 상단 토글 버튼 노출 및 패널 상태 적용
    if (this.toggleBtn) {
      this.toggleBtn.classList.remove('hidden');
    }

    if (this.isOpen) {
      if (this.container) {
        this.container.classList.add('open');
        this.container.setAttribute('aria-hidden', 'false');
      }
      if (mainViewport) mainViewport.classList.add('coach-open');
      if (this.floatingTrigger) this.floatingTrigger.classList.add('hidden');
      if (badge) {
        badge.textContent = 'ON';
        badge.classList.remove('badge-off');
      }
    } else {
      if (this.container) {
        this.container.classList.remove('open');
        this.container.setAttribute('aria-hidden', 'true');
      }
      if (mainViewport) mainViewport.classList.remove('coach-open');
      if (this.floatingTrigger) this.floatingTrigger.classList.remove('hidden');
      if (badge) {
        badge.textContent = 'OFF';
        badge.classList.add('badge-off');
      }
    }
  }

  /**
   * 스텝이 변경되었거나 플랜이 수정되었을 때 호출됩니다.
   * 10단계 진입 시 자동으로 챗봇 패널을 열어줍니다.
   */
  refresh() {
    if (!this.container) return;
    const step = this.getCurrentStep();

    if (step === 10 && this.lastStep !== 10) {
      this.isOpen = true;
    }
    this.lastStep = step;

    this.applyOpenState();

    if (step !== 10) {
      this.container.innerHTML = '';
      return;
    }

    const plan = this.getPlan();
    this.activeForecast = buildStepForecast(10, plan);
    this.render();
  }

  render() {
    if (!this.container || !this.activeForecast || this.getCurrentStep() !== 10) return;

    const forecast = this.activeForecast;
    const thread = this.chatThreads[10] || [];
    const undoCount = this.undoStack.length;

    const visibleProposals = (forecast.proposals || []).filter(
      p => !this.dismissedProposals.has(p.id)
    );

    this.container.innerHTML = `
      <!-- 챗봇 패널 헤더 -->
      <div class="coach-header">
        <div class="coach-brand">
          <div class="coach-avatar-bubble" aria-hidden="true">
            <span>AI</span>
          </div>
          <div class="coach-title-group">
            <div class="coach-title-row">
              <span class="coach-title">차시 계획 수정 챗봇</span>
              <span class="coach-step-pill">실시간 반영</span>
            </div>
            <span class="coach-subtitle">개별 차시 활동 · 전체 계획 대화형 편집</span>
          </div>
        </div>
        <div class="coach-header-actions">
          <button type="button" class="btn-coach-undo ${undoCount === 0 ? 'disabled' : ''}" 
                  data-action="coach-undo" 
                  ${undoCount === 0 ? 'disabled' : ''} 
                  title="방금 적용한 챗봇 수정 되돌리기" 
                  aria-label="챗봇 수정 되돌리기">
            ↩ 되돌리기${undoCount > 0 ? ` (${undoCount})` : ''}
          </button>
          <button type="button" class="btn-coach-icon" data-action="coach-close" title="챗봇 패널 접기" aria-label="챗봇 패널 닫기">
            ✕
          </button>
        </div>
      </div>

      <!-- 챗봇 스크롤 본문 -->
      <div class="coach-body" id="coachBody">
        <!-- 1) 차시 계획 요약 브리핑 카드 -->
        <div class="coach-forecast-card">
          <div class="forecast-card-head">
            <span class="forecast-badge">차시 계획 현황</span>
            <span class="forecast-step-info">${escapeHtml(forecast.summary)}</span>
          </div>
          <ul class="forecast-list">
            ${forecast.forecasts.map(f => `
              <li class="forecast-item">
                <span class="forecast-bullet">•</span>
                <span class="forecast-text">${escapeHtml(f)}</span>
              </li>
            `).join('')}
          </ul>

          ${forecast.warnings.length > 0 ? `
            <div class="coach-warning-box">
              ${forecast.warnings.map(w => `
                <div class="coach-warning-item">
                  <span class="warning-icon">!</span>
                  <span>${escapeHtml(w)}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- 2) 원클릭 추천 수정 제안 카드 -->
        ${visibleProposals.length > 0 ? `
          <div class="coach-proposals-section">
            <div class="coach-section-label">
              <span>빠른 맞춤 수정 제안 (${visibleProposals.length})</span>
            </div>
            <div class="coach-proposals-shelf">
              ${visibleProposals.map(prop => this.renderProposalCard(prop)).join('')}
            </div>
          </div>
        ` : ''}

        <!-- 3) 대화형 채팅 스레드 -->
        <div class="coach-chat-thread" id="coachChatThread" role="log" aria-live="polite">
          <div class="chat-msg coach-msg">
            <div class="msg-bubble">
              완성된 차시 계획안을 보고 계십니다! <strong>"3차시 활동을 마트 계산대 역할극으로 바꿔줘"</strong>, <strong>"2차시 평가를 사진 선택하기로 수정해줘"</strong>, <strong>"총 8차시로 줄여줘"</strong>처럼 말씀해 주시면 즉시 차시 계획을 수정해 드립니다.
            </div>
          </div>

          ${thread.map(msg => `
            <div class="chat-msg ${msg.sender === 'user' ? 'user-msg' : 'coach-msg'}">
              <div class="msg-bubble">
                ${escapeHtml(msg.text)}
              </div>
              ${msg.proposal ? this.renderProposalCard(msg.proposal, true) : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 4) 추천 빠른 수정 칩 모음 -->
      <div class="coach-quick-prompts-bar">
        ${(forecast.quickPrompts || []).slice(0, 4).map(prompt => `
          <button type="button" class="quick-prompt-chip" data-action="coach-quick-prompt" data-prompt="${escapeHtml(prompt)}">
            + ${escapeHtml(prompt)}
          </button>
        `).join('')}
      </div>

      <!-- 5) 하단 채팅 입력창 -->
      <div class="coach-input-bar">
        <label for="coachChatInput" class="sr-only">차시 계획 수정 요청 입력</label>
        <input type="text" class="coach-text-input" id="coachChatInput" 
               placeholder="예: 3차시 활동을 장보기 역할극으로 바꿔줘" 
               autocomplete="off" />
        <button type="button" class="btn-coach-send" data-action="coach-send" aria-label="메시지 전송">
          <span>전송</span>
        </button>
      </div>
    `;

    requestAnimationFrame(() => {
      const threadEl = document.getElementById('coachChatThread');
      if (threadEl) {
        threadEl.scrollTop = threadEl.scrollHeight;
      }
    });
  }

  renderProposalCard(prop, isInline = false) {
    const plan = this.getPlan();
    let diffSummary = '';
    if (prop.patch && prop.patch.changes) {
      try {
        const next = applyPlanPatch(plan, prop.patch);
        const diffs = diffPlan(plan, next);
        if (diffs.length > 0) {
          diffSummary = diffs.map(d => `${escapeHtml(d.label)}: ${escapeHtml(String(d.oldValue))} ➔ ${escapeHtml(String(d.newValue))}`).join('<br>');
        }
      } catch (e) {
        diffSummary = '';
      }
    }

    return `
      <div class="coach-proposal-card ${isInline ? 'inline-proposal' : ''}" data-prop-id="${escapeHtml(prop.id)}">
        <div class="proposal-card-head">
          <span class="proposal-pill">수정안</span>
          <h4 class="proposal-title">${escapeHtml(prop.title)}</h4>
        </div>
        <p class="proposal-reason">${escapeHtml(prop.reason)}</p>
        ${diffSummary ? `
          <div class="proposal-diff-box">
            <span class="diff-title">변경 내역 미리보기:</span>
            <div class="diff-content">${diffSummary}</div>
          </div>
        ` : ''}
        <div class="proposal-card-actions">
          <button type="button" class="btn-proposal-apply" data-action="coach-apply-patch" data-prop-id="${escapeHtml(prop.id)}">
            ✓ 지금 적용하기
          </button>
          <button type="button" class="btn-proposal-dismiss" data-action="coach-dismiss-patch" data-prop-id="${escapeHtml(prop.id)}">
            ✕ 닫기
          </button>
        </div>
      </div>
    `;
  }

  handleClick(e) {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.getAttribute('data-action');
    const propId = target.getAttribute('data-prop-id');
    const prompt = target.getAttribute('data-prompt');

    switch (action) {
      case 'coach-close':
        this.close();
        break;

      case 'coach-undo':
        this.undoLastChange();
        break;

      case 'coach-quick-prompt':
        if (prompt) {
          this.submitMessage(prompt);
        }
        break;

      case 'coach-send': {
        const input = document.getElementById('coachChatInput');
        if (input && input.value.trim()) {
          const val = input.value.trim();
          input.value = '';
          this.submitMessage(val);
        }
        break;
      }

      case 'coach-apply-patch':
        if (propId) {
          this.applyProposalById(propId);
        }
        break;

      case 'coach-dismiss-patch':
        if (propId) {
          this.dismissedProposals.add(propId);
          this.render();
          this.showToast('수정 제안을 닫았습니다.', 'info');
        }
        break;

      default:
        break;
    }
  }

  handleKeydown(e) {
    if (e.target && e.target.id === 'coachChatInput') {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = e.target.value.trim();
        if (val) {
          e.target.value = '';
          this.submitMessage(val);
        }
      }
    }
  }

  submitMessage(userText) {
    const step = 10;
    const plan = this.getPlan();

    if (!this.chatThreads[step]) {
      this.chatThreads[step] = [];
    }

    this.chatThreads[step].push({
      sender: 'user',
      text: userText,
      timestamp: Date.now()
    });

    // 대화창에서 "되돌리기", "방금 수정 취소", "undo" 입력 시 즉시 실행 취소 수행
    if (/^(?:되돌리\s*기|되돌려\s*줘|되돌려|실행\s*취소|방금\s*(?:거|수정)\s*취소|undo)$/i.test(userText.trim())) {
      this.undoLastChange(true);
      return;
    }

    const result = interpretUserInput(step, plan, userText);

    this.chatThreads[step].push({
      sender: 'coach',
      text: result.replyText,
      proposal: result.proposal,
      timestamp: Date.now()
    });

    this.saveState();
    this.render();
  }

  applyProposalById(propId) {
    const step = 10;
    const plan = this.getPlan();

    let targetProp = (this.activeForecast?.proposals || []).find(p => p.id === propId);

    if (!targetProp && this.chatThreads[step]) {
      for (const msg of this.chatThreads[step]) {
        if (msg.proposal && msg.proposal.id === propId) {
          targetProp = msg.proposal;
          break;
        }
      }
    }

    if (!targetProp || !targetProp.patch) {
      this.showToast('해당 수정 제안을 찾을 수 없습니다.', 'error');
      return;
    }

    try {
      const snapshotPlan = structuredClone(plan);
      const updatedPlan = applyPlanPatch(plan, targetProp.patch);

      // Undo 스택에 변경 전 스냅샷 저장 (최대 10개)
      this.undoStack.push({
        plan: snapshotPlan,
        title: targetProp.title,
        periodNum: targetProp.periodNum || null,
        timestamp: Date.now()
      });
      if (this.undoStack.length > MAX_UNDO_STACK) {
        this.undoStack.shift();
      }

      this.dismissedProposals.add(propId);

      // 플랜 갱신 콜백 호출 (수정한 차시 번호 메타데이터 전달)
      this.onPlanChanged(updatedPlan, {
        periodNum: targetProp.periodNum || null,
        title: targetProp.title
      });

      if (!this.chatThreads[step]) this.chatThreads[step] = [];
      this.chatThreads[step].push({
        sender: 'coach',
        text: `"${targetProp.title}" 수정 사항을 차시 계획에 반영했습니다. (상단 [되돌리기] 버튼으로 언제든 복원할 수 있습니다.)`,
        timestamp: Date.now()
      });

      this.saveState();
      this.refresh();
      this.showToast(`'${targetProp.title}' 수정 사항이 반영되었습니다.`, 'success');
    } catch (err) {
      console.error('제안 적용 실패:', err);
      this.showToast('수정 사항 적용 중 오류가 발생했습니다.', 'error');
    }
  }

  /**
   * 가장 최근에 적용한 챗봇 수정을 이전 상태로 되돌립니다 (Undo).
   */
  undoLastChange(fromChat = false) {
    const step = 10;
    if (!this.undoStack || this.undoStack.length === 0) {
      if (fromChat) {
        if (!this.chatThreads[step]) this.chatThreads[step] = [];
        this.chatThreads[step].push({
          sender: 'coach',
          text: '현재 되돌릴 수 있는 이전 수정 내역이 없습니다.',
          timestamp: Date.now()
        });
        this.saveState();
        this.render();
      }
      this.showToast('되돌릴 수정 내역이 없습니다.', 'info');
      return false;
    }

    const lastSnapshot = this.undoStack.pop();
    const restoredPlan = structuredClone(lastSnapshot.plan);

    this.onPlanChanged(restoredPlan, {
      periodNum: lastSnapshot.periodNum || null,
      isUndo: true,
      title: lastSnapshot.title
    });

    if (!this.chatThreads[step]) this.chatThreads[step] = [];
    this.chatThreads[step].push({
      sender: 'coach',
      text: `이전 상태("${lastSnapshot.title}" 적용 전)로 차시 계획을 되돌렸습니다.`,
      timestamp: Date.now()
    });

    this.saveState();
    this.refresh();
    this.showToast(`'${lastSnapshot.title}' 적용 전 상태로 되돌렸습니다.`, 'info');
    return true;
  }
}
