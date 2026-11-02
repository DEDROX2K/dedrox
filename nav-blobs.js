/**
 * Blob nav — one grey pill behind each nav button, merged by a gooey SVG
 * filter so the joins pinch like liquid. The white active pill (the
 * existing .nav-toggle-indicator) is lifted out of the filtered layer so it
 * stays crisp; each page's own nav script keeps moving it.
 */
(function () {
    // Off for now — the site uses the original pixel nav. Set to true to bring the blobs back.
    const BLOB_NAV_ENABLED = false;
    if (!BLOB_NAV_ENABLED) return;

    const SVG_NS = 'http://www.w3.org/2000/svg';
    const FILTER_ID = 'ap-nav-goo';

    function ensureFilter() {
        if (document.getElementById(FILTER_ID)) return;
        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute('width', '0');
        svg.setAttribute('height', '0');
        svg.setAttribute('aria-hidden', 'true');
        svg.style.position = 'absolute';
        svg.innerHTML = `
            <defs>
                <filter id="${FILTER_ID}">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                    <feColorMatrix in="blur" mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
            </defs>`;
        document.body.appendChild(svg);
    }

    function build() {
        const container = document.querySelector('.nav-toggle-container');
        if (!container) return;
        const layer = container.querySelector('.nav-toggle-gooey-layer');
        const row = container.querySelector('.nav-toggle-buttons');
        const indicator = container.querySelector('.nav-toggle-indicator');
        if (!layer || !row) return;

        ensureFilter();
        container.classList.add('is-blob');

        if (indicator && indicator.parentElement === layer) {
            container.insertBefore(indicator, row);
        }

        const btns = [...row.querySelectorAll('.nav-toggle-btn')];
        const blobs = btns.map(btn => {
            const blob = document.createElement('span');
            blob.className = 'nav-blob';
            layer.appendChild(blob);
            btn.addEventListener('mouseenter', () => blob.classList.add('is-hover'));
            btn.addEventListener('mouseleave', () => blob.classList.remove('is-hover'));
            return blob;
        });

        function layout() {
            // How far each blob reaches into its neighbour — sets how fat the necks are
            const raw = parseFloat(getComputedStyle(container).getPropertyValue('--blob-overlap'));
            const overlap = Number.isNaN(raw) ? 0 : raw;
            btns.forEach((btn, i) => {
                const left = i === 0 ? 0 : overlap;
                const right = i === btns.length - 1 ? 0 : overlap;
                blobs[i].style.left = `${btn.offsetLeft - left}px`;
                blobs[i].style.width = `${btn.offsetWidth + left + right}px`;
            });
        }

        layout();
        if (document.fonts) document.fonts.ready.then(layout);
        window.addEventListener('resize', layout);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', build);
    } else {
        build();
    }
})();
