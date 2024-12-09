import { Text, Button, Title, Table, Flex, TextInput, Switch, Modal, LoadingOverlay } from "@mantine/core";
import { FinalProjectAPI as api } from "../../apis/FinalProjectAPI";
import { useEffect, useState } from "react";
import IconBackspace from "../../assets/icon-components/IconBackspace";
import IconEdit from "../../assets/icon-components/IconEdit";
import { useForm } from "@mantine/form";
import PasswordInputWithStrength from "../../components/PasswordInputWithStrength";
import { useDisclosure } from "@mantine/hooks";
import { showErrorNotification, showSuccessNotification } from "../../notifications/notificationFunctions";
import { modals } from "@mantine/modals";

// User management page for creating, deleting, and updating users

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);
    const [editUserModalOpened, editUserModalHandlers] = useDisclosure(false);
    const [createUserModalOpened, createUserModalHandlers] = useDisclosure(false);
    const [loading, loadingHandlers] = useDisclosure(false);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const fetchedUsers = await api.getUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                showErrorNotification(err);
            }
        }
        fetchUsers();
    }, []);

    const updateUser = async (values) => {
        try {
            loadingHandlers.open();
            await api.updateUser(userToEdit.userID, { username: values.username, password: values.password, isAdmin: values.isAdmin });
            showSuccessNotification("User updated successfully");
            setUsers(users.map((user) => user.userID === userToEdit.userID ? { ...user, username: values.username, isAdmin: values.isAdmin ? 1 : 0 } : user));
            return true;
        } catch (err) {
            showErrorNotification(err);
            return false;
        }
    }

    const createAUser = async (userData) => {
        try {
            loadingHandlers.open();
            await api.createUser(userData);
            showSuccessNotification("User created successfully");
            setUsers([...users, { ...userData, isAdmin: userData.isAdmin ? 1 : 0 }]);
            return true;
        } catch (err) {
            showErrorNotification(err);
            return false;
        }
    }

    const deleteUser = async (userID) => {
        try {
            await api.deleteUser(userID);
            showSuccessNotification("User deleted successfully");
            setUsers(users.filter((user) => user.userID !== userID));
            return true;
        } catch (err) {
            showErrorNotification(err);
            return false;
        }
    }

    const editUserForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            isAdmin: false,
            password: '',
        },
        validateInputOnChange: true,
        validate: {
            username: (value) => !value ? 'Username is required' : users.some((user) => user.username === value && user.userID !== userToEdit?.userID) ? 'Username already exists' : null,
        }
    });

    const createUserForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            isAdmin: false,
            password: '',
        },
        validateInputOnChange: true,
        validate: {
            username: (value) => !value ? 'Username is required' : !!users.find((user) => user.username === value) ? 'Username already exists' : null,
            password: (value) => !value ? 'Password is required' : null,
        }
    });

    return (
        <Flex maw="65%" mx="auto" direction="column" justify="center">
            <Modal title="Edit user" opened={editUserModalOpened} onClose={() => { editUserModalHandlers.close(); setUserToEdit(null) }}>
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <form
                    onSubmit={editUserForm.onSubmit(async (values) => {
                        if (await updateUser(values)) {
                            editUserModalHandlers.close();
                            setUserToEdit(null);
                        }
                        loadingHandlers.close();
                    })}
                >
                    <TextInput
                        label="Username"
                        placeholder="Username"
                        key={editUserForm.key('username')}
                        {...editUserForm.getInputProps('username')}
                    />
                    <PasswordInputWithStrength
                        label=" New password"
                        placeholder="New password"
                        withAsterisk={false}
                        description="Strength meter is just a suggestion"
                        key={editUserForm.key('password')}
                        {...editUserForm.getInputProps('password')}
                    />
                    <Switch
                        label="Administrator"
                        mt="lg"
                        key={editUserForm.key('isAdmin')}
                        {...editUserForm.getInputProps('isAdmin', { type: 'checkbox' })}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        mt="xl"
                        disabled={!editUserForm.isValid() || !editUserForm.isDirty()}
                    >
                        Submit
                    </Button>
                </form>
            </Modal>
            <Modal title="Create user" opened={createUserModalOpened} onClose={() => { createUserModalHandlers.close() }}>
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <form
                    onSubmit={createUserForm.onSubmit(async (values) => {
                        if (await createAUser(values)) {
                            createUserModalHandlers.close();
                        }
                        loadingHandlers.close();
                    })}
                >
                    <TextInput
                        label="Username"
                        placeholder="Username"
                        key={createUserForm.key('username')}
                        {...createUserForm.getInputProps('username')}
                    />
                    <PasswordInputWithStrength
                        label="Password"
                        placeholder="Password"
                        withAsterisk={false}
                        description="Strength meter is just a suggestion"
                        key={createUserForm.key('password')}
                        {...createUserForm.getInputProps('password')}
                    />
                    <Switch
                        label="Administrator"
                        mt="lg"
                        key={createUserForm.key('isAdmin')}
                        {...createUserForm.getInputProps('isAdmin', { type: 'checkbox' })}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        mt="xl"
                        disabled={!createUserForm.isValid() || !createUserForm.isDirty()}
                    >
                        Submit
                    </Button>
                </form>
            </Modal>
            <Title order={1} align='center'>Manage Users</Title>
            <Button mt="lg" fz="lg" onClick={() => { createUserForm.reset(); createUserModalHandlers.open(); }}>Create a User</Button>
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
                            <Table.Td>{user.isAdmin == 1 ? "Admin" : "Regular User"}</Table.Td>
                            <Table.Td>
                                <Button
                                    variant="subtle"
                                    onClick={() => {
                                        setUserToEdit(user);
                                        const userIsAdmin = user.isAdmin === 1;
                                        editUserForm.setInitialValues({ username: user.username, isAdmin: userIsAdmin, password: '' });
                                        editUserForm.reset();
                                        editUserModalHandlers.open();
                                    }}
                                >
                                    <IconEdit />
                                </Button>
                                <Button variant="subtle" color="red" onClick={() => {
                                    modals.openConfirmModal({
                                        title: 'Delete user',
                                        centered: true,
                                        children: (
                                            <Text>
                                                Are you sure you want to delete user {user.username}? This is an irreversible action.
                                            </Text>
                                        ),
                                        labels: { confirm: 'Delete', cancel: 'Cancel' },
                                        confirmProps: { color: 'red' },
                                        onConfirm: () => deleteUser(user.userID),
                                    });
                                }}>
                                    <IconBackspace />
                                </Button>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Flex>
    );
}