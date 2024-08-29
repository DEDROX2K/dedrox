// Logo SVG loooop
// Logo SVG loooop
// Logo SVG loooop
// Logo SVG loooop

const logo = document.getElementById('logo');
const svgUrls = [
    'images/DEDROX.DSGN/SRTK.svg', 'images/DEDROX.DSGN/IT.svg', 'images/DEDROX.DSGN/CONS.svg', 'images/DEDROX.DSGN/PIX.svg', 'images/DEDROX.DSGN/CRL.svg', 'images/DEDROX.DSGN/NRML.svg', 'images/DEDROX.DSGN/SCI.svg', 'images/DEDROX.DSGN/STRP.svg',
    'images/DEDROX.DSGN/ROC.svg'];
// Add more SVG file paths here...
let index = 0;

function loadSVG(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            callback(data);
        })
        .catch(error => console.error('Error loading SVG:', error));
}

function changeSVG() {
    loadSVG(svgUrls[index], function (svgContent) {
        logo.innerHTML = svgContent;
    });
    index = (index + 1) % svgUrls.length;
}
setInterval(changeSVG, 600); // Change SVG every 0.8 seconds


// dragdrop.js
// dragdrop.js
// dragdrop.js
// dragdrop.js
// dragdrop.js
// dragdrop.js



class Draggable {
    constructor(element) {
        this.element = element;

        // Use existing CSS values if they exist
        const rect = this.element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(this.element);
        this.element.style.left = computedStyle.left !== 'auto' ? computedStyle.left : `${rect.left}px`;
        this.element.style.top = computedStyle.top !== 'auto' ? computedStyle.top : `${rect.top}px`;

        this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.element.addEventListener('touchstart', this.onTouchStart.bind(this));

        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('touchmove', this.onTouchMove.bind(this));

        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        document.addEventListener('touchend', this.onTouchEnd.bind(this));

        this.currentElement = null;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    // Other methods remain the same...


    onMouseDown(e) {
        this.currentElement = this.element;
        const rect = this.currentElement.getBoundingClientRect();
        this.offsetX = e.clientX - rect.left;
        this.offsetY = e.clientY - rect.top;
        this.currentElement.style.cursor = 'grabbing';
    }

    onMouseMove(e) {
        if (this.currentElement) {
            e.preventDefault();
            this.currentElement.style.left = `${e.clientX - this.offsetX + window.pageXOffset}px`;
            this.currentElement.style.top = `${e.clientY - this.offsetY + window.pageYOffset}px`;
        }
    }

    onMouseUp() {
        if (this.currentElement) {
            this.currentElement.style.cursor = 'grab';
            this.currentElement = null;
        }
    }

    onTouchStart(e) {
        const touch = e.touches[0];
        this.currentElement = this.element;
        const rect = this.currentElement.getBoundingClientRect();
        this.offsetX = touch.clientX - rect.left;
        this.offsetY = touch.clientY - rect.top;
    }

    onTouchMove(e) {
        if (this.currentElement) {
            e.preventDefault();
            const touch = e.touches[0];
            this.currentElement.style.left = `${touch.clientX - this.offsetX + window.pageXOffset}px`;
            this.currentElement.style.top = `${touch.clientY - this.offsetY + window.pageYOffset}px`;
        }
    }

    onTouchEnd() {
        this.currentElement = null;
    }
}

// Initialize draggable stickers with custom positions
document.addEventListener('DOMContentLoaded', () => {
    new Draggable(document.getElementById('sticker1'));
    new Draggable(document.getElementById('sticker2'));
    new Draggable(document.getElementById('sticker3'));
    new Draggable(document.getElementById('sticker4'));
    new Draggable(document.getElementById('sticker5'));
    new Draggable(document.getElementById('sticker6'));
    new Draggable(document.getElementById('sticker7'));
    new Draggable(document.getElementById('sticker8'));
    new Draggable(document.getElementById('sticker9'));
    new Draggable(document.getElementById('sticker11'));
    new Draggable(document.getElementById('sticker10'));
});
