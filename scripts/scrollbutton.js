document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopButton = document.getElementById("scrollToTopButton");

    // Mostrar u ocultar el botón al hacer scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > window.innerHeight) {
            scrollToTopButton.classList.add("show");
        } else {
            scrollToTopButton.classList.remove("show");
        }
    });

    // Acción para volver al inicio al hacer clic en el botón
    scrollToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Movimiento suave
        });
    });
});
