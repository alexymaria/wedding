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
  
    // Función para deshabilitar o habilitar campos
    const toggleField = (field, required, disable) => {
      field.required = required;
      field.disabled = disable;
      if (disable) field.value = ""; // Limpiar el campo si se deshabilita
    };
  
    // Evento cuando cambia la asistencia
    form.addEventListener("change", (event) => {
      if (attendanceNo.checked) {
        // Si el usuario pone "No"
        toggleField(email, false, true);
        toggleField(numGuests, false, true);
        toggleField(guestNames, false, true);
        toggleField(dietaryRestrictions, false, true);
  
        toggleField(firstName, true, false);
        toggleField(lastName, true, false);
      } else if (attendanceYes.checked) {
        // Si el usuario pone "Sí"
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
    });
  
    // Validación adicional al enviar el formulario
    form.addEventListener("submit", (event) => {
      if (!attendanceYes.checked && !attendanceNo.checked) {
        event.preventDefault();
        alert("Por favor, selecciona si contamos contigo o no.");
      }
    });
  });
  