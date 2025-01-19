document.addEventListener("DOMContentLoaded", () => {
    // Elementos del formulario
    const attendanceYes = document.getElementById("attendanceYes");
    const attendanceNo = document.getElementById("attendanceNo");
    const numGuests = document.getElementById("numGuests");
    const guestNames = document.getElementById("guestNames");
    const dietaryRestrictions = document.getElementById("dietaryRestrictions");
    const email = document.getElementById("email");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const form = document.getElementById("dataForm");
    const submitBtn = document.getElementById("submitBtn");
  
    // Crear mensaje de agradecimiento
    const thankYouMessage = document.createElement("div");
    thankYouMessage.id = "thankYouMessage";
    thankYouMessage.style.display = "none";
    thankYouMessage.style.textAlign = "center";
    thankYouMessage.innerHTML = `
      <h2>¡Gracias por responder!</h2>
      <p>Tu respuesta ha sido registrada exitosamente.</p>
      <img src="public/images/thanks.jpeg" alt="Gracias" style="margin-top: 20px;">
    `;
    document.body.appendChild(thankYouMessage);
  
    // Crear asteriscos dinámicos
    const createAsterisk = (label) => {
      const span = document.createElement("span");
      span.textContent = " *";
      span.style.color = "red";
      span.className = "asterisk";
      label.appendChild(span);
    };
  
    const labels = {
      attendance: document.querySelector('label[for="attendanceYes"]').parentElement,
      firstName: document.querySelector('label[for="firstName"]'),
      lastName: document.querySelector('label[for="lastName"]'),
      email: document.querySelector('label[for="email"]'),
      numGuests: document.querySelector('label[for="numGuests"]'),
      guestNames: document.querySelector('label[for="guestNames"]'),
      dietaryRestrictions: document.querySelector('label[for="dietaryRestrictions"]'),
    };
  
    Object.values(labels).forEach(createAsterisk);
  
    const toggleAsterisk = (label, show) => {
      const asterisk = label.querySelector(".asterisk");
      if (asterisk) asterisk.style.display = show ? "inline" : "none";
    };
  
    const toggleField = (field, required, disable) => {
      field.required = required;
      field.disabled = disable;
      if (disable) field.value = ""; // Limpiar el campo si se deshabilita
    };
  
    const validateForm = () => {
      let isValid = true;
  
      if (!attendanceYes.checked && !attendanceNo.checked) isValid = false;
  
      if (attendanceYes.checked) {
        if (!firstName.value || !lastName.value || !email.value || numGuests.value === "") isValid = false;
  
        const guests = parseInt(numGuests.value, 10) || 0;
        if (guests > 0 && !guestNames.value) isValid = false;
        if (!dietaryRestrictions.value) isValid = false;
      }
  
      if (attendanceNo.checked) {
        if (!firstName.value || !lastName.value) isValid = false;
      }
  
      submitBtn.disabled = !isValid;
    };
  
    const alertMissingFields = () => {
      if (!attendanceYes.checked && !attendanceNo.checked) {
        alert("Por favor, selecciona si contamos contigo.");
        return;
      }
  
      if (!firstName.value || !lastName.value) {
        alert("Por favor, completa los campos de Nombre y Apellido.");
        return;
      }
  
      if (attendanceYes.checked) {
        if (!email.value) {
          alert("Por favor, completa el campo de Email.");
          return;
        }
  
        const guests = parseInt(numGuests.value, 10) || 0;
        if (numGuests.value === "") {
          alert("Por favor, indica el número de acompañantes.");
          return;
        }
  
        if (guests > 0 && !guestNames.value) {
          alert("Por favor, completa el campo de Nombre y apellidos de los acompañantes.");
          return;
        }
  
        if (!dietaryRestrictions.value) {
          alert("Por favor, completa el campo de Restricciones alimentarias.");
          return;
        }
      }
    };
  
    form.addEventListener("change", () => {
      if (attendanceNo.checked) {
        toggleField(email, false, true);
        toggleField(numGuests, false, true);
        toggleField(guestNames, false, true);
        toggleField(dietaryRestrictions, false, true);
  
        toggleAsterisk(labels.email, false);
        toggleAsterisk(labels.numGuests, false);
        toggleAsterisk(labels.guestNames, false);
        toggleAsterisk(labels.dietaryRestrictions, false);
      } else if (attendanceYes.checked) {
        toggleField(email, true, false);
        toggleField(numGuests, true, false);
        toggleField(dietaryRestrictions, true, false);
  
        const guests = parseInt(numGuests.value, 10) || 0;
        toggleField(guestNames, guests > 0, guests === 0);
  
        toggleAsterisk(labels.email, true);
        toggleAsterisk(labels.numGuests, true);
        toggleAsterisk(labels.guestNames, guests > 0);
        toggleAsterisk(labels.dietaryRestrictions, true);
      }
  
      validateForm();
    });
  
    form.addEventListener("input", validateForm);
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (submitBtn.disabled) {
        alertMissingFields();
        return;
      }
  
      const formData = {
        attendance: attendanceYes.checked ? "Sí" : "No",
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value || null,
        numGuests: numGuests.value || null,
        guestNames: guestNames.value || null,
        dietaryRestrictions: dietaryRestrictions.value || null,
      };
  
      try {
        const db = firebase.firestore();
        await db.collection("responses").add(formData);
  
        form.style.display = "none";
        thankYouMessage.style.display = "block";
      } catch (error) {
        console.error("Error al enviar los datos a Firebase:", error);
        alert("Hubo un error al enviar los datos. Por favor, inténtalo nuevamente.");
      }
    });
  });
  