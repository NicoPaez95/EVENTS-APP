// ===============================
// EventGrid Component
// -------------------------------
// Responsible for rendering a list
// of EventCard components.
//
// Receives an array of event objects
// via props.
// ===============================

import EventCard from './EventCard';

const EventGrid = ({ events = [] }) => {
  // Defensive check in case events is undefined
  if (!events.length) {
    return <p>No events found.</p>;
  }

  return (
    <section>
      {events.map((event) => (
        <EventCard
          key={event.id} // Unique key required by React
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
