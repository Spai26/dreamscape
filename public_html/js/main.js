console.log("hello")

const btnOpen = document.querySelector(".toogle-nav-open");
const btnClose = document.querySelector(".toogle-nav-close");
const navBar = document.querySelector(".topnav-menu")

btnOpen.addEventListener("click", () => {
    
    navBar.setAttribute("data-visible", "true");    
})

btnClose.addEventListener("click", () => {
    navBar.setAttribute("data-visible", "false")
})