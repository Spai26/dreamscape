import { initDetailPage } from "./detail.js";
import { loadAllNovels } from "./filter.js";
import { loadMinNovels } from "./novel.js";
import { getFieldsID, validation } from "./validator.js";

const navLinks = document.querySelectorAll(".nav-link");

const openLabel = (target) => {
    target.setAttribute("data-visible", "true");
}

const closeLabel = (target) => {
    target.setAttribute("data-visible", "false");
}

export function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get("slug");
}

export function goBack() {
    return window.history.back();
}

function setupEventHeader() {
    // elements for header global    
    const toogleOpen = document.querySelector(".toogle-nav-open");
    const toogleClose = document.querySelector(".toogle-nav-close");
    const navMenu = document.getElementById("topnav-menu");

    toogleOpen.addEventListener("click", () => {
        openLabel(navMenu);
    })

    toogleClose.addEventListener("click", () => {
        closeLabel(navMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navMenu.getAttribute('data-visible') === "true") {
            closeLabel(navMenu);
        }
    });
}

function setupEventSearch() {
    // elements for header search
    const searchInput = document.getElementById("search-input");
    const searchFrom = document.getElementById("search-form");
    const btncloseSearchFrom = document.getElementById("btnclear");

    searchInput.addEventListener('input', handlerToSearch);

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

    function handlerToSearch() {
        const search = searchInput.value.trim();
        console.log(search)
        if (search.length > 0) {

            const params = new URLSearchParams(window.location.search);
            console.log(params)
            btncloseSearchFrom.classList.add("show");
        } else {
            btncloseSearchFrom.classList.remove("show")
        }
    }

}

function setupModalForm() {
    // elements for modal
    const btnOpenModalAuthor = document.getElementById("AuthorRegister")
    const btnCloseModalAuthor = document.querySelector(".toogle-close");
    const modal_author = document.querySelector(".modal-author");
    const form_register_author = document.getElementById("author-register");

    const formSubmission = {
        name: document.getElementById("authorName"),
        biografy: document.getElementById("authorBio"),
        image: document.getElementById("authorImage"),
        country: document.getElementById("authorCountry"),
        language: document.getElementById("authorLanguages")
    };

    // valido solo para index.html
    if (!getUrlParams()) {
        btnOpenModalAuthor.addEventListener("click", () => {
            openLabel(modal_author);
        });

        btnCloseModalAuthor.addEventListener("click", () => {
            form_register_author.reset();
            Object.keys(formSubmission).forEach((key) => hideError(key));
            closeLabel(modal_author);
        });

        let values = {};

        Object.entries(formSubmission).forEach(([key, input]) => {
            input.addEventListener("input", () => {
                values[key] = input.value.trim();
                validateErrors(key, values);
            })

            input.addEventListener("blur", () => {
                values[key] = input.value.trim();
                validateErrors(key, values);
            })
        })

        form_register_author.addEventListener("submit", (e) => {
            e.preventDefault();

            const errors = validation(values);

            Object.keys(formSubmission).forEach(([key]) => {
                if (errors[key]) {
                    showErrors(key, errors[key]);
                } else {
                    hideError(key);
                }
            })

            if (Object.keys(errors).length === 0) {
                // opional en una function reutilizable
                Toastify({
                    text: "Registro realizado!",
                    duration: 2000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "rigth",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        fontFamily: "var(--font-text-secundary)",
                        borderRadius: "var(--2xl-border)",
                        background: "linear-gradient(135deg, var(--color8), var(--color6))",
                    },
                    onClick: function () { }
                }).showToast();

                form_register_author.reset();
                closeLabel(modal_author);
            }
        })
    }

    /*
    document.addEventListener("click", (event) => {
        if (event.target === modal_author && modal_author.getAttribute('data-visible') === "true") {
            closeLabel(modal_author);
        }
    })*/
}

function validateErrors(key, values) {
    const errors = validation(values, key);
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
        errorElement = createSpanError(fieldname)
        const field = document.getElementById(getFieldsID(fieldname));
        field.parentNode.appendChild(errorElement);
    }

    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(fieldname) {
    const errorElement = document.getElementById(`error-${fieldname}`);

    if (errorElement) {
        errorElement.style.display = "none";
    }
}

function createSpanError(fieldname) {
    const errorElement = document.createElement("span");
    errorElement.id = `error-${fieldname}`
    errorElement.style.color = "var(--color8)";
    errorElement.style.fontFamily = "var(--font-text-secundary)";
    errorElement.style.letterSpacing = "2px";
    errorElement.style.fontSize = "12px";
    errorElement.style.display = "block";
    errorElement.style.marginTop = "5px";

    return errorElement;
}

const initFunctions = () => {
    const body = document.body;

    setupEventHeader();
    setupActiveLink();
    setupMobileMenu();
    setupEventSearch();

    if (body.classList.contains("page-home")) {
        console.log("home");
        setupModalForm();
        loadMinNovels();
    }

    if (body.classList.contains("page-novel-list")) {
        console.log("list");
        loadAllNovels();
    }

    if (body.classList.contains("page-novel-detail")) {
        console.log("detail");
        initDetailPage();
    }

}

document.addEventListener("DOMContentLoaded", initFunctions);