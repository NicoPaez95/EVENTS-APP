import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home/Home';
import EventDetailPage from '../pages/events/EventDetailPage';
import UpcomingEventsPage from '../pages/events/UpcomingEventsPage';

/**
 * Main Application Router.
 * * * Centralizes the navigation logic using React Router v6.
 * * It acts as the root navigation orchestrator, mapping browser URLs 
 * to high-level Page components.
 * * Features:
 * - Dynamic parameter handling for individual event details.
 * - Chronological filtering routes for upcoming experiences.
 * - Global fallback (wildcard) to ensure UI resilience against broken links.
 * * @component
 * @category Router
 * @returns {JSX.Element} The routing tree wrapped in a BrowserRouter provider.
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Route: Root/Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Route: Dynamic Individual Event Details
            Captures :id to allow EventDetailsFeature to fetch specific data.
        */}
        <Route path="/events/:id" element={<EventDetailPage />} />

        {/* Route: Upcoming Experiences List
            Provides a dedicated view for time-proximity filtered events.
        */}
        <Route path="/events/upcoming" element={<UpcomingEventsPage />} />

        {/* Wildcard Route (*): 
          Acts as a global Error Boundary for navigation. 
          Uses 'replace' to prevent the invalid URL from staying in the browser history,
          ensuring a clean redirect back to Home.
        */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;