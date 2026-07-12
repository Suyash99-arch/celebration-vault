export function SearchPage() {

    return `

<div class="page-header">

    <div>

        <span class="page-badge">

            🔍 Smart Search

        </span>

        <h1>

            Find Family Member

        </h1>

        <p>

            Search instantly by name and view complete birthday information.

        </p>

    </div>

    <button
        id="backHome"
        class="secondary-btn">

        ← Dashboard

    </button>

</div>

<div class="search-container">

    <!-- Search Card -->

    <div class="search-card">

        <div class="search-icon">

            🔎

        </div>

        <h2>

            Search Birthday Record

        </h2>

        <p>

            Enter the member's name below.

        </p>

        <div class="search-box">

            <input

                id="searchName"

                type="text"

                placeholder="Enter member name..."

                autocomplete="off"

            >

            <button

                id="searchBtn"

                class="primary-btn"

            >

                🔍 Search

            </button>

        </div>

    </div>

    <!-- Results -->

    <div class="dashboard-section">

        <div class="section-header">

            <div>

                <h2>

                    🎂 Search Result

                </h2>

                <p>

                    Matching member information will appear here.

                </p>

            </div>

        </div>

        <div

            id="searchResult"

            class="search-result"

        >

            <div class="empty-card">

                🔎

                <br><br>

                Search for a family member to view birthday details.

            </div>

        </div>

    </div>

</div>

`;

}