  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  import { collection, addDoc } from "firebase/firestore"; 
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
const db = getFirestore(app);
// Exportar la instancia de Firestore
export { db };