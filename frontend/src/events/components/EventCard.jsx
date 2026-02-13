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
    <article className=" bg-sky-100 border-2 border-solid border-slate-500 p-4 ">
      <h3>{title}</h3>
      <p>{date}</p>
      <p>{location}</p>
      <span>{category}</span>
    </article>
  );
};

export default EventCard;
