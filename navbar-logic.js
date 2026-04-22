/**
 * AirPaste Navigation Logic & State Management
 * Standardizes navigation pill behavior, active states, and page transitions.
 */

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
            'toggleFree': 'forfree.html',
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

                // Navigate directly
                window.location.href = targetUrl;
            });
        });

        // Initialize Scramble / Arrow Sweep
        this.initArrowSweep('.nav-toggle-btn, .footer-link, .nav-shop img');

        window.addEventListener('resize', () => {
            const currentActive = document.querySelector('.nav-toggle-btn.active');
            this.updatePosition(currentActive, true);
        });
    }

    initArrowSweep(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            // Only prepare text elements
            if (el.tagName === 'IMG' || el.dataset.scramblePrepared) return;
            
            const originalText = el.textContent.trim();
            if (!originalText) return;

            // Prepare structure: Ghost span holds width, Display span shows animation
            el.style.display = 'inline-grid';
            el.style.placeItems = 'center';
            el.style.verticalAlign = 'middle';
            
            el.innerHTML = `
                <span class="scramble-ghost" style="grid-area: 1/1; visibility: hidden; pointer-events: none;">${originalText}</span>
                <span class="scramble-display" style="grid-area: 1/1; white-space: nowrap;">${originalText}</span>
            `;

            el.dataset.text = originalText;
            el.dataset.scramblePrepared = 'true';

            const display = el.querySelector('.scramble-display');
            let sweepInterval = null;

            el.addEventListener('mouseenter', () => {
                let iteration = 0;
                clearInterval(sweepInterval);

                sweepInterval = setInterval(() => {
                    const len = originalText.length;
                    let displayArray = originalText.split("");
                    for (let i = 0; i < len; i++) {
                        if (iteration < len) {
                            if (i <= iteration) displayArray[i] = ">";
                        } else {
                            const restoreIndex = iteration - len;
                            displayArray[i] = (i <= restoreIndex) ? originalText[i] : ">";
                        }
                    }
                    display.textContent = displayArray.join("");
                    if (iteration >= len * 2) {
                        clearInterval(sweepInterval);
                        display.textContent = originalText;
                    }
                    iteration++;
                }, 40);
            });
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
