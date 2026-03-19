import { useParams } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import EventDetail from '../components/EventDetail';
import EventGrid from '../components/EventGrid';
import WeatherWidget from '../components/WeatherWidget';

/**
 * EventDetailsFeature Component.
 * * * This feature-level component orchestrates the event detail view experience.
 * * It captures the event ID from the URL, retrieves the full event catalog, 
 * and implements an adaptive recommendation engine for "Similar Experiences."
 * * It provides a fallback strategy (Category > Location > General) to ensure 
 * the UI remains dense and engaging even if specific matches are missing.
 * * @component
 * @category Features
 * @returns {JSX.Element} The rendered event detail page with contextual suggestions.
 */
const EventDetailsFeature = () => {
  const { id } = useParams();
  const { events, loading } = useEvents();

  /**
   * Target Event Selection:
   * Finds the specific event based on the URL parameter.
   * Uses String conversion to safely compare numeric IDs from mocks with URL strings.
   */
  const event = events.find(e => String(e.id) === String(id));

  /**
   * Adaptive Related Events Logic:
   * Implements a hierarchical filtering strategy (3-tier fallback) to find similar content:
   * 1. Primary: Same category (excluding the current event).
   * 2. Secondary: Same location/venue (if no category matches found).
   * 3. Tertiary: General upcoming events (to prevent an empty grid).
   * * @returns {Array<Object>} A curated list of up to 3 related event objects.
   */
  const relatedEvents = (() => {
    if (!event) return [];

    // Tier 1: Match by Category
    const byCategory = events.filter(e => e.category === event.category && e.id !== event.id);
    if (byCategory.length > 0) return byCategory.slice(0, 3);

    // Tier 2: Match by Location
    const byLocation = events.filter(e => e.location === event.location && e.id !== event.id);
    if (byLocation.length > 0) return byLocation.slice(0, 3);

    // Tier 3: General Fallback (Any other events)
    return events.filter(e => e.id !== event.id).slice(0, 3);
  })();

  // --- Conditional Rendering States ---

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-slate-600 animate-pulse">Loading event details...</p>
      </div>
    );
  }

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
      
      {/* Primary Section: Detailed Event Information */}
      <section aria-label="Event Details">
        <EventDetail event={event} />
      </section>

      {/* Secondary Section: Contextual Suggestions and External Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Related Content: Reusing EventGrid for consistency */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Similar Experiences</h3>
          <EventGrid events={relatedEvents} />
        </div>
        
        {/* Contextual Widget: Weather at the specific event location */}
        <div className="lg:col-span-1">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Venue Weather</h3>
          <WeatherWidget location={event.location} />
        </div>

      </div>
      
    </div>
  );
};

export default EventDetailsFeature;