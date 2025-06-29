import { loadMinNovels, loadAllNovels } from "./novel.js";
import { novels } from "./novels-data.js";

const navLinks = document.querySelectorAll(".nav-link");
const toogleOpen = document.querySelector(".toogle-nav-open");
const toogleClose = document.querySelector(".toogle-nav-close");
const navMenu = document.getElementById("topnav-menu");
const searchInput = document.getElementById("search-input");
const searchFrom = document.getElementById("search-form");
const clearbtn = document.getElementById("btnclear");

let genres = [];

const openMenu = () => {
    navMenu.setAttribute("data-visible", "true");
}
const closeMenu = () => {
    navMenu.setAttribute("data-visible", "false")
}

const loadFilterGenre = () => {
    return novels.forEach((novel) => novel.genres.forEach((genre) => {
        if (!genres.includes(genre)) {
            genres.push(genre)
        }
    }));
}


function setupSearchNav() {
    toogleOpen.addEventListener("click", openMenu)
    toogleClose.addEventListener("click", closeMenu);

    searchInput.addEventListener('input', (e) => {
        handlerToSearch()
    });

    searchInput.addEventListener('keyup', handlerToSearch);

    clearbtn.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        handlerToSearch();

        searchInput.dispatchEvent(new Event('input', { bubbles: true }))
    });

    handlerToSearch();

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
            console.log("enter")

            setTimeout(handlerToSearch, 10);
        }
    })
}


function handlerToSearch() {
    const search = searchInput.value.trim();

    if (searchInput.value.trim().length > 0) {
        clearbtn.classList.add("show");
    } else {
        clearbtn.classList.remove("show")
    }
}



function setupActiveLink() {
    const sections = document.querySelectorAll("section[id]");

    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0
    }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetID = entry.target.id;
                updateActiveLink(targetID)
            }
        })
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function setupMobileMenu() {
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerHeight <= 768) {
                closeMenu();
            }
        })
    })
}

function updateActiveLink(activeID) {
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${activeID}`) {
            link.classList.add("active");
        }
    })
}

const initFunctions = () => {
    setupActiveLink();
    setupMobileMenu();
    setupSearchNav();
    loadMinNovels();
}


document.addEventListener("DOMContentLoaded", initFunctions)

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.getAttribute('data-visible') === "true") {
        closeMenu();
    }
})