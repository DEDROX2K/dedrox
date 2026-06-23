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
    receiptAscii: `
 /$$$$$$$  /$$$$$$$$ /$$$$$$$  /$$$$$$$   /$$$$$$  /$$   /$$
| $$__  $$| $$_____/| $$__  $$| $$__  $$ /$$__  $$|  $$ /$$/
| $$  \\ $$| $$      | $$  \\ $$| $$  \\ $$| $$  \\ $$ \\  $$$$/ 
| $$  | $$| $$$$$   | $$  | $$| $$$$$$$/| $$  | $$  \\  $$/  
| $$  | $$| $$__/   | $$  | $$| $$__  $$| $$  | $$   >  $$  
| $$  | $$| $$      | $$  | $$| $$  \\ $$| $$  | $$  /$$/\\  $$
| $$$$$$$/| $$$$$$$$| $$$$$$$/| $$  | $$|  $$$$$$/ | $$  \\ $$
|_______/ |________/|_______/ |__/  |__/ \\______/  |__/   |__/
    `,
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
        resolution: 40,
        initialArt: []
    },
    caseData: {
        case1: {
            title: "Clear Breath CBT",
            logo: "images/c6.png",
            postedDate: "12/05/2024",
            behanceUrl: "https://www.behance.net/gallery/200529521/CLEAR-BREATH-case-study-No-smoking-app",
            images: [
                'images/DEDROX.DSGN/CB1.jpg', 'images/DEDROX.DSGN/CB2.jpg', 'images/DEDROX.DSGN/CB3.jpg',
                'images/DEDROX.DSGN/CB4.jpg', 'images/DEDROX.DSGN/CB5.jpg', 'images/DEDROX.DSGN/CB6.jpg',
                'images/DEDROX.DSGN/CB7.jpg', 'images/DEDROX.DSGN/CB8.jpg', 'images/DEDROX.DSGN/CB9.jpg',
                'images/DEDROX.DSGN/CB10.jpg', 'images/DEDROX.DSGN/CB11.jpg'
            ]
        },
        case2: {
            title: "Air Buddy Navigation",
            logo: "images/c5.png",
            postedDate: "08/11/2023",
            behanceUrl: "https://www.behance.net/gallery/209743653/AR-AIRPORT-NAVIGATION-Case-study",
            images: [
                'images/DEDROX.DSGN/AN1.jpg', 'images/DEDROX.DSGN/AN2.jpg', 'images/DEDROX.DSGN/AN3.jpg',
                'images/DEDROX.DSGN/AN4.jpg', 'images/DEDROX.DSGN/AN5.jpg', 'images/DEDROX.DSGN/AN6.jpg',
                'images/DEDROX.DSGN/AN7.jpg', 'images/DEDROX.DSGN/AN8.jpg', 'images/DEDROX.DSGN/AN9.jpg'
            ]
        },
        case3: {
            title: "Research Phase",
            logo: "images/c1.png",
            postedDate: "21/01/2025",
            behanceUrl: "https://www.behance.net/gallery/215201231/Research-Phrase",
            images: [
                'images/DEDROX.DSGN/f1.png', 'images/DEDROX.DSGN/f2.png', 'images/DEDROX.DSGN/f3.png',
                'images/DEDROX.DSGN/f4.png', 'images/DEDROX.DSGN/f5.png', 'images/DEDROX.DSGN/f6.png',
                'images/DEDROX.DSGN/f7.png'
            ]
        },
        about_me: {
            title: "About Me",
            logo: "images/c6.png",
            postedDate: "14/05/2026",
            behanceUrl: "#",
            images: ['images/airpasteinfo.png']
        },
        thoughts_ai: {
            title: "Thoughts on AI",
            logo: "images/c5.png",
            postedDate: "14/05/2026",
            behanceUrl: "#",
            images: ['images/airpasteinfo.png']
        },
        beta_project: {
            title: "My Current Beta Project",
            logo: "images/c1.png",
            postedDate: "14/05/2026",
            behanceUrl: "#",
            images: ['images/airpasteinfo.png']
        }
    },
    setupCaseOverlays() {
        const cards = document.querySelectorAll('[data-case]');
        const caseWindow = document.getElementById('case-window');
        const closeBtn = document.getElementById('case-close');
        const minBtn = document.getElementById('case-min');
        const expandBtn = document.getElementById('case-expand');
        const fullscreenToggleBtn = document.getElementById('case-fullscreen-toggle');
        const openBtn = document.getElementById('case-open-link');
        const downloadBtn = document.getElementById('case-download-link');
        const behanceBtn = document.getElementById('case-behance-link');
        const externalBtn = document.getElementById('case-external-link');
        const contentArea = document.getElementById('case-content-area');
        const titleDisp = document.getElementById('case-title');

        const setBehanceUrl = (url) => {
            if (!behanceBtn) return;
            if (url) {
                behanceBtn.href = url;
            } else {
                behanceBtn.href = '#';
            }
        };

        const setExternalLink = (label, href, ariaLabel) => {
            if (!externalBtn) return;
            externalBtn.href = href || '#';
            const labelEl = externalBtn.querySelector('.f-external-label');
            if (labelEl) labelEl.textContent = label || 'Visit';
            if (ariaLabel) {
                externalBtn.setAttribute('aria-label', ariaLabel);
            }
        };

        const setDownloadLink = (label, href, ariaLabel) => {
            if (!downloadBtn) return;
            downloadBtn.href = href || '#';
            const labelEl = downloadBtn.querySelector('.f-download-label');
            if (labelEl) labelEl.textContent = label || 'Download';
            if (ariaLabel) {
                downloadBtn.setAttribute('aria-label', ariaLabel);
            }
        };

        let isTransitioning = false;
        let caseMotionTimer = null;
        let activeCaseHref = '';
        const CASE_ANIM_MS = 280;
        const CASE_MORPH_MS = 310;
        const resumePdfHref = 'threeD/CV_RESUME-RAGHAV.pdf';
        const resumePageImages = Array.from({ length: 4 }, (_, index) => `images/resume-pages/page-${String(index + 1).padStart(2, '0')}.png`);
        let activeMorphCleanup = null;
        let morphRevealTimer = null;
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

        const normalizeHref = (rawHref) => {
            const href = typeof rawHref === 'string' ? rawHref.trim() : '';
            if (!href || href === '#') return '';
            return href;
        };

        const escapeAttr = (value) => String(value || '').replace(/"/g, '&quot;');

        const setCaseLayout = (isOpen) => {
            document.body.classList.toggle('case-open', isOpen);
        };

        const nextFrame = () => new Promise((resolve) => {
            window.requestAnimationFrame(() => resolve());
        });

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const cleanupActiveMorph = () => {
            if (typeof activeMorphCleanup === 'function') {
                activeMorphCleanup();
                activeMorphCleanup = null;
            }
            if (morphRevealTimer) {
                window.clearTimeout(morphRevealTimer);
                morphRevealTimer = null;
            }
        };

        const createCardMorphClone = (cardEl, fromRect) => {
            const clone = cardEl.cloneNode(true);
            clone.classList.add('case-morph-clone');
            clone.setAttribute('aria-hidden', 'true');
            clone.removeAttribute('href');
            clone.style.left = `${fromRect.left}px`;
            clone.style.top = `${fromRect.top}px`;
            clone.style.width = `${fromRect.width}px`;
            clone.style.height = `${fromRect.height}px`;
            document.body.appendChild(clone);
            return clone;
        };

        const prepCaseWindowForMorph = () => {
            setCaseLayout(true);
            clearCaseMotion();
            caseWindow.classList.remove('minimized');
            caseWindow.classList.remove('is-closing');
            caseWindow.classList.add('visible', 'is-opening', 'morph-prep');
        };

        const finishCaseWindowOpen = (revealWindow = true) => {
            if (revealWindow) {
                caseWindow.classList.remove('morph-prep');
            }
            caseMotionTimer = window.setTimeout(() => {
                clearCaseMotion();
            }, CASE_ANIM_MS);
        };

        const morphCardToCaseWindow = async (cardEl) => {
            if (!cardEl || prefersReducedMotion) return false;

            cleanupActiveMorph();

            const fromRect = cardEl.getBoundingClientRect();
            if (!fromRect.width || !fromRect.height) return false;

            const clone = createCardMorphClone(cardEl, fromRect);
            const sourceVisibility = cardEl.style.visibility;
            cardEl.style.visibility = 'hidden';

            let cleaned = false;
            const cleanup = () => {
                if (cleaned) return;
                cleaned = true;
                clone.remove();
                cardEl.style.visibility = sourceVisibility;
                caseWindow.classList.remove('morph-prep');
                activeMorphCleanup = null;
            };
            prepCaseWindowForMorph();
            activeMorphCleanup = cleanup;
            await nextFrame();
            await nextFrame();

            const toRect = caseWindow.getBoundingClientRect();
            morphRevealTimer = window.setTimeout(() => {
                caseWindow.classList.remove('morph-prep');
                morphRevealTimer = null;
            }, Math.round(CASE_MORPH_MS * 0.62));

            const animation = clone.animate([
                {
                    opacity: 1,
                    left: `${fromRect.left}px`,
                    top: `${fromRect.top}px`,
                    width: `${fromRect.width}px`,
                    height: `${fromRect.height}px`,
                    borderRadius: `${Math.min(fromRect.width, fromRect.height) * 0.08}px`,
                    boxShadow: '1px 5px 0px rgba(0, 0, 0, 0.06)'
                },
                {
                    offset: 0.78,
                    opacity: 1,
                    left: `${toRect.left}px`,
                    top: `${toRect.top}px`,
                    width: `${toRect.width}px`,
                    height: `${toRect.height}px`,
                    borderRadius: '28px',
                    boxShadow: '0 20px 64px rgba(0, 0, 0, 0.16)'
                },
                {
                    opacity: 0,
                    left: `${toRect.left}px`,
                    top: `${toRect.top}px`,
                    width: `${toRect.width}px`,
                    height: `${toRect.height}px`,
                    borderRadius: '28px',
                    boxShadow: '0 20px 64px rgba(0, 0, 0, 0.16)'
                }
            ], {
                duration: CASE_MORPH_MS,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'forwards'
            });

            try {
                await animation.finished;
            } catch (error) {
                cleanup();
                return false;
            }

            cleanup();
            return true;
        };

        const clearCaseMotion = () => {
            if (caseMotionTimer) {
                window.clearTimeout(caseMotionTimer);
                caseMotionTimer = null;
            }
            cleanupActiveMorph();
            caseWindow.classList.remove('is-opening');
            caseWindow.classList.remove('is-closing');
        };

        const syncFullscreenUi = () => {
            const isExpanded = caseWindow.classList.contains('expanded-height');
            if (fullscreenToggleBtn) {
                fullscreenToggleBtn.setAttribute('aria-label', isExpanded ? 'Exit full screen' : 'Toggle full screen');
                fullscreenToggleBtn.setAttribute('title', isExpanded ? 'Exit full screen' : 'Full screen');
                const label = fullscreenToggleBtn.querySelector('.f-fullscreen-label');
                if (label) label.textContent = isExpanded ? 'Windowed' : 'Full screen';
            }
            if (expandBtn) {
                expandBtn.setAttribute('title', isExpanded ? 'Windowed' : 'Expand');
                expandBtn.setAttribute('aria-pressed', isExpanded ? 'true' : 'false');
            }
        };

        const toggleCaseFullscreen = () => {
            if (!caseWindow.classList.contains('visible')) return;
            caseWindow.classList.toggle('expanded-height');
            syncFullscreenUi();
        };

        const finalizeClose = (keepLayout = false) => {
            clearCaseMotion();
            caseWindow.classList.remove('visible');
            caseWindow.classList.remove('minimized');
            caseWindow.classList.remove('expanded-height');
            caseWindow.classList.remove('is-resume-content');
            setBehanceUrl('');
            setDownloadLink('Download', '#', 'Download resume');
            setExternalLink('Visit', '#', 'Visit Site');
            syncFullscreenUi();
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

        const hydrateCaseContent = (data) => {
            caseWindow.classList.remove('is-external-content');
            if (titleDisp) titleDisp.textContent = data.title;
            contentArea.innerHTML = `
                ${data.images.map((img, index) => `<img src="${img}" alt="Case Image" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async" fetchpriority="${index === 0 ? 'high' : 'low'}">`).join('')}
            `;
            contentArea.scrollTop = 0;
        };

        const showCase = async (data, caseHref = '', sourceCard = null) => {
            hydrateCaseContent(data);
            activeCaseHref = caseHref;
            syncOpenButton();
            setBehanceUrl(data.behanceUrl || '');

            setCaseLayout(true);
            clearCaseMotion();
            caseWindow.classList.remove('minimized');
            caseWindow.classList.remove('expanded-height');
            caseWindow.classList.add('visible');
            caseWindow.classList.add('is-opening');
            contentArea.scrollTop = 0;
            syncFullscreenUi();
            finishCaseWindowOpen();
        };

        const showCaseExternal = (title, embedHref, caseHref = '') => {
            caseWindow.classList.add('is-external-content');
            caseWindow.classList.remove('is-resume-content');
            if (titleDisp) titleDisp.textContent = title;
            contentArea.innerHTML = `<iframe class="case-content-iframe" src="${escapeAttr(embedHref)}" title="${escapeAttr(title)}" loading="lazy"></iframe>`;
            activeCaseHref = caseHref || embedHref;
            if (externalBtn) externalBtn.href = activeCaseHref;
            setExternalLink('Visit', activeCaseHref, 'Open external content in a new tab');
            syncOpenButton();

            setCaseLayout(true);
            clearCaseMotion();
            caseWindow.classList.remove('minimized');
            caseWindow.classList.remove('expanded-height');
            caseWindow.classList.add('visible');
            caseWindow.classList.add('is-opening');
            contentArea.scrollTop = 0;
            syncFullscreenUi();

            caseMotionTimer = window.setTimeout(() => {
                clearCaseMotion();
            }, CASE_ANIM_MS);
        };

        const showResumePanel = () => {
            caseWindow.classList.add('is-external-content', 'is-resume-content');
            if (titleDisp) titleDisp.textContent = 'Resume';
            setDownloadLink('Download', resumePdfHref, 'Download resume PDF');

            contentArea.innerHTML = `<img src="images/Letter - 3.png" alt="Resume for Raghav Prasanna" loading="eager" decoding="async" fetchpriority="high">`;

            activeCaseHref = resumePdfHref;
            setExternalLink('PDF', resumePdfHref, 'Open resume PDF in a new tab');
            syncOpenButton();

            setCaseLayout(true);
            clearCaseMotion();
            caseWindow.classList.remove('minimized');
            caseWindow.classList.remove('expanded-height');
            caseWindow.classList.add('visible', 'is-opening');
            contentArea.scrollTop = 0;
            syncFullscreenUi();

            caseMotionTimer = window.setTimeout(() => {
                clearCaseMotion();
            }, CASE_ANIM_MS);
        };

        const openCase = async (caseId, caseHref = '', sourceCard = null) => {
            if (isTransitioning) return;
            const data = SITE_CONFIG.caseData[caseId];
            if (!data) return;
            const resolvedHref = resolveCaseHref(caseId, caseHref);

            if (caseWindow.classList.contains('visible')) {
                isTransitioning = true;
                closeCase({ keepLayout: true });
                window.setTimeout(async () => {
                    await showCase(data, resolvedHref, sourceCard);
                    isTransitioning = false;
                }, CASE_ANIM_MS + 20);
            } else {
                await showCase(data, resolvedHref, sourceCard);
            }
        };

        const openExternalCase = (title, href) => {
            if (isTransitioning) return;
            const resolvedHref = normalizeHref(href);
            if (!resolvedHref) return;
            const resolvedTitle = (typeof title === 'string' && title.trim()) ? title.trim() : 'Article';

            if (resolvedHref === resumePdfHref || resolvedTitle.toLowerCase() === 'resume') {
                if (caseWindow.classList.contains('visible')) {
                    isTransitioning = true;
                    closeCase({ keepLayout: true });
                    window.setTimeout(() => {
                        showResumePanel();
                        isTransitioning = false;
                    }, CASE_ANIM_MS + 20);
                } else {
                    showResumePanel();
                }
                return;
            }

            if (caseWindow.classList.contains('visible')) {
                isTransitioning = true;
                closeCase({ keepLayout: true });
                window.setTimeout(() => {
                    showCaseExternal(resolvedTitle, resolvedHref, resolvedHref);
                    isTransitioning = false;
                }, CASE_ANIM_MS + 20);
            } else {
                showCaseExternal(resolvedTitle, resolvedHref, resolvedHref);
            }
        };

        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const caseId = card.getAttribute('data-case');
                const caseHref = card.getAttribute('href');
                openCase(caseId, caseHref, card);
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeCase);
        }

        minBtn?.addEventListener('click', () => {
            if (!caseWindow.classList.contains('visible')) return;
            caseWindow.classList.remove('expanded-height');
            caseWindow.classList.toggle('minimized');
            syncFullscreenUi();
        });

        expandBtn?.addEventListener('click', toggleCaseFullscreen);
        fullscreenToggleBtn?.addEventListener('click', toggleCaseFullscreen);

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
            isVisible: () => caseWindow.classList.contains('visible') || caseWindow.classList.contains('is-closing'),
            openExternal: ({ title = 'Article', href = '' } = {}) => openExternalCase(title, href),
            getActiveHref: () => activeCaseHref,
            getActiveTitle: () => (titleDisp ? titleDisp.textContent || '' : '')
        };

        // Listen for all side-panel-trigger links
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.side-panel-trigger');
            if (trigger) {
                e.preventDefault();
                const href = trigger.getAttribute('href');
                const title = trigger.getAttribute('data-title') || trigger.textContent.trim() || 'Website';
                window.CaseOverlayControl.openExternal({ title, href });
            }
        });
    },
    pillSizes: {
        collapsed: {
            r1: { w: '4px', h: '20px', c: '#ffffffff', br: '99px' },
            r2: { w: '10px', h: '10px', c: '#ffffffff', br: '99px' },
            r3: { w: '25px', h: '24px', c: '#ffffffff', br: '99px' },
            r4: { w: '8px', h: '34px', c: '#ffffffff', br: '99px' },
            r5: { w: '10px', h: '10px', c: '#ffffffff', br: '99px' },
            r6: { w: '8px', h: '34px', c: '#ffffffff', br: '99px' },
            r7: { w: '8px', h: '34px', c: '#ffffffff', br: '99px' },

            container: { w: '280px', h: '56px', c: '#ffffff' }
        },
        expanded: {
            r1: { w: '74px', h: '44px', c: '#e7e7e7', br: '99px' },
            r2: { w: '29px', h: '8px', c: '#e7e7e7', br: '14px' },
            r3: { w: '49px', h: '44px', c: '#e7e7e7', br: '99px' },
            r4: { w: '74px', h: '44px', c: '#e7e7e7', br: '99px' },
            r5: { w: '29px', h: '8px', c: '#e7e7e7', br: '22px' },
            r6: { w: '74px', h: '44px', c: '#e7e7e7', br: '99px' },
            r7: { w: '74px', h: '44px', c: '#e7e7e7', br: '99px' },

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

    setProps('1', sizes.r1);
    setProps('2', sizes.r2);
    setProps('3', sizes.r3);
    setProps('4', sizes.r4);
    setProps('5', sizes.r5);
    setProps('6', sizes.r6);
    setProps('7', sizes.r7);

    if (sizes.container) {
        if (sizes.container.w) root.style.setProperty('--pill-container-w', sizes.container.w);
        if (sizes.container.h) root.style.setProperty('--pill-container-h', sizes.container.h);
        if (sizes.container.c) root.style.setProperty('--pill-container-c', sizes.container.c);
    }
}

const device = document.getElementById('portfolio-device');
const topBar = document.getElementById('top-bar');
const topBarPill = document.querySelector('.top-bar-pill');
const pillButtonsUnified = document.querySelector('.pill-buttons-unified');
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
const pillFourthBtn = document.getElementById('pill-fourth-btn');
const pillFifthBtn = document.getElementById('pill-fifth-btn');
const resumePopoutEl = document.getElementById('resume-popout');
const readerInlineEl = document.getElementById('reader-inline');
const recruiterInlineEl = document.getElementById('recruiter-inline');
const recruiterHeaderEl = recruiterInlineEl?.querySelector('.recruiter-header');
const talkSceneEl = document.getElementById('talk-inline');
const talkContainerEl = document.getElementById('talk-container-3d');
const talkUiSourceEl = document.getElementById('talk-ui-source');
const talkLoadingOverlayEl = document.getElementById('talk-loading-overlay');
const pageOverlayEl = document.getElementById('page-overlay');
const showResumeBtn = document.getElementById('show-resume-btn');
const showIdBtn = document.getElementById('show-id-btn');
const resumeCardDock = document.getElementById('resume-card-dock');
const idCardDock = document.getElementById('id-card-dock');
const scrollableContentEl = document.getElementById('scrollable-content');

function initManagedCarousel(miniCarousel) {
    if (!miniCarousel || miniCarousel.dataset.carouselInitialized === 'true') return;

    const track = miniCarousel.querySelector('.carousel-track');
    const images = Array.from(miniCarousel.querySelectorAll('.carousel-track img'));
    let indicators = Array.from(miniCarousel.querySelectorAll('.indicator'));
    if (!track || images.length <= 1) return;

    // Dynamically align indicators if they do not match the image count
    const indicatorsContainer = miniCarousel.querySelector('.carousel-indicators');
    if (indicatorsContainer && indicators.length !== images.length) {
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < images.length; i++) {
            const span = document.createElement('span');
            span.className = 'indicator' + (i === 0 ? ' active' : '');
            indicatorsContainer.appendChild(span);
        }
        indicators = Array.from(indicatorsContainer.querySelectorAll('.indicator'));
    }

    miniCarousel.dataset.carouselInitialized = 'true';

    let currentIndex = 0;
    let intervalId = 0;
    let isVisible = true;

    const applySlide = (nextIndex) => {
        indicators[currentIndex]?.classList.remove('active');
        images[currentIndex]?.classList.remove('active');

        currentIndex = nextIndex;

        indicators[currentIndex]?.classList.add('active');
        images[currentIndex]?.classList.add('active');
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const tick = () => {
        if (document.hidden || !isVisible) return;
        applySlide((currentIndex + 1) % images.length);
    };

    const start = () => {
        if (intervalId) return;
        intervalId = window.setInterval(tick, 2000);
    };

    const stop = () => {
        if (!intervalId) return;
        window.clearInterval(intervalId);
        intervalId = 0;
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = Boolean(entry?.isIntersecting);
            if (isVisible && !document.hidden) start();
            else stop();
        }, {
            root: scrollableContentEl || null,
            threshold: 0.35
        });
        observer.observe(miniCarousel);
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden || !isVisible) stop();
        else start();
    });

    start();
}

function initModelViewerPerformance() {
    const modelViewers = Array.from(document.querySelectorAll('model-viewer[data-auto-rotate-managed]'));
    if (!modelViewers.length) return;

    const root = scrollableContentEl || null;
    const syncModelState = (modelViewer, isVisible) => {
        const shouldAnimate = isVisible && !document.hidden;
        const shouldAutoRotate = modelViewer.dataset.defaultAutoRotate === 'true' && shouldAnimate;

        if (shouldAutoRotate) modelViewer.setAttribute('auto-rotate', '');
        else modelViewer.removeAttribute('auto-rotate');
    };

    modelViewers.forEach((modelViewer) => {
        modelViewer.dataset.defaultAutoRotate = modelViewer.hasAttribute('auto-rotate') ? 'true' : 'false';
        modelViewer.dataset.isVisible = 'false';
    });

    const observer = 'IntersectionObserver' in window
        ? new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const modelViewer = entry.target;
                const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.12;
                modelViewer.dataset.isVisible = isVisible ? 'true' : 'false';

                if (modelViewer.dataset.src && !modelViewer.getAttribute('src') && entry.isIntersecting) {
                    modelViewer.setAttribute('src', modelViewer.dataset.src);
                }

                syncModelState(modelViewer, isVisible);
            });
        }, {
            root,
            rootMargin: '240px 0px',
            threshold: [0, 0.12, 0.35]
        })
        : null;

    modelViewers.forEach((modelViewer) => {
        if (observer) {
            observer.observe(modelViewer);
        } else {
            if (modelViewer.dataset.src && !modelViewer.getAttribute('src')) {
                modelViewer.setAttribute('src', modelViewer.dataset.src);
            }
            syncModelState(modelViewer, true);
        }
    });

    document.addEventListener('visibilitychange', () => {
        modelViewers.forEach((modelViewer) => {
            syncModelState(modelViewer, modelViewer.dataset.isVisible === 'true');
        });
    });
}

initModelViewerPerformance();

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
    let scrollTarget = 0;
    let scrollCurrent = 0;
    let rafId = 0;
    let timeIntervalId = 0;

    const getThumbTravelLimit = () => {
        const trackEl = leftControlsEl.querySelector('.orb-track-line');
        if (!trackEl) return 0;

        const trackRect = trackEl.getBoundingClientRect();
        const thumbRect = orbCursorHandle.getBoundingClientRect();
        if (!trackRect.height || !thumbRect.height) return 0;

        return Math.max(0, (trackRect.height - thumbRect.height) / 2);
    };

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
        const yOffset = centered * getThumbTravelLimit();
        leftControlsEl.style.setProperty('--orb-thumb-offset-y', `${yOffset.toFixed(2)}px`);
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

function initResumeDockSystem() {
    if (!device || !resumeCardDock) {
        return {
            showPeek: () => { },
            closeToPeek: () => { },
            hide: () => { },
            togglePanel: () => { },
            isVisible: () => false,
            isPanelOpen: () => false,
            isInside: () => false,
            updateAnchor: () => { }
        };
    }

    const resumeCardWrap = resumeCardDock.closest('.resume-card-wrap');
    const resumePdfHref = 'threeD/CV_RESUME-RAGHAV.pdf';

    if (resumeCardWrap && resumeCardWrap.parentElement !== document.body) {
        document.body.appendChild(resumeCardWrap);
    }

    const readCssNumberVar = (name, fallback) => {
        const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        const parsed = Number.parseFloat(raw);
        return Number.isFinite(parsed) ? parsed : fallback;
    };
    const getLayoutZoom = () => {
        const rawZoom = Number.parseFloat(getComputedStyle(document.documentElement).zoom);
        return Number.isFinite(rawZoom) && rawZoom > 0 ? rawZoom : 1;
    };

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const getPeekAutoHideMs = () => Math.max(0, readCssNumberVar('--resume-peek-autohide-ms', 3000));
    const getPeekExposed = () => Math.max(24, readCssNumberVar('--resume-peek-exposed', 60));

    const getDockBounds = () => {
        const rect = resumeCardDock.getBoundingClientRect();
        return {
            width: rect.width || resumeCardDock.offsetWidth || 0,
            height: rect.height || resumeCardDock.offsetHeight || 0
        };
    };

    const setDockPosition = (left, top) => {
        const { width, height } = getDockBounds();
        const padding = 8;
        const maxLeft = Math.max(padding, window.innerWidth - width - padding);
        const maxTop = Math.max(padding, window.innerHeight - height - padding);
        resumeCardDock.style.left = `${clamp(left, padding, maxLeft)}px`;
        resumeCardDock.style.top = `${clamp(top, padding, maxTop)}px`;
    };

    let active = false;
    let peekVisible = false;
    let peekHideTimer = 0;

    const clearPeekHideTimer = () => {
        if (!peekHideTimer) return;
        window.clearTimeout(peekHideTimer);
        peekHideTimer = 0;
    };

    const isPanelOpen = () => {
        const overlay = window.CaseOverlayControl;
        return Boolean(
            overlay?.isVisible?.() &&
            (overlay?.getActiveHref?.() || '') === resumePdfHref
        );
    };

    const openPanel = () => {
        const overlay = window.CaseOverlayControl;
        if (overlay?.openExternal) {
            overlay.openExternal({ title: 'Resume', href: resumePdfHref });
        } else {
            window.open(resumePdfHref, '_blank', 'noopener,noreferrer');
        }
    };

    const closePanel = () => {
        const overlay = window.CaseOverlayControl;
        if (isPanelOpen()) {
            overlay?.close?.();
        }
    };

    const hidePeekOnly = () => {
        peekVisible = false;
        clearPeekHideTimer();
        resumeCardWrap?.setAttribute('aria-hidden', 'true');
        resumeCardDock.classList.remove('visible');
        resumeCardDock.setAttribute('aria-expanded', 'false');
    };

    const updateAnchor = () => {
        const zoom = getLayoutZoom();
        const rect = device.getBoundingClientRect();
        const deviceLeft = rect.left / zoom;
        const deviceTop = rect.top / zoom;
        const deviceHeight = rect.height / zoom;
        const padding = 8;
        const anchorYRatio = readCssNumberVar('--resume-anchor-y-ratio', 0.52);
        const offsetY = readCssNumberVar('--resume-anchor-offset-y', 14);
        const { width } = getDockBounds();
        const buttonRect = showResumeBtn?.getBoundingClientRect();
        const anchorY = buttonRect?.height
            ? (buttonRect.top / zoom) + ((buttonRect.height / zoom) / 2) + offsetY
            : deviceTop + (deviceHeight * anchorYRatio) + offsetY;
        const left = deviceLeft - getPeekExposed();
        const top = clamp(anchorY, padding, (window.innerHeight / zoom) - padding);
        setDockPosition(left, top);
    };

    const schedulePeekAutoHide = () => {
        clearPeekHideTimer();
        if (!peekVisible || isPanelOpen()) return;
        const hideDelay = getPeekAutoHideMs();
        if (hideDelay <= 0) return;

        peekHideTimer = window.setTimeout(() => {
            if (!peekVisible || isPanelOpen()) return;
            hide();
        }, hideDelay);
    };

    const showPeek = () => {
        active = true;
        peekVisible = true;
        resumeCardWrap?.setAttribute('aria-hidden', 'false');
        resumeCardDock.classList.add('visible');
        resumeCardDock.setAttribute('aria-expanded', isPanelOpen() ? 'true' : 'false');
        updateAnchor();
        schedulePeekAutoHide();
    };

    const hide = () => {
        active = false;
        hidePeekOnly();
        closePanel();
    };

    const closeToPeek = () => {
        if (!active) return;
        closePanel();
        showPeek();
    };

    const togglePanel = () => {
        if (isPanelOpen()) {
            closeToPeek();
            return;
        }
        active = true;
        hidePeekOnly();
        openPanel();
    };

    resumeCardDock.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        togglePanel();
    });

    window.addEventListener('resize', () => {
        if (!active || !peekVisible) return;
        updateAnchor();
    });
    window.addEventListener('orientationchange', () => {
        if (!active || !peekVisible) return;
        updateAnchor();
    });
    window.addEventListener('scroll', () => {
        if (!active) return;
        if (isPanelOpen()) {
            // Panel is open and user scrolled — hide everything completely.
            // Don't closeToPeek() here: that would re-show the floating dock
            // which then drifts as the user scrolls. They can press Show Resume again.
            hide();
            return;
        }
        if (peekVisible) updateAnchor();
    }, { passive: true });

    const observer = new MutationObserver(() => {
        if (!device.classList.contains('expanded')) {
            hide();
        } else if (active && peekVisible) {
            updateAnchor();
        }
    });
    observer.observe(device, { attributes: true, attributeFilter: ['class'] });

    updateAnchor();

    return {
        showPeek,
        closeToPeek,
        hide,
        togglePanel,
        isVisible: () => active,
        isPanelOpen,
        isInside: (target) => Boolean(peekVisible && target instanceof Node && resumeCardDock.contains(target)),
        updateAnchor
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
    const getLayoutZoom = () => {
        const rawZoom = Number.parseFloat(getComputedStyle(document.documentElement).zoom);
        return Number.isFinite(rawZoom) && rawZoom > 0 ? rawZoom : 1;
    };

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const getPeekAutoHideMs = () => Math.max(0, readCssNumberVar('--id-peek-autohide-ms', 6000));
    const getPeekExposed = () => Math.max(28, readCssNumberVar('--id-peek-exposed', 72));
    const getOpenHoverTiltDeg = () => Math.max(0, readCssNumberVar('--id-open-hover-tilt-deg', 7));
    const getOpenHoverDriftPx = () => Math.max(0, readCssNumberVar('--id-open-hover-drift-px', 14));
    const getOpenHoverCenterX = () => readCssNumberVar('--id-open-hover-center-x', 0.5);
    const getOpenHoverCenterY = () => readCssNumberVar('--id-open-hover-center-y', 0.5);

    const getDockBounds = () => {
        const rect = idCardDock.getBoundingClientRect();
        return {
            width: rect.width || idCardDock.offsetWidth || 0,
            height: rect.height || idCardDock.offsetHeight || 0
        };
    };

    const setDockPosition = (left, top, boundsOverride = null) => {
        const measured = boundsOverride || getDockBounds();
        const { width, height } = measured;
        const padding = 8;
        const maxLeft = Math.max(padding, window.innerWidth - width - padding);
        const maxTop = Math.max(padding, window.innerHeight - height - padding);
        idCardDock.style.left = `${clamp(left, padding, maxLeft)}px`;
        idCardDock.style.top = `${clamp(top, padding, maxTop)}px`;
    };

    const state = {
        visible: false,
        open: false
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsHoverMotion = !window.matchMedia('(pointer: coarse)').matches && !prefersReducedMotion;

    let peekHideTimer = 0;
    let lastClosedWidth = 0;
    let lastPeekLeft = null;
    let lastPeekTop = null;

    const scheduleClosedPeekReanchor = () => {
        window.requestAnimationFrame(() => updateAnchor());
        window.setTimeout(() => {
            if (state.visible && !state.open) updateAnchor();
        }, 220);
        window.setTimeout(() => {
            if (state.visible && !state.open) {
                // Re-measure width now that the CSS close transition has finished,
                // so future cycles have an accurate lastClosedWidth.
                rememberClosedWidth();
                updateAnchor();
            }
        }, 460);
    };

    const clearPeekHideTimer = () => {
        if (!peekHideTimer) return;
        window.clearTimeout(peekHideTimer);
        peekHideTimer = 0;
    };

    const rememberClosedWidth = () => {
        if (state.open) return;
        const { width } = getDockBounds();
        if (width > 0) lastClosedWidth = width;
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
        const zoom = getLayoutZoom();
        const rect = device.getBoundingClientRect();
        const deviceLeft = rect.left / zoom;
        const deviceRight = rect.right / zoom;
        const deviceTop = rect.top / zoom;
        const deviceWidth = rect.width / zoom;
        const deviceHeight = rect.height / zoom;
        const anchorOffsetX = readCssNumberVar('--id-anchor-offset-x', 6);
        const anchorYRatio = readCssNumberVar('--id-anchor-y-ratio', 0.52);
        const openAnchorXRatio = readCssNumberVar('--id-open-anchor-x-ratio', 0.5);
        const openAnchorYRatio = readCssNumberVar('--id-open-anchor-y-ratio', 0.5);
        const buttonRect = showIdBtn?.getBoundingClientRect();
        const padding = 8;

        if (state.open) {
            idCardDock.style.left = `${deviceLeft + (deviceWidth * openAnchorXRatio)}px`;
            idCardDock.style.top = `${deviceTop + (deviceHeight * openAnchorYRatio)}px`;
            return;
        }

        const measuredBounds = getDockBounds();
        const width = lastClosedWidth || measuredBounds.width;
        const height = measuredBounds.height;
        const anchorY = buttonRect?.height
            ? (buttonRect.top / zoom) + ((buttonRect.height / zoom) / 2)
            : deviceTop + (deviceHeight * anchorYRatio);
        const left = deviceRight - width + getPeekExposed() + anchorOffsetX;
        const top = clamp(anchorY, padding, (window.innerHeight / zoom) - padding);
        // Cache the correctly-computed peek position for use by closeToPeek()
        lastPeekLeft = left;
        lastPeekTop = top;
        setDockPosition(left, top, { width, height });
    };

    const hide = () => {
        state.visible = false;
        state.open = false;
        clearPeekHideTimer();
        resetOpenHoverMotion();
        idCardWrap?.classList.remove('is-open-layer');
        idCardWrap?.setAttribute('aria-hidden', 'true');
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
        idCardWrap?.setAttribute('aria-hidden', 'false');
        idCardDock.classList.add('visible');
        idCardDock.classList.remove('is-open');
        idCardDock.setAttribute('aria-expanded', 'false');
        rememberClosedWidth();
        updateAnchor();
        scheduleClosedPeekReanchor();
        schedulePeekAutoHide();
    };

    const openCard = () => {
        if (!state.visible) showPeek();
        state.open = true;
        clearPeekHideTimer();
        resetOpenHoverMotion();
        idCardWrap?.classList.add('is-open-layer');
        idCardWrap?.setAttribute('aria-hidden', 'false');
        idCardDock.classList.add('is-open');
        idCardDock.setAttribute('aria-expanded', 'true');
        updateAnchor();
    };

    const closeToPeek = () => {
        if (!state.visible) return;
        state.open = false;
        resetOpenHoverMotion();
        idCardWrap?.classList.remove('is-open-layer');
        idCardWrap?.setAttribute('aria-hidden', 'false');
        idCardDock.classList.remove('is-open');
        idCardDock.setAttribute('aria-expanded', 'false');
        // Restore from cached peek position rather than recalculating.
        // Recalculating immediately after removing is-open-layer causes a dirty layout read:
        // the overlay isn't repainted yet so getBoundingClientRect() returns a stale top value,
        // making the card appear slightly above its correct position before snapping down.
        if (lastPeekLeft !== null && lastPeekTop !== null) {
            const bounds = getDockBounds();
            setDockPosition(lastPeekLeft, lastPeekTop, {
                width: lastClosedWidth || bounds.width,
                height: bounds.height
            });
        } else {
            // Fallback: no cache yet, recalculate (first-ever open/close cycle)
            updateAnchor();
        }
        scheduleClosedPeekReanchor();
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

    rememberClosedWidth();
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
let backgroundWarmupPromise = null;

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
    if (backgroundMatrixInstance) {
        applyMatrixPausedState();
        return backgroundMatrixInstance;
    }

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
    return backgroundMatrixInstance;
}

function ensureBackgroundsReady({ defer = false } = {}) {
    if (backgroundMatrixInstance) return Promise.resolve(backgroundMatrixInstance);
    if (backgroundWarmupPromise) return backgroundWarmupPromise;

    backgroundWarmupPromise = new Promise((resolve) => {
        const boot = () => resolve(initBackgrounds());
        if (defer && 'requestIdleCallback' in window) {
            window.requestIdleCallback(boot, { timeout: 1200 });
        } else if (defer) {
            window.setTimeout(boot, 180);
        } else {
            boot();
        }
    }).finally(() => {
        backgroundWarmupPromise = null;
    });

    return backgroundWarmupPromise;
}

let deviceTransitionTimerId = 0;
function withTemporaryDeviceTransition(loadFn, { duration = 760, phase = null } = {}) {
    if (deviceTransitionTimerId) {
        window.clearTimeout(deviceTransitionTimerId);
        deviceTransitionTimerId = 0;
    }

    document.body.classList.remove('device-opening', 'device-closing');
    document.body.classList.add('device-transitioning');
    if (phase === 'opening' || phase === 'closing') {
        document.body.classList.add(`device-${phase}`);
    }

    const shouldTemporarilyPauseMatrix = backgroundMatrixInstance && !matrixPaused;
    if (shouldTemporarilyPauseMatrix) {
        backgroundMatrixInstance.setPaused(true);
    }
    loadFn();

    deviceTransitionTimerId = window.setTimeout(() => {
        document.body.classList.remove('device-transitioning');
        document.body.classList.remove('device-opening', 'device-closing');
        if (shouldTemporarilyPauseMatrix && backgroundMatrixInstance) {
            backgroundMatrixInstance.setPaused(false);
        }
        deviceTransitionTimerId = 0;
    }, duration);
}

let hasPrimedExpandableAssets = false;
function primeExpandableAssets() {
    if (hasPrimedExpandableAssets) return;
    hasPrimedExpandableAssets = true;

    const imageUrls = Array.from(document.querySelectorAll('.site-content img'))
        .map((img) => img.currentSrc || img.getAttribute('src'))
        .filter(Boolean);
    imageUrls.slice(0, 10).forEach((url) => {
        const warm = new Image();
        warm.decoding = 'async';
        warm.src = url;
    });

    const modelUrls = Array.from(document.querySelectorAll('model-viewer[src], model-viewer[data-src]'))
        .map((viewer) => viewer.getAttribute('src') || viewer.getAttribute('data-src'))
        .filter(Boolean);
    modelUrls.forEach((modelUrl) => {
        fetch(modelUrl, { cache: 'force-cache' }).catch(() => { });
    });

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

    const clearBtn = document.getElementById('pixel-clear-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearPixelCanvas);
    }
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

function drawRandomArt(count = 8) {
    if (!pixelCtx || !pixelCanvas) return;
    const res = SITE_CONFIG.pixel.resolution;
    const colors = SITE_CONFIG.pixel.palette;

    for (let i = 0; i < count; i++) {
        // Pick random color from palette
        pixelCtx.fillStyle = colors[Math.floor(Math.random() * (colors.length - 1)) + 1];

        const isHorizontal = Math.random() > 0.5;
        const x = Math.floor(Math.random() * res);
        const y = Math.floor(Math.random() * res);
        const length = Math.floor(Math.random() * (res * 0.4)) + 5;

        if (isHorizontal) {
            pixelCtx.fillRect(x, y, length, 1);
        } else {
            pixelCtx.fillRect(x, y, 1, length);
        }
    }
}

function drawPremadeArt() {
    drawRandomArt();
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
    const portfolioSection = document.querySelector('.projects-section');
    if (!cards.length || !portfolioSection) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || coarsePointer) return;

    const MAX_TILT_DEG = 8;
    const MAX_SHIFT_PX = 10;
    const haloEl = document.createElement('div');
    haloEl.className = 'featured-card-ray-halo';
    portfolioSection.appendChild(haloEl);
    let activeCard = null;

    const positionHalo = (card, pointerEvent = null) => {
        if (!card) return;
        const sectionRect = portfolioSection.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        if (!sectionRect.width || !cardRect.width) return;

        const pointerXRatio = pointerEvent ? Math.max(0, Math.min(1, (pointerEvent.clientX - cardRect.left) / cardRect.width)) : 0.5;
        const cardCenterX = (cardRect.left - sectionRect.left) + (cardRect.width * 0.5);
        const cardCenterY = (cardRect.top - sectionRect.top) + (cardRect.height * 0.5);
        const haloWidth = Math.max(cardRect.width * 1.35, 260);
        const haloHeight = Math.max(cardRect.height * 2.25, 420);
        const rayDriftX = (pointerXRatio - 0.5) * 14;

        haloEl.style.setProperty('--ray-x', `${cardCenterX + rayDriftX}px`);
        haloEl.style.setProperty('--ray-y', `${cardCenterY}px`);
        haloEl.style.setProperty('--ray-w', `${haloWidth}px`);
        haloEl.style.setProperty('--ray-h', `${haloHeight}px`);
        haloEl.style.transform = 'translate(-50%, -50%)';
    };

    const showHalo = (card, pointerEvent = null) => {
        if (document.body.classList.contains('case-open')) return;
        activeCard = card;
        positionHalo(card, pointerEvent);
        haloEl.classList.add('is-active');
    };

    const hideHalo = () => {
        activeCard = null;
        haloEl.classList.remove('is-active');
    };

    const syncActiveHalo = () => {
        if (!activeCard) return;
        positionHalo(activeCard);
    };

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
            showHalo(card, event);
        }, { passive: true });

        card.addEventListener('pointerenter', (event) => {
            showHalo(card, event);
        }, { passive: true });

        card.addEventListener('focus', () => {
            showHalo(card);
        });

        card.addEventListener('click', () => {
            resetMotion();
            hideHalo();
        });

        card.addEventListener('blur', () => {
            if (activeCard === card) hideHalo();
        });

        card.addEventListener('pointerleave', () => {
            resetMotion();
            if (activeCard === card) hideHalo();
        });
        card.addEventListener('pointercancel', () => {
            resetMotion();
            if (activeCard === card) hideHalo();
        });
        card.addEventListener('lostpointercapture', () => {
            resetMotion();
            if (activeCard === card) hideHalo();
        });

        resetMotion();
    });

    scrollableContentEl?.addEventListener('scroll', syncActiveHalo, { passive: true });
    window.addEventListener('resize', syncActiveHalo);
    window.addEventListener('orientationchange', syncActiveHalo);
    document.addEventListener('pointerdown', (event) => {
        if (!(event.target instanceof Element)) return;
        if (event.target.closest('.featured-card')) return;
        hideHalo();
    }, { passive: true });

    if (caseWindowEl) {
        const caseWindowObserver = new MutationObserver(() => {
            if (caseWindowEl.classList.contains('visible') || caseWindowEl.classList.contains('is-opening')) {
                hideHalo();
            }
        });
        caseWindowObserver.observe(caseWindowEl, { attributes: true, attributeFilter: ['class'] });
    }
}

function initDeviceWindowNudge() {
    const device = document.getElementById('portfolio-device');
    const caseWindowEl = document.getElementById('case-study-window');
    const edgeHandles = Array.from(device?.querySelectorAll('[data-resize-handle]') || []);
    if (!device || !edgeHandles.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const MIN_WIDTH = 360;
    const MIN_HEIGHT = 560;
    const DEFAULT_WIDTH = 450;
    const RECRUITER_DEFAULT_WIDTH = 1240;
    const PREVIEW_THRESHOLD = 0.72;
    const DRAG_THRESHOLD = 3;
    const HANDLE_REVEAL_THRESHOLD = 34;
    const CLICK_SUPPRESS_MS = 420;

    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let originWidth = DEFAULT_WIDTH;
    let originHeight = Math.min(window.innerHeight * 0.8, 980);
    let committedWidth = DEFAULT_WIDTH;
    let committedHeight = Math.min(window.innerHeight * 0.8, 980);
    let resizing = false;
    let activeHandle = null;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const defaultHeight = () => Math.min(window.innerHeight * 0.8, 980);
    const maxWidth = () => {
        const modeLimit = device.classList.contains('recruiter-mode') ? RECRUITER_DEFAULT_WIDTH : 760;
        return Math.max(MIN_WIDTH, Math.min(window.innerWidth - 52, modeLimit));
    };
    const maxHeight = () => Math.max(MIN_HEIGHT, Math.min(window.innerHeight - 24, 980));

    const readCurrentSize = () => ({
        width: Number.parseFloat(getComputedStyle(device).width) || committedWidth || DEFAULT_WIDTH,
        height: Number.parseFloat(getComputedStyle(device).height) || committedHeight || defaultHeight()
    });

    const applySize = (width, height, scale = 1) => {
        document.documentElement.style.setProperty('--recruiter-resize-width', `${width.toFixed(2)}px`);
        document.documentElement.style.setProperty('--recruiter-resize-height', `${height.toFixed(2)}px`);
        document.documentElement.style.setProperty('--device-shell-scale', scale.toFixed(3));
    };

    const commitSize = (width, height, scale = 1) => {
        committedWidth = clamp(width, MIN_WIDTH, maxWidth());
        committedHeight = clamp(height, MIN_HEIGHT, maxHeight());
        applySize(committedWidth, committedHeight, scale);
        updateResizeState(committedWidth, committedHeight);
    };

    const updateResizeState = (width, height) => {
        device.classList.toggle('is-resize-squeezed', width <= 430);
        device.classList.toggle('is-resize-wide', width >= 560);
        device.classList.toggle('is-resize-tall', height >= 840);
    };

    const clearResizeState = () => {
        device.classList.remove('is-resize-squeezed', 'is-resize-wide', 'is-resize-tall', 'is-window-resizing', 'is-resize-preview');
        document.documentElement.style.setProperty('--device-shell-scale', '1');
    };

    const clearVisibleHandles = () => {
        edgeHandles.forEach((handle) => {
            handle.classList.remove('is-visible');
            handle.classList.remove('is-dragging');
        });
    };

    const showAllHandles = () => {
        edgeHandles.forEach((handle) => {
            handle.classList.add('is-visible');
        });
    };

    const clearPreview = () => {
        device.classList.remove('is-resize-preview');
        device.classList.remove('is-window-resizing');
        document.documentElement.style.setProperty('--device-shell-scale', '1');
    };

    const canResize = () => (
        device.classList.contains('expanded') &&
        device.classList.contains('recruiter-mode') &&
        !device.classList.contains('maximized') &&
        !document.body.classList.contains('case-open')
    );

    const isNearDeviceEdge = (event) => {
        if (!canResize()) return false;

        const rect = device.getBoundingClientRect();
        const withinExtendedX = event.clientX >= rect.left - HANDLE_REVEAL_THRESHOLD && event.clientX <= rect.right + HANDLE_REVEAL_THRESHOLD;
        const withinExtendedY = event.clientY >= rect.top - HANDLE_REVEAL_THRESHOLD && event.clientY <= rect.bottom + HANDLE_REVEAL_THRESHOLD;
        if (!withinExtendedX || !withinExtendedY) return false;

        const nearLeft = Math.abs(event.clientX - rect.left) <= HANDLE_REVEAL_THRESHOLD;
        const nearRight = Math.abs(event.clientX - rect.right) <= HANDLE_REVEAL_THRESHOLD;
        const nearTop = Math.abs(event.clientY - rect.top) <= HANDLE_REVEAL_THRESHOLD;
        const nearBottom = Math.abs(event.clientY - rect.bottom) <= HANDLE_REVEAL_THRESHOLD;
        return nearLeft || nearRight || nearTop || nearBottom;
    };

    const syncHandleVisibility = (event) => {
        if (resizing || pointerId !== null) return;

        if (isNearDeviceEdge(event)) {
            showAllHandles();
        } else {
            clearVisibleHandles();
        }
    };

    const onPointerMove = (event) => {
        if (event.pointerId !== pointerId || !canResize() || !activeHandle) return;

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;
        const handleName = activeHandle.dataset.resizeHandle || '';
        const widthFactor = handleName.includes('left') ? -2 : 2;
        const heightFactor = handleName.includes('top') ? -2 : 2;
        const nextWidth = clamp(originWidth + (deltaX * widthFactor), MIN_WIDTH, maxWidth());
        const nextHeight = clamp(originHeight + (deltaY * heightFactor), MIN_HEIGHT, maxHeight());
        const movedEnough = Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD;

        if (movedEnough) {
            resizing = true;
            device.classList.add('is-window-resizing');
            activeHandle?.classList.add('is-dragging');
        }

        const widthRange = Math.max(maxWidth() - MIN_WIDTH, 1);
        const heightRange = Math.max(maxHeight() - MIN_HEIGHT, 1);
        const previewProgress = Math.max(
            Math.abs(nextWidth - originWidth) / widthRange,
            Math.abs(nextHeight - originHeight) / heightRange
        );
        const scale = 1 + (previewProgress * 0.014);
        device.classList.toggle('is-resize-preview', previewProgress >= PREVIEW_THRESHOLD);

        applySize(nextWidth, nextHeight, resizing ? scale : 1);
        updateResizeState(nextWidth, nextHeight);
    };

    const finishDrag = () => {
        const releasedHandle = activeHandle;

        if (!resizing) {
            clearPreview();
            clearVisibleHandles();
            pointerId = null;
            activeHandle = null;
            return;
        }

        const current = readCurrentSize();
        commitSize(current.width, current.height, 1);
        clearPreview();
        clearVisibleHandles();
        if (releasedHandle && canResize()) {
            showAllHandles();
        }
        resizing = false;
        pointerId = null;
        activeHandle = null;
        window.__deviceShellSuppressCloseUntil = Date.now() + CLICK_SUPPRESS_MS;
        document.addEventListener('click', (clickEvent) => {
            clickEvent.stopPropagation();
            clickEvent.preventDefault();
        }, { capture: true, once: true });
    };

    const startDrag = (event) => {
        if (!canResize()) return;
        if (!(event.target instanceof Element)) return;
        event.preventDefault();
        event.stopPropagation();

        const handle = event.target.closest('[data-resize-handle]');
        if (!(handle instanceof HTMLElement)) return;

        pointerId = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
        const current = readCurrentSize();
        originWidth = current.width;
        originHeight = current.height;
        committedWidth = current.width;
        committedHeight = current.height;
        resizing = false;
        activeHandle = handle;
        clearVisibleHandles();
        showAllHandles();

        handle.setPointerCapture(pointerId);
    };

    device.addEventListener('pointermove', syncHandleVisibility, { passive: true });
    device.addEventListener('pointerleave', (event) => {
        if (event.relatedTarget instanceof Element && event.relatedTarget.closest('[data-resize-handle]')) {
            return;
        }
        if (!resizing && pointerId === null) {
            clearVisibleHandles();
        }
    });

    edgeHandles.forEach((handle) => {
        handle.addEventListener('pointerdown', startDrag);
        handle.addEventListener('pointermove', onPointerMove, { passive: true });
        handle.addEventListener('pointerup', finishDrag);
        handle.addEventListener('pointercancel', finishDrag);
        handle.addEventListener('lostpointercapture', finishDrag);
    });

    const syncModeDefaults = () => {
        if (device.classList.contains('recruiter-mode')) {
            commitSize(RECRUITER_DEFAULT_WIDTH, Math.min(window.innerHeight * 0.9, 980), 1);
            return;
        }
        clearResizeState();
        clearVisibleHandles();
    };

    const resetNudge = () => {
        syncModeDefaults();
        clearPreview();
        clearVisibleHandles();
        resizing = false;
        pointerId = null;
        activeHandle = null;
    };

    window.addEventListener('resize', resetNudge);
    window.addEventListener('orientationchange', resetNudge);

    if (caseWindowEl) {
        const caseObserver = new MutationObserver(() => {
            if (document.body.classList.contains('case-open')) {
                clearVisibleHandles();
                clearPreview();
            }
        });
        caseObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }

    window.__deviceShellResizeController = {
        syncModeDefaults,
        resetToDefault: resetNudge
    };

    resetNudge();
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

function initRecruiterMode() {
    if (!device) {
        return {
            open: () => { },
            close: () => { },
            toggle: () => { },
            isActive: () => false
        };
    }

    const scrollableContent = document.getElementById('scrollable-content');
    const syncRecruiterPillWidth = () => {
        if (!topBarPill || !pillButtonsUnified) return;
        if (!device.classList.contains('recruiter-mode')) return;
        if (window.matchMedia('(max-width: 640px)').matches) {
            topBarPill.style.removeProperty('--recruiter-pill-target-width');
            return;
        }

        const computed = window.getComputedStyle(topBarPill);
        const paddingLeft = Number.parseFloat(computed.paddingLeft) || 0;
        const paddingRight = Number.parseFloat(computed.paddingRight) || 0;
        const borderLeft = Number.parseFloat(computed.borderLeftWidth) || 0;
        const borderRight = Number.parseFloat(computed.borderRightWidth) || 0;
        const targetWidth = Math.ceil(
            pillButtonsUnified.scrollWidth +
            paddingLeft +
            paddingRight +
            borderLeft +
            borderRight
        );

        topBarPill.style.setProperty('--recruiter-pill-target-width', `${targetWidth}px`);
    };
    const hasVisibleTextContent = (element) => {
        if (!(element instanceof Element)) return false;

        const candidates = element.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li, div');
        for (const node of candidates) {
            if (!(node instanceof HTMLElement)) continue;
            if (!node.textContent || !node.textContent.trim()) continue;

            const style = window.getComputedStyle(node);
            if (style.display === 'none' || style.visibility === 'hidden' || Number.parseFloat(style.opacity || '1') === 0) {
                continue;
            }

            const rects = node.getClientRects();
            if (rects.length > 0) {
                return true;
            }
        }

        return false;
    };

    const syncRecruiterHeaderState = () => {
        if (!recruiterHeaderEl) return;
        const isEmpty = !hasVisibleTextContent(recruiterHeaderEl);
        recruiterHeaderEl.classList.toggle('is-empty', isEmpty);
        device?.classList.toggle('recruiter-header-empty', isEmpty);
    };

    if (recruiterHeaderEl && typeof MutationObserver !== 'undefined') {
        const recruiterHeaderObserver = new MutationObserver(() => {
            syncRecruiterHeaderState();
        });

        recruiterHeaderObserver.observe(recruiterHeaderEl, {
            attributes: true,
            attributeFilter: ['class', 'style', 'hidden'],
            characterData: true,
            childList: true,
            subtree: true
        });
    }

    const open = () => {
        device.classList.add('recruiter-mode');
        document.body.classList.add('recruiter-mode');
        recruiterInlineEl?.setAttribute('aria-hidden', 'false');
        syncRecruiterHeaderState();
        window.requestAnimationFrame(() => {
            window.__deviceShellResizeController?.syncModeDefaults?.();
            syncRecruiterPillWidth();
        });
        if (scrollableContent) {
            scrollableContent.scrollTop = 0;
        }
    };

    const close = () => {
        device.classList.remove('recruiter-mode');
        device.classList.remove('recruiter-header-empty');
        document.body.classList.remove('recruiter-mode');
        recruiterInlineEl?.setAttribute('aria-hidden', 'true');
        topBarPill?.style.removeProperty('--recruiter-pill-target-width');
        window.__deviceShellResizeController?.syncModeDefaults?.();
    };

    const toggle = () => {
        if (device.classList.contains('recruiter-mode')) {
            close();
            return;
        }
        open();
    };

    window.addEventListener('resize', syncRecruiterPillWidth);
    window.addEventListener('orientationchange', syncRecruiterPillWidth);

    return {
        open,
        close,
        toggle,
        isActive: () => device.classList.contains('recruiter-mode')
    };
}

function initReaderBlogs() {
    const blogListEl = document.getElementById('reader-blog-list');
    if (!blogListEl) return;

    const escapeHtml = (value) => String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const escapeAttr = (value) => escapeHtml(value).replace(/"/g, '&quot;');

    const formatDate = (rawDate) => {
        const date = new Date(rawDate);
        if (Number.isNaN(date.getTime())) return rawDate || '';
        return new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        }).format(date);
    };

    const renderStatus = (message) => {
        blogListEl.innerHTML = `<p class="reader-blog-status">${message}</p>`;
    };

    const renderBlogs = (posts) => {
        if (!Array.isArray(posts) || posts.length === 0) {
            renderStatus('No blog posts yet.');
            return;
        }

        const visiblePosts = posts.filter((post) => {
            const title = typeof post?.title === 'string' ? post.title.trim() : '';
            const file = typeof post?.file === 'string' ? post.file.trim() : '';
            const normalizedTitle = title.toLowerCase();
            const normalizedFile = file.toLowerCase();

            return normalizedTitle !== '[your catchy title here]'
                && normalizedFile !== 'template-post.md';
        });

        if (visiblePosts.length === 0) {
            renderStatus('No blog posts yet.');
            return;
        }

        const sortedPosts = [...visiblePosts].sort((a, b) => new Date(b.date) - new Date(a.date));
        blogListEl.innerHTML = sortedPosts.map((post) => {
            const title = typeof post.title === 'string' ? post.title : 'Untitled Post';
            const date = formatDate(post.date);
            const file = typeof post.file === 'string' ? post.file : '';
            const tags = Array.isArray(post.tags) ? post.tags : [];
            const href = `blog.html?post=${encodeURIComponent(file)}`;
            const tagsMarkup = tags.map((tag) => `<li class="reader-blog-tag">${escapeHtml(tag)}</li>`).join('');

            return `
                <article class="reader-blog-card">
                    <p class="reader-blog-date">${escapeHtml(date)}</p>
                    <a href="${escapeAttr(href)}" class="reader-blog-link" data-blog-title="${escapeAttr(title)}" data-cursor="link">${escapeHtml(title)}</a>
                    <ul class="reader-blog-tags">${tagsMarkup}</ul>
                </article>
            `;
        }).join('');
    };

    blogListEl.addEventListener('click', (event) => {
        const link = event.target instanceof Element ? event.target.closest('.reader-blog-link') : null;
        if (!link) return;

        const overlay = window.CaseOverlayControl;
        if (!overlay || typeof overlay.openExternal !== 'function') return;

        event.preventDefault();
        const href = link.getAttribute('href') || '';
        const title = link.getAttribute('data-blog-title') || link.textContent || 'Blog Post';
        overlay.openExternal({ title, href });
    });

    const loadBlogs = async () => {
        if (loadBlogs.pending) return loadBlogs.pending;
        if (loadBlogs.loaded) return loadBlogs.loaded;

        try {
            loadBlogs.pending = fetch('./posts.json', { cache: 'default' });
            const response = await loadBlogs.pending;
            if (!response.ok) {
                throw new Error(`Unable to load posts.json (${response.status})`);
            }
            const posts = await response.json();
            renderBlogs(posts);
            loadBlogs.loaded = posts;
            return posts;
        } catch (error) {
            console.error(error);
            renderStatus('Unable to load blog posts.');
            return null;
        } finally {
            loadBlogs.pending = null;
        }
    };

    return { loadBlogs };
}

function initSmoothWheelScrolling() {
    const targets = [
        document.scrollingElement,
        document.getElementById('scrollable-content'),
        document.getElementById('case-content-area')
    ].filter(Boolean);
    const uniqueTargets = Array.from(new Set(targets));

    uniqueTargets.forEach((el) => {
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
function initInlineTalkScene() {
    if (!talkSceneEl || !talkContainerEl || !talkUiSourceEl) {
        return {
            activate: () => { },
            deactivate: () => { },
            setBackHandler: () => { },
            isActive: () => false
        };
    }

    const CHAT_SETTINGS = {
        contactName: 'Raghav',
        timestampLabel: 'Today 10:51 AM',
        initialPromptDelay: 50,
        draftRevealDuration: 2000,
        maxDraftLines: 4,
        sendMorphDuration: 380,
        replyTypingDelay: 1000,
        nextDraftDelay: 1000,
        loopThread: false,
        flinchIntensity: 0.01,
        flinchDepth: -0.004,
        flinchInDuration: 0.07,
        flinchOutDuration: 0.15,
        flinchElasticity: 1
    };

    const CHAT_THREAD = [
        {
            draft: "Where are you based and what's your current situation?",
            reply: [
                "I'm a Product Development Assistant at Aircards in Newcastle, UK, holding a UX Master's from Birmingham.",
                "Right now, I'm looking for my next long-term home. I'm specifically targeting roles that offer visa sponsorship so I can plant roots and grow with the team."
            ]
        },
        {
            draft: "What's your actual skillset / day-to-day?",
            reply: "I design and develop products, interfaces, and software that just work. Lately, I've been focused on XR/AR experiences and interactive displays. I also recently co-built an open-source bookmarking tool for designers using React, Tauri, and DevOps."
        },
        {
            draft: "Are you a good fit for my team? (How do I contact you?)",
            reply: "If you value direct feedback, fast iterations, and zero boring workflows-yes. Drop your details in the contact form below and let's build something cool."
        }
    ];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chatScreenEl = talkUiSourceEl.querySelector('.chat-phone-shell');
    const contactNameEl = document.getElementById('talk-chat-contact-name');
    const inputArea = talkSceneEl.querySelector('.chat-input-area');
    const btnBack = document.getElementById('talk-chat-btn-back');
    const btnClear = document.getElementById('talk-chat-btn-clear');
    const messagesArea = document.getElementById('talk-chat-messages-area');
    const inputText = document.getElementById('talk-chat-input-text');
    const btnSend = document.getElementById('talk-chat-btn-send');

    let currentExchangeIndex = 0;
    let isTyping = false;
    let isSending = false;
    let isDraftTyping = false;
    let chatSequenceId = 0;
    let activeExchange = null;
    let pendingTimeoutId = null;
    let initialized = false;
    let isActive = false;
    let onBack = () => { };
    let scene = null;
    let camera = null;
    let renderer = null;
    let cssRenderer = null;
    let phoneModel = null;
    let phoneScreenMesh = null;
    let modelReady = false;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let rafId = 0;
    const flinchObj = { z: 0, rx: 0, ry: 0 };

    const clearPendingStep = () => {
        if (pendingTimeoutId !== null) {
            window.clearTimeout(pendingTimeoutId);
            pendingTimeoutId = null;
        }
    };

    const scheduleStep = (callback, delay) => {
        clearPendingStep();
        pendingTimeoutId = window.setTimeout(() => {
            pendingTimeoutId = null;
            callback();
        }, delay);
    };

    const syncDraftBoxHeight = () => {
        if (!inputText) return;
        inputText.style.height = '0px';
        const inputStyles = window.getComputedStyle(inputText);
        const lineHeight = parseFloat(inputStyles.lineHeight) || 20;
        const maxHeight = (CHAT_SETTINGS.maxDraftLines * lineHeight) + 2;
        inputText.style.height = `${Math.min(inputText.scrollHeight, maxHeight)}px`;
    };

    const updateSendState = () => {
        if (!btnSend || !inputText) return;
        const canSend = !isTyping && !isSending && !isDraftTyping && !!activeExchange && inputText.value.trim().length > 0;
        btnSend.classList.toggle('active', canSend);
        btnSend.setAttribute('aria-disabled', String(!canSend));
    };

    const setDraft = (text = '') => {
        if (!inputText) return;
        inputText.value = text;
        syncDraftBoxHeight();
        updateSendState();
    };

    const resetMessages = () => {
        if (!messagesArea) return;
        messagesArea.innerHTML = `<div class="chat-timestamp">${CHAT_SETTINGS.timestampLabel}</div>`;
    };

    const getCurrentExchange = () => {
        if (!CHAT_THREAD.length) return null;
        if (currentExchangeIndex >= CHAT_THREAD.length) {
            if (!CHAT_SETTINGS.loopThread) return null;
            currentExchangeIndex = 0;
        }
        return CHAT_THREAD[currentExchangeIndex];
    };

    const stageCurrentDraft = () => {
        const exchange = getCurrentExchange();
        activeExchange = exchange;
        if (!exchange) {
            isDraftTyping = false;
            setDraft('');
            return;
        }
        typeDraftText(exchange.draft, exchange.draftRevealDuration ?? CHAT_SETTINGS.draftRevealDuration);
    };

    const resetConversation = (autoStart = false) => {
        chatSequenceId += 1;
        clearPendingStep();
        currentExchangeIndex = 0;
        activeExchange = null;
        isTyping = false;
        isSending = false;
        isDraftTyping = false;
        inputArea?.classList.remove('is-sending');
        resetMessages();
        setDraft('');
        if (autoStart && modelReady) triggerConversation();
    };

    function triggerConversation() {
        if (!isActive || !CHAT_THREAD.length || activeExchange || isTyping || isSending || isDraftTyping) return;
        const runId = chatSequenceId;
        scheduleStep(() => {
            if (runId !== chatSequenceId || !isActive) return;
            stageCurrentDraft();
        }, CHAT_SETTINGS.initialPromptDelay);
    }

    function typeDraftText(text = '', revealDuration = CHAT_SETTINGS.draftRevealDuration) {
        const draft = String(text ?? '');
        clearPendingStep();
        isDraftTyping = true;
        setDraft('');

        if (!draft.length) {
            isDraftTyping = false;
            updateSendState();
            return;
        }

        const startTime = performance.now();
        let visibleChars = 0;

        const revealNextChunk = () => {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(1, elapsed / Math.max(1, revealDuration));
            const nextVisibleChars = Math.max(1, Math.ceil(draft.length * progress));
            visibleChars = Math.max(visibleChars, nextVisibleChars);
            setDraft(draft.slice(0, visibleChars));
            if (messagesArea) {
                messagesArea.scrollTop = messagesArea.scrollHeight;
            }

            if (visibleChars >= draft.length) {
                isDraftTyping = false;
                updateSendState();
                return;
            }

            scheduleStep(revealNextChunk, 16);
        };

        scheduleStep(revealNextChunk, 20);
    }

    const appendBubble = (sender, text) => {
        if (!messagesArea) return;
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble chat-bubble-${sender === 'viewer' ? 'send' : 'recv'}`;
        bubble.innerText = text;
        messagesArea.appendChild(bubble);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    };

    const showTypingIndicator = () => {
        const typing = document.createElement('div');
        typing.className = 'chat-typing active';
        typing.innerHTML = '<span></span><span></span><span></span>';
        messagesArea?.appendChild(typing);
        if (messagesArea) {
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }
        return typing;
    };

    const playExchange = (exchange) => {
        const runId = chatSequenceId;
        const sentText = (inputText?.value.trim() || exchange.sent || exchange.draft).trim();

        activeExchange = null;
        isSending = true;
        inputArea?.classList.add('is-sending');
        updateSendState();

        scheduleStep(() => {
            if (runId !== chatSequenceId || !isActive) return;

            inputArea?.classList.remove('is-sending');
            isSending = false;
            appendBubble('viewer', sentText);
            setDraft('');

            const replies = Array.isArray(exchange.reply) ? exchange.reply : [exchange.reply];
            const showNextReply = (replyIndex) => {
                if (runId !== chatSequenceId || !isActive) return;

                if (replyIndex >= replies.length) {
                    isTyping = false;
                    currentExchangeIndex += 1;
                    updateSendState();
                    scheduleStep(() => {
                        if (runId !== chatSequenceId || !isActive) return;
                        stageCurrentDraft();
                    }, exchange.nextDraftDelay ?? CHAT_SETTINGS.nextDraftDelay);
                    return;
                }

                isTyping = true;
                updateSendState();
                const typingIndicator = showTypingIndicator();

                scheduleStep(() => {
                    if (runId !== chatSequenceId || !isActive) return;
                    typingIndicator.remove();
                    appendBubble('contact', replies[replyIndex]);
                    scheduleStep(() => showNextReply(replyIndex + 1), 600);
                }, exchange.typingDelay ?? CHAT_SETTINGS.replyTypingDelay);
            };

            showNextReply(0);
        }, exchange.sendMorphDuration ?? CHAT_SETTINGS.sendMorphDuration);
    };

    const enableSmoothWheelOn = (el) => {
        if (!el || el.dataset.smoothWheelBound === 'true') return;
        el.dataset.smoothWheelBound = 'true';

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
    };

    const onWindowResize = () => {
        if (!camera || !renderer || !cssRenderer || !talkSceneEl.classList.contains('is-visible')) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        cssRenderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onPointerMove = (event) => {
        if (!isActive) return;
        const mx = (event.clientX / window.innerWidth) * 2 - 1;
        const my = -(event.clientY / window.innerHeight) * 2 + 1;
        targetRotY = mx * 0.13;
        targetRotX = -my * 0.13;
    };

    const onPointerDown = (event) => {
        if (!isActive || !phoneModel || typeof gsap === 'undefined') return;
        const mx = (event.clientX / window.innerWidth) * 2 - 1;
        const my = -(event.clientY / window.innerHeight) * 2 + 1;
        gsap.killTweensOf(flinchObj);
        gsap.to(flinchObj, {
            z: CHAT_SETTINGS.flinchDepth,
            rx: -my * CHAT_SETTINGS.flinchIntensity,
            ry: mx * CHAT_SETTINGS.flinchIntensity,
            duration: CHAT_SETTINGS.flinchInDuration,
            ease: 'power3.out',
            onComplete: () => {
                gsap.to(flinchObj, {
                    z: 0,
                    rx: 0,
                    ry: 0,
                    duration: CHAT_SETTINGS.flinchOutDuration,
                    ease: `elastic.out(1, ${CHAT_SETTINGS.flinchElasticity})`
                });
            }
        });
    };

    const renderLoop = () => {
        rafId = requestAnimationFrame(renderLoop);
        if (!renderer || !cssRenderer || !camera) return;

        if (phoneModel) {
            currentRotX += (targetRotX - currentRotX) * 0.1;
            currentRotY += (targetRotY - currentRotY) * 0.1;
            const baseRotX = phoneModel.userData.baseRotX || 0;
            phoneModel.rotation.x = baseRotX + currentRotX + flinchObj.rx;
            phoneModel.rotation.y = currentRotY + flinchObj.ry;
            phoneModel.position.z = flinchObj.z;
        }

        renderer.render(scene, camera);
        cssRenderer.render(scene, camera);
    };

    const setupChatLogic = () => {
        if (!contactNameEl || !inputArea || !btnBack || !btnClear || !messagesArea || !inputText || !btnSend) return;
        enableSmoothWheelOn(messagesArea);
        contactNameEl.textContent = CHAT_SETTINGS.contactName;

        btnSend.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (isTyping || isSending || isDraftTyping || !activeExchange || !btnSend.classList.contains('active')) return;
            playExchange(activeExchange);
        });

        btnBack.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            onBack();
        });

        btnClear.addEventListener('click', () => {
            resetConversation(true);
        });

        resetConversation(false);
    };

    const ensureInitialized = () => {
        if (initialized) return true;
        if (!window.THREE || typeof THREE.GLTFLoader === 'undefined' || typeof THREE.CSS3DRenderer === 'undefined' || !chatScreenEl) {
            console.error('Talk scene dependencies are missing.');
            return false;
        }

        initialized = true;
        talkUiSourceEl.style.display = 'block';
        talkContainerEl.setAttribute('aria-hidden', 'false');

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 1.8);

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.domElement.style.pointerEvents = 'none';
        talkContainerEl.appendChild(renderer.domElement);

        cssRenderer = new THREE.CSS3DRenderer();
        cssRenderer.setSize(window.innerWidth, window.innerHeight);
        cssRenderer.domElement.style.top = '0';
        talkContainerEl.appendChild(cssRenderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(2, 3, 2);
        scene.add(dirLight);

        const loader = new THREE.GLTFLoader();
        loader.load('threeD/phone.glb', (gltf) => {
            phoneModel = gltf.scene;
            phoneModel.traverse((child) => {
                if (!child.isMesh) return;
                if (child.name === 'Phone_Screen' || child.name.toLowerCase().includes('screen')) {
                    phoneScreenMesh = child;
                    child.material.color.setHex(0x000000);
                    child.material.opacity = 0;
                    child.material.transparent = true;
                    child.material.blending = THREE.NoBlending;
                }
            });

            const box = new THREE.Box3().setFromObject(phoneModel);
            const center = box.getCenter(new THREE.Vector3());
            phoneModel.position.sub(center);
            phoneModel.scale.setScalar(2.5);

            const cssObject = new THREE.CSS3DObject(chatScreenEl);
            if (talkUiSourceEl.parentNode) {
                talkUiSourceEl.parentNode.removeChild(talkUiSourceEl);
            }
            cssObject.scale.setScalar(0.00062);
            if (phoneScreenMesh) {
                cssObject.position.copy(phoneScreenMesh.position);
                cssObject.quaternion.copy(phoneScreenMesh.quaternion);
            } else {
                cssObject.position.set(0, 0, 0.015);
            }
            phoneModel.add(cssObject);
            scene.add(phoneModel);

            phoneModel.position.y = 10;
            phoneModel.rotation.x = Math.PI;
            phoneModel.userData.baseRotX = Math.PI;

            if (talkLoadingOverlayEl) {
                talkLoadingOverlayEl.style.opacity = '0';
                window.setTimeout(() => {
                    talkLoadingOverlayEl.style.display = 'none';
                }, 500);
            }

            if (typeof gsap !== 'undefined') {
                gsap.to(phoneModel.position, {
                    y: 0,
                    duration: prefersReducedMotion ? 0.01 : 2,
                    ease: 'expo.out'
                });
                gsap.to(phoneModel.userData, {
                    baseRotX: 0,
                    duration: prefersReducedMotion ? 0.01 : 2,
                    ease: 'expo.out',
                    onComplete: () => {
                        modelReady = true;
                        if (isActive) triggerConversation();
                    }
                });
            } else {
                phoneModel.position.y = 0;
                phoneModel.userData.baseRotX = 0;
                modelReady = true;
                if (isActive) triggerConversation();
            }
        });

        window.addEventListener('resize', onWindowResize);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerdown', onPointerDown);
        setupChatLogic();
        renderLoop();
        return true;
    };

    return {
        activate() {
            if (!ensureInitialized()) return;
            isActive = true;
            talkSceneEl.classList.remove('is-exiting');
            talkSceneEl.classList.add('is-visible', 'is-entering');
            talkSceneEl.setAttribute('aria-hidden', 'false');
            window.setTimeout(() => {
                talkSceneEl.classList.remove('is-entering');
            }, prefersReducedMotion ? 10 : 720);
            resetConversation(true);
            btnBack?.focus({ preventScroll: true });
        },
        deactivate() {
            isActive = false;
            clearPendingStep();
            talkSceneEl.classList.remove('is-entering');
            talkSceneEl.classList.add('is-exiting');
            window.setTimeout(() => {
                talkSceneEl.classList.remove('is-visible', 'is-exiting');
                talkSceneEl.setAttribute('aria-hidden', 'true');
            }, prefersReducedMotion ? 10 : 520);
        },
        setBackHandler(handler) {
            onBack = typeof handler === 'function' ? handler : () => { };
        },
        isActive: () => isActive
    };
}

function init3DChatMode(options = {}) {
    const {
        readerMode,
        recruiterMode,
        stickyNote,
        resumePopout,
        resumeDockSystem,
        idCardSystem
    } = options;

    const talkScene = initInlineTalkScene();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const CRT_DURATION_MS = prefersReducedMotion ? 20 : 720;
    const TALK_EXIT_MS = prefersReducedMotion ? 20 : 520;
    const TALK_ENTER_MS = prefersReducedMotion ? 20 : 720;
    let isTransitioning = false;
    let isActive = false;
    let lastTriggerEl = pillResumeBtn || topBar || device;

    const finishCrtState = () => {
        device?.classList.remove('is-crt-transitioning', 'is-crt-closing', 'is-crt-opening');
    };

    const hidePortfolioScene = () => {
        device?.classList.add('is-scene-hidden');
    };

    const showPortfolioScene = () => {
        device?.classList.remove('is-scene-hidden');
    };

    const hideCaseWindow = () => {
        const overlay = window.CaseOverlayControl;
        if (overlay?.isVisible?.()) {
            overlay.close();
            return;
        }
        if (caseWindowEl) {
            caseWindowEl.classList.remove('visible', 'minimized', 'expanded-height', 'is-opening', 'is-closing');
            document.body.classList.remove('case-open');
        }
    };

    const closeConflictingUi = () => {
        readerMode?.close?.();
        recruiterMode?.close?.();
        stickyNote?.close?.();
        resumePopout?.close?.();
        if (resumeDockSystem?.isPanelOpen?.()) {
            resumeDockSystem.closeToPeek();
        }
        resumeDockSystem?.hide?.();
        idCardSystem?.hide?.();
        hideCaseWindow();
    };

    const open = (triggerEl = pillResumeBtn) => {
        if (isActive || isTransitioning) return;
        isTransitioning = true;
        lastTriggerEl = triggerEl || lastTriggerEl || pillResumeBtn || topBar || device;
        closeConflictingUi();
        document.body.classList.add('talk-scene-transitioning');

        device?.classList.add('is-crt-transitioning', 'is-crt-closing');
        window.setTimeout(() => {
            hidePortfolioScene();
            document.body.classList.add('talk-scene-active');
            talkScene.activate();
            finishCrtState();
            window.setTimeout(() => {
                document.body.classList.remove('talk-scene-transitioning');
                isActive = true;
                isTransitioning = false;
            }, TALK_ENTER_MS);
        }, CRT_DURATION_MS);
    };

    const close = () => {
        if (!isActive || isTransitioning) return;
        isTransitioning = true;
        document.body.classList.add('talk-scene-transitioning');
        talkScene.deactivate();
        window.setTimeout(() => {
            document.body.classList.remove('talk-scene-active');
            showPortfolioScene();
            device?.classList.add('is-crt-transitioning', 'is-crt-opening');
            window.setTimeout(() => {
                finishCrtState();
                document.body.classList.remove('talk-scene-transitioning');
                isActive = false;
                isTransitioning = false;
                if (lastTriggerEl instanceof HTMLElement) {
                    lastTriggerEl.focus({ preventScroll: true });
                }
            }, CRT_DURATION_MS);
        }, TALK_EXIT_MS);
    };

    talkScene.setBackHandler(close);

    return {
        open,
        close,
        isActive: () => isActive
    };
}

// --------------------------------------------------------
// MAIN INIT ON DOM CONTENT LOADED
// --------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    applyMarqueeSettings();
    initNodeGraph();
    initSmoothWheelScrolling();
    const onboardingFlow = initOnboardingHeader();
    const expandFabAnchor = initExpandButtonAnchor();
    const leftOrbControls = initLeftOrbControls();
    const stickyNote = initStickyNote();
    const resumePopout = initResumePopout();
    const readerMode = initReaderMode(onboardingFlow);
    const recruiterMode = initRecruiterMode();
    const resumeDockSystem = initResumeDockSystem();
    const idCardSystem = initIdCardSystem();
    const chatMode = init3DChatMode({
        readerMode,
        recruiterMode,
        stickyNote,
        resumePopout,
        resumeDockSystem,
        idCardSystem
    });
    initDeviceWindowNudge();
    let fittyRefreshTimer = null;
    let pillControlsRevealTimerId = 0;
    const PILL_CONTROLS_REVEAL_DELAY_MS = 4760;

    const scheduleFittyRefresh = () => {
        if (typeof fitty === 'undefined') return;
        if (fittyRefreshTimer) {
            window.clearTimeout(fittyRefreshTimer);
        }
        fittyRefreshTimer = window.setTimeout(() => {
            const run = () => fitty.fitAll();
            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(run, { timeout: 350 });
            } else {
                window.setTimeout(run, 120);
            }
        }, 120);
    };

    const expandDeviceShell = (autoOpenNotes = true) => {
        if (!device || device.classList.contains('expanded')) return;

        if (pillControlsRevealTimerId) {
            window.clearTimeout(pillControlsRevealTimerId);
            pillControlsRevealTimerId = 0;
        }
        document.body.classList.remove('pill-controls-revealed');

        withTemporaryDeviceTransition(() => {
            device.style.backgroundColor = '#ebeae6';
            device.classList.add('expanded');
            document.body.classList.add('device-expanded');
            applyPillSizes('expanded');
        }, { duration: 760, phase: 'opening' });

        ensureBackgroundsReady();
        window.hasMatrixStarted = true;

        pillControlsRevealTimerId = window.setTimeout(() => {
            if (!device || !device.classList.contains('expanded')) return;
            document.body.classList.add('pill-controls-revealed');
            pillControlsRevealTimerId = 0;
        }, PILL_CONTROLS_REVEAL_DELAY_MS);

        setTimeout(() => {
            if (miniMatrixInstance) miniMatrixInstance.resize();
            resumeDockSystem.updateAnchor();
            idCardSystem.updateAnchor();
            leftOrbControls.updateScrollPosition();
            if (typeof fitty !== 'undefined') fitty.fitAll();
        }, 500);
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
            orbCursorHandle?.classList.add('is-sticky');
            e.stopPropagation();
            expandFabAnchor.schedule();
            scheduleFittyRefresh();
            if (e.target instanceof HTMLElement) e.target.blur();
        });
    }

    applyMatrixPausedState();
    leftOrbControls.refreshTime();
    window.addEventListener('resize', scheduleFittyRefresh, { passive: true });

    const scheduleAssetPriming = () => {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(primeExpandableAssets, { timeout: 1200 });
        } else {
            window.setTimeout(primeExpandableAssets, 450);
        }
    };
    ensureBackgroundsReady({ defer: true });
    scheduleAssetPriming();
    topBar?.addEventListener('pointerenter', primeExpandableAssets, { once: true, passive: true });
    expandBtn?.addEventListener('pointerenter', primeExpandableAssets, { once: true, passive: true });

    leftControlsEl?.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    orbCursorHandle?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Toggling stickiness manually if the bar itself is clicked
        orbCursorHandle.classList.toggle('is-sticky');
        if (e.target instanceof HTMLElement) e.target.blur();
    });

    matrixToggleBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMatrixPaused();
        orbCursorHandle?.classList.add('is-sticky');
        if (e.target instanceof HTMLElement) e.target.blur();
    });

    orbResumeBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        orbCursorHandle?.classList.add('is-sticky');
        if (e.target instanceof HTMLElement) e.target.blur();
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
        chatMode.open(pillResumeBtn);
    });

    pillThirdBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        expandDeviceShell(false);
        if (resumePopout.isVisible()) resumePopout.closeToPill(pillResumeBtn);
        if (recruiterMode.isActive()) recruiterMode.close();
        readerMode.toggle();
        if (readerMode.isActive() && typeof blogSystem !== 'undefined') {
            blogSystem.loadBlogs();
        }
    });

    // Footer Blog Link
    const footerBlogLink = document.querySelector('[data-footer-link="blog"]');
    if (footerBlogLink) {
        footerBlogLink.addEventListener('click', (e) => {
            e.preventDefault();
            expandDeviceShell(false);
            readerMode.open();
            if (typeof blogSystem !== 'undefined') {
                blogSystem.loadBlogs();
            }
        });
    }

    pillFourthBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const email = 'raghavprasanna2000@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            const tooltip = pillFourthBtn.querySelector('.pill-tooltip');
            if (tooltip) {
                const originalText = tooltip.textContent;
                tooltip.textContent = 'copied email ID';
                setTimeout(() => {
                    tooltip.textContent = originalText;
                }, 2000);
            }
        }).catch(err => {
            console.error('Failed to copy email: ', err);
        });
    });

    pillFifthBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        expandDeviceShell(false);
        if (resumePopout.isVisible()) resumePopout.closeToPill(pillResumeBtn);
        if (readerMode.isActive()) readerMode.close();
        recruiterMode.toggle();
    });

    showResumeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        expandDeviceShell(false);

        if (!resumeDockSystem.isVisible()) {
            resumeDockSystem.showPeek();
            return;
        }

        if (resumeDockSystem.isPanelOpen()) {
            resumeDockSystem.closeToPeek();
            return;
        }

        resumeDockSystem.hide();
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
        if (resumeDockSystem.isPanelOpen()) {
            // Hide completely when scrolling with panel open — don't revert to peek,
            // which causes the floating dock to reappear and drift during scroll.
            resumeDockSystem.hide();
        }
    }, { passive: true });
    document.body.addEventListener('click', (e) => {
        if (chatMode.isActive()) {
            return;
        }
        if ((window.__deviceShellSuppressCloseUntil || 0) > Date.now()) {
            return;
        }

        const caseOverlayControl = window.CaseOverlayControl;
        const caseIsOpen = caseOverlayControl
            ? caseOverlayControl.isVisible()
            : (caseWindowEl && caseWindowEl.classList.contains('visible'));
        const clickedInsideCase = caseWindowEl && caseWindowEl.contains(e.target);
        const clickedInsideDevice = device && device.contains(e.target);
        const clickedInsideSticky = stickyNoteEl && stickyNoteEl.contains(e.target);
        const clickedInsideResume = resumePopoutEl && resumePopoutEl.contains(e.target);
        const clickedInsideResumeDock = resumeDockSystem.isInside(e.target);
        const clickedInsideIdCard = idCardSystem.isInside(e.target);

        const idWasOpen = idCardSystem.isOpen();
        if (idWasOpen && !clickedInsideIdCard && !(showIdBtn && showIdBtn.contains(e.target))) {
            idCardSystem.closeToPeek();
            return;
        }

        if (resumeDockSystem.isPanelOpen() && !clickedInsideCase && !clickedInsideResumeDock && !(showResumeBtn && showResumeBtn.contains(e.target))) {
            resumeDockSystem.closeToPeek();
            return;
        }

        // Clear orb stickiness on outside click
        if (orbCursorHandle?.classList.contains('is-sticky')) {
            const clickedInsideOrb = leftControlsEl && leftControlsEl.contains(e.target);
            if (!clickedInsideOrb) {
                orbCursorHandle.classList.remove('is-sticky');
            }
        }

        // Priority close order:
        // 1) Close the side case window first.
        // 2) Only after that, allow closing the mini portfolio on a later outside click.
        if (caseIsOpen && !clickedInsideCase && !clickedInsideDevice && !clickedInsideSticky && !clickedInsideResume && !clickedInsideResumeDock && !clickedInsideIdCard) {
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
            !clickedInsideResumeDock &&
            !clickedInsideIdCard
        ) {
            withTemporaryDeviceTransition(() => {
                device.style.backgroundColor = '';
                device.classList.remove('expanded');
                document.body.classList.remove('device-expanded');
                device.classList.remove('maximized');
                document.body.classList.remove('device-maximized');
                applyPillSizes('collapsed');
                if (pillControlsRevealTimerId) {
                    window.clearTimeout(pillControlsRevealTimerId);
                    pillControlsRevealTimerId = 0;
                }
                document.body.classList.remove('pill-controls-revealed');
                readerMode.close();
                recruiterMode.close();
                stickyNote.close();
                resumePopout.close();
                if (resumeDockSystem.isPanelOpen()) resumeDockSystem.closeToPeek();
                resumeDockSystem.hide();
                idCardSystem.hide();
            }, { duration: 720, phase: 'closing' });
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
    const blogSystem = initReaderBlogs();

    // Initialize Scramble Animations
    const resumeBtnEl = document.querySelector('.resume-fab');
    scrambleText(resumeBtnEl, "/-Resume", 1000);

    // Page Transition: Fade in from white
    if (pageOverlayEl) {
        setTimeout(() => {
            pageOverlayEl.classList.remove('on-load');
        }, 100);
    }

    // Check if we should force expand (returning from chat/resume)
    if (localStorage.getItem('forcePillExpanded') === 'true') {
        expandDeviceShell(true);
        localStorage.removeItem('forcePillExpanded');
    } else {
        applyPillSizes('collapsed'); // Default initial state
    }
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

// DOM Ready initializers moved to main block
document.addEventListener('DOMContentLoaded', () => {
    // Other specific page ready logic if needed
});







// --------------------------------------------------------
// GLOBAL SITE CUSTOMIZATION & NAVIGATION
// --------------------------------------------------------
(function initGlobalSystems() {
    function initCustomization() {
        // Calm Navigation Transition
        const deviceContainer = document.getElementById('portfolio-device');
        if (deviceContainer) {
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a[target="_blank"]');
                if (link && !link.classList.contains('side-panel-trigger')) {
                    e.preventDefault();
                    const href = link.href;

                    // Trigger effect
                    deviceContainer.classList.add('is-navigating');

                    // Open link after delay
                    setTimeout(() => {
                        window.open(href, '_blank', 'noopener,noreferrer');

                        // Cleanup after a while
                        setTimeout(() => {
                            deviceContainer.classList.remove('is-navigating');
                        }, 1000);
                    }, 600);
                }
            });
        }

        // Back to Top functionality
        const backToTopBtn = document.getElementById('footer-back-to-top');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                const scrollableContent = document.getElementById('scrollable-content');
                if (scrollableContent) {
                    scrollableContent.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }

        // ---- Customization Section Logic (Discrete Circular Palette) ----
        const colorPalette = document.getElementById('colorPalette');
        const colorPreview = document.getElementById('activeColorPreview');
        const resetBgBtn = document.getElementById('resetBgBtn');
        const miniCarousel = document.getElementById('miniCarousel');
        const defaultPaletteBg = '#EBEAE6';
        const themeBloom = document.getElementById('theme-bloom');
        let themeBloomTimerId = 0;

        const triggerThemeBloom = (color, sourceRect = null) => {
            if (!themeBloom) return;

            const x = sourceRect ? sourceRect.left + (sourceRect.width / 2) : window.innerWidth / 2;
            const y = sourceRect ? sourceRect.top + (sourceRect.height / 2) : window.innerHeight / 2;

            themeBloom.style.setProperty('--bloom-x', `${x}px`);
            themeBloom.style.setProperty('--bloom-y', `${y}px`);
            themeBloom.style.setProperty('--bloom-color', color);
            themeBloom.classList.remove('is-active');
            void themeBloom.offsetWidth;
            themeBloom.classList.add('is-active');

            if (themeBloomTimerId) window.clearTimeout(themeBloomTimerId);
            themeBloomTimerId = window.setTimeout(() => {
                themeBloom.classList.remove('is-active');
                themeBloomTimerId = 0;
            }, 360);
        };

        const paletteColors = [
            '#ffec59ff', // Yellow
            '#ffc72b', // Yellow-Orange
            '#ffa334', // Orange
            '#ff6024', // Red-Orange
            '#ff2f00', // Red
            '#dc30e7', // Red-Purple
            '#aa28ed', // Purple
            '#437dff', // Blue-Purple
            '#44b1ff', // Blue
            '#2ec6cf', // Blue-Green
            '#00a651', // Green
            '#8dc63f'  // Yellow-Green
        ];

        if (colorPalette) {
            const radius = 75; // Distance from center
            const swatches = [];
            let magneticHoverIndex = -1;
            const setResetButtonState = (isDefault) => {
                if (!resetBgBtn) return;
                resetBgBtn.disabled = isDefault;
                resetBgBtn.setAttribute('aria-disabled', isDefault ? 'true' : 'false');
            };

            const wrapIndex = (index, length) => ((index % length) + length) % length;
            const getSignedCircularDistance = (fromIndex, toIndex, length) => {
                const forward = wrapIndex(toIndex - fromIndex, length);
                const backward = forward - length;
                return Math.abs(forward) <= Math.abs(backward) ? forward : backward;
            };

            const clearMagneticState = () => {
                colorPalette.classList.remove('is-magnetic');
                colorPalette.style.setProperty('--palette-tilt', '0deg');
                magneticHoverIndex = -1;
                swatches.forEach((swatch) => {
                    swatch.dataset.proximity = '';
                    swatch.style.setProperty('--swatch-translate-x', '0px');
                    swatch.style.setProperty('--swatch-translate-y', '0px');
                    swatch.style.setProperty('--swatch-rotate', '0deg');
                    if (!swatch.classList.contains('active')) {
                        swatch.style.setProperty('--swatch-scale', '1');
                    }
                });
            };

            const applyMagneticState = (hoverIndex, pointerAngle = null) => {
                if (hoverIndex < 0 || hoverIndex >= swatches.length) {
                    clearMagneticState();
                    return;
                }

                magneticHoverIndex = hoverIndex;
                colorPalette.classList.add('is-magnetic');

                if (pointerAngle !== null) {
                    const tilt = Math.max(-8, Math.min(8, pointerAngle * 0.14));
                    colorPalette.style.setProperty('--palette-tilt', `${tilt.toFixed(2)}deg`);
                }

                swatches.forEach((swatch, index) => {
                    const signedDistance = getSignedCircularDistance(hoverIndex, index, swatches.length);
                    const distance = Math.abs(signedDistance);
                    const direction = signedDistance === 0 ? 0 : Math.sign(signedDistance);
                    const baseAngle = Number(swatch.dataset.angle || 0);
                    const rad = baseAngle * (Math.PI / 180);
                    const tangentRad = rad + (Math.PI / 2);

                    let radialOffset = 0;
                    let tangentialOffset = 0;
                    let rotate = 0;
                    let scale = swatch.classList.contains('active') ? 1.5 : 1;

                    if (distance === 0) {
                        radialOffset = 8;
                        rotate = pointerAngle !== null ? pointerAngle * 0.16 : 0;
                        scale = Math.max(scale, 1.58);
                    } else if (distance === 1) {
                        radialOffset = -4;
                        tangentialOffset = direction * 8;
                        rotate = direction * 10;
                        scale = Math.max(scale, 1.18);
                    } else if (distance === 2) {
                        radialOffset = -2;
                        tangentialOffset = direction * 4;
                        rotate = direction * 5;
                        scale = Math.max(scale, 1.08);
                    }

                    const tx = (Math.cos(rad) * radialOffset) + (Math.cos(tangentRad) * tangentialOffset);
                    const ty = (Math.sin(rad) * radialOffset) + (Math.sin(tangentRad) * tangentialOffset);

                    swatch.dataset.proximity = String(distance);
                    swatch.style.setProperty('--swatch-translate-x', `${tx.toFixed(2)}px`);
                    swatch.style.setProperty('--swatch-translate-y', `${ty.toFixed(2)}px`);
                    swatch.style.setProperty('--swatch-rotate', `${rotate.toFixed(2)}deg`);
                    swatch.style.setProperty('--swatch-scale', scale.toFixed(2));
                });
            };

            const getNearestSwatchIndex = (event) => {
                const rect = colorPalette.getBoundingClientRect();
                const centerX = rect.left + (rect.width / 2);
                const centerY = rect.top + (rect.height / 2);
                const dx = event.clientX - centerX;
                const dy = event.clientY - centerY;
                const pointerAngle = Math.atan2(dy, dx) * (180 / Math.PI);
                const normalized = (pointerAngle + 450) % 360;
                const hoverIndex = Math.round(normalized / (360 / paletteColors.length)) % paletteColors.length;
                return { hoverIndex, pointerAngle };
            };

            paletteColors.forEach((hex, i) => {
                const swatch = document.createElement('div');
                swatch.className = 'color-swatch';

                // Position in circle
                const angle = (i * (360 / paletteColors.length)) - 90;
                const rad = angle * (Math.PI / 180);
                const x = 50 + (radius / 100) * 50 * Math.cos(rad);
                const y = 50 + (radius / 100) * 50 * Math.sin(rad);

                swatch.style.left = `${x}%`;
                swatch.style.top = `${y}%`;
                swatch.style.backgroundColor = hex;
                swatch.dataset.angle = String(angle);
                swatches.push(swatch);

                swatch.addEventListener('mouseenter', () => {
                    applyMagneticState(i, angle + 90);
                });

                swatch.addEventListener('click', () => {
                    // Update Active State
                    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                    swatch.classList.add('active');

                    // Update Preview
                    if (colorPreview) colorPreview.style.backgroundColor = hex;

                    // Apply EXACT color to Site Background
                    document.documentElement.style.setProperty('--bg', hex);
                    setResetButtonState(hex.toLowerCase() === defaultPaletteBg.toLowerCase());

                    // Keep panels translucent so the mini site stays visually open
                    const panelColor = '#ffffff';
                    document.documentElement.style.setProperty('--panel', panelColor);
                    triggerThemeBloom(hex, colorPalette.getBoundingClientRect());
                });

                colorPalette.appendChild(swatch);
            });

            setResetButtonState(true);

            colorPalette.addEventListener('mouseenter', (event) => {
                const { hoverIndex, pointerAngle } = getNearestSwatchIndex(event);
                applyMagneticState(hoverIndex, pointerAngle);
            });

            colorPalette.addEventListener('mousemove', (event) => {
                const { hoverIndex, pointerAngle } = getNearestSwatchIndex(event);
                if (hoverIndex !== magneticHoverIndex || colorPalette.style.getPropertyValue('--palette-tilt') === '0deg') {
                    applyMagneticState(hoverIndex, pointerAngle);
                    return;
                }

                const tilt = Math.max(-8, Math.min(8, pointerAngle * 0.14));
                colorPalette.style.setProperty('--palette-tilt', `${tilt.toFixed(2)}deg`);
            });

            colorPalette.addEventListener('mouseleave', () => {
                clearMagneticState();
            });
        }

        if (resetBgBtn) {
            resetBgBtn.addEventListener('click', () => {
                document.documentElement.style.setProperty('--bg', defaultPaletteBg);
                document.documentElement.style.setProperty('--panel', '#ffffff');
                triggerThemeBloom(defaultPaletteBg, colorPalette.getBoundingClientRect());
                document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                if (colorPreview) colorPreview.style.backgroundColor = defaultPaletteBg;
                resetBgBtn.disabled = true;
                resetBgBtn.setAttribute('aria-disabled', 'true');
            });
        }

        // Mini Carousel Timer
        if (miniCarousel) {
            initManagedCarousel(miniCarousel);
        }
    }

    if (document.readyState === 'complete') initCustomization();
    else window.addEventListener('load', initCustomization);
})();
