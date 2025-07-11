import { createCard } from "./novel.js";
import { novels } from "./novels-data.js";


let genres = [];
let authors = [];
export const loadFilterGenre = () => {
    return novels.forEach((novel) => novel.genres.forEach((genre) => {
        if (!genres.includes(genre)) {
            genres.push(genre)
        }
    }));
}

export const loadAllNovels = () => {
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