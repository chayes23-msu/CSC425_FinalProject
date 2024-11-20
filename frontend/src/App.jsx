import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './index.css'
import Login from './Login.jsx'
import PrivateRoute from './PrivateRoute.jsx';
import { useAuth } from './AuthProvider.jsx';
import AuthProvider from './AuthProvider';


export default function App() {
    const auth = useAuth();

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={
                        auth?.token ? <Navigate to="/ex" replace /> : <Navigate to="/login" replace />
                    } />
                    <Route path="/login" element={
                        auth?.token ? <Navigate to="/ex" replace /> : <Login replace />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/ex" element={<h1>You&apos;ve logged in!!!</h1>} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>

    );
}
