import { useEvents } from '../hooks/useEvents';
import { useUser } from '../../user/context/UserContext';
import EventGrid from '../components/EventGrid';

import LoadingState from 'shared/components/UI/LoadingState';
import EmptyState from 'shared/components/UI/EmptyState';

/**
 * EventsFeature Component.
 * * A "Smart Component" (Feature Orchestrator) responsible for the main event catalog display.
 * * @component
 * @category Features/Events
 * * @description
 * This component handles the core discovery experience by:
 * 1. **Data Orchestration**: Synchronizing global event data from `EventsContext`.
 * 2. **Cross-Domain Integration**: Injecting user-specific persistence logic (Save/Unsave) 
 * from the `UserContext` into the event listing.
 * 3. **Lifecycle Management**: Handling conditional rendering for Loading, Empty, and Success states.
 * 4. **UI Decoupling**: Offloading the actual grid rendering to the `EventGrid` presentational layer.
 * * @hooks
 * - `useEvents`: Retrieves the filtered event collection and global loading status.
 * - `useUser`: Provides access to the user's saved events library and toggle functionality.
 * * @returns {JSX.Element} The orchestrated event section with state-driven rendering logic.
 */
const EventsFeature = () => {
  /**
   * Domain Hook Consumption:
   * Accesses the Events domain for the data catalog and the User domain 
   * for interaction logic (persistence).
   */
  const { events, loading } = useEvents();
  const { toggleSaveEvent, isEventSaved } = useUser();

  /**
   * Loading State Handler:
   * Ensures visual consistency while the event catalog is being processed or fetched.
   */
  if (loading) {
    return (
      <LoadingState message="Searching for experiences..." />
    );
  }

  /**
   * Empty State Handler:
   * Provides fallback UI when the current filter criteria (Search/Category) 
   * yield no results.
   */
  if (!events.length) {
    return (
      <EmptyState message="No events found matching your criteria." />
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
        Delegates rendering to EventGrid, injecting the cross-domain 
        persistence logic via props.
      */}
      <EventGrid 
        events={events} 
        onToggleSave={toggleSaveEvent} 
        isEventSaved={isEventSaved} 
      />
    </section>
  );
};

export default EventsFeature;