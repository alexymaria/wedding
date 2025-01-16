const carousel = document.querySelector('.carousel');
let currentIndex = 0;

function moveCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    currentIndex = (currentIndex + 1) % items.length;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(moveCarousel, 4000); // Cambia cada 4 segundos
