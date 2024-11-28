import { notifications } from '@mantine/notifications';
import IconCheck from '../assets/icon-components/IconCheck';
import IconX from '../assets/icon-components/IconX';

/**
 * Shows a success message in the bottom right and has a checkmark icon
 * @param {string} message Message to show in the notification
 */
export const showSuccessNotification = (message) => {
  notifications.show({
    title: "Success!",
    message,
    color: 'teal',
    icon: <IconCheck />,
  });
};

/**
 * Shows an error message in the bottom right and has an X icon
 * @param {string} message Message to show in the notification
 */
export const showErrorNotification = (message) => {
  notifications.show({
    title: "Oops!",
    message,
    color: 'red',
    icon: <IconX />,
  });
};