/* ==========================================================
   DASHBOARD MANAGER
========================================================== */

import api from "../api/api.js";

/* ==========================================================
   LOAD DASHBOARD
========================================================== */

export async function loadDashboard() {

    try {

        const [

            birthdayResponse,

            anniversaryResponse

        ] = await Promise.all([

            api.get("/birthdays"),

            api.get("/anniversaries")

        ]);

        const birthdays =
            birthdayResponse.data.birthdays || [];

        const anniversaries =
            anniversaryResponse.data.anniversaries || [];

        updateStatistics(

            birthdays,

            anniversaries

        );

        renderTodaysBirthdays(

            birthdays

        );

        renderTodaysAnniversaries(

            anniversaries

        );

        renderRecentMembers(

            birthdays

        );

    }

    catch(error){

        console.error(error);

    }

}

/* ==========================================================
   STATISTICS
========================================================== */

function updateStatistics(

    birthdays,

    anniversaries

){

    const currentMonth =
        new Date().getMonth();

    const family =
        birthdays.filter(person=>{

            return (

                (person.relationship || "")

                .toLowerCase() !== "friend"

            );

        });

    const friends =
        birthdays.filter(person=>{

            return (

                (person.relationship || "")

                .toLowerCase() === "friend"

            );

        });

    const monthBirthdays =
        birthdays.filter(person=>{

            return (

                new Date(person.dob)

                .getMonth()

                === currentMonth

            );

        });

    const monthAnniversaries =
        anniversaries.filter(item=>{

            return (

                new Date(item.date)

                .getMonth()

                === currentMonth

            );

        });

    setValue(

        "familyCount",

        family.length

    );

    setValue(

        "friendCount",

        friends.length

    );

    setValue(

        "birthdayMonthCount",

        monthBirthdays.length

    );

    setValue(

        "anniversaryMonthCount",

        monthAnniversaries.length

    );

}

/* ==========================================================
   TODAY BIRTHDAYS
========================================================== */

function renderTodaysBirthdays(

    birthdays

){

    const container =
        document.getElementById(

            "todayBirthdays"

        );

    if(!container) return;

    const today =
        birthdays.filter(

            person=>person.today

        );

    if(today.length===0){

        container.innerHTML=`

<div class="empty-card">

    🎂

    <h3>

        No Birthdays Today

    </h3>

    <p>

        Nobody is celebrating today.

    </p>

</div>

`;

        return;

    }

    container.innerHTML =

        today.map(person=>`

<div class="mini-member-card">

    <div class="mini-avatar">

        ${person.name.charAt(0).toUpperCase()}

    </div>

    <div>

        <h4>

            ${person.name}

        </h4>

        <p>

            ${person.relationship || "Family"}

        </p>

    </div>

    <span class="today-chip">

        🎉 Today

    </span>

</div>

`).join("");

}

/* ==========================================================
   TODAY ANNIVERSARIES
========================================================== */

function renderTodaysAnniversaries(

    anniversaries

){

    const container =
        document.getElementById(

            "todayAnniversaries"

        );

    if(!container) return;

    const today =
        new Date();

    const list =
        anniversaries.filter(item=>{

            const date =
                new Date(item.date);

            return (

                date.getDate()===today.getDate()

                &&

                date.getMonth()===today.getMonth()

            );

        });

    if(list.length===0){

        container.innerHTML=`

<div class="empty-card">

    💍

    <h3>

        No Anniversaries Today

    </h3>

    <p>

        No special celebrations today.

    </p>

</div>

`;

        return;

    }

    container.innerHTML =

        list.map(item=>`

<div class="mini-member-card">

    <div class="mini-avatar">

        ❤️

    </div>

    <div>

        <h4>

            ${item.person1}

            &

            ${item.person2}

        </h4>

        <p>

            ${item.relationship || ""}

        </p>

    </div>

    <span class="today-chip">

        💍 Today

    </span>

</div>

`).join("");

}

/* ==========================================================
   RECENT MEMBERS
========================================================== */

function renderRecentMembers(

    birthdays

){

    const container =
        document.getElementById(

            "recentMembers"

        );

    if(!container) return;

    const recent =
        birthdays

        .slice()

        .reverse()

        .slice(0,6);

    if(recent.length===0){

        container.innerHTML=`

<div class="empty-card">

    No members found.

</div>

`;

        return;

    }

    container.innerHTML =

        recent.map(person=>`

<div class="recent-card">

    <div class="recent-avatar">

        ${person.name.charAt(0).toUpperCase()}

    </div>

    <h3>

        ${person.name}

    </h3>

    <p>

        ${person.relationship || "Family"}

    </p>

</div>

`).join("");

}

/* ==========================================================
   HELPERS
========================================================== */

function setValue(

    id,

    value

){

    const element =
        document.getElementById(id);

    if(element){

        element.textContent = value;

    }

}