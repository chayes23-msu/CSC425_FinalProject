import { useAuth } from "./AuthProvider";
import { useState } from "react";

export default function Login() {
    const auth = useAuth();
    const [loginError, setLoginError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");
    
        if (!username || !password) {
            setLoginError("Username and password are required.");
            return;
        }
    
        console.log(`User ${username} attempting log in`);
    
        try {
            await auth.login({ username, password });
            console.log(`User ${username} logged in`);
            setLoginError(""); // Clear any previous errors
        } catch (err) {
            const errorMessage = err.response?.data || "An unexpected error occurred.";
            console.error(errorMessage);
            setLoginError(errorMessage);
        }
    }

    return (

        <div>
            <h2>
                Sign in to your account
            </h2>

            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="username" >
                        Username
                    </label>
                    <div >
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            autoComplete="username"
                        />
                    </div>
                </div>

                <div>
                    <div >
                        <label htmlFor="password">
                            Password
                        </label>
                    </div>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                </div>

                <div>
                    {loginError && <p>{loginError}</p>}
                </div>

                <div>
                    <button type="submit">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    )
}
