import api from "../api/api.js";
import { showToast } from "./Toast.js";
import { loadProfile } from "./ProfileView.js";

export function openEditProfile(person) {

    const existingModal = document.getElementById("editModal");

    if (existingModal) {

        existingModal.remove();

    }

    document.body.insertAdjacentHTML("beforeend", `

<div class="modal-overlay" id="editModal">

    <div class="modal-card pop">

        <h2>✏️ Edit Profile</h2>

        <div class="modal-grid">

            <div class="input-group">

                <label>Full Name</label>

                <input
                    id="editName"
                    type="text"
                    value="${person.name || ""}">

            </div>

            <div class="input-group">

                <label>Date of Birth</label>

                <input
                    id="editDob"
                    type="date"
                    value="${person.dob || ""}">

            </div>

            <div class="input-group">

                <label>Relationship</label>

                <input
                    id="editRelationship"
                    type="text"
                    value="${person.relationship || ""}">

            </div>

            <div class="input-group">

                <label>Phone</label>

                <input
                    id="editPhone"
                    type="text"
                    value="${person.phone || ""}">

            </div>

            <div class="input-group">

                <label>Email</label>

                <input
                    id="editEmail"
                    type="email"
                    value="${person.email || ""}">

            </div>

            <div class="input-group">

                <label>Favourite Colour</label>

                <input
                    id="editColor"
                    type="text"
                    value="${person.favorite_color || ""}">

            </div>

            <div class="input-group full-width">

                <label>Favourite Gift</label>

                <input
                    id="editGift"
                    type="text"
                    value="${person.favorite_gift || ""}">

            </div>

            <div class="input-group full-width">

                <label>Notes</label>

                <textarea
                    id="editNotes"
                    rows="5">${person.notes || ""}</textarea>

            </div>

        </div>

        <div class="modal-actions">

            <button
                id="cancelEdit"
                class="secondary-btn">

                Cancel

            </button>

            <button
                id="saveEdit"
                class="hero-btn">

                💾 Save Changes

            </button>

        </div>

    </div>

</div>

`);

    const modal = document.getElementById("editModal");

    const closeModal = () => {

        const modalElement = document.getElementById("editModal");

        if (modalElement) {

            modalElement.remove();

        }

        document.removeEventListener("keydown", escListener);

    };

    function escListener(e) {

        if (e.key === "Escape") {

            closeModal();

        }

    }

    document.addEventListener("keydown", escListener);

    document
        .getElementById("cancelEdit")
        .addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {

        if (e.target === modal) {

            closeModal();

        }

    });

    const saveBtn = document.getElementById("saveEdit");

    saveBtn.addEventListener("click", async () => {

        const payload = {

            name: document.getElementById("editName").value.trim(),

            dob: document.getElementById("editDob").value,

            relationship: document.getElementById("editRelationship").value.trim(),

            phone: document.getElementById("editPhone").value.trim(),

            email: document.getElementById("editEmail").value.trim(),

            favorite_color: document.getElementById("editColor").value.trim(),

            favorite_gift: document.getElementById("editGift").value.trim(),

            notes: document.getElementById("editNotes").value.trim()

        };

        saveBtn.disabled = true;

        saveBtn.innerHTML = "⏳ Saving...";

        try {

            const response = await api.put(

                `/update/${person.id}`,

                payload

            );

            showToast(

                response.data.message || "Profile updated successfully.",

                "success"

            );

            closeModal();

            loadProfile(person.id);

        }

        catch (error) {

            console.error(error);

            showToast(

                "Unable to update profile.",

                "error"

            );

            saveBtn.disabled = false;

            saveBtn.innerHTML = "💾 Save Changes";

        }

    });

}