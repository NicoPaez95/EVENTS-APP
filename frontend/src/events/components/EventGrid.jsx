import EventCard from './EventCard';

/**
 * EventGrid Component.
 * * Renders a fluid, responsive grid of EventCards using CSS Grid.
 * * It utilizes an 'auto-fit' and 'minmax' strategy to handle responsiveness 
 * without the need for explicit media query breakpoints.
 * * @component
 * @param {Object} props - Component properties.
 * @param {Object[]} props.events - List of event objects to be displayed.
 * @param {string|number} props.events[].id - Unique identifier for the event.
 * @param {string} props.events[].title - The headline of the event.
 * @param {string} props.events[].date - The scheduled date.
 * @param {string} props.events[].location - Venue or city (e.g., Córdoba).
 * @param {string} props.events[].category - The event classification.
 * @returns {JSX.Element} A responsive section grid or a fallback message.
 */
const EventGrid = ({ events = [] }) => {
  // Guard clause: prevents rendering errors if events is undefined or empty
  if (!events.length) {
    return <p className="text-center text-slate-500">No events found.</p>;
  }

  return (
    <section
      className="
        grid
        gap-6
        px-4
        [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]
      "
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          location={event.location}
          category={event.category}
        />
      ))}
    </section>
  );
};

export default EventGrid;