import api from "../api/api.js";
import { showToast } from "./Toast.js";
import { navigate } from "../router/router.js";

export async function loginUser() {

    const email = document.getElementById("loginEmail").value.trim();

    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {

        showToast("Please enter email and password", "error");

        return;

    }

    try {

        const response = await api.post("/login", {

            email,

            password

        });

        const data = response.data;

        // Save login information
        localStorage.setItem("token", data.token);

        localStorage.setItem(

            "user",

            JSON.stringify(data.user)

        );

        showToast(

            "Welcome " + data.user.name + "!",

            "success"

        );

        setTimeout(() => {

            navigate("dashboard");

        }, 800);

    }

    catch (error) {

        showToast(

            error.response?.data?.message ||

            "Login failed",

            "error"

        );

    }

}