export function ProfilePage() {

    return `

<div class="profile-page">

    <div class="profile-page-header">

        <div class="profile-page-meta">
            <span class="page-badge">Profile</span>
            <h1>Member Profile</h1>
            <p>View celebration details and personal information with our premium profile experience.</p>
        </div>
        <button
            id="backBirthdays"
            class="secondary-btn"
            data-page="members">

            ← Back to Members

        </button>

    </div>

    <div
        id="profileContent"
        class="profile-content-wrapper">

        <div class="empty-card">

            Loading Profile...

        </div>

    </div>

</div>

`;

}