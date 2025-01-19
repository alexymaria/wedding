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

const attendanceRadios = document.getElementsByName('attendance');
const numGuestsInput = document.getElementById('numGuests');
const guestNamesInput = document.getElementById('guestNames');
const emailInput = document.getElementById('email');
const dietaryRestrictionsInput = document.getElementById('dietaryRestrictions');

const updateFormState = () => {
  const attendance = [...attendanceRadios].find(radio => radio.checked)?.value;

  if (attendance === 'No') {
    emailInput.disabled = true;
    emailInput.value = '';
    numGuestsInput.disabled = true;
    numGuestsInput.value = '';
    guestNamesInput.disabled = true;
    guestNamesInput.value = '';
    dietaryRestrictionsInput.disabled = true;
    dietaryRestrictionsInput.value = '';
  } else if (attendance === 'Sí') {
    emailInput.disabled = false;
    numGuestsInput.disabled = false;
    dietaryRestrictionsInput.disabled = false;

    if (parseInt(numGuestsInput.value) > 0) {
      guestNamesInput.disabled = false;
    } else {
      guestNamesInput.disabled = true;
      guestNamesInput.value = '';
    }
  }
};

attendanceRadios.forEach(radio => {
  radio.addEventListener('change', updateFormState);
});

numGuestsInput.addEventListener('input', () => {
  if (parseInt(numGuestsInput.value) > 0) {
    guestNamesInput.disabled = false;
  } else {
    guestNamesInput.disabled = true;
    guestNamesInput.value = '';
  }
});

document.getElementById('submitBtn').addEventListener('click', async (event) => {
  event.preventDefault();

  const attendance = [...attendanceRadios].find(radio => radio.checked)?.value;
  if (!attendance) {
    alert('Por favor selecciona una opción en "¿Contamos contigo?".');
    return;
  }

  const form = document.getElementById('dataForm');
  const formData = new FormData(form);

  const data = {
    attendance,
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