'use strict'

const btnOpen = document.querySelector(".toogle-nav-open");
const btnClose = document.querySelector(".toogle-nav-close");
const navBar = document.querySelector(".topnav-menu")
/*
// parallax
const header = document.getElementById("header-main");
const header_logo = document.getElementById("header-logo")

const parallax = document.getElementById("landscape");
const logo = document.getElementById("center-logo")

const porcentvw = 0.5;
let flag = false;
let headerVisible = false;

function showHeader() {
    header.classList.add("visible");
    headerVisible = true;
}

function hideHeader() {
    header.classList.remove("visible");
    headerVisible = false;
}

function updateParalax() {
    const scrollTop = window.pageYOffset;
    const sectionTop = parallax.offsetTop;
    const sectionHeight = parallax.offsetHeight;
    const sectionBotton = sectionTop + sectionHeight;
    
    let progress;
    let logoOpacity = 1;
    let logoScale = 1;
    let logoTranslateY = 0;

    if (scrollTop >= sectionTop && scrollTop <= sectionBotton) {
        progress = (scrollTop - sectionTop) / sectionHeight;
        logoScale = 1 - (progress * porcentvw);
        logoOpacity = 1 - (progress * 1.5);
        logoTranslateY = progress * -200;

        logo.style.transform = `translate(-50%, -50%) scale(${logoScale}) translateY(${logoTranslateY}px)`;
        logo.style.opacity = Math.max(0, logoOpacity);

        if (progress > porcentvw) {
            showHeader()
            const headerProgress = Math.min(1, (progress - porcentvw) / 0.3)
            const headerOpacity = headerProgress;
            const headerScale = 0.8 + (headerProgress * 0.2);
            const headerTranslateY = (1 - headerProgress) * -30;
        
            header_logo.style.opacity = headerOpacity;
            header_logo.style.transform = `scale(${headerScale}) translateY(${headerTranslateY}px)`;
            headerVisible = true;
        } else {
            hideHeader()
            header_logo.style.opacity = 0;
        }
    }
    else if (scrollTop > sectionBotton) {                
        showHeader();
        header.style.opacity = 1;
        header_logo.style.transform = `scale(1) translateY(0px)`;

        logo.style.opacity = 0;
        logo.style.transform = `translate(-50%, -50%) scale(0.5) translateY(-200px)`;

        headerVisible = true;
    } else {        
        hideHeader();

        logo.style.opacity = 1;
        logo.style.transform = `translate(-50%, -50%) scale(1) translateY(0px)`;
    }

    requestAnimationFrame(updateParalax);
}


function requestFlag() {
    if (!flag) {
        requestAnimationFrame(updateParalax);
        flag = true;
    }
}


window.addEventListener("scroll", requestFlag)

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {        
        
        if (!entry.isIntersecting && !headerVisible) {            
            showHeader()
            header_logo.style.opacity = 1;
            header_logo.style.transform = `scale(1) translateY(0px)`;
            headerVisible = true;
        } else {
            hideHeader();
        }
    });
}, {
    root: null,
    threshold: 0.1
})

observer.observe(logo);

document.addEventListener("mousemove", (event) => {
    console.log(event.clientY)
    if (event.clientY <= 80 && !headerVisible) {
        showHeader();
    }
});
*/

btnOpen.addEventListener("click", () => {    
    navBar.setAttribute("data-visible", "true");    
})

btnClose.addEventListener("click", () => {
    navBar.setAttribute("data-visible", "false")
})

