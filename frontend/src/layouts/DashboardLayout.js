import { navigate } from "../router/router.js";

const navItems = [
    ["dashboard", "Dashboard", "home"],
    ["members", "People", "users"],
    ["add", "Add birthday", "cake"],
    ["anniversary", "Anniversaries", "heart"],
    ["search", "Search", "search"],
    ["settings", "Settings", "settings"]
];

const icons = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg>',
    users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    cake: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v4M8 5v2M16 5v2M4 11h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z M4 15c2 1.5 4 1.5 6 0 2 1.5 4 1.5 6 0 2 1.5 4 1.5 4 0M3 11h18l-2-4H5Z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V20h-3v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7.08 15a1.7 1.7 0 0 0-1.55-1H5.5v-3h.03a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06L8.8 5.94l.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1-1.55V4.7h3v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.12 2.12-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.55 1H21v3h-.05A1.7 1.7 0 0 0 19.4 15Z"/></svg>',
    bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    logout: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/></svg>'
};

function getUser() {
    try {
        return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
        return {};
    }
}

function initials(name = "Vault owner") {
    return name.split(" ").filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase();
}

export function DashboardLayout(content, active = "") {
    const user = getUser();
    const name = user.name || "Vault owner";
    const navigation = navItems.map(([page, label, icon]) => `
        <a href="#${page}" class="sidebar-link ${active === page ? "active" : ""}" data-page="${page}" ${active === page ? 'aria-current="page"' : ""}>
            <span class="nav-icon">${icons[icon]}</span><span>${label}</span>
        </a>`).join("");

    setTimeout(() => {
        document.getElementById("logoutBtn")?.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("landing");
        });
    }, 0);

    return `
<div class="app-shell">
    <aside class="dashboard-sidebar" aria-label="Primary navigation">
        <a href="#dashboard" class="sidebar-brand" data-page="dashboard" aria-label="Celebration Vault dashboard">
            <span class="brand-mark" aria-hidden="true">✦</span>
            <span><strong>Celebration</strong><small>VAULT</small></span>
        </a>
        <nav class="sidebar-nav">${navigation}</nav>
        <section class="sidebar-profile" aria-label="Account">
            <button class="profile-summary" data-page="profile" aria-label="Open your profile">
                <span class="user-avatar">${initials(name)}</span>
                <span class="profile-summary-copy"><strong>${name}</strong><small>Vault owner</small></span>
                <span class="profile-chevron" aria-hidden="true">›</span>
            </button>
            <button id="logoutBtn" class="sidebar-logout">${icons.logout}<span>Sign out</span></button>
        </section>
    </aside>
    <div class="dashboard-workspace">
        <header class="top-navbar">
            <div class="mobile-brand"><span class="brand-mark" aria-hidden="true">✦</span><strong>Celebration Vault</strong></div>
            <div class="top-navbar-spacer"></div>
            <button class="notification-button" type="button" aria-label="Notifications">${icons.bell}<span></span></button>
            <button class="top-profile" data-page="profile" aria-label="Open your profile"><span class="user-avatar">${initials(name)}</span><span>${name}</span></button>
        </header>
        <main class="page-container" id="main-content">${content}</main>
    </div>
</div>`;
}
