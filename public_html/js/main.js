import { loadMinNovels } from "./novel.js";
import { getFieldsID, validation } from "./validator.js";

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


const formAuthorData = {
    name: document.getElementById("authorName"),
    bio: document.getElementById("authorBio"),
    img: document.getElementById("authorImage"),
    country: document.getElementById("authorCountry"),
    lang: document.getElementById("authorLanguages")
};


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

        btnCloseModalAuthor.addEventListener("click", () => {
            closeLabel(modal_author);
        });

        Object.entries(formAuthorData).forEach(([key, input]) => {
            const values = fromValues(formAuthorData);
            input.addEventListener("input", () => {
                validateErrors(key, values);
            })

            input.addEventListener("blur", () => {
                validateErrors(key, values);
            })
        });

        form_register_author.addEventListener("submit", (e) => {
            e.preventDefault();
            const values = fromValues(formAuthorData);
            const errors = validation(values);

            Object.keys(values).forEach((key) => {
                if (errors[key]) {
                    showErrors(key, errors[key]);
                } else {
                    hideError(key)
                }
            })

            if (Object.keys(errors).length === 0) {
                console.log("enviar");
            }
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


function fromValues(data) {
    const values = {
        name: data.name.value,
        bio: data.bio.value,
        img: data.img.value,
        country: data.country.value,
        lang: data.lang.value
    }

    return values;
}

function validateErrors(key, values) {
    const errors = validation(values);
    if (errors[key]) {
        showErrors(key, errors[key]);
    } else {
        hideError(key)
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

        const field = document.getElementById(getFieldsID(fieldname));
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
