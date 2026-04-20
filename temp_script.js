
        // Force scroll to top on every page load (prevents ScrollTrigger.refresh drift)
        history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);

        // --- Core Engines Extracted to cube-trail.js ---

        // ==========================================
        // 🪟 SHOWCASE WINDOW TILT
        // ==========================================
        (function () {
            const TILT = 6;    // max degrees
            const EASE = 0.07;
            const windows = [
                document.getElementById('showcaseAirpaste'),
                document.getElementById('bwSpotify'),
                document.getElementById('bwYoutube'),
                document.getElementById('bwPinterest'),
            ];

            windows.forEach(el => {
                if (!el) return;
                let tx = 0, ty = 0, cx = 0, cy = 0, raf;

                el.addEventListener('mouseenter', () => {
                    function loop() {
                        cx += (tx - cx) * EASE;
                        cy += (ty - cy) * EASE;
                        el.style.transform = `${el.dataset.baseTransform || ''} perspective(600px) rotateY(${cx}deg) rotateX(${-cy}deg) scale(1.015)`;
                        el.style.boxShadow = `0 30px 80px rgba(0,0,0,0.22), 0 6px 18px rgba(0,0,0,0.1)`;
                        raf = requestAnimationFrame(loop);
                    }
                    loop();
                });

                el.addEventListener('mousemove', e => {
                    const r = el.getBoundingClientRect();
                    tx = ((e.clientX - r.left) / r.width - 0.5) * 2 * TILT;
                    ty = ((e.clientY - r.top) / r.height - 0.5) * 2 * TILT;
                });

                el.addEventListener('mouseleave', () => {
                    cancelAnimationFrame(raf);
                    tx = 0; ty = 0;
                    let f = 0;
                    function settle() {
                        cx += (0 - cx) * 0.07;
                        cy += (0 - cy) * 0.07;
                        el.style.transform = `${el.dataset.baseTransform || ''} perspective(600px) rotateY(${cx}deg) rotateX(${-cy}deg) scale(1)`;
                        if (++f < 50) requestAnimationFrame(settle);
                        else { el.style.transform = el.dataset.baseTransform || ''; el.style.boxShadow = ''; }
                    }
                    settle();
                });
            });

            // No base transforms needed — positioning is purely via CSS top/left
        })();

        // ==========================================
        // 🎯 DRAG-TO-AIRPASTE INTERACTION
        // ==========================================
        (function () {
            const ghost = document.getElementById('dragGhost');
            const ghostLabel = document.getElementById('dragGhostLabel');
            const apWin = document.getElementById('showcaseAirpaste');
            const canvas = apWin ? apWin.querySelector('.sw-canvas') : null;
            const browsers = document.querySelectorAll('.browser-window');

            if (!ghost || !canvas) return;

            let dragging = null;   // the browser-window el being dragged
            let isDragging = false;

            // Tile counter for random placement
            let tileCount = 5;

            // Colours / thumb configs per source
            const TILE_CONFIGS = {
                spotify: { label: 'Spotify playlist', bg: 'linear-gradient(135deg,#1db954,#191414)' },
                youtube: { label: 'YouTube video', bg: 'linear-gradient(135deg,#cc0000,#282828)' },
                twitter: { label: 'x.com/ui8/...', bg: 'linear-gradient(135deg,#000000,#1d9bf0)' },
            };

            // ---- Move ghost with mouse ----
            function onMouseMove(e) {
                if (!isDragging) return;
                ghost.style.left = e.clientX + 'px';
                ghost.style.top = e.clientY + 'px';

                // Highlight AirPaste window when cursor is over it
                const apRect = apWin.getBoundingClientRect();
                const over = e.clientX >= apRect.left && e.clientX <= apRect.right &&
                    e.clientY >= apRect.top && e.clientY <= apRect.bottom;
                apWin.classList.toggle('drop-active', over);
            }

            // ---- Drop ----
            function onMouseUp(e) {
                if (!isDragging || !dragging) return;
                isDragging = false;

                ghost.classList.remove('visible');
                dragging.classList.remove('is-dragging');

                const apRect = apWin.getBoundingClientRect();
                const dropped = e.clientX >= apRect.left && e.clientX <= apRect.right &&
                    e.clientY >= apRect.top && e.clientY <= apRect.bottom;

                apWin.classList.remove('drop-active');

                if (dropped) {
                    const id = dragging.dataset.dragId;
                    const cfg = TILE_CONFIGS[id] || { label: dragging.dataset.dragLabel, bg: '#ccc' };

                    // Calculate drop position relative to canvas
                    const canvasRect = canvas.getBoundingClientRect();
                    const relX = Math.max(4, Math.min(e.clientX - canvasRect.left - 40, canvasRect.width - 140));
                    const relY = Math.max(4, Math.min(e.clientY - canvasRect.top - 20, canvasRect.height - 60));

                    const tile = document.createElement('div');
                    tile.className = 'sw-tile sw-dropped';
                    tile.style.cssText = `left:${relX}px; top:${relY}px; animation-delay:0s;`;
                    tile.innerHTML = `
                        <div class="sw-tile-thumb" style="background:${cfg.bg}"></div>
                        <span>${cfg.label}</span>`;
                    canvas.appendChild(tile);
                }

                dragging = null;
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            }

            // ---- Attach mousedown to each overlay ----
            browsers.forEach(bw => {
                const overlay = bw.querySelector('.bw-drag-overlay');
                if (!overlay) return;

                overlay.addEventListener('mousedown', e => {
                    e.preventDefault();
                    dragging = bw;
                    isDragging = true;

                    bw.classList.add('is-dragging');

                    // Set ghost label
                    ghostLabel.textContent = bw.dataset.dragLabel || 'link';
                    ghost.style.left = e.clientX + 'px';
                    ghost.style.top = e.clientY + 'px';
                    ghost.classList.add('visible');

                    window.addEventListener('mousemove', onMouseMove);
                    window.addEventListener('mouseup', onMouseUp);
                });
            });
        })();

        // ==========================================
        // 🎛️ MASTER ANIMATION CONTROLS
        // ==========================================
        const CONTROLS = {
            parallaxMagnitude: 0.2,
            parallaxEase: 0.08,
            squeezeAmount: 0.08, // Restored breathing
            squeezeBaseSpeed: 0.01,
            hoverMultiplier: 1.5,
            buttonHoverMultiplier: 4,
            transitionSpeed: 0.05
        };

        const parallaxElements = document.querySelectorAll('[data-speed]');
        const layers = document.querySelectorAll('.layer');
        const btn = document.querySelector('.hero-btn');

        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
        let time = 0;

        let isHeroHovered = true;
        let isButtonHovered = false;
        let currentSpeedMultiplier = 1;

        window.addEventListener('mousemove', (e) => {
            targetX = (e.clientX - window.innerWidth / 2);
            targetY = (e.clientY - window.innerHeight / 2);
        });

        if (btn) {
            btn.addEventListener('mouseenter', () => { isButtonHovered = true; });
            btn.addEventListener('mouseleave', () => { isButtonHovered = false; });
        }

        // All parallax and squeeze animations removed as per request

        // ==========================================
        // 🔡 SCRAMBLE TEXT CYCLER
        // ==========================================
        const PHRASES = [
            'Air Paste it',
            'Air Paste it',
        ];

        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
        const SCRAMBLE_DURATION = 600; // ms to resolve each character

        const btnText = document.querySelector('.btn-text');
        let phraseIndex = 0;
        let scrambleRaf = null;
        let lastHoverTime = 0;

        function scrambleTo(target) {
            if (scrambleRaf) cancelAnimationFrame(scrambleRaf);
            if (!btnText) return;

            // 1. ADD THE BLUR CLASS HERE
            btnText.classList.add('is-scrambling');

            const start = performance.now();
            const origin = btnText.textContent;
            const len = Math.max(origin.length, target.length);

            function frame(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / SCRAMBLE_DURATION, 1);
                const resolved = Math.floor(progress * len);

                let output = '';
                for (let i = 0; i < len; i++) {
                    if (i < resolved) {
                        output += target[i] ?? '';
                    } else if (i < target.length) {
                        output += CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                }
                btnText.textContent = output;

                if (progress < 1) {
                    scrambleRaf = requestAnimationFrame(frame);
                } else {
                    btnText.textContent = target;

                    // 2. REMOVE THE BLUR CLASS HERE
                    btnText.classList.remove('is-scrambling');

                    scrambleRaf = null;
                }
            }

            scrambleRaf = requestAnimationFrame(frame);
        }
        function nextPhrase() {
            phraseIndex = (phraseIndex + 1) % PHRASES.length;
            scrambleTo(PHRASES[phraseIndex]);
        }

        // Auto-cycle every 6 seconds
        let cycleTimer = setInterval(nextPhrase, 6000);

        // Hover triggers the next phrase (with a short cooldown so it doesn't spam)
        if (btn) {
            btn.addEventListener('mouseenter', () => {
                const now = Date.now();
                if (now - lastHoverTime > 800) {
                    lastHoverTime = now;
                    clearInterval(cycleTimer);
                    nextPhrase();
                    cycleTimer = setInterval(nextPhrase, 6000);
                }
            });
        }

        // ==========================================
        // 📜 HERO TITLE — SCROLL-DRIVEN SHRINK
        // ==========================================
        const heroTitle = document.querySelector('.hero-title-center');

        // The font size range (in px) JS will interpolate between.
        // We measure the starting size from the element itself after render.
        const FONT_MIN_PX = 28;   // shrinks down to ~1.75rem at full scroll
        const RISE_PX = 50;   // rises 50px by the time hero is fully scrolled past

        // Snapshot the starting font size ONCE before any mutation
        const FONT_START_PX = heroTitle ? parseFloat(getComputedStyle(heroTitle).fontSize) : 0;

        const navLinks = document.querySelector('.nav-links');
        const getBtn = document.querySelector('.get-btn');

        function updateHeroTitle() {
            const progress = Math.min(window.scrollY / 500, 1);

            // Title Fly-out
            const flyY = -300 * progress;
            if (heroTitle) {
                heroTitle.style.opacity = 1;
                heroTitle.style.transform = `translate(-50%, calc(-50% + ${flyY}px))`;
            }

            // Nav Elements Reveal
            // Center Pill
            if (navLinks) navLinks.style.pointerEvents = 'auto';

            // Right CTA Button
            if (getBtn) getBtn.style.pointerEvents = 'auto';
        }

        // Run once on load so the state is correct if page was already scrolled
        updateHeroTitle();
        window.addEventListener('scroll', updateHeroTitle, { passive: true });
        window.addEventListener('resize', updateHeroTitle, { passive: true });

        // ==========================================
        // 🖼️ BEFORE / AFTER SCRUBBER
        // ==========================================
        (function () {
            const card = document.getElementById('scrubberCard');
            const before = document.getElementById('scrubberBefore');
            const divider = document.getElementById('scrubberDivider');
            if (!card || !before || !divider) return;

            const TILT_MAX = 8;

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;

                const targetPct = x * 100;
                const targetTiltX = (x - 0.5) * 2 * TILT_MAX;
                const targetTiltY = (y - 0.5) * 2 * TILT_MAX;

                gsap.to(before, { width: targetPct + '%', duration: 0.2, ease: "power2.out" });
                gsap.to(divider, { left: targetPct + '%', duration: 0.2, ease: "power2.out" });
                gsap.to(card, {
                    rotateY: targetTiltX,
                    rotateX: -targetTiltY,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
            });
        })();

        // ==========================================
        // 🌀 INTERACTIVE ENDLESS MOTION (FOOTER VOID)
        // ==========================================
        (function () {
            const VOID_SETTINGS = {
                lerp: 0.1,
                text: "Download Airpaste Today",
                lineGap: "12vh"
            };

            const voidEl = document.querySelector('.footer-void');
            const lines = document.querySelector('.lines');
            if (!voidEl || !lines) return;

            voidEl.style.setProperty('--line-gap', VOID_SETTINGS.lineGap);
            document.querySelectorAll('.line-text').forEach(t => t.textContent = VOID_SETTINGS.text);

            const group = document.querySelector('.lines-group');
            if (group) {
                lines.appendChild(group.cloneNode(true));
                lines.appendChild(group.cloneNode(true));
            }

            const lenis = new Lenis({
                wrapper: voidEl,
                content: lines,
                smoothWheel: true,
                infinite: true,
                lerp: VOID_SETTINGS.lerp,
            });

            function anim(time) {
                lenis.raf(time);
                requestAnimationFrame(anim);
            }
            requestAnimationFrame(anim);

            lenis.on('scroll', ScrollTrigger.update);

            gsap.utils.toArray('.line-text').forEach((line) => {
                gsap.fromTo(line, 
                    { scale: 1.1, opacity: 0.4 }, 
                    { 
                        scale: 0.5, 
                        opacity: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: line,
                            scroller: voidEl,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );
            });

            setTimeout(() => ScrollTrigger.refresh(), 500);
        })();


        // ==========================================
        // 👾 ASCII / ARROW SWEEP EFFECT
        // ==========================================
        // (Now handled centrally by navbar-logic.js)


        (function () {
            const carouselData = [
                {
                    title: "Curate with Ease",
                    sub: "A sanctuary for your digital discoveries",
                    desc: "Save articles, images, and notes without being tracked or nudge-baited.",
                    img: "images/f1.png"
                },
                {
                    title: "Local-First Logic",
                    sub: "Your data stays where it belongs",
                    desc: "Everything is stored on your device. We don't have accounts because we don't have your data.",
                    img: "images/f2.png"
                },
                {
                    title: "Pure Interaction",
                    sub: "Zero streaks, zero badges",
                    desc: "Focus on what matters. We stripped away the addictive loops and left the utility.",
                    img: "images/f3.png"
                },
                {
                    title: "Technical Freedom",
                    sub: "Open-source and Extensible",
                    desc: "Built for those who value digital sovereignty. Your library, your rules.",
                    img: "images/f4.png"
                }
            ];

            let currentIndex = 0;
            const titleEl = document.getElementById('premiumCarouselTitle');
            const subEl = document.getElementById('premiumCarouselSub');
            const descEl = document.getElementById('premiumCarouselDesc');
            const imgEl = document.getElementById('premiumCarouselImg');
            const paginationEl = document.getElementById('carouselPagination');
            const prevBtn = document.getElementById('prevCarousel');
            const nextBtn = document.getElementById('nextCarousel');

            const AUTO_SKIP_TIME = 3000;
            let autoSkipTimer;
            let progressInterval;
            let progressValue = 0;

            function startAutoSkip() {
                clearInterval(autoSkipTimer);
                clearInterval(progressInterval);
                progressValue = 0;

                // Ensure only the current active dot has a fill
                document.querySelectorAll('.dot-fill').forEach(el => el.remove());

                const activeDot = document.querySelectorAll('.dot')[currentIndex];
                if (activeDot) {
                    const fill = document.createElement('div');
                    fill.className = 'dot-fill';
                    activeDot.appendChild(fill);
                }

                progressInterval = setInterval(() => {
                    progressValue += (100 / (AUTO_SKIP_TIME / 100));
                    const currentFill = document.querySelector('.dot.active .dot-fill');
                    if (currentFill) {
                        currentFill.style.width = Math.min(progressValue, 100) + '%';
                    }
                }, 100);

                autoSkipTimer = setInterval(() => {
                    currentIndex = (currentIndex + 1) % carouselData.length;
                    updateSlide();
                }, AUTO_SKIP_TIME);
            }

            function initCarousel() {
                carouselData.forEach((_, i) => {
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => {
                        currentIndex = i;
                        updateSlide();
                    });
                    paginationEl.appendChild(dot);
                });

                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
                    updateSlide();
                });

                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % carouselData.length;
                    updateSlide();
                });

                startAutoSkip();
            }

            function updateSlide() {
                const data = carouselData[currentIndex];
                imgEl.classList.add('fade-out');

                setTimeout(() => {
                    titleEl.textContent = data.title;
                    subEl.textContent = data.sub;
                    descEl.textContent = data.desc;
                    imgEl.src = data.img;

                    const dots = document.querySelectorAll('.dot');
                    dots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === currentIndex);
                    });

                    imgEl.classList.remove('fade-out');

                    // Restart auto-skip to sync progress bar with the new slide
                    startAutoSkip();
                }, 400);
            }

            if (titleEl) initCarousel();
        })();

    