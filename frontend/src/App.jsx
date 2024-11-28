import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './index.css'
import Login from './pages/login/Login.jsx'
import PrivateRoute from './components/PrivateRoute.jsx';
import { useAuth } from './authentication/AuthProvider.jsx';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { CollapseDesktop } from './components/CollapseDesktop.jsx';
import { NotFound } from './pages/not-found/NotFound.jsx';
import Account from './pages/account-settings/Account.jsx';
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css';
import Logout from './pages/logout/Logout.jsx';


export default function App() {
    const auth = useAuth();

    // Theme object for mantine components. Change this to change the look of the page.
    const theme = createTheme({

    });

    return (
        <MantineProvider theme={theme} defaultColorScheme='dark'> {/* MantineProvider is a wrapper for the app that provides the theme to all the components */}
            <Notifications autoClose={6000}/> {/* Notifications component from mantine...Notifications auto close after 6 secs */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        auth.loggedIn() ? <Navigate to="/ex" replace /> : <Navigate to="/login" replace />}
                    />
                    <Route path="/login" element={
                        auth.loggedIn() ? <Navigate to="/ex" replace /> : <Login />}
                    />
                    <Route element={<PrivateRoute />}>
                        <Route element={<CollapseDesktop />}>
                            <Route path="/ex" element={<h1>You&apos;ve logged in!!!</h1>} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/logout" element={<Logout />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
}
