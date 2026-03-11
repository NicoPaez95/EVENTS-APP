/**
 * RecommendedEvents Component.
 * * Renders a vertical list of recommended events as a preview.
 * * Features a subtle sky-blue background and card-based items with 
 * hover transitions for an interactive feel.
 * * @component
 * @param {Object} props - Component properties.
 * @param {Object[]} props.events - Array of event objects to recommend.
 * @param {string|number} props.events[].id - Unique identifier for the event.
 * @param {string} props.events[].title - The headline or name of the event.
 * @param {string} props.events[].date - The scheduled date (string format).
 * @param {string} props.events[].location - The venue or city.
 * @returns {JSX.Element} A section containing a vertical stack of event previews.
 */
const RecommendedEvents = ({ events }) => {
  return (
    <section className="bg-sky-50 p-6 rounded-2xl shadow-md border border-slate-200">
      
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Recommended Events
      </h2>

      <div className="space-y-4">
        {events.map((event) => (
          <article
            key={event.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-300 hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-lg font-medium text-slate-900">
              {event.title}
            </h3>

            <p className="text-sm text-slate-600">
              📅 {event.date}
            </p>

            <p className="text-sm text-slate-500">
              📍 {event.location}
            </p>
          </article>
        ))}
      </div>
      
    </section>
  );
};

export default RecommendedEvents;