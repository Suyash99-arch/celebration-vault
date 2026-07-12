import { navigate } from "../router/router.js";

export function DashboardLayout(content, active = "") {

    setTimeout(() => {

        const logout = document.getElementById("logoutBtn");

        if (logout) {

            logout.onclick = () => {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("landing");

            };

        }

    }, 0);

    return `

<div class="app-shell">

    <header class="top-navbar">

        <div class="navbar-logo">

            <div class="logo-circle">🎉</div>

            <div>

                <h2>Celebration Vault</h2>

                <p>Family • Relatives • Friends</p>

            </div>

        </div>

        <nav class="navbar-links">

            <a data-page="dashboard" class="${active==="dashboard"?"active":""}">Dashboard</a>

            <a data-page="members" class="${active==="members"?"active":""}">Members</a>

            <a data-page="add" class="${active==="add"?"active":""}">Add Birthday</a>

            <a data-page="search" class="${active==="search"?"active":""}">Search</a>

            <a data-page="anniversary" class="${active==="anniversary"?"active":""}">Anniversaries</a>

            <a data-page="settings" class="${active==="settings"?"active":""}">Settings</a>

        </nav>

        <div class="navbar-right">

            <button
                class="secondary-btn"
                data-page="profile">

                👤 Profile

            </button>

            <button
                id="logoutBtn"
                class="danger-btn">

                Logout

            </button>

        </div>

    </header>

    <main class="page-container">

        ${content}

    </main>

</div>

`;

}