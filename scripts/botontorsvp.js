document.addEventListener("DOMContentLoaded", function () {
    const goToFormButton = document.getElementById("goToFormButton");

    goToFormButton.addEventListener("click", function () {
        const formSection = document.getElementById("form"); // Reemplaza con el ID del formulario
        if (formSection) {
            formSection.scrollIntoView({
                behavior: "smooth", // Desplazamiento suave
            });
        }
    });
});
