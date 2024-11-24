import { Notification } from "@mantine/core";
import IconX from "../assets/icon-components/IconX";


export default function ErrorNotification({ children, ...props }) {
    return (
        <Notification icon={<IconX />} {...props} color="red" title="Oops!">{children}</Notification>
    );
}