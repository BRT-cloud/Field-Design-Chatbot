/**
 * coach/coach-panel.js
 * AI 교육과정 코칭 파트너 우측 슬라이드 패널 컴포넌트
 * 
 * - 화면 우측에 위치하여 현재 스텝의 선택에 따른 다운스트림 예측 및 제안 표시
 * - 대화형 채팅을 통해 교사가 "8차시로 줄여줘", "의사소통 중심으로" 등 요구 시 즉시 맞춤 수정 패치 제안
 * - 클릭 한 번으로 [지금 적용하기]를 수행하여 위저드 카드와 공문서 기안에 양방향 실시간 동기화
 * - 완전한 클라이언트 단독 구동 & CSP 준수 (인라인 스크립트 0건, 100% 이벤트 위임)
 */

import { escapeHtml } from '../app.js';
import { buildStepForecast } from './coach-engine.js';
import { interpretUserInput } from './coach-intents.js';
import { applyPlanPatch, diffPlan } from './plan-patch.js';

const COACH_STORAGE_KEY = 'fieldtrip_coach_state';

export class CoachPanel {
  constructor(options = {}) {
    this.getPlan = options.getPlan || (() => ({}));
    this.setPlan = options.setPlan || (() => {});
    this.onPlanChanged = options.onPlanChanged || (() => {});
    this.getCurrentStep = options.getCurrentStep || (() => 1);
    this.showToast = options.showToast || (() => {});

    this.isOpen = true; // 기본 열림 상태 (데스크톱)
    this.chatThreads = {}; // { [step]: Array<{ sender: 'coach'|'user', text: string, proposal?: Object, timestamp: number }> }
    this.dismissedProposals = new Set();
    this.activeForecast = null;

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
        }
      }
    } catch (e) {
      console.warn('코치 세션 복원 실패:', e);
    }
  }

  saveState() {
    try {
      if (typeof sessionStorage === 'undefined') return;
      sessionStorage.setItem(COACH_STORAGE_KEY, JSON.stringify({
        isOpen: this.isOpen,
        chatThreads: this.chatThreads
      }));
    } catch (e) {
      console.warn('코치 세션 저장 실패:', e);
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
    this.applyOpenState();
    this.refresh();
  }

  setupEvents() {
    // 패널 내부 이벤트 위임
    if (this.container) {
      this.container.addEventListener('click', (e) => this.handleClick(e));
      this.container.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    // 상단 네비게이션 토글 버튼
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }

    // 우측 하단 플로팅 트리거
    if (this.floatingTrigger) {
      this.floatingTrigger.addEventListener('click', () => this.open());
    }

    // 창 크기 변경 시 자동 반응 (모바일 초기 닫힘 등)
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024 && this.isOpen) {
        // 작은 화면에서는 기본 플로팅 동작 지원
      }
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.applyOpenState();
    this.saveState();
  }

  open() {
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
    const mainViewport = document.querySelector('.main-viewport-container');
    const badge = document.getElementById('coachUnreadBadge');

    if (this.isOpen) {
      if (this.container) this.container.classList.add('open');
      if (mainViewport) mainViewport.classList.add('coach-open');
      if (this.floatingTrigger) this.floatingTrigger.classList.add('hidden');
      if (badge) {
        badge.textContent = 'ON';
        badge.classList.remove('badge-off');
      }
    } else {
      if (this.container) this.container.classList.remove('open');
      if (mainViewport) mainViewport.classList.remove('coach-open');
      if (this.floatingTrigger) this.floatingTrigger.classList.remove('hidden');
      if (badge) {
        badge.textContent = 'OFF';
        badge.classList.add('badge-off');
      }
    }
  }

  /**
   * 위저드 스텝이 변경되었거나 플랜이 수정되었을 때 패널 내용을 다시 렌더링합니다.
   */
  refresh() {
    if (!this.container) return;
    const step = this.getCurrentStep();
    const plan = this.getPlan();

    this.activeForecast = buildStepForecast(step, plan);
    this.render();
  }

  render() {
    if (!this.container || !this.activeForecast) return;

    const step = this.getCurrentStep();
    const forecast = this.activeForecast;
    const thread = this.chatThreads[step] || [];

    // 해제되지 않은 유효 제안 필터링
    const visibleProposals = (forecast.proposals || []).filter(
      p => !this.dismissedProposals.has(p.id)
    );

    this.container.innerHTML = `
      <!-- 코치 패널 헤더 -->
      <div class="coach-header">
        <div class="coach-brand">
          <div class="coach-avatar-bubble" aria-hidden="true">
            <span>✨</span>
          </div>
          <div class="coach-title-group">
            <div class="coach-title-row">
              <span class="coach-title">AI 코칭 파트너</span>
              <span class="coach-step-pill">STEP 0${step}</span>
            </div>
            <span class="coach-subtitle">실시간 영향 예측 &amp; 대화형 수정</span>
          </div>
        </div>
        <div class="coach-header-actions">
          <button type="button" class="btn-coach-icon" data-action="coach-close" title="코치 패널 접기" aria-label="코치 패널 닫기">
            ✕
          </button>
        </div>
      </div>

      <!-- 코치 스크롤 본문 -->
      <div class="coach-body" id="coachBody">
        <!-- 1) 다운스트림 예측 카드 -->
        <div class="coach-forecast-card">
          <div class="forecast-card-head">
            <span class="forecast-badge">🔮 실시간 영향 예측</span>
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
                  <span class="warning-icon">⚠️</span>
                  <span>${escapeHtml(w)}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- 2) 맞춤 수정 제안 카드 (Active Proposals) -->
        ${visibleProposals.length > 0 ? `
          <div class="coach-proposals-section">
            <div class="coach-section-label">
              <span>💡 추천 수정 제안 (${visibleProposals.length})</span>
            </div>
            <div class="coach-proposals-shelf">
              ${visibleProposals.map(prop => this.renderProposalCard(prop)).join('')}
            </div>
          </div>
        ` : ''}

        <!-- 3) 대화형 채팅 스레드 -->
        <div class="coach-chat-thread" id="coachChatThread" role="log" aria-live="polite">
          <!-- 웰컴/안내 기본 메시지 -->
          <div class="chat-msg coach-msg">
            <div class="msg-bubble">
              현재 단계(${step}단계)에 맞추어 예상을 제안했습니다. 원하시는 조건(차시, 난이도, 주제, 학생 지원 등)을 편하게 말씀해 주시면 바로 수정해 드릴게요!
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

      <!-- 4) 추천 빠른 질문 칩 모음 -->
      <div class="coach-quick-prompts-bar">
        ${(forecast.quickPrompts || []).slice(0, 3).map(prompt => `
          <button type="button" class="quick-prompt-chip" data-action="coach-quick-prompt" data-prompt="${escapeHtml(prompt)}">
            + ${escapeHtml(prompt)}
          </button>
        `).join('')}
      </div>

      <!-- 5) 하단 채팅 입력창 -->
      <div class="coach-input-bar">
        <label for="coachChatInput" class="sr-only">코치에게 수정 및 질문 입력</label>
        <input type="text" class="coach-text-input" id="coachChatInput" 
               placeholder="예: 8차시로 줄여줘, 의사소통 평가로 바꿔줘" 
               autocomplete="off" />
        <button type="button" class="btn-coach-send" data-action="coach-send" aria-label="메시지 전송">
          <span>전송</span>
        </button>
      </div>
    `;

    // 채팅 최하단으로 자동 스크롤
    requestAnimationFrame(() => {
      const threadEl = document.getElementById('coachChatThread');
      if (threadEl) {
        threadEl.scrollTop = threadEl.scrollHeight;
      }
    });
  }

  renderProposalCard(prop, isInline = false) {
    const plan = this.getPlan();
    // 미리보기 diff 계산
    let diffSummary = '';
    if (prop.patch && prop.patch.changes) {
      try {
        const next = applyPlanPatch(plan, prop.patch);
        const diffs = diffPlan(plan, next);
        if (diffs.length > 0) {
          diffSummary = diffs.map(d => `${d.label}: ${d.oldValue} ➔ ${d.newValue}`).join('<br>');
        }
      } catch (e) {
        diffSummary = '';
      }
    }

    return `
      <div class="coach-proposal-card ${isInline ? 'inline-proposal' : ''}" data-prop-id="${escapeHtml(prop.id)}">
        <div class="proposal-card-head">
          <span class="proposal-pill">제안</span>
          <h4 class="proposal-title">${escapeHtml(prop.title)}</h4>
        </div>
        <p class="proposal-reason">${escapeHtml(prop.reason)}</p>
        ${diffSummary ? `
          <div class="proposal-diff-box">
            <span class="diff-title">변경 예상 내역:</span>
            <div class="diff-content">${diffSummary}</div>
          </div>
        ` : ''}
        <div class="proposal-card-actions">
          <button type="button" class="btn-proposal-apply" data-action="coach-apply-patch" data-prop-id="${escapeHtml(prop.id)}">
            ✓ 지금 적용하기
          </button>
          <button type="button" class="btn-proposal-dismiss" data-action="coach-dismiss-patch" data-prop-id="${escapeHtml(prop.id)}">
            ✕ 건너뛰기
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
          this.showToast('제안을 건너뛰었습니다.', 'info');
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
    const step = this.getCurrentStep();
    const plan = this.getPlan();

    if (!this.chatThreads[step]) {
      this.chatThreads[step] = [];
    }

    // 1) 사용자 메시지 기록
    this.chatThreads[step].push({
      sender: 'user',
      text: userText,
      timestamp: Date.now()
    });

    // 2) AI 의도 해석 및 제안 생성
    const result = interpretUserInput(step, plan, userText);

    // 3) 코치 응답 기록
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
    const step = this.getCurrentStep();
    const plan = this.getPlan();

    // 1. 활성 예측 제안에서 검색
    let targetProp = (this.activeForecast?.proposals || []).find(p => p.id === propId);

    // 2. 채팅 메시지 인라인 제안에서 검색
    if (!targetProp && this.chatThreads[step]) {
      for (const msg of this.chatThreads[step]) {
        if (msg.proposal && msg.proposal.id === propId) {
          targetProp = msg.proposal;
          break;
        }
      }
    }

    if (!targetProp || !targetProp.patch) {
      this.showToast('해당 제안을 찾을 수 없습니다.', 'error');
      return;
    }

    try {
      const updatedPlan = applyPlanPatch(plan, targetProp.patch);
      this.dismissedProposals.add(propId);

      // 플랜 갱신 콜백 호출 (app.js 동기화 및 세션 저장, 위저드 뷰 리렌더)
      this.onPlanChanged(updatedPlan);

      // 성공 메시지를 채팅 스레드에 기록
      if (!this.chatThreads[step]) this.chatThreads[step] = [];
      this.chatThreads[step].push({
        sender: 'coach',
        text: `✔️ "${targetProp.title}" 제안을 설계에 성공적으로 반영했습니다!`,
        timestamp: Date.now()
      });

      this.saveState();
      this.refresh();
      this.showToast(`'${targetProp.title}' 제안이 반영되었습니다.`, 'success');
    } catch (err) {
      console.error('제안 적용 실패:', err);
      this.showToast('제안 적용 중 오류가 발생했습니다.', 'error');
    }
  }
}
