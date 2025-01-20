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
  let isValid = true; // Asegúrate de declarar e inicializar isValid aquí.
  const missingFields = []; // Almacenar campos faltantes para mostrar un mensaje al usuario.

  // Ocultar mensaje de error inicialmente
  const errorMessage = document.getElementById('errorMessage');
  if (errorMessage) errorMessage.textContent = '';

  // Restablecer estilos de borde de los campos
  const resetFieldStyles = () => {
    [firstNameInput, lastNameInput, emailInput, numGuestsInput, guestNamesInput].forEach(field => {
      field.style.border = ''; // Restablece el estilo del borde
    });
  };
  resetFieldStyles();

  if (attendance === 'No') {
    // Solo nombre y apellido son requeridos
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

    if (!firstNameInput.value.trim()) {
      missingFields.push('Nombre');
      firstNameInput.style.border = '2px solid red';
      isValid = false;
    }
    if (!lastNameInput.value.trim()) {
      missingFields.push('Apellido');
      lastNameInput.style.border = '2px solid red';
      isValid = false;
    }
  } else if (attendance === 'Sí') {
    // Todos los campos son requeridos
    emailInput.disabled = false;
    numGuestsInput.disabled = false;
    dietaryRestrictionsInput.disabled = false;

    requiredLabels.firstName.textContent = '*';
    requiredLabels.lastName.textContent = '*';
    requiredLabels.email.textContent = '*';
    requiredLabels.numGuests.textContent = '*';

    if (!firstNameInput.value.trim()) {
      missingFields.push('Nombre');
      firstNameInput.style.border = '2px solid red';
      isValid = false;
    }
    if (!lastNameInput.value.trim()) {
      missingFields.push('Apellido');
      lastNameInput.style.border = '2px solid red';
      isValid = false;
    }
    if (!emailInput.value.trim()) {
      missingFields.push('Email');
      emailInput.style.border = '2px solid red';
      isValid = false;
    }
    if (!numGuestsInput.value.trim()) {
      missingFields.push('Número de Acompañantes');
      numGuestsInput.style.border = '2px solid red';
      isValid = false;
    }
    if (parseInt(numGuestsInput.value) > 0) {
      guestNamesInput.disabled = false;
      requiredLabels.guestNames.textContent = '*';
      if (!guestNamesInput.value.trim()) {
        missingFields.push('Nombres de los Acompañantes');
        guestNamesInput.style.border = '2px solid red';
        isValid = false;
      }
    } else {
      guestNamesInput.disabled = true;
      guestNamesInput.value = '';
      requiredLabels.guestNames.textContent = '';
    }
  } else {
    isValid = false; // Si no se selecciona "Sí" o "No".
    missingFields.push('¿Contamos contigo?');
  }

  // Mostrar mensaje de error si faltan campos obligatorios
  if (!isValid && errorMessage) {
    errorMessage.textContent = `Faltan los siguientes campos obligatorios: ${missingFields.join(', ')}`;
    errorMessage.style.color = 'red';
  }

  // Actualizar el estado del botón "Enviar"
  submitBtn.disabled = !isValid;
};

// Escuchar los eventos de cambio en el formulario
attendanceRadios.forEach(radio => radio.addEventListener('change', updateFormState));
[firstNameInput, lastNameInput, emailInput, numGuestsInput, guestNamesInput].forEach(field => {
  field.addEventListener('input', updateFormState);
});

form.addEventListener('input', updateFormState);

submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {
    attendance: [...attendanceRadios].find(radio => radio.checked)?.value,
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email') || '',
    numGuests: parseInt(formData.get('numGuests')) || 0,
    guestNames: formData.get('guestNames') || '',
    dietaryRestrictions: formData.get('dietaryRestrictions') || '',
    timestamp: serverTimestamp(),
  };

  console.log('Datos a enviar:', data);

  try {
    await addDoc(collection(db, 'formResponses'), data);
    alert('¡Formulario enviado exitosamente!');
    form.reset();
    updateFormState();
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    alert('Hubo un error al enviar el formulario. Inténtalo de nuevo.');
  }
});