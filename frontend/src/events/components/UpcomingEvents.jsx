import { Link } from 'react-router-dom';

/**
 * UpcomingEvents Presentational Component.
 * * Renders a compact, high-contrast list of upcoming events designed for 
 * secondary navigation areas like sidebars.
 * * @component
 * @category Components/Events
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.events - A collection of event objects to be previewed.
 * @returns {JSX.Element} A themed card containing a list of navigable event links.
 */
const UpcomingEvents = ({ events }) => {
  return (
    <section 
      className="bg-blue-100 rounded-2xl p-5 shadow-sm border border-blue-200"
      aria-labelledby="upcoming-sidebar-title"
    >
      <h2 
        id="upcoming-sidebar-title" 
        className="text-lg font-bold mb-4 text-blue-900"
      >
        Upcoming Events
      </h2>

      <ul className="space-y-3 text-sm" role="list">
        {/* We display only the top 3 for maximum sidebar visual efficiency */}
        {events.slice(0, 3).map((event) => (
          <li 
            key={event.id} 
            className="transition-transform duration-200 hover:translate-x-1"
          >
            <Link 
              to={`/events/${event.id}`} 
              className="group block"
              aria-label={`View details for ${event.title}`}
            >
              <span className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                {event.title}
              </span>
              <span className="block text-xs text-slate-500 italic mt-0.5">
                📅 {event.date}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer Navigation: Links to the full upcoming events view */}
      <Link 
        to="/events/upcoming" 
        className="block mt-5 pt-3 border-t border-blue-200 text-center text-xs font-bold text-blue-700 hover:text-blue-900 uppercase tracking-widest transition-all"
      >
        View All Upcoming &rarr;
      </Link>
    </section>
  );
};

export default UpcomingEvents;