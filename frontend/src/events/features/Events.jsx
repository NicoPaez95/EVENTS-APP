import { useEvents } from '../hooks/useEvents';
import { useUser } from '../../user/context/UserContext';
import EventGrid from '../components/EventGrid';

/**
 * Events Feature Component.
 * * This "Smart Component" (Feature) orchestrates the main event catalog display.
 * It synchronizes the global event data with the user's specific preferences 
 * (saved events) and manages the UI lifecycle (loading, empty, and success states).
 * * @component
 * @category Features
 * @returns {JSX.Element} The orchestrated event listing section with state-driven rendering.
 */
const Events = () => {
  /**
   * Domain Orchestration:
   * Consumes Events domain for data and User domain for persistence logic.
   */
  const { events, loading } = useEvents();
  const { toggleSaveEvent, isEventSaved } = useUser();

  /**
   * Loading State:
   * Provides visual feedback while the event catalog is being fetched.
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
      </div>
    );
  }

  return (
    <section 
      aria-label="Event Results" 
      className="animate-in fade-in duration-500"
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6 font-display">
        Explore Events
      </h2>

      {/* Presentational Layer:
        Delegates rendering to EventGrid, injecting the cross-domain persistence logic.
      */}
      <EventGrid 
        events={events} 
        onToggleSave={toggleSaveEvent} 
        isEventSaved={isEventSaved} 
      />
    </section>
  );
};

export default Events;