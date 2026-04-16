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
        residueStrength: 8, // Added density per move
        fontSize: 14,
        blue: '#0047FF',    // AirPaste Blue
        white: '#FFFFFF'
    };

    let w, h, cols, rows;
    let grid = [];

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
        if (!moved) { pmx = e.clientX; pmy = e.clientY; moved = true; }
        mx = e.clientX;
        my = e.clientY;

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

    function update() {
        const nextGrid = grid.map(c => ({...c}));
        
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
                    y > 0 ? grid[(y-1)*cols+x] : null,
                    y < rows-1 ? grid[(y+1)*cols+x] : null,
                    x > 0 ? grid[y*cols+(x-1)] : null,
                    x < cols-1 ? grid[y*cols+(x+1)] : null
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
        ctx.clearRect(0, 0, w, h);

        ctx.font = `${SETTINGS.fontSize}px 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = grid[y * cols + x];
                const d = Math.min(cell.density, 10) / 10;
                
                const char = getArrow(cell.vx, cell.vy);
                const sx = x * SETTINGS.gridSize;
                const sy = y * SETTINGS.gridSize;

                // In high density areas, fill the background blue and show white arrow
                if (cell.density > 2) {
                    ctx.fillStyle = SETTINGS.blue;
                    ctx.fillRect(sx, sy, SETTINGS.gridSize, SETTINGS.gridSize);
                    ctx.fillStyle = SETTINGS.white;
                    ctx.fillText(char, sx + SETTINGS.gridSize/2, sy + SETTINGS.gridSize/2);
                } else {
                    // In low density, white background and blue arrow (strength based on density)
                    ctx.fillStyle = SETTINGS.blue;
                    ctx.globalAlpha = 0.1 + d * 0.9;
                    ctx.fillText(char, sx + SETTINGS.gridSize/2, sy + SETTINGS.gridSize/2);
                    ctx.globalAlpha = 1.0;
                }
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

