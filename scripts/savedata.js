// savedata.js
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "firebase.js";

// Función para guardar los datos (definida fuera de cualquier evento)
async function save() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const born = document.getElementById("born").value; // Asume que tienes un input con id "born"

    // Validación básica
    if (!firstName || !lastName) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "users"), {
            nombre: firstName,
            apellido: lastName,
            born: born
        });
        console.log("Document written with ID: ", docRef.id);
        alert("Datos guardados correctamente.");
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Ha ocurrido un error al guardar los datos. Por favor, inténtalo de nuevo más tarde.");
    }
}
