import {
    // Anchor,
    Button,
    // Checkbox,
    Container,
    // Group,
    Paper,
    PasswordInput,
    // Text,
    TextInput,
    Title,
  } from '@mantine/core';
import classes from './Login.module.css';
import { useAuth } from "../../authentication/AuthProvider";
import { useState } from "react";

// This is the login page for the app. It was built using code from https://ui.mantine.dev/category/authentication/
export default function Login() {
    const auth = useAuth();
    const [loginError, setLoginError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Attempt to log in when form is submitted
    async function handleSubmit() {
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

    // Enter key handler to submit form
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            if(username && password)
                handleSubmit();
        }
    }

    return (

        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome to MooManager!
            </Title>
            {/* <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text> */}

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput 
                    label="Username" 
                    placeholder="Your username" 
                    value={username} 
                    onChange={(event) => {setUsername(event.currentTarget.value)}} 
                    onKeyDown={handleKeyDown}
                    required 
                    error={loginError !== ""}
                />
                <PasswordInput 
                    label="Password" 
                    placeholder="Your password" 
                    required 
                    mt="md" 
                    value={password}
                    onChange={(event) => {setPassword(event.currentTarget.value)}}
                    onKeyDown={handleKeyDown}
                    error={loginError}
                />
                {/* <Group justify="space-between" mt="lg">
                    <Checkbox label="Remember me" />
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
                </Group> */}
                <Button fullWidth mt="xl" onClick={handleSubmit}>
                    Sign in
                </Button>
            </Paper>
        </Container>
    )
}
