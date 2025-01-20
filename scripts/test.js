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
const attendanceRadios = document.getElementsByName('attendance');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const numGuestsInput = document.getElementById('numGuests');
const guestNamesInput = document.getElementById('guestNames');
const dietaryRestrictionsInput = document.getElementById('dietaryRestrictions');

const requiredLabels = {
  firstName: document.getElementById('firstNameReq'),
  lastName: document.getElementById('lastNameReq'),
  email: document.getElementById('emailReq'),
  numGuests: document.getElementById('numGuestsReq'),
  guestNames: document.getElementById('guestNamesReq'),
};

const updateFormState = () => {
  const attendance = [...attendanceRadios].find(radio => radio.checked)?.value;

  // Restablecer estilos de los campos y mensajes
  const resetFieldStyles = () => {
    [firstNameInput, lastNameInput, emailInput, numGuestsInput, guestNamesInput].forEach(field => {
      field.style.border = ''; // Restablece el borde
      const errorSpan = field.nextElementSibling;
      if (errorSpan && errorSpan.classList.contains('error-message')) {
        errorSpan.textContent = ''; // Limpia el mensaje de error
      }
    });
  };
  resetFieldStyles();

  // Actualizar etiquetas dinámicas
  if (attendance === 'No') {
    emailInput.disabled = true;
    emailInput.value = '';
    numGuestsInput.disabled = true;
    numGuestsInput.value = '';
    guestNamesInput.disabled = true;
    guestNamesInput.value = '';
    dietaryRestrictionsInput.disabled = true;
    dietaryRestrictionsInput.value = '';

    requiredLabels.firstName.textContent = '*';
    requiredLabels.lastName.textContent = '*';
    requiredLabels.email.textContent = '';
    requiredLabels.numGuests.textContent = '';
    requiredLabels.guestNames.textContent = '';
  } else if (attendance === 'Sí') {
    emailInput.disabled = false;
    numGuestsInput.disabled = false;
    dietaryRestrictionsInput.disabled = false;

    requiredLabels.firstName.textContent = '*';
    requiredLabels.lastName.textContent = '*';
    requiredLabels.email.textContent = '*';
    requiredLabels.numGuests.textContent = '*';

    if (parseInt(numGuestsInput.value) > 0) {
      guestNamesInput.disabled = false;
      requiredLabels.guestNames.textContent = '*';
    } else {
      guestNamesInput.disabled = true;
      guestNamesInput.value = '';
      requiredLabels.guestNames.textContent = '';
    }
  }
};

const validateForm = () => {
  const attendance = [...attendanceRadios].find(radio => radio.checked)?.value;
  let isValid = true;

  // Validar campos obligatorios y mostrar mensajes de error
  const validateField = (field, condition, errorMessage) => {
    const errorSpan = field.nextElementSibling || document.createElement('span');
    if (!errorSpan.classList.contains('error-message')) {
      errorSpan.classList.add('error-message');
      field.parentNode.appendChild(errorSpan);
    }
    if (!condition) {
      field.style.border = '2px solid red';
      errorSpan.textContent = errorMessage;
      isValid = false;
    } else {
      field.style.border = '';
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
    isValid = false; // Si no se selecciona "Sí" o "No".
    alert('Por favor, selecciona si contamos contigo.');
  }

  return isValid;
};

// Manejar el envío del formulario
submitBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Evitar el envío por defecto del formulario

  if (validateForm()) {
    alert('Formulario enviado correctamente.');
    // Aquí iría el código para enviar los datos al servidor
  } else {
    alert('Por favor, completa todos los campos obligatorios.');
  }
});
