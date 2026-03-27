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
import EventMapFeature from '../features/EventMapFeature'; // <--- Nueva Integración

// Presentational Components
import EventDetail from '../components/EventDetail';
import EventGrid from '../components/EventGrid';

// Shared UI (Atoms)
import LoadingState from '../../shared/components/UI/LoadingState';

/**
 * EventDetailsFeature Component.
 * Orchestrator for the event detail view, now including map anchoring and highlighting.
 */
const EventDetailsFeature = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const { events, loading } = useEvents();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // 1. Referencia para el scroll al mapa
  const mapSectionRef = useRef(null);
  // 2. Estado local para el efecto visual de "Focus" en el mapa
  const [isMapHighlighted, setIsMapHighlighted] = useState(false);

  const event = useMemo(() => {
    return events.find(e => String(e.id) === String(id));
  }, [events, id]);

  /**
   * handleLocationFocus:
   * Ejecuta un scroll suave hacia el mapa y activa un efecto visual temporal.
   */
  const handleLocationFocus = () => {
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      // Activamos el brillo del mapa
      setIsMapHighlighted(true);
      setTimeout(() => setIsMapHighlighted(false), 2000);
    }
  };

  const handleSecureTickets = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    } else {
      setIsCheckoutOpen(true);
    }
  };

  const relatedEvents = useMemo(() => {
    return getRelatedEvents(event, events);
  }, [event, events]);

  if (loading) {
    return <LoadingState message="Loading experience details..." />;
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Event not found</h2>
        <button
          onClick={() => navigate('/events')}
          className="mt-6 text-blue-600 font-medium hover:underline"
        >
          ← Back to all events
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-12 animate-in fade-in duration-500 px-4">

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        event={event}
      />

      {/* Primary Content */}
      <section aria-label="Event Details">
        <EventDetail
          event={event}
          isAuthenticated={isAuthenticated}
          onSecureTickets={handleSecureTickets}
          onBack={() => navigate(-1)}
          onLocationClick={handleLocationFocus} // <--- Prop nueva conectada
        />
      </section>

      {/* Secondary Content: Recommendations and Venue Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Recommendation Column */}
        <div className="lg:col-span-2 space-y-8">
          <h3 className="text-2xl font-bold text-slate-900 font-display">
            Similar Experiences
          </h3>
          <EventGrid events={relatedEvents} />
        </div>

        {/* Venue Information Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          <h3 className="text-2xl font-bold text-slate-900 font-display">
            Venue & Logistics
          </h3>

          {/* 3. Contenedor con Referencia y Efecto de Resaltado */}
          <div
            ref={mapSectionRef}
            className={`transition-all duration-700 rounded-3xl ${isMapHighlighted
                ? 'ring-4 ring-blue-400 ring-offset-4 shadow-2xl scale-105'
                : 'ring-0 shadow-none scale-100'
              }`}
          >
            <EventMapFeature venue={event.venue} />
          </div>

          <div className="space-y-4">
            <WeatherFeature location={event.venue.city} />
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed italic">
                {"Note: Weather forecasts for "} <strong>{event.venue.city}</strong> {" are updated in real-time. "}
                {"Don't forget to check the map for the best route to "} <strong>{event.venue.name}</strong>.
              </p>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default EventDetailsFeature;