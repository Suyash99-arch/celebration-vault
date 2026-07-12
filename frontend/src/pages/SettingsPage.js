export function SettingsPage() {

return `

<div class="settings-page">

    <!-- ==========================================
            HERO
    =========================================== -->

    <section class="settings-hero">

        <div class="settings-avatar">

            KS

        </div>

        <h1 class="settings-name">

            Kumar Shreyash

        </h1>

        <p class="settings-role">

            Family Vault Owner

        </p>

        <div class="settings-version">

            ✨ Version 2.0 Premium

        </div>

    </section>





    <!-- ==========================================
            STATS
    =========================================== -->

    <section class="settings-stats">

        <div class="setting-stat">

            <div class="icon">👨‍👩‍👧</div>

            <h2 id="settingMembers">

                0

            </h2>

            <p>

                Members

            </p>

        </div>



        <div class="setting-stat">

            <div class="icon">🎂</div>

            <h2 id="settingBirthdays">

                0

            </h2>

            <p>

                Birthdays

            </p>

        </div>



        <div class="setting-stat">

            <div class="icon">💍</div>

            <h2 id="settingAnniversaries">

                0

            </h2>

            <p>

                Anniversaries

            </p>

        </div>



        <div class="setting-stat">

            <div class="icon">💾</div>

            <h2>

                Secure

            </h2>

            <p>

                SQLite Storage

            </p>

        </div>

    </section>





    <!-- ==========================================
            SETTINGS
    =========================================== -->

    <section class="settings-grid">



        <div class="setting-card">

            <div class="setting-icon">

                🎨

            </div>

            <h3>

                Appearance

            </h3>

            <p>

                Personalize the look and feel of your Family Vault.

                Choose between Light and Dark themes for the best experience.

            </p>

            <button
                id="themeToggle"
                class="setting-btn">

                🌙 Toggle Theme

            </button>

        </div>





        <div class="setting-card">

            <div class="setting-icon">

                🔔

            </div>

            <h3>

                Notifications

            </h3>

            <p>

                Birthday reminders, anniversary alerts and upcoming celebrations.

            </p>

            <button class="setting-btn">

                Configure

            </button>

        </div>





        <div class="setting-card">

            <div class="setting-icon">

                💍

            </div>

            <h3>

                Anniversary Settings

            </h3>

            <p>

                Manage anniversary reminders and celebration records.

            </p>

            <button
                class="setting-btn"
                data-page="anniversary">

                Open Anniversary

            </button>

        </div>





                <div class="setting-card">

            <div class="setting-icon">

                🚪

            </div>

            <h3>

                Account

            </h3>

            <p>

                Sign out of your Birthday Vault account.

            </p>

            <button
                id="logoutBtn"
                class="setting-btn">

                Logout

            </button>

        </div>

    </section>

</div>

`;

}