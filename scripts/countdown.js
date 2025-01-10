// Fecha y hora de la boda
const weddingDate = new Date('August 30, 2025 17:00:00').getTime();

// Actualizar cuenta atrás cada segundo
const countdown = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    // Calcular días, horas, minutos y segundos restantes
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Mostrar en pantalla
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // Si la cuenta atrás termina
    if (timeLeft < 0) {
        clearInterval(countdown);
        document.querySelector('.countdown-timer').innerHTML = '<p>¡El gran día ha llegado!</p>';
    }
}, 1000);
