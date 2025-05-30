








// Logo SVG loooop
// Logo SVG loooop
// Logo SVG loooop
// Logo SVG loooop


document.addEventListener("DOMContentLoaded", function () {
    const logo = document.getElementById('logo');
    const svgUrls = [
        'images/DEDROX.DSGN/SRTK.svg', 'images/DEDROX.DSGN/IT.svg',
        'images/DEDROX.DSGN/CONS.svg', 'images/DEDROX.DSGN/PIX.svg', 'images/DEDROX.DSGN/NRML.svg',
        'images/DEDROX.DSGN/SCI.svg', 'images/DEDROX.DSGN/STRP.svg',
        'images/DEDROX.DSGN/ROC.svg'
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

    setInterval(changeSVG, 600);
});





// dragdrop.js
// dragdrop.js
// dragdrop.js
// dragdrop.js
// dragdrop.js
// dragdrop.js
class Draggable {

    constructor(element, initialLeftPercent = null, initialTopPercent = null) {
        this.element = element;
        this.parent = this.element.parentElement;

        // Ensure the parent element is relatively positioned
        this.parent.style.position = 'relative';

        // Function to convert percentage to pixel value
        const toPixels = (percentage, totalSize) => (percentage / 100) * totalSize;

        // Function to set position based on percentage
        const setPosition = () => {
            const parentRect = this.parent.getBoundingClientRect();
            const initialLeft = initialLeftPercent !== null ? toPixels(initialLeftPercent, parentRect.width) : 0;
            const initialTop = initialTopPercent !== null ? toPixels(initialTopPercent, parentRect.height) : 0;
            this.element.style.left = `${initialLeft}px`;
            this.element.style.top = `${initialTop}px`;
        };

        // Set initial position
        setPosition();

        // Update position on resize
        window.addEventListener('resize', setPosition);

        // Event listeners for dragging
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
        // this.currentElement.style.cursor = 'grabbing';
        this.currentElement.style.cursor = 'url("ggrabbingcursor.png"), grabbing';
    }

    onMouseMove(e) {
        if (this.currentElement) {
            e.preventDefault();
            const parentRect = this.parent.getBoundingClientRect();
            this.currentElement.style.left = `${e.clientX - this.offsetX - parentRect.left}px`;
            this.currentElement.style.top = `${e.clientY - this.offsetY - parentRect.top}px`;
        }
    }

    onMouseUp() {
        if (this.currentElement) {
            // this.currentElement.style.cursor = 'grab';
            this.currentElement.style.cursor = 'url("grabcursor.png"), grab';

            this.currentElement = null;
        }
    }

    disableScroll(e) {
        e.preventDefault();
    }

    onTouchStart(e) {
        const touch = e.touches[0];
        this.currentElement = this.element;
        const rect = this.currentElement.getBoundingClientRect();
        this.offsetX = touch.clientX - rect.left;
        this.offsetY = touch.clientY - rect.top;

        // Disable scrolling when dragging starts
        document.addEventListener('touchmove', this.disableScroll, { passive: false });
    }

    onTouchMove(e) {
        if (this.currentElement) {
            e.preventDefault();
            const touch = e.touches[0];
            const parentRect = this.parent.getBoundingClientRect();
            this.currentElement.style.left = `${touch.clientX - this.offsetX - parentRect.left}px`;
            this.currentElement.style.top = `${touch.clientY - this.offsetY - parentRect.top}px`;
        }
    }

    onTouchEnd() {
        this.currentElement = null;

        // Re-enable scrolling when dragging ends
        document.removeEventListener('touchmove', this.disableScroll);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.sticker-container');

    function getPercentagePosition(element) {
        const parentRect = container.getBoundingClientRect();
        const rect = element.getBoundingClientRect();
        const left = ((rect.left - parentRect.left) / parentRect.width) * 100;
        const top = ((rect.top - parentRect.top) / parentRect.height) * 100;
        return { left, top };
    }

    const stickers = [
        { id: 'sticker1', left: 35, top: 55 },
        { id: 'sticker2', left: 10, top: 50 },

        { id: 'sticker2.1', left: 20, top: 30 },
        { id: 'sticker2.2', left: 20, top: 62 }, //flower
        { id: 'sticker3', left: 65, top: 38 },

        { id: 'sticker3.1', left: 65, top: 6 }, //Hi
        { id: 'sticker3.2', left: 65, top: 38 },
        { id: 'sticker3.3', left: 85, top: 28 },
        { id: 'sticker3.4', left: 85, top: 51 },
        { id: 'sticker3.5', left: 80, top: 68 },
        { id: 'sticker3.6', left: 69, top: 18 },

        { id: 'sticker3.7', left: 125, top: 21 },
        { id: 'sticker3.8', left: 20, top: -5 },
        { id: 'sticker3.9', left: 88, top: 6 }, //my face

        { id: 'sticker4', left: 65, top: 0 },
        { id: 'sticker5', left: 68, top: 30 },
        { id: 'sticker6', left: 70, top: 50 },
        { id: 'sticker7', left: 60, top: 0 },

        { id: 'sticker8', left: 70, top: 40 },
        { id: 'sticker9', left: 70, top: 60 }, //foo - smile
        { id: 'sticker10', left: 80, top: 70 }, //foo - egg
        { id: 'sticker11', left: 30, top: 40 },
        { id: 'sticker12', left: 75, top: 50 }, //fee - redrose
        { id: 'sticker13', left: 90, top: 50 },
        { id: 'sticker14', left: 70, top: 60 }, //bulkybee

        { id: 'stickerBannerAd1', left: 85, top: 60 }, //ball
        { id: 'stickerBannerAd2', left: 25, top: 55 }, //body
        { id: 'stickerBannerAd3', left: 55, top: 30 }, //head
        { id: 'stickerBannerAd4', left: 7, top: 48 }, //foo - bomb
        { id: 'stickerBannerAd5', left: 14, top: 48 }, //foo - purple
        { id: 'stickerBannerAd6', left: 80, top: 38 },

        { id: 'stickerfont1', left: 10, top: 29 },
        { id: 'stickerfont2', left: 80, top: 20 },
        { id: 'stickerfont3', left: 57, top: 7 },
        { id: 'stickerfont4', left: 30, top: 15 },
    ];

    stickers.forEach(({ id, left, top }) => {
        const sticker = document.getElementById(id);
        if (sticker) {
            console.log(`Initializing draggable for: ${id}`);
            new Draggable(sticker, left, top);
        } else {
            console.error(`Sticker with id ${id} not found.`);
        }
    });
});


let Scrollbar = window.scrollbar;

const options = {
    'damping': 0.001
}

Scrollbar.init(document.querySelector('body'), options);