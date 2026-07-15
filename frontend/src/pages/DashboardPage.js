import { DashboardLayout } from "../layouts/DashboardLayout.js";
import { startLiveClock } from "../components/liveClock.js";

const icon = (name) => ({
    people: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/></svg>',
    cake: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v4M8 5v2M16 5v2M4 11h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z M4 15c2 1.5 4 1.5 6 0 2 1.5 4 1.5 6 0 2 1.5 4 1.5 4 0M3 11h18l-2-4H5Z"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3-1.5 5.5L5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5ZM19 16l-.7 2.3L16 19l2.3.7L19 22l.7-2.3L22 19l-2.3-.7Z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
}[name]);

export function DashboardPage() {
    const page = DashboardLayout(`
<div class="dashboard-page page-enter">
    <section class="dashboard-hero" aria-labelledby="dashboard-title">

    <div class="hero-copy">

        <div class="hero-top">

    <span class="eyebrow">

        YOUR CELEBRATION SPACE

    </span>

    <span id="heroGreeting" class="hero-greeting">

        👋 Welcome

    </span>

</div>

        <h1 id="dashboard-title">
            Make every milestone
            <br>
            <em>feel remembered.</em>
        </h1>

        <p>
            Keep the people you love close, with every birthday and anniversary
            beautifully organized in one secure and elegant place.
        </p>

        <div class="hero-badge">

    ✨ Every memory deserves a celebration

</div>

        <!-- =====================================
                LIVE DATE & TIME
        ====================================== -->

        <div class="hero-date-time">

            <div class="hero-date-card">

                <span class="hero-date-label">
                    📅 Today
                </span>

                <strong id="currentDate">
                    Loading...
                </strong>

            </div>

            <div class="hero-date-card">

                <span class="hero-date-label">
                    🕒 Current Time
                </span>

                <strong id="currentTime">
                    --:--:--
                </strong>

            </div>

        </div>

        <!-- =====================================
                ACTION BUTTONS
        ====================================== -->

        <div class="hero-actions">

            <button
                class="hero-btn hero-primary-btn"
                data-page="add">

                ${icon("plus")}

                <span>
                    Add Birthday
                </span>

            </button>

            <button
                class="hero-btn hero-secondary-btn"
                data-page="anniversary">

                ${icon("heart")}

                <span>
                    Plan Anniversary
                </span>

            </button>

        </div>

    </div>

    <!-- Decorative Background -->

    <div
        class="hero-orb hero-orb-one"
        aria-hidden="true">
    </div>

    <div
        class="hero-orb hero-orb-two"
        aria-hidden="true">
    </div>

    <!-- Floating Card -->

    <aside
        class="hero-highlight"
        aria-label="Celebration reminder">

        <span class="hero-highlight-icon">

            ${icon("sparkle")}

        </span>

        <p>

            Small moments,
            beautifully remembered.

        </p>

        <span>

            Celebration Vault

        </span>

    </aside>

</section>

    <section class="dashboard-toolbar" aria-label="Dashboard actions">
        <div><span class="eyebrow">AT A GLANCE</span><h2>Your celebration overview</h2></div>
        <button class="dashboard-search" data-page="search" aria-label="Search your vault">${icon("search")}<span>Search people, dates, memories…</span><kbd>⌘ K</kbd></button>
    </section>

    <section class="stats-grid" aria-label="Celebration statistics">
        <article class="stat-card stat-family"><span class="stat-icon">${icon("people")}</span><div><span>Family & relatives</span><strong id="familyCount">0</strong></div><i aria-hidden="true"></i></article>
        <article class="stat-card stat-friends"><span class="stat-icon">${icon("heart")}</span><div><span>Friends</span><strong id="friendCount">0</strong></div><i aria-hidden="true"></i></article>
        <article class="stat-card stat-birthdays"><span class="stat-icon">${icon("cake")}</span><div><span>Birthdays this month</span><strong id="birthdayMonthCount">0</strong></div><i aria-hidden="true"></i></article>
        <article class="stat-card stat-anniversaries"><span class="stat-icon">${icon("sparkle")}</span><div><span>Anniversaries this month</span><strong id="anniversaryMonthCount">0</strong></div><i aria-hidden="true"></i></article>
    </section>

    <section class="dashboard-grid" aria-label="Today’s celebrations">
        <article class="dashboard-panel premium-panel"><header class="section-heading"><div><span class="section-kicker birthday-kicker">BIRTHDAYS</span><h2>Celebrating today</h2></div><button data-page="members" class="section-link">View all ${icon("arrow")}</button></header><div id="todayBirthdays" class="dashboard-list" aria-live="polite"><div class="loading-card">Loading birthdays…</div></div></article>
        <article class="dashboard-panel premium-panel"><header class="section-heading"><div><span class="section-kicker anniversary-kicker">ANNIVERSARIES</span><h2>Milestones today</h2></div><button data-page="anniversary" class="section-link">Manage ${icon("arrow")}</button></header><div id="todayAnniversaries" class="dashboard-list" aria-live="polite"><div class="loading-card">Loading anniversaries…</div></div></article>
    </section>

    <section class="dashboard-grid" aria-label="Upcoming celebrations">
        <article class="dashboard-panel upcoming-panel">
            <header class="section-heading">
                <div>
                    <span class="section-kicker upcoming-kicker">COMING UP</span>
                    <h2>Next birthday</h2>
                </div>
                <button data-page="members" class="section-link">Open directory ${icon("arrow")}</button>
            </header>
            <div id="nextBirthday" class="dashboard-list" aria-live="polite"><div class="loading-card">Loading next birthday…</div></div>
        </article>
        <article class="dashboard-panel upcoming-panel">
            <header class="section-heading">
                <div>
                    <span class="section-kicker anniversary-kicker">COMING UP</span>
                    <h2>Next anniversary</h2>
                </div>
                <button data-page="anniversary" class="section-link">Manage ${icon("arrow")}</button>
            </header>
            <div id="nextAnniversary" class="dashboard-list" aria-live="polite"><div class="loading-card">Loading next anniversary…</div></div>
        </article>
    </section>
    <section class="dashboard-panel upcoming-panel" aria-labelledby="recent-heading">
        <header class="section-heading">
            <div>
                <span class="section-kicker upcoming-kicker">ALSO NEW</span>
                <h2 id="recent-heading">Recent members</h2>
            </div>
            <button data-page="members" class="section-link">Open directory ${icon("arrow")}</button>
        </header>
        <div id="recentMembers" class="member-grid" aria-live="polite"><div class="loading-card">Loading recent members…</div></div>
    </section>
</div>`, "dashboard");

setTimeout(() => {

    startLiveClock();

}, 50);

return page;
}
