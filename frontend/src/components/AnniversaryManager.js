import api from "../api/api.js";
import { showToast } from "./Toast.js";
import { navigate } from "../router/router.js";



/* ==========================================================
   INITIALIZE
========================================================== */

export function initializeAnniversary() {

    const saveButton = document.getElementById(
        "saveAnniversaryBtn"
    );

    if (saveButton) {

        saveButton.onclick = saveAnniversary;

    }

    loadAnniversaries();

    loadTodayAnniversary();

}


/* ==========================================
        FORMAT DATE
========================================== */

function formatDate(date){

    if(!date) return "";

    return new Date(date).toLocaleDateString(

        "en-IN",

        {

            day:"numeric",

            month:"long",

            year:"numeric"

        }

    );

}

/* ==========================================
        ANNIVERSARY CARD
========================================== */

function anniversaryCard(item){

    return `

<div class="birthday-card anniversary-card">

    <div class="birthday-top">

        <div class="avatar-circle">

            💍

        </div>

        <div class="birthday-info">

            <h3>

                ${item.person1}

            </h3>

            <p>

                ❤️ ${item.person2}

            </p>

        </div>

    </div>

    <div class="birthday-middle">

        <div>

            <small>Date</small>

            <strong>

                ${formatDate(item.date)}

            </strong>

        </div>

        <div>

            <small>Relationship</small>

            <strong>

                ${item.relationship || "-"}

            </strong>

        </div>

    </div>

    <div class="birthday-footer">

    <button
        class="secondary-btn anniversary-edit"
        data-id="${item.id}"
    >
        ✏ Edit
    </button>

    <button
        class="secondary-btn anniversary-delete"
        data-id="${item.id}"
    >
        🗑 Delete
    </button>

</div>

</div>

`;

}

/* ==========================================
        SAVE ANNIVERSARY
========================================== */

export async function saveAnniversary(){

    const person1 =
        document.getElementById("person1").value.trim();

    const person2 =
        document.getElementById("person2").value.trim();

    const date =
        document.getElementById("anniversaryDate").value;

    const relationship =
        document.getElementById("relationship").value;

    const notes =
        document.getElementById("notes").value.trim();

    const important =
        document.getElementById("important").checked;

    if(

        !person1 ||

        !person2 ||

        !date

    ){

        showToast(

            "Please fill all required fields.",

            "error"

        );

        return;

    }

    if(

        person1.toLowerCase()===

        person2.toLowerCase()

    ){

        showToast(

            "Both names cannot be the same.",

            "error"

        );

        return;

    }

    try{

        const response = await api.post(

    "/save-anniversary",

    {

        id: window.currentAnniversaryId || null,

        person1,

        person2,

        date,

        relationship,

        notes,

        important

    }

);

        showToast(

            response.data.message ||

            "Anniversary saved successfully.",

            "success"

        );

        window.currentAnniversaryId = null;

       window.currentAnniversaryId = null;

loadAnniversaries();

loadTodayAnniversary();

document.getElementById("person1").value = "";
document.getElementById("person2").value = "";
document.getElementById("anniversaryDate").value = "";
document.getElementById("relationship").value = "Marriage";
document.getElementById("notes").value = "";
document.getElementById("important").checked = false;

showToast(
    response.data.message ||
    "Anniversary saved successfully.",
    "success"
);

    }

    catch(error){

        console.error(error);

        showToast(

            error.response?.data?.message ||

            "Unable to save anniversary.",

            "error"

        );

    }

}

/* ==========================================
        LOAD ANNIVERSARIES
========================================== */

export async function loadAnniversaries(){

    const container = document.getElementById("anniversaryList");

    if(!container) return;

    try{

        const response = await api.get("/anniversaries");

        const anniversaries = response.data.anniversaries || [];

        anniversaries.sort((a,b)=>{

            return a.days_left_number - b.days_left_number;

        });

        if(anniversaries.length===0){

            container.innerHTML = `

<div class="empty-card">

    💍

    <br><br>

    No anniversaries saved yet.

</div>

`;

            return;

        }

        container.innerHTML = anniversaries
    .map(item => anniversaryCard(item))
    .join("");

// =============================
// EDIT BUTTONS
// =============================

container
    .querySelectorAll(".anniversary-edit")
    .forEach(button => {

        button.onclick = () => {

            editAnniversary(
                button.dataset.id
            );

        };

    });

// =============================
// DELETE BUTTONS
// =============================

container
    .querySelectorAll(".anniversary-delete")
    .forEach(button => {

        button.onclick = () => {

            deleteAnniversary(
                button.dataset.id
            );

        };

    });

    }

    catch(error){

        console.error(error);

        container.innerHTML = `

<div class="empty-card">

    ⚠️

    <br><br>

    Unable to load anniversaries.

</div>

`;

    }

}
/* ==========================================
        DELETE ANNIVERSARY
========================================== */

export async function deleteAnniversary(id){

    const confirmDelete = confirm(

        "Delete this anniversary?"

    );

    if(!confirmDelete){

        return;

    }

    try{

        const response = await api.delete(

            `/delete-anniversary/${id}`

        );

        showToast(

            response.data.message ||

            "Anniversary deleted.",

            "success"

        );

        loadAnniversaries();

    }

    catch(error){

        console.error(error);

        showToast(

            error.response?.data?.message ||

            "Unable to delete anniversary.",

            "error"

        );

    }

}
/* ==========================================
        EDIT ANNIVERSARY
========================================== */

export async function editAnniversary(id){

    try{

        const response = await api.get(

            `/anniversary/${id}`

        );

        const item = response.data.anniversary;

        document.getElementById("person1").value =
            item.person1;

        document.getElementById("person2").value =
            item.person2;

        document.getElementById("anniversaryDate").value =
            item.date;

        document.getElementById("relationship").value =
            item.relationship || "";

        document.getElementById("notes").value =
            item.notes || "";

        document.getElementById("important").checked =
            Boolean(item.important);

        window.currentAnniversaryId = id;

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

    catch(error){

        console.error(error);

        showToast(

            "Unable to load anniversary.",

            "error"

        );

    }

}
/* ==========================================================
   TODAY ANNIVERSARY
========================================================== */

async function loadTodayAnniversary() {

    const container = document.getElementById(
        "todayAnniversaryCard"
    );

    if (!container) return;

    try {

        const response = await api.get(
            "/anniversaries"
        );

        const anniversaries =
            response.data.anniversaries || [];

        const today = anniversaries.filter(

            item => item.today === true

        );

        if (today.length === 0) {

            container.innerHTML = `

<div class="empty-card">

    💍

    <br><br>

    No anniversary today.

</div>

`;

            return;

        }

        container.innerHTML =

            today

            .map(anniversaryCard)

            .join("");

    }

    catch (error) {

        console.error(error);

        container.innerHTML = `

<div class="empty-card">

Unable to load today's anniversaries.

</div>

`;

    }

}