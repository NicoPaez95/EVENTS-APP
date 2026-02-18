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

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import CategoryEvents from '../categories/pages/CategoryEvents';
import Events from '../events/pages/Events';


// ===============================
// Home Page Composition
// -------------------------------
// Composes the main landing page ("/").
//
// - Renders CategoryEvents section.
// - Renders Events list section.
// - Acts as a page-level container.
// ===============================

const Home = () => {
  return (
    <main>
      <CategoryEvents />
      <Events />
    </main>
  );
};


// ===============================
// Router Definition
// -------------------------------
// Defines application route mapping.
//
// "/"  → Home page
// "*"  → Redirects to "/"
// ===============================

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Fallback route for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
