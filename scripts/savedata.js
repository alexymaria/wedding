
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "/firebase.js"; // Importa `db` desde `firebase.js`
// Función para guardar los datos
async function save() {
    try {
            // Obtén los datos del formulario
    const nombre = document.getElementById("firstName").value;
    const apellido = document.getElementById("lastName").value;
      // Agregar un documento a la colección "nombre"
      const docRef = await addDoc(collection(db, "nombre"), {
        nombre: nombre,
        apellido: apellido,
      });
  
      console.log("Document written with ID: ", docRef.id);
      alert("Datos enviados correctamente");
      document.getElementById("dataForm").reset(); // Limpia el formulario
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Hubo un error al enviar los datos. Inténtalo nuevamente.");
    }
  }
  // Exporta la función para usarla en otros módulos
export { save };

// Añade el evento al botón (opcional)
document.querySelector(".btn").addEventListener("click", save);