export function AnniversaryPage() {

    return `

<div class="page-header">

    <div>

        <span class="page-badge">

            💍 Anniversary Manager

        </span>

        <h1>

            Add New Anniversary

        </h1>

        <p>

            Store wedding anniversaries and every memorable celebration securely.

        </p>

    </div>

    <button
        id="backHome"
        class="secondary-btn">

        ← Dashboard

    </button>

</div>

<div class="form-container">

    <div class="form-card premium-form">

        <div class="form-heading">

            <div class="form-icon">

                💍

            </div>

            <div>

                <h2>

                    Anniversary Information

                </h2>

                <p>

                    Save memorable occasions for your loved ones.

                </p>

            </div>

        </div>

        <div class="form-grid">

            <div class="input-group">

                <label>

                    First Person <span>*</span>

                </label>

                <input
                    id="person1"
                    type="text"
                    placeholder="Enter first person's name">

            </div>

            <div class="input-group">

                <label>

                    Second Person <span>*</span>

                </label>

                <input
                    id="person2"
                    type="text"
                    placeholder="Enter second person's name">

            </div>

            <div class="input-group">

                <label>

                    Anniversary Date <span>*</span>

                </label>

                <input
                    id="anniversaryDate"
                    type="date">

            </div>

            <div class="input-group">

                <label>

                    Anniversary Type

                </label>

                <select id="relationship">

                    <option>Marriage</option>

                    <option>Engagement</option>

                    <option>Relationship</option>

                    <option>Other</option>

                </select>

            </div>

            <div class="input-group full-width">

                <label>

                    Notes

                </label>

                <textarea
                    id="notes"
                    rows="5"
                    placeholder="Write memories, venue, celebration plans..."></textarea>

            </div>

        </div>

        <div class="checkbox-row">

            <label>

                <input
                    id="important"
                    type="checkbox">

                ⭐ Mark as Important Anniversary

            </label>

        </div>

        <div class="button-row">

            <button
                id="saveAnniversaryBtn"
                class="save-premium-btn">

                💍 Save Anniversary

            </button>

        </div>

    </div>

</div>
<!-- ==========================================
        TODAY'S ANNIVERSARY
========================================== -->

<section class="dashboard-section">

    <div class="section-header">

        <div>

            <span class="section-tag">

                Today

            </span>

            <h2>

                💍 Today's Anniversary

            </h2>

        </div>

    </div>

    <div
        id="todayAnniversaryCard"
        class="upcoming-grid">

        <div class="empty-card">

            Loading...

        </div>

    </div>

</section>



<!-- ==========================================
        STORED ANNIVERSARIES
========================================== -->

<section class="dashboard-section">

    <div class="section-header">

        <div>

            <span class="section-tag">

                Anniversary Vault

            </span>

            <h2>

                ❤️ Stored Anniversaries

            </h2>

        </div>

    </div>

    <div
        id="anniversaryList"
        class="upcoming-grid">

        <div class="empty-card">

            Loading...

        </div>

    </div>

</section>
`;

}