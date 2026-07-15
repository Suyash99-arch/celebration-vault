export function MemberCard(person) {

    return `

        <div class="profile-card">

            <div class="profile-avatar">

                ${person.name.charAt(0).toUpperCase()}

            </div>

            <h2>${person.name}</h2>

            <p class="relationship">

                ${person.relationship || "Family Member"}

            </p>

            <div class="profile-info">

                <div>

                    🎂 ${person.formatted_dob}

                </div>

                <div>

                    🎈 ${person.age}

                </div>

                <div>

                    ⏳ ${person.days_left}

                </div>

            </div>

            <div class="profile-actions">

                <button
                    class="view-btn"
                    data-id="${person.id}">

                    View

                </button>

                <button
                    class="edit-btn"
                    data-id="${person.id}">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    data-id="${person.id}"
                    data-name="${person.name}">

                    Delete

                </button>

            </div>

        </div>

    `;

}