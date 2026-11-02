/**
 * AirPaste Navigation Logic & State Management
 * Standardizes navigation pill behavior, active states, and page transitions.
 */

// ==========================================
// 😇 PAGE TRANSITIONS — fade to white, fade back from white
// The fade-in runs from CSS (body::after in airpaste.css);
// leaving a page adds .is-leaving, then navigates once it's white.
// ==========================================
const PAGE_FADE_OUT_MS = 500;

function fadeToPage(url) {
    const root = document.documentElement;
    if (root.classList.contains('is-leaving')) return;
    root.classList.add('is-leaving');
    setTimeout(() => { window.location.href = url; }, PAGE_FADE_OUT_MS);
}

document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link || e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    // Same-page hash links scroll, they don't transition
    if (url.pathname === window.location.pathname && url.hash) return;
    if (link.getAttribute('href') === '#') return;

    e.preventDefault();
    fadeToPage(url.href);
});

// Coming back via the back button restores the page from cache still white
window.addEventListener('pageshow', (e) => {
    if (e.persisted) document.documentElement.classList.remove('is-leaving');
});

class NavBar {
    constructor() {
        this.container = document.querySelector('.nav-toggle-container');
        this.indicator = document.querySelector('.nav-toggle-indicator');
        this.btns = document.querySelectorAll('.nav-toggle-btn');
        
        if (!this.container || !this.indicator) return;

        this.navMap = {
            'toggleHome': 'airpaste.html',
            'toggleDownload': 'download.html',
            'toggleShop': 'shop.html',
            'toggleNext': 'whatsnext.html'
        };

        this.init();
    }

    init() {
        // Determine active state based on URL/hash
        const currentPath = window.location.pathname.split('/').pop() || 'airpaste.html';
        const hash = window.location.hash;
        let activeId = null;

        if (currentPath === 'airpaste.html' || currentPath === '') {
            activeId = hash === '#download' ? 'toggleDownload' : 'toggleHome';
        } else {
            for (const [id, url] of Object.entries(this.navMap)) {
                if (url === currentPath) activeId = id;
            }
        }

        const activeBtn = document.getElementById(activeId);
        if (activeBtn) {
            // Wait for fonts/layout to be stable for correct positioning
            if (document.fonts) {
                document.fonts.ready.then(() => this.updatePosition(activeBtn, true));
            } else {
                setTimeout(() => this.updatePosition(activeBtn, true), 100);
            }
        }

        // Click handlers
        this.btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetUrl = this.navMap[btn.id];
                if (!targetUrl) return;

                // Update UI position
                this.updatePosition(btn);

                fadeToPage(targetUrl);
            });
        });

        window.addEventListener('resize', () => {
            const currentActive = document.querySelector('.nav-toggle-btn.active');
            this.updatePosition(currentActive, true);
        });
    }

    updatePosition(btn, instant = false) {
        if (!btn) {
             this.indicator.style.width = '0px';
             this.indicator.style.opacity = '0';
             return;
        }

        this.indicator.style.opacity = '1';
        this.btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const btnBox = btn.getBoundingClientRect();
        const containerBox = this.container.getBoundingClientRect();
        
        // Parent padding is 4px. Indicator container (gooey layer) is inset 4px.
        // We subtract the parent's padding (4px) to get the offset relative to the inner content box.
        const leftOffset = btnBox.left - containerBox.left - 4;

        if (instant) {
            this.indicator.style.transition = 'none';
        } else {
            this.indicator.style.transition = 'transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), width 0.4s cubic-bezier(0.19, 1, 0.22, 1)';
        }

        // Use floor/ceil to avoid sub-pixel bleed if necessary, but matching rect is usually best
        this.indicator.style.width = `${btnBox.width}px`;
        this.indicator.style.transform = `translateX(${leftOffset}px)`;
        
        if (instant) {
            void this.indicator.offsetWidth;
            this.indicator.style.transition = '';
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new NavBar());
} else {
    new NavBar();
}
