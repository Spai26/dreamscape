console.log("hello")

const navbar = document.querySelector(".primary-nav");
const navToogle = document.querySelector(".movile-toogle-nav");

navToogle.addEventListener("click", () => {
    const visibility = navbar.getAttribute("data-visible");
    
    if (visibility === "false") {
        navbar.setAttribute("data-visible", true)               
        navToogle.setAttribute("data-expanded", true)         
        navToogle.classList.add("open")
    }else if (visibility === "true") {
        navbar.setAttribute("data-visible", false)
        navToogle.setAttribute("data-expanded", false)        
        navToogle.classList.remove("open")
    }

})