import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home/Home';
import EventDetailPage from '../pages/events/EventDetailPage';
import UpcomingEventsPage from '../pages/events/UpcomingEventsPage';
import SavedEventsPage from '../pages/user/SavedEventsPage';

/**
 * Main Application Router.
 * * This "Router" component centralizes the navigation logic using React Router v6.
 * It acts as the root orchestrator, mapping browser URLs to high-level Page components.
 * * Key Features:
 * - Dynamic parameter handling for individual event details via :id.
 * - Dedicated views for chronological filtering and upcoming experiences.
 * - Global fallback (wildcard) to ensure UI resilience against broken links.
 * * @component
 * @category Router
 * @returns {JSX.Element} The declarative routing tree wrapped in a BrowserRouter provider.
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Root Route:
          Renders the main Landing/Discovery page.
        */}
        <Route path="/" element={<Home />} />

        {/* Dynamic Event Details Route:
          Captures :id parameter to allow the EventDetailPage to fetch 
          specific event data from the state or API.
        */}
        <Route path="/events/:id" element={<EventDetailPage />} />

        {/* Upcoming Experiences Route:
          Provides a dedicated view for events filtered by chronological proximity.
        */}
        <Route path="/events/upcoming" element={<UpcomingEventsPage />} />

        {/* User Saved Events Route:
          Displays the collection of experiences bookmarked by the user, 
          typically orchestrated by the SavedEventsListFeature.
        */}
        <Route path="/user/saved-events" element={<SavedEventsPage />} />

        {/* Wildcard Fallback Route (*):
          Acts as a global navigation guard. Redirects any undefined URL 
          back to the Home page using 'replace' to maintain a clean 
          browser history stack.
        */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;