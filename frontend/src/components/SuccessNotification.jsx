import { Notification } from "@mantine/core";
import IconCheck from "../assets/icon-components/IconCheck";


export default function SuccessNotification({ children, ...props }) {
    return (
        <Notification icon={<IconCheck />} {...props} color="teal" title="Success!">{children}</Notification>
    );
}