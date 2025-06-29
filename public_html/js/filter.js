import { createCard } from "./novel.js";
import { novels } from "./novels-data.js";


let genres = [];

const loadFilterGenre = () => {
    return novels.forEach((novel) => novel.genres.forEach((genre) => {
        if (!genres.includes(genre)) {
            genres.push(genre)
        }
    }));
}

const loadAllNovels = () => {
    const novelsGrid = document.querySelector('.novels-grid');
    if (!novelsGrid) {
        console.log("no se encontro el contenedor novels-grid");
        return;
    }

    novelsGrid.innerHTML = "";

    novels.forEach((novel) => {
        const card = createCard(novel);
        novelsGrid.appendChild(card);
    })
}


function init() {
    loadAllNovels();
}


document.addEventListener("DOMContentLoaded",init)