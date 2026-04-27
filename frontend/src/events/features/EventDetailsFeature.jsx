import { useState, useMemo, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Domain Hooks
import { useEvents } from "../hooks/useEvents";
import { useAuth } from "../../user/hooks/useAuth";

// Utils & Domain Logic
import { getRelatedEvents } from "../utils/recommendationEngine";
import { findEventById } from "events/utils/eventHelpers";

// Features & Integrations
import CheckoutModal from "../features/CheckoutModal/CheckoutModal";
import WeatherFeature from "../features/WeatherFeature";
import EventMapFeature from "../features/EventMapFeature";

// Presentational Components
import EventDetail from "../components/EventDetail";
import EventGrid from "../components/EventGrid";

// Shared UI (Atoms)
import LoadingState from "../../shared/components/UI/LoadingState";
import NotFound from "../../shared/components/UI/NotFound";

/**
 * EventDetailsFeature (Orchestrator).
 * * This smart component serves as the main entry point for the event details experience.
 * It coordinates:
 * 1. Data fetching and selection from the global master catalog.
 * 2. Navigation logic with Auth-guards (preserving redirect state).
 * 3. Interactive UI feedback (scroll-to-map focus).
 * 4. Business logic for related event recommendations.
 * * @component
 * @category Features/Events
 * @returns {JSX.Element} The full-page event detail experience.
 */
const EventDetailsFeature = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  /**
   * Global State Consumption.
   * Uses 'allEvents' to ensure the event is found via direct URL access
   * regardless of current active search filters in the global context.
   */
  const { allEvents, loading } = useEvents();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Map Interaction State & Refs
  const mapSectionRef = useRef(null);
  const [isMapHighlighted, setIsMapHighlighted] = useState(false);

  /**
   * Memoized Event Selection.
   * Finds the specific event in the master list based on the URL parameter.
   * Prevents unnecessary re-computations unless the catalog or ID changes.
   * @type {Object|undefined}
   */
  const event = useMemo(() => {
    return findEventById(allEvents, id);
  }, [allEvents, id]);

  /**
   * Handles UI focus on the Map section.
   * Performs a smooth scroll to the map element and triggers a visual
   * highlight effect using Tailwind ring utilities.
   */
  const handleLocationFocus = () => {
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setIsMapHighlighted(true);
      setTimeout(() => setIsMapHighlighted(false), 2000);
    }
  };

  /**
   * Auth-guarded checkout initiation.
   * If unauthenticated, it redirects to /login but passes the current
   * pathname in the 'state' to allow a seamless return after login.
   */
  const handleSecureTickets = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
    } else {
      setIsCheckoutOpen(true);
    }
  };

  /**
   * Related Experiences Logic.
   * Memoizes the output of the recommendation engine to avoid
   * re-calculating suggestions on every render.
   * @type {Array<Object>}
   */
  const relatedEvents = useMemo(() => {
    return getRelatedEvents(event, allEvents);
  }, [event, allEvents]);

  // Loading Guard: Displays a centered skeleton/spinner
  if (loading) {
    return <LoadingState message="Loading experience details..." />;
  }

  // Error Guard: Renders a 404 state if ID doesn't match any event in catalog
  if (!event) {
    return (
      <NotFound
        title="Event not found"
        message="The experience you're looking for might have been removed or moved."
        link="/events"
        linkText="Back to all events"
      />
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-12 animate-in fade-in duration-500 px-4">
      {/* Portaled Checkout Layer */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        event={event}
      />

      {/* Primary Detail Hero Section */}
      <section aria-label="Event Details">
        <EventDetail
          event={event}
          isAuthenticated={isAuthenticated}
          onSecureTickets={handleSecureTickets}
          onBack={() => navigate(-1)}
          onLocationClick={handleLocationFocus}
        />
      </section>

      {/* Content Grid: Recommendations and Venue Logic */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recommended Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <h3 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Similar Experiences
          </h3>
          <EventGrid events={relatedEvents} />
        </div>

        {/* Sidebar: Contextual Information & Map */}
        <aside className="lg:col-span-1 space-y-8">
          <h3 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Venue & Logistics
          </h3>

          {/* Interactive Map Section with Dynamic Focus Ring */}
          <div
            ref={mapSectionRef}
            className={`transition-all duration-700 rounded-3xl ${
              isMapHighlighted
                ? "ring-4 ring-blue-400 ring-offset-4 shadow-2xl scale-[1.02]"
                : "ring-0 shadow-none scale-100"
            }`}
          >
            <EventMapFeature venue={event.venue} />
          </div>

          {/* Environmental Data (Weather API Integration) */}
          <div className="space-y-4">
            <WeatherFeature location={event.venue?.city} />

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed italic">
                {"Note: Weather forecasts for "}
                <strong>{event.venue?.city}</strong>
                {" are updated in real-time. "}
                {"Don't forget to check the map for the best route to "}
                <strong>{event.venue?.name}</strong>.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EventDetailsFeature;
