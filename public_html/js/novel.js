import { novels } from "./novels-data.js";
export const authors = [];
// section banner index.html
export const loadMinNovels = () => {
    const novelsGrid = document.querySelector('.novels-grid');
    if (!novelsGrid) {
        console.log("no se encontro el contenedor novels-grid");
        return;
    }

    novelsGrid.innerHTML = "";

    novels.slice(0, 4).forEach((novel) => {
        const card = createCard(novel);
        novelsGrid.appendChild(card);
    })
}

export function createCard(novel) {
    const article = document.createElement("article");
    article.className = "novel-card";
    article.setAttribute("data-novel", novel.id);

    const relative = createDiv("group-relative");
    const div_item = createDiv("novel-item");
    const div_container_img = createDiv("novel-image-container");
    const info = createDiv("novel-info");

    const image_link = createLink("", linkNovel(novel.slug), "novel-link");

    const div_genres_container = createDiv("novel-genres");
    const div_description = createDiv("novel-description")

    const info_link = createLink("", linkNovel(novel.slug), "novel-link");

    const link_read = createLink("Leer Ahora", linkNovel(novel.slug), "read-button btn-primary");

    const img_novel = document.createElement("img");
    const base = pathNovel();

    img_novel.className = "novel-image";
    img_novel.src = `${base}${novel.image}`;
    img_novel.alt = novel.slug || novel.title || "portada de novela";
    img_novel.loading = "lazy";

    const img_flag = document.createElement("img");
    img_flag.className = "novel-flag";
    img_flag.src = `https://flagcdn.com/w40/${novel.lang || 'es'}.png`;
    img_flag.alt = `bandera de ${novel.languaje}`;
    img_flag.loading = "lazy";

    const h4 = document.createElement("h4");
    h4.className = "title-complement";
    h4.textContent = novel.title;


    novel.genres.forEach((genre) => {
        const tag = createSpan(genre, "genre-tag title-secondary");
        div_genres_container.appendChild(tag);
    })


    const p = document.createElement("p");
    p.className = "description-text";
    p.textContent = novel.short_description || "";

    const stats = createDiv("novel-stats");
    const itemStar = createDiv("stat-item");
    const view = createDiv("stat-item");
    const valueView = createSpan(novel.reviews);
    const itemHeart = createDiv("stat-item");
    const rating = createDiv("rating-stars")
    const valueRating = createSpan(novel.rating);

    loadRating(rating, novel.rating)

    info_link.appendChild(h4)
    info.appendChild(info_link);
    article.appendChild(relative);
    relative.appendChild(div_item);
    div_item.appendChild(div_container_img);
    div_container_img.appendChild(image_link);
    image_link.append(img_novel, img_flag);
    div_item.appendChild(info);
    info.appendChild(info_link);
    info_link.appendChild(h4);
    info.append(info_link, div_genres_container);
    relative.appendChild(div_description);
    div_description.append(p, stats);
    stats.append(itemStar, view, itemHeart, link_read);
    itemStar.append(rating, valueRating);
    view.append(svgView(), valueView);
    itemHeart.appendChild(svgHeart());

    return article
}

export function pathNovel() {
    const subPage = window.location.pathname.includes("/p/novels");
    const imagebase = subPage ? "../../assets/novels/" : "./assets/novels/"
    return imagebase;
}

export function loadRating(element, rating) {
    for (let i = 0; i < Math.floor(rating); i++) {
        element.appendChild(svgStart());
    }
}

export function linkNovel(slug) {
    const path = window.location.pathname.includes("/p/novels");

    const linkPath = path ? `./detail.html?slug=${slug}` : `./p/novels/detail.html?slug=${slug}`;

    return linkPath
}

export function createSpan(text, classname) {
    const span = document.createElement("span");
    span.textContent = text;
    span.className = classname || "none";
    return span;
}

export function createLink(text, href, classname) {
    const link = document.createElement("a");
    link.textContent = text;
    link.href = href;
    link.className = classname;

    return link;
}

export function createDiv(className) {
    const div = document.createElement("div");
    div.className = className;
    return div;
}

export function svgStart() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "star");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("fill", "currentColor");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "m21.5 9.757-5.278 4.354 1.649 7.389L12 17.278 6.129 21.5l1.649-7.389L2.5 9.757l6.333-.924L12 2.5l3.167 6.333Z")

    svg.appendChild(path)

    return svg
}

export function svgHeart() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon heart-icon");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "currentColor");


    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M2 9.137C2 14 6.02 16.591 8.962 18.911 10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138c0-4.863-5.5-8.312-10-3.636C7.5.825 2 4.274 2 9.137Z")

    svg.appendChild(path)
    return svg;
}

export function svgView() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon view-icon");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 1024 1024");


    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z")

    svg.appendChild(path)
    return svg
}