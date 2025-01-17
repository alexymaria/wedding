
import { collection, addDoc } from "firebase/firestore"; 

// Función para guardar los datos
async function save() {
    try {
      // Agregar un documento a la colección "nombre"
      const docRef = await addDoc(collection(db, "nombre"), {
        nombre: document.getElementById("firstName").value,
        apellido: document.getElementById("lastName").value,
        born: 1815 // Este es un dato fijo, cámbialo si necesitas algo dinámico
      });
  
      console.log("Document written with ID: ", docRef.id);
      alert("Datos enviados correctamente");
      document.getElementById("dataForm").reset(); // Limpia el formulario
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Hubo un error al enviar los datos. Inténtalo nuevamente.");
    }
  }