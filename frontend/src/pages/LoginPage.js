export function LoginPage() {

    return `

    <div class="login-page">

        <div class="login-card">

            <div class="login-header">

                <div class="login-logo">
                    🎂
                </div>

                <h1>Birthday Vault</h1>

                <p>
                    Welcome Back
                </p>

            </div>

            <div class="login-form">

                <div class="form-group">

                    <label>Email</label>

                    <input
                        type="email"
                        id="loginEmail"
                        placeholder="Enter your email"
                    >

                </div>

                <div class="form-group">

                    <label>Password</label>

                    <input
                        type="password"
                        id="loginPassword"
                        placeholder="Enter your password"
                    >

                </div>

                <button
                    class="btn btn-primary"
                    id="loginBtn"
                >
                    Login
                </button>

                <div class="login-divider">

                    <span>OR</span>

                </div>

                <button
                    class="btn btn-google"
                    id="googleLoginBtn"
                >
                    Continue with Google
                </button>

                <p class="login-footer">

                    Don't have an account?

                    <a href="#" id="goRegister">

                        Register

                    </a>

                </p>

            </div>

        </div>

    </div>

    `;

}