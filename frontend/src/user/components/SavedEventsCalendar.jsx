// ===============================
// SavedEventsCalendar Component
// -------------------------------
// Displays a monthly calendar view
// showing saved user events.
//
// Pure presentational component.
// ===============================

const SavedEventsCalendar = () => {
  return (
    <section className="bg-blue-200 rounded-2xl p-5 shadow-md min-h-[260px] flex flex-col">
      
      {/* Title */}
      <h2 className="text-lg font-semibold mb-4">
        Mi Calendario
      </h2>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm flex-grow">

        {Array.from({ length: 30 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square bg-blue-200 rounded-lg flex items-center justify-center hover:bg-blue-200 transition"
          >
            {index + 1}
          </div>
        ))}

      </div>

    </section>
  );
};

export default SavedEventsCalendar;