document.getElementById("rsvp-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita recargar la página

    const formData = {
        Nombre: document.getElementById("name").value,
        Correo: document.getElementById("email").value,
        Asistencia: document.getElementById("attendance").value,
        Acompañantes: document.getElementById("companions").value,
        "Nombres de acompañantes": document.getElementById("companion-names").value,
        "Restricciones alimentarias": document.getElementById("dietary-restrictions").value,
    };

    try {
        const response = await fetch("https://sheetdb.io/api/v1/nvjlakeb4660p", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("¡Formulario enviado con éxito!");
            document.getElementById("rsvp-form").reset(); // Limpia el formulario
        } else {
            const error = await response.json();
            console.error("Error en la respuesta:", error);
            alert("Hubo un problema al enviar el formulario.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo enviar el formulario. Revisa tu conexión o configuración.");
    }
});

