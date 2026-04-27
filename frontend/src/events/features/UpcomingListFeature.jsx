import { useState, useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import EventGrid from "../components/EventGrid";
import { filterEventsByTime } from "events/utils/eventHelpers";

/**
 * @typedef {Object} FilterButton
 * @property {string} id - Unique identifier for the filter window (e.g., '24h', '7d').
 * @property {string} label - The human-readable text displayed on the button.
 */

/**
 * UpcomingListFeature Component (Feature Orchestrator).
 *
 * This smart component manages the "Upcoming Experiences" view, providing a
 * time-based filtering interface. It coordinates the logic for selecting
 * specific proximity windows and ensures the display is updated based on
 * chronological criteria.
 *
 * @component
 * @category Features/Events
 * @returns {JSX.Element} A layout featuring interactive time filters and a
 * responsive event grid.
 */
const UpcomingListFeature = () => {
  /** * Global State Consumption.
   * Accesses the event collection and loading status from the Events context.
   */
  const { events, loading } = useEvents();

  /**
   * timeFilter State.
   * Tracks the currently active temporal window.
   * @type {'24h' | '7d' | '30d' | 'all'}
   */
  const [timeFilter, setTimeFilter] = useState("7d");

  /**
   * Date Filtering Logic.
   * Memoizes the event subset based on the selected time window.
   * This prevents expensive re-filtering operations during unrelated
   * re-renders unless the source data or filter changes.
   * @returns {Array<Object>} Subset of events falling within the selected range.
   */
  const filteredEvents = useMemo(() => {
    return filterEventsByTime(events, timeFilter);
  }, [events, timeFilter]);

  /** * UI Configuration.
   * Static definition of available filter buttons for the navigation bar.
   * @type {FilterButton[]}
   */
  const filterButtons = [
    { id: "24h", label: "Next 24 Hours" },
    { id: "7d", label: "This Week" },
    { id: "30d", label: "This Month" },
    { id: "all", label: "All Upcoming" },
  ];

  /**
   * Loading Guard.
   * Visual feedback while the master event catalog is being populated.
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

        <nav className="flex flex-wrap gap-4" aria-label="Time filters">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setTimeFilter(btn.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${
                timeFilter === btn.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Results Section: Presentational Layer */}
      <section aria-label="Filtered Events Grid">
        {filteredEvents.length > 0 ? (
          <EventGrid events={filteredEvents} />
        ) : (
          /* Empty State Handler for filtered results */
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500 text-lg">
              No events found for this specific period.
            </p>
            <button
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
