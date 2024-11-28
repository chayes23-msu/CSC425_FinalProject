import { useAuth } from "../../authentication/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Flex, Loader, Paper, Title } from "@mantine/core";
import { useEffect } from "react";

export default function Logout() {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            auth.logout();
            navigate('/login');
        }, 3000);
    }, []);

    return (
        <Flex
            justify='center'
            align='center'
            direction='column'>
            <Paper
                withBorder
                shadow="md"
                radius="md"
                mt="xl"
                w='50%'
            >
                <Flex
                    justify='center'
                    align='center'
                    direction='column'
                    gap='xl'
                >
                    <Loader size="xl" mt="xl" />
                    <Title mb="xl">Logging out</Title>
                </Flex>
            </Paper>
        </Flex>

    );
}