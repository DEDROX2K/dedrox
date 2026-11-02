/**
 * ">>>>" hover sweep for nav buttons and text links.
 *
 * Each character lives in its own span. While the sweep runs, every span is
 * locked to the width of the letter it holds and the ">" is centred inside
 * it, so swapping letters for arrows never changes the label's width and the
 * text can't slide around. Outside the sweep the spans are plain inline text,
 * so kerning is untouched.
 */
(function () {
    const SELECTOR = '.nav-toggle-btn, .footer-link, .pixel-btn-v2, .carousel-btn, .sw-tab, .dl-meta-link';
    const STEP_MS = 40;
    const NBSP = ' ';

    function prepare(el) {
        // Links with icons or other markup inside keep their content as-is
        if (el.dataset.scramblePrepared || el.children.length > 0) return;
        const text = el.textContent.trim();
        if (!text) return;

        el.dataset.text = text;
        el.dataset.scramblePrepared = 'true';
        if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', text);

        const letters = [...text].map(ch => (ch === ' ' ? NBSP : ch));
        el.textContent = '';
        const spans = letters.map(ch => {
            const span = document.createElement('span');
            span.className = 'sweep-char';
            span.setAttribute('aria-hidden', 'true');
            span.textContent = ch;
            el.appendChild(span);
            return span;
        });

        let timer = null;

        function finish() {
            clearInterval(timer);
            timer = null;
            spans.forEach((span, i) => {
                span.textContent = letters[i];
                span.style.width = '';
            });
            el.classList.remove('is-sweeping');
        }

        el.addEventListener('mouseenter', () => {
            if (timer) finish();
            // Measure each letter as it sits now, then pin it to that width
            spans.forEach(span => { span.style.width = `${span.getBoundingClientRect().width}px`; });
            el.classList.add('is-sweeping');

            const len = spans.length;
            let step = 0;
            timer = setInterval(() => {
                spans.forEach((span, i) => {
                    // First pass turns letters into arrows left to right, second pass restores them
                    const arrow = step < len ? i <= step : i > step - len;
                    span.textContent = arrow ? '>' : letters[i];
                });
                if (step >= len * 2) finish();
                step++;
            }, STEP_MS);
        });
    }

    function init() {
        document.querySelectorAll(SELECTOR).forEach(prepare);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
