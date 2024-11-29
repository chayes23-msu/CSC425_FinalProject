import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './authentication/AuthProvider.jsx';
import { CollapseDesktop } from './CollapseDesktop.jsx';
import './index.css';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import { NotFound } from './pages/not-found/NotFound.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import AnimalDetailsPage from './pages/animal-details/AnimalDetailsPage.jsx';

export default function App() {
    const auth = useAuth();
    const theme = createTheme({

    });

    return (
        <MantineProvider theme={theme}  defaultColorScheme='dark'>
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
                            <Route path="/account" element={<h1>Account</h1>} />
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
