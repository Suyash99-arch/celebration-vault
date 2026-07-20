import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function showToast(message, type = "success") {
  const colors = {
    success: "#16a34a",
    error: "#dc2626",
    warning: "#f59e0b",
    info: "#2563eb",
  };

  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    close: true,
    stopOnFocus: true,
    style: {
      background: colors[type] || colors.success,
      borderRadius: "10px",
      fontWeight: "600",
    },
  }).showToast();
}
