'use strict'

import { novels } from "./novels-data.js";


console.log(novels)
const header = document.getElementById("header-main");
const parallaxSection = document.getElementById("inicio")


const btnOpen = document.querySelector(".toogle-nav-open");
const btnClose = document.querySelector(".toogle-nav-close");
const navBar = document.querySelector(".topnav-menu")

document.addEventListener("DOMContentLoaded", () => {
    loadNovelsCard();
    
    window.addEventListener("scroll", () => {
        const parallaxHeight = parallaxSection.offsetHeight;

        const scrolling = window.pageXOffset || document.documentElement.scrollTop;

        (scrolling > parallaxHeight * 0.9) ? header.classList.add("visible") : header.classList.remove("visible")

    })

    btnOpen.addEventListener("click", () => {
        navBar.setAttribute("data-visible", "true");
    })

    btnClose.addEventListener("click", () => {
        navBar.setAttribute("data-visible", "false")
    });
})

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
        novel.genres.forEach((genre)=> {
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

console.log(loadNovelsCard())