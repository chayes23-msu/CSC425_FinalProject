import { useAuth } from "./AuthProvider";
import { useState } from "react";

export default function Login() {
    const auth = useAuth();
    const [loginError, setLoginError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");
        console.log("User " + username + " attempting log in");
        auth.login({ username: username, password: password }).then(() => {
            console.log("User " + username + " logged in");
            setLoginError("");
        }).catch((err) => {
            console.error(err.response.data);
            setLoginError(err.response.data);
        });
    };

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
