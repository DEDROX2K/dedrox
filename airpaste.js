        // Force scroll to top on every page load (prevents ScrollTrigger.refresh drift)
        history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);

        // --- ASCII Hero Matrix (config-driven, easy to edit) ---
        (function () {
            const canvas = document.getElementById('asciiCanvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');

            const MATRIX_CONFIG = {
                cell: { w: 12, h: 24 },
                chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*;:/!?+=-",
                noiseOpacity: 0.05,
                noiseGapChance: 0.16, // higher = more random blank gaps in grey area
                background: "#FAF8F5",
                textColor: "#000",
                noiseColor: "rgba(0,0,0,0.05)",
                staticTopPattern: true,
                blocks: [
                    { text: "AIRPASTE", row: 8, col: 8 },
                    { text: "THE VISUAL BOOKMARK TASK MANAGEMENT TOOL;", row: 10, col: 8 },
                    { text: "A LOCAL-FIRST WORKSPACE FOR LINKS, NOTES, AND IDEAS -", row: 12, col: 8 },
                    { text: "DESIGNED TO FEEL REAL, FAST, AND YOURS.", row: 13, col: 8 },
                    { text: "AIRPASTE IS A LOCAL-FIRST WORKSPACE FOR EVERYTHING YOU SAVE:", row: 20, col: 8 },
                    { text: "- LINKS,", row: 21, col: 8 },
                    { text: "- NOTES", row: 22, col: 8 },
                    { text: "- IMAGES", row: 23, col: 8 },
                    { text: "- AND IDEAS", row: 24, col: 8 },
                    { text: "- ALL IN ONE PLACE.", row: 25, col: 8 },
                    { text: "LOCAL FIRST", row: 38, col: 8 },
                    { text: "PRIVATE", row: 39, col: 8 },
                    { text: "SECURE", row: 40, col: 8 },
                    { text: "BE THE CURATOR", row: 38, col: 15 }
                ]
            };

            let cols = 0;
            let rows = 0;
            let grid = [];
            const mouse = { col: -1, row: -1 };

            function randomChar() {
                const i = Math.floor(Math.random() * MATRIX_CONFIG.chars.length);
                return MATRIX_CONFIG.chars[i];
            }

            function createCell() {
                return { char: randomChar(), isSignal: false, isGap: Math.random() < MATRIX_CONFIG.noiseGapChance };
            }

            function buildGrid() {
                const dpr = window.devicePixelRatio || 1;
                cols = Math.ceil(window.innerWidth / MATRIX_CONFIG.cell.w);
                rows = Math.ceil(window.innerHeight / MATRIX_CONFIG.cell.h);
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                canvas.style.width = window.innerWidth + "px";
                canvas.style.height = window.innerHeight + "px";

                grid = Array.from({ length: rows }, () => Array.from({ length: cols }, createCell));

                if (MATRIX_CONFIG.staticTopPattern && rows > 0) {
                    for (let c = 0; c < cols; c++) {
                        grid[0][c].char = c % 2 === 0 ? "=" : "+";
                        grid[0][c].isSignal = true;
                        grid[0][c].isGap = false;
                    }
                }

                MATRIX_CONFIG.blocks.forEach(({ text, row, col }) => {
                    for (let i = 0; i < text.length; i++) {
                        if (!grid[row] || !grid[row][col + i]) continue;
                        grid[row][col + i].char = text[i];
                        grid[row][col + i].isSignal = true;
                        grid[row][col + i].isGap = false;
                    }
                });
            }

            function renderGrid() {
                if (window.scrollY > window.innerHeight) {
                    requestAnimationFrame(renderGrid);
                    return;
                }
                const dpr = window.devicePixelRatio || 1;
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = MATRIX_CONFIG.background;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

                const normalFont = `400 ${MATRIX_CONFIG.cell.h}px "JetBrains Mono", monospace`;
                const boldFont = `800 ${MATRIX_CONFIG.cell.h}px "JetBrains Mono", monospace`;
                ctx.textBaseline = "top";

                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const cell = grid[r][c];
                        const x = c * MATRIX_CONFIG.cell.w;
                        const y = r * MATRIX_CONFIG.cell.h;
                        const isHighlighted = r === mouse.row && c === mouse.col;

                        if (isHighlighted) {
                            ctx.fillStyle = "#000";
                            ctx.fillRect(x, y, MATRIX_CONFIG.cell.w, MATRIX_CONFIG.cell.h);
                            ctx.fillStyle = MATRIX_CONFIG.background;
                            ctx.font = boldFont;
                            ctx.fillText(cell.char, x, y);
                            continue;
                        }

                        if (cell.isSignal) {
                            ctx.fillStyle = MATRIX_CONFIG.textColor;
                            ctx.font = normalFont;
                            ctx.fillText(cell.char, x, y);
                        } else if (!cell.isGap) {
                            ctx.fillStyle = MATRIX_CONFIG.noiseColor;
                            ctx.font = normalFont;
                            ctx.fillText(cell.char, x, y);
                        }
                    }
                }
                requestAnimationFrame(renderGrid);
            }

            window.addEventListener("mousemove", (e) => {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                mouse.col = Math.floor(x / MATRIX_CONFIG.cell.w);
                mouse.row = Math.floor(y / MATRIX_CONFIG.cell.h);
            });

            window.addEventListener("resize", buildGrid);
            buildGrid();
            renderGrid();

            // For quick experiments in DevTools:
            // window.MATRIX_CONFIG.blocks = [{ text: "NEW LINE", row: 10, col: 8 }]; buildGrid();
            window.MATRIX_CONFIG = MATRIX_CONFIG;
            window.rebuildMatrixGrid = buildGrid;
        })();

        // Initialize Global Smooth Scroll (Lenis)
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        lenis.on('scroll', ScrollTrigger.update);

        // ==========================================
        // 🎫 SHOWCASE WINDOW TILT
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
        })();

        // ==========================================
        // 📥 DRAG-TO-AIRPASTE INTERACTION
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
        // 📷 BEFORE / AFTER SCRUBBER
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
        // 🎯 FEATURES ACCORDION LOGIC
        // ==========================================
        (function () {
            const accordionItems = document.querySelectorAll('.accordion-item');

            accordionItems.forEach(item => {
                item.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // Close all other items
                    accordionItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });

                    // Toggle current item
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            });
        })();

        // ==========================================
        // 🖼️ VIEWS DEMO CAROUSEL LOGIC
        // ==========================================
        (function () {
            const carousel = document.getElementById('viewsCarousel');
            if (!carousel) return;
            const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
            const labelEl = document.getElementById('viewsBottomLabel');
            const labels = ["01 List View", "02 Globe View", "03 Canvas View"];

            let currentIndex = 0;
            let startX = 0;
            let isDragging = false;
            let dragDistance = 0;
            let hasDragged = false;

            const SLIDE_WIDTH = 400; // Pixels for one full slide transition

            const styles = {
                '0': { x: 0, z: 150, r: 0, o: 1, b: 0, zi: 3 },
                '-1': { x: -380, z: -250, r: 40, o: 0.4, b: 2, zi: 1 },
                '1': { x: 380, z: -250, r: -40, o: 0.4, b: 2, zi: 1 }
            };

            function getInterpolatedStyle(pos, targetPos, progress) {
                const s1 = styles[pos];
                const s2 = styles[targetPos];
                return {
                    x: s1.x + (s2.x - s1.x) * progress,
                    z: s1.z + (s2.z - s1.z) * progress,
                    r: s1.r + (s2.r - s1.r) * progress,
                    o: s1.o + (s2.o - s1.o) * progress,
                    b: s1.b + (s2.b - s1.b) * progress,
                    zi: progress > 0.5 ? s2.zi : s1.zi
                };
            }

            function updatePositions(activeIndex, offset = 0) {
                // offset is pixels dragged, converted to -1 to 1 range
                let progress = offset / SLIDE_WIDTH;
                const sign = progress > 0 ? 1 : -1;
                const absProgress = Math.abs(progress);

                slides.forEach((slide, idx) => {
                    let pos = idx - activeIndex;
                    while (pos > 1) pos -= slides.length;
                    while (pos < -1) pos += slides.length;

                    // Calculate target position based on drag direction
                    let targetPos = pos + sign;
                    while (targetPos > 1) targetPos -= slides.length;
                    while (targetPos < -1) targetPos += slides.length;

                    const s = getInterpolatedStyle(pos, targetPos, absProgress);

                    gsap.set(slide, {
                        x: s.x,
                        z: s.z,
                        rotateY: s.r,
                        opacity: s.o,
                        filter: `blur(${s.b}px)`,
                        zIndex: s.zi,
                        immediateRender: true
                    });

                    if (absProgress > 0.5) {
                        if (pos === 0 && targetPos !== 0) slide.classList.remove('active');
                        if (targetPos === 0) slide.classList.add('active');
                    } else {
                        if (pos === 0) slide.classList.add('active');
                        else slide.classList.remove('active');
                    }
                });

                if (labelEl) {
                    let labelIndex = activeIndex;
                    if (absProgress > 0.5) {
                        labelIndex = (activeIndex - sign + slides.length) % slides.length;
                    }
                    labelEl.textContent = labels[labelIndex];
                }
            }

            // Initialize
            updatePositions(0);

            carousel.addEventListener('pointerdown', (e) => {
                startX = e.clientX;
                isDragging = true;
                hasDragged = false;
                carousel.setPointerCapture(e.pointerId);
                carousel.style.cursor = 'grabbing';
                // Stop any ongoing animations
                gsap.killTweensOf(slides);
            });

            carousel.addEventListener('pointermove', (e) => {
                if (!isDragging) return;
                dragDistance = e.clientX - startX;
                if (Math.abs(dragDistance) > 10) hasDragged = true;

                updatePositions(currentIndex, dragDistance);
            });

            carousel.addEventListener('pointerup', (e) => {
                if (!isDragging) return;
                isDragging = false;
                carousel.releasePointerCapture(e.pointerId);
                carousel.style.cursor = 'grab';

                const threshold = SLIDE_WIDTH * 0.2;

                if (Math.abs(dragDistance) > threshold) {
                    if (dragDistance > 0) {
                        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                    } else {
                        currentIndex = (currentIndex + 1) % slides.length;
                    }
                }

                // Snap to current index
                dragDistance = 0;

                // Final animation to clean positions
                slides.forEach((slide, idx) => {
                    let pos = idx - currentIndex;
                    while (pos > 1) pos -= slides.length;
                    while (pos < -1) pos += slides.length;

                    const s = styles[pos];
                    gsap.to(slide, {
                        x: s.x,
                        z: s.z,
                        rotateY: s.r,
                        opacity: s.o,
                        filter: `blur(${s.b}px)`,
                        zIndex: s.zi,
                        duration: 0.6,
                        ease: "power3.out"
                    });
                });

                if (labelEl) labelEl.textContent = labels[currentIndex];
            });

            // Prevent click if we dragged
            carousel.addEventListener('click', (e) => {
                if (hasDragged) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            }, true);
        })();
