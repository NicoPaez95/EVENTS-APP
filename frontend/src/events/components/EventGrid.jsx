import EventCard from './EventCard';

/**
 * EventGrid Component (Presentational).
 * * A stateless grid container that orchestrates the layout for event collections.
 * It follows a "Dumb Component" pattern, strictly mapping an array of event objects 
 * into individual EventCard components.
 * * @component
 * @category Components/Events
 * * @param {Object} props
 * @param {Array<Object>} props.events - Collection of event objects to be displayed.
 * @param {Function} props.onToggleSave - Callback function to handle save/unsave logic. Receives (eventId).
 * @param {Function} [props.isEventSaved] - Selector function to check persistence status. Receives (eventId) => Boolean.
 * * @returns {JSX.Element} A responsive grid layout of EventCards.
 */
const EventGrid = ({ 
  events = [], 
  onToggleSave, 
  isEventSaved 
}) => {
  
  // Empty state handling to prevent rendering issues
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
          /* Logic Gate: Checks if the event is saved in the user's calendar.
             Defaults to false if the check function is not provided.
          */
          isSaved={isEventSaved ? isEventSaved(event.id) : false}
        />
      ))}
    </div>
  );
};

export default EventGrid;