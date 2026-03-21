import EventCard from './EventCard';

/**
 * EventGrid Component (Presentational).
 * * A stateless grid container that orchestrates the layout for event collections.
 * It follows a "Dumb Component" pattern, strictly mapping an array of event objects 
 * into individual EventCard components.
 * * @component
 * @category Components
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.events - Array of event objects to be displayed in the grid.
 * @param {string|number} props.events[].id - Unique identifier for the event (used as key).
 * @param {string} props.events[].title - Headline for the event card.
 * @param {string} props.events[].date - Scheduled date and time.
 * @param {string} props.events[].location - Venue or geographic location.
 * @param {string} props.events[].category - Event classification (e.g., Music, Sports).
 * @returns {JSX.Element} A responsive CSS Grid containing the mapped EventCards.
 */
const EventGrid = ({ events = [] }) => (
  <div 
    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    role="list"
    aria-label="Event catalog grid"
  >
    {events.map((event) => (
      /**
       * Spread Operator Implementation:
       * We use {...event} to deconstruct the object and pass each property 
       * (id, title, date, etc.) as an individual prop to the EventCard.
       * This maintains compatibility with the EventCard's prop expectations.
       */
      <EventCard 
        key={event.id} 
        {...event} 
      />
    ))}
  </div>
);

export default EventGrid;