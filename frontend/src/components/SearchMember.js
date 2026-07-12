/* ==========================================================
   SEARCH RESULT VIEW

   UI Component Only
========================================================== */

import { relationshipBadge } from "./badge.js";

/* ==========================================================
   RENDER SEARCH RESULT
========================================================== */

export function renderSearchResult(person) {

    return `

<div class="birthday-card fade-in">

    <div class="birthday-left">

        <div class="avatar-circle">

            ${getInitial(person.name)}

        </div>

        <div class="card-info">

            <h3>

                ${person.name}

            </h3>

            <p class="birth-date">

                🎂 ${formatDate(person.formatted_dob || person.dob)}

            </p>

            ${relationshipBadge(person.relationship || "")}

            <div class="card-badges">

                <span class="badge">

                    🎈 ${cleanAge(person.age)}

                </span>

                <span class="badge countdown">

                    ⏳ ${person.days_left || "-"}

                </span>

            </div>

        </div>

    </div>

    <div class="button-row" style="margin-top:20px;">

        <button
            id="viewProfile"
            class="primary-btn">

            👤 View Profile

        </button>

        <button
            id="editProfile"
            class="secondary-btn">

            ✏ Edit

        </button>

        <button
            id="deleteMember"
            class="danger-btn">

            🗑 Delete

        </button>

    </div>

</div>

`;

}

/* ==========================================================
   HELPERS
========================================================== */

function getInitial(name) {

    if (!name) return "?";

    return name.charAt(0).toUpperCase();

}

function cleanAge(age) {

    if (!age) return "-";

    return String(age).replace(/\s*Years?$/i, "") + " Years";

}

function formatDate(date) {

    if (!date) return "-";

    if (date.includes("/")) return date;

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}