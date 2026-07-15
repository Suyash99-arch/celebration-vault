import api from "../api/api.js";
import { showToast } from "./Toast.js";

export async function loadSettings() {

    /* ==========================================
       LOAD COUNTS
    ========================================== */

    try {

        const response = await api.get("/birthdays");

        const birthdays = response.data.birthdays || [];

        const anniversaries =
            // birthdays list contains anniversary fields as `anniversary_date`/`anniversary_type`
            birthdays.filter(person => person.anniversary_date && person.anniversary_date.trim());

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

    initializeTheme();
    initializeNotifications();
    initializeDataControls();
    initializeSettingsActions();

}

function setTheme(theme) {
    const themeBtn = document.getElementById("themeToggle");

    if (!themeBtn) {
        return;
    }

    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);

    themeBtn.innerHTML =
        theme === "dark"
            ? "☀️ Switch to Light"
            : "🌙 Switch to Dark";
}

function initializeTheme() {
    const themeBtn = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme") || "light";

    setTheme(savedTheme === "dark" ? "dark" : "light");

    if (themeBtn) {
        themeBtn.onclick = () => {
            const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
            setTheme(nextTheme);
            showToast(`Theme updated to ${nextTheme}.`, "success");
        };
    }
}

function initializeNotifications() {
    const notificationsCheckbox =
        document.getElementById("notificationsToggle");

    if (!notificationsCheckbox) {
        return;
    }

    const savedNotifications = localStorage.getItem("notificationsEnabled");
    const enabled = savedNotifications === null ? true : savedNotifications === "true";

    notificationsCheckbox.checked = enabled;

    notificationsCheckbox.addEventListener("change", () => {
        localStorage.setItem("notificationsEnabled", String(notificationsCheckbox.checked));
        showToast(`Notifications ${notificationsCheckbox.checked ? "enabled" : "disabled"}.`, "success");
    });
}

function initializeDataControls() {
    const exportButton = document.getElementById("exportData");
    const importButton = document.getElementById("importData");
    const importFile = document.getElementById("importFile");
    const clearButton = document.getElementById("clearData");

    exportButton?.addEventListener("click", async () => {
        try {
            const response = await api.get("/export", {
                responseType: "blob"
            });

            const blob = new Blob([response.data], { type: "application/octet-stream" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "birthday_vault.db";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            showToast("Backup exported successfully.", "success");
        } catch (error) {
            console.error("Export failed:", error);
            showToast("Unable to export database.", "error");
        }
    });

    importButton?.addEventListener("click", () => {
        importFile?.click();
    });

    importFile?.addEventListener("change", async (event) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("database", file);

        try {
            // Let the browser set the multipart Content-Type (with boundary).
            const response = await api.post("/import", formData);

            if (response.data.success) {
                showToast("Backup imported successfully. Reloading...", "success");
                setTimeout(() => {
                    window.location.reload();
                }, 700);
            } else {
                showToast(response.data.message || "Import failed.", "error");
            }
        } catch (error) {
            console.error("Import failed:", error);
            showToast("Unable to import database.", "error");
        }
    });

    clearButton?.addEventListener("click", async () => {
        if (!window.confirm("Clear all data from your profile? This action cannot be undone.")) {
            return;
        }

        try {
            const response = await api.delete("/clear");
            if (response.data.success) {
                showToast("All data has been cleared.", "success");
                setTimeout(() => {
                    window.location.reload();
                }, 700);
            } else {
                showToast(response.data.message || "Unable to clear data.", "error");
            }
        } catch (error) {
            console.error("Clear data failed:", error);
            showToast("Unable to clear data.", "error");
        }
    });
}

function initializeSettingsActions() {
    const saveButton = document.getElementById("saveSettings");
    const cancelButton = document.getElementById("cancelSettings");

    saveButton?.addEventListener("click", () => {
        const theme = document.body.classList.contains("dark") ? "dark" : "light";
        const notificationsEnabled = document.getElementById("notificationsToggle")?.checked;

        localStorage.setItem("theme", theme);
        localStorage.setItem("notificationsEnabled", String(notificationsEnabled));

        showToast("Settings saved.", "success");
    });

    cancelButton?.addEventListener("click", () => {
        const savedTheme = localStorage.getItem("theme") || "light";
        const savedNotifications = localStorage.getItem("notificationsEnabled");
        const notificationsEnabled = savedNotifications === null ? true : savedNotifications === "true";

        setTheme(savedTheme === "dark" ? "dark" : "light");
        const notificationsCheckbox = document.getElementById("notificationsToggle");
        if (notificationsCheckbox) {
            notificationsCheckbox.checked = notificationsEnabled;
        }

        showToast("Canceled changes.", "success");
    });
}
