/**
 * UpcomingEvents Component.
 * * A compact, presentational list used to display a summary 
 * of chronologically close events.
 * * It uses a minimalist layout with a flexbox-based list 
 * to show titles and dates side-by-side.
 * * @component
 * @param {Object} props - Component properties.
 * @param {Object[]} props.events - List of upcoming events.
 * @param {string|number} props.events[].id - Unique identifier for the list item.
 * @param {string} props.events[].title - Short name of the event.
 * @param {string} props.events[].date - Simplified date string.
 * @returns {JSX.Element} A section containing a vertical list of upcoming events.
 */
const UpcomingEvents = ({ events }) => {
  return (
    <section className="bg-blue-200 rounded-2xl p-5 shadow-md min-h-[140px]">
      
      <h2 className="text-lg font-semibold mb-4">
        Próximos Eventos
      </h2>

      <ul className="space-y-3 text-sm">
        {events.map((event) => (
          <li key={event.id} className="flex justify-between">
            <span className="font-medium text-slate-800">
              {event.title}
            </span>
            <span className="text-slate-500 italic">
              {event.date}
            </span>
          </li>
        ))}
      </ul>

    </section>
  );
};

export default UpcomingEvents;