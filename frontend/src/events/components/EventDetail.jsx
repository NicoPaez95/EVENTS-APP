import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../user/hooks/useAuth'; 
import CheckoutModal from '../features/CheckoutModal/CheckoutModal';

/**
 * EventDetail Component.
 * * A high-level component that displays full information for a specific event.
 * It manages the entry point to the checkout flow and handles authentication
 * redirects if a guest tries to purchase tickets.
 * * @component
 * @category Components/Events
 * * @param {Object} props - Component properties.
 * @param {Object} props.event - The event data object.
 * @param {string} props.event.id - Unique event identifier.
 * @param {string} props.event.title - Event name.
 * @param {string} props.event.date - ISO date string.
 * @param {string} props.event.location - Venue description.
 * @param {string} props.event.category - Event classification.
 * @param {string} [props.event.image] - Hero image URL.
 * @param {string} [props.event.description] - Detailed text about the event.
 * * @returns {JSX.Element|null} The rendered event detail view.
 */
const EventDetail = ({ event }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  /** @type {[boolean, Function]} State to manage the visibility of the CheckoutModal. */
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!event) return null;

  /**
   * Handles the primary action for securing tickets.
   * If the user is unauthenticated, redirects to the login page and saves the 
   * current path for post-login redirection.
   * Otherwise, it triggers the checkout process.
   * * @function
   */
  const handleSecureTickets = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    setIsCheckoutOpen(true);
  };

  return (
    <article className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      
      {/* Checkout Orchestrator Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        event={event} 
      />

      {/* Navigation Header */}
      <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)}
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
            onClick={handleSecureTickets}
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