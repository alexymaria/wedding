document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".menu-toggle"); // Botón hamburguesa
    const mobileMenu = document.querySelector("#mobile-menu"); // Menú móvil
    const menuLinks = mobileMenu.querySelectorAll("a"); // Enlaces del menú móvil

    // Alternar el menú al hacer clic en el botón
    toggleButton.addEventListener("click", function () {
        console.log("Toggle button clicked"); // Verificar el clic
        mobileMenu.classList.toggle("show"); // Añade/quita la clase "show"
    });

    // Cerrar el menú al hacer clic en un enlace
    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            console.log("Menu link clicked"); // Verificar el clic
            mobileMenu.classList.remove("show"); // Asegurarse de que el menú se cierre
        });
    });
});
