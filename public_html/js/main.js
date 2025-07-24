import { initDetailPage } from "./detail.js";
import { handlerToSearch, loadFilteredGenres, setupFilteredGenre, setupPagination } from "./filter.js";
import { animateStatisctic, loadAlphabeticOption, loadCountriesOption, loadlanguageOption } from "./helpers.js";
import { authors, loadMinNovels } from "./novel.js";
import { getFieldsID, validation } from "./validator.js";

const navLinks = document.querySelectorAll(".nav-link");

export const openLabel = (target) => {
    target.setAttribute("data-visible", "true");
}

export const closeLabel = (target) => {
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

    searchInput.addEventListener('input', () => {
        if (searchInput.value.length > 0) {
            handlerToSearch(searchInput.value)
            btncloseSearchFrom.classList.add("show");
        } else {
            btncloseSearchFrom.classList.remove("show")
        }
    });

    btncloseSearchFrom.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        btncloseSearchFrom.classList.remove("show")
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
            setTimeout(handlerToSearch, 10);
        }
    })
}

function setupModalForm() {
    // elements for modal
    const btnOpenModalAuthor = document.getElementById("AuthorRegister")
    const btnCloseModalAuthor = document.querySelector(".toogle-close");
    const modal_author = document.querySelector(".modal-author");
    const form_register_author = document.getElementById("author-register");

    const formSubmission = {
        name: document.getElementById("authorName"),
        email: document.getElementById("authorEmail"),
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

            const formValues = {
                name: form_register_author.authorName.value.trim(),
                email: form_register_author.authorEmail.value.trim(),
                image: form_register_author.authorImage.value.trim(),
                bio: form_register_author.authorBio.value,
                language: form_register_author.authorLanguages.value,
                country: form_register_author.authorCountry.value
            }

            const errors = validation(formValues);

            Object.keys(formValues).forEach((key) => {
                if (errors[key]) {
                    showErrors(key, errors[key]);
                } else {
                    hideError(key);
                }
            })

            if (Object.keys(errors).length === 0) {
                const newAuthor = {
                    id: Date.now().toString(),
                    name: formValues.name,
                    email: formValues.email,
                    image: formValues.image,
                    language: formValues.language,
                    bio: formValues.bio,
                    country: formValues.country
                }

                authors.push(newAuthor);
                localStorage.setItem('authors', JSON.stringify(authors));


                notification("Registro realizado!")
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


function notification(text) {
    Toastify({
        text: text,
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "rigth",
        position: "rigth",
        stopOnFocus: true,
        style: {
            fontFamily: "var(--font-text-secundary)",
            borderRadius: "var(--2xl-border)",
            background: "linear-gradient(135deg, var(--color8), var(--color6))",
        },
        onClick: function () { }
    }).showToast();
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

function setupAnimation() {
    const stats = document.querySelectorAll(".stats-grid");

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting &&
                !entry.target.dataset.statsAnimated) {
                animateStatisctic();
                entry.target.dataset.statsAnimated = "true";
            }
        })
    }, {
        threshold: 0.5
    })

    stats.forEach(grid => {
        animationObserver.observe(grid)
    })
}

function setupMobileMenu() {
    const navMenu = document.getElementById("topnav-menu");
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
    errorElement.style.letterSpacing = "1.5px";
    errorElement.style.fontSize = "11px";
    errorElement.style.display = "block";

    return errorElement;
}

const animateScrollTop = () => {
    const scrollToTop = document.getElementById("scrollToTopBtn");

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 1000) {
            openLabel(scrollToTop);
        } else {
            closeLabel(scrollToTop);
        }
    })

    scrollToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
}

const initFunctions = () => {
    const body = document.body;
    setupEventHeader();
    setupActiveLink();
    setupMobileMenu();
    setupEventSearch();

    if (body.classList.contains("page-home")) {
        console.log("home");
        animateScrollTop();
        setupAnimation()
        loadCountriesOption();
        loadlanguageOption();
        setupModalForm();
        loadMinNovels();
    }

    if (body.classList.contains("page-novel-list")) {
        console.log("list");
        loadAlphabeticOption();
        setupPagination();
        setupFilteredGenre();
        loadFilteredGenres();
    }

    if (body.classList.contains("page-novel-detail")) {
        console.log("detail");
        initDetailPage();
    }

}

document.addEventListener("DOMContentLoaded", initFunctions);