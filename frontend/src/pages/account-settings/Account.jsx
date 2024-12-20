import { useForm } from '@mantine/form';
import { Button, Box, PasswordInput, Group, Title, TextInput } from '@mantine/core';
import { FinalProjectAPI as api } from '../../apis/FinalProjectAPI';
import { useAuth } from '../../authentication/AuthProvider';
import PasswordInputWithStrength from '../../components/PasswordInputWithStrength';
import IconLock from '../../assets/icon-components/IconLock';
import { showErrorNotification, showSuccessNotification } from '../../notifications/notificationFunctions.jsx';
import IconUser from '../../assets/icon-components/IconUser.jsx';
import { useState } from 'react';

// Account settings page for changing the user's password and username
//  A user can change their password here, an admin can change their password and username
export default function Account() {
    const auth = useAuth();

    let currentUsername = auth.user.username;

    /**
     * 
     * @param {*} values The values from the form to send to the API to update the user's password
     * @returns {boolean} Returns true if the password was updated successfully, false otherwise
     * Shows a success notification if the password was updated successfully, and an error notification if it was not
     */
    const updateUserPassword = async (values) => {
        try {
            await api.updateUserPassword(auth.user.userID, { password: values.newPassword, currentPassword: values.currentPassword });
            showSuccessNotification("Password updated successfully");
            console.log('Password updated');
            return true;
        } catch (err) {
            showErrorNotification(err);
            return false;
        }
    };

    /**
     * 
     * @param {*} values Values from the form to send to the API to update the user's username
     * @returns {boolean} Returns true if the username was updated successfully, false otherwise
     * Shows a success notification if the username was updated successfully, and an error notification if it was not
     */
    const updateUsername = async (values) => {
        try {
            await api.updateUsername(auth.user.userID, { username: values.username, currentPassword: values.currentPassword });
            showSuccessNotification("Username updated successfully");
            console.log('Username updated');
            return true;
        } catch (err) {
            showErrorNotification(err);
            return false;
        }
    }

    /**
     * Form for changing the user's password built with useForm from Mantine
     */
    const passwordForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validateInputOnChange: true,

        validate: {
            currentPassword: (value) => !value ? 'Current password is required' : null,
            newPassword: (value) => !value ? 'Please input a new password' : null,
            confirmPassword: (value, values) => !value ? 'Password confirmation required' : value !== values.newPassword ? 'Passwords did not match' : null,
        },
    });

    /**
     * Form for changing the user's username built with useForm from Mantine
     */
    const usernameForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            currentPassword: '',
            username: currentUsername,
        },
        validateInputOnChange: true,

        validate: {
            currentPassword: (value) => !value ? 'Current password is required' : null,
            username: (value) => !value ? 'New username is required' : value === currentUsername ? 'New username cannot be the same as the old one' : null,
        },
    });

    return (
        <Box maw={340} mx="auto">
            <Title order={1} align='center'>Account Settings</Title>
            <form
                onSubmit={usernameForm.onSubmit(async (values) => {
                    if (await updateUsername(values)) {
                        // login again to update the token with new username
                        currentUsername = values.username; // set the current username so form will reset properly
                        try {
                            await auth.login({ username: values.username, password: values.currentPassword }); // login with new username so token is updated (needed so auth context has correct user info)
                            usernameForm.setValues({username: currentUsername, currentPassword: ''}); // "reset" form with new values
                        } catch (err) {
                            showErrorNotification(err);
                        }
                    }
                })}
                hidden={!auth.user.isAdmin}
            >
                <Title order={3} align='center' mt='xl'>Change Username</Title>
                <PasswordInput
                    withAsterisk
                    leftSection={<IconLock />}
                    variant='filled'
                    mt="md"
                    label="Current password"
                    placeholder="Current password"
                    key={usernameForm.key('currentPassword')}
                    {...usernameForm.getInputProps('currentPassword')}
                />
                <TextInput
                    variant='filled'
                    mt='sm'
                    label='New username'
                    placeholder='New username'
                    leftSection={<IconUser />}
                    key={usernameForm.key('username')}
                    {...usernameForm.getInputProps('username')}
                >
                </TextInput>
                <Group justify='flex-end' mt='md'>
                    <Button type="submit" disabled={!usernameForm.isValid()}>Submit</Button>
                </Group>
            </form>
            <form
                onSubmit={passwordForm.onSubmit(async (values) => {
                    if (await updateUserPassword(values)) {
                        passwordForm.reset(); // Clear the form
                    }
                })}
            >
                <Title order={3} align='center' mt='xl'>Change Password</Title>
                <PasswordInput
                    withAsterisk
                    leftSection={<IconLock />}
                    variant='filled'
                    mt="md"
                    label="Current password"
                    placeholder="Current password"
                    key={passwordForm.key('currentPassword')}
                    {...passwordForm.getInputProps('currentPassword')}
                />

                <PasswordInputWithStrength
                    mt="lg"
                    label="New password"
                    placeholder="New password"
                    description='Strength meter is just a suggestion.'
                    key={passwordForm.key('newPassword')}
                    {...passwordForm.getInputProps('newPassword')}
                />

                <PasswordInput
                    withAsterisk
                    mt="sm"
                    label="Confirm new password"
                    placeholder="Confirm new password"
                    key={passwordForm.key('confirmPassword')}
                    {...passwordForm.getInputProps('confirmPassword')}
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit"
                        disabled={!passwordForm.isValid()}
                    >
                        Submit
                    </Button>
                </Group>
            </form>
        </Box>
    );
}