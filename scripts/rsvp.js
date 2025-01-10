document.getElementById('rsvp-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = {

    name = document.getElementById('name').value,
    email = document.getElementById('email').value,
    guests = document.getElementById('guests').value,
    guestNames = document.getElementById('guest-names').value,
    foodRestrictions = document.getElementById('food-restrictions').value,
    };


    try {
        const response = await fetch('https://sheetdb.io/api/v1/nvjlakeb4660p', {
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
