import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { Outlet } from 'react-router-dom';
import { IconUserCircle } from '@tabler/icons-react'

// This component is a wrapper for the protected routes that adds a nav bar with a header
// Icons from https://tabler.io/icons 


export function CollapseDesktop({ children }) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    class navLink {
        constructor(label, href, icon) {
            this.label = label;
            this.href = href;
            this.icon = icon;
        }
    }
    const navLinks = [
        new navLink("Account", "/account", <IconUserCircle size="1rem" stroke={1.5} />),
        //new navLink(...)
    ];

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
                {navLinks.map((navLink) => {
                    return <NavLink 
                        key={navLink.label}
                        label={navLink.label}
                        href={navLink.href}
                        leftSection={navLink.icon}
                    />
                })}
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}