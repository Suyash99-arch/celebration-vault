import api from "../api/api.js";
import { showToast } from "./Toast.js";
import { navigate } from "../router/router.js";

export async function registerUser() {

    const name = document.getElementById("registerName").value.trim();

    const email = document.getElementById("registerEmail").value.trim();

    const password = document.getElementById("registerPassword").value;

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

            showToast(

                "Account created successfully!",

                "success"

            );

            setTimeout(() => {

                navigate("login");

            }, 1000);

        }

    }

    catch (error) {

        showToast(

            error.response?.data?.message ||

            "Registration failed",

            "error"

        );

    }

}