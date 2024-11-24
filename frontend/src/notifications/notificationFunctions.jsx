import { notifications } from '@mantine/notifications';
import IconCheck from '../assets/icon-components/IconCheck';
import IconX from '../assets/icon-components/IconX';

export const showSuccessNotification = (message) => {
  notifications.show({
    title: "Success!",
    message,
    color: 'teal',
    icon: <IconCheck />,
  });
};

export const showErrorNotification = (message) => {
  notifications.show({
    title: "Oops!",
    message,
    color: 'red',
    icon: <IconX />,
  });
};