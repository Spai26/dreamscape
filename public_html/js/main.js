'use strict'

import { novels } from "./novels-data.js";
const navLinks = document.querySelectorAll(".nav-link");
const toogleOpen = document.querySelector(".toogle-nav-open");
const toogleClose = document.querySelector(".toogle-nav-close");
const navMenu = document.querySelector(".topnav-menu");
const searchInput = document.getElementById("search-input");
const clearbtn = document.getElementById("btnclear");

// const header = document.getElementById("header-main");

const loadNovelsCard = () => {
    const containerNovel = document.querySelector(".novels-grid");

    if (!containerNovel) {
        console.log("no se encontro el contenedor novels-grid");
        return;
    }

    containerNovel.innerHTML = "";

    novels.forEach((novel) => {
        const link = document.createElement('a');
        const card = document.createElement('article')
        const tagImg = document.createElement('img');
        const divContent = document.createElement('div');
        const title = document.createElement('h3');
        const parrafo = document.createElement('p');
        const divGenres = document.createElement('div');

        link.href = `./pages/detail/detail.html`
        link.className = "novel-link"

        card.className = "novel-cad"
        card.setAttribute("data-novel", novel.id)

        tagImg.src = novel.image;
        tagImg.alt = novel.slug || novel.title || "portada de novela";
        tagImg.className = "novel-image";

        divContent.className = "novel-title";
        divContent.textContent = novel.title;

        parrafo.className = "novel-description";
        parrafo.textContent = novel.short_description;

        divContent.className = "novel-genres"
        novel.genres.forEach((genre) => {
            const spanGenre = document.createElement('span');
            spanGenre.className = "genre-tag";
            spanGenre.textContent = genre;
            divGenres.appendChild(spanGenre)
        })

        divContent.append(title, parrafo, divGenres);

        card.append(tagImg, divContent)

        link.append(card);
        containerNovel.append(link);
    });
};

function toogleClearBtn() {
    if (searchInput.value.trim().length > 0) {
        clearbtn.classList.add("show");
    } else {
        clearbtn.classList.remove("show")
    }
}


function setupSearchNav() {
    searchInput.addEventListener('input', (e) => {
        console.log(e.target.value)
        toogleClearBtn()
    });
    searchInput.addEventListener('keyup', toogleClearBtn);

    clearbtn.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        toogleClearBtn();

        searchInput.dispatchEvent(new Event('input',{bubbles: true}))
    });

    toogleClearBtn();

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" || e.key === "Delete"){
            setTimeout(toogleClearBtn, 10);
        }
            
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
    const openMenu = () => {
        navMenu.setAttribute("data-visible", "true");
    }
    const closeMenu = () => {
        navMenu.setAttribute("data-visible", "false")
    }

    toogleOpen?.addEventListener("click", openMenu)
    toogleClose?.addEventListener("click", closeMenu);

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerHeight <= 768) {
                closeMenu();
            }
        })
    })

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navMenu.getAttribute('data-visible') === "true") {
            closeMenu();
        }
    })
}

const initFunctions = () => {
    setupActiveLink();
    setupMobileMenu();
    setupSearchNav();
}


document.addEventListener("DOMContentLoaded", initFunctions)

