import { useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../../events/hooks/useEvents";
import { useUser } from "../context/UserContext";
import SavedEventsCalendar from "../components/SavedEventsCalendar";
import { addMonths, subMonths, setMonth } from "date-fns";
import { groupSavedEventsByDate } from "events/utils/eventTransformers";

/**
 * SavedCalendarFeature Component (Smart/Feature Orchestrator).
 * * This orchestrator bridges the global event catalog with the user's private data.
 * It manages the temporal state (navigation between months) and transforms raw
 * event arrays into a high-performance dictionary indexed by date.
 * * **Core Responsibilities**:
 * 1. **Data Indexing**: Filters and groups events using `groupSavedEventsByDate` to
 * optimize lookup during calendar grid rendering.
 * 2. **Navigation Logic**: Controls the temporal window (month/year) without
 * affecting global state.
 * 3. **Stable API Delivery**: Memoizes event handlers to prevent unnecessary
 * re-renders of the specialized `SavedEventsCalendar` UI.
 * * @component
 * @category Features/User
 * @returns {JSX.Element} The orchestrated SavedEventsCalendar with live user data.
 */
const SavedCalendarFeature = () => {
  const navigate = useNavigate();

  /** * Domain Hook Consumption:
   * Retrieves the master event list and the user's bookmarked IDs.
   */
  const { events } = useEvents();
  const { savedIds } = useUser();

  /**
   * Calendar Viewport State:
   * Tracks which month/year the user is currently inspecting.
   */
  const [currentDate, setCurrentDate] = useState(new Date());

  /**
   * Data Orchestration (Memoized):
   * Transforms the flat event list into an O(1) lookup dictionary.
   * Re-calculates only when the catalog changes or the user saves/unsaves an event.
   */
  const eventsByDate = useMemo(() => {
    return groupSavedEventsByDate(events, savedIds);
  }, [events, savedIds]);

  /**
   * Navigation Handlers (Memoized):
   * stable references are crucial for the performance of the pure UI component.
   */

  /**
   * Redirects to the detailed list view for a specific date using URL parameters.
   * @param {string} dateKey - The ISO date string (YYYY-MM-DD).
   */
  const handleDateClick = useCallback(
    (dateKey) => {
      navigate(`/user/saved-events?date=${dateKey}`);
    },
    [navigate]
  );

  const handleNextMonth = useCallback(() => {
    setCurrentDate((prev) => addMonths(prev, 1));
  }, []);

  const handlePrevMonth = useCallback(() => {
    setCurrentDate((prev) => subMonths(prev, 1));
  }, []);

  /**
   * Directly sets the calendar month focus.
   * @param {number} index - Month index from 0 (Jan) to 11 (Dec).
   */
  const handleSelectMonth = useCallback((index) => {
    setCurrentDate((prev) => setMonth(prev, index));
  }, []);

  return (
    <SavedEventsCalendar
      currentDate={currentDate}
      eventsMap={eventsByDate}
      onDateClick={handleDateClick}
      onNextMonth={handleNextMonth}
      onPrevMonth={handlePrevMonth}
      onSelectMonth={handleSelectMonth}
    />
  );
};

export default SavedCalendarFeature;
