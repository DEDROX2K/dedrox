/**
 * 🧊 CUBE TRAIL ENGINE
 * Description: Responsive LERP-based fading cube trail.
 * Universal version for AirPaste.
 */

(function () {
    // --- 🎛️ TRAIL CONTROLS ---
    const CONFIG = {
        cellSize: 10,       // Size of each cube in pixels
        trailLength: 10,    // How many steps a cube lasts (higher = longer trail)
        trailColor: '0,0,0',// RGB color (Black by default for visibility)
        interval: 2,        // Update speed in ms (lower = smoother/faster)
    };

    const canvas = document.getElementById('pixelCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h;
    let cols, rows;
    let grid = [];

    let mouseX = -100, mouseY = -100; // Track current mouse position
    let lastMx = null, lastMy = null;

    function initGrid() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        cols = Math.ceil(w / CONFIG.cellSize);
        rows = Math.ceil(h / CONFIG.cellSize);
        grid = new Array(cols * rows).fill(0);
    }

    function getIdx(x, y) {
        x = (x + cols) % cols;
        y = (y + rows) % rows;
        return y * cols + x;
    }

    function update() {
        for (let i = 0; i < grid.length; i++) {
            if (grid[i] > 0) {
                grid[i] += 1;
                if (grid[i] > CONFIG.trailLength) grid[i] = 0;
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const idx = getIdx(x, y);
                const cell = grid[idx];
                if (cell > 0) {
                    const opacity = Math.max(0, 1 - (cell / CONFIG.trailLength));
                    ctx.fillStyle = `rgba(${CONFIG.trailColor}, ${opacity})`;
                    ctx.fillRect(x * CONFIG.cellSize, y * CONFIG.cellSize, CONFIG.cellSize, CONFIG.cellSize);
                }
            }
        }
    }

    let lastUpdate = 0;
    function animate(now) {
        if (now - lastUpdate > CONFIG.interval) {
            paintAt(mouseX, mouseY); // Always refresh the cube under the cursor
            update();
            lastUpdate = now;
        }
        draw();
        requestAnimationFrame(animate);
    }

    function paintAt(x, y) {
        const mx = Math.floor(x / CONFIG.cellSize);
        const my = Math.floor(y / CONFIG.cellSize);
        const idx = getIdx(mx, my);
        if (idx >= 0 && idx < grid.length) {
            grid[idx] = 1;
        }
    }

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (lastMx !== null && lastMy !== null) {
            const dist = Math.hypot(e.clientX - lastMx, e.clientY - lastMy);
            const steps = Math.ceil(dist / (CONFIG.cellSize / 3));
            for (let i = 0; i <= steps; i++) {
                const interX = lastMx + (e.clientX - lastMx) * (i / steps);
                const interY = lastMy + (e.clientY - lastMy) * (i / steps);
                paintAt(interX, interY);
            }
        } else {
            paintAt(e.clientX, e.clientY);
        }
        lastMx = e.clientX;
        lastMy = e.clientY;
    });

    window.addEventListener('resize', initGrid);
    initGrid();
    requestAnimationFrame(animate);
})();
