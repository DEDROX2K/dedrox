/**
 * DEDROX Portfolio Prototype JS
 */

// --------------------------------------------------------
// QUICK EDIT CONFIG
// --------------------------------------------------------
const SITE_CONFIG = {
    profile: {
        githubUsername: 'raghavprasanna',
        githubChartColor: '111111',
        locationMain: 'Newcastle',
        locationSub: '(United Kingdom)',
        timeZone: 'Europe/London'
    },
    dock: {
        maxDistance: 120,
        maxDistanceY: 110,
        maxScaleBoost: 0.35,
        maxLift: 8,
        smoothFactor: 0.36
    },
    asciiRain: {
        chars: ['▒', '▒', '▒', '░', '░', 'o', 'x', ' '],
        fontSize: 15,
        speed: 1,
        baseOpacity: 1,
        baseColor: '214, 214, 214',
        cursorColor: '0, 0, 0',
        direction: 'up',
        cursorOpacity: 0,
        cursorRadius: 280,
        density: 1.3,
        lengthMultiplier: 1,
    },
    companies: [
        { name: 'AIR CARDS', logo: 'images/c5.png', url: 'images/c1.png' },
        { name: 'Studio Nefce', logo: 'images/c6.png', url: 'images/c2.png' },
        { name: 'Opendatabay', logo: 'images/c4.png', url: 'images/c3.png' },
        { name: 'Noun Town VR Language Learning', logo: 'images/c3.png', url: 'images/c4.png' },
        { name: 'Birmingham city university', logo: 'images/c2.png', url: 'images/c5.png' },
        { name: 'Do. Creative Labs', logo: 'images/c1.png', url: 'images/c6.png' }
    ],
    pixel: {
        palette: ['#141414ff', '#ec726c', '#ffcc00', '#99e24f', '#75d3ff', '#f996cb'],
        pixelSize: 1,
        background: '#f3f3f3',
        resolution: 40
    },
    caseData: {
        case1: {
            title: "Clear Breath CBT",
            images: [
                'images/DEDROX.DSGN/CB1.jpg', 'images/DEDROX.DSGN/CB2.jpg', 'images/DEDROX.DSGN/CB3.jpg',
                'images/DEDROX.DSGN/CB4.jpg', 'images/DEDROX.DSGN/CB5.jpg', 'images/DEDROX.DSGN/CB6.jpg',
                'images/DEDROX.DSGN/CB7.jpg', 'images/DEDROX.DSGN/CB8.jpg', 'images/DEDROX.DSGN/CB9.jpg',
                'images/DEDROX.DSGN/CB10.jpg', 'images/DEDROX.DSGN/CB11.jpg'
            ]
        },
        case2: {
            title: "Air Buddy Navigation",
            images: [
                'images/DEDROX.DSGN/AN1.jpg', 'images/DEDROX.DSGN/AN2.jpg', 'images/DEDROX.DSGN/AN3.jpg',
                'images/DEDROX.DSGN/AN4.jpg', 'images/DEDROX.DSGN/AN5.jpg', 'images/DEDROX.DSGN/AN6.jpg',
                'images/DEDROX.DSGN/AN7.jpg', 'images/DEDROX.DSGN/AN8.jpg', 'images/DEDROX.DSGN/AN9.jpg'
            ]
        },
        case3: {
            title: "Research Phase",
            images: [
                'images/DEDROX.DSGN/f1.png', 'images/DEDROX.DSGN/f2.png', 'images/DEDROX.DSGN/f3.png',
                'images/DEDROX.DSGN/f4.png', 'images/DEDROX.DSGN/f5.png', 'images/DEDROX.DSGN/f6.png',
                'images/DEDROX.DSGN/f7.png'
            ]
        }
    },
    setupCaseOverlays() {
        const cards = document.querySelectorAll('[data-case]');
        const caseWindow = document.getElementById('case-window');
        const closeBtn = document.getElementById('case-close');
        const openBtn = document.getElementById('case-open-link');
        const contentArea = document.getElementById('case-content-area');
        const titleDisp = document.getElementById('case-title');

        let isTransitioning = false;
        let caseMotionTimer = null;
        let activeCaseHref = '';
        const CASE_ANIM_MS = 560;
        const fallbackCaseLinks = {
            case1: 'Case1.html',
            case2: 'Case2.html',
            case3: 'case3.html'
        };

        const syncOpenButton = () => {
            if (!openBtn) return;
            const hasHref = Boolean(activeCaseHref);
            openBtn.disabled = !hasHref;
            openBtn.setAttribute('aria-disabled', hasHref ? 'false' : 'true');
        };

        const resolveCaseHref = (caseId, rawHref) => {
            const href = typeof rawHref === 'string' ? rawHref.trim() : '';
            if (href && href !== '#') return href;
            return fallbackCaseLinks[caseId] || '';
        };

        const setCaseLayout = (isOpen) => {
            document.body.classList.toggle('case-open', isOpen);
        };

        const clearCaseMotion = () => {
            if (caseMotionTimer) {
                window.clearTimeout(caseMotionTimer);
                caseMotionTimer = null;
            }
            caseWindow.classList.remove('is-opening');
            caseWindow.classList.remove('is-closing');
        };

        const finalizeClose = (keepLayout = false) => {
            clearCaseMotion();
            caseWindow.classList.remove('visible');
            caseWindow.classList.remove('minimized');
            if (!keepLayout) {
                setCaseLayout(false);
            }
        };

        const closeCase = ({ immediate = false, keepLayout = false } = {}) => {
            if (!caseWindow.classList.contains('visible') && !caseWindow.classList.contains('is-closing')) return;
            clearCaseMotion();
            caseWindow.classList.remove('minimized');
            if (immediate) {
                finalizeClose(keepLayout);
                return;
            }
            caseWindow.classList.add('is-closing');
            caseWindow.classList.remove('visible');
            caseMotionTimer = window.setTimeout(() => {
                finalizeClose(keepLayout);
            }, CASE_ANIM_MS);
        };

        const showCase = (data, caseHref = '') => {
            titleDisp.textContent = data.title;
            contentArea.innerHTML = data.images.map(img => `<img src="${img}" alt="Case Image">`).join('');
            activeCaseHref = caseHref;
            syncOpenButton();

            setCaseLayout(true);
            clearCaseMotion();
            caseWindow.classList.remove('minimized');
            caseWindow.classList.add('visible');
            caseWindow.classList.add('is-opening');
            contentArea.scrollTop = 0;

            caseMotionTimer = window.setTimeout(() => {
                clearCaseMotion();
            }, CASE_ANIM_MS);
        };

        const openCase = (caseId, caseHref = '') => {
            if (isTransitioning) return;
            const data = SITE_CONFIG.caseData[caseId];
            if (!data) return;
            const resolvedHref = resolveCaseHref(caseId, caseHref);

            if (caseWindow.classList.contains('visible')) {
                isTransitioning = true;
                closeCase({ keepLayout: true });
                window.setTimeout(() => {
                    showCase(data, resolvedHref);
                    isTransitioning = false;
                }, CASE_ANIM_MS + 20);
            } else {
                showCase(data, resolvedHref);
            }
        };

        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const caseId = card.getAttribute('data-case');
                const caseHref = card.getAttribute('href');
                openCase(caseId, caseHref);
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeCase);
        }

        if (openBtn) {
            syncOpenButton();
            openBtn.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (!activeCaseHref) return;
                window.open(activeCaseHref, '_blank', 'noopener,noreferrer');
            });
        }

        window.CaseOverlayControl = {
            close: () => closeCase(),
            closeImmediate: () => closeCase({ immediate: true }),
            isVisible: () => caseWindow.classList.contains('visible') || caseWindow.classList.contains('is-closing')
        };
    },
    pillSizes: {
        collapsed: {
            circle: { w: '4px', h: '20px', c: '#ffffffff' },
            circle2: { w: '10px', h: '10px', c: '#ffffffff', br: '99px' },
            square: { w: '25px', h: '24px', c: '#ffffffff' },
            dark: { w: '8px', h: '34px', c: '#ffffffff' },
            circle3: { w: '10px', h: '10px', c: '#ffffffff', br: '99px' },

            container: { w: '280px', h: '56px', c: '#ffffff' }
        },
        expanded: {
            circle: { w: '74px', h: '44px', c: '#e7e7e7' },
            circle2: { w: '29px', h: '8px', c: '#e7e7e7', br: '14px' },
            square: { w: '49px', h: '44px', c: '#e7e7e7' },
            dark: { w: '74px', h: '44px', c: '#e7e7e7' },
            circle3: { w: '29px', h: '8px', c: '#e7e7e7', br: '22px' },

            container: { w: '450px', h: '64px', c: '#ffffff' }
        }
    },
    blurMask: {
        strength: '15px',
        opacity: 0.85
    },
    marquee: {
        color: '#d2d2d2ff',
        speed: 0.5
    }
};

function applyBlurMaskSettings() {
    const cfg = SITE_CONFIG.blurMask;
    if (!cfg) return;
    const root = document.documentElement;
    root.style.setProperty('--blur-mask-strength', cfg.strength);
    root.style.setProperty('--blur-mask-opacity', cfg.opacity);
}

function applyMarqueeSettings() {
    const cfg = SITE_CONFIG.marquee;
    if (!cfg) return;
    const root = document.documentElement;
    root.style.setProperty('--marquee-speed', `${cfg.speed}s`);

    // Create base64 SVG polygon pointing left, repeating tile design
    const color = cfg.color || '#bfa7fb';
    const svgStr = `<svg width="40" height="24" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg"><polygon points="0,12 15,0 28,0 13,12 28,24 15,24" fill="${color}"/></svg>`;
    const b64 = window.btoa(svgStr);
    root.style.setProperty('--marquee-bg', `url('data:image/svg+xml;base64,${b64}')`);
}

function applyPillSizes(state) {
    const sizes = SITE_CONFIG.pillSizes[state];
    if (!sizes) return;
    const root = document.documentElement;

    const setProps = (prefix, obj) => {
        if (!obj) return;
        if (obj.w) root.style.setProperty(`--pill-${prefix}-w`, obj.w);
        if (obj.h) root.style.setProperty(`--pill-${prefix}-h`, obj.h);
        if (obj.c) root.style.setProperty(`--pill-${prefix}-c`, obj.c);
        if (obj.br) root.style.setProperty(`--pill-${prefix}-br`, obj.br);
    };

    setProps('bar', sizes.bar);
    setProps('circle', sizes.circle);
    setProps('circle2', sizes.circle2);
    setProps('circle3', sizes.circle3);
    setProps('square', sizes.square);
    setProps('dark', sizes.dark);

    if (sizes.container) {
        if (sizes.container.w) root.style.setProperty('--pill-container-w', sizes.container.w);
        if (sizes.container.h) root.style.setProperty('--pill-container-h', sizes.container.h);
        if (sizes.container.c) root.style.setProperty('--pill-container-c', sizes.container.c);
    }
}

const device = document.getElementById('portfolio-device');
const topBar = document.getElementById('top-bar');
const topBarArt = document.getElementById('top-bar-art');
const githubChartImg = document.getElementById('github-chart-img');
const secondsDot = document.getElementById('seconds-dot');
const expandBtn = document.getElementById('expand-btn');
const leftControlsEl = document.querySelector('.left-controls');
const orbCursorHandle = document.getElementById('orb-cursor-handle');
const orbRailTimeEl = document.getElementById('orb-rail-time');
const matrixToggleBtn = document.getElementById('matrix-toggle-btn');
const matrixToggleHint = document.getElementById('matrix-toggle-hint');
const orbResumeBtn = document.getElementById('orb-resume-btn');
const caseWindowEl = document.getElementById('case-window');
const stickyNoteEl = document.getElementById('sticky-note');
const pillNotesBtn = document.getElementById('pill-notes-btn');
const pillResumeBtn = document.getElementById('pill-resume-btn');
const pillThirdBtn = document.getElementById('pill-third-btn');
const resumePopoutEl = document.getElementById('resume-popout');
const workTogetherWrapEl = document.getElementById('work-together-wrap');
const workTogetherBtn = document.getElementById('work-together-btn');
const workAssistantPanelEl = document.getElementById('work-assistant-panel');
const workAssistantCloseBtn = document.getElementById('work-assistant-close');
const workAssistantVideoEl = document.getElementById('work-assistant-video');
const readerInlineEl = document.getElementById('reader-inline');
const showIdBtn = document.getElementById('show-id-btn');
const idCardDock = document.getElementById('id-card-dock');
const scrollableContentEl = document.getElementById('scrollable-content');

function initExpandButtonAnchor() {
    if (!device || !leftControlsEl) {
        return {
            update: () => { },
            schedule: () => { }
        };
    }

    // Anchor tuning:
    // yPercent controls vertical lock point along the mini site.
    // gapPercent controls distance from the mini site's left edge.
    const anchor = {
        yPercent: 50,
        gapPercent: 6,
        minGapPx: 12,
        maxGapPx: 34
    };

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const transitionProbeDelays = [32, 130, 260, 420, 700, 920];

    const update = () => {
        const deviceRect = device.getBoundingClientRect();
        const controlRect = leftControlsEl.getBoundingClientRect();
        if (!controlRect.width || !controlRect.height) return;

        const dynamicGap = clamp(
            (deviceRect.width * anchor.gapPercent) / 100,
            anchor.minGapPx,
            anchor.maxGapPx
        );

        const targetLeft = Math.max(8, deviceRect.left - controlRect.width - dynamicGap);
        const targetTop = clamp(
            deviceRect.top + (deviceRect.height * anchor.yPercent / 100) - (controlRect.height / 2),
            8,
            window.innerHeight - controlRect.height - 8
        );

        leftControlsEl.style.left = `${targetLeft}px`;
        leftControlsEl.style.top = `${targetTop}px`;
    };

    const schedule = () => {
        update();
        transitionProbeDelays.forEach((delay) => {
            window.setTimeout(update, delay);
        });
    };

    const bodyClassObserver = new MutationObserver(() => {
        schedule();
    });
    bodyClassObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    if (typeof ResizeObserver !== 'undefined') {
        const resizeObserver = new ResizeObserver(() => {
            update();
        });
        resizeObserver.observe(device);
    }

    window.addEventListener('resize', schedule);
    window.addEventListener('orientationchange', schedule);

    update();

    return { update, schedule };
}

function initLeftOrbControls() {
    const noop = {
        refreshTime: () => { },
        updateScrollPosition: () => { }
    };
    if (!leftControlsEl || !orbCursorHandle) return noop;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const maxTravelPx = 88;
    let scrollTarget = 0;
    let scrollCurrent = 0;
    let rafId = 0;
    let timeIntervalId = 0;

    const resolveScrollable = () => {
        if (scrollableContentEl && scrollableContentEl.scrollHeight > scrollableContentEl.clientHeight + 2) {
            return scrollableContentEl;
        }
        return document.scrollingElement || document.documentElement;
    };

    const readScrollProgress = () => {
        const scroller = resolveScrollable();
        if (!scroller) return 0;
        const maxScroll = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
        if (!maxScroll) return 0;
        const raw = scroller.scrollTop / maxScroll;
        return clamp(raw, 0, 1);
    };

    const updateScrollPosition = () => {
        scrollTarget = readScrollProgress();
    };

    const render = () => {
        scrollCurrent += (scrollTarget - scrollCurrent) * 0.18;
        const centered = (scrollCurrent * 2) - 1;
        const yOffset = centered * maxTravelPx;
        leftControlsEl.style.setProperty('--orb-scroll-offset-y', `${yOffset.toFixed(2)}px`);
        rafId = window.requestAnimationFrame(render);
    };

    const refreshTime = () => {
        if (!orbRailTimeEl) return;
        const now = new Date();
        orbRailTimeEl.textContent = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const onScroll = () => updateScrollPosition();
    scrollableContentEl?.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('orientationchange', onScroll);

    refreshTime();
    timeIntervalId = window.setInterval(refreshTime, 30000);
    updateScrollPosition();
    rafId = window.requestAnimationFrame(render);

    return {
        refreshTime,
        updateScrollPosition,
        destroy: () => {
            window.cancelAnimationFrame(rafId);
            if (timeIntervalId) window.clearInterval(timeIntervalId);
            scrollableContentEl?.removeEventListener('scroll', onScroll);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            window.removeEventListener('orientationchange', onScroll);
        }
    };
}

function initIdCardSystem() {
    if (!device || !idCardDock) {
        return {
            showPeek: () => { },
            openCard: () => { },
            closeToPeek: () => { },
            hide: () => { },
            isOpen: () => false,
            isVisible: () => false,
            isInside: () => false,
            updateAnchor: () => { }
        };
    }

    const idCardWrap = idCardDock.closest('.id-card-wrap');
    if (idCardWrap && idCardWrap.parentElement !== document.body) {
        document.body.appendChild(idCardWrap);
    }

    const readCssNumberVar = (name, fallback) => {
        const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        const parsed = Number.parseFloat(raw);
        return Number.isFinite(parsed) ? parsed : fallback;
    };

    const getPeekAutoHideMs = () => Math.max(0, readCssNumberVar('--id-peek-autohide-ms', 6000));
    const getOpenHoverTiltDeg = () => Math.max(0, readCssNumberVar('--id-open-hover-tilt-deg', 7));
    const getOpenHoverDriftPx = () => Math.max(0, readCssNumberVar('--id-open-hover-drift-px', 14));
    const getOpenHoverCenterX = () => readCssNumberVar('--id-open-hover-center-x', 0.5);
    const getOpenHoverCenterY = () => readCssNumberVar('--id-open-hover-center-y', 0.5);

    const state = {
        visible: false,
        open: false
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsHoverMotion = !window.matchMedia('(pointer: coarse)').matches && !prefersReducedMotion;

    let peekHideTimer = 0;

    const clearPeekHideTimer = () => {
        if (!peekHideTimer) return;
        window.clearTimeout(peekHideTimer);
        peekHideTimer = 0;
    };

    const resetOpenHoverMotion = () => {
        idCardDock.style.setProperty('--id-open-drift-x', '0px');
        idCardDock.style.setProperty('--id-open-drift-y', '0px');
        idCardDock.style.setProperty('--id-open-tilt-x', '0deg');
        idCardDock.style.setProperty('--id-open-tilt-y', '0deg');
    };

    const applyOpenHoverMotion = (event) => {
        if (!state.open || !supportsHoverMotion) return;
        if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;

        const rect = idCardDock.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const centerX = Math.max(0.2, Math.min(0.8, getOpenHoverCenterX()));
        const centerY = Math.max(0.2, Math.min(0.8, getOpenHoverCenterY()));

        const nxRaw = px >= centerX
            ? (px - centerX) / Math.max(1 - centerX, 0.001)
            : (px - centerX) / Math.max(centerX, 0.001);
        const nyRaw = py >= centerY
            ? (py - centerY) / Math.max(1 - centerY, 0.001)
            : (py - centerY) / Math.max(centerY, 0.001);

        const nx = Math.max(-1, Math.min(1, nxRaw));
        const ny = Math.max(-1, Math.min(1, nyRaw));

        const maxTiltDeg = getOpenHoverTiltDeg();
        const maxDriftPx = getOpenHoverDriftPx();

        const tiltX = -ny * maxTiltDeg;
        const tiltY = nx * maxTiltDeg;
        const driftX = nx * maxDriftPx;
        const driftY = ny * maxDriftPx;

        idCardDock.style.setProperty('--id-open-drift-x', `${driftX.toFixed(2)}px`);
        idCardDock.style.setProperty('--id-open-drift-y', `${driftY.toFixed(2)}px`);
        idCardDock.style.setProperty('--id-open-tilt-x', `${tiltX.toFixed(2)}deg`);
        idCardDock.style.setProperty('--id-open-tilt-y', `${tiltY.toFixed(2)}deg`);
    };

    const updateAnchor = () => {
        const rect = device.getBoundingClientRect();
        const anchorOffsetX = readCssNumberVar('--id-anchor-offset-x', 6);
        const anchorYRatio = readCssNumberVar('--id-anchor-y-ratio', 0.52);
        const openAnchorXRatio = readCssNumberVar('--id-open-anchor-x-ratio', 0.5);
        const openAnchorYRatio = readCssNumberVar('--id-open-anchor-y-ratio', 0.5);

        if (state.open) {
            idCardDock.style.left = `${rect.left + (rect.width * openAnchorXRatio)}px`;
            idCardDock.style.top = `${rect.top + (rect.height * openAnchorYRatio)}px`;
            return;
        }

        idCardDock.style.left = `${rect.right + anchorOffsetX}px`;
        idCardDock.style.top = `${rect.top + (rect.height * anchorYRatio)}px`;
    };

    const hide = () => {
        state.visible = false;
        state.open = false;
        clearPeekHideTimer();
        resetOpenHoverMotion();
        idCardWrap?.classList.remove('is-open-layer');
        idCardDock.classList.remove('visible', 'is-open');
        idCardDock.setAttribute('aria-expanded', 'false');
    };

    const schedulePeekAutoHide = () => {
        clearPeekHideTimer();
        if (!state.visible || state.open) return;
        const hideDelay = getPeekAutoHideMs();
        if (hideDelay <= 0) return;

        peekHideTimer = window.setTimeout(() => {
            if (!state.visible || state.open) return;
            hide();
        }, hideDelay);
    };

    const showPeek = () => {
        state.visible = true;
        state.open = false;
        resetOpenHoverMotion();
        idCardWrap?.classList.remove('is-open-layer');
        idCardDock.classList.add('visible');
        idCardDock.classList.remove('is-open');
        idCardDock.setAttribute('aria-expanded', 'false');
        updateAnchor();
        schedulePeekAutoHide();
    };

    const openCard = () => {
        if (!state.visible) showPeek();
        state.open = true;
        clearPeekHideTimer();
        resetOpenHoverMotion();
        idCardWrap?.classList.add('is-open-layer');
        idCardDock.classList.add('is-open');
        idCardDock.setAttribute('aria-expanded', 'true');
        updateAnchor();
    };

    const closeToPeek = () => {
        if (!state.visible) return;
        state.open = false;
        resetOpenHoverMotion();
        idCardWrap?.classList.remove('is-open-layer');
        idCardDock.classList.remove('is-open');
        idCardDock.setAttribute('aria-expanded', 'false');
        updateAnchor();
        schedulePeekAutoHide();
    };

    idCardDock.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (state.open) {
            closeToPeek();
        } else {
            openCard();
        }
    });
    idCardDock.addEventListener('pointermove', applyOpenHoverMotion, { passive: true });
    idCardDock.addEventListener('pointerleave', resetOpenHoverMotion);
    idCardDock.addEventListener('pointercancel', resetOpenHoverMotion);

    window.addEventListener('resize', updateAnchor);
    window.addEventListener('orientationchange', updateAnchor);
    window.addEventListener('scroll', () => {
        if (!state.visible) return;
        if (state.open) closeToPeek();
        updateAnchor();
    }, { passive: true });
    window.addEventListener('wheel', (event) => {
        if (!state.open) return;
        if (event.target instanceof Node && idCardDock.contains(event.target)) return;
        closeToPeek();
    }, { passive: true });

    const observer = new MutationObserver(() => {
        const expanded = device.classList.contains('expanded');
        if (!expanded) {
            hide();
            return;
        }
        if (state.visible) updateAnchor();
    });
    observer.observe(device, { attributes: true, attributeFilter: ['class'] });

    updateAnchor();

    return {
        showPeek,
        openCard,
        closeToPeek,
        hide,
        isOpen: () => state.visible && state.open,
        isVisible: () => state.visible,
        isInside: (target) => Boolean(target instanceof Node && idCardDock.contains(target)),
        updateAnchor
    };
}
function initCustomCursor() {
    const cursorEl = document.getElementById('custom-cursor');
    if (!cursorEl) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const state = {
        x: -100,
        y: -100,
        tx: -100,
        ty: -100
    };

    function tick() {
        state.x += (state.tx - state.x) * 0.35;
        state.y += (state.ty - state.y) * 0.35;
        cursorEl.style.transform = `translate3d(${(state.x - 4).toFixed(2)}px, ${(state.y - 4).toFixed(2)}px, 0)`;
        requestAnimationFrame(tick);
    }

    document.addEventListener('mousemove', (e) => {
        state.tx = e.clientX;
        state.ty = e.clientY;
        cursorEl.style.opacity = '1';
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        cursorEl.style.opacity = '0';
    });

    window.addEventListener('blur', () => {
        cursorEl.style.opacity = '0';
    });

    window.addEventListener('focus', () => {
        cursorEl.style.opacity = '1';
    });

    document.addEventListener('mousedown', () => {
        cursorEl.classList.add('is-down');
    });

    document.addEventListener('mouseup', () => {
        cursorEl.classList.remove('is-down');
    });

    requestAnimationFrame(tick);
}

function initCursorSystem() {
    if (!document.body) return;

    document.body.classList.add('cursor-system');

    const cssVarByRole = {
        default: '--cursor-default',
        text: '--cursor-text',
        link: '--cursor-link',
        grab: '--cursor-grab',
        grabbing: '--cursor-grabbing'
    };

    const normalizeTargets = (targetOrSelector) => {
        if (!targetOrSelector) return [];
        if (typeof targetOrSelector === 'string') {
            return Array.from(document.querySelectorAll(targetOrSelector));
        }
        if (targetOrSelector instanceof Element) {
            return [targetOrSelector];
        }
        if (targetOrSelector instanceof NodeList || Array.isArray(targetOrSelector)) {
            return Array.from(targetOrSelector).filter((item) => item instanceof Element);
        }
        return [];
    };

    const isValidRole = (role) => Object.prototype.hasOwnProperty.call(cssVarByRole, role);

    window.CursorControl = {
        setRole(targetOrSelector, role) {
            if (!isValidRole(role)) return false;
            const targets = normalizeTargets(targetOrSelector);
            targets.forEach((el) => el.setAttribute('data-cursor', role));
            return targets.length > 0;
        },
        clearRole(targetOrSelector) {
            const targets = normalizeTargets(targetOrSelector);
            targets.forEach((el) => el.removeAttribute('data-cursor'));
            return targets.length > 0;
        },
        setCursorAsset(role, imagePath, hotspotX = 0, hotspotY = 0, fallback = 'auto') {
            if (!isValidRole(role) || !imagePath) return false;
            const cssValue = `url('${imagePath}') ${hotspotX} ${hotspotY}, ${fallback}`;
            document.documentElement.style.setProperty(cssVarByRole[role], cssValue);
            return true;
        },
        getRoles() {
            return Object.keys(cssVarByRole);
        }
    };
}
// Reusable Scramble and Reveal Logic
function scrambleText(element, targetText, delay = 1000) {
    if (!element) return;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let isRevealing = false;
    let revealIndex = 0;

    // Phase 1: Scramble for the specified delay
    const scrambleInterval = setInterval(() => {
        if (!isRevealing) {
            let scrambled = "";
            for (let i = 0; i < targetText.length; i++) {
                scrambled += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            element.textContent = scrambled;
        }
    }, 50);

    // Phase 2: Start reveal after delay
    setTimeout(() => {
        isRevealing = true;
        clearInterval(scrambleInterval);

        const revealInterval = setInterval(() => {
            if (revealIndex <= targetText.length) {
                let currentDisplay = targetText.substring(0, revealIndex);
                // Fill the rest with scrambled chars
                for (let i = revealIndex; i < targetText.length; i++) {
                    currentDisplay += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                element.textContent = currentDisplay;
                revealIndex++;
            } else {
                element.textContent = targetText;
                clearInterval(revealInterval);
            }
        }, 80); // Reveal speed
    }, delay);
}

// Global cursor position
const cursorPos = { x: -9999, y: -9999 };
window.addEventListener('mousemove', (e) => {
    cursorPos.x = e.clientX;
    cursorPos.y = e.clientY;
});

class MatrixRain {
    constructor(canvasId, chars, baseColor, fontSize, speed, parentElement, baseOpacity, cursor, direction, density = 1, lengthMultiplier = 1) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.chars = chars;
        this.baseColor = baseColor;
        this.fontSize = fontSize;
        this.speed = speed;
        this.parent = parentElement;
        this.baseOpacity = baseOpacity || 0.15;
        this.cursor = cursor || null;
        this.direction = direction || 'down';
        this.density = Math.max(0.25, density || 1);
        this.lengthMultiplier = Math.max(0.5, lengthMultiplier || 1);
        this.isPaused = false;

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.lastTime = 0;
        this.fps = 20;
        this.interval = 1000 / this.fps;

        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    resize() {
        let w, h;
        if (this.parent === window) {
            w = window.innerWidth;
            h = window.innerHeight;
        } else {
            const rect = this.parent.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
        }
        this.width = w;
        this.height = h;

        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = w * dpr;
        this.canvas.height = h * dpr;
        this.ctx.scale(dpr, dpr);

        const colCount = Math.max(1, Math.floor((w / this.fontSize) * this.density) + 1);
        const colSpacing = colCount > 1 ? w / (colCount - 1) : this.fontSize;
        this.columns = [];
        for (let i = 0; i < colCount; i++) {
            const length = this._randomLength();
            const startY = this.direction === 'up'
                ? this.height + Math.random() * this.height
                : Math.random() * -this.height * 2;

            this.columns.push({
                x: i * colSpacing,
                y: startY,
                chars: [],
                speed: this.speed * (0.8 + Math.random() * 0.6),
                length: length
            });
            const maxRows = Math.floor(h / this.fontSize) + length + 20;
            for (let j = 0; j < maxRows; j++) {
                this.columns[i].chars.push(this.chars[Math.floor(Math.random() * this.chars.length)]);
            }
        }
    }

    _lerp(a, b, t) { return Math.round(a + (b - a) * t); }
    _parseRGB(str) { return str.split(',').map(Number); }

    _randomLength() {
        const minLen = Math.max(6, Math.floor(10 * this.lengthMultiplier));
        const maxLen = Math.max(minLen + 1, Math.floor(30 * this.lengthMultiplier));
        return Math.floor(minLen + Math.random() * (maxLen - minLen));
    }

    setPaused(paused) {
        this.isPaused = Boolean(paused);
    }

    animate(time) {
        requestAnimationFrame(this.animate);
        const deltaTime = time - this.lastTime;
        if (deltaTime < this.interval) return;
        this.lastTime = time - (deltaTime % this.interval);

        if (this.isPaused) return;

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.font = `${this.fontSize}px monospace`;
        this.ctx.textAlign = 'center';

        let canvasRect = null;
        if (this.cursor) canvasRect = this.canvas.getBoundingClientRect();

        const baseRGB = this._parseRGB(this.baseColor);
        const curRGB = this.cursor ? this._parseRGB(this.cursor.color) : null;

        for (let col of this.columns) {
            if (this.direction === 'up') {
                col.y -= col.speed * this.fontSize;
                if (col.y + col.length * this.fontSize < 0 && Math.random() > 0.95) {
                    col.y = this.height + this.fontSize;
                    col.speed = this.speed * (0.8 + Math.random() * 0.6);
                    col.length = this._randomLength();
                }
            } else {
                col.y += col.speed * this.fontSize;
                if (col.y - col.length * this.fontSize > this.height && Math.random() > 0.95) {
                    col.y = -this.fontSize;
                    col.speed = this.speed * (0.8 + Math.random() * 0.6);
                    col.length = this._randomLength();
                }
            }

            if (Math.random() > 0.8) {
                const randIndex = Math.floor(Math.random() * col.chars.length);
                col.chars[randIndex] = this.chars[Math.floor(Math.random() * this.chars.length)];
            }

            let t = 0;
            if (this.cursor && canvasRect) {
                const scaleX = this.width / canvasRect.width;
                const scaleY = this.height / canvasRect.height;
                const colScreenX = canvasRect.left + col.x / scaleX + this.fontSize / 2;
                const colScreenY = canvasRect.top + col.y / scaleY;
                const dx = cursorPos.x - colScreenX;
                const dy = cursorPos.y - colScreenY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                t = Math.max(0, 1 - dist / this.cursor.radius);
                t = t * t;
            }

            const r = curRGB ? this._lerp(baseRGB[0], curRGB[0], t) : baseRGB[0];
            const g = curRGB ? this._lerp(baseRGB[1], curRGB[1], t) : baseRGB[1];
            const b = curRGB ? this._lerp(baseRGB[2], curRGB[2], t) : baseRGB[2];
            const peakOpacity = this.cursor
                ? this.baseOpacity + (this.cursor.opacity - this.baseOpacity) * t
                : this.baseOpacity;

            const startRow = Math.floor(col.y / this.fontSize);
            for (let i = 0; i < col.length; i++) {
                const row = startRow - i;
                if (row < 0 || row * this.fontSize > this.height) continue;

                const opacity = (1 - (i / col.length)) * peakOpacity;
                const charIndex = Math.abs(row) % col.chars.length;
                const char = col.chars[charIndex];

                this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity.toFixed(3)})`;
                this.ctx.fillText(char, col.x + this.fontSize / 2, row * this.fontSize);
            }
        }
    }
}

let miniMatrixInstance = null;
let backgroundMatrixInstance = null;
let matrixPaused = false;

function applyMatrixPausedState() {
    document.body.classList.toggle('matrix-paused', matrixPaused);
    if (backgroundMatrixInstance) {
        backgroundMatrixInstance.setPaused(matrixPaused);
    }

    if (matrixToggleBtn) {
        matrixToggleBtn.classList.toggle('is-paused', matrixPaused);
        matrixToggleBtn.setAttribute('aria-label', matrixPaused ? 'Play matrix animation' : 'Pause matrix animation');
        matrixToggleBtn.setAttribute('title', matrixPaused ? 'Play matrix animation' : 'Pause matrix animation');
    }

    if (matrixToggleHint) {
        matrixToggleHint.textContent = matrixPaused ? 'Play matrix' : 'Pause matrix';
    }
}

function setMatrixPaused(paused) {
    matrixPaused = Boolean(paused);
    applyMatrixPausedState();
}

function toggleMatrixPaused() {
    setMatrixPaused(!matrixPaused);
    return matrixPaused;
}

function initBackgrounds() {
    const cfg = SITE_CONFIG.asciiRain;
    backgroundMatrixInstance = new MatrixRain(
        'canvas-bg',
        cfg.chars,
        cfg.baseColor,
        cfg.fontSize,
        cfg.speed,
        window,
        cfg.baseOpacity,
        { color: cfg.cursorColor, opacity: cfg.cursorOpacity, radius: cfg.cursorRadius },
        cfg.direction,
        cfg.density,
        cfg.lengthMultiplier
    );
    if (backgroundMatrixInstance) {
        backgroundMatrixInstance.setPaused(matrixPaused);
    }
    applyMatrixPausedState();
    miniMatrixInstance = null;
}

// --------------------------------------------------------
// COMPANY DOCK DATA RENDER
// --------------------------------------------------------
function buildCompanyDock() {
    const dock = document.getElementById('company-dock');
    if (!dock) return;
    dock.innerHTML = '';

    SITE_CONFIG.companies.forEach((company, index) => {
        const item = document.createElement('div');
        item.className = 'dock-item';
        item.setAttribute('aria-label', company.name || `Company ${index + 1}`);

        const tooltip = document.createElement('span');
        tooltip.className = 'dock-tooltip';
        tooltip.textContent = company.name || `Company ${index + 1}`;

        const logoWrap = document.createElement('span');
        logoWrap.className = 'dock-logo';

        if (company.logo) {
            const logo = document.createElement('img');
            logo.className = 'dock-logo-img';
            logo.src = company.logo;
            logo.alt = company.name || `Company ${index + 1}`;
            logo.onerror = () => {
                logo.remove();
                logoWrap.textContent = `C${index + 1}`;
            };
            logoWrap.appendChild(logo);
        } else {
            logoWrap.textContent = `C${index + 1}`;
        }

        item.appendChild(tooltip);
        item.appendChild(logoWrap);

        if (company.name === 'AIR CARDS') {
            const dot = document.createElement('div');
            dot.className = 'aircards-dot';
            item.appendChild(dot);
        }

        dock.appendChild(item);
    });
}

function initCompanyDock() {
    const dock = document.getElementById('company-dock');
    if (!dock) return;
    const items = Array.from(dock.querySelectorAll('.dock-item'));
    if (!items.length) return;

    const maxDistanceX = SITE_CONFIG.dock.maxDistance;
    const maxDistanceY = SITE_CONFIG.dock.maxDistanceY || SITE_CONFIG.dock.maxDistance;
    const maxScaleBoost = SITE_CONFIG.dock.maxScaleBoost;
    const maxLift = SITE_CONFIG.dock.maxLift;
    const smoothFactor = SITE_CONFIG.dock.smoothFactor || 0.2;
    const minDelta = 0.0008;

    const pointer = { x: 0, y: 0, active: false };
    let rafId = null;
    const state = items.map(() => ({ scale: 1, lift: 0 }));

    function getTargets(item) {
        if (!pointer.active) return { scale: 1, lift: 0 };
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width * 0.5;
        const centerY = rect.top + rect.height * 0.5;
        const dx = Math.abs(pointer.x - centerX);
        const dy = Math.abs(pointer.y - centerY);
        const tx = Math.max(0, 1 - (dx / maxDistanceX));
        const ty = Math.max(0, 1 - (dy / maxDistanceY));
        const t = tx * ty;
        const eased = t * t;
        return {
            scale: 1 + (eased * maxScaleBoost),
            lift: -(eased * maxLift)
        };
    }

    function animateDock() {
        let hasMotion = false;
        items.forEach((item, index) => {
            const target = getTargets(item);
            const nextScale = state[index].scale + ((target.scale - state[index].scale) * smoothFactor);
            const nextLift = state[index].lift + ((target.lift - state[index].lift) * smoothFactor);
            state[index].scale = nextScale;
            state[index].lift = nextLift;
            item.style.setProperty('--scale', nextScale.toFixed(3));
            item.style.setProperty('--lift', `${nextLift.toFixed(2)}px`);

            if (
                Math.abs(target.scale - nextScale) > minDelta ||
                Math.abs(target.lift - nextLift) > minDelta
            ) {
                hasMotion = true;
            }
        });

        if (hasMotion || pointer.active) {
            rafId = window.requestAnimationFrame(animateDock);
        } else {
            rafId = null;
        }
    }

    function queueDockFrame() {
        if (rafId !== null) return;
        rafId = window.requestAnimationFrame(animateDock);
    }

    dock.addEventListener('mouseenter', (e) => {
        pointer.active = true;
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        queueDockFrame();
    });
    dock.addEventListener('mousemove', (e) => {
        pointer.active = true;
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        queueDockFrame();
    });

    dock.addEventListener('mouseleave', () => {
        pointer.active = false;
        queueDockFrame();
    });
    window.addEventListener('blur', () => {
        pointer.active = false;
        queueDockFrame();
    });
    queueDockFrame();
}

// --------------------------------------------------------
// PIXEL DRAW CANVAS
// --------------------------------------------------------
const pixelCanvas = document.getElementById('pixel-canvas');
const pixelCtx = pixelCanvas ? pixelCanvas.getContext('2d') : null;
const paletteRoot = document.getElementById('pixel-palette');
let drawing = false;
let activeColor = SITE_CONFIG.pixel.palette[0];
let pixelCursorPreview = null;

function ensurePixelCursorPreview() {
    if (!pixelCanvas) return null;
    if (pixelCursorPreview) return pixelCursorPreview;

    const wrap = pixelCanvas.closest('.pixel-canvas-wrap');
    if (!wrap) return null;

    pixelCursorPreview = document.createElement('div');
    pixelCursorPreview.className = 'pixel-cursor-preview';
    wrap.appendChild(pixelCursorPreview);
    return pixelCursorPreview;
}

function hidePixelCursorPreview() {
    if (pixelCursorPreview) {
        pixelCursorPreview.style.opacity = '0';
        pixelCursorPreview.style.width = '0';
        pixelCursorPreview.style.height = '0';
    }
    document.body.classList.remove('pixel-draw-cursor-active');
}

function getPointerClientXY(event) {
    if (event.touches && event.touches[0]) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    if (event.changedTouches && event.changedTouches[0]) {
        return { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
    }
    if (typeof event.clientX === 'number' && typeof event.clientY === 'number') {
        return { x: event.clientX, y: event.clientY };
    }
    return null;
}

function getPixelSnapFromEvent(event) {
    if (!pixelCanvas || !pixelCtx) return null;

    const rect = pixelCanvas.getBoundingClientRect();
    const pointer = getPointerClientXY(event);
    if (!pointer) return null;

    const cssX = pointer.x - rect.left;
    const cssY = pointer.y - rect.top;
    const scaleX = pixelCanvas.width / rect.width;
    const scaleY = pixelCanvas.height / rect.height;
    const rawX = cssX * scaleX;
    const rawY = cssY * scaleY;
    const snapX = Math.floor(rawX / SITE_CONFIG.pixel.pixelSize) * SITE_CONFIG.pixel.pixelSize;
    const snapY = Math.floor(rawY / SITE_CONFIG.pixel.pixelSize) * SITE_CONFIG.pixel.pixelSize;

    const outside = snapX < 0 || snapY < 0 || snapX >= pixelCanvas.width || snapY >= pixelCanvas.height;

    return {
        outside,
        snapX,
        snapY,
        scaleX,
        scaleY
    };
}

function updatePixelCursorPreview(event) {
    if (!pixelCanvas || window.matchMedia('(pointer: coarse)').matches) return;

    const preview = ensurePixelCursorPreview();
    if (!preview) return;

    const snap = getPixelSnapFromEvent(event);
    if (!snap || snap.outside) {
        hidePixelCursorPreview();
        return;
    }

    const brushCssW = SITE_CONFIG.pixel.pixelSize / snap.scaleX;
    const brushCssH = SITE_CONFIG.pixel.pixelSize / snap.scaleY;

    preview.style.width = `${brushCssW}px`;
    preview.style.height = `${brushCssH}px`;
    preview.style.left = `${snap.snapX / snap.scaleX}px`;
    preview.style.top = `${snap.snapY / snap.scaleY}px`;
    preview.style.background = activeColor;
    preview.style.opacity = '1';

    pixelCanvas.style.setProperty('cursor', 'none', 'important');
    document.body.classList.add('pixel-draw-cursor-active');
}

function buildPalette() {
    if (!paletteRoot) return;
    SITE_CONFIG.pixel.palette.forEach((color, index) => {
        const swatch = document.createElement('button');
        swatch.className = 'swatch' + (index === 0 ? ' active' : '');
        swatch.style.background = color;
        swatch.type = 'button';
        swatch.setAttribute('aria-label', `Select color ${index + 1}`);
        swatch.addEventListener('click', () => {
            activeColor = color;
            document.querySelectorAll('.swatch').forEach((s) => s.classList.remove('active'));
            swatch.classList.add('active');
            if (pixelCursorPreview) {
                pixelCursorPreview.style.background = activeColor;
            }
        });
        paletteRoot.appendChild(swatch);
    });

    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear-pixel';
    clearBtn.type = 'button';
    clearBtn.textContent = 'Clear';
    clearBtn.addEventListener('click', clearPixelCanvas);
    paletteRoot.appendChild(clearBtn);
}

function clearPixelCanvas() {
    if (!pixelCtx || !pixelCanvas) return;
    pixelCtx.fillStyle = SITE_CONFIG.pixel.background;
    pixelCtx.fillRect(0, 0, pixelCanvas.width, pixelCanvas.height);
}

function paintFromEvent(event) {
    if (!pixelCanvas || !pixelCtx) return;

    const snap = getPixelSnapFromEvent(event);
    if (!snap || snap.outside) return;

    pixelCtx.fillStyle = activeColor;
    pixelCtx.fillRect(
        snap.snapX,
        snap.snapY,
        SITE_CONFIG.pixel.pixelSize,
        SITE_CONFIG.pixel.pixelSize
    );
}

if (pixelCanvas) {
    pixelCanvas.addEventListener('mouseenter', (event) => {
        updatePixelCursorPreview(event);
    });

    pixelCanvas.addEventListener('mouseleave', () => {
        hidePixelCursorPreview();
    });

    pixelCanvas.addEventListener('mousedown', (event) => {
        drawing = true;
        updatePixelCursorPreview(event);
        paintFromEvent(event);
    });

    window.addEventListener('mouseup', () => {
        drawing = false;
    });

    pixelCanvas.addEventListener('mousemove', (event) => {
        updatePixelCursorPreview(event);
        if (!drawing) return;
        paintFromEvent(event);
    });

    pixelCanvas.addEventListener('touchstart', (event) => {
        drawing = true;
        paintFromEvent(event);
        event.preventDefault();
    }, { passive: false });

    pixelCanvas.addEventListener('touchmove', (event) => {
        if (!drawing) return;
        paintFromEvent(event);
        event.preventDefault();
    }, { passive: false });

    window.addEventListener('touchend', () => {
        drawing = false;
        hidePixelCursorPreview();
    });

    window.addEventListener('blur', () => {
        drawing = false;
        hidePixelCursorPreview();
    });
}

function initIndexGrid() {
    const grid = document.getElementById('index-grid');
    if (!grid) return;

    const colors = [
        '#FF3BB3', '#5C2DFF', '#00D1FF', '#00FF4E', '#FFFB1F',
        '#FF7A00', '#FF0000', '#0000FF', '#00FF00', '#FF00FF',
        '#EEEEEE', '#111111', '#DDDDDD', '#222222', '#CCCCCC'
    ];

    const count = 120;
    for (let i = 0; i < count; i++) {
        const square = document.createElement('div');
        square.className = 'index-grid-square';
        square.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        grid.appendChild(square);
    }
}

// --------------------------------------------------------
// HOVER ANIMATIONS
// --------------------------------------------------------

function initFeaturedCardHoverMotion() {
    const cards = document.querySelectorAll('.featured-card');
    if (!cards.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || coarsePointer) return;

    const MAX_TILT_DEG = 20;
    const MAX_SHIFT_PX = 20;

    cards.forEach((card) => {
        const resetMotion = () => {
            card.style.setProperty('--card-tilt-x', '0deg');
            card.style.setProperty('--card-tilt-y', '0deg');
            card.style.setProperty('--card-shift-x', '0px');
            card.style.setProperty('--card-shift-y', '0px');
        };

        card.addEventListener('pointermove', (event) => {
            if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;

            const rect = card.getBoundingClientRect();
            if (!rect.width || !rect.height) return;

            const px = (event.clientX - rect.left) / rect.width;
            const py = (event.clientY - rect.top) / rect.height;
            const nx = Math.max(-1, Math.min(1, (px - 0.5) * 2));
            const ny = Math.max(-1, Math.min(1, (py - 0.5) * 2));

            const tiltX = -ny * MAX_TILT_DEG;
            const tiltY = nx * MAX_TILT_DEG;
            const shiftX = nx * MAX_SHIFT_PX;
            const shiftY = ny * MAX_SHIFT_PX;

            card.style.setProperty('--card-tilt-x', `${tiltX.toFixed(2)}deg`);
            card.style.setProperty('--card-tilt-y', `${tiltY.toFixed(2)}deg`);
            card.style.setProperty('--card-shift-x', `${shiftX.toFixed(2)}px`);
            card.style.setProperty('--card-shift-y', `${shiftY.toFixed(2)}px`);
        }, { passive: true });

        card.addEventListener('pointerleave', resetMotion);
        card.addEventListener('pointercancel', resetMotion);
        card.addEventListener('lostpointercapture', resetMotion);

        resetMotion();
    });
}
function initHeroLanguageLoop() {
    const lineEl = document.getElementById('hero-language-line');
    if (!lineEl) return;

    const languages = [
        'ராகவ்',
        'รากาฟ',
        '拉贾夫',
        'राघव',
        '라 가브'

    ];

    const intervalMs = 3000;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let languageIndex = 0;
    let isTransitioning = false;

    const tokenizeWords = (text) => {
        const words = text.trim().split(/\s+/).filter(Boolean);
        return words.length ? words : [text];
    };

    const renderWords = (text) => {
        lineEl.textContent = '';
        const words = tokenizeWords(text);
        const spans = [];

        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'hero-language-word';
            span.textContent = word;
            lineEl.appendChild(span);
            spans.push(span);

            if (index < words.length - 1) {
                lineEl.appendChild(document.createTextNode(' '));
            }
        });

        return spans;
    };

    const animateIn = (spans) => {
        if (!spans.length) return;

        if (typeof gsap !== 'undefined') {
            gsap.killTweensOf(spans);
            gsap.fromTo(spans,
                { y: 12, opacity: 0, filter: 'blur(2px)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.45,
                    stagger: 0.08,
                    ease: 'power3.out'
                }
            );
            return;
        }

        spans.forEach((span, index) => {
            span.style.opacity = '0';
            span.style.transform = 'translateY(12px)';
            span.style.filter = 'blur(2px)';
            span.style.transition = 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease, filter 320ms ease';
            window.setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
                span.style.filter = 'blur(0px)';
            }, index * 80);
        });
    };

    const animateOut = (spans, onComplete) => {
        if (!spans.length) {
            onComplete();
            return;
        }

        if (typeof gsap !== 'undefined') {
            gsap.killTweensOf(spans);
            gsap.to(spans, {
                y: -10,
                opacity: 0,
                filter: 'blur(2px)',
                duration: 0.22,
                stagger: 0.05,
                ease: 'power2.in',
                onComplete
            });
            return;
        }

        spans.forEach((span, index) => {
            span.style.transition = 'transform 220ms ease, opacity 220ms ease, filter 220ms ease';
            window.setTimeout(() => {
                span.style.opacity = '0';
                span.style.transform = 'translateY(-10px)';
                span.style.filter = 'blur(2px)';
            }, index * 50);
        });

        window.setTimeout(onComplete, 240 + Math.max(0, spans.length - 1) * 50);
    };

    const setLanguage = (index) => {
        const spans = renderWords(languages[index]);
        if (!prefersReducedMotion) {
            animateIn(spans);
        }
    };

    setLanguage(languageIndex);

    window.setInterval(() => {
        if (isTransitioning) return;

        if (prefersReducedMotion) {
            languageIndex = (languageIndex + 1) % languages.length;
            setLanguage(languageIndex);
            return;
        }

        isTransitioning = true;
        const currentSpans = Array.from(lineEl.querySelectorAll('.hero-language-word'));

        animateOut(currentSpans, () => {
            languageIndex = (languageIndex + 1) % languages.length;
            setLanguage(languageIndex);
            isTransitioning = false;
        });
    }, intervalMs);
}
function initOnboardingHeader() {
    const lineEl = document.getElementById('onboarding-line');
    if (!lineEl) {
        return {
            isComplete: () => true,
            lock: () => { },
            unlock: () => { }
        };
    }

    const readerRoot = lineEl.closest('#reader-inline');
    const sectionRevealPlan = readerRoot
        ? [
            {
                section: readerRoot.querySelector('.reader-about-grid'),
                hintHost: readerRoot.querySelector('.reader-about-main h2')
            },
            {
                section: readerRoot.querySelector('.reader-quote-grid'),
                hintHost: readerRoot.querySelector('.reader-quote p')
            },
            {
                section: readerRoot.querySelector('.reader-contact-grid'),
                hintHost: readerRoot.querySelector('.reader-contact-grid h3')
            },
            {
                section: readerRoot.querySelector('.reader-inline-foot'),
                hintHost: readerRoot.querySelector('.reader-inline-foot div:first-child')
            }
        ]
            .filter((step) => step.section)
            .map((step) => ({
                section: step.section,
                hintHost: step.hintHost || step.section
            }))
        : [];

    const revealSections = sectionRevealPlan.map((step) => step.section);

    const stages = [
        'What I do is not just visual polish.',
        'Design is how I shape decisions, systems, and useful outcomes for real people.',
        'This portfolio is my way of showing how I think, collaborate, and solve problems with intent.'
    ];

    let revealTimer = null;
    let isAnimating = false;
    let isComplete = false;
    let revealedSectionCount = 0;

    const setGate = (locked) => {
        if (!readerRoot) return;
        readerRoot.classList.toggle('onboarding-locked', locked);
        readerRoot.classList.toggle('onboarding-unlocked', !locked);
    };

    const syncSectionVisibility = () => {
        revealSections.forEach((section, index) => {
            section.classList.toggle('onboarding-visible', index < revealedSectionCount);
        });
    };

    const completeOnboarding = () => {
        if (isComplete) return;
        isComplete = true;
        revealedSectionCount = revealSections.length;
        syncSectionVisibility();
        setGate(false);
    };

    const revealNextSection = () => {
        if (!revealSections.length) {
            completeOnboarding();
            return null;
        }

        if (revealedSectionCount >= revealSections.length) {
            completeOnboarding();
            return null;
        }

        revealedSectionCount += 1;
        syncSectionVisibility();

        const currentStep = sectionRevealPlan[revealedSectionCount - 1] || null;

        if (revealedSectionCount >= revealSections.length) {
            completeOnboarding();
            return null;
        }

        return currentStep ? currentStep.hintHost : null;
    };

    const clearTimer = () => {
        if (revealTimer) {
            window.clearInterval(revealTimer);
            revealTimer = null;
        }
        isAnimating = false;
    };

    const pickHintIndex = (tokens) => {
        const candidates = tokens
            .map((token, index) => {
                const clean = token.replace(/[^a-zA-Z]/g, '');
                return clean.length >= 4 ? index : -1;
            })
            .filter((index) => index >= 0);

        if (!candidates.length) {
            return Math.max(0, Math.floor(tokens.length / 2));
        }
        return candidates[Math.floor(Math.random() * candidates.length)];
    };

    const createWord = (token) => {
        const word = document.createElement('span');
        word.className = 'onboarding-word';
        word.textContent = token;
        return word;
    };

    const ensureHintTokens = (container) => {
        if (!container) return false;
        if (container.querySelector('.onboarding-word') || container.querySelector('.onboarding-hint')) {
            return true;
        }

        const sourceText = (container.textContent || '').replace(/\s+/g, ' ').trim();
        if (!sourceText) return false;

        const tokens = sourceText.split(' ').filter(Boolean);
        if (!tokens.length) return false;

        container.textContent = '';
        tokens.forEach((token, index) => {
            container.appendChild(createWord(token));
            if (index < tokens.length - 1) {
                container.appendChild(document.createTextNode(' '));
            }
        });

        return true;
    };

    const buildStaticSegment = (stageIndex) => {
        const segment = document.createElement('span');
        segment.className = 'onboarding-segment';
        segment.dataset.stage = String(stageIndex);

        const tokens = stages[stageIndex].split(' ');
        tokens.forEach((token, index) => {
            segment.appendChild(createWord(token));
            if (index < tokens.length - 1) {
                segment.appendChild(document.createTextNode(' '));
            }
        });

        return segment;
    };

    const getHintAriaLabel = (stageIndex) => {
        if (stageIndex < stages.length - 1) {
            return `Reveal stage ${stageIndex + 2}`;
        }

        const nextSection = Math.min(revealedSectionCount + 1, revealSections.length || 1);
        return `Reveal section ${nextSection}`;
    };

    const setHintOnSegment = (segment, stageIndex) => {
        if (stageIndex >= stages.length - 1 && revealedSectionCount >= revealSections.length) return;
        if (!ensureHintTokens(segment)) return;

        const words = Array.from(segment.querySelectorAll('.onboarding-word'));
        if (!words.length) return;

        const eligible = words.filter((word) => {
            const clean = word.textContent.replace(/[^a-zA-Z]/g, '');
            return clean.length >= 4;
        });

        const hintWord = eligible.length
            ? eligible[Math.floor(Math.random() * eligible.length)]
            : words[pickHintIndex(words.map((w) => w.textContent))];

        if (!hintWord) return;

        const hintBtn = document.createElement('button');
        hintBtn.type = 'button';
        hintBtn.className = 'onboarding-hint';
        hintBtn.textContent = hintWord.textContent;
        hintBtn.setAttribute('aria-label', getHintAriaLabel(stageIndex));
        hintBtn.title = 'Continue';
        hintBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isAnimating) return;

            const staticWord = createWord(hintBtn.textContent);
            hintBtn.replaceWith(staticWord);

            if (stageIndex < stages.length - 1) {
                revealAndAppendStage(stageIndex + 1);
                return;
            }

            const nextHintHost = revealNextSection();
            if (nextHintHost && !isComplete) {
                window.setTimeout(() => {
                    setHintOnSegment(nextHintHost, stageIndex);
                }, 24);
            }
        });

        hintWord.replaceWith(hintBtn);
    };

    const revealAndAppendStage = (stageIndex) => {
        if (stageIndex >= stages.length) return;

        clearTimer();
        isAnimating = true;

        const segment = document.createElement('span');
        segment.className = 'onboarding-segment';
        segment.dataset.stage = String(stageIndex);
        lineEl.appendChild(segment);

        const tokens = stages[stageIndex].split(' ');
        let wordIndex = 0;

        revealTimer = window.setInterval(() => {
            segment.appendChild(createWord(tokens[wordIndex]));
            if (wordIndex < tokens.length - 1) {
                segment.appendChild(document.createTextNode(' '));
            }

            wordIndex += 1;

            if (wordIndex >= tokens.length) {
                clearTimer();
                if (stageIndex >= stages.length - 1) {
                    if (revealedSectionCount >= revealSections.length) {
                        completeOnboarding();
                    } else {
                        setHintOnSegment(segment, stageIndex);
                    }
                } else {
                    setHintOnSegment(segment, stageIndex);
                }
            }
        }, 82);
    };

    lineEl.textContent = '';
    const firstSegment = buildStaticSegment(0);
    lineEl.appendChild(firstSegment);

    revealedSectionCount = 0;
    syncSectionVisibility();
    setHintOnSegment(firstSegment, 0);
    setGate(true);

    return {
        isComplete: () => isComplete,
        lock: () => {
            if (!isComplete) {
                setGate(true);
                syncSectionVisibility();
            }
        },
        unlock: () => {
            setGate(false);
            if (isComplete) {
                revealedSectionCount = revealSections.length;
                syncSectionVisibility();
            }
        }
    };
}
function initResumePopout() {
    if (!resumePopoutEl || !device) {
        return {
            openFromPill: () => { },
            closeToPill: () => { },
            toggleFromPill: () => { },
            close: () => { },
            isVisible: () => false
        };
    }

    const header = document.getElementById('resume-popout-handle');
    const closeBtn = document.getElementById('resume-popout-close');

    let hasPosition = false;
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let activePointerId = null;
    let motionTimer = null;
    let lastSourceEl = pillResumeBtn || topBar || device;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const getViewportBounds = () => ({
        minX: 8,
        minY: 8,
        maxX: window.innerWidth - resumePopoutEl.offsetWidth - 8,
        maxY: window.innerHeight - resumePopoutEl.offsetHeight - 8
    });

    const setPosition = (left, top) => {
        const bounds = getViewportBounds();
        resumePopoutEl.style.left = `${clamp(left, bounds.minX, Math.max(bounds.minX, bounds.maxX))}px`;
        resumePopoutEl.style.top = `${clamp(top, bounds.minY, Math.max(bounds.minY, bounds.maxY))}px`;
        hasPosition = true;
    };

    const setDefaultPosition = () => {
        const deviceRect = device.getBoundingClientRect();
        const targetLeft = deviceRect.left + Math.max(22, (deviceRect.width * 0.35));
        const targetTop = deviceRect.top + 86;
        setPosition(targetLeft, targetTop);
    };

    const clearMotionState = () => {
        if (motionTimer) {
            window.clearTimeout(motionTimer);
            motionTimer = null;
        }
        resumePopoutEl.classList.remove('is-opening');
        resumePopoutEl.classList.remove('is-closing');
        resumePopoutEl.style.transform = '';
        resumePopoutEl.style.transformOrigin = '';
        resumePopoutEl.style.opacity = '';
    };

    const finishClose = () => {
        clearMotionState();
        resumePopoutEl.classList.remove('visible');
        resumePopoutEl.setAttribute('aria-hidden', 'true');
    };

    const openFromPill = (sourceEl = topBar) => {
        lastSourceEl = sourceEl || lastSourceEl || pillResumeBtn || topBar || device;
        clearMotionState();

        if (!resumePopoutEl.classList.contains('visible')) {
            resumePopoutEl.classList.add('visible');
            resumePopoutEl.setAttribute('aria-hidden', 'false');
        }

        if (!hasPosition) {
            setDefaultPosition();
        } else {
            const currentLeft = Number.parseFloat(resumePopoutEl.style.left || '42');
            const currentTop = Number.parseFloat(resumePopoutEl.style.top || '136');
            setPosition(currentLeft, currentTop);
        }

        const sourceRect = (lastSourceEl || topBar || device).getBoundingClientRect();
        const targetRect = resumePopoutEl.getBoundingClientRect();

        const sourceCenterX = sourceRect.left + (sourceRect.width * 0.5);
        const sourceCenterY = sourceRect.top + (sourceRect.height * 0.5);
        const targetCenterX = targetRect.left + (targetRect.width * 0.5);
        const targetCenterY = targetRect.top + (targetRect.height * 0.5);

        const deltaX = sourceCenterX - targetCenterX;
        const deltaY = sourceCenterY - targetCenterY;

        resumePopoutEl.classList.add('is-opening');
        resumePopoutEl.style.transformOrigin = `${sourceCenterX - targetRect.left}px ${sourceCenterY - targetRect.top}px`;
        resumePopoutEl.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale3d(0.06, 0.14, 1)`;
        resumePopoutEl.offsetHeight;
        requestAnimationFrame(() => {
            resumePopoutEl.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
        });
        motionTimer = window.setTimeout(() => {
            clearMotionState();
        }, 820);
    };

    const closeToPill = (sourceEl = lastSourceEl) => {
        if (!resumePopoutEl.classList.contains('visible')) return;
        lastSourceEl = sourceEl || lastSourceEl || pillResumeBtn || topBar || device;

        const sourceRect = (lastSourceEl || topBar || device).getBoundingClientRect();
        const targetRect = resumePopoutEl.getBoundingClientRect();
        const sourceCenterX = sourceRect.left + (sourceRect.width * 0.5);
        const sourceCenterY = sourceRect.top + (sourceRect.height * 0.5);
        const targetCenterX = targetRect.left + (targetRect.width * 0.5);
        const targetCenterY = targetRect.top + (targetRect.height * 0.5);
        const deltaX = sourceCenterX - targetCenterX;
        const deltaY = sourceCenterY - targetCenterY;

        clearMotionState();
        resumePopoutEl.classList.add('is-closing');
        resumePopoutEl.style.transformOrigin = `${sourceCenterX - targetRect.left}px ${sourceCenterY - targetRect.top}px`;
        resumePopoutEl.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
        resumePopoutEl.style.opacity = '1';
        resumePopoutEl.offsetHeight;
        requestAnimationFrame(() => {
            resumePopoutEl.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale3d(0.03, 0.09, 1)`;
            resumePopoutEl.style.opacity = '0.12';
        });
        motionTimer = window.setTimeout(finishClose, 760);
    };

    const close = () => {
        finishClose();
    };

    const toggleFromPill = (sourceEl = lastSourceEl) => {
        if (resumePopoutEl.classList.contains('visible')) {
            closeToPill(sourceEl);
            return;
        }
        openFromPill(sourceEl);
    };

    const startDrag = (event) => {
        if (!resumePopoutEl.classList.contains('visible') || resumePopoutEl.classList.contains('is-closing')) return;

        const controlTarget = event.target instanceof Element
            ? event.target.closest('#resume-popout-close, .dot, button, a, iframe')
            : null;

        if (controlTarget) {
            return;
        }

        isDragging = true;
        activePointerId = event.pointerId;
        header.setPointerCapture(activePointerId);

        const rect = resumePopoutEl.getBoundingClientRect();
        dragOffsetX = event.clientX - rect.left;
        dragOffsetY = event.clientY - rect.top;

        clearMotionState();

        event.preventDefault();
    };

    const moveDrag = (event) => {
        if (!isDragging || event.pointerId !== activePointerId) return;
        setPosition(event.clientX - dragOffsetX, event.clientY - dragOffsetY);
    };

    const endDrag = (event) => {
        if (!isDragging || event.pointerId !== activePointerId) return;
        isDragging = false;
        if (header && header.hasPointerCapture(activePointerId)) {
            header.releasePointerCapture(activePointerId);
        }
        activePointerId = null;
    };

    closeBtn?.addEventListener('pointerdown', (event) => {
        event.stopPropagation();
    });

    closeBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeToPill();
    });

    header?.addEventListener('pointerdown', startDrag);
    header?.addEventListener('pointermove', moveDrag);
    header?.addEventListener('pointerup', endDrag);
    header?.addEventListener('pointercancel', endDrag);

    window.addEventListener('resize', () => {
        if (!resumePopoutEl.classList.contains('visible')) return;
        const rect = resumePopoutEl.getBoundingClientRect();
        setPosition(rect.left, rect.top);
    });

    return {
        openFromPill,
        closeToPill,
        toggleFromPill,
        close,
        isVisible: () => resumePopoutEl.classList.contains('visible')
    };
}

function initWorkTogetherPanel() {
    if (!workTogetherBtn || !workAssistantPanelEl) {
        return {
            open: () => { },
            close: () => { },
            toggle: () => { },
            isVisible: () => false,
            isInside: () => false
        };
    }

    const isVisible = () => workAssistantPanelEl.classList.contains('is-open');

    const playVideo = () => {
        if (!workAssistantVideoEl) return;
        const playPromise = workAssistantVideoEl.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => { });
        }
    };

    const pauseVideo = () => {
        if (!workAssistantVideoEl) return;
        workAssistantVideoEl.pause();
    };

    const open = () => {
        workAssistantPanelEl.classList.add('is-open');
        workAssistantPanelEl.setAttribute('aria-hidden', 'false');
        workTogetherBtn.setAttribute('aria-expanded', 'true');
        playVideo();
    };

    const close = () => {
        workAssistantPanelEl.classList.remove('is-open');
        workAssistantPanelEl.setAttribute('aria-hidden', 'true');
        workTogetherBtn.setAttribute('aria-expanded', 'false');
        pauseVideo();
    };

    const toggle = () => {
        if (isVisible()) {
            close();
            return;
        }
        open();
    };

    workTogetherBtn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle();
    });

    workAssistantCloseBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        close();
    });

    workAssistantPanelEl.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isVisible()) {
            close();
        }
    });

    return {
        open,
        close,
        toggle,
        isVisible,
        isInside: (target) => {
            if (!(target instanceof Node)) return false;
            return workAssistantPanelEl.contains(target) || workTogetherBtn.contains(target);
        }
    };
}

function initReaderMode(onboardingFlow = null) {
    if (!device || !readerInlineEl) {
        return {
            open: () => { },
            close: () => { },
            toggle: () => { },
            isActive: () => false
        };
    }

    const scrollableContent = document.getElementById('scrollable-content');

    const open = () => {
        device.classList.add('reader-mode');
        document.body.classList.add('reader-mode');
        readerInlineEl.setAttribute('aria-hidden', 'false');
        if (onboardingFlow) {
            if (onboardingFlow.isComplete()) {
                onboardingFlow.unlock();
            } else {
                onboardingFlow.lock();
            }
        }
        if (scrollableContent) {
            scrollableContent.scrollTop = 0;
        }
    };

    const close = () => {
        device.classList.remove('reader-mode');
        document.body.classList.remove('reader-mode');
        readerInlineEl.setAttribute('aria-hidden', 'true');
    };

    const toggle = () => {
        if (device.classList.contains('reader-mode')) {
            close();
            return;
        }
        open();
    };

    return {
        open,
        close,
        toggle,
        isActive: () => device.classList.contains('reader-mode')
    };
}

function initSmoothWheelScrolling() {
    const targets = [
        document.scrollingElement,
        document.getElementById('scrollable-content'),
        document.getElementById('case-content-area')
    ].filter(Boolean);

    targets.forEach((el) => {
        const state = {
            current: el.scrollTop,
            target: el.scrollTop,
            raf: 0
        };

        const tick = () => {
            state.current += (state.target - state.current) * 0.18;
            if (Math.abs(state.target - state.current) < 0.35) {
                state.current = state.target;
            }
            el.scrollTop = state.current;
            if (Math.abs(state.target - state.current) > 0.35) {
                state.raf = requestAnimationFrame(tick);
            } else {
                state.raf = 0;
            }
        };

        el.addEventListener('wheel', (event) => {
            if (event.ctrlKey) return;
            const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
            if (maxScroll <= 0) return;

            const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
            if (!Number.isFinite(delta) || Math.abs(delta) < 0.2) return;

            state.target = Math.min(Math.max(state.target + (delta * 1.05), 0), maxScroll);
            event.preventDefault();
            if (!state.raf) {
                state.raf = requestAnimationFrame(tick);
            }
        }, { passive: false });

        el.addEventListener('scroll', () => {
            if (state.raf) return;
            state.current = el.scrollTop;
            state.target = el.scrollTop;
        }, { passive: true });
    });
}

function initStickyNote() {
    if (!stickyNoteEl || !device) {
        return {
            openFromPill: () => { },
            closeToPill: () => { },
            toggleFromPill: () => { },
            close: () => { },
            isVisible: () => false
        };
    }

    const header = document.getElementById('sticky-note-handle');
    const closeBtn = document.getElementById('sticky-close');
    const minBtn = document.getElementById('sticky-min');
    const editor = document.getElementById('sticky-note-editor');

    let hasPosition = false;
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let activePointerId = null;
    let motionTimer = null;
    let lastSourceEl = pillNotesBtn || topBar || device;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const getViewportBounds = () => ({
        minX: 8,
        minY: 8,
        maxX: window.innerWidth - stickyNoteEl.offsetWidth - 8,
        maxY: window.innerHeight - stickyNoteEl.offsetHeight - 8
    });

    const setPosition = (left, top) => {
        const bounds = getViewportBounds();
        stickyNoteEl.style.left = `${clamp(left, bounds.minX, Math.max(bounds.minX, bounds.maxX))}px`;
        stickyNoteEl.style.top = `${clamp(top, bounds.minY, Math.max(bounds.minY, bounds.maxY))}px`;
        hasPosition = true;
    };

    const setDefaultPosition = (sourceEl) => {
        const bounds = getViewportBounds();

        if (sourceEl) {
            const btnRect = sourceEl.getBoundingClientRect();
            // Spawn 20px below the button, centered horizontally if possible
            const targetLeft = btnRect.left + (btnRect.width / 2) - (stickyNoteEl.offsetWidth / 2);
            const targetTop = btnRect.bottom + 20;
            setPosition(targetLeft, targetTop);
        } else {
            // Fallback
            const targetLeft = bounds.maxX - 24;
            const targetTop = bounds.maxY - 24;
            setPosition(targetLeft, targetTop);
        }
    };

    const clearMotionState = () => {
        if (motionTimer) {
            window.clearTimeout(motionTimer);
            motionTimer = null;
        }
        stickyNoteEl.classList.remove('is-opening');
        stickyNoteEl.classList.remove('is-closing');
        stickyNoteEl.style.transform = '';
        stickyNoteEl.style.transformOrigin = '';
        stickyNoteEl.style.opacity = '';
    };

    const finishClose = () => {
        clearMotionState();
        stickyNoteEl.classList.remove('visible');
        stickyNoteEl.classList.remove('minimized');
        stickyNoteEl.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('notes-active');
    };

    const openFromPill = (sourceEl = topBar) => {
        lastSourceEl = sourceEl || lastSourceEl || pillNotesBtn || topBar || device;
        clearMotionState();

        if (!stickyNoteEl.classList.contains('visible')) {
            stickyNoteEl.classList.add('visible');
        }
        stickyNoteEl.setAttribute('aria-hidden', 'false');
        document.body.classList.add('notes-active');
        stickyNoteEl.classList.remove('minimized');

        if (!hasPosition) {
            setDefaultPosition(sourceEl);
        } else {
            const currentLeft = Number.parseFloat(stickyNoteEl.style.left || '24');
            const currentTop = Number.parseFloat(stickyNoteEl.style.top || '120');
            setPosition(currentLeft, currentTop);
        }

        const sourceRect = (lastSourceEl || topBar || device).getBoundingClientRect();
        const targetRect = stickyNoteEl.getBoundingClientRect();

        const sourceCenterX = sourceRect.left + (sourceRect.width * 0.5);
        const sourceCenterY = sourceRect.top + (sourceRect.height * 0.5);
        const targetCenterX = targetRect.left + (targetRect.width * 0.5);
        const targetCenterY = targetRect.top + (targetRect.height * 0.5);

        const deltaX = sourceCenterX - targetCenterX;
        const deltaY = sourceCenterY - targetCenterY;

        stickyNoteEl.classList.add('is-opening');
        stickyNoteEl.style.transformOrigin = `${sourceCenterX - targetRect.left}px ${sourceCenterY - targetRect.top}px`;
        stickyNoteEl.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale3d(0.05, 0.1, 1)`;
        stickyNoteEl.style.opacity = '0.08';
        stickyNoteEl.offsetHeight;
        requestAnimationFrame(() => {
            stickyNoteEl.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
            stickyNoteEl.style.opacity = '1';
        });
        motionTimer = window.setTimeout(() => {
            clearMotionState();
        }, 760);
    };

    const closeToPill = (sourceEl = lastSourceEl) => {
        if (!stickyNoteEl.classList.contains('visible')) return;
        document.body.classList.remove('notes-active');
        lastSourceEl = sourceEl || lastSourceEl || pillNotesBtn || topBar || device;

        const sourceRect = (lastSourceEl || topBar || device).getBoundingClientRect();
        const targetRect = stickyNoteEl.getBoundingClientRect();
        const sourceCenterX = sourceRect.left + (sourceRect.width * 0.5);
        const sourceCenterY = sourceRect.top + (sourceRect.height * 0.5);
        const targetCenterX = targetRect.left + (targetRect.width * 0.5);
        const targetCenterY = targetRect.top + (targetRect.height * 0.5);
        const deltaX = sourceCenterX - targetCenterX;
        const deltaY = sourceCenterY - targetCenterY;

        clearMotionState();
        stickyNoteEl.classList.remove('minimized');
        stickyNoteEl.classList.add('is-closing');
        stickyNoteEl.style.transformOrigin = `${sourceCenterX - targetRect.left}px ${sourceCenterY - targetRect.top}px`;
        stickyNoteEl.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
        stickyNoteEl.style.opacity = '1';
        stickyNoteEl.offsetHeight;
        requestAnimationFrame(() => {
            stickyNoteEl.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale3d(0.05, 0.1, 1)`;
            stickyNoteEl.style.opacity = '0.08';
        });
        motionTimer = window.setTimeout(finishClose, 720);
    };

    const close = () => {
        finishClose();
    };

    const toggleFromPill = (sourceEl = lastSourceEl) => {
        if (stickyNoteEl.classList.contains('is-closing')) {
            openFromPill(sourceEl);
            return;
        }
        if (stickyNoteEl.classList.contains('visible')) {
            closeToPill(sourceEl);
            return;
        }
        openFromPill(sourceEl);
    };

    const toggleMinimize = () => {
        stickyNoteEl.classList.toggle('minimized');
    };

    const startDrag = (event) => {
        if (!stickyNoteEl.classList.contains('visible') || stickyNoteEl.classList.contains('is-closing')) return;

        const controlTarget = event.target instanceof Element
            ? event.target.closest('#sticky-close, #sticky-min, .dot, button, a, textarea, input, select')
            : null;

        if (controlTarget) {
            return;
        }

        isDragging = true;
        activePointerId = event.pointerId;
        header.setPointerCapture(activePointerId);

        const rect = stickyNoteEl.getBoundingClientRect();
        dragOffsetX = event.clientX - rect.left;
        dragOffsetY = event.clientY - rect.top;

        clearMotionState();

        event.preventDefault();
    };

    const moveDrag = (event) => {
        if (!isDragging || event.pointerId !== activePointerId) return;
        setPosition(event.clientX - dragOffsetX, event.clientY - dragOffsetY);
    };

    const endDrag = (event) => {
        if (!isDragging || event.pointerId !== activePointerId) return;
        isDragging = false;
        if (header && header.hasPointerCapture(activePointerId)) {
            header.releasePointerCapture(activePointerId);
        }
        activePointerId = null;
    };

    closeBtn?.addEventListener('pointerdown', (event) => {
        event.stopPropagation();
    });

    closeBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeToPill();
    });

    minBtn?.addEventListener('pointerdown', (event) => {
        event.stopPropagation();
    });

    minBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleMinimize();
    });

    header?.addEventListener('pointerdown', startDrag);
    header?.addEventListener('pointermove', moveDrag);
    header?.addEventListener('pointerup', endDrag);
    header?.addEventListener('pointercancel', endDrag);

    window.addEventListener('resize', () => {
        if (!stickyNoteEl.classList.contains('visible')) return;
        const rect = stickyNoteEl.getBoundingClientRect();
        setPosition(rect.left, rect.top);
    });

    editor?.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    return {
        openFromPill,
        closeToPill,
        toggleFromPill,
        close,
        isVisible: () => stickyNoteEl.classList.contains('visible')
    };
}
// --------------------------------------------------------
// DATA GRID NODE SYSTEM
// --------------------------------------------------------
function initNodeGraph() {
    const container = document.getElementById('node-graph-container');
    if (!container) return;

    const svg = container.querySelector('.node-edges');
    if (!svg) return;

    const nodes = [];
    const anchorSeeds = [];
    const minAnchorDistanceSq = 0.018;

    const createRandomAnchor = () => {
        for (let attempt = 0; attempt < 28; attempt += 1) {
            const x = 0.14 + (Math.random() * 0.72);
            const y = 0.14 + (Math.random() * 0.72);
            const hasSpacing = anchorSeeds.every((anchor) => {
                const dx = x - anchor.x;
                const dy = y - anchor.y;
                return (dx * dx + dy * dy) >= minAnchorDistanceSq;
            });

            if (hasSpacing) {
                return { x, y };
            }
        }

        return {
            x: 0.14 + (Math.random() * 0.72),
            y: 0.14 + (Math.random() * 0.72)
        };
    };

    container.querySelectorAll('.node-item').forEach((el, index) => {
        const anchor = createRandomAnchor();
        anchorSeeds.push(anchor);

        const labelEl = el.querySelector('span');
        const node = {
            id: el.id || `node-${index}`,
            label: labelEl ? labelEl.textContent.trim().toLowerCase() : '',
            el: el,
            baseX: anchor.x, // random anchor %
            baseY: anchor.y,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            isDragging: false,
            pointerId: null
        };
        nodes.push(node);

        let dragOffsetX = 0;
        let dragOffsetY = 0;

        el.addEventListener('pointerdown', e => {
            node.isDragging = true;
            node.pointerId = e.pointerId;
            el.setPointerCapture(e.pointerId);
            el.classList.add('is-dragging');

            const rect = el.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left - rect.width / 2;
            dragOffsetY = e.clientY - rect.top - rect.height / 2;

            node.vx = 0;
            node.vy = 0;
            e.preventDefault();
        });

        el.addEventListener('pointermove', e => {
            if (!node.isDragging || e.pointerId !== node.pointerId) return;
            const containerRect = container.getBoundingClientRect();
            node.x = e.clientX - containerRect.left - dragOffsetX;
            node.y = e.clientY - containerRect.top - dragOffsetY;
        });

        const endDrag = e => {
            if (!node.isDragging || e.pointerId !== node.pointerId) return;
            node.isDragging = false;
            node.pointerId = null;
            el.releasePointerCapture(e.pointerId);
            el.classList.remove('is-dragging');
        };

        el.addEventListener('pointerup', endDrag);
        el.addEventListener('pointercancel', endDrag);
    });

    const makerNode = nodes.find((node) => node.label === 'maker') || nodes[0] || null;

    const edges = [];
    if (makerNode) {
        nodes.forEach((node) => {
            if (node === makerNode) return;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            svg.appendChild(path);
            edges.push({
                source: makerNode,
                target: node,
                path: path
            });
        });
    }
    // Initial positioning
    const setInitialLayout = () => {
        const rect = container.getBoundingClientRect();
        nodes.forEach(n => {
            if (!n.isDragging) {
                n.x = n.baseX * rect.width;
                n.y = n.baseY * rect.height;
                n.vx = 0;
                n.vy = 0;
            }
        });
    };
    setInitialLayout();

    // Physics constants
    const stiffness = 0.04; // Spring force for edges
    const damping = 0.75; // Velocity decay
    const repelStrength = 4000; // Inverse square repel between nodes
    const anchorStiffness = 0.01; // Soft pull to base % positions to structure

    // Every 5s, gently vary repel/link forces to keep subtle motion alive.
    const forceShiftIntervalMs = 1000;
    const forceShiftAmount = 0.52;
    const forceBlend = 0.09;

    const currentForceProfile = {
        stiffness: 1,
        repel: 1
    };
    const targetForceProfile = {
        stiffness: 1,
        repel: 1
    };

    const retargetForces = () => {
        targetForceProfile.stiffness = 1 + ((Math.random() * 2 - 1) * forceShiftAmount);
        targetForceProfile.repel = 1 + ((Math.random() * 2 - 1) * forceShiftAmount);
    };

    window.setInterval(retargetForces, forceShiftIntervalMs);

    let animationFrameId;

    function updatePhysics() {
        const rect = container.getBoundingClientRect();

        currentForceProfile.stiffness += (targetForceProfile.stiffness - currentForceProfile.stiffness) * forceBlend;
        currentForceProfile.repel += (targetForceProfile.repel - currentForceProfile.repel) * forceBlend;

        const dynamicStiffness = stiffness * currentForceProfile.stiffness;
        const dynamicRepelStrength = repelStrength * currentForceProfile.repel;

        nodes.forEach(n => {
            if (n.isDragging) return;

            let fx = 0;
            let fy = 0;

            // Return to origin anchor slightly to avoid drifting away
            const targetX = n.baseX * rect.width;
            const targetY = n.baseY * rect.height;
            fx += (targetX - n.x) * anchorStiffness;
            fy += (targetY - n.y) * anchorStiffness;

            // Repel all other nodes
            nodes.forEach(n2 => {
                if (n === n2) return;
                const dx = n.x - n2.x;
                const dy = n.y - n2.y;
                const distSq = dx * dx + dy * dy;
                if (distSq > 0 && distSq < 50000) { // Limit repulsion radius (sqrt(50000) ~ 220px)
                    const dist = Math.sqrt(distSq);
                    const force = dynamicRepelStrength / distSq;
                    fx += (dx / dist) * force;
                    fy += (dy / dist) * force;
                }
            });

            n.vx = (n.vx + fx) * damping;
            n.vy = (n.vy + fy) * damping;

            n.x += n.vx;
            n.y += n.vy;

            // Simple boundary bounce
            if (n.x < 30) { n.x = 30; n.vx *= -0.5; }
            if (n.x > rect.width - 30) { n.x = rect.width - 30; n.vx *= -0.5; }
            if (n.y < 30) { n.y = 30; n.vy *= -0.5; }
            if (n.y > rect.height - 30) { n.y = rect.height - 30; n.vy *= -0.5; }
        });

        // Add spring forces separately so they affect both nodes symmetrically
        edges.forEach(e => {
            const dx = e.target.x - e.source.x;
            const dy = e.target.y - e.source.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const restLength = 85; // Ideal edge length

            if (dist > 0) {
                const force = (dist - restLength) * dynamicStiffness;
                const fx = (dx / dist) * force;
                const fy = (dy / dist) * force;

                if (!e.source.isDragging) {
                    e.source.vx += fx * damping;
                    e.source.vy += fy * damping;
                }
                if (!e.target.isDragging) {
                    e.target.vx -= fx * damping;
                    e.target.vy -= fy * damping;
                }
            }
        });

        // Apply DOM updates
        nodes.forEach(n => {
            n.el.style.left = n.x + 'px';
            n.el.style.top = n.y + 'px';
        });

        edges.forEach(edge => {
            edge.path.setAttribute('d', `M ${edge.source.x} ${edge.source.y} L ${edge.target.x} ${edge.target.y}`);
        });

        animationFrameId = requestAnimationFrame(updatePhysics);
    }

    // Slight pause to ensure DOM is ready and sized
    setTimeout(() => {
        setInitialLayout();
        updatePhysics();
    }, 100);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setInitialLayout, 200);
    });
}

// --------------------------------------------------------
// INTERACTIVE CHAT MODE
// --------------------------------------------------------
function init3DChatMode() {
    const open = () => {
        window.location.href = 'chat3d.html';
    };
    return { open, close: () => { }, isActive: () => false };
}

// --------------------------------------------------------
// MAIN INIT ON DOM CONTENT LOADED
// --------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    initCursorSystem();
    initCustomCursor();
    applyMarqueeSettings();
    initNodeGraph();
    initSmoothWheelScrolling();
    const onboardingFlow = initOnboardingHeader();
    const expandFabAnchor = initExpandButtonAnchor();
    const leftOrbControls = initLeftOrbControls();
    const stickyNote = initStickyNote();
    const resumePopout = initResumePopout();
    const workTogetherPanel = initWorkTogetherPanel();
    const readerMode = initReaderMode(onboardingFlow);
    const chatMode = init3DChatMode();
    const idCardSystem = initIdCardSystem();

    const expandDeviceShell = (autoOpenNotes = true) => {
        if (!device || device.classList.contains('expanded')) return;
        device.classList.add('expanded');
        document.body.classList.add('device-expanded');
        applyPillSizes('expanded');

        // Start Matrix Effect only on first open
        if (!window.hasMatrixStarted) {
            initBackgrounds();
            window.hasMatrixStarted = true;
        }

        setTimeout(() => {
            if (miniMatrixInstance) miniMatrixInstance.resize();
            idCardSystem.updateAnchor();
            leftOrbControls.updateScrollPosition();
            // Removed autoOpenNotes to prevent automatic spawning
        }, 520);
    };

    // Config based UI updates
    if (githubChartImg) {
        githubChartImg.src = `https://ghchart.rshah.org/${SITE_CONFIG.profile.githubChartColor}/${SITE_CONFIG.profile.githubUsername}`;
    }

    if (topBarArt) {
        const applyBarArtState = () => {
            const hasImage = topBarArt.naturalWidth > 0;
            topBar.classList.toggle('has-art', hasImage);
        };
        if (topBarArt.complete) {
            applyBarArtState();
        }
        topBarArt.addEventListener('load', applyBarArtState);
        topBarArt.addEventListener('error', () => {
            topBar.classList.remove('has-art');
        });
    }

    if (expandBtn) {
        expandBtn.addEventListener('click', (e) => {
            device.classList.toggle('maximized');
            document.body.classList.toggle('device-maximized');
            e.stopPropagation();
            expandFabAnchor.schedule();
            setTimeout(() => {
                if (typeof fitty !== 'undefined') fitty.fitAll();
            }, 350);
        });
    }

    applyMatrixPausedState();
    leftOrbControls.refreshTime();

    leftControlsEl?.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    orbCursorHandle?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    matrixToggleBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMatrixPaused();
    });

    orbResumeBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    if (topBar) {
        topBar.addEventListener('click', (e) => {
            if (e.target instanceof Element && e.target.closest('.pill-icon-btn')) return;
            expandDeviceShell(true);
            e.stopPropagation();
        });
    }

    pillNotesBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!device.classList.contains('expanded')) {
            expandDeviceShell(true);
        } else {
            if (resumePopout.isVisible()) resumePopout.closeToPill(pillResumeBtn);
            // Notes shouldn't close the reader mode window
            stickyNote.toggleFromPill(pillNotesBtn);
        }
    });

    pillResumeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        expandDeviceShell(false);
        if (readerMode.isActive()) readerMode.close();
        if (stickyNote.isVisible()) stickyNote.close();
        if (workTogetherPanel.isVisible()) workTogetherPanel.close();

        window.location.href = 'chat3d.html';
    });

    pillThirdBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        expandDeviceShell(false);
        if (resumePopout.isVisible()) resumePopout.closeToPill(pillResumeBtn);
        readerMode.toggle();
    });

    showIdBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        expandDeviceShell(false);

        if (!idCardSystem.isVisible()) {
            idCardSystem.showPeek();
            return;
        }

        if (idCardSystem.isOpen()) {
            idCardSystem.closeToPeek();
            return;
        }

        idCardSystem.hide();
    });

    scrollableContentEl?.addEventListener('scroll', () => {
        if (idCardSystem.isOpen()) {
            idCardSystem.closeToPeek();
        }
    }, { passive: true });
    document.body.addEventListener('click', (e) => {
        const caseOverlayControl = window.CaseOverlayControl;
        const caseIsOpen = caseOverlayControl
            ? caseOverlayControl.isVisible()
            : (caseWindowEl && caseWindowEl.classList.contains('visible'));
        const clickedInsideCase = caseWindowEl && caseWindowEl.contains(e.target);
        const clickedInsideDevice = device && device.contains(e.target);
        const clickedInsideSticky = stickyNoteEl && stickyNoteEl.contains(e.target);
        const clickedInsideResume = resumePopoutEl && resumePopoutEl.contains(e.target);
        const clickedInsideIdCard = idCardSystem.isInside(e.target);
        const clickedInsideWorkAssistant = workTogetherPanel.isInside(e.target);

        const idWasOpen = idCardSystem.isOpen();
        if (idWasOpen && !clickedInsideIdCard && !(showIdBtn && showIdBtn.contains(e.target))) {
            idCardSystem.closeToPeek();
            return;
        }

        if (workTogetherPanel.isVisible() && !clickedInsideWorkAssistant) {
            workTogetherPanel.close();
            return;
        }

        // Priority close order:
        // 1) Close the side case window first.
        // 2) Only after that, allow closing the mini portfolio on a later outside click.
        if (caseIsOpen && !clickedInsideCase && !clickedInsideDevice && !clickedInsideSticky && !clickedInsideResume && !clickedInsideIdCard && !clickedInsideWorkAssistant) {
            if (caseOverlayControl) {
                caseOverlayControl.close();
            } else if (caseWindowEl) {
                caseWindowEl.classList.remove('visible');
                caseWindowEl.classList.remove('minimized');
                document.body.classList.remove('case-open');
            }
            return;
        }

        if (
            device.classList.contains('expanded') &&
            !clickedInsideDevice &&
            !clickedInsideCase &&
            !clickedInsideSticky &&
            !clickedInsideResume &&
            !clickedInsideIdCard &&
            !clickedInsideWorkAssistant
        ) {
            device.classList.remove('expanded');
            document.body.classList.remove('device-expanded');
            device.classList.remove('maximized');
            document.body.classList.remove('device-maximized');
            applyPillSizes('collapsed');
            readerMode.close();
            stickyNote.close();
            resumePopout.close();
            idCardSystem.hide();
            setTimeout(() => { if (miniMatrixInstance) miniMatrixInstance.resize(); }, 520);
        }
    });

    // Run core initializers
    buildCompanyDock();
    initCompanyDock();
    buildPalette();
    clearPixelCanvas();
    SITE_CONFIG.setupCaseOverlays();
    initIndexGrid();
    initFeaturedCardHoverMotion();
    initHeroLanguageLoop();

    // Initialize Scramble Animations
    const pillTextEl = document.querySelector('.pill-text');
    scrambleText(pillTextEl, "portfolio", 1000);

    const resumeBtnEl = document.querySelector('.resume-fab');
    scrambleText(resumeBtnEl, "/-Resume", 1000);

    applyPillSizes('collapsed'); // Ensure initial state is collapsed
    applyBlurMaskSettings();

    // Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Fitty
    if (typeof fitty !== 'undefined') {
        document.fonts.ready.then(() => {
            fitty('.fit-text', {
                minSize: 16,
                maxSize: 200,
                multiLine: false
            });
        });
    }
});

// Handle Email Pill Copy
document.addEventListener('DOMContentLoaded', () => {
    const emailPillBtn = document.getElementById('email-pill-btn');
    const emailPillTooltip = document.getElementById('email-pill-tooltip');

    if (emailPillBtn && emailPillTooltip) {
        emailPillBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText('raghavprasanna2000@gmail.com').then(() => {
                const originalText = emailPillTooltip.textContent;
                emailPillTooltip.textContent = 'Copied!';
                setTimeout(() => {
                    emailPillTooltip.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }
});






