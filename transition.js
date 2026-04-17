/**
 * AirPaste 3D ASCII Transition Engine
 * Uses Three.js and GLSL to create a topographic point-cloud transition.
 */

class AsciiTransition {
    constructor() {
        this.container = document.createElement('div');
        this.container.id = 'transition-container';
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 10000;
            pointer-events: none;
            background: transparent;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        document.body.appendChild(this.container);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.clock = new THREE.Clock();
        this.particles = null;
        this.isTransitioning = false;

        this.init();
        window.addEventListener('resize', () => this.onResize());
    }

    async init() {
        const asciiTexture = this.createAsciiAtlas();
        const geometry = this.createGridGeometry(160, 90); // Grid resolution

        this.material = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: {
                uTime: { value: 0 },
                uProgress: { value: 0 },
                uAsciiTex: { value: asciiTexture },
                uNextTex: { value: new THREE.Texture() },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                uGridRes: { value: new THREE.Vector2(160, 90) }
            },
            vertexShader: `
                uniform float uTime;
                uniform float uProgress;
                uniform sampler2D uNextTex;
                uniform vec2 uGridRes;
                
                varying vec2 vUv;
                varying float vLuminance;
                varying vec3 vColor;
                varying float vCharIndex;

                float getLuminance(vec3 color) {
                    return dot(color, vec3(0.299, 0.587, 0.114));
                }

                void main() {
                    vUv = uv;
                    
                    // Sample next texture color and luminance
                    vec4 texColor = texture2D(uNextTex, uv);
                    vColor = texColor.rgb;
                    vLuminance = getLuminance(vColor);
                    
                    // Random character index for this point
                    vCharIndex = floor(mod(position.x * 13.0 + position.y * 7.0, 16.0));

                    vec3 pos = position;
                    
                    // Initial movement: particles fall from top/rise from bottom
                    float startY = (uv.x > 0.5) ? 10.0 : -10.0;
                    pos.y = mix(startY, pos.y, clamp(uProgress * 1.5, 0.0, 1.0));
                    
                    // 3D Topographic Displacement based on luminance
                    float displacement = vLuminance * 2.0 * uProgress;
                    pos.z += displacement;
                    
                    // Add some noise/floatiness
                    pos.x += sin(uTime * 0.5 + pos.y) * 0.1 * (1.0 - uProgress);
                    pos.y += cos(uTime * 0.5 + pos.x) * 0.1 * (1.0 - uProgress);

                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    
                    // Point size scales with progress
                    gl_PointSize = (15.0 + 5.0 * vLuminance) * (1.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D uAsciiTex;
                uniform float uProgress;
                varying vec2 vUv;
                varying vec3 vColor;
                varying float vCharIndex;

                void main() {
                    // Each point shows one character from the 4x4 atlas
                    vec2 charUv = gl_PointCoord / 4.0;
                    float tx = mod(vCharIndex, 4.0) * 0.25;
                    float ty = floor(vCharIndex / 4.0) * 0.25;
                    charUv += vec2(tx, ty);
                    
                    vec4 ascii = texture2D(uAsciiTex, charUv);
                    
                    if(ascii.r < 0.1) discard; // Transparency
                    
                    vec3 finalColor = vColor;
                    float alpha = uProgress * ascii.r;
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `
        });

        this.particles = new THREE.Points(geometry, this.material);
        this.scene.add(this.particles);

        this.animate();
    }

    createAsciiAtlas() {
        const canvas = document.createElement('canvas');
        const size = 512;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&?".split("");
        
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, size, size);
        ctx.font = "bold 80px monospace";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const step = size / 4;
        for (let i = 0; i < 16; i++) {
            const x = (i % 4) * step + step / 2;
            const y = Math.floor(i / 4) * step + step / 2;
            ctx.fillText(chars[i % chars.length], x, y);
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;
        return texture;
    }

    createGridGeometry(cols, rows) {
        const geo = new THREE.BufferGeometry();
        const positions = [];
        const uvs = [];
        
        const aspect = window.innerWidth / window.innerHeight;
        const width = 10 * aspect;
        const height = 10;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const px = (x / cols - 0.5) * width;
                const py = (y / rows - 0.5) * height;
                positions.push(px, py, 0);
                uvs.push(x / cols, y / rows);
            }
        }

        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        return geo;
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.material.uniforms.uTime.value = this.clock.getElapsedTime();
        this.renderer.render(this.scene, this.camera);
    }

    async start(nextUrl) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        // 1. Capture/Load texture of the next page
        // For this demo, we'll use a placeholder or try to fetch it
        const texture = await this.loadPageTexture(nextUrl);
        this.material.uniforms.uNextTex.value = texture;

        // 2. Show container
        this.container.style.opacity = '1';
        this.container.style.pointerEvents = 'all';

        // 3. Animate progress
        gsap.to(this.material.uniforms.uProgress, {
            value: 1,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                window.location.href = nextUrl;
            }
        });
    }

    async loadPageTexture(url) {
        // Since we can't easily screenshot a separate URL in vanilla JS without a proxy,
        // we'll use a trick: pre-made screenshots of the pages or a blurred placeholder.
        // Ideally, we'd have images like 'what_preview.jpg', etc.
        // For now, let's use a generic elegant placeholder if the file doesn't exist.
        const loader = new THREE.TextureLoader();
        const screenshotMap = {
            'what.html': 'images/previews/what.jpg',
            'why.html': 'images/previews/why.jpg',
            'forfree.html': 'images/previews/forfree.jpg',
            'whatsnext.html': 'images/previews/whatsnext.jpg',
            'airpaste.html': 'images/previews/home.jpg'
        };
        
        const path = screenshotMap[url] || 'images/bg10.jpg';
        return new Promise((resolve) => {
            loader.load(path, resolve, undefined, () => {
                // Fallback to a simple gradient if image fails
                const canvas = document.createElement('canvas');
                canvas.width = 160; canvas.height = 90;
                const ctx = canvas.getContext('2d');
                const grad = ctx.createLinearGradient(0,0,160,90);
                grad.addColorStop(0, '#BAB2FF');
                grad.addColorStop(1, '#3b82f6');
                ctx.fillStyle = grad;
                ctx.fillRect(0,0,160,90);
                resolve(new THREE.CanvasTexture(canvas));
            });
        });
    }
}

// Global instance
const transition = new AsciiTransition();

// Intercept links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && link.href.includes('.html') && !link.target) {
        const url = link.getAttribute('href');
        if (url !== '#' && !url.startsWith('http')) {
            e.preventDefault();
            transition.start(url);
        }
    }
});

// Also intercept the button clicks from airpaste.html if they exist
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-toggle-btn');
    if (btn && btn.id) {
        const pageMap = {
            'toggleWhat': 'what.html',
            'toggleWhy': 'why.html',
            'toggleFree': 'forfree.html',
            'toggleNext': 'whatsnext.html'
        };
        const url = pageMap[btn.id];
        if (url) {
            e.preventDefault();
            transition.start(url);
        }
    }
});
