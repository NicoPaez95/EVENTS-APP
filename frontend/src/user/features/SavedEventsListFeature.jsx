import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useEvents } from "../../events/hooks/useEvents";
import { useUser } from "../context/UserContext";
import EventCard from "../../events/components/EventCard";
import { filterByIds, filterByDate } from "events/utils/filterEvents";

/**
 * SavedEventsListFeature Component (Smart/Feature Orchestrator).
 *
 * This feature manages the "My Saved Experiences" view. It synchronizes the global
 * event catalog with the user's private bookmark collection, applying multi-stage
 * filtering based on user identity and temporal parameters from the URL.
 *
 * **Architectural Logic**:
 * 1. **URL Synchronization**: Listens to `?date=` query parameters to filter results
 * dynamically (linked to the Sidebar Calendar interaction).
 * 2. **Function Composition**: Chains pure utility functions (`filterByIds` -> `filterByDate`)
 * to derive the `displayList` without mutating original state.
 * 3. **Smart Injection**: Transforms static event data into interactive `EventCard`
 * components by injecting global `Auth` and `User` handlers.
 *
 * @component
 * @category Features/User
 * @returns {JSX.Element} A responsive grid of filtered events or a context-aware empty state.
 */
const SavedEventsListFeature = () => {
  const { events, loading } = useEvents();
  const { savedIds, isEventSaved, toggleSaveEvent } = useUser();
  const [searchParams] = useSearchParams();

  /** * Temporal Filter: Captures the 'date' query param.
   * This allows deep-linking to specific dates in the user's agenda.
   */
  const dateFilter = searchParams.get("date");

  /**
   * Data Derived State (Memoized):
   * Orchestrates the filtering pipeline. Re-calculates only when the catalog,
   * bookmarks, or URL parameters change.
   */
  const displayList = useMemo(() => {
    // Stage 1: Filter the master catalog by the user's saved IDs
    let list = filterByIds(events, savedIds);

    // Stage 2: Apply secondary date filtering if the URL param exists
    if (dateFilter) {
      list = filterByDate(list, dateFilter);
    }

    return list;
  }, [events, savedIds, dateFilter]);

  // Loading State: Provides visual feedback during catalog hydration
  if (loading) {
    return (
      <div
        className="p-20 text-center animate-pulse text-slate-400 font-medium"
        role="status"
        aria-live="polite"
      >
        Loading your curated experiences...
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section: Context-aware title based on current filters */}
      <header className="border-b border-slate-100 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-display">
          {dateFilter ? `Plans for ${dateFilter}` : "My Saved Experiences"}
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          {displayList.length} {displayList.length === 1 ? "event" : "events"}{" "}
          found in your selection.
        </p>
      </header>

      {/* Content Area: Conditional rendering for data presence */}
      {displayList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              isSaved={isEventSaved(event.id)}
              onToggleSave={toggleSaveEvent}
              showRemoveButton={true} // UX Variant: Adds visual cues for deletion in the personal list
            />
          ))}
        </div>
      ) : (
        /* Empty State: Encourages user to return to discovery flow */
        <div
          className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 animate-in zoom-in-95 duration-300"
          role="status"
        >
          <p className="text-slate-400 text-lg">
            Your collection is empty for this selection.
          </p>
          <Link
            to="/"
            className="inline-block mt-4 text-blue-600 font-bold hover:text-blue-800 transition-colors"
          >
            Explore more events →
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedEventsListFeature;
