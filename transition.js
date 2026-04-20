/**
 * AirPaste 2D ASCII Sweep Transition Engine
 * Uses a Canvas to create a left-to-right sweep of ASCII "water"
 */

class AsciiSweepTransition {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.chars = "01/~>+*\\#%@".split("");
        this.fontSize = 90;

        // Setup canvas styles
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.style.zIndex = '10000'; // Make it very high
        this.canvas.style.pointerEvents = 'none';

        document.body.appendChild(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Check if we are "arriving" from a sweep
        if (sessionStorage.getItem('ascii_sweep') === 'true') {
            sessionStorage.removeItem('ascii_sweep');
            // Slight delay so the DOM has a moment to paint the initial state properly
            setTimeout(() => {
                this.playReveal();
            }, 50);
        }
    }

    resize() {
        this.canvas.width = window.innerWidth * window.devicePixelRatio;
        this.canvas.height = window.innerHeight * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        this.cols = Math.ceil(window.innerWidth / (this.fontSize * 0.6));
        this.rows = Math.ceil(window.innerHeight / this.fontSize);
    }

    start(nextUrl) {
        // Prevent transition if we are already on the target URL (same page, different hash)
        const currentPath = window.location.pathname.split('/').pop() || 'airpaste.html';
        const [nextPath, nextHash] = nextUrl.split('#');

        if (nextPath === currentPath || nextPath === '' || nextUrl.startsWith('#')) {
            if (nextHash) {
                const target = document.getElementById(nextHash) || document.getElementsByName(nextHash)[0];
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
            return;
        }

        if (this.isTransitioning) return;
        this.isTransitioning = true;

        this.canvas.style.pointerEvents = 'all'; // block interaction
        this.canvas.style.visibility = 'visible';
        let progress = -0.2; // Start a little offscreen

        const animate = () => {
            progress += 0.035; // Speed of sweep
            this.drawSweep(progress, true); // true = filling the screen

            if (progress >= 1.5) {
                // Done filling. Set flag and navigate
                sessionStorage.setItem('ascii_sweep', 'true');
                window.location.href = nextUrl;
            } else {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }

    playReveal() {
        this.isTransitioning = true;
        this.canvas.style.pointerEvents = 'all';
        this.canvas.style.visibility = 'visible';
        // Fill canvas with complete block initially so we don't see the page underneath immediately
        this.drawSweep(-0.2, false);

        let progress = -0.2;
        const animate = () => {
            progress += 0.035;
            this.drawSweep(progress, false); // false = clearing the screen

            if (progress >= 1.5) {
                this.canvas.style.pointerEvents = 'none';
                this.canvas.style.visibility = 'hidden';
                this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
                this.isTransitioning = false;
            } else {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }

    drawSweep(progress, isFilling) {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.ctx.font = `bold ${this.fontSize}px 'p2', monospace`;
        this.ctx.textBaseline = "top";

        const waveWidth = 0.4;

        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {

                const colP = col / this.cols;
                // Add organic wave distortion
                const distortion = Math.sin(row * 0.3 + progress * 5) * 0.05 +
                    Math.cos(row * 0.1 - col * 0.1) * 0.05;
                const organicColP = colP + distortion;

                const dist = organicColP - progress;
                let fillFactor = 0;

                if (isFilling) {
                    if (dist > 0) fillFactor = 0; // hasn't reached
                    else if (dist < -waveWidth) fillFactor = 1; // passed
                    else fillFactor = -dist / waveWidth; // 0 to 1
                } else {
                    if (dist > 0) fillFactor = 1; // hasn't reached
                    else if (dist < -waveWidth) fillFactor = 0; // passed
                    else fillFactor = 1 - (-dist / waveWidth); // 1 to 0
                }

                // Noise element to break up the leading edge
                fillFactor += (Math.random() * 0.2 - 0.1) * (1 - fillFactor);
                fillFactor = Math.max(0, Math.min(1, fillFactor)); // Clamp

                if (fillFactor > 0) {
                    let isSolid = fillFactor > 0.8 || (fillFactor > Math.random());

                    if (isSolid) {
                        // Draw black background cell
                        this.ctx.fillStyle = '#0a0a0a';
                        this.ctx.fillRect(col * (this.fontSize * 0.6), row * this.fontSize, this.fontSize * 0.6, this.fontSize);

                        // Occasionally draw a faint character inside the solid black block
                        if (Math.random() > 0.9) {
                            this.ctx.fillStyle = '#222';
                            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
                            this.ctx.fillText(char, col * (this.fontSize * 0.6), row * this.fontSize);
                        }
                    } else {
                        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.8)';
                        this.ctx.fillRect(col * (this.fontSize * 0.6), row * this.fontSize, this.fontSize * 0.6, this.fontSize);

                        this.ctx.fillStyle = '#ffffff'; // White characters at the wave crest
                        const char = this.chars[Math.floor(Math.random() * this.chars.length)];
                        this.ctx.fillText(char, col * (this.fontSize * 0.6), row * this.fontSize);
                    }
                }
            }
        }
    }
}

// Global instance
window.transition = new AsciiSweepTransition();

// Intercept links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && !link.target) {
        const href = link.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('mailto:')) {
            // Only transition if it's a local .html page and NOT just a hash change
            const currentPath = window.location.pathname.split('/').pop() || 'airpaste.html';
            const [nextPath] = href.split('#');

            if (nextPath && nextPath !== currentPath && nextPath !== '') {
                e.preventDefault();
                window.transition.start(href);
            }
        }
    }
});
