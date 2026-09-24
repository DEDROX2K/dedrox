(function initAirpasteShellIntro() {
    document.addEventListener('dragstart', (event) => {
        if (event.target instanceof HTMLImageElement) {
            event.preventDefault();
        }
    }, { capture: true });

    const shell = document.getElementById('airpaste-device');
    if (!shell) return;

    const overlay = document.getElementById('airpaste-page-overlay');
    const TRANSITION_MS = 760;
    const AUTO_OPEN_DELAY = 700;
    let transitionTimer = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const withShellTransition = (run, { phase = null } = {}) => {
        if (transitionTimer) {
            window.clearTimeout(transitionTimer);
        }

        document.body.classList.remove('airpaste-opening', 'airpaste-closing');
        if (phase === 'opening' || phase === 'closing') {
            document.body.classList.add(`airpaste-${phase}`);
        }

        run();

        transitionTimer = window.setTimeout(() => {
            document.body.classList.remove('airpaste-opening', 'airpaste-closing');
            transitionTimer = 0;
        }, TRANSITION_MS);
    };

    const expandShell = () => {
        if (shell.classList.contains('expanded')) return;

        withShellTransition(() => {
            shell.classList.add('expanded');
            document.body.classList.remove('airpaste-shell-collapsed');
            document.body.classList.add('airpaste-shell-expanded');
            shell.removeAttribute('role');
            shell.removeAttribute('tabindex');
            shell.removeAttribute('aria-label');
        }, { phase: 'opening' });
    };

    const openIfCollapsed = (event) => {
        if (shell.classList.contains('expanded')) return;
        event?.preventDefault();
        event?.stopPropagation();
        expandShell();
    };

    shell.setAttribute('role', 'button');
    shell.setAttribute('tabindex', '0');
    shell.setAttribute('aria-label', 'Open AirPaste site');

    shell.addEventListener('click', openIfCollapsed);
    shell.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            openIfCollapsed(event);
        }
    });

    if (overlay) {
        window.setTimeout(() => {
            overlay.classList.remove('on-load');
        }, 100);
    }

    if (prefersReducedMotion) {
        shell.classList.add('expanded');
        document.body.classList.remove('airpaste-shell-collapsed');
        document.body.classList.add('airpaste-shell-expanded');
        shell.removeAttribute('role');
        shell.removeAttribute('tabindex');
        shell.removeAttribute('aria-label');
        if (overlay) overlay.classList.remove('on-load');
        return;
    }

    window.setTimeout(expandShell, AUTO_OPEN_DELAY);
})();
