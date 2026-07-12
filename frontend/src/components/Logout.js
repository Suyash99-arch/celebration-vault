import { navigate } from "../router/router.js";
import { showToast } from "./Toast.js";

export function logoutUser() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    showToast("Logged out successfully", "success");

    setTimeout(() => {

        navigate("login");

    }, 500);

}