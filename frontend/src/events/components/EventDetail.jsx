/**
 * EventDetail Component (Presentational).
 * * This "Dumb" component is responsible for rendering the full details of an event.
 * It features an interactive location section that triggers a map focus on the parent feature.
 * * @component
 * @category Components/Events
 * * @param {Object} props
 * @param {Object} props.event - The event data object containing title, description, and venue.
 * @param {boolean} props.isAuthenticated - Flag indicating if the user is logged in.
 * @param {Function} props.onSecureTickets - Callback to initiate the ticket purchase flow.
 * @param {Function} props.onBack - Callback to navigate to the previous view.
 * @param {Function} props.onLocationClick - Callback to trigger the map scroll/focus effect.
 * * @returns {JSX.Element|null} The rendered event detail view or null if no event is provided.
 */
const EventDetail = ({ 
  event, 
  isAuthenticated, 
  onSecureTickets, 
  onBack,
  onLocationClick 
}) => {
  
  if (!event) return null;

  // Formatting date for the UI badge
  const eventDate = new Date(event.date);
  const day = eventDate.getUTCDate();
  const month = eventDate.toLocaleString('en-US', { month: 'short' });

  return (
    <article className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      
      {/* Navigation Header: Provides context and back navigation */}
      <div className="p-5 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="text-slate-500 hover:text-blue-600 flex items-center gap-2 font-bold text-sm transition-colors group"
          aria-label="Return to event exploration"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span> 
          BACK TO EXPLORATION
        </button>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
          {event.category}
        </span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Visual Hero Section: Image and Floating Date Badge */}
        <div className="md:w-1/2 relative h-72 md:h-auto">
          <img 
            src={event.image || 'https://via.placeholder.com/800x600?text=No+Image'} 
            alt={`Cover image for ${event.title}`} 
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

        {/* Content Section: Titles, Metadata, and Call to Action */}
        <div className="md:w-1/2 p-10 flex flex-col justify-between bg-white">
          <div className="space-y-8">
            <h1 className="text-4xl font-black text-slate-900 leading-[1.1] tracking-tight">
              {event.title}
            </h1>
            
            <div className="space-y-4">
              
              {/* Interactive Venue Section: Navigates to Map Feature */}
              <div 
                onClick={onLocationClick}
                className="group flex items-center gap-4 p-4 -ml-4 rounded-2xl cursor-pointer hover:bg-blue-50/80 transition-all duration-300 active:scale-[0.98]"
                title="Click to locate on map"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
                  📍
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Venue • <span className="text-blue-500">See Map</span>
                  </p>
                  <p className="text-xl font-bold text-slate-800 leading-tight">
                    {event.venue.name}
                  </p>
                  <p className="text-sm font-medium text-slate-500">
                    {event.venue.city}, Argentina
                  </p>
                </div>
              </div>

              {/* Time Information Slot */}
              <div className="flex items-center gap-4 p-4 -ml-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center text-2xl">
                  ⏰
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Time</p>
                  <p className="text-xl font-bold text-slate-800">21:00 HS</p>
                  <p className="text-sm font-medium text-slate-500">Local Time</p>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Experience Description</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                {event.description || "Join us for an unforgettable experience. This event brings together the best of its category in a unique venue."}
              </p>
            </div>
          </div>

          {/* Checkout/Auth Action Trigger */}
          <button 
            onClick={onSecureTickets}
            className="mt-12 w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-200 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 uppercase tracking-widest"
          >
            {isAuthenticated ? 'Secure Your Tickets' : 'Login to Purchase'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default EventDetail;