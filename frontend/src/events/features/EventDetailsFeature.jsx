/**
 * @file EventDetailsFeature.jsx
 * @description State container and data orchestrator for the event details experience.
 * Coordinates route parsing, authentication state checking, modal states, micro-interactions (scrolling, highlighting),
 * and domain-level recommendation computations.
 * @module features/events/containers/EventDetailsFeature
 * @author Nico Paez
 */

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
 * @typedef {Object} Venue
 * @property {string} name - The legal or commercial name of the physical building/location.
 * @property {string} city - The city name used for geospatial targeting and weather resolution.
 */

/**
 * @typedef {Object} Event
 * @property {string|number} id - The unique atomic resource identification signature.
 * @property {string} [title] - The human-readable name of the experience.
 * @property {string} [category] - The operational classification tag for recommendation filters.
 * @property {string} [date] - ISO string stamp or standard representation of the event calendar day.
 * @property {string} [description] - Full length narrative detailing the event features.
 * @property {string} [image] - Asset filename signature or fully-qualified URL for banner resolution.
 * @property {Venue} venue - Embedded structural data regarding location logistics.
 */

/**
 * EventDetailsFeature Component.
 *
 * High-order smart container acting as the single source of truth for the details view.
 * Handles side-effects, coordinates state machines, and enforces route safety metrics.
 *
 * @component
 * @category Features/Events
 * @returns {React.JSX.Element} The completed feature presentation layout tree or structural fallback components.
 */
const EventDetailsFeature = () => {
  /**
   * Route parameter dictionary containing the unique identification signature.
   * @type {{ id: string }}
   */
  const { id } = useParams();

  /** @type {import('react-router-dom').NavigateFunction} */
  const navigate = useNavigate();

  /** @type {import('react-router-dom').Location} */
  const location = useLocation();

  /**
   * Context state variables derived from the identity provider domain.
   * @type {{ isAuthenticated: boolean }}
   */
  const { isAuthenticated } = useAuth();

  /**
   * Cross-domain cross-cutting custom hook state bindings.
   * @type {{ onToggleSave: function(string|number): void, isEventSaved: function(string|number): boolean }}
   */
  const { onToggleSave, isEventSaved } = useToggleEventSave();

  /**
   * Data provider fetch payload boundaries.
   * @type {{ allEvents: Event[], loading: boolean }}
   */
  const { allEvents, loading } = useEvents();

  /**
   * Toggle switch controlling visibility of the payment modal layer.
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  /**
   * References the viewport scroll boundary node hosting the tracking map canvas.
   * @type {React.RefObject<HTMLDivElement|null>}
   */
  const mapSectionRef = useRef(null);

  /**
   * Reactive visual accent controller used to flash visual cues on the container node.
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [isMapHighlighted, setIsMapHighlighted] = useState(false);

  /**
   * Memoized target event derived via memory references parsing the global repository array.
   *
   * @type {Event | undefined}
   */
  const event = useMemo(() => {
    return findEventById(allEvents, id);
  }, [allEvents, id]);

  /**
   * Triggers a hardware-accelerated smooth viewport shift animation targeting the structural ref element,
   * injecting temporary micro-interaction accent borders.
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
   * Enforces transactional pipeline security filters.
   * Intercepts anonymous actions, serializing history state parameters to support post-login redirection.
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
   * Memoized array of structurally recommended companion events generated via the application heuristics engine.
   *
   * @type {Event[]}
   */
  const relatedEvents = useMemo(() => {
    return getRelatedEvents(event, allEvents);
  }, [event, allEvents]);

  // Early Return Isolation Layer: Repository Async Process Validation Interceptor
  if (loading) {
    return <LoadingState message="Loading experience details..." />;
  }

  // Early Return Isolation Layer: Domain Reference Validation Interceptor
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
      {/* Checkout Transactional Layer */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        event={event}
      />

      {/* Structural Experience Layout Frame */}
      <section aria-label="Event Details">
        <EventDetail
          event={event}
          isAuthenticated={isAuthenticated}
          onSecureTickets={handleSecureTickets}
          onBack={() => navigate(-1)}
          onLocationClick={handleLocationFocus}
          onToggleSave={onToggleSave}
          isSaved={isEventSaved ? isEventSaved(event.id) : false}
        />
      </section>

      {/* Secondary Context Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Core Domain Recommendations Subtree */}
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

        {/* Informational Geospatial Sidebar Content Node */}
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
