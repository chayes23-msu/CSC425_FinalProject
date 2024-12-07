import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { Outlet } from 'react-router-dom';
import IconUser from '../assets/icon-components/IconUser';
import { useNavigate } from 'react-router-dom';
import IconLogout from '../assets/icon-components/IconLogout';
import { useAuth } from '../authentication/AuthProvider';
import IconUsers from '../assets/icon-components/IconUsers';

// This component is a wrapper for the protected routes that adds a nav bar with a header
// The code was found at https://mantine.dev/core/app-shell/ 
// Icons from https://tabler.io/icons 


export function CollapseDesktop({ children }) {
    const navigate = useNavigate();
    const auth = useAuth();
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    class navLink {
        constructor(label, route, icon) {
            this.label = label;
            this.route = route;
            this.icon = icon;
        }
    }
    const navLinks = [
        new navLink("Account", "/account", <IconUser size="1rem" stroke={1.5} />),
        new navLink("Animal Fields", "/animal-fields", <IconUser size="1rem" stroke={1.5} />),
    ];

    const handleNavLinkClick = (route) => {
        navigate(route);
    }

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                    <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    <MantineLogo size={30} />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                Navigation
                {!!auth.user.isAdmin && <NavLink 
                        component="button"
                        key="User Management"
                        label="User Management"
                        leftSection={<IconUsers size="1rem" stroke={1.5} />}
                        onClick={() => handleNavLinkClick("/user-management")}
                    />}
                {navLinks.map((navLink) => {
                    return <NavLink 
                        component="button"
                        key={navLink.label}
                        label={navLink.label}
                        leftSection={navLink.icon}
                        onClick={() => handleNavLinkClick(navLink.route)}
                    />
                })}
                {<NavLink
                    component="button"
                    key="Logout"
                    label="Logout"
                    rightSection={<IconLogout size="1rem" stroke={1.5} />}
                    onClick={() => handleNavLinkClick("/logout")}
                    />
                }
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}