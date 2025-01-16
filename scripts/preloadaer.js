window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.classList.add("hidden"); // Añade la clase para desvanecerlo
    }, 1500); // Desaparece tras 1.5 segundos
});
