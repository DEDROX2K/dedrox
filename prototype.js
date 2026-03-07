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
        chars: ['█', '▒', '░', '*', '|', '/', 'o'],
        fontSize: 5,
        speed: 1,
        baseOpacity: 0.10,
        baseColor: '77, 77, 77',
        cursorColor: '0, 0, 0',
        direction: 'up',
        cursorOpacity: 0.39,
        cursorRadius: 280,
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
        palette: ['#111111', '#ff3b30', '#ffcc00', '#34c759', '#0a84ff', '#bf5af2'],
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
        const contentArea = document.getElementById('case-content-area');
        const titleDisp = document.getElementById('case-title');

        let isTransitioning = false;
        let caseMotionTimer = null;
        const CASE_ANIM_MS = 560;

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

        const showCase = (data) => {
            titleDisp.textContent = data.title;
            contentArea.innerHTML = data.images.map(img => `<img src="${img}" alt="Case Image">`).join('');

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

        const openCase = (caseId) => {
            if (isTransitioning) return;
            const data = SITE_CONFIG.caseData[caseId];
            if (!data) return;

            if (caseWindow.classList.contains('visible')) {
                isTransitioning = true;
                closeCase({ keepLayout: true });
                window.setTimeout(() => {
                    showCase(data);
                    isTransitioning = false;
                }, CASE_ANIM_MS + 20);
            } else {
                showCase(data);
            }
        };

        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const caseId = card.getAttribute('data-case');
                openCase(caseId);
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeCase);
        }

        window.CaseOverlayControl = {
            close: () => closeCase(),
            closeImmediate: () => closeCase({ immediate: true }),
            isVisible: () => caseWindow.classList.contains('visible') || caseWindow.classList.contains('is-closing')
        };
    },
    pillSizes: {
        collapsed: {
            bar: { w: '8px', h: '34px' },
            circle: { w: '10px', h: '10px' },
            square: { w: '25px', h: '24px' },
            dark: { w: '8px', h: '34px' },
            container: { w: '280px', h: '56px' }
        },
        expanded: {
            bar: { w: '8px', h: '40px' },
            circle: { w: '74px', h: '44px' },
            square: { w: '74px', h: '44px' },
            dark: { w: '74px', h: '44px' },
            container: { w: '450px', h: '64px' }
        }
    },
    blurMask: {
        strength: '15px',
        opacity: 0.85
    }
};

function applyBlurMaskSettings() {
    const cfg = SITE_CONFIG.blurMask;
    if (!cfg) return;
    const root = document.documentElement;
    root.style.setProperty('--blur-mask-strength', cfg.strength);
    root.style.setProperty('--blur-mask-opacity', cfg.opacity);
}

function applyPillSizes(state) {
    const sizes = SITE_CONFIG.pillSizes[state];
    if (!sizes) return;
    const root = document.documentElement;
    root.style.setProperty('--pill-bar-w', sizes.bar.w);
    root.style.setProperty('--pill-bar-h', sizes.bar.h);
    root.style.setProperty('--pill-circle-w', sizes.circle.w);
    root.style.setProperty('--pill-circle-h', sizes.circle.h);
    root.style.setProperty('--pill-square-w', sizes.square.w);
    root.style.setProperty('--pill-square-h', sizes.square.h);
    root.style.setProperty('--pill-dark-w', sizes.dark.w);
    root.style.setProperty('--pill-dark-h', sizes.dark.h);

    if (sizes.container) {
        root.style.setProperty('--pill-container-w', sizes.container.w);
        root.style.setProperty('--pill-container-h', sizes.container.h);
    }
}

const device = document.getElementById('portfolio-device');
const topBar = document.getElementById('top-bar');
const topBarArt = document.getElementById('top-bar-art');
const githubChartImg = document.getElementById('github-chart-img');
const secondsDot = document.getElementById('seconds-dot');
const expandBtn = document.getElementById('expand-btn');
const caseWindowEl = document.getElementById('case-window');
const stickyNoteEl = document.getElementById('sticky-note');
const pillNotesBtn = document.getElementById('pill-notes-btn');
const pillResumeBtn = document.getElementById('pill-resume-btn');
const pillThirdBtn = document.getElementById('pill-third-btn');
const resumePopoutEl = document.getElementById('resume-popout');
const readerInlineEl = document.getElementById('reader-inline');

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
    constructor(canvasId, chars, baseColor, fontSize, speed, parentElement, baseOpacity, cursor, direction) {
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

        const colCount = Math.floor(w / this.fontSize) + 1;
        this.columns = [];
        for (let i = 0; i < colCount; i++) {
            const length = Math.floor(10 + Math.random() * 20);
            const startY = this.direction === 'up'
                ? this.height + Math.random() * this.height
                : Math.random() * -this.height * 2;

            this.columns.push({
                x: i * this.fontSize,
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

    animate(time) {
        requestAnimationFrame(this.animate);
        const deltaTime = time - this.lastTime;
        if (deltaTime < this.interval) return;
        this.lastTime = time - (deltaTime % this.interval);

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
                    col.length = Math.floor(10 + Math.random() * 20);
                }
            } else {
                col.y += col.speed * this.fontSize;
                if (col.y - col.length * this.fontSize > this.height && Math.random() > 0.95) {
                    col.y = -this.fontSize;
                    col.speed = this.speed * (0.8 + Math.random() * 0.6);
                    col.length = Math.floor(10 + Math.random() * 20);
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

function initBackgrounds() {
    const cfg = SITE_CONFIG.asciiRain;
    new MatrixRain(
        'canvas-bg',
        cfg.chars,
        cfg.baseColor,
        cfg.fontSize,
        cfg.speed,
        window,
        cfg.baseOpacity,
        { color: cfg.cursorColor, opacity: cfg.cursorOpacity, radius: cfg.cursorRadius },
        cfg.direction
    );
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
        const item = document.createElement('button');
        item.className = 'dock-item';
        item.type = 'button';
        item.setAttribute('aria-label', company.name || `Company ${index + 1}`);

        if (company.url) {
            item.addEventListener('click', () => {
                window.open(company.url, '_blank', 'noopener,noreferrer');
            });
        }

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

function paintFromEvent(e) {
    if (!pixelCanvas || !pixelCtx) return;
    const rect = pixelCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const cssX = clientX - rect.left;
    const cssY = clientY - rect.top;
    const scaleX = pixelCanvas.width / rect.width;
    const scaleY = pixelCanvas.height / rect.height;
    const rawX = cssX * scaleX;
    const rawY = cssY * scaleY;
    const x = Math.floor(rawX / SITE_CONFIG.pixel.pixelSize) * SITE_CONFIG.pixel.pixelSize;
    const y = Math.floor(rawY / SITE_CONFIG.pixel.pixelSize) * SITE_CONFIG.pixel.pixelSize;

    if (x < 0 || y < 0 || x >= pixelCanvas.width || y >= pixelCanvas.height) return;
    pixelCtx.fillStyle = activeColor;
    pixelCtx.fillRect(x, y, SITE_CONFIG.pixel.pixelSize, SITE_CONFIG.pixel.pixelSize);
}

if (pixelCanvas) {
    pixelCanvas.addEventListener('mousedown', (e) => {
        drawing = true;
        paintFromEvent(e);
    });

    window.addEventListener('mouseup', () => {
        drawing = false;
    });

    pixelCanvas.addEventListener('mousemove', (e) => {
        if (!drawing) return;
        paintFromEvent(e);
    });

    pixelCanvas.addEventListener('touchstart', (e) => {
        drawing = true;
        paintFromEvent(e);
        e.preventDefault();
    }, { passive: false });

    pixelCanvas.addEventListener('touchmove', (e) => {
        if (!drawing) return;
        paintFromEvent(e);
        e.preventDefault();
    }, { passive: false });

    window.addEventListener('touchend', () => {
        drawing = false;
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
function initBrandHoverAnimations() {
    const blocks = document.querySelectorAll('.brand-block');

    blocks.forEach(block => {
        const textSpan = block.querySelector('.brand-text');
        if (!textSpan) return;

        // Split text into individual spans for staggered animation
        const originalText = textSpan.textContent;
        textSpan.innerHTML = '';
        const letters = originalText.split('');

        letters.forEach(letter => {
            const span = document.createElement('span');
            // preserve spaces
            if (letter === ' ') {
                span.innerHTML = '&nbsp;';
            } else {
                span.textContent = letter;
            }
            span.style.display = 'inline-block';
            span.style.transformOrigin = 'center';
            textSpan.appendChild(span);
        });

        const charSpans = textSpan.querySelectorAll('span');

        block.addEventListener('mouseenter', () => {
            if (typeof gsap !== 'undefined') {
                gsap.killTweensOf(charSpans);

                // Reset first
                gsap.set(charSpans, { y: 0, opacity: 1 });

                // Play stagger animation
                gsap.from(charSpans, {
                    y: 10,
                    opacity: 0,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: "back.out(1.5)"
                });
            }
        });
    });
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

function initReaderMode() {
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

    const setDefaultPosition = () => {
        const deviceRect = device.getBoundingClientRect();
        const targetLeft = deviceRect.left + Math.max(18, (deviceRect.width - stickyNoteEl.offsetWidth) * 0.5);
        const targetTop = deviceRect.top + 72;
        setPosition(targetLeft, targetTop);
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
    };

    const openFromPill = (sourceEl = topBar) => {
        lastSourceEl = sourceEl || lastSourceEl || pillNotesBtn || topBar || device;
        clearMotionState();

        if (!stickyNoteEl.classList.contains('visible')) {
            stickyNoteEl.classList.add('visible');
            stickyNoteEl.setAttribute('aria-hidden', 'false');
        }
        stickyNoteEl.classList.remove('minimized');

        if (!hasPosition) {
            setDefaultPosition();
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
        stickyNoteEl.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale3d(0.08, 0.15, 1)`;
        stickyNoteEl.offsetHeight;
        requestAnimationFrame(() => {
            stickyNoteEl.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
        });
        motionTimer = window.setTimeout(() => {
            clearMotionState();
        }, 760);
    };

    const closeToPill = (sourceEl = lastSourceEl) => {
        if (!stickyNoteEl.classList.contains('visible')) return;
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
        stickyNoteEl.style.transform = 'translate3d(0, 0, 0) scale(1)';
        stickyNoteEl.style.opacity = '1';
        stickyNoteEl.offsetHeight;
        requestAnimationFrame(() => {
            stickyNoteEl.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale3d(0.02, 0.08, 1)`;
            stickyNoteEl.style.opacity = '0.08';
        });
        motionTimer = window.setTimeout(finishClose, 720);
    };

    const close = () => {
        finishClose();
    };

    const toggleFromPill = (sourceEl = lastSourceEl) => {
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
// MAIN INIT ON DOM CONTENT LOADED
// --------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    initCursorSystem();
    initCustomCursor();
    initSmoothWheelScrolling();
    const stickyNote = initStickyNote();
    const resumePopout = initResumePopout();
    const readerMode = initReaderMode();

    const expandDeviceShell = (autoOpenNotes = true) => {
        if (!device || device.classList.contains('expanded')) return;
        device.classList.add('expanded');
        applyPillSizes('expanded');
        setTimeout(() => {
            if (miniMatrixInstance) miniMatrixInstance.resize();
            if (autoOpenNotes && stickyNote && !stickyNote.isVisible()) {
                stickyNote.openFromPill(pillNotesBtn);
            }
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
            e.stopPropagation();
            setTimeout(() => {
                if (typeof fitty !== 'undefined') fitty.fitAll();
            }, 350);
        });
    }

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
            if (readerMode.isActive()) readerMode.close();
            stickyNote.toggleFromPill(pillNotesBtn);
        }
    });

    pillResumeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        expandDeviceShell(false);
        if (stickyNote.isVisible()) stickyNote.closeToPill(pillNotesBtn);
        if (readerMode.isActive()) readerMode.close();

        navigator.clipboard.writeText('raghavprasanna2000@gmail.com').then(() => {
            const tooltipSpan = pillResumeBtn.querySelector('.pill-tooltip');
            if (tooltipSpan) {
                const originalText = tooltipSpan.textContent;
                tooltipSpan.textContent = 'Copied!';
                setTimeout(() => {
                    tooltipSpan.textContent = originalText;
                }, 2000);
            }
        });
    });

    pillThirdBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        expandDeviceShell(false);
        if (stickyNote.isVisible()) stickyNote.closeToPill(pillNotesBtn);
        if (resumePopout.isVisible()) resumePopout.closeToPill(pillResumeBtn);
        readerMode.toggle();
    });

    document.body.addEventListener('click', (e) => {
        const caseOverlayControl = window.CaseOverlayControl;
        const caseIsOpen = caseOverlayControl
            ? caseOverlayControl.isVisible()
            : (caseWindowEl && caseWindowEl.classList.contains('visible'));
        const clickedInsideCase = caseWindowEl && caseWindowEl.contains(e.target);
        const clickedInsideDevice = device && device.contains(e.target);
        const clickedInsideSticky = stickyNoteEl && stickyNoteEl.contains(e.target);
        const clickedInsideResume = resumePopoutEl && resumePopoutEl.contains(e.target);

        // Priority close order:
        // 1) Close the side case window first.
        // 2) Only after that, allow closing the mini portfolio on a later outside click.
        if (caseIsOpen && !clickedInsideCase && !clickedInsideDevice && !clickedInsideSticky && !clickedInsideResume) {
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
            !clickedInsideResume
        ) {
            device.classList.remove('expanded');
            device.classList.remove('maximized');
            applyPillSizes('collapsed');
            readerMode.close();
            stickyNote.close();
            resumePopout.close();
            setTimeout(() => { if (miniMatrixInstance) miniMatrixInstance.resize(); }, 520);
        }
    });

    // Run core initializers
    initBackgrounds();
    buildCompanyDock();
    initCompanyDock();
    buildPalette();
    clearPixelCanvas();
    SITE_CONFIG.setupCaseOverlays();
    initIndexGrid();
    initBrandHoverAnimations();

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
