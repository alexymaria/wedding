
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "/firebase.js"; // Importa `db` desde `firebase.js`
// Función para guardar los datos
// Función para guardar los datos
export async function save() {
    try {
      const nombre = document.getElementById("firstName").value;
      const apellido = document.getElementById("lastName").value;
  
      const docRef = await addDoc(collection(db, "nombre"), {
        nombre: nombre,
        apellido: apellido
      });
  
      console.log("Document written with ID: ", docRef.id);
      alert("Datos enviados correctamente");
      document.getElementById("dataForm").reset();
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Hubo un error al enviar los datos.");
    }
  }