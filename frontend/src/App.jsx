import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './index.css'
import Login from './pages/login/Login.jsx'
import PrivateRoute from './PrivateRoute.jsx';
import { useAuth } from './authentication/AuthProvider.jsx';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { CollapseDesktop } from './CollapseDesktop.jsx';


export default function App() {
    const auth = useAuth();
    const theme = createTheme({

    });

    return (
        <MantineProvider theme={theme}>
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
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
}
