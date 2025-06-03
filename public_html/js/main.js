'use strict'

const header = document.getElementById("header-main");
const parallaxSection = document.getElementById("parallax")


const btnOpen = document.querySelector(".toogle-nav-open");
const btnClose = document.querySelector(".toogle-nav-close");
const navBar = document.querySelector(".topnav-menu")

window.addEventListener("scroll", () => {
    const parallaxHeight = parallaxSection.offsetHeight;

    const scrolling = window.pageXOffset || document.documentElement.scrollTop;

    (scrolling > parallaxHeight * 0.9) ? header.classList.add("visible") : header.classList.remove("visible")

})

btnOpen.addEventListener("click", () => {
    navBar.setAttribute("data-visible", "true");
})

btnClose.addEventListener("click", () => {
    navBar.setAttribute("data-visible", "false")
})

