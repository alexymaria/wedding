
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