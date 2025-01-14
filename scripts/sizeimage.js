document.addEventListener("DOMContentLoaded", function () {
    const image = document.querySelector(".main-image");

    // Espera a que la imagen esté completamente cargada
    image.onload = function () {
        const originalWidth = image.naturalWidth; // Ancho original de la imagen
        const originalHeight = image.naturalHeight; // Altura original de la imagen

        // Configura max-width y max-height dinámicamente
        image.style.maxWidth = `${originalWidth}px`;
        image.style.maxHeight = `${originalHeight}px`;
    };
});
