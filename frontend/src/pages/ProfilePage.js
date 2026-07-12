export function ProfilePage() {

    return `

<div class="profile-page">

    <div class="profile-page-header">

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