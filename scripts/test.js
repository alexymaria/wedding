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
    const errorSpan = field.nextElementSibling;
    if (!condition) {
      field.classList.add('error-border');
      errorSpan.textContent = errorMessage;
      isValid = false;
    } else {
      field.classList.remove('error-border');
      errorSpan.textContent = '';
    }
  };

  if (attendance === 'No') {
    validateField(firstNameInput, firstNameInput.value.trim() !== '', 'Campo obligatorio');
    validateField(lastNameInput, lastNameInput.value.trim() !== '', 'Campo obligatorio');
  } else if (attendance === 'Sí') {
    validateField(firstNameInput, firstNameInput.value.trim() !== '', 'Campo obligatorio');
    validateField(lastNameInput, lastNameInput.value.trim() !== '', 'Campo obligatorio');
    validateField(emailInput, emailInput.value.trim() !== '', 'Campo obligatorio');
    validateField(numGuestsInput, numGuestsInput.value.trim() !== '', 'Campo obligatorio');

    if (parseInt(numGuestsInput.value) > 0) {
      validateField(guestNamesInput, guestNamesInput.value.trim() !== '', 'Campo obligatorio');
    }
  } else {
    alert('Por favor, selecciona si contamos contigo.');
    isValid = false;
  }

  return isValid;
};

// Manejar el envío del formulario
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evitar el envío por defecto
  if (validateForm()) {
    alert('Formulario enviado correctamente.');
    form.reset(); // Reiniciar formulario tras envío exitoso
  } else {
    alert('Por favor, completa todos los campos obligatorios.');
  }
});

// Actualizar estado de los campos según la selección
attendanceRadios.forEach(radio => radio.addEventListener('change', () => {
  const attendance = [...attendanceRadios].find(radio => radio.checked)?.value;

  // Resetear campos al cambiar opción
  emailInput.disabled = attendance === 'No';
  numGuestsInput.disabled = attendance === 'No';
  guestNamesInput.disabled = attendance === 'No' || parseInt(numGuestsInput.value) === 0;

  requiredLabels.email.textContent = attendance === 'Sí' ? '*' : '';
  requiredLabels.numGuests.textContent = attendance === 'Sí' ? '*' : '';
  requiredLabels.guestNames.textContent = attendance === 'Sí' && parseInt(numGuestsInput.value) > 0 ? '*' : '';
}));
