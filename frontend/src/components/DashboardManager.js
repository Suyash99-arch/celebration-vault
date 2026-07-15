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

        renderNextUpcoming(birthdays, anniversaries);

        bindDashboardActions();

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


/* ==========================================================
   NEXT UPCOMING (Birthday + Anniversary)
   Shows the single next birthday and next anniversary
========================================================== */

function renderNextUpcoming(birthdays, anniversaries) {

    const birthdayContainer = document.getElementById("nextBirthday");
    const anniversaryContainer = document.getElementById("nextAnniversary");

    if (!birthdayContainer || !anniversaryContainer) return;

    // find next birthday by days_left_number
    const validBirthdays = birthdays.filter(b => typeof b.days_left_number === 'number');

    const nextBirthday = validBirthdays.length ? validBirthdays.slice().sort((a,b)=>a.days_left_number - b.days_left_number)[0] : null;

    if (!nextBirthday) {
        birthdayContainer.innerHTML = `
            <div class="empty-card">
                🎂<br><br>
                No upcoming birthdays.
            </div>
        `;
    } else {
        birthdayContainer.innerHTML = `
            <div class="upcoming-card">
                <div class="upcoming-card-header">
                    <div class="upcoming-left">
                        <div class="avatar-circle">${nextBirthday.name.charAt(0).toUpperCase()}</div>
                    </div>
                    <div class="upcoming-body">
                        <span class="section-kicker birthday-kicker">Birthday</span>
                        <h3>${nextBirthday.name}</h3>
                        <p>${nextBirthday.relationship || 'Family'} • ${nextBirthday.formatted_dob}</p>
                    </div>
                </div>
                <div class="upcoming-card-footer">
                    <div id="countdown-${nextBirthday.id}" class="countdown">${nextBirthday.days_left}</div>
                    <button data-page="profile" class="button button-primary" data-id="${nextBirthday.id}">View</button>
                </div>
            </div>
        `;

        startCountdown(nextBirthday, `countdown-${nextBirthday.id}`);
    }

    // ANNIVERSARY: find next upcoming anniversary
    const validAnn = anniversaries.filter(a => typeof a.days_left_number === 'number');
    const nextAnniversary = validAnn.length ? validAnn.slice().sort((a,b)=>a.days_left_number - b.days_left_number)[0] : null;

    if (!nextAnniversary) {
        anniversaryContainer.innerHTML = `
            <div class="empty-card">
                💍<br><br>
                No upcoming anniversaries.
            </div>
        `;
    } else {
        anniversaryContainer.innerHTML = `
            <div class="upcoming-card">
                <div class="upcoming-card-header">
                    <div class="upcoming-left">
                        <div class="avatar-circle">❤️</div>
                    </div>
                    <div class="upcoming-body">
                        <span class="section-kicker anniversary-kicker">Anniversary</span>
                        <h3>${nextAnniversary.person1} & ${nextAnniversary.person2}</h3>
                        <p>${nextAnniversary.relationship || 'Anniversary'} • ${nextAnniversary.formatted_date}</p>
                    </div>
                </div>
                <div class="upcoming-card-footer">
                    <div id="countdown-ann-${nextAnniversary.id}" class="countdown">${nextAnniversary.days_left}</div>
                    <button data-page="anniversary" class="button button-primary" data-id="${nextAnniversary.id}">View</button>
                </div>
            </div>
        `;

        startCountdown(nextAnniversary, `countdown-ann-${nextAnniversary.id}`, true);
    }

}


function startCountdown(item, elementId, isAnniversary=false) {
    const el = document.getElementById(elementId);
    if (!el) return;

    function update() {
        try {
            // item.dob or item.date in format YYYY-MM-DD
            const dateStr = isAnniversary ? item.date : item.dob;
            const parts = dateStr.split('-').map(Number);
            const month = parts[1]-1;
            const day = parts[2];
            const now = new Date();
            let target = new Date(now.getFullYear(), month, day, 0, 0, 0);
            if (target < now) target = new Date(now.getFullYear()+1, month, day, 0, 0, 0);

            const diff = target - now;
            if (diff <= 0) {
                el.textContent = 'Today 🎉';
                return;
            }
            const days = Math.floor(diff / (1000*60*60*24));
            const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
            const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));

            el.textContent = `${days}d ${hours}h ${minutes}m left`;
        } catch (e) {
            console.error('Countdown error', e);
        }
    }

    update();
    const interval = setInterval(update, 30000);

    // store interval on element so it can be cleared later if needed
    el._countdownInterval = interval;
}

function bindDashboardActions() {
    // ensure section-link buttons navigate correctly even if data-page clicks miss
    document.getElementById('openDirectoryBtn')?.addEventListener('click', () => {
        const el = document.querySelector('[data-page="members"]');
        if (el) el.click();
        else window.location.hash = '#members';
    });

    // view buttons for upcoming items: set profile/anniversary id and navigate
    document.querySelectorAll('#nextBirthday .section-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.dataset.id;
            if (id) {
                sessionStorage.setItem('profileId', id);
                localStorage.setItem('lastProfileId', id);
                window.location.hash = '#profile';
            }
        });
    });

    document.querySelectorAll('#nextAnniversary .section-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.dataset.id;
            if (id) {
                sessionStorage.setItem('anniversaryEditId', id);
                window.location.hash = '#anniversary';
            } else {
                window.location.hash = '#anniversary';
            }
        });
    });

}

// Ensure section-link buttons navigate even if router delegation misses
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.section-link');
    if (!btn) return;
    const page = btn.dataset.page;
    if (page) {
        if (page === 'members') {
            window.location.hash = '#members';
        } else if (page === 'anniversary') {
            window.location.hash = '#anniversary';
        }
    }
});