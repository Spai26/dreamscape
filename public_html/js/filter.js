import { createCard } from "./novel.js";
import { novels } from "./novels-data.js";

// lista de novelas a modificar.
let filteredList = [...novels];


/**
 * Variables para paginación
 * @param { currentPage } number posicion inicial para la pagina.
 * @param { pageToShow } array contiene la cantidad de paginas a recorrer.
 * @param { COUNT_CARD_PAGE } number cantidad de elementos por pagina.
 */
const pageToShow = [];
const COUNT_CARD_PAGE = 8;
let currentPage = 1;

export const loadFilteredGenres = () => {
    const genreSelect = document.getElementById("genres");
    
    const genres = new Set();
    
    novels.forEach((novel) => novel.genres.forEach((genre) => genres.add(genre)));
    
    genreSelect.innerHTML = `<option value="all">Todos</option>`;

    Array.from(genres).forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });
}

export const setupPagination = () => {
    renderPagination();
};

function renderPagination() {
    const novelsGrid = document.querySelector('.novels-grid');

    if (!novelsGrid) return;

    const TOTAL_PAGES = Math.ceil(filteredList.length / COUNT_CARD_PAGE);
    // valores de min y max de pagina
    const firstPosition = (currentPage - 1) * COUNT_CARD_PAGE;
    const lastPosition = firstPosition + COUNT_CARD_PAGE;

    const paginatedList = filteredList.slice(firstPosition, lastPosition);

    novelsGrid.innerHTML = "";
    paginatedList.forEach((novel) => {
        const card = createCard(novel);
        novelsGrid.appendChild(card);
    });

    createPagination(TOTAL_PAGES);
}

function createPagination(totalPages) {
    let pagination = document.querySelector(".list-pagination");

    if (!pagination) {
        pagination = createDiv("list-pagination")
        document.querySelector(".novels-grid").insertAdjacentElement("afterend", pagination);
    }

    pagination.innerHTML = "";

    // ⬅ Botón anterior
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&lt';
    prevBtn.classList = "page"
    prevBtn.disabled = currentPage === 1;

    prevBtn.addEventListener('click', () => {
        currentPage--;
        renderPagination();
        window.scrollTo({ top: 0, behavior: "smooth"});
    });

    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.classList = "page"
        if (i === currentPage) {
            pageBtn.classList.add('activePage');
            pageBtn.disabled = true;
        }
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderPagination();
            window.scrollTo({ top: 0, behavior: "smooth"});
        });
        pagination.appendChild(pageBtn);
    }

    // ➡ Botón Siguiente
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&gt;';
    nextBtn.classList = "page"
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        currentPage++;
        renderPagination();
        window.scrollTo({ top: 0, behavior: "smooth"});
    });
    pagination.appendChild(nextBtn);
}

export function handlerToSearch(input) {
    const params = new URLSearchParams(window.location.search);
    console.log("params", params.get("search"));
    console.log(input)
}

/*
export function fetchResult(query) {
    console.log("fect", query)
}*/