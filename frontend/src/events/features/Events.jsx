import { useEvents } from '../hooks/useEvents';
import EventGrid from '../components/EventGrid';

/**
 * Events Feature Component.
 * * This "Smart Component" orchestrates the main event catalog display.
 * It connects directly to the global EventsContext to retrieve the filtered 
 * list of events and manages the UI transitions between loading, empty, 
 * and success states.
 * * @component
 * @category Features
 * @returns {JSX.Element} The orchestrated event listing section with state-driven rendering.
 */
const Events = () => {
  /**
   * Context Consumption:
   * Retrieves the current event collection and the loading status.
   * This ensures the grid always reflects the latest search or category filters.
   */
  const { events, loading } = useEvents();

  /**
   * Loading State:
   * Provides visual feedback while the event data is being resolved.
   */
  if (loading) {
    return (
      <div className="text-center py-10" role="status">
        <p className="text-lg text-slate-600 animate-pulse">Searching for experiences...</p>
      </div>
    );
  }

  /**
   * Empty State:
   * Standardized feedback for when no events match the current filter criteria.
   */
  if (events.length === 0) {
    return (
      <div 
        className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200"
        role="alert"
      >
        <p className="text-slate-500 font-medium">No events found matching your criteria.</p>
        <p className="text-sm text-slate-400 mt-1">Try adjusting your filters or searching for something else.</p>
      </div>
    );
  }

  return (
    <section 
      aria-label="Event Results"
      className="animate-in fade-in duration-500"
    >
      {/* Section Header */}
      <h2 className="text-2xl font-bold text-slate-900 mb-6 font-display">
        Explore Events
      </h2>

      {/* Presentational Layer:
          Delegates the rendering of the event collection to the decoupled EventGrid.
      */}
      <EventGrid events={events} />
    </section>
  );
};

export default Events;