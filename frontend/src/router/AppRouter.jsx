import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import EventDetailPage from "../pages/events/EventDetailPage";
import UpcomingEventsPage from "../pages/events/UpcomingEventsPage";
import SavedEventsPage from "../pages/user/SavedEventsPage";
import Auth from "../pages/user/Auth";
import Profile from "../pages/user/Profile";
import ProtectedRoute from "../shared/components/guards/ProtectedRoute";

/**
 * AppRouter Component (Root Navigation Orchestrator).
 *
 * This component centralizes the application's routing strategy using React Router v6.
 * It serves as the top-level orchestrator that maps browser URLs to Page-level components.
 *
 * **Key Architectural Features**:
 * 1. **Dynamic Routing**: Implements parameter capturing via `:id` for event-specific views.
 * 2. **Authentication Guards**: Utilizes the `ProtectedRoute` wrapper to enforce session
 * validation on private user domains.
 * 3. **Unified Auth Handling**: Maps multiple authentication intents (login/register)
 * to a single domain orchestrator.
 * 4. **Resilience Logic**: Features a wildcard fallback to prevent dead-ends in the UX.
 *
 * @component
 * @category Router
 * @returns {JSX.Element} The declarative routing tree wrapped in BrowserRouter.
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Discovery Layer --- */}

        {/** Home entry point */}
        <Route path="/" element={<Home />} />

        {/** * Dynamic Event Detail Route:
         * Uses ':id' as a placeholder to allow EventDetailPage to perform
         * contextual data fetching from the master catalog.
         */}
        <Route path="/events/:id" element={<EventDetailPage />} />

        {/** Filtered event discovery view */}
        <Route path="/events/upcoming" element={<UpcomingEventsPage />} />

        {/* --- Authentication Layer --- */}

        {/** * Both login and registration flows are managed by the Auth orchestrator,
         * which switches internal features based on the pathname.
         */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        {/* --- Private / Protected Layer --- */}

        {/** * User Profile:
         * Wrapped in ProtectedRoute to redirect unauthenticated users to /login.
         */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/** * Saved Events (Personal Agenda):
         * Secure route for managing user-specific bookmarked events.
         */}
        <Route
          path="/user/saved-events"
          element={
            <ProtectedRoute>
              <SavedEventsPage />
            </ProtectedRoute>
          }
        />

        {/* --- Fallback & Safety Layer --- */}

        {/** * Wildcard Redirect:
         * Catches any undefined paths and performs a 'replace' redirect to Home.
         * This prevents the history stack from growing with invalid URLs.
         */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
