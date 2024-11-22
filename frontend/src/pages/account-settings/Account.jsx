import { useForm } from '@mantine/form';
import { Button, Container, TextInput, Title, PasswordInput } from '@mantine/core';
import { FinalProjectAPI as api } from '../../apis/FinalProjectAPI';
import { useEffect, useState } from 'react';
import { useAuth } from '../../authentication/AuthProvider';

export default function Account() {
    const auth = useAuth();
    const [userData, setUserData] = useState(auth.user);

    const updateUserData = async () => {
        try {
            const resp = await api.getUser(auth.user.userID);
            setUserData(resp);
        } catch (err) {
            console.error(err);
        }
    };  

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: auth.user.username,
            newPassword: '',
            confirmPassword: ''
        }
    });
}