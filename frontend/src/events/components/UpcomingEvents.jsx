import { Link } from 'react-router-dom';

/**
 * @typedef {Object} UpcomingEvent
 * @property {string|number} id - Unique identifier for the event.
 * @property {string} title - The official name or headline of the event.
 * @property {string} date - Simplified date string for display.
 */

/**
 * UpcomingEvents Component.
 * * * A compact, presentational UI component designed for sidebars or small containers.
 * * It displays a truncated list of chronologically close events (top 3) and 
 * provides a call-to-action to navigate to the full upcoming events page.
 * * Each individual item links directly to its specific event detail page.
 * * @component
 * @param {Object} props - Component properties.
 * @param {UpcomingEvent[]} props.events - A collection of upcoming event objects.
 * @returns {JSX.Element} A themed section with a preview list and a "View All" navigation link.
 */
const UpcomingEvents = ({ events }) => {
  return (
    <section className="bg-blue-200 rounded-2xl p-5 shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-blue-900">
        Upcoming Events
      </h2>

      <ul className="space-y-3 text-sm">
        {events.slice(0, 3).map((event) => (
          <li key={event.id}>
            {/* Navigates to the specific event detail page */}
            <Link 
              to={`/events/${event.id}`} 
              className="hover:underline font-medium text-slate-800 transition-colors duration-200"
            >
              {event.title} - <span className="text-slate-600 italic">{event.date}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Navigates to the global Upcoming Experiences page */}
      <Link 
        to="/events/upcoming" 
        className="block mt-4 text-center text-xs font-bold text-blue-700 hover:text-blue-900 uppercase tracking-wider transition-all"
      >
        View All Upcoming →
      </Link>
    </section>
  );
};

export default UpcomingEvents;