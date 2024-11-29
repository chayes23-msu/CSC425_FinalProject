import { Button, Title, Table, Flex } from "@mantine/core";
import { FinalProjectAPI as api } from "../../apis/FinalProjectAPI";
import { useEffect, useState } from "react";
import IconBackspace from "../../assets/icon-components/IconBackspace";
import IconEdit from "../../assets/icon-components/IconEdit";
// import { modals } from "@mantine/modals"

// User management page for creating, deleting, and updating users

export default function UserManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const fetchedUsers = await api.getUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                console.error(err);
            }
        }
        fetchUsers();
    }, []);

    const createAUser = () => {
        console.log("Create a user");
    }

    return (
        <Flex maw="65%" mx="auto" direction="column" justify="center">
            <Title order={1} align='center'>Manage Users</Title>
            <Button mt="lg" fz="lg" onClick={createAUser}>Create a User</Button>
            <Table highlightOnHover stickyHeader mt="lg" ta="center">
                <Table.Thead>
                    <Table.Tr fz='h3'>
                        <Table.Th ta="center">Username</Table.Th>
                        <Table.Th ta="center">Role</Table.Th>
                        <Table.Th ta="center">Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {users.map((user) => (
                        <Table.Tr key={user.userID} fz="lg">
                            <Table.Td>{user.username}</Table.Td>
                            <Table.Td>{user.isAdmin ? "Admin" : "Regular User"}</Table.Td>
                            <Table.Td><Button variant="subtle"><IconEdit /></Button><Button variant="subtle" color="red"><IconBackspace /></Button></Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Flex>
    );
}