// Replegar menú en escritorio al hacer scroll
let lastScroll = 0;
const nav = document.querySelector('#main-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll) {
        // Replegar si se hace scroll hacia abajo
        nav.classList.add('hidden');
    } else {
        // Mostrar si se hace scroll hacia arriba
        nav.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});

// Mostrar/ocultar menú en móvil
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
});
