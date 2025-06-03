'use strict'

// Elementos DOM que se usan múltiples veces
const elements = {
    header: document.getElementById("header-main"),
    parallax: document.getElementById("parallax"),
    navBar: document.querySelector(".topnav-menu"),
    overlay: document.getElementById('novel-detail-overlay'),
    detailElements: {
        image: document.getElementById('detail-image'),
        title: document.getElementById('detail-title'),
        author: document.getElementById('detail-author'),
        date: document.getElementById('detail-date'),
        description: document.getElementById('detail-description'),
        genres: document.getElementById('detail-genres')
    }
};

// Manejadores de eventos para la navegación
function handleNavigation() {
    const btnOpen = document.querySelector(".toogle-nav-open");
    const btnClose = document.querySelector(".toogle-nav-close");

    btnOpen.addEventListener("click", () => elements.navBar.setAttribute("data-visible", "true"));
    btnClose.addEventListener("click", () => elements.navBar.setAttribute("data-visible", "false"));
}

// Manejador del scroll para el header
function handleHeaderScroll() {
    const parallaxHeight = elements.parallax.offsetHeight;
    const scrolling = window.pageYOffset || document.documentElement.scrollTop;
    elements.header.classList.toggle("visible", scrolling > parallaxHeight * 0.9);
}

// Variable global para almacenar los datos de las novelas
let novelsData = {};

// Función para cargar los datos de las novelas
async function loadNovelsData() {
    try {
        const response = await fetch('./data/novels.json');
        if (!response.ok) throw new Error('No se pudieron cargar los datos de las novelas');
        novelsData = await response.json();
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

// Función para mostrar el detalle de una novela
function showNovelDetail(novelId) {
    const novel = novelsData[novelId];
    if (!novel) return;

    // Actualizar contenido
    const { detailElements } = elements;
    Object.entries(novel).forEach(([key, value]) => {
        if (key === 'genres') {
            updateGenres(value);
        } else if (detailElements[key]) {
            detailElements[key][key === 'image' ? 'src' : 'textContent'] = value;
        }
    });

    // Mostrar overlay
    elements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para actualizar los géneros
function updateGenres(genres) {
    elements.detailElements.genres.innerHTML = genres
        .map(genre => `<span class="genre-tag">${genre}</span>`)
        .join('');
}

// Función para cerrar el detalle
function closeNovelDetail() {
    elements.overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Configurar los event listeners
function setupEventListeners() {
    // Event listener para el scroll
    window.addEventListener("scroll", handleHeaderScroll);

    // Event listeners para las novelas
    document.querySelectorAll('.novel-card').forEach(card => {
        card.addEventListener('click', () => showNovelDetail(card.dataset.novel));
    });

    // Event listeners para cerrar el detalle
    const closeButton = document.querySelector('.close-detail');
    if (closeButton) {
        closeButton.addEventListener('click', closeNovelDetail);
    }

    if (elements.overlay) {
        elements.overlay.addEventListener('click', (e) => {
            if (e.target === elements.overlay) closeNovelDetail();
        });
    }

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeNovelDetail();
    });
}

// Función para manejar la animación de las secciones al hacer scroll
function handleSectionAnimations() {
    const sections = document.querySelectorAll('.section-spacing');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Una vez que la sección es visible, no necesitamos seguir observándola
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => observer.observe(section));
}

// Función para actualizar el enlace activo en la navegación
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const options = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remover clase active de todos los enlaces
                navLinks.forEach(link => link.classList.remove('active'));
                // Añadir clase active al enlace correspondiente
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, options);

    sections.forEach(section => observer.observe(section));
}

// Función para cerrar el menú móvil al hacer clic en un enlace
function setupMobileNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navBar = document.querySelector('.topnav-menu');
            if (navBar) {
                navBar.setAttribute('data-visible', 'false');
            }
        });
    });
}

// Función para inicializar los índices de los elementos del menú
function initializeMenuItems() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
}

// Función para manejar la visibilidad del header
function handleHeaderVisibility() {
    const header = elements.header;
    const novelsSection = document.getElementById('novels-section');

    window.addEventListener('scroll', () => {
        if (!novelsSection) return;

        const novelsSectionTop = novelsSection.offsetTop;
        const currentScroll = window.pageYOffset;

        // Mostrar el header cuando llegamos a la sección de novelas
        if (currentScroll >= novelsSectionTop - 100) {
            header.classList.add('visible');
            header.style.transform = 'translateY(0)';
        } else {
            header.classList.remove('visible');
        }
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
    await loadNovelsData();
    handleNavigation();
    setupEventListeners();
    handleSectionAnimations();
    updateActiveNavLink();
    setupMobileNavigation();
    initializeMenuItems();
    handleHeaderVisibility();
});

