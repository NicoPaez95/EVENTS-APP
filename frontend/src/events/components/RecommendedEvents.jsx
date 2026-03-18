import { Link } from 'react-router-dom';

/**
 * @typedef {Object} Event
 * @property {string|number} id - Unique identifier for the event.
 * @property {string} title - The official name or headline of the event.
 * @property {string} date - Event date in YYYY-MM-DD format.
 * @property {string} location - Venue, city, or geographical point.
 * @property {boolean} isRecommended - Indicates if the event should be highlighted.
 */

/**
 * RecommendedEvents Component.
 * * Renders a vertical list of curated event previews. Each item acts as a 
 * navigation link to the specific event's detail page.
 * * Features:
 * - Subtle sky-blue container background.
 * - Interactive card items with border-color and shadow transitions on hover.
 * - Integration with React Router for seamless navigation.
 * * @component
 * @param {Object} props - Component properties.
 * @param {Event[]} props.events - A collection of event objects to be displayed.
 * @returns {JSX.Element} A themed section containing a stack of navigable event cards.
 */
const RecommendedEvents = ({ events }) => {
  return (
    <section className="bg-sky-50 p-6 rounded-2xl shadow-md border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Recommended Events
      </h2>

      <div className="space-y-4">
        {events.map((event) => (
          <Link 
            key={event.id} 
            to={`/events/${event.id}`} 
            className="block group"
          >
            <article className="bg-white p-4 rounded-xl shadow-sm border border-slate-300 hover:shadow-md hover:border-blue-400 transition-all duration-300 cursor-pointer">
              <h3 className="text-lg font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>

              <div className="mt-2 space-y-1">
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <span>📅</span> {event.date}
                </p>

                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <span>📍</span> {event.location}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendedEvents;