const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const totalItems = items.length;

let currentIndex = 0;

// Duplicar los elementos para el efecto circular
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

carousel.appendChild(firstClone);
carousel.insertBefore(lastClone, items[0]);

// Mover al primer elemento original al cargar
carousel.style.transform = `translateX(-100%)`;
let allowShift = true;

// Actualizar la posición del carrusel
function updateCarousel() {
  if (!allowShift) return;
  allowShift = false;

  carousel.style.transition = 'transform 0.5s ease-in-out';
  carousel.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;

  setTimeout(() => {
    if (currentIndex === totalItems) {
      currentIndex = 0;
      carousel.style.transition = 'none';
      carousel.style.transform = `translateX(-100%)`;
    } else if (currentIndex === -1) {
      currentIndex = totalItems - 1;
      carousel.style.transition = 'none';
      carousel.style.transform = `translateX(-${totalItems * 100}%)`;
    }
    allowShift = true;
  }, 500);
}

// Ir al siguiente slide
function nextSlide() {
  currentIndex++;
  updateCarousel();
}

// Ir al slide anterior
function prevSlide() {
  currentIndex--;
  updateCarousel();
}

// Event listeners
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Navegación automática
let autoSlide = setInterval(nextSlide, 4000);

// Pausar en hover
carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
carousel.addEventListener('mouseleave', () => {
  autoSlide = setInterval(nextSlide, 4000);
});
