import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home/Home';
import EventDetailPage from '../pages/events/EventDetailPage';
import UpcomingEventsPage from '../pages/events/UpcomingEventsPage';
import SavedEventsPage from '../pages/user/SavedEventsPage';
import Auth from '../pages/user/Auth';
import Profile from '../pages/user/Profile';
import ProtectedRoute from '../user/components/ProtectedRoute';

/**
 * Main Application Router.
 * * This "Router" component centralizes the navigation logic using React Router v6.
 * It acts as the root orchestrator, mapping browser URLs to high-level Page components.
 * * Key Features:
 * - Dynamic parameter handling for individual event details via :id.
 * - Route Protection: Shields private user views from unauthorized access.
 * - Global fallback (wildcard) to ensure UI resilience against broken links.
 * * @component
 * @category Router
 * @returns {JSX.Element} The declarative routing tree wrapped in a BrowserRouter provider.
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Public Discovery Routes */}
        <Route path="/" element={<Home />} />
        
        {/**
         * Dynamic Event Details:
         * Captures :id to fetch specific event data in EventDetailPage.
         */}
        <Route path="/events/:id" element={<EventDetailPage />} />
        
        <Route path="/events/upcoming" element={<UpcomingEventsPage />} />

        {/* Authentication Routes:
            Both paths share the Auth.jsx orchestrator.
        */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        {/**
         * Private / Protected Routes:
         * These routes are wrapped in <ProtectedRoute /> to ensure only 
         * authenticated users can access personal data.
         */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/user/saved-events" 
          element={
            <ProtectedRoute>
              <SavedEventsPage />
            </ProtectedRoute>
          } 
        />

        {/* Wildcard Fallback:
            Redirects any undefined URL back to Home to maintain a clean history stack.
        */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;