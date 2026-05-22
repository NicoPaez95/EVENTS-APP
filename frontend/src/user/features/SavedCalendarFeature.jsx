/**
 * @file SavedCalendarFeature.jsx
 * @description Smart container and feature orchestrator component.
 * Synchronizes global event catalogs, user bookmarks, and local calendar viewport states,
 * handling side-effects and data transformations cleanly.
 * @module features/user/SavedCalendarFeature
 * @author Nico Paez
 */

import React, { useMemo, useState, useCallback } from "react";
import { useEvents } from "../../events/hooks/useEvents";
import { useUser } from "../context/UserContext";
import SavedEventsCalendar from "../components/SavedEventsCalendar";
import { addMonths, subMonths, setMonth } from "date-fns";
import { groupSavedEventsByDate } from "events/utils/eventTransformers";

/**
 * SavedCalendarFeature Component (Smart / Feature Orchestrator).
 *
 * Orchestrates global event catalogs and personal bookmarks to manage calendar views
 * and handle single-day event selections inline without routing mutations.
 *
 * @component
 * @category Features/User
 * @returns {React.JSX.Element} The orchestrated SavedEventsCalendar with responsive internal state.
 */
const SavedCalendarFeature = () => {
  const { events } = useEvents();
  const { savedIds = [] } = useUser(); // Ensure dynamic fallback to avoid mapping breaks

  /**
   * Calendar Viewport State:
   * Tracks which month/year the user is currently inspecting.
   * @type {[Date, function]}
   */
  const [currentDate, setCurrentDate] = useState(new Date());

  /**
   * Inline Selection State:
   * Stores the selected ISO date string (YYYY-MM-DD) to render previews inside the same view.
   * @type {[string|null, function]}
   */
  const [selectedDateKey, setSelectedDateKey] = useState(null);

  /**
   * Data Orchestration (Memoized):
   * Transforms the flat event list into an O(1) lookup dictionary.
   * Forces re-evaluation explicitly when savedIds reference updates.
   *
   * @type {Object.<string, Array.<Object>>}
   */
  const eventsByDate = useMemo(() => {
    // Structural integrity check to handle fast context updates safely
    if (!events || !savedIds) return {};
    return groupSavedEventsByDate(events, savedIds);
  }, [events, JSON.stringify(savedIds)]); // Stringify safety ensures deep array equality detection

  /**
   * Advances the calendar viewport state forward by exactly one month
   * and clears active day selections to avoid cross-month visual bugs.
   * @function
   */
  const handleNextMonth = useCallback(() => {
    setCurrentDate((prev) => addMonths(prev, 1));
    setSelectedDateKey(null);
  }, []);

  /**
   * Rewinds the calendar viewport state backward by exactly one month
   * and clears active day selections to avoid cross-month visual bugs.
   * @function
   */
  const handlePrevMonth = useCallback(() => {
    setCurrentDate((prev) => subMonths(prev, 1));
    setSelectedDateKey(null);
  }, []);

  /**
   * Direct month alteration controller that modifies the current date state by index
   * and resets active day selection flags.
   * @function
   * @param {number} index - The zero-indexed integer representation of the target month (0-11).
   */
  const handleSelectMonth = useCallback((index) => {
    setCurrentDate((prev) => setMonth(prev, index));
    setSelectedDateKey(null);
  }, []);

  /**
   * Captures the selected day key locally without triggering route changes.
   * Toggles selection off if the same key is clicked sequentially.
   * @function
   * @param {string} dateKey - The full ISO timestamp string representation of the target date.
   */
  const handleDateClick = useCallback((dateKey) => {
    setSelectedDateKey((prevKey) => (prevKey === dateKey ? null : dateKey));
  }, []);

  return (
    <div className="space-y-6">
      <SavedEventsCalendar
        currentDate={currentDate}
        eventsMap={eventsByDate}
        selectedDate={selectedDateKey}
        onDateClick={handleDateClick}
        onNextMonth={handleNextMonth}
        onPrevMonth={handlePrevMonth}
        onSelectMonth={handleSelectMonth}
      />
    </div>
  );
};

export default SavedCalendarFeature;
