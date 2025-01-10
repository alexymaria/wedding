// Aquí puedes agregar funcionalidad adicional en JavaScript si es necesario.
// Por ejemplo, podrías gestionar eventos en el formulario o agregar interactividad al mapa.
console.log("Página cargada correctamente.");

// Seleccionamos los elementos clave del DOM
const hamburger = document.getElementById('hamburger');
const menuList = document.getElementById('menu-list');

// Función para alternar el estado del menú
function toggleMenu() {
    menuList.classList.toggle('active');
    hamburger.classList.toggle('open');
}

// Añadimos el evento clic al icono de la hamburguesa
hamburger.addEventListener('click', toggleMenu);

// Cerramos el menú cuando se hace clic en un enlace
const menuLinks = document.querySelectorAll('#menu-list a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuList.classList.remove('active');
        hamburger.classList.remove('open');
    });
});
