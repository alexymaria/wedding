// Aquí puedes agregar funcionalidad adicional en JavaScript si es necesario.
// Por ejemplo, podrías gestionar eventos en el formulario o agregar interactividad al mapa.
console.log("Página cargada correctamente.");
document.addEventListener("DOMContentLoaded", function () {
    // Limpia cualquier estado previo almacenado (opcional, puede ser redundante)
    sessionStorage.removeItem("jotformErrorState");

    // Oculta los mensajes de error inicialmente
    const errorMessages = document.querySelectorAll(".form-error-message, .form-line-error");
    errorMessages.forEach(function (error) {
        error.style.display = "none"; // Oculta mensajes de error iniciales
    });

    // Manejo del estado de errores
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            const hasErrors = document.querySelectorAll(".form-line-error").length > 0;

            if (hasErrors) {
                sessionStorage.setItem("jotformErrorState", "true");
            } else {
                sessionStorage.removeItem("jotformErrorState"); // Limpia el estado si no hay errores
            }
        });
    }

    // Comprobar y ocultar el error si la página se abre en una nueva pestaña
    const jotformErrorState = sessionStorage.getItem("jotformErrorState");
    if (jotformErrorState === "true") {
        errorMessages.forEach(function (error) {
            error.style.display = "none"; // Vuelve a ocultar los mensajes de error
        });
        sessionStorage.removeItem("jotformErrorState"); // Limpia el estado para la próxima sesión
    }
});

