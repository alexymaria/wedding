window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.classList.add("hidden"); // Añade la clase para desvanecerlo
    }, 1000); // Espera 1 segundo antes de ocultarlo
});
