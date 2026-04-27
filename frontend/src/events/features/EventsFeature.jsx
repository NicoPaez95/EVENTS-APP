import { useEvents } from "../hooks/useEvents";
import EventGrid from "../components/EventGrid";

import LoadingState from "shared/components/UI/LoadingState";
import EmptyState from "shared/components/UI/EmptyState";

import useToggleEventSave from "../../user/hooks/useToggleEventSave";

/**
 * @typedef {Object} Event
 * @property {string|number} id
 * @property {Object} venue
 * @property {string} venue.name
 * @property {string} venue.city
 */

/**
 * EventsFeature (Orchestrator)
 *
 * Main controller for the event discovery experience.
 * Coordinates event data retrieval with user interaction logic.
 *
 * Responsibilities:
 * - Fetch and render event collections
 * - Handle global loading and empty states
 * - Inject user interaction handlers (save/unsave)
 * - Bridge Events domain with User domain
 *
 * @component
 * @category Features/Events
 * @returns {JSX.Element}
 */
const EventsFeature = () => {
  /**
   * Event domain state (filtered collection)
   *
   * @type {{ events: Event[], loading: boolean }}
   */
  const { events, loading } = useEvents();

  /**
   * User interaction logic (use-case hook)
   *
   * @type {{
   *   onToggleSave: (id: string|number) => void,
   *   isEventSaved: (id: string|number) => boolean
   * }}
   */
  const { onToggleSave, isEventSaved } = useToggleEventSave();

  /**
   * Loading state guard
   */
  if (loading) {
    return <LoadingState message="Searching for experiences..." />;
  }

  /**
   * Empty state guard
   */
  if (!events.length) {
    return <EmptyState message="No events found matching your criteria." />;
  }

  return (
    <section
      aria-label="Event Results"
      className="animate-in fade-in duration-500"
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6 font-display">
        Explore Events
      </h2>

      {/* Event Grid (Presentational Layer) */}
      <EventGrid
        events={events}
        onToggleSave={onToggleSave}
        isEventSaved={isEventSaved}
      />
    </section>
  );
};

export default EventsFeature;
