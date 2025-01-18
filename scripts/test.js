// Configuración de Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log('El script de JavaScript se está ejecutando.');
window.addEventListener('DOMContentLoaded', () => {
    console.log('La página ha cargado completamente.');
  
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      console.log('Botón encontrado:', submitBtn);
  
      submitBtn.addEventListener('click', () => {
        console.log('El botón Enviar ha sido clickeado.');
      });
    } else {
      console.error('No se encontró el botón con el ID "submitBtn".');
    }
  });
  

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

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Manejar el envío del formulario
document.getElementById('submitBtn').addEventListener('click', async () => {
  console.log('El botón Enviar ha sido clickeado.');
  const form = document.getElementById('dataForm');
  const formData = new FormData(form);

  // Extraer valores del formulario
  const attendance = formData.get('attendance');
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const numGuests = parseInt(formData.get('numGuests'));
  const guestNames = formData.get('guestNames');
  const dietaryRestrictions = formData.get('dietaryRestrictions');
// Mostrar los valores en consola
console.log({
    attendance,
    firstName,
    lastName,
    email,
    numGuests,
    guestNames,
    dietaryRestrictions
});
  try {
    // Guardar datos en Firestore
    await db.collection('formResponses').add({
      attendance,
      firstName,
      lastName,
      email,
      numGuests,
      guestNames,
      dietaryRestrictions,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert('¡Formulario enviado exitosamente!');
    form.reset();
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    alert('Hubo un error al enviar el formulario. Inténtalo de nuevo.');
  }
});
