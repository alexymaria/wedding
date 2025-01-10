document.getElementById('rsvp-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const guests = document.getElementById('guests').value;
    const guestNames = document.getElementById('guest-names').value;
    const foodRestrictions = document.getElementById('food-restrictions').value;

    const data = {
        data: {
            "Nombre": name,
            "Correo Electrónico": email,
            "Número de Acompañantes": guests,
            "Nombres de Acompañantes": guestNames,
            "Restricciones Alimentarias": foodRestrictions,
            "Fecha de Envío": new Date().toISOString(),
        }
    };

    try {
        const response = await fetch('https://sheetdb.io/api/v1/uqzq9k6oqyv5m', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            document.getElementById('response-message').textContent = '¡Gracias por confirmar tu asistencia!';
            document.getElementById('rsvp-form').reset();
        } else {
            throw new Error('Error al enviar el formulario.');
        }
    } catch (error) {
        document.getElementById('response-message').textContent = 'Hubo un problema al enviar tu confirmación. Inténtalo más tarde.';
        console.error(error);
    }
});
