// Logo SVG loooop
// Logo SVG loooop
// Logo SVG loooop
// Logo SVG loooop

const logo = document.getElementById('logo');
const svgUrls = [
    'images/DEDROX.DSGN/IT.svg', 'images/DEDROX.DSGN/PIX.svg', 'images/DEDROX.DSGN/SRTK.svg', 'images/DEDROX.DSGN/NRML.svg', 'images/DEDROX.DSGN/SCI.svg',
    'images/DEDROX.DSGN/ROC.svg'
    // Add more SVG file paths here...
];
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
    constructor(element, initialX = 0, initialY = 0) {
        this.element = element;
        this.element.style.left = `${initialX}px`;
        this.element.style.top = `${initialY}px`;

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
    new Draggable(document.getElementById('sticker1'), 30, 30);
    new Draggable(document.getElementById('sticker2'), 300, 150);
    new Draggable(document.getElementById('sticker3'), 400, 300);
    new Draggable(document.getElementById('sticker4'), 50, 500);
    new Draggable(document.getElementById('sticker5'), 650, 450);
});
