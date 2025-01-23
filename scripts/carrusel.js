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

function updateCarousel() {
    if (!allowShift) return; // Evita cambios mientras está en transición
    allowShift = false; // Bloquea nuevos cambios
  
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
  
    carousel.addEventListener(
      'transitionend',
      () => {
        if (currentIndex === totalItems) {
          currentIndex = 0;
          carousel.style.transition = 'none';
          carousel.style.transform = `translateX(-100%)`;
        } else if (currentIndex === -1) {
          currentIndex = totalItems - 1;
          carousel.style.transition = 'none';
          carousel.style.transform = `translateX(-${totalItems * 100}%)`;
        }
        allowShift = true; // Permite cambios después de la transición
      },
      { once: true } // Asegura que el evento se elimine después de ejecutarse una vez
    );
  }
  
  function nextSlide() {
    if (allowShift) {
      currentIndex++;
      if (currentIndex > totalItems) currentIndex = totalItems; // Previene desbordes
      updateCarousel();
    }
  }
  
  function prevSlide() {
    if (allowShift) {
      currentIndex--;
      if (currentIndex < -1) currentIndex = -1; // Previene desbordes
      updateCarousel();
    }
  }
  function restartAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 4000);
  }
  
  nextButton.addEventListener('click', () => {
    nextSlide();
    restartAutoSlide(); // Reinicia el auto-slide
  });
  
  prevButton.addEventListener('click', () => {
    prevSlide();
    restartAutoSlide(); // Reinicia el auto-slide
  });
  
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
