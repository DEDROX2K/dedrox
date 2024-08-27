// const trails = document.querySelectorAll(".trail")
// const smoothPointer = {
//     x: window.innerWidth / 2,
//     y: window.innerHeight / 2,
// };

// const totalPointsArray = [40, 35, 30, 25, 20, 15, 10];

// Window.addEventListerner("mousemove", (evemt) => {
//     gsap.to(smoothPointer, {
//         x: event.clientX,
//         y: event.clientX,
//         duration: 0.5,
//         ease: "power2.out",
//     });
// });

// function updatePath() {
//     trails.forEach((path, index) => {
//         let points = path.points || [];
//         points.unshift({ ...smoothPointer });
//         while (points.length > totalPointsArray[index])
//             points.pop();

//         path.points = points;

//         if (points.length > 1) {
//             let d = `M ${points[0].x} ${points[0].y}`;
//             for (let i = 1; i < points.length; i++) {
//                 d += `L ${points[i].x} ${points[i].y}`;
//             }
//             path.setAttribute("d", d);
//         }
//     });

//     requestAnimationFrame(updatePath);
// }

// updatePath();


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
        this.offsetX = e.clientX - this.currentElement.getBoundingClientRect().left;
        this.offsetY = e.clientY - this.currentElement.getBoundingClientRect().top;
        this.currentElement.style.cursor = 'grabbing';
    }

    onMouseMove(e) {
        if (this.currentElement) {
            e.preventDefault();
            this.currentElement.style.left = `${e.clientX - this.offsetX}px`;
            this.currentElement.style.top = `${e.clientY - this.offsetY}px`;
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
        this.offsetX = touch.clientX - this.currentElement.getBoundingClientRect().left;
        this.offsetY = touch.clientY - this.currentElement.getBoundingClientRect().top;
    }

    onTouchMove(e) {
        if (this.currentElement) {
            e.preventDefault();
            const touch = e.touches[0];
            this.currentElement.style.left = `${touch.clientX - this.offsetX}px`;
            this.currentElement.style.top = `${touch.clientY - this.offsetY}px`;
        }
    }

    onTouchEnd() {
        this.currentElement = null;
    }
}

// Initialize draggable stickers
document.addEventListener('DOMContentLoaded', () => {
    new Draggable(document.getElementById('sticker1'));
    new Draggable(document.getElementById('sticker2'));
    new Draggable(document.getElementById('sticker3'));
    new Draggable(document.getElementById('sticker4'));
    new Draggable(document.getElementById('sticker5'));
});