import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyACJzTzUT9fZdvoyGNFZkauJvIfJebSOik",
  authDomain: "wedd-88c89.firebaseapp.com",
  databaseURL: "https://wedd-88c89-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wedd-88c89",
  storageBucket: "wedd-88c89.firebasestorage.app",
  messagingSenderId: "387760003871",
  appId: "1:387760003871:web:07155124a2a69c5a7f6e2a",
  measurementId: "G-C2CFYLZ973"
};

const app = initializeApp(firebaseConfig);
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
      if (errorSpan) errorSpan.textContent = errorMessage; // Evita errores si errorSpan no existe
      isValid = false;
    } else {
      field?.classList.remove('error-border');
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

  // Validar el formulario (lógica de validación no mostrada aquí)
  const attendance = document.querySelector('input[name="attendance"]:checked')?.value;

  if (attendance) {
    // Si la validación es correcta, muestra el mensaje
    showThankYouMessage(attendance);
  } else {
    alert('Por favor, selecciona si asistirás o no.');
  }
});


// Actualizar estado de los campos dinámicamente
attendanceRadios.forEach(radio => radio.addEventListener('change', resetValidation));
[numGuestsInput].forEach(field =>
  field.addEventListener('input', resetValidation)
);