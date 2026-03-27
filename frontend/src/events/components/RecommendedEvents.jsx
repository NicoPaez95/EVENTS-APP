import { Link } from 'react-router-dom';

/**
 * RecommendedEvents Presentational Component.
 * * Renders a curated vertical list of event previews specifically designed 
 * for the application sidebar. Each card serves as a navigation link 
 * to the detailed view of the event.
 * * @component
 * @category Components/Events
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.events - A collection of event objects to be displayed.
 * @returns {JSX.Element} A themed container with a stack of navigable event cards.
 */
const RecommendedEvents = ({ events }) => {
  return (
    <section 
      className="bg-sky-50 p-5 rounded-2xl shadow-sm border border-slate-200"
      aria-labelledby="recommended-heading"
    >
      <h2 
        id="recommended-heading" 
        className="text-lg font-bold text-slate-800 mb-4 px-1"
      >
        Recommended Events
      </h2>

      <div className="space-y-3">
        {events.map((event) => (
          <Link 
            key={event.id} 
            to={`/events/${event.id}`} 
            className="block group"
            aria-label={`View details for ${event.title}`}
          >
            <article className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 group-hover:border-blue-400 group-hover:shadow-md transition-all duration-300">
              <h3 className="text-md font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {event.title}
              </h3>

              <div className="mt-2 space-y-1">
                {/* Event Date Info */}
                <p className="text-xs text-slate-600 flex items-center gap-2">
                  <span role="img" aria-label="Date symbol">📅</span> 
                  {event.date}
                </p>

                {/* Event Location Info - Mapping to venue.city */}
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <span role="img" aria-label="Location symbol">📍</span> 
                  {event.venue?.city || 'Location TBD'}
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