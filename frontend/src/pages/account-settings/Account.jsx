import { useForm } from '@mantine/form';
import { Button, Box, PasswordInput, Group, Title } from '@mantine/core';
import { FinalProjectAPI as api } from '../../apis/FinalProjectAPI';
import { useAuth } from '../../authentication/AuthProvider';
import PasswordInputWithStrength from '../../components/PasswordInputWithStrength';
import IconLock from '../../assets/icon-components/IconLock';
import { notifications } from '@mantine/notifications';

export default function Account() {
    const auth = useAuth();

    const updateUserPassword = async (values) => {
        try {
            await api.updateUserPassword(auth.user.userID, { password: values.newPassword, currentPassword: values.currentPassword });
            console.log('Password updated');
            notifications.show({title: "Success!", message: "Password changed successfully", color: 'teal'});
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const form = useForm({
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

    return (
        <Box maw={340} mx="auto">
            <Title order={1} align='center'>Account Settings</Title>
            <form
                onSubmit={form.onSubmit(async (values) => {
                    if (await updateUserPassword(values)) {
                        form.reset(); // Clear the form
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
                    key={form.key('currentPassword')}
                    {...form.getInputProps('currentPassword')}
                />

                <PasswordInputWithStrength
                    mt="lg"
                    label="New password"
                    placeholder="New password"
                    description='Strength meter is just a suggestion.'
                    key={form.key('newPassword')}
                    {...form.getInputProps('newPassword')}
                />

                <PasswordInput
                    withAsterisk
                    mt="sm"
                    label="Confirm new password"
                    placeholder="Confirm new password"
                    key={form.key('confirmPassword')}
                    {...form.getInputProps('confirmPassword')}
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit"
                        disabled={!form.isValid()}
                    >
                        Submit
                    </Button>
                </Group>
            </form>
        </Box>
    );
}