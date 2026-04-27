import { useState, useMemo, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Domain Hooks
import { useEvents } from "../hooks/useEvents";
import { useAuth } from "../../user/hooks/useAuth";
import useToggleEventSave from "../../user/hooks/useToggleEventSave";

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

// Shared UI
import LoadingState from "../../shared/components/UI/LoadingState";
import NotFound from "../../shared/components/UI/NotFound";

/**
 * @typedef {Object} Event
 * @property {string|number} id
 * @property {Object} venue
 * @property {string} venue.name
 * @property {string} venue.city
 */

/**
 * EventDetailsFeature (Orchestrator)
 *
 * Main container for the event detail experience.
 * Coordinates data retrieval, navigation guards, UI interactions,
 * and domain-level recommendations.
 *
 * Responsibilities:
 * - Resolve event by route param
 * - Handle auth-protected actions (checkout)
 * - Manage UI interactions (map focus, modal state)
 * - Provide related event recommendations
 * - Inject user interaction handlers (save/unsave)
 *
 * @component
 * @category Features/Events
 * @returns {JSX.Element}
 */
const EventDetailsFeature = () => {
  /** @type {{ id: string }} */
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated } = useAuth();
  const { onToggleSave, isEventSaved } = useToggleEventSave();

  /**
   * Global event catalog (unfiltered source of truth)
   */
  const { allEvents, loading } = useEvents();

  /** @type {[boolean, Function]} */
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  /** @type {React.RefObject<HTMLDivElement>} */
  const mapSectionRef = useRef(null);

  /** @type {[boolean, Function]} */
  const [isMapHighlighted, setIsMapHighlighted] = useState(false);

  /**
   * Resolves the current event from the global catalog.
   *
   * @type {Event | undefined}
   */
  const event = useMemo(() => {
    return findEventById(allEvents, id);
  }, [allEvents, id]);

  /**
   * Scrolls smoothly to the map section and applies
   * a temporary visual highlight.
   *
   * @function
   * @returns {void}
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
   * Handles secure ticket flow.
   * Redirects unauthenticated users to login,
   * preserving the current route for post-login return.
   *
   * @function
   * @returns {void}
   */
  const handleSecureTickets = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
    } else {
      setIsCheckoutOpen(true);
    }
  };

  /**
   * Computes related events using recommendation engine.
   *
   * @type {Event[]}
   */
  const relatedEvents = useMemo(() => {
    return getRelatedEvents(event, allEvents);
  }, [event, allEvents]);

  // Loading State
  if (loading) {
    return <LoadingState message="Loading experience details..." />;
  }

  // Not Found State
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
      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        event={event}
      />

      {/* Event Detail Section */}
      <section aria-label="Event Details">
        <EventDetail
          event={event}
          isAuthenticated={isAuthenticated}
          onSecureTickets={handleSecureTickets}
          onBack={() => navigate(-1)}
          onLocationClick={handleLocationFocus}
        />
      </section>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recommendations */}
        <div className="lg:col-span-2 space-y-8">
          <h3 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Similar Experiences
          </h3>

          <EventGrid
            events={relatedEvents}
            onToggleSave={onToggleSave}
            isEventSaved={isEventSaved}
          />
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          <h3 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Venue & Logistics
          </h3>

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
