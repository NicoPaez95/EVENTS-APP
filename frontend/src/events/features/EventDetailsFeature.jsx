import { useParams } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import EventDetail from '../components/EventDetail';
import EventGrid from '../components/EventGrid';
import WeatherFeature from './WeatherFeature';

/**
 * EventDetailsFeature Component.
 * * This feature-level orchestrator manages the entire experience of the event detail view.
 * It is responsible for:
 * 1. Extracting the event identity from the URL parameters.
 * 2. Retrieving and filtering the global event catalog to find the target event.
 * 3. Implementing a 3-tier adaptive recommendation engine (Category > Location > General).
 * 4. Integrating contextual weather data by passing the event's location to the WeatherFeature.
 * * @component
 * @category Features
 * @returns {JSX.Element} The orchestrated event detail view with suggestions and weather insights.
 */
const EventDetailsFeature = () => {
  /** * @type {{ id: string }} Route parameters from react-router 
   */
  const { id } = useParams();

  /** * @type {{ events: Array<Object>, loading: boolean }} Custom hook state 
   */
  const { events, loading } = useEvents();

  /**
   * Target Event Selection:
   * Finds the specific event matching the URL parameter.
   * Safe comparison is used to handle potential type mismatches between mock IDs and URL strings.
   * @type {Object|undefined}
   */
  const event = events.find(e => String(e.id) === String(id));

  /**
   * Adaptive Related Events Logic:
   * Hierarchical filtering strategy to ensure the "Similar Experiences" section is always populated.
   * Fallback sequence: Same Category -> Same Location -> Any other upcoming events.
   * * @returns {Array<Object>} A curated list of up to 3 related event objects.
   */
  const relatedEvents = (() => {
    if (!event) return [];

    // Tier 1: Match by Category (excluding the current event)
    const byCategory = events.filter(e => e.category === event.category && e.id !== event.id);
    if (byCategory.length > 0) return byCategory.slice(0, 3);

    // Tier 2: Match by Location/Venue (excluding the current event)
    const byLocation = events.filter(e => e.location === event.location && e.id !== event.id);
    if (byLocation.length > 0) return byLocation.slice(0, 3);

    // Tier 3: General Fallback (to maintain UI density)
    return events.filter(e => e.id !== event.id).slice(0, 3);
  })();

  // --- Conditional Rendering Logic ---

  /**
   * Global Loading State:
   * Prevents layout shifts while the event catalog is being retrieved.
   */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-slate-600 animate-pulse">Loading experience details...</p>
      </div>
    );
  }

  /**
   * Not Found State:
   * Standardized error message for invalid IDs or removed content.
   */
  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Event not found</h2>
        <p className="text-slate-500 mt-2">The experience you are looking for might have moved or ended.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-12 animate-fade-in">
      
      {/* Primary Content Area:
          Renders the core presentation of the event's data.
      */}
      <section aria-label="Event Details">
        <EventDetail event={event} />
      </section>

      {/* Secondary Content Area:
          Adaptive grid that balances internal recommendations and external context (Weather).
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recommendations Column */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 font-display">
            Similar Experiences
          </h3>
          <EventGrid events={relatedEvents} />
        </div>
        
        {/* Contextual Information Column (Sidebar Style) */}
        <aside className="lg:col-span-1 space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 font-display">
            Venue Information
          </h3>
          
          {/* WeatherFeature Orchestration:
              Passes the event's specific location to fetch relevant meteorological data.
          */}
          <WeatherFeature location={event.location} />
          
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-sm text-slate-600 italic">
              Weather data is provided for <strong>{event.location}</strong>. 
              Please consider this when planning your visit to the venue.
            </p>
          </div>
        </aside>

      </div>
      
    </div>
  );
};

export default EventDetailsFeature;