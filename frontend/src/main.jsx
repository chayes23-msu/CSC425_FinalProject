import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './index.css'
import Login from './Login.jsx'
import AuthProvider from './AuthProvider.jsx';
import PrivateRoute from './PrivateRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/ex" element={<h1>You've logged in!!!</h1>} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
  </StrictMode>,
);
