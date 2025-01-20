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

  if (attendance === 'No') {
    // Only firstName and lastName are required
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

    isValid = firstNameInput.value.trim() && lastNameInput.value.trim();
  } else if (attendance === 'Sí') {
    // All fields are required
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
      isValid = firstNameInput.value.trim() && lastNameInput.value.trim() && emailInput.value.trim() && numGuestsInput.value && guestNamesInput.value.trim();
    } else {
      guestNamesInput.disabled = true;
      guestNamesInput.value = '';
      requiredLabels.guestNames.textContent = '';
      isValid = firstNameInput.value.trim() && lastNameInput.value.trim() && emailInput.value.trim() && numGuestsInput.value;
    }
  }

  submitBtn.disabled = !isValid;
};

attendanceRadios.forEach(radio => {
  radio.addEventListener('change', updateFormState);
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