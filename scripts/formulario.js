  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCZ7OpOMXty-Ayf9dTWepCzxWZNCznERSo",
    authDomain: "aymwedd.firebaseapp.com",
    projectId: "aymwedd",
    storageBucket: "aymwedd.firebasestorage.app",
    messagingSenderId: "933331071847",
    appId: "1:933331071847:web:6740614f0c4630675835c2",
    measurementId: "G-8RK8JJTRFN"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
const db = getFirestore(app);

const form = document.getElementById('dataForm');
const submitBtn = document.getElementById('submitBtn');

// Campos del formulario
const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const numGuestsInput = document.getElementById('numGuests');
const guestNamesInput = document.getElementById('guestNames');

// Etiquetas dinámicas para los asteriscos
const requiredLabels = {
  firstName: document.getElementById('requiredFirstName'),
  lastName: document.getElementById('requiredLastName'),
  email: document.getElementById('requiredEmail'),
  numGuests: document.getElementById('requiredNumGuests'),
  guestNames: document.getElementById('requiredGuestNames'),
};

// Validar campos obligatorios al enviar
const validateForm = () => {
  const attendance = [...attendanceRadios].find(radio => radio.checked)?.value;
  let isValid = true;

  const validateField = (field, condition, errorMessage) => {
    const errorSpan = field?.nextElementSibling; // Asegúrate de que field existe
    if (!condition) {
      field?.classList.add('error-border'); // Solo modifica si field existe
      errorSpan.textContent = errorMessage;
      if (errorSpan) errorSpan.textContent = errorMessage; // Evita errores si errorSpan no existe
      isValid = false;
    } else {
      field?.classList.remove('error-border');
      errorSpan.textContent = '';
      if (errorSpan) errorSpan.textContent = '';
    }
  };

  if (attendance === 'No') {
    validateField(firstNameInput, firstNameInput?.value.trim() !== '', 'Campo obligatorio');
    validateField(lastNameInput, lastNameInput?.value.trim() !== '', 'Campo obligatorio');
  } else if (attendance === 'Sí') {
    validateField(firstNameInput, firstNameInput?.value.trim() !== '', 'Campo obligatorio');
    validateField(lastNameInput, lastNameInput?.value.trim() !== '', 'Campo obligatorio');
    validateField(emailInput, emailInput?.value.trim() !== '', 'Campo obligatorio');
    validateField(numGuestsInput, numGuestsInput?.value.trim() !== '', 'Campo obligatorio');

    if (parseInt(numGuestsInput.value) > 0) {
      validateField(guestNamesInput, guestNamesInput?.value.trim() !== '', 'Campo obligatorio');
    }
  } else {
    alert('Por favor, selecciona si contamos contigo.');
    isValid = false;
  }

  return isValid;
};
// Reiniciar estilos y mensajes dinámicamente
const resetValidation = () => {
  const attendance = [...attendanceRadios].find(radio => radio.checked)?.value;

  // Habilitar o deshabilitar campos según la selección
  emailInput.disabled = attendance === 'No';
  numGuestsInput.disabled = attendance === 'No';
  guestNamesInput.disabled = attendance === 'No' || parseInt(numGuestsInput.value) === 0;

  // Reiniciar bordes y mensajes
  [firstNameInput, lastNameInput, emailInput, numGuestsInput, guestNamesInput].forEach(field => {
    field.classList.remove('error-border');
    const errorSpan = field?.nextElementSibling;
    if (errorSpan) errorSpan.textContent = '';
  });

  // Actualizar asteriscos dinámicos
  requiredLabels.email.textContent = attendance === 'Sí' ? '*' : '';
  requiredLabels.numGuests.textContent = attendance === 'Sí' ? '*' : '';
  requiredLabels.guestNames.textContent = attendance === 'Sí' && parseInt(numGuestsInput.value) > 0 ? '*' : '';
};
const formContainer = document.querySelector('.form-container'); // Contenedor del formulario

const thankYouYes = document.getElementById('thankYouYes');
const thankYouNo = document.getElementById('thankYouNo');


const showThankYouMessage = (attendance) => {
  // Ocultar el formulario
  const formContainer = document.querySelector('.form-container form');
  if (formContainer) formContainer.style.display = 'none';

  // Mostrar el mensaje adecuado
  const thankYouYes = document.getElementById('thankYouYes');
  const thankYouNo = document.getElementById('thankYouNo');

  if (attendance === 'Sí' && thankYouYes) {
    thankYouYes.style.display = 'block';
  } else if (attendance === 'No' && thankYouNo) {
    thankYouNo.style.display = 'block';
  }
};


// Manejar el envío del formulario
document.getElementById('dataForm').addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtener el valor seleccionado de attendance
  const attendance = document.querySelector('input[name="attendance"]:checked')?.value;

  if (!attendance) {
    // Mostrar alerta si no se seleccionó Sí o No
    alert('Por favor, selecciona si asistirás o no.');
    return; // Terminar ejecución aquí
  }

  // Validar el formulario según la opción seleccionada
  if (!validateForm()) {
    // Mostrar alerta si hay errores en la validación
    alert('Por favor, completa todos los campos obligatorios.');
    return; // Terminar ejecución aquí
  }

  // Si todo es válido, mostrar mensaje de agradecimiento
  showThankYouMessage(attendance);
});


// Actualizar estado de los campos dinámicamente
attendanceRadios.forEach(radio => radio.addEventListener('change', resetValidation));
[numGuestsInput].forEach(field =>
  field.addEventListener('input', resetValidation)
);