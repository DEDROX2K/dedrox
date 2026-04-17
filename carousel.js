document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('premiumCarousel');
    const track = document.getElementById('carouselTrack');
    const items = document.querySelectorAll('.carousel-item');
    
    if (!container || !track || items.length === 0) return;

    let isDragging = false;
    let startX = 0;
    // Start at a slight offset to show it's a carousel
    let targetPos = window.innerWidth * 0.2; 
    let currentPos = targetPos;
    let prevTranslate = 0;
    
    const lerp = (start, end, factor) => start + (end - start) * factor;

    // Pointer events for dragging
    container.addEventListener('pointerdown', e => {
        isDragging = true;
        startX = e.clientX;
        prevTranslate = targetPos;
        container.style.cursor = 'grabbing';
        e.preventDefault();
    });

    window.addEventListener('pointermove', e => {
        if (!isDragging) return;
        const diff = e.clientX - startX;
        // 1.5x multiplier for responsive drag
        targetPos = prevTranslate + diff * 1.5; 
    });

    function snapToClosest() {
        const viewportCenter = window.innerWidth / 2;
        let closestItem = null;
        let minDistance = Infinity;

        items.forEach((item) => {
            // Predict where the item will be relative to the viewport center
            const itemCenter = targetPos + item.offsetLeft + item.offsetWidth / 2;
            const distance = Math.abs(itemCenter - viewportCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestItem = item;
            }
        });

        if (closestItem) {
            targetPos = viewportCenter - (closestItem.offsetLeft + closestItem.offsetWidth / 2);
        }
    }

    window.addEventListener('pointerup', () => {
        isDragging = false;
        container.style.cursor = 'grab';
        snapToClosest();
    });

    window.addEventListener('pointerleave', () => {
        if (!isDragging) return;
        isDragging = false;
        container.style.cursor = 'grab';
        snapToClosest();
    });

    function render() {
        // Smooth lerp for the "chain/spring" feel
        currentPos = lerp(currentPos, targetPos, 0.08);
        
        // Soft bounds checking
        const trackBounds = track.scrollWidth;
        const minPos = window.innerWidth * 0.6 - trackBounds;
        const maxPos = window.innerWidth * 0.4;
        
        // Rubberband effect when dragging past edges
        if (targetPos > maxPos) targetPos = lerp(targetPos, maxPos, 0.1);
        if (targetPos < minPos) targetPos = lerp(targetPos, minPos, 0.1);

        track.style.transform = `translateX(${currentPos}px)`;

        const viewportCenter = window.innerWidth / 2;

        items.forEach((item) => {
            // Absolute center of the item on screen
            const itemCenter = currentPos + item.offsetLeft + item.offsetWidth / 2;
            const dist = itemCenter - viewportCenter;
            const absDist = Math.abs(dist);
            
            const maxDist = window.innerWidth * 0.8;
            const progress = Math.min(absDist / maxDist, 1);
            
            // Material 3 Expressive transformations
            // Scale drops off smoothly from center
            const scale = 1 - Math.pow(progress, 1.4) * 0.25; 
            
            // 3D rotation based on distance (items look towards center)
            const rotateY = (dist / maxDist) * -22; 
            
            // Opacity fading
            const opacity = 1 - Math.pow(progress, 2) * 0.5;
            
            // Depth blur
            const blur = progress * 6;
            
            item.style.transform = `scale(${scale}) perspective(1400px) rotateY(${rotateY}deg)`;
            item.style.opacity = opacity;
            item.style.filter = `blur(${blur}px)`;
            
            // Inner image parallax and zoom effect
            const img = item.querySelector('img');
            if (img) {
                // Image scales up slightly as it moves away to create mask parallax
                const imgScale = 1 + progress * 0.15;
                // Shift image opposite to movement
                const imgTranslate = dist * 0.08; 
                img.style.transform = `scale(${imgScale}) translateX(${imgTranslate}px)`;
            }
        });

        requestAnimationFrame(render);
    }
    
    // Kick off animation loop, delay slightly to ensure images have natural dimensions
    setTimeout(render, 100);
});
