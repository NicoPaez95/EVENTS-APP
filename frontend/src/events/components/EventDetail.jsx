/**
 * EventDetail Component (Presentational/Dumb).
 * * This is a purely visual "Dumb Component". Its sole responsibility is 
 * to render the detailed information of a specific event.
 * * Architecture:
 * - Decoupled from business logic and global state (Context).
 * - Receives all necessary actions and states via props.
 * - Implements basic accessibility (aria-labels and hidden decorative icons).
 * * @component
 * @category Components/Events
 * * @param {Object} props - Component properties.
 * @param {Object} props.event - Event data object.
 * @param {string|number} props.event.id - Unique identifier for the event.
 * @param {string} props.event.title - Title or name of the experience.
 * @param {string} props.event.category - Event category (e.g., Music, Tech, Sports).
 * @param {string} props.event.date - Event date in ISO format or string.
 * @param {string} props.event.location - Venue or city where the event takes place.
 * @param {string} [props.event.image] - Main image URL (optional).
 * @param {string} [props.event.description] - Detailed description of the event (optional).
 * @param {boolean} props.isAuthenticated - User's auth state (passed down from Feature/Smart component).
 * @param {Function} props.onSecureTickets - Handler to initiate the purchase flow or login redirection.
 * @param {Function} props.onBack - Handler to execute back navigation.
 * * @returns {JSX.Element|null} The rendered component or null if no event data is provided.
 */
const EventDetail = ({ 
  event, 
  isAuthenticated, 
  onSecureTickets, 
  onBack 
}) => {
  
  if (!event) return null;

  return (
    <article className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      
      {/* Navigation Header */}
      <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="text-gray-600 hover:text-blue-600 flex items-center gap-2 font-medium transition-colors"
          aria-label="Go back to exploration"
        >
          <span className="text-xl" aria-hidden="true">←</span> Back to Exploration
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
          {event.category}
        </span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Event Hero Image & Floating Date Badge */}
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <img 
            src={event.image || 'https://via.placeholder.com/800x600?text=No+Image+Available'} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg text-center shadow-md border border-white/20">
            <span className="block text-2xl font-bold text-blue-600 leading-none">
              {/* Note: +1 to compensate for timezone offsets in Date objects if necessary */}
              {new Date(event.date).getDate() + 1}
            </span>
            <span className="text-xs uppercase font-bold text-gray-500">
              {new Date(event.date).toLocaleString('en-US', { month: 'short' })}
            </span>
          </div>
        </div>

        {/* Event Detailed Information */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              {event.title}
            </h1>
            
            <div className="space-y-4 mb-8">
              {/* Location Detail */}
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-xl" aria-hidden="true">
                  📍
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase leading-none">Location</p>
                  <p className="text-lg font-medium">{event.location}</p>
                </div>
              </div>

              {/* Time Detail */}
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-xl" aria-hidden="true">
                  ⏰
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase leading-none">Time</p>
                  <p className="text-lg font-medium">21:00 HS (Local Time)</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">About this event</h3>
              <p className="text-gray-600 leading-relaxed">
                {event.description || "Join us for an unforgettable experience. This event brings together the best of its category in a unique venue."}
              </p>
            </div>
          </div>

          {/* Call to Action Button */}
          <button 
            onClick={onSecureTickets}
            className="mt-10 w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md shadow-blue-100"
          >
            {isAuthenticated ? 'Secure Tickets' : 'Login to Secure Tickets'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default EventDetail;