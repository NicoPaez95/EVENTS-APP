// ===============================
// AppRouter Configuration
// -------------------------------
// Centralizes application routing
// using React Router v6.
//
// - Wraps the app with BrowserRouter.
// - Defines all primary routes.
// - Handles unknown routes with a redirect.
// - Acts as the single routing source.
// ===============================

// ===============================
// Router Definition
// -------------------------------
// Defines application route mapping.
//
// "/"  → Home page
// "*"  → Redirects to "/"
// ===============================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../home/pages/Home';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home/>} />

        {/* Fallback route for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
