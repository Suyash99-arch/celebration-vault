export function RegisterPage() {

    return `

    <div class="login-page">

        <div class="login-card">

            <div class="login-header">

                <div class="login-logo">
                    🎂
                </div>

                <h1>Birthday Vault</h1>

                <p>
                    Create Your Account
                </p>

            </div>

            <div class="login-form">

                <div class="form-group">

                    <label>Full Name</label>

                    <input
                        type="text"
                        id="registerName"
                        placeholder="Enter your full name"
                    >

                </div>

                <div class="form-group">

                    <label>Email</label>

                    <input
                        type="email"
                        id="registerEmail"
                        placeholder="Enter your email"
                    >

                </div>

                <div class="form-group">

                    <label>Password</label>

                    <input
                        type="password"
                        id="registerPassword"
                        placeholder="Create a password"
                    >

                </div>

                <button
                    class="btn btn-primary"
                    id="registerBtn"
                >
                    Create Account
                </button>

                <div class="login-divider">

                    <span>OR</span>

                </div>

                <button
                    class="btn btn-google"
                    id="googleRegisterBtn"
                >
                    Continue with Google
                </button>

                <p class="login-footer">

                    Already have an account?

                    <a href="#" id="goLogin">

                        Login

                    </a>

                </p>

            </div>

        </div>

    </div>

    `;

}