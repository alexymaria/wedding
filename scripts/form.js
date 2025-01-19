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
          } else if (guests > 0) {
            toggleField(guestNames, true, false); // Obligatorio si hay acompañantes
          }
        });
      }
  
      // Validar el formulario en cada cambio
      validateForm();
    });
  
    // Validar al escribir en cualquier campo
    form.addEventListener("input", validateForm);
  
    // Validación final al intentar enviar el formulario
    form.addEventListener("submit", (event) => {
      validateForm();
  
      if (submitBtn.disabled) {
        event.preventDefault();
        alert("Por favor, completa todos los campos obligatorios antes de enviar.");
      }
    });
  });
  