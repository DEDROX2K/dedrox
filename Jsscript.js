import SmoothScrollbar from 'smooth-scrollbar';

const options = {
    damping: 0.01,
};

const scrollbar = new SmoothScrollbar('#scroll-container', options);



// let cursorBall = document.querySelector(".cursor-ball");
// let cursorOutline = document.querySelector(".cursor-outline");

// document.addEventListener("mousemove", (e) => {
//     cursorBall.style.top = e.pageY + "px";
//     cursorBall.style.left = e.pageX + "px";

//     cursorOutline.style.top = e.pageY + "px";
//     cursorOutline.style.left = e.pageX + "px";
// });