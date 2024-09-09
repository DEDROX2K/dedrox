document.addEventListener("DOMContentLoaded", function () {
    const logo = document.getElementById('logo');
    const svgUrls = [
        'images/DEDROX.DSGN/SRTK.svg', 'images/DEDROX.DSGN/IT.svg',
        'images/DEDROX.DSGN/CONS.svg', 'images/DEDROX.DSGN/PIX.svg',
        'images/DEDROX.DSGN/CRL.svg', 'images/DEDROX.DSGN/NRML.svg',
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
