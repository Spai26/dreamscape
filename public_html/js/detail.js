import { getUrlParams, goBack } from "./main.js"
import { createSpan, pathNovel } from "./novel.js";
import { novels } from "./novels-data.js"


const link_back = document.getElementById("go-back");

link_back.addEventListener("click", (e) => {
    e.preventDefault();
    goBack();
})

const findBySlug = (slug) => {
    return novels.find((novel) => {
        if (novel.slug === slug) {
            return novel;
        }
    });
}

function createDetailNovel(novel) {
    const image = document.querySelector(".detail-image");
    const img = image.querySelector("img")
    const base = pathNovel();
    img.src = `${base}${novel.image}`;
    img.alt = novel.slug;   
    img.loading = "lazy";

    const content = document.querySelector(".detail-content");
    const h1 = content.querySelector("h1");
    h1.textContent = novel.title;
    const metada_label = document.querySelectorAll(".metadata-item");
    const item1 = metada_label[0].querySelectorAll("span");
    item1[1].textContent = novel.author;
    const item2 = metada_label[1].querySelectorAll("span");
    item2[1].textContent = novel.publishDate;    
   
    const tags = document.querySelector(".genre-tags");    
    novel.genres.forEach((genre) => {
        const tag = createSpan(genre, "genre-tag");
        tags.appendChild(tag);
    });

    const synopsis = document.querySelector(".detail-synopsis")    
    const p = synopsis.querySelector("p")
    p.textContent = novel.description
}


function loadNovelDetail() {
    const slug = getUrlParams();
    const novel = findBySlug(slug);   
    createDetailNovel(novel);
}


function initDetail() {
    loadNovelDetail();
    
}
document.addEventListener("DOMContentLoaded", initDetail)