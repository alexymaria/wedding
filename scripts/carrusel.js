const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const totalItems = items.length;

let currentIndex = 0;
let allowShift = true;

// Duplicar los elementos para el efecto circular
const itemsArray = Array.from(items); // Convierte NodeList en un array
const firstClone = itemsArray[0].cloneNode(true);
const lastClone = itemsArray[itemsArray.length - 1].cloneNode(true);

carousel.appendChild(firstClone);
carousel.insertBefore(lastClone, itemsArray[0]);

// Ajustar el carrusel para mostrar el primer elemento original al cargar
carousel.style.transform = `translateX(-100%)`;

// Función para actualizar la posición del carrusel
function updateCarousel() {
  if (!allowShift) return; // Evita cambios si no está permitido
  allowShift = false; // Bloquea cambios durante la transición

  // Mueve el carrusel
  carousel.style.transition = 'transform 0.5s ease-in-out';
  carousel.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;

  // Ajusta el índice y posición tras la transición
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
      allowShift = true; // Permite cambios nuevamente
    },
    { once: true } // Elimina el evento después de ejecutarse
  );
}

// Función para ir al siguiente slide
function nextSlide() {
  if (allowShift) {
    currentIndex++;
    if (currentIndex > totalItems) currentIndex = totalItems; // Evita desbordes
    updateCarousel();
  }
}

// Función para ir al slide anterior
function prevSlide() {
  if (allowShift) {
    currentIndex--;
    if (currentIndex < -1) currentIndex = -1; // Evita desbordes
    updateCarousel();
  }
}

// Reinicia la navegación automática después de la interacción manual
function restartAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 4000); // Reinicia el auto-slide
}

// Event listeners para los botones de navegación
nextButton.addEventListener('click', () => {
  nextSlide();
  restartAutoSlide();
});

prevButton.addEventListener('click', () => {
  prevSlide();
  restartAutoSlide();
});

// Navegación automática cada 4 segundos
let autoSlide = setInterval(nextSlide, 4000);

// Pausar auto-slide al hacer hover sobre el carrusel
carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
carousel.addEventListener('mouseleave', () => {
  autoSlide = setInterval(nextSlide, 4000);
});
