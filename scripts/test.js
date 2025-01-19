
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Configuración de Firebase
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

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase inicializado correctamente.");

// Manejo del evento click
document.getElementById('dataForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
  
    console.log('El formulario ha sido enviado.');
  
    const form = event.target;
    const formData = new FormData(form);
  
    // Extraer valores del formulario
    const attendance = formData.get('attendance');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const numGuests = parseInt(formData.get('numGuests')) || 0; // Valor predeterminado si no se llena
    const guestNames = formData.get('guestNames');
    const dietaryRestrictions = formData.get('dietaryRestrictions');
  
    try {
      // Guardar datos en Firestore
      await addDoc(collection(db, 'formResponses'), {
        attendance,
        firstName,
        lastName,
        email,
        numGuests,
        guestNames,
        dietaryRestrictions,
        timestamp: serverTimestamp(),
      });
  
      console.log('Datos enviados a Firestore correctamente.');
      alert('¡Formulario enviado exitosamente!');
      form.reset();
    } catch (error) {
      console.error('Error al enviar a Firestore:', error);
      alert('Hubo un error al enviar el formulario. Inténtalo de nuevo.');
    }
  });

  const form = document.getElementById('dataForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('input', () => {
  const isValid = form.checkValidity();
  submitBtn.disabled = !isValid; // Habilitar/deshabilitar botón
});

  
