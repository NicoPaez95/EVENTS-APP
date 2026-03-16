import { useParams } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import EventDetail from '../components/EventDetail';
import EventGrid from '../components/EventGrid'; // Reutilizamos el grid para sugerencias
import WeatherWidget from '../components/WeatherWidget'; // Reutilizamos el widget

const EventDetailsFeature = () => {
  const { id } = useParams();
  const { events, loading } = useEvents();

  const event = events.find(e => e.id === id || e.id === parseInt(id));
  const relatedEvents = events.filter(e => e.category === event?.category && e.id !== event?.id).slice(0, 3);

  if (loading) return <p>Loading event details...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="container mx-auto py-8 space-y-12">
      {/* Sección Principal: El Detalle Específico */}
      <section>
        <EventDetail event={event} />
      </section>

      {/* Sección Secundaria: Reutilizando componentes de dominio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold mb-6">Similar Experiences</h3>
          {/* REUTILIZACIÓN GENIAL: Usamos el grid de la Home aquí abajo */}
          <EventGrid events={relatedEvents} />
        </div>
        
        <div className="lg:col-span-1">
          <h3 className="text-2xl font-bold mb-6">Venue Weather</h3>
          <WeatherWidget location={event.location} />
        </div>
      </div>
    </div>
  );
};

export default EventDetailsFeature;