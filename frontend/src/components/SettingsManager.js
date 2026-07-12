import api from "../api/api.js";

export async function loadSettings() {

    /* ==========================================
       LOAD COUNTS
    ========================================== */

    try {

        const response = await api.get("/birthdays");

        const birthdays = response.data.birthdays || [];

        const anniversaries =
            birthdays.filter(person => person.anniversary);

        const member =
            document.getElementById("settingMembers");

        const birthday =
            document.getElementById("settingBirthdays");

        const anniversary =
            document.getElementById("settingAnniversaries");

        if (member) {

            member.textContent = birthdays.length;

        }

        if (birthday) {

            birthday.textContent = birthdays.length;

        }

        if (anniversary) {

            anniversary.textContent = anniversaries.length;

        }

    }

    catch (error) {

        console.error("Settings:", error);

    }

    /* ==========================================
       THEME
    ========================================== */

    const themeBtn =
        document.getElementById("themeToggle");

    if (themeBtn) {

        if (document.body.classList.contains("dark")) {

            themeBtn.innerHTML =
                "☀️ Switch to Light";

        }
        else {

            themeBtn.innerHTML =
                "🌙 Switch to Dark";

        }

        themeBtn.onclick = () => {

            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {

                localStorage.setItem(
                    "theme",
                    "dark"
                );

                themeBtn.innerHTML =
                    "☀️ Switch to Light";

            }

            else {

                localStorage.setItem(
                    "theme",
                    "light"
                );

                themeBtn.innerHTML =
                    "🌙 Switch to Dark";

            }

        };

    }

}