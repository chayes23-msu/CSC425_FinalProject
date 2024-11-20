import { useAuth } from "./AuthProvider";

export default function Login() {
    const auth = useAuth();

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");
        if(username && password)
            auth.login({ username: username, password: password });
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
                    <button type="submit">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    )
}
