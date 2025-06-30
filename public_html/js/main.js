import { loadMinNovels } from "./novel.js";

const navLinks = document.querySelectorAll(".nav-link");
const toogleOpen = document.querySelector(".toogle-nav-open");
const toogleClose = document.querySelector(".toogle-nav-close");
const navMenu = document.getElementById("topnav-menu");
const searchInput = document.getElementById("search-input");
const searchFrom = document.getElementById("search-form");
const btncloseSearchFrom = document.getElementById("btnclear");

const btnOpenModalAuthor = document.getElementById("AuthorRegister")
const btnCloseModalAuthor = document.querySelector(".toogle-close");
const modal_author = document.querySelector(".modal-author");
const form_register_author = document.getElementById("author-register");

const openLabel = (label) => {
    label.setAttribute("data-visible", "true")
}

const closeLabel = (label) => {
    label.setAttribute("data-visible", "false")
}

export function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get("slug");
}

export function goBack() {
    return window.history.back();
}

function setupEventListeners() {
    toogleOpen.addEventListener("click", () => {
        openLabel(navMenu)
    })
    toogleClose.addEventListener("click", () => {
        closeLabel(navMenu)
    });

    searchInput.addEventListener('input', (e) => {
        handlerToSearch()
    });
    searchInput.addEventListener('keyup', handlerToSearch);

    btncloseSearchFrom.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        handlerToSearch();

        searchInput.dispatchEvent(new Event('input', { bubbles: true }))
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
            setTimeout(handlerToSearch, 10);
        }
    })
    
    if (!getUrlParams()) {
        btnOpenModalAuthor.addEventListener("click", () => openLabel(modal_author) );
        
        btnCloseModalAuthor.addEventListener("click", () => closeLabel(modal_author));
    }

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
            if (window.innerHeight <= 1025) {
                closeLabel(navMenu);
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
    setupEventListeners();
    loadMinNovels();
    getUrlParams();
}

document.addEventListener("DOMContentLoaded", initFunctions)

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.getAttribute('data-visible') === "true") {
        closeLabel(navMenu);
    }
});

document.addEventListener("click", (event) => {
    if (event.target === modal_author && modal_author.getAttribute('data-visible') === "true") {
        closeLabel(modal_author);
    }
})
