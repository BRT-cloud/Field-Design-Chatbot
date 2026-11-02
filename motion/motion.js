/**
 * motion/motion.js
 * 챗봇 위저드 전체 마우스(Pointer) 모션 그래픽 및 스크롤(Scroll) 모션 그래픽 컨트롤러
 * 
 * - 은은하고 정제된(Subtle) 마이크로 인터랙션 제공
 * - 외부 라이브러리 의존성 0건 (CSP 'self' 100% 준수)
 * - prefers-reduced-motion: reduce 접근성 설정 및 인쇄(@media print) 환경 자동 대응
 */

let motionInitialized = false;
let activeScrollObserver = null;
let lastHoveredCard = null;

export function isReducedMotionPreferred() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * 전역 마우스 포인터 트래킹(배경 스포트라이트, 패럴랙스, 카드 미세 틸트, 클릭 리플) 초기화
 */
export function initMotionController() {
  if (motionInitialized || typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  motionInitialized = true;

  if (isReducedMotionPreferred()) {
    document.documentElement.classList.add('reduced-motion');
    return;
  }

  const root = document.documentElement;
  let targetX = window.innerWidth * 0.5;
  let targetY = window.innerHeight * 0.35;
  let currentX = targetX;
  let currentY = targetY;
  let rafId = null;

  const updatePointerLoop = () => {
    const dx = targetX - currentX;
    const dy = targetY - currentY;

    currentX += dx * 0.12;
    currentY += dy * 0.12;

    const nx = (currentX / Math.max(window.innerWidth, 1) - 0.5) * 2;
    const ny = (currentY / Math.max(window.innerHeight, 1) - 0.5) * 2;

    root.style.setProperty('--mx', `${currentX.toFixed(1)}px`);
    root.style.setProperty('--my', `${currentY.toFixed(1)}px`);
    root.style.setProperty('--nx', nx.toFixed(3));
    root.style.setProperty('--ny', ny.toFixed(3));

    if (Math.abs(dx) > 0.4 || Math.abs(dy) > 0.4) {
      rafId = requestAnimationFrame(updatePointerLoop);
    } else {
      rafId = null;
    }
  };

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    targetX = e.clientX;
    targetY = e.clientY;
    if (!rafId) {
      rafId = requestAnimationFrame(updatePointerLoop);
    }

    // 인터랙티브 카드 미세 틸트 및 광원 효과 (은은한 ±1.2도 제한)
    const card = e.target.closest?.('.choice-bubble-card, .standard-pick-item, .ppt-slide-card, .coach-proposal-card');
    if (lastHoveredCard && lastHoveredCard !== card) {
      resetCardMotion(lastHoveredCard);
      lastHoveredCard = null;
    }

    if (card) {
      lastHoveredCard = card;
      const rect = card.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const px = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        const py = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
        const tiltX = ((0.5 - py) * 2.2).toFixed(2);
        const tiltY = ((px - 0.5) * 2.2).toFixed(2);

        card.style.setProperty('--card-mx', `${(px * 100).toFixed(1)}%`);
        card.style.setProperty('--card-my', `${(py * 100).toFixed(1)}%`);
        card.style.setProperty('--tilt-x', `${tiltX}deg`);
        card.style.setProperty('--tilt-y', `${tiltY}deg`);
      }
    }
  }, { passive: true });

  document.addEventListener('pointerleave', () => {
    if (lastHoveredCard) {
      resetCardMotion(lastHoveredCard);
      lastHoveredCard = null;
    }
  }, { passive: true });

  // 은은한 클릭 물결(Ripple) 모션
  document.addEventListener('pointerdown', (e) => {
    if (isReducedMotionPreferred()) return;
    const target = e.target.closest?.(
      '.btn-soft-primary, .btn-soft-nav, .btn-bubble-tool, .choice-bubble-card, .pill-option-btn, .toc-chip-btn, .quick-prompt-chip, .btn-proposal-apply, .btn-coach-undo'
    );
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'motion-ripple';
    ripple.setAttribute('aria-hidden', 'true');

    const size = Math.min(Math.max(rect.width, rect.height) * 1.15, 220);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = `${size.toFixed(0)}px`;
    ripple.style.height = `${size.toFixed(0)}px`;
    ripple.style.left = `${x.toFixed(1)}px`;
    ripple.style.top = `${y.toFixed(1)}px`;

    target.classList.add('motion-ripple-host');
    target.appendChild(ripple);

    const removeRipple = () => {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    };
    ripple.addEventListener('animationend', removeRipple, { once: true });
    setTimeout(removeRipple, 650);
  }, { passive: true });
}

function resetCardMotion(card) {
  if (!card || !card.style) return;
  card.style.setProperty('--tilt-x', '0deg');
  card.style.setProperty('--tilt-y', '0deg');
}

/**
 * 단계 전환 시 카드 슬라이드-페이드 모션 트리거
 * @param {'next'|'prev'} direction
 */
export function triggerStepTransition(direction = 'next') {
  if (typeof document === 'undefined' || isReducedMotionPreferred()) return;
  const card = document.getElementById('immersiveStepCard');
  if (!card) return;

  card.classList.remove('step-enter-next', 'step-enter-prev');
  // Reflow 유도하여 연속 클릭 시에도 애니메이션 재실행 보장
  void card.offsetWidth;
  card.classList.add(direction === 'prev' ? 'step-enter-prev' : 'step-enter-next');
}

/**
 * 각 스텝 렌더링 직후 호출되어 자식 카드들의 순차 등장(Stagger)과
 * 10단계 결과 뷰어의 스크롤 연동 모션(진행률 바, 섹션 리빌, 목차 스파이)을 바인딩합니다.
 * @param {number} step
 */
export function applyStepStaggerAndScrollMotion(step) {
  if (typeof document === 'undefined') return;

  if (activeScrollObserver) {
    activeScrollObserver.disconnect();
    activeScrollObserver = null;
  }

  const reduced = isReducedMotionPreferred();
  const box = document.getElementById('cardInteractionBox');
  if (!box) return;

  // 1) 스텝 내 선택 카드 순차 등장 모션 (Staggered Entrance)
  if (!reduced) {
    const items = box.querySelectorAll(
      '.choice-bubble-card, .standard-pick-item, .pill-option-btn, .goal-input-group, .result-section-box'
    );
    items.forEach((el, idx) => {
      el.style.setProperty('--stagger-i', String(Math.min(idx, 10)));
      el.classList.add('motion-stagger-item');
    });
  }

  // 2) 10단계(최종 차시 계획) 스크롤 모션 그래픽 바인딩
  if (step === 10) {
    setupFinalStepScrollMotion(reduced);
  }
}

function setupFinalStepScrollMotion(reduced) {
  const scroller = document.getElementById('udlPrintArea');
  if (!scroller) return;

  const fixedHeader = document.querySelector('.step10-fixed-header');
  const progressFill = document.getElementById('step10ScrollProgressFill');
  const tocButtons = Array.from(document.querySelectorAll('.toc-chip-btn[data-action="jump-toc-section"]'));
  const sectionIds = ['sec-summary', 'sec-roadmap', 'sec-detail', 'sec-materials'];

  let scrollRaf = null;
  const updateScrollState = () => {
    scrollRaf = null;
    const maxScroll = Math.max(scroller.scrollHeight - scroller.clientHeight, 1);
    const ratio = Math.min(Math.max(scroller.scrollTop / maxScroll, 0), 1);

    if (progressFill) {
      progressFill.style.transform = `scaleX(${ratio.toFixed(4)})`;
    }
    if (fixedHeader) {
      fixedHeader.classList.toggle('is-scrolled', scroller.scrollTop > 8);
    }

    // 현재 스크롤 위치에 해당하는 활성 목차 칩 하이라이트 (Scroll-Spy)
    let activeId = sectionIds[0];
    const threshold = scroller.scrollTop + 90;
    for (const id of sectionIds) {
      const secEl = document.getElementById(id);
      if (secEl && secEl.offsetTop - scroller.offsetTop <= threshold) {
        activeId = id;
      }
    }

    tocButtons.forEach(btn => {
      const isMatch = btn.getAttribute('data-id') === activeId;
      btn.classList.toggle('active-toc-chip', isMatch);
    });
  };

  scroller.addEventListener('scroll', () => {
    if (!scrollRaf) {
      scrollRaf = requestAnimationFrame(updateScrollState);
    }
  }, { passive: true });

  // 초기 상태 1회 동기화
  requestAnimationFrame(updateScrollState);

  // 스크롤 진입 시 은은한 리빌(Reveal) 모션
  const revealTargets = scroller.querySelectorAll(
    '.result-section-box, .result-table tbody tr, .period-detail-card, .ppt-slide-card'
  );

  if (reduced || typeof IntersectionObserver === 'undefined') {
    revealTargets.forEach(el => el.classList.add('scroll-in-view'));
    return;
  }

  activeScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-in-view');
        activeScrollObserver?.unobserve(entry.target);
      }
    });
  }, {
    root: scroller,
    threshold: 0.08,
    rootMargin: '0px 0px -12px 0px'
  });

  revealTargets.forEach((el, idx) => {
    el.classList.add('scroll-reveal-unit');
    el.style.setProperty('--reveal-delay', `${Math.min(idx % 6, 5) * 28}ms`);
    activeScrollObserver.observe(el);
  });
}

/**
 * 챗봇을 통해 특정 차시가 수정되거나 되돌려졌을 때 해당 차시 행으로 부드럽게 스크롤하고 하이라이트 펄스를 재생합니다.
 * @param {number|null} periodNum
 */
export function highlightEditedPeriod(periodNum) {
  if (typeof document === 'undefined' || !periodNum) return;
  const scroller = document.getElementById('udlPrintArea');
  if (!scroller) return;

  const targets = scroller.querySelectorAll(`[data-period-num="${periodNum}"]`);
  if (!targets || targets.length === 0) return;

  const firstTarget = targets[0];
  const offsetTop = firstTarget.offsetTop - scroller.offsetTop - 60;

  scroller.scrollTo({
    top: Math.max(0, offsetTop),
    behavior: isReducedMotionPreferred() ? 'auto' : 'smooth'
  });

  targets.forEach(el => {
    el.classList.remove('period-highlight-pulse');
    void el.offsetWidth;
    el.classList.add('period-highlight-pulse');
  });
}

