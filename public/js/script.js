// Aquí puedes agregar funcionalidad adicional en JavaScript si es necesario.
// Por ejemplo, podrías gestionar eventos en el formulario o agregar interactividad al mapa.
console.log("Página cargada correctamente.");
document.addEventListener("DOMContentLoaded", function () {
    // Oculta los mensajes de error al cargar la página
    document.querySelectorAll(".form-error-message, .form-line-error").forEach(function (error) {
        error.style.display = "none";
    });

    // Maneja el envío del formulario
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function () {
            // Verifica si hay errores en el formulario
            if (document.querySelector(".form-line-error")) {
                sessionStorage.setItem("jotformErrorState", "true");
            } else {
                sessionStorage.removeItem("jotformErrorState");
            }
        });
    }
});

