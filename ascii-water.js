/**
 * 🌀 ASCII FLUID ENGINE
 * Description: Grid-based vector field with "dye" (residue) advection.
 * Renders as interactive ASCII arrows reacting to mouse movement.
 */

(function () {
    const canvas = document.getElementById('pixelCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // --- 🎛️ SETTINGS ---
    const SETTINGS = {
        gridSize: 20,       // Smaller cells for more detail
        viscosity: 0.98,    // How much velocity is kept (0.9-0.99)
        diffusion: 0.97,    // How much 'residue' is kept (0.9-0.99)
        mouseForce: 0.4,    // Pushing strength
        residueStrength: 29, // Added density per move
        fontSize: 14,
        blue: '#a1a1a1ff',    // AirPaste Blue
        white: '#ff0000ff',
        coverImgSrc: 'images/bg19.jpg'
    };

    let w, h, cols, rows;
    let grid = [];
    const coverImg = new Image();
    coverImg.src = SETTINGS.coverImgSrc;

    function init() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        cols = Math.ceil(w / SETTINGS.gridSize) + 1;
        rows = Math.ceil(h / SETTINGS.gridSize) + 1;

        grid = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                // Initialize with some base density in a circle (matching image)
                const dx = x - cols / 2;
                const dy = y - rows / 2;
                const dist = Math.hypot(dx, dy);
                const initialDensity = dist < 12 ? (1 - dist / 12) * 5 : 0;

                grid.push({
                    vx: 0,
                    vy: 0,
                    density: initialDensity
                });
            }
        }
    }

    function getArrow(vx, vy) {
        const mag = Math.hypot(vx, vy);
        if (mag < 0.05) return '·';

        const angle = Math.atan2(vy, vx) * (180 / Math.PI);
        const norm = (angle + 360 + 22.5) % 360;
        const arrows = ['→', '↘', '↓', '↙', '←', '↖', '↑', '↗'];
        return arrows[Math.floor(norm / 45) % 8];
    }

    let mx = 0, my = 0, pmx = 0, pmy = 0;
    let moved = false;

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        // Check if cursor is within the hero section boundaries
        if (e.clientY > rect.bottom || e.clientY < rect.top ||
            e.clientX > rect.right || e.clientX < rect.left) {
            moved = false; // Reset for when we re-enter
            return;
        }

        if (!moved) { pmx = e.clientX - rect.left; pmy = e.clientY - rect.top; moved = true; }
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;

        const gx = Math.floor(mx / SETTINGS.gridSize);
        const gy = Math.floor(my / SETTINGS.gridSize);

        const dvx = (mx - pmx) * SETTINGS.mouseForce;
        const dvy = (my - pmy) * SETTINGS.mouseForce;

        const radius = 3;
        for (let j = -radius; j <= radius; j++) {
            for (let i = -radius; i <= radius; i++) {
                const tx = gx + i;
                const ty = gy + j;
                if (tx >= 0 && tx < cols && ty >= 0 && ty < rows) {
                    const idx = ty * cols + tx;
                    const d = Math.hypot(i, j);
                    const falloff = Math.max(0, 1 - d / radius);
                    grid[idx].vx += dvx * falloff;
                    grid[idx].vy += dvy * falloff;
                    grid[idx].density += SETTINGS.residueStrength * falloff;
                }
            }
        }
        pmx = mx; pmy = my;
    });

    // --- 👆 TAP TO RIPPLE ---
    window.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        // Check if cursor is within the hero
        if (e.clientY > rect.bottom || e.clientY < rect.top ||
            e.clientX > rect.right || e.clientX < rect.left) {
            return;
        }

        const localMx = e.clientX - rect.left;
        const localMy = e.clientY - rect.top;

        const gx = Math.floor(localMx / SETTINGS.gridSize);
        const gy = Math.floor(localMy / SETTINGS.gridSize);

        const rippleRadius = 10;
        const rippleStrength = 40;
        const rippleVelocity = 2.5;

        for (let j = -rippleRadius; j <= rippleRadius; j++) {
            for (let i = -rippleRadius; i <= rippleRadius; i++) {
                const tx = gx + i;
                const ty = gy + j;
                if (tx >= 0 && tx < cols && ty >= 0 && ty < rows) {
                    const idx = ty * cols + tx;
                    const d = Math.hypot(i, j);
                    const falloff = Math.max(0, 1 - d / rippleRadius);

                    if (falloff > 0) {
                        // Outward velocity
                        const angle = Math.atan2(j, i);
                        grid[idx].vx += Math.cos(angle) * rippleVelocity * falloff;
                        grid[idx].vy += Math.sin(angle) * rippleVelocity * falloff;
                        // Massive density burst
                        grid[idx].density += rippleStrength * falloff;
                    }
                }
            }
        }
    });

    function update() {
        const nextGrid = grid.map(c => ({ ...c }));

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const idx = y * cols + x;
                const cell = grid[idx];

                // Velocity flow (very basic advection)
                cell.vx *= SETTINGS.viscosity;
                cell.vy *= SETTINGS.viscosity;
                cell.density *= SETTINGS.diffusion;

                // Move density along velocity
                if (Math.abs(cell.vx) > 0.1 || Math.abs(cell.vy) > 0.1) {
                    const tx = x + Math.round(cell.vx * 0.2);
                    const ty = y + Math.round(cell.vy * 0.2);
                    if (tx >= 0 && tx < cols && ty >= 0 && ty < rows) {
                        const tidx = ty * cols + tx;
                        const amt = cell.density * 0.05;
                        grid[tidx].density += amt;
                        cell.density -= amt;
                    }
                }

                // Add tiny swirl/curl effect to make it feel like "water"
                const neighbors = [
                    y > 0 ? grid[(y - 1) * cols + x] : null,
                    y < rows - 1 ? grid[(y + 1) * cols + x] : null,
                    x > 0 ? grid[y * cols + (x - 1)] : null,
                    x < cols - 1 ? grid[y * cols + (x + 1)] : null
                ];

                neighbors.forEach((n, i) => {
                    if (n) {
                        const pull = 0.01;
                        cell.vx += (n.vx - cell.vx) * pull;
                        cell.vy += (n.vy - cell.vy) * pull;
                    }
                });
            }
        }
    }

    function draw() {
        // 1. Fill/Draw the cover image as the mask
        ctx.globalCompositeOperation = 'source-over';

        if (coverImg.complete) {
            // "Cover" scaling logic for drawing image on canvas
            const imgAspect = coverImg.width / coverImg.height;
            const canvasAspect = w / h;
            let renderW, renderH, offsetX, offsetY;

            if (canvasAspect > imgAspect) {
                renderW = w;
                renderH = w / imgAspect;
                offsetX = 0;
                offsetY = -(renderH - h) / 2;
            } else {
                renderW = h * imgAspect;
                renderH = h;
                offsetX = -(renderW - w) / 2;
                offsetY = 0;
            }
            ctx.drawImage(coverImg, offsetX, offsetY, renderW, renderH);
        } else {
            // Fallback while loading
            ctx.fillStyle = SETTINGS.white;
            ctx.fillRect(0, 0, w, h);
        }

        // 2. Punch holes where the density is high
        ctx.globalCompositeOperation = 'destination-out';
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = grid[y * cols + x];
                if (cell.density > 2) {
                    const sx = x * SETTINGS.gridSize;
                    const sy = y * SETTINGS.gridSize;
                    ctx.fillRect(sx, sy, SETTINGS.gridSize, SETTINGS.gridSize);
                }
            }
        }

        // 3. Draw the arrows on top
        ctx.globalCompositeOperation = 'source-over';
        ctx.font = `${SETTINGS.fontSize}px 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = grid[y * cols + x];
                const d = Math.min(cell.density, 10) / 10;

                const char = getArrow(cell.vx, cell.vy);
                const sx = x * SETTINGS.gridSize + SETTINGS.gridSize / 2;
                const sy = y * SETTINGS.gridSize + SETTINGS.gridSize / 2;

                ctx.fillStyle = SETTINGS.blue;
                ctx.globalAlpha = cell.density > 2 ? 1.0 : (0.1 + d * 0.9);
                ctx.fillText(char, sx, sy);
                ctx.globalAlpha = 1.0;
            }
        }
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', init);
    init();
    loop();
})();

