/**
 * @file UpcomingListFeature.jsx
 * @description Feature orchestrator component that manages the "Upcoming Experiences" view.
 * Coordinates time-based proximity filters with global bookmark persistence synchronization hooks.
 * @module features/events/UpcomingListFeature
 * @author Nico Paez
 */

import React, { useState, useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import EventGrid from "../components/EventGrid";
import { filterEventsByTime } from "events/utils/eventHelpers";
import TimeFilterNav from "../../shared/components/UI/TimeFilterNav";
import useToggleEventSave from "user/hooks/useToggleEventSave";

/**
 * UpcomingListFeature Component.
 *
 * This smart orchestrator provides a time-window filtering boundary layer, managing state transitions
 * between user session curation states and real-time chronological data structures.
 *
 * @component
 * @category Features/Events
 * @returns {React.JSX.Element} Composed chronological discovery shell containing time filters and a populated results grid.
 */
const UpcomingListFeature = () => {
  /**
   * User Session Bookmarking Hook.
   * Pulls structural cross-domain handler states to toggle user bookmarks and intercept active selection ids.
   */
  const { onToggleSave, isEventSaved } = useToggleEventSave();

  /**
   * Global Catalog State Consumption.
   * Extract historical core event metadata collection registries and active runtime data hydration flags.
   */
  const { events, loading } = useEvents();

  /**
   * Internal Time Filter State.
   * Tracks the currently active structural temporal window scope query parameter.
   * @type {'24h' | '7d' | '30d' | 'all'}
   */
  const [timeFilter, setTimeFilter] = useState("7d");

  /**
   * Date Pipeline Filtering Logic (Memoized).
   * Prevents expensive iterative parsing re-filtering execution workflows during unrelated parent triggers.
   */
  const filteredEvents = useMemo(() => {
    return filterEventsByTime(events, timeFilter);
  }, [events, timeFilter]);

  /**
   * Hydration Guard.
   * Renders visual scan feedback metrics while the main async catalog records are being populated.
   */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-slate-600 animate-pulse">
          Scanning the horizon for upcoming experiences...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8 animate-fade-in">
      {/* Feature Header & Filter Controls */}
      <header className="space-y-6">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Upcoming Experiences
        </h2>

        <TimeFilterNav
          activeFilter={timeFilter}
          onFilterChange={setTimeFilter}
        />
      </header>

      {/* Results Section: Presentational Layer */}
      <section aria-label="Filtered Events Grid">
        {filteredEvents.length > 0 ? (
          <EventGrid
            events={filteredEvents}
            onToggleSave={onToggleSave}
            isEventSaved={isEventSaved}
          />
        ) : (
          /* Empty State Handler for filtered results */
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500 text-lg">
              No events found for this specific period.
            </p>
            <button
              type="button"
              onClick={() => setTimeFilter("all")}
              className="mt-4 text-blue-600 font-semibold hover:underline"
            >
              Show all upcoming events
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default UpcomingListFeature;
