/**
 * @file SavedCalendarFeature.jsx
 * @description Smart container and feature orchestrator component that coordinates global event catalogs,
 * user bookmarks, and updates the local viewport while dispatching strict calendar query filters.
 * @module features/user/SavedCalendarFeature
 * @author Nico Paez
 */

import React, { useMemo, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEvents } from "../../events/hooks/useEvents";
import { useUser } from "../context/UserContext";
import SavedEventsCalendar from "../components/SavedEventsCalendar";
import { addMonths, subMonths, setMonth } from "date-fns";
import { groupSavedEventsByDate } from "events/utils/eventTransformers";

/**
 * SavedCalendarFeature Component.
 *
 * This feature-level smart orchestrator connects calendar viewport states with cross-domain
 * context providers, translating atomic grid selections into explicit localized URL state updates.
 *
 * @component
 * @category Features/User
 * @returns {React.JSX.Element} The structured calendar view integrated with dynamic contextual headers.
 */
const SavedCalendarFeature = () => {
  /**
   * Global Catalog Context.
   * Accesses core master event collection data layers.
   */
  const { events } = useEvents();

  /**
   * User Domain State Consumption.
   * Pulls localized user configuration arrays to manage bookmark references safely.
   */
  const { savedIds = [] } = useUser();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /**
   * Calendar Viewport State.
   * Tracks the active month and year calendar matrix currently being inspected by the user.
   * @type {[Date, function]}
   */
  const [currentDate, setCurrentDate] = useState(new Date());

  /**
   * Extracted Temporal Parameter.
   * Reads the active query sequence directly from the URL browser boundaries to sync visual grid nodes.
   * @type {string|null}
   */
  const activeUrlDate = searchParams.get("date");

  /**
   * O(1) Data Transformation Matrix (Memoized).
   * Bundles linear master events mapping collections against active user selections into data blocks.
   * Forces recalculation when user bookmark arrays deep-equality references update.
   */
  const eventsByDate = useMemo(() => {
    if (!events || !savedIds) return {};
    return groupSavedEventsByDate(events, savedIds);
  }, [events, JSON.stringify(savedIds)]);

  /**
   * Advances the calendar viewport context forward sequentially by exactly one month.
   * @function
   */
  const handleNextMonth = useCallback(() => {
    setCurrentDate((prev) => addMonths(prev, 1));
  }, []);

  /**
   * Rewinds the calendar viewport context backward sequentially by exactly one month.
   * @function
   */
  const handlePrevMonth = useCallback(() => {
    setCurrentDate((prev) => subMonths(prev, 1));
  }, []);

  /**
   * Intercepts directly specified month selections by index positions to update grid layouts.
   * @function
   * @param {number} index - The zero-indexed numerical representation of target months (0-11).
   */
  const handleSelectMonth = useCallback((index) => {
    setCurrentDate((prev) => setMonth(prev, index));
  }, []);

  /**
   * Dispatches the user to the list page with the selected date as a clean query parameter.
   * Strips out structural time compound flags to prevent cross-timezone rendering anomalies.
   *
   * @function
   * @param {string} dateKey - The full ISO timestamp string representation of the target date.
   */
  const handleDateClick = useCallback(
    (dateKey) => {
      const cleanKey = dateKey.split("T")[0]; // Extracts clean sequence: "YYYY-MM-DD"
      navigate(`/user/saved-events?date=${cleanKey}`);
    },
    [navigate]
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Contextual Header Layer */}
      <header className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight uppercase font-display">
          My Saved Events Calendar
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Visually explore and manage the customized experiences you have
          reserved month by month.
        </p>
      </header>

      {/* Presentational Calendar Component View */}
      <SavedEventsCalendar
        currentDate={currentDate}
        eventsMap={eventsByDate}
        selectedDate={activeUrlDate}
        onDateClick={handleDateClick}
        onNextMonth={handleNextMonth}
        onPrevMonth={handlePrevMonth}
        onSelectMonth={handleSelectMonth}
      />
    </div>
  );
};

export default SavedCalendarFeature;
