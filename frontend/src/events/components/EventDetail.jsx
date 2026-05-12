import BackButton from "../../shared/components/UI/BackButton";
import PrimaryButton from "../../shared/components/UI/PrimaryButton";

/**
 * EventDetail Component (Presentational).
 *
 * This "Dumb" component is strictly responsible for rendering the detailed view
 * of a single event. Following the architectural pattern, it does not manage
 * state or side effects; it simply receives data and callbacks via props.
 *
 * Architectural Strategy:
 * - Atomic UI: Integrates `PrimaryButton` for the main CTA, ensuring
 *   consistent elevation and hover effects across the event lifecycle.
 * - Decoupled Logic: All date parsing and conditional labeling are handled
 *   locally for presentation, while the execution is delegated to the parent.
 *
 * @component
 * @category Components/Events
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.event - The event data object.
 * @param {boolean} props.isAuthenticated - Determines the CTA label.
 * @param {Function} props.onSecureTickets - Logic orchestrator callback.
 * @param {Function} props.onLocationClick - UI callback for map interaction.
 *
 * @returns {JSX.Element|null} The rendered event detail view.
 */
const EventDetail = ({
  event,
  isAuthenticated,
  onSecureTickets,
  onLocationClick,
}) => {
  if (!event) return null;

  const eventDate = new Date(event.date);
  const day = eventDate.getUTCDate();
  const month = eventDate.toLocaleString("en-US", { month: "short" });

  return (
    <article className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* 1. Navigation Header */}
      <header className="p-5 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
        <BackButton label="BACK TO EXPLORATION" />

        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
          {event.category}
        </span>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* 2. Visual Hero */}
        <div className="md:w-1/2 relative h-72 md:h-auto">
          <img
            src={
              event.image || "https://via.placeholder.com/800x600?text=No+Image"
            }
            alt={`Cover for ${event.title}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl text-center shadow-2xl border border-white/20 min-w-[80px]">
            <span className="block text-3xl font-black text-blue-600 leading-none">
              {day}
            </span>
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest mt-1 block">
              {month}
            </span>
          </div>
        </div>

        {/* 3. Information Section */}
        <div className="md:w-1/2 p-10 flex flex-col justify-between bg-white">
          <div className="space-y-8">
            <h1 className="text-4xl font-black text-slate-900 leading-[1.1] tracking-tight">
              {event.title}
            </h1>

            <div className="space-y-4">
              {/* Interactive Venue */}
              <div
                onClick={onLocationClick}
                className="group flex items-center gap-4 p-4 -ml-4 rounded-2xl cursor-pointer hover:bg-blue-50/80 transition-all duration-300 active:scale-[0.98]"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
                  📍
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Venue • <span className="text-blue-500">View Map</span>
                  </p>
                  <p className="text-xl font-bold text-slate-800 leading-tight">
                    {event.venue?.name || "TBD"}
                  </p>
                  <p className="text-sm font-medium text-slate-500">
                    {event.venue?.city || "Unknown City"}, Argentina
                  </p>
                </div>
              </div>

              {/* Time Indicator */}
              <div className="flex items-center gap-4 p-4 -ml-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center text-2xl">
                  ⏰
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Schedule
                  </p>
                  <p className="text-xl font-bold text-slate-800">21:00 HS</p>
                  <p className="text-sm font-medium text-slate-500">
                    Local Time
                  </p>
                </div>
              </div>
            </div>

            {/* Event Narrative */}
            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                Experience Details
              </h3>
              <p className="text-slate-600 leading-relaxed text-base">
                {event.description ||
                  "Experience something unique. This event showcases the best in its category within a premium environment."}
              </p>
            </div>
          </div>

          {/* Core Action: Standardized via PrimaryButton */}
          <div className="mt-12">
            <PrimaryButton onClick={onSecureTickets} size="lg">
              {isAuthenticated ? "Secure Your Tickets" : "Sign In to Purchase"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventDetail;
