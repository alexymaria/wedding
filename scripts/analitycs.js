
import { logEvent } from "firebase/analytics";


document.getElementById("goToFormButton").addEventListener("click", () => {
  logEvent(analytics, "confirm_attendance", {
    content_type: "button",
    method: "RSVP",
  });
});
