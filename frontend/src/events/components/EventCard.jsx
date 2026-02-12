// ===============================
// EventCard Component
// -------------------------------
// Displays basic information
// about a single event.
//
// Pure presentational component.
// ===============================

const EventCard = ({ title, date, location, category }) => {
  return (
    <article>
      <h3>{title}</h3>
      <p>{date}</p>
      <p>{location}</p>
      <span>{category}</span>
    </article>
  );
};

export default EventCard;
