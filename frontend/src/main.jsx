import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import Login from './Login.jsx'
import AuthProvider from './AuthProvider.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>,
);
