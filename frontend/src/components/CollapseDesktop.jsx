import { AppShell, Burger, Button, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import IconUser from '../assets/icon-components/IconUser';
import { useNavigate } from 'react-router-dom';
import IconLogout from '../assets/icon-components/IconLogout';
import { useAuth } from '../authentication/AuthProvider';
import IconUsers from '../assets/icon-components/IconUsers';
import IconPallete from '../assets/icon-components/IconPallete';
import IconCow from '../assets/icon-components/IconCow';
import Logo from './Logo';
import IconSun from '../assets/icon-components/IconSun';
import { useMantineColorScheme } from '@mantine/core';

// This component is a wrapper for the protected routes that adds a nav bar with a header
// The code was found at https://mantine.dev/core/app-shell/ 
// Icons from https://tabler.io/icons 


export function CollapseDesktop({ children }) {
    const navigate = useNavigate();
    const auth = useAuth();
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const { setColorScheme, clearColorScheme, toggleColorScheme } = useMantineColorScheme();
    class navLink {
        constructor(label, route, icon) {
            this.label = label;
            this.route = route;
            this.icon = icon;
        }
    }
    const navLinks = [

        new navLink("Home", "/home", <IconCow size="1rem" stroke={1.5} />),
        new navLink("Animal Fields", "/animal-fields", <IconPallete size="1rem" stroke={1.5} />),
        new navLink("Account", "/account", <IconUser size="1rem" stroke={1.5} />),

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
                <Group h="100%" px="md" justify='space-between'>
                    <Group>
                        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                        <Logo />
                    </Group>
                    <Button onClick={() => {toggleColorScheme()}} mr='lg'>
                            <IconSun />
                    </Button>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                Navigation
                {navLinks.map((navLink) => {
                    return <NavLink
                        component="button"
                        key={navLink.label}
                        label={navLink.label}
                        leftSection={navLink.icon}
                        onClick={() => handleNavLinkClick(navLink.route)}
                    />
                })}
                {!!auth.user.isAdmin && <NavLink
                    component="button"
                    key="User Management"
                    label="User Management"
                    leftSection={<IconUsers size="1rem" stroke={1.5} />}
                    onClick={() => handleNavLinkClick("/user-management")}
                />}
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