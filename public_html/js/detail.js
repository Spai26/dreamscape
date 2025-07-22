import { getUrlParams, goBack } from "./main.js"
import { createSpan, pathNovel } from "./novel.js";
import { novels } from "./novels-data.js"

const findBySlug = (slug) => {
    return novels.find((novel) => {
        if (novel.slug === slug) {
            return novel;
        }
    });
}

export function initDetailPage() {
    const link_back = document.getElementById("go-back");

    if (link_back) {
        link_back.addEventListener("click", (e) => {
            e.preventDefault();
            goBack();
        })
    }

    const slug = getUrlParams();
    const novel = findBySlug(slug);

    if (novel) {
        createDetailNovel(novel);

        const title = document.getElementsByName("title");
        console.log(title)
    }
    
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
