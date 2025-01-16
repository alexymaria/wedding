document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");
    
    // Ocultar el preloader después de que la página esté lista
    window.addEventListener("load", () => {
        preloader.style.opacity = "0"; // Añade un efecto de desvanecimiento
        setTimeout(() => {
            preloader.style.display = "none"; // Lo elimina completamente después de desvanecer
        }, 500); // Espera que termine la animación
    });
});
