import { Button, Container, Group, Text, Title } from '@mantine/core';
import { Illustration } from './Illustration';
import classes from './NotFound.module.css';
import { useNavigate } from 'react-router-dom';

// This page is displayed when the user tries to access a route that doesn't exist.
// It shows an illustration, a message that the page doesn't exist, and a button to go back to the home page.
// Code from https://ui.mantine.dev/category/error-pages/
export function NotFound() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate("/");
    }

    return (
        <Container className={classes.root}>
            <div className={classes.inner}>
                <Illustration className={classes.image} />
                <div className={classes.content}>
                    <Title className={classes.title}>Nothing to see here</Title>
                    <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                        Page you are trying to open does not exist. You may have mistyped the address, or the
                        page has been moved to another URL. If you think this is an error contact support.
                    </Text>
                    <Group justify="center">
                        <Button size="md" onClick={handleButtonClick}>Take me back to home page</Button>
                    </Group>
                </div>
            </div>
        </Container>
    );
}