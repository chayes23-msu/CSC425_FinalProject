import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './authentication/AuthProvider.jsx';
import { CollapseDesktop } from './components/CollapseDesktop.jsx';
import './index.css';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import { NotFound } from './pages/not-found/NotFound.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AnimalDetailsPage from './pages/animal-details/AnimalDetailsPage.jsx';import Account from './pages/account-settings/Account.jsx';
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
                            <Route path="/home" element={
                                <Home />
                            } />
                            <Route path="/animal/:id" element={<AnimalDetailsPage />}></Route>
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
}
