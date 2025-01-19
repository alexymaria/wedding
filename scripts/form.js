document.addEventListener("DOMContentLoaded", () => {
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
  
    // Crear los asteriscos dinámicamente
    const createAsterisk = (label) => {
      const span = document.createElement("span");
      span.textContent = " *";
      span.style.color = "red";
      span.className = "asterisk";
      label.appendChild(span);
    };
  
    // Agregar asteriscos dinámicos a los labels
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
  
    // Función para mostrar/ocultar asteriscos
    const toggleAsterisk = (label, show) => {
      const asterisk = label.querySelector(".asterisk");
      if (asterisk) asterisk.style.display = show ? "inline" : "none";
    };
  
    // Función para deshabilitar/habilitar campos
    const toggleField = (field, required, disable) => {
      field.required = required;
      field.disabled = disable;
      if (disable) field.value = ""; // Limpiar el campo si se deshabilita
    };
  
    // Validar si el formulario está listo para enviar
    const validateForm = () => {
      let isValid = true;
  
      // Validación básica: ¿Contamos contigo?
      if (!attendanceYes.checked && !attendanceNo.checked) isValid = false;
  
      // Si asistencia es "Sí"
      if (attendanceYes.checked) {
        if (!firstName.value || !lastName.value || !email.value || numGuests.value === "") isValid = false;
  
        // Si hay acompañantes, nombres de acompañantes debe ser obligatorio
        const guests = parseInt(numGuests.value, 10) || 0;
        if (guests > 0 && !guestNames.value) isValid = false;
        if (!dietaryRestrictions.value) isValid = false;
      }
  
      // Si asistencia es "No"
      if (attendanceNo.checked) {
        if (!firstName.value || !lastName.value) isValid = false;
      }
  
      // Habilitar o deshabilitar el botón según el estado
      submitBtn.disabled = !isValid;
    };
  
    // Evento cuando cambia la asistencia
    form.addEventListener("change", () => {
      if (attendanceNo.checked) {
        toggleField(email, false, true);
        toggleField(numGuests, false, true);
        toggleField(guestNames, false, true);
        toggleField(dietaryRestrictions, false, true);
  
        toggleField(firstName, true, false);
        toggleField(lastName, true, false);
  
        toggleAsterisk(labels.email, false);
        toggleAsterisk(labels.numGuests, false);
        toggleAsterisk(labels.guestNames, false);
        toggleAsterisk(labels.dietaryRestrictions, false);
        toggleAsterisk(labels.firstName, true);
        toggleAsterisk(labels.lastName, true);
      } else if (attendanceYes.checked) {
        toggleField(email, true, false);
        toggleField(numGuests, true, false);
        toggleField(dietaryRestrictions, true, false);
  
        toggleField(firstName, true, false);
        toggleField(lastName, true, false);
  
        // Dependiendo del número de acompañantes
        numGuests.addEventListener("input", () => {
          const guests = parseInt(numGuests.value, 10) || 0;
  
          if (guests === 0) {
            toggleField(guestNames, false, true); // No obligatorio si 0 acompañantes
            toggleAsterisk(labels.guestNames, false);
          } else if (guests > 0) {
            toggleField(guestNames, true, false); // Obligatorio si hay acompañantes
            toggleAsterisk(labels.guestNames, true);
          }
        });
  
        toggleAsterisk(labels.email, true);
        toggleAsterisk(labels.numGuests, true);
        toggleAsterisk(labels.dietaryRestrictions, true);
        toggleAsterisk(labels.firstName, true);
        toggleAsterisk(labels.lastName, true);
      }
  
      // Validar el formulario en cada cambio
      validateForm();
    });
  
    // Validar al escribir en cualquier campo
    form.addEventListener("input", validateForm);
  
    // Validación final y envío del formulario
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Evitar que recargue la página
  
      if (submitBtn.disabled) {
        alert("Por favor, completa todos los campos obligatorios antes de enviar.");
        return;
      }
  
      // Enviar datos a Firebase
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
  
        // Ocultar el formulario y mostrar el mensaje de agradecimiento
        form.style.display = "none";
        document.getElementById("thankYouMessage").style.display = "block";
      } catch (error) {
        console.error("Error al enviar los datos a Firebase:", error);
        alert("Hubo un error al enviar los datos. Por favor, inténtalo nuevamente.");
      }
    });
  });
  