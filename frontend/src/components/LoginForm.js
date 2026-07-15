import api from "../api/api.js";
import { showToast } from "./Toast.js";
import { navigate } from "../router/router.js";

const getValue = (id) => document.getElementById(id)?.value.trim() || "";

export async function loginUser() {
    const email = getValue("loginEmail");
    const password = document.getElementById("loginPassword")?.value || "";

    if (!email || !password) {
        showToast("Please enter email and password", "error");
        return;
    }

    try {
        const response = await api.post("/login", {
            email,
            password
        });

        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        showToast(`Welcome ${user.name}!`, "success");

        setTimeout(() => navigate("dashboard"), 800);
    } catch (error) {
        showToast(
            error.response?.data?.message ||
            "Login failed",
            "error"
        );
    }
}

export function initializeLogin() {

    const loginButton = document.getElementById("loginBtn");
    const passwordInput = document.getElementById("loginPassword");

    if (loginButton) {
        loginButton.addEventListener("click", loginUser);
    }

    if (passwordInput) {
        passwordInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                loginUser();
            }
        });
    }

}
