
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "/firebase.js"; // Importa `db` desde `firebase.js`
// Función para guardar los datos
// Función para guardar los datos
function save(){
    import { collection, addDoc } from "firebase/firestore"; 

    try {
    const docRef = await addDoc(collection(db, "nombre"), {
        nombre: document.getElementById("firstName").value,
        apellido: document.getElementById("lastName").value,
        born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}