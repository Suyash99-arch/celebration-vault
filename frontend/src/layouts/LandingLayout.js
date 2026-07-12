/* ==========================================================
   LANDING LAYOUT
========================================================== */

export function LandingLayout(content = "") {

    return `

<div class="landing-layout">

    <!-- ==========================
            NAVBAR
    =========================== -->

    <header class="landing-navbar">

        <div class="brand">

            <div class="brand-logo">

                🎉

            </div>

            <div>

                <h2>

                    Celebration Vault

                </h2>

                <span>

                    Remember Every Moment

                </span>

            </div>

        </div>

        <nav class="landing-nav">

            <a href="#features">

                Features

            </a>

            <a href="#about">

                About

            </a>

            <a href="#contact">

                Contact

            </a>

        </nav>

        <div class="landing-actions">

            <button

                class="btn secondary-btn"

                data-page="login">

                Login

            </button>

            <button

                class="btn primary-btn"

                data-page="register">

                Get Started

            </button>

        </div>

    </header>

    <!-- ==========================
            PAGE CONTENT
    =========================== -->

    <main>

        ${content}

    </main>

    <!-- ==========================
            FOOTER
    =========================== -->

    <footer class="landing-footer">

        <div>

            <h3>

                Celebration Vault

            </h3>

            <p>

                Save birthdays, anniversaries and precious memories in one beautiful place.

            </p>

        </div>

        <div>

            © 2026 Celebration Vault

        </div>

    </footer>

</div>

`;

}