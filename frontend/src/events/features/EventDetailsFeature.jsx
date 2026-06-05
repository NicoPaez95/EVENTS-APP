/**
 * @file EventDetailsFeature.jsx
 * @description State container and data orchestrator for the event details experience.
 * Coordinates route parsing, authentication state checking, and domain-level recommendation computations.
 * Fires layout action callbacks upward to page orchestrators to handle side features.
 * @module features/events/containers/EventDetailsFeature
 * @author Nico Paez
 */

import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Domain Hooks
import { useAuth } from "../../user/hooks/useAuth";
import useToggleEventSave from "../../user/hooks/useToggleEventSave";
import { useEvents } from "../hooks/useEvents";

// Utils & Domain Logic
import { findEventById } from "events/utils/eventHelpers";
import { getRelatedEvents } from "../utils/recommendationEngine";

// Presentational Components
import EventDetail from "../components/EventDetail";
import EventGrid from "../components/EventGrid";

// Shared UI
import LoadingState from "../../shared/components/UI/LoadingState";
import NotFound from "../../shared/components/UI/NotFound";
import PageHeader from "shared/components/UI/PageHeader";

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
 * @param {Object} props - Component properties.
 * @param {function(Event): void} props.onTriggerCheckout - Pipeline interceptor callback targeting transactional layout managers.
 * @param {function(): void} props.onLocationFocusRequested - Bubble-up notification when the user interacts with venue locations.
 * @param {function(Event): void} [props.onEventLoaded] - Communication channel providing the loaded entity payload up to the page.
 * @returns {React.JSX.Element} The completed feature presentation layout tree or structural fallback components.
 */
const EventDetailsFeature = ({
  onTriggerCheckout,
  onLocationFocusRequested,
  onEventLoaded,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { onToggleSave, isEventSaved } = useToggleEventSave();
  const { allEvents, loading } = useEvents();

  const event = useMemo(() => {
    return findEventById(allEvents, id);
  }, [allEvents, id]);

  useEffect(() => {
    if (event && onEventLoaded) {
      onEventLoaded(event);
    }
  }, [event, onEventLoaded]);

  const handleSecureTickets = (targetEvent) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
    } else if (onTriggerCheckout) {
      onTriggerCheckout(targetEvent);
    }
  };

  const relatedEvents = useMemo(() => {
    return getRelatedEvents(event, allEvents);
  }, [event, allEvents]);

  if (loading) {
    return <LoadingState message="Loading experience details..." />;
  }

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
    <div className="space-y-12">
      {/* Structural Experience Layout Frame */}
      <section aria-label="Event Details">
        <EventDetail
          event={event}
          isAuthenticated={isAuthenticated}
          onSecureTickets={() => handleSecureTickets(event)}
          onBack={() => navigate(-1)}
          onLocationClick={onLocationFocusRequested}
          onToggleSave={onToggleSave}
          isSaved={isEventSaved ? isEventSaved(event.id) : false}
        />
      </section>

      {/* Core Domain Recommendations Subtree */}
      <div className="space-y-8">
        <PageHeader title="Similar Experiences" level={3} />

        <EventGrid
          events={relatedEvents}
          onToggleSave={onToggleSave}
          isEventSaved={isEventSaved}
          onDirectPurchase={handleSecureTickets}
        />
      </div>
    </div>
  );
};

export default EventDetailsFeature;
