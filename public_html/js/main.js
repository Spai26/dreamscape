import { loadMinNovels } from "./novel.js";
import { validation } from "./validator.js";

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

const openLabel = (target) => {
    target.setAttribute("data-visible", "true")
}

const closeLabel = (target) => {
    target.setAttribute("data-visible", "false")
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
        openLabel(navMenu);
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
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
            setTimeout(handlerToSearch, 10);
        }
    })

    if (!getUrlParams()) {
        btnOpenModalAuthor.addEventListener("click", (e) => {
            openLabel(modal_author) 
            
        });

        btnCloseModalAuthor.addEventListener("click", () => closeLabel(modal_author));


        form_register_author.addEventListener("submit", (e) => {
            e.preventDefault();

            const fields = form_register_author.querySelectorAll("input", "textarea")
            
            fields.forEach((field) => {
                const errors = validation(field.name)
                console.log(field.name)
            })
        })
    }

}

function handlerToSearch() {
    const search = searchInput.value.trim();
    
    if (searchInput.value.trim().length > 0) {
        btncloseSearchFrom.classList.add("show");
    } else {
        btncloseSearchFrom.classList.remove("show")
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


function showErrors(fieldname, message) {
    let errorElement = document.getElementById(`error-${fieldname}`);

    if (!errorElement) {
        errorElement = document.createElement("span");
        errorElement.id = `error-${fieldname}`
        errorElement.style.color = "red";
        errorElement.style.fontSize = "12px";
        errorElement.style.display = "block";
        errorElement.style.marginTop = "5px";

        const field = document.getElementById(getFields(fieldname));
        field.parentNode.appendChild(errorElement);
    }

    errorElement.textContent = message;
    errorElement.style.display = "block";
}


function hideError(fieldname) {
    const errorElement = document.getElementById(`error-${fieldname}`);
    if (errorElement) {
        errorElement.style.display = "none";
    }
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
