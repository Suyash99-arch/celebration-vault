/* ==========================================================
   DASHBOARD PAGE
========================================================== */

import { DashboardLayout } from "../layouts/DashboardLayout.js";

export function DashboardPage() {

return DashboardLayout(`

<div class="dashboard-page">

<!-- ================= HERO ================= -->

<section class="dashboard-hero new-hero">

    <div class="hero-left">

        <span class="page-badge">

            ✨ Celebration Vault

        </span>

        <h1>

            Good Morning 👋

        </h1>

        <p>

            Never miss birthdays, anniversaries and precious memories of your family, relatives and friends.

        </p>

        <div class="hero-buttons">

            <button
                class="hero-btn"
                data-page="add">

                ➕ Add Birthday

            </button>

            <button
                class="secondary-btn"
                data-page="anniversary">

                💍 Add Anniversary

            </button>

            <button
                class="secondary-btn"
                data-page="search">

                🔍 Search

            </button>

        </div>

    </div>

    <div class="hero-quote">

        <div class="quote-icon">

            ✨

        </div>

        <h3>

            Celebrate Relationships

        </h3>

        <p>

            "Every birthday tells a story.

            Every anniversary celebrates a journey.

            The people you remember are the people who matter."

        </p>

    </div>

</section>



<!-- ================= STATS ================= -->

<section class="stats-grid">

<div class="stat-card blue">

<div class="stat-icon">👨‍👩‍👧‍👦</div>

<div>

<h2 id="familyCount">0</h2>

<p>Family & Relatives</p>

</div>

</div>



<div class="stat-card purple">

<div class="stat-icon">🤝</div>

<div>

<h2 id="friendCount">0</h2>

<p>Friends</p>

</div>

</div>



<div class="stat-card orange">

<div class="stat-icon">🎂</div>

<div>

<h2 id="birthdayMonthCount">0</h2>

<p>Birthdays This Month</p>

</div>

</div>



<div class="stat-card green">

<div class="stat-icon">💍</div>

<div>

<h2 id="anniversaryMonthCount">0</h2>

<p>Anniversaries This Month</p>

</div>

</div>

</section>



<!-- ================= TODAY ================= -->

<div class="dashboard-grid">

<div class="dashboard-panel premium-panel">

<div class="section-heading">

<h2>🎂 Today's Birthdays</h2>

</div>

<div
id="todayBirthdays"
class="dashboard-list">

<div class="loading-card">

Loading birthdays...

</div>

</div>

</div>



<div class="dashboard-panel premium-panel">

<div class="section-heading">

<h2>💍 Today's Anniversaries</h2>

</div>

<div
id="todayAnniversaries"
class="dashboard-list">

<div class="loading-card">

Loading anniversaries...

</div>

</div>

</div>

</div>



<!-- ================= UPCOMING ================= -->

<section class="dashboard-panel">

<div class="section-heading">

<h2>

🎂 Upcoming Birthdays

</h2>

</div>

<div
id="recentMembers"
class="member-grid">

<div class="loading-card">

Loading...

</div>

</div>

</section>

</div>

`, "dashboard");

}