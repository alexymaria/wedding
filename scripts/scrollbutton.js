document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.getElementById("backToTop");

    // Mostrar botón al hacer scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) { // Mostrar si se ha hecho scroll más de 300px
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    // Desplazar hacia arriba al hacer clic
    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Desplazamiento suave
        });
    });
});
