import { createCard } from "./novel.js";
import { novels } from "./novels-data.js";

let genres = [];

export function fetchResult(query) {
    console.log("fect", query)

}
export function handlerToSearch(input) {
    const params = new URLSearchParams(window.location.search);
    console.log("params", params.get("search"));
    console.log(input)
}

export const loadFilterGenre = () => {
    return novels.forEach((novel) => novel.genres.forEach((genre) => {
        if (!genres.includes(genre)) {
            genres.push(genre)
        }
    }));
}

export const loadAllNovels = (page = 1, cardsPerPage = 8) => {
    const novelsGrid = document.querySelector('.novels-grid');
    if (!novelsGrid) {
        console.log("no se encontro el contenedor novels-grid");
        return;
    }

    novelsGrid.innerHTML = "";

    const totalPage = Math.ceil(novels.length / cardsPerPage);
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const novelToShow = novels.slice(startIndex, endIndex);

    novelToShow.forEach((novel) => { 
        const card = createCard(novel);
        novelsGrid.appendChild(card);
    })

    return Math.ceil(novels.length / cardsPerPage);
}