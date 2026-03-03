// =====================================
// RecommendedEvents Component
// -------------------------------------
// Renders a list of recommended events
// displaying basic preview information
// such as title, date and location.
//
// Pure presentational component.
// Receives an array of event objects
// via props and maps over them.
//
// Expected event structure:
// {
//   id: string | number,
//   title: string,
//   date: string,
//   location: string
// }
// =====================================

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