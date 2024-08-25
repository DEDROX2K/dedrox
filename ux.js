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