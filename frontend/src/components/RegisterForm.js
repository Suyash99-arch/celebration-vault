import api from "../api/api.js";
import { showToast } from "./Toast.js";
import { navigate } from "../router/router.js";

const getValue = (id) => document.getElementById(id)?.value.trim() || "";

export async function registerUser() {
    const name = getValue("registerName");
    const email = getValue("registerEmail");
    const password = document.getElementById("registerPassword")?.value || "";

    if (!name || !email || !password) {
        showToast("Please fill all fields", "error");
        return;
    }

    try {
        const response = await api.post("/register", {
            name,
            email,
            password
        });

        if (response.data.success) {
            const { token, user } = response.data;

            if (token && user) {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                showToast("Account created successfully!", "success");
                setTimeout(() => navigate("dashboard"), 800);
                return;
            }

            showToast("Account created successfully! Please login.", "success");
            setTimeout(() => navigate("login"), 1000);
        }
    } catch (error) {
        showToast(
            error.response?.data?.message ||
            "Registration failed",
            "error"
        );
    }
}

export function initializeRegister() {

    const registerButton = document.getElementById("registerBtn");
    const passwordInput = document.getElementById("registerPassword");

    if (registerButton) {
        registerButton.addEventListener("click", registerUser);
    }

    if (passwordInput) {
        passwordInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                registerUser();
            }
        });
    }

}
