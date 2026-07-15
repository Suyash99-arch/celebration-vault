/* ==========================================================
   SEARCH MANAGER
========================================================== */

import api from "../api/api.js";
import { showToast } from "./Toast.js";
import { navigate } from "../router/router.js";
import { renderSearchResult } from "./SearchMember.js";
import { openDeleteModal } from "./DeleteModal.js";

let currentMember = null;


/* ==========================================================
   INITIALIZE
========================================================== */

export function initializeSearch() {

    const searchInput = document.getElementById("searchName");
    const searchButton = document.getElementById("searchBtn");

    if (!searchInput || !searchButton) return;

    searchButton.onclick = searchMember;

    searchInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            searchMember();

        }

    });

}


/* ==========================================================
   SEARCH
========================================================== */

async function searchMember() {

    const input = document.getElementById("searchName");
    const result = document.getElementById("searchResult");

    const name = input.value.trim();

    if (!name) {

        showToast("Enter a member name.", "error");

        return;

    }

    result.innerHTML = `

        <div class="empty-card">

            Searching...

        </div>

    `;

    try {

        const response = await api.get("/search/" + encodeURIComponent(name));

        if (!response.data || !response.data.success) {

            currentMember = null;

            result.innerHTML = `

                <div class="empty-card">

                    ❌

                    <br><br>

                    No member found.

                </div>

            `;

            return;

        }

        currentMember = response.data;

        result.innerHTML = renderSearchResult(currentMember);

        bindResultEvents();

    }

    catch (error) {

        console.error(error);

        currentMember = null;

        result.innerHTML = `

            <div class="empty-card">

                ⚠

                <br><br>

                Unable to search member.

            </div>

        `;

    }

}


/* ==========================================================
   EVENTS
========================================================== */

function bindResultEvents() {

    document.getElementById("viewProfile")?.addEventListener(

        "click",

        () => {

            sessionStorage.setItem(

                "profileId",

                currentMember.id

            );
            localStorage.setItem(

                "lastProfileId",

                currentMember.id

            );

            sessionStorage.removeItem(

                "profileEdit"

            );

            navigate("profile");

        }

    );



    document.getElementById("editProfile")?.addEventListener(

        "click",

        () => {

            sessionStorage.setItem(

                "profileId",

                currentMember.id

            );
            localStorage.setItem(

                "lastProfileId",

                currentMember.id

            );

            sessionStorage.setItem(

                "profileEdit",

                "true"

            );

            navigate("profile");

        }

    );



    document.getElementById("deleteMember")?.addEventListener(

        "click",

        () => {

            openDeleteModal(

                currentMember.name,

                async () => {

                    try {

                        await api.delete(

                            "/delete/" + currentMember.id

                        );

                        showToast(

                            "Member deleted.",

                            "success"

                        );

                        document.getElementById(

                            "searchResult"

                        ).innerHTML = `

                            <div class="empty-card">

                                Member deleted successfully.

                            </div>

                        `;

                    }

                    catch {

                        showToast(

                            "Unable to delete member.",

                            "error"

                        );

                    }

                }

            );

        }

    );

}