export function SettingsPage() {

return `

<div class="settings-page">

    <section class="settings-hero">

        <div class="settings-hero-copy">
            <span class="page-badge">Settings</span>
            <h1>Workspace Preferences</h1>
            <p>Fine-tune your celebration vault with elegant controls, secure data tools, and smart account actions.</p>
        </div>

        <div class="settings-hero-panel">
            <div class="settings-hero-card">
                <span class="hero-label">Premium Plan</span>
                <strong>Family Vault Pro</strong>
                <p>Unlimited birthdays, anniversaries, and secure backup utilities.</p>
            </div>
        </div>

    </section>

    <section class="settings-stats">

        <div class="setting-stat">
            <div class="icon">👨‍👩‍👧</div>
            <h2 id="settingMembers">0</h2>
            <p>Members</p>
        </div>

        <div class="setting-stat">
            <div class="icon">🎂</div>
            <h2 id="settingBirthdays">0</h2>
            <p>Birthdays</p>
        </div>

        <div class="setting-stat">
            <div class="icon">💍</div>
            <h2 id="settingAnniversaries">0</h2>
            <p>Anniversaries</p>
        </div>

        <div class="setting-stat">
            <div class="icon">💾</div>
            <h2>Secure</h2>
            <p>SQLite storage</p>
        </div>

    </section>

    <section class="settings-grid">

        <div class="setting-card">
            <div class="setting-icon">🎨</div>
            <h3>Appearance</h3>
            <p>Choose the theme that suits your workspace best.</p>
            <div class="setting-controls">
                <button id="themeToggle" class="secondary-btn" type="button">🌙 Toggle Theme</button>
            </div>
        </div>

        <div class="setting-card">
            <div class="setting-icon">🔔</div>
            <h3>Notifications</h3>
            <p>Turn birthday and anniversary alerts on or off.</p>
            <div class="setting-controls">
                <label class="toggle-switch">
                    <input type="checkbox" id="notificationsToggle">
                    <span class="toggle-track"></span>
                    <span class="toggle-label">Enable notifications</span>
                </label>
            </div>
        </div>

        <div class="setting-card">
            <div class="setting-icon">🛠️</div>
            <h3>Data Management</h3>
            <p>Export, import, or clear your vault data with confidence.</p>
            <div class="setting-controls setting-data-controls">
                <input type="file" id="importFile" accept=".db" hidden>
                <button id="exportData" class="secondary-btn" type="button">Export Backup</button>
                <button id="importData" class="secondary-btn" type="button">Import Backup</button>
                <button id="clearData" class="danger-btn" type="button">Clear Data</button>
            </div>
        </div>

        <div class="setting-card setting-summary-card">
            <div class="setting-icon">🔒</div>
            <h3>Account</h3>
            <p>Save your current settings or cancel unsaved changes.</p>
            <div class="setting-controls setting-action-row">
                <button id="cancelSettings" class="secondary-btn" type="button">Cancel</button>
                <button id="saveSettings" class="hero-btn" type="button">Save Settings</button>
            </div>
        </div>

    </section>

</div>

`;

}
