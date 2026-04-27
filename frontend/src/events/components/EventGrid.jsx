import EventCard from "./EventCard";

/**
 * @typedef {Object} Event
 * @property {string|number} id
 * @property {Object} venue
 * @property {string} venue.name
 * @property {string} venue.city
 * // Add additional event properties as needed (title, date, image, etc.)
 */

/**
 * @typedef {Object} EventGridProps
 * @property {Event[]} events - Collection of event objects to render.
 * @property {(id: string|number) => void} onToggleSave - Handler for save/unsave interaction.
 * @property {(id: string|number) => boolean} [isEventSaved] - Optional selector to determine if an event is saved.
 */

/**
 * EventGrid (Presentational Component)
 *
 * Stateless grid renderer for event collections.
 * Maps a list of events into EventCard components.
 *
 * Responsibilities:
 * - Render event collection
 * - Delegate interaction handlers
 * - Remain UI-focused (no business logic)
 *
 * @component
 * @category Components/Events
 * @param {EventGridProps} props
 * @returns {JSX.Element}
 */
const EventGrid = ({ events = [], onToggleSave, isEventSaved }) => {
  /**
   * Empty state guard
   */
  if (!events || events.length === 0) {
    return (
      <div className="py-10 text-center text-slate-400 italic">
        No events found for this selection.
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      role="list"
      aria-label="Event catalog grid"
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          {...event}
          onToggleSave={onToggleSave}
          /**
           * Derived UI state:
           * Determines whether the event is saved.
           * Falls back to false if selector is not provided.
           */
          isSaved={isEventSaved ? isEventSaved(event.id) : false}
        />
      ))}
    </div>
  );
};

export default EventGrid;
