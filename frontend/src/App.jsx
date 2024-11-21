import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './index.css'
import Login from './Login.jsx'
import PrivateRoute from './PrivateRoute.jsx';
import { useAuth } from './AuthProvider';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { CollapseDesktop } from './CollapseDesktop.jsx';
import Home from './Home.jsx';


export default function App() {
    const auth = useAuth();
    const theme = createTheme({

    });

    return (
        <MantineProvider theme={theme}  defaultColorScheme='dark'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        auth.token ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
                    } />
                    <Route path="/login" element={
                        auth.token ? <Navigate to="/home" replace /> : <Login replace />}
                    />
                </Routes>
                <CollapseDesktop>
                    <Routes>
                        <Route element={<PrivateRoute />}>
                            <Route path="/home" element={
                                <Home />
                            } />
                        </Route>
                    </Routes>
                </CollapseDesktop>
            </BrowserRouter>
        </MantineProvider>
    );
}
