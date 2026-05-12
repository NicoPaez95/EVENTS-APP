import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import EventDetailPage from "../pages/events/EventDetailPage";
import UpcomingEventsPage from "../pages/events/UpcomingEventsPage";
import SavedEventsPage from "../pages/user/SavedEventsPage";
import Auth from "../pages/user/Auth";
import Profile from "../pages/user/Profile";
import ProtectedRoute from "../shared/components/guards/ProtectedRoute";
import MainLayout from "../shared/components/Layout/MainLayout";

/**
 * AppRouter Component (Root Navigation Orchestrator).
 *
 * This component centralizes the application's routing strategy. It acts as the
 * top-level orchestrator that maps browser URLs to Page-level components while
 * managing global UI states through Layout nesting.
 *
 * Architectural Strategy:
 * - Nested Routing: Leverages `MainLayout` as a wrapper to provide a persistent
 *   UI Shell (Header/Sidebar) across primary discovery routes.
 * - Guarded Access: Encapsulates private domains (Profile, Saved Events) within
 *   the `ProtectedRoute` higher-order component to enforce authentication.
 * - Dynamic Layouts: Conditionally configures the UI Shell (e.g., disabling
 *   the sidebar for focused detail views) directly within the route definition.
 * - Clean Auth Flow: Renders Authentication pages without the main layout to
 *   ensure a distraction-free user experience.
 *
 * @component
 * @category Router
 * @returns {JSX.Element} The declarative routing tree wrapped in BrowserRouter.
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Primary UI Shell Layer (Standard View with Sidebar) --- */}
        <Route element={<MainLayout />}>
          {/**
           * Home: The default discovery hub.
           * Inherits the full MainLayout configuration.
           */}
          <Route path="/" element={<Home />} />

          {/** Upcoming Events: Filtered discovery stream */}
          <Route path="/events/upcoming" element={<UpcomingEventsPage />} />

          {/**
           * Protected User Domain:
           * Routes that require an active session and the persistent UI Shell.
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
        </Route>

        {/* --- Focused Content Layer (Full-width View, No Sidebar) --- */}
        <Route
          path="/events/:id"
          element={
            <MainLayout showSidebar={false}>
              <EventDetailPage />
            </MainLayout>
          }
        />

        {/* --- Independent Layer (Minimalist View, No Layout) --- */}
        {/**
         * Auth: Login and Registration flows.
         * Rendered independently to maximize focus and minimize navigation noise.
         */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        {/* --- Global Fallback Layer --- */}
        {/** Redirects any undefined paths back to the home entry point */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
