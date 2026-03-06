/**
 * EventCard Component.
 * * A pure presentational component that displays key details 
 * for a single event, including its title, date, and location.
 * * It uses a structured article layout with specific styling 
 * for a consistent look within the event listing.
 * * @component
 * @param {Object} props - Component properties.
 * @param {string} props.title - The headline or name of the event.
 * @param {string} props.date - The scheduled date and time of the event.
 * @param {string} props.location - The venue or geographical location.
 * @param {string} props.category - The classification (e.g., Music, Sports, Theater).
 * @returns {JSX.Element} A styled article element containing event metadata.
 */
const EventCard = ({ title, date, location, category }) => {
  return (
    <article className="bg-sky-100 border-2 border-solid border-slate-500 p-4">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-slate-600">{date}</p>
      <p className="text-sm italic text-slate-700">{location}</p>
      <span className="inline-block mt-2 text-xs font-semibold uppercase tracking-wide">
        {category}
      </span>
    </article>
  );
};

export default EventCard;