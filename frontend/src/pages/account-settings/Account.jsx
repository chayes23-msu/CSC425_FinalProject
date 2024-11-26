import { useForm } from '@mantine/form';
import { Button, Box, PasswordInput, Group, Title, TextInput } from '@mantine/core';
import { FinalProjectAPI as api } from '../../apis/FinalProjectAPI';
import { useAuth } from '../../authentication/AuthProvider';
import PasswordInputWithStrength from '../../components/PasswordInputWithStrength';
import IconLock from '../../assets/icon-components/IconLock';
import { showErrorNotification, showSuccessNotification } from '../../notifications/notificationFunctions.jsx';
import IconUser from '../../assets/icon-components/IconUser.jsx';

export default function Account() {
    const auth = useAuth();

    const updateUserPassword = async (values) => {
        try {
            await api.updateUserPassword(auth.user.userID, { password: values.newPassword, currentPassword: values.currentPassword });
            showSuccessNotification("Password updated successfully");
            console.log('Password updated');
            return true;
        } catch (err) {
            showErrorNotification(err.response?.data);
            console.error(err);
            return false;
        }
    };

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

    const usernameForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: auth.user.username,
        },
        validateInputOnChange: true,

        validate: {
            username: (value) => !value ? 'New username is required' : value === auth.user.username ? 'New username cannot be the same as the old one' : null,
        },
    });

    return (
        <Box maw={340} mx="auto">
            <Title order={1} align='center'>Account Settings</Title>
            {true && (<form
                
            >
                <Title order={3} align='center' mt='xl'>Change Username</Title>
                <TextInput 
                    variant='filled' 
                    mt='md'
                    label='New username'
                    placeholder='New username'
                    leftSection={<IconUser />}
                    key={usernameForm.key('username')}
                    {...usernameForm.getInputProps('username')}
                >
                </TextInput>
            </form>)}
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