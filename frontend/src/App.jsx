import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './index.css'
import Login from './Login.jsx'
import PrivateRoute from './PrivateRoute.jsx';
import { useAuth } from './AuthProvider';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';


export default function App() {
    const auth = useAuth();
    const theme = createTheme({

    });

    return (
        <MantineProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        auth.token ? <Navigate to="/ex" replace /> : <Navigate to="/login" replace />
                    } />
                    <Route path="/login" element={
                        auth.token ? <Navigate to="/ex" replace /> : <Login replace />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/ex" element={<h1>You&apos;ve logged in!!!</h1>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
}
