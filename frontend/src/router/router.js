/* ==========================================================
   ROUTER
========================================================== */

import { LandingPage } from "../pages/LandingPage.js";
import { loadDashboard } from "../components/DashboardManager.js";

import { LoginPage } from "../pages/LoginPage.js";
import { RegisterPage } from "../pages/RegisterPage.js";

import { MembersPage } from "../pages/MembersPage.js";
import { AddMemberPage } from "../pages/AddMemberPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";

import { SearchPage } from "../pages/SearchPage.js";
import { AnniversaryPage } from "../pages/AnniversaryPage.js";
import { SettingsPage } from "../pages/SettingsPage.js";
import { DashboardPage } from "../pages/DashboardPage.js";

import { loadMembers } from "../components/MembersManager.js";
import { initializeAddMember } from "../components/AddMemberManager.js";
import { initializeSearch } from "../components/SearchManager.js";
import { loadProfile } from "../components/ProfileManager.js";

import {
    initializeAnniversary
} from "../components/AnniversaryManager.js";

/* ==========================================================
   APP ROOT
========================================================== */

const app = document.getElementById("app");

/* ==========================================================
   ROUTES
========================================================== */

const routes = {

    landing: LandingPage,

    dashboard: DashboardPage,

    login: LoginPage,

    register: RegisterPage,

    members: MembersPage,

    add: AddMemberPage,

    profile: ProfilePage,

    search: SearchPage,

    anniversary: AnniversaryPage,

    settings: SettingsPage

};

/* ==========================================================
   AUTH
========================================================== */

function isLoggedIn() {

    return Boolean(localStorage.getItem("token"));

}

/* ==========================================================
   RENDER
========================================================== */

function render(page) {

    const Page = routes[page];

    if (!Page) {

        app.innerHTML = `

        <section class="page-404">

            <h1>404</h1>

            <p>Page Not Found</p>

        </section>

        `;

        return;

    }

    app.innerHTML = Page();

/* ==========================================
   PAGE INITIALIZERS
========================================== */

switch (page) {

    case "dashboard":

        loadDashboard();

        break;

    case "members":

        loadMembers();

        break;

    case "add":

        initializeAddMember();

        break;

    case "anniversary":

        initializeAnniversary();

        break;

    case "search":

        initializeSearch();

        break;

    case "profile": {

        const id = Number(

            sessionStorage.getItem("profileId")

        );

        const editMode =

            sessionStorage.getItem("profileEdit") === "true";

        if (id) {

            loadProfile(id, editMode);

        }

        break;

    }

}

window.scrollTo({

    top: 0,

    behavior: "smooth"

});

}

/* ==========================================================
   NAVIGATE
========================================================== */

export function navigate(page = "landing") {

    if (

        !isLoggedIn()

        &&

        page !== "landing"

        &&

        page !== "login"

        &&

        page !== "register"

    ) {

        page = "landing";

    }

    history.pushState(

        {

            page

        },

        "",

        "#" + page

    );

    render(page);

}

/* ==========================================================
   START APP
========================================================== */

export function startApp() {

    let page = location.hash.replace("#", "");

    if (!page) {

        page = isLoggedIn()

            ? "dashboard"

            : "landing";

    }

    render(page);

}

/* ==========================================================
   BROWSER BACK
========================================================== */

window.addEventListener(

    "popstate",

    () => {

        let page = location.hash.replace("#", "");

        if (!page) {

            page = isLoggedIn()

                ? "dashboard"

                : "landing";

        }

        render(page);

    }

);

/* ==========================================================
   GLOBAL NAVIGATION
========================================================== */

document.addEventListener(

    "click",

    (event) => {

        const element = event.target.closest("[data-page]");

        if (!element) {

            return;

        }

        event.preventDefault();

        navigate(

            element.dataset.page

        );

    }

);