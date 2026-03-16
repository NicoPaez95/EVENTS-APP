import { Link } from 'react-router-dom';

/**
 * EventCard Component.
 * A pure presentational component that displays key details 
 * Added: Link integration to connect with EventDetailPage.
 * for a single event, including its category, title, date, and location.
 * It uses a structured article layout with specific styling 
 * for a consistent look within the event listing.
 * * @component
 * @param {Object} props - Component properties.
 * @param {string} props.title - The headline or name of the event.
 * @param {string} props.date - The scheduled date and time of the event.
 * @param {string} props.location - The venue or geographical location.
 * @param {string} props.category - The classification (e.g., Music, Sports, Theater).
 * @returns {JSX.Element} A styled article element containing event metadata.
 * @param {string|number} props.id - The unique ID for the route.
 */
const EventCard = ({ id, title, date, location, category }) => {
  return (
    <article className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/events/${id}`} className="block p-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
          {category}
        </span>
        
        <h3 className="font-bold text-xl mt-3 text-slate-800 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <div className="mt-4 space-y-1">
          <p className="text-sm text-slate-600 flex items-center gap-2">
            📅 {date}
          </p>
          <p className="text-sm italic text-slate-500 flex items-center gap-2">
            📍 {location}
          </p>
        </div>

        <div className="mt-4 text-sm font-semibold text-blue-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          View Details <span>→</span>
        </div>
      </Link>
    </article>
  );
};

export default EventCard;