import { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// Domain Hooks
import { useEvents } from '../hooks/useEvents';
import { useAuth } from '../../user/hooks/useAuth';

// UTILS
import { getRelatedEvents } from '../utils/recommendationEngine';

// Features & Integrations
import CheckoutModal from '../features/CheckoutModal/CheckoutModal';
import WeatherFeature from '../features/WeatherFeature';

// Presentational Components
import EventDetail from '../components/EventDetail';
import EventGrid from '../components/EventGrid';

// Shared UI (Atoms)
import LoadingState from '../../shared/components/UI/LoadingState';

/**
 * EventDetailsFeature Component.
 * * An orchestrator (Smart Component) that manages the complete event detail view experience.
 * * @component
 * @category Features/Events
 * * @description
 * This component acts as a high-level Feature Orchestrator with the following responsibilities:
 * 1. **State Selection**: Retrieves the specific event by ID from the global state.
 * 2. **Auth Guarding**: Manages the secure ticket flow by checking authentication status.
 * 3. **Smart Redirection**: Implements "Deep Linking" for the login flow, allowing users to return 
 * to the current page after authenticating.
 * 4. **Business Logic**: Executes the Recommendation Engine to find similar experiences.
 * 5. **Contextual Integration**: Passes location data to third-party integrations (Weather API).
 * * @hooks
 * - `useParams`: Extracts the `:id` parameter from the URL.
 * - `useNavigate` / `useLocation`: Handles intelligent navigation and state preservation.
 * - `useEvents`: Consumes the global events domain state.
 * - `useAuth`: Consumes the global user authentication state.
 * * @returns {JSX.Element} The orchestrated layout including loading, error, and success states.
 */
const EventDetailsFeature = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const { events, loading } = useEvents();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  /**
   * Memoized target event selection.
   * Ensures the lookup doesn't re-run unless the global events list or URL ID changes.
   */
  const event = useMemo(() => {
    return events.find(e => String(e.id) === String(id));
  }, [events, id]);

  /**
   * handleSecureTickets:
   * Handles the business logic for the conversion funnel.
   * If unauthenticated, it redirects to login while saving the current pathname 
   * in the Router state to enable post-login redirection.
   */
  const handleSecureTickets = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    } else {
      setIsCheckoutOpen(true);
    }
  };

  /**
   * relatedEvents:
   * Memoized result of the recommendation engine.
   * Filters events by hierarchy (Category > Location > General) to optimize UI secondary area.
   */
  const relatedEvents = useMemo(() => {
    return getRelatedEvents(event, events);
  }, [event, events]);

  // --- Rendering States: Loading & Error ---

  if (loading) {
    return <LoadingState message="Loading experience details..." />;
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Event not found</h2>
        <p className="text-slate-500 mt-2">The experience you are looking for might have moved or ended.</p>
        <button 
          onClick={() => navigate('/events')}
          className="mt-6 text-blue-600 font-medium hover:underline"
        >
          ← Back to all events
        </button>
      </div>
    );
  }

  // --- Main Render: Success ---

  return (
    <div className="container mx-auto py-8 space-y-12 animate-in fade-in duration-500">
      
      {/* Checkout Orchestration */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        event={event} 
      />

      {/* Primary Content: Event Detail Presentation */}
      <section aria-label="Event Details">
        <EventDetail 
          event={event} 
          isAuthenticated={isAuthenticated}
          onSecureTickets={handleSecureTickets}
          onBack={() => navigate(-1)}
        />
      </section>

      {/* Secondary Content: Recommendations and Venue Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recommendation Column */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 font-display">
            Similar Experiences
          </h3>
          <EventGrid events={relatedEvents} />
        </div>
        
        {/* Venue Information Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 font-display">
            Venue Information
          </h3>
          
          <WeatherFeature location={event.location} />
          
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-sm text-slate-600 italic">
              Weather data is provided for <strong>{event.location}</strong>. 
              Please consider this when planning your visit.
            </p>
          </div>
        </aside>

      </div>
      
    </div>
  );
};

export default EventDetailsFeature;