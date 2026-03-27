import { useState, useMemo, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// Domain Hooks
import { useEvents } from '../hooks/useEvents';
import { useAuth } from '../../user/hooks/useAuth';

// UTILS
import { getRelatedEvents } from '../utils/recommendationEngine';

// Features & Integrations
import CheckoutModal from '../features/CheckoutModal/CheckoutModal';
import WeatherFeature from '../features/WeatherFeature';
import EventMapFeature from '../features/EventMapFeature';

// Presentational Components
import EventDetail from '../components/EventDetail';
import EventGrid from '../components/EventGrid';

// Shared UI (Atoms)
import LoadingState from '../../shared/components/UI/LoadingState';

/**
 * EventDetailsFeature Component (Smart Component).
 * * Orchestrates the full event experience, including ticket procurement,
 * interactive mapping, and personalized recommendations.
 * * @component
 * @category Features/Events
 * @description
 * **Architectural Note**: 
 * This component consumes `allEvents` from the context to ensure the event is 
 * locatable even when global search filters are active. It manages the 
 * "Focus" logic for the map and handles the navigation state for the auth-guard.
 */
const EventDetailsFeature = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  /**
   * Global Context Consumption:
   * 'allEvents' is required here to ensure a 100% hit rate when deep-linking 
   * or navigating from the "Recommended" sidebar, regardless of search filters.
   */
  const { allEvents, loading } = useEvents();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Map Interaction State & Refs
  const mapSectionRef = useRef(null);
  const [isMapHighlighted, setIsMapHighlighted] = useState(false);

  /**
   * Memoized Event Selection:
   * Extracts the specific event from the master catalog based on the URL ID.
   * Strings both sides of the comparison to prevent type-mismatch failures.
   */
  const event = useMemo(() => {
    return allEvents?.find(e => String(e.id) === String(id));
  }, [allEvents, id]);

  /**
   * handleLocationFocus:
   * Smoothly scrolls the viewport to the map section and triggers a 
   * temporary visual highlight to guide the user's attention.
   */
  const handleLocationFocus = () => {
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      setIsMapHighlighted(true);
      setTimeout(() => setIsMapHighlighted(false), 2000);
    }
  };

  /**
   * handleSecureTickets:
   * Redirects to login if unauthenticated, preserving the current path
   * in state to allow a seamless "Return to Event" flow after sign-in.
   */
  const handleSecureTickets = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    } else {
      setIsCheckoutOpen(true);
    }
  };

  /**
   * Related Experiences Logic:
   * Uses the recommendation engine to find similar events based on category/venue.
   */
  const relatedEvents = useMemo(() => {
    return getRelatedEvents(event, allEvents);
  }, [event, allEvents]);

  // Loading Guard
  if (loading) {
    return <LoadingState message="Loading experience details..." />;
  }

  // Error Guard: Event not found in Master Catalog
  if (!event) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-2xl font-bold text-slate-800 font-display">
          Event not found
        </h2>
        <p className="text-slate-500 mt-2">
          The experience you&apos;re looking for might have been removed or moved.
        </p>
        <button
          onClick={() => navigate('/events')}
          className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg"
        >
          &larr; Back to all events
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-12 animate-in fade-in duration-500 px-4">
      
      {/* Transactional Layer */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        event={event}
      />

      {/* Primary Detail Section */}
      <section aria-label="Event Details">
        <EventDetail
          event={event}
          isAuthenticated={isAuthenticated}
          onSecureTickets={handleSecureTickets}
          onBack={() => navigate(-1)}
          onLocationClick={handleLocationFocus}
        />
      </section>

      {/* Contextual Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Similar Experiences Catalog */}
        <div className="lg:col-span-2 space-y-8">
          <h3 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Similar Experiences
          </h3>
          <EventGrid events={relatedEvents} />
        </div>

        {/* Venue Sidebar & Logistics */}
        <aside className="lg:col-span-1 space-y-8">
          <h3 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Venue & Logistics
          </h3>

          {/* Interactive Map Wrapper with Highlight Logic */}
          <div
            ref={mapSectionRef}
            className={`transition-all duration-700 rounded-3xl ${
              isMapHighlighted
                ? 'ring-4 ring-blue-400 ring-offset-4 shadow-2xl scale-[1.02]'
                : 'ring-0 shadow-none scale-100'
            }`}
          >
            <EventMapFeature venue={event.venue} />
          </div>

          {/* Environmental Integration & Venue Metadata */}
          <div className="space-y-4">
            <WeatherFeature location={event.venue?.city} />
            
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed italic">
                {"Note: Weather forecasts for "} 
                <strong>{event.venue?.city}</strong> 
                {" are updated in real-time. "}
                {"Don&apos;t forget to check the map for the best route to "} 
                <strong>{event.venue?.name}</strong>.
              </p>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default EventDetailsFeature;