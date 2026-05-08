/**
 * @file SavedEventsListFeature.jsx
 * @description Smart component that orchestrates the "My Saved Experiences" view.
 * It manages data filtering based on user bookmarks and temporal URL parameters.
 * @module features/user/SavedEventsListFeature
 * @author Nico Paez
 */

import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useEvents } from "../../events/hooks/useEvents";
import { useUser } from "../context/UserContext";
import EventCard from "../../events/components/EventCard";
import { filterByIds, filterByDate } from "events/utils/filterEvents";

/**
 * SavedEventsListFeature Component.
 *
 * Responsibilities:
 * - Synchronize the global event catalog with user-specific saved IDs.
 * - Apply secondary filtering based on 'date' query parameters.
 * - Provide feedback for loading, empty, and populated states.
 *
 * @component
 * @category Features/User
 * @returns {JSX.Element} The rendered saved events grid or empty state feedback.
 */
const SavedEventsListFeature = () => {
  const { events, loading } = useEvents();

  /**
   * User Domain State:
   * Corrected destructuring to match the updated UserContext API.
   */
  const { savedIds, isSaved, toggleSavedEvent } = useUser();
  const [searchParams] = useSearchParams();

  /**
   * Captures the 'date' query param for calendar-based filtering.
   */
  const dateFilter = searchParams.get("date");

  /**
   * displayList (Memoized State):
   * Chains pure filtering functions to derive the list without mutations.
   * Re-calculates only when the catalog, bookmarks, or URL filter change.
   */
  const displayList = useMemo(() => {
    // Stage 1: Intersection between catalog and saved bookmarks
    let list = filterByIds(events, savedIds);

    // Stage 2: Optional temporal filtering
    if (dateFilter) {
      list = filterByDate(list, dateFilter);
    }

    return list;
  }, [events, savedIds, dateFilter]);

  /**
   * Loading State:
   * Ensures visual consistency during data hydration.
   */
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
      {/* Dynamic Header: Adapts based on active filters */}
      <header className="border-b border-slate-100 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-display">
          {dateFilter ? `Plans for ${dateFilter}` : "My Saved Experiences"}
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          {displayList.length} {displayList.length === 1 ? "event" : "events"}{" "}
          found in your selection.
        </p>
      </header>

      {/* Main Content: Conditional rendering based on list length */}
      {displayList.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {displayList.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              // Functional Props: Unified with UserContext naming
              isSaved={isSaved(event.id)}
              onToggleSave={toggleSavedEvent}
              // UX Flag: Displays the 'Remove' UI variant for the personal collection
              showRemoveButton={true}
            />
          ))}
        </div>
      ) : (
        /* Empty State: Encourages user to return to discovery flow */
        <div
          className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200"
          role="status"
        >
          <p className="text-slate-400 text-lg italic">
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
