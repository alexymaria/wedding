// Selecciona el botón del menú hamburguesa y los enlaces del menú
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Añade un evento para mostrar/ocultar el menú al hacer clic
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
