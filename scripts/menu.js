document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".menu-toggle"); // Botón hamburguesa
    const menu = document.querySelector("nav ul"); // Menú

    toggleButton.addEventListener("click", function () {
        console.log("Toggle button clicked"); // Para verificar el clic
        menu.classList.toggle("show"); // Añade/quita la clase "show"
    });
});
