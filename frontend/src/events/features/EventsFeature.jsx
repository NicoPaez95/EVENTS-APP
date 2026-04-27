import { useEvents } from "../hooks/useEvents";
import { useUser } from "../../user/context/UserContext";
import EventGrid from "../components/EventGrid";

import LoadingState from "shared/components/UI/LoadingState";
import EmptyState from "shared/components/UI/EmptyState";
import useNotification from "user/hooks/useNotification";

/**
 * EventsFeature Component (Feature Orchestrator).
 * * This smart component serves as the primary controller for the event discovery experience.
 * It synchronizes two distinct domains:
 * 1. **Events Domain**: Manages the catalog, filtering, and search results.
 * 2. **User Domain**: Handles persistence (saving/unsaving) and session-based interactions.
 * * It manages the high-level application states (Loading, Empty, and Success)
 * and orchestrates global feedback via the Notification system.
 * * @component
 * @category Features/Events
 * @returns {JSX.Element} The orchestrated event catalog section.
 */
const EventsFeature = () => {
  /**
   * Domain Hook Consumption.
   * - `useEvents`: Retrieves the data-driven event collection.
   * - `useUser`: Accesses the user's personal calendar logic.
   * - `useNotification`: Provides global feedback (Toasts).
   */
  const { events, loading } = useEvents();
  const { toggleSaveEvent, isEventSaved } = useUser();
  const { showToast } = useNotification();

  /**
   * Orchestrates the save/unsave interaction.
   * * This handler acts as a controller: it executes the state toggle
   * and determines the appropriate visual feedback based on the
   * previous state of the event.
   * * @param {string|number} id - The unique identifier of the event to toggle.
   */
  const handleToggleAction = (id) => {
    const wasSaved = isEventSaved(id);
    toggleSaveEvent(id);

    // Context-aware feedback logic
    if (wasSaved) {
      showToast("Removed from calendar", "info");
    } else {
      showToast("Added! ✨", "success");
    }
  };

  /**
   * Loading State Guard.
   * Provides a smooth transition while the global event context is being populated.
   */
  if (loading) {
    return <LoadingState message="Searching for experiences..." />;
  }

  /**
   * Empty State Guard.
   * Triggered when the current filter set (Search query or Category)
   * returns an empty subset of the master catalog.
   */
  if (!events.length) {
    return <EmptyState message="No events found matching your criteria." />;
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
          The actual rendering of the list/grid is delegated to EventGrid.
          Interaction logic and state-checking functions are injected as dependencies.
      */}
      <EventGrid
        events={events}
        onToggleSave={handleToggleAction}
        isEventSaved={isEventSaved}
      />
    </section>
  );
};

export default EventsFeature;
