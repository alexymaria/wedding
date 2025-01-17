document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".menu-toggle"); // Botón hamburguesa
    const menu = document.querySelector("#mobile-menu"); // Menú
    const menuLinks = menu.querySelectorAll("a"); // Enlaces del menú

    // Alternar el menú al hacer clic en el botón
    toggleButton.addEventListener("click", function () {
        console.log("Toggle button clicked"); // Verificar el clic
        menu.classList.toggle("show"); // Añade/quita la clase "show"
    });

    // Cerrar el menú al hacer clic en un enlace
    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            console.log("Menu link clicked"); // Verificar el clic
            menu.classList.remove("show"); // Asegurarse de que el menú se cierre
        });
    });
});


