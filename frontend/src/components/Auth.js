import { navigate } from "../router/router.js";

export function initAuthNavigation() {

    const goRegister = document.getElementById("goRegister");

    if (goRegister) {

        goRegister.addEventListener("click", (e) => {

            e.preventDefault();

            navigate("register");

        });

    }

    const goLogin = document.getElementById("goLogin");

    if (goLogin) {

        goLogin.addEventListener("click", (e) => {

            e.preventDefault();

            navigate("login");

        });

    }

}