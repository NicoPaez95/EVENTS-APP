// ===============================
// EventGrid Component
// -------------------------------
// Renders a responsive grid of EventCard components.
//
// - Receives an array of event objects via props.
// - Uses CSS Grid with auto-fit + minmax to create
//   a fluid, breakpoint-free responsive layout.
// - Each card has a minimum width of 280px and
//   expands to fill available space.
// ===============================

import EventCard from './EventCard';

const EventGrid = ({ events = [] }) => {
  // Guard clause: prevents rendering errors
  // if events is undefined or empty
  if (!events.length) {
    return <p>No events found.</p>;
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
          key={event.id} // React requires a stable unique key for list rendering
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
