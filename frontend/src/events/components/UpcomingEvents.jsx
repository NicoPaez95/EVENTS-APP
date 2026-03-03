// ===============================
// UpcomingEvents Component
// -------------------------------
// Pure presentational component.
// Receives events as props.
// ===============================

const UpcomingEvents = ({ events }) => {
  return (
    <section className="bg-blue-200 rounded-2xl p-5 shadow-md min-h-[140px]">
      
      <h2 className="text-lg font-semibold mb-4">
        Próximos Eventos
      </h2>

      <ul className="space-y-3 text-sm">
        {events.map((event) => (
          <li key={event.id} className="flex justify-between">
            <span>{event.title}</span>
            <span className="text-neutral-400">
              {event.date}
            </span>
          </li>
        ))}
      </ul>

    </section>
  );
};

export default UpcomingEvents;