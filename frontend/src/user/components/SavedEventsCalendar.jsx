import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { getCalendarGrid } from "../../shared/utils/dateHelpers";

/**
 * UI Icons & Constants.
 * Stored outside the component to prevent redundant memory allocation during re-renders.
 */
const CHEVRON_DOWN = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const CHEVRON_LEFT = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const CHEVRON_RIGHT = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEKDAYS_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];

/**
 * SavedEventsCalendar Component (Presentational).
 *
 * A high-fidelity calendar interface that visualizes user-saved events in a
 * monthly grid. It focuses on providing a rich interactive experience through
 * custom tooltips and month navigation.
 *
 * **Architectural Logic**:
 * - **Grid Management**: Delegates complex date calculations to `getCalendarGrid`.
 * - **Data Indexing**: Uses an O(1) lookup strategy via `eventsMap` for date highlighting.
 * - **UX feedback**: Implements a local state for month picking and contextual tooltips.
 *
 * @component
 * @category Components/User
 * @param {Object} props - Component properties.
 * @param {Date} props.currentDate - The reference date for the active month.
 * @param {Object.<string, Array>} props.eventsMap - Hash map of events indexed by ISO date keys.
 * @param {Function} props.onDateClick - Callback when an active date cell is selected.
 * @param {Function} props.onNextMonth - Trigger to advance the temporal window.
 * @param {Function} props.onPrevMonth - Trigger to reverse the temporal window.
 * @param {Function} props.onSelectMonth - Direct jump to a specific month index (0-11).
 * @returns {JSX.Element} An interactive calendar grid with event-driven highlighting.
 */
const SavedEventsCalendar = ({
  currentDate,
  eventsMap = {},
  onDateClick,
  onNextMonth,
  onPrevMonth,
  onSelectMonth,
}) => {
  /** * UI Interaction State.
   * Manages transient interface states like dropdown visibility and hover previews.
   */
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);

  /** * Grid Data Preparation.
   * Extracts 'days' for rendering and 'blanks' for weekday alignment.
   */
  const { days, blanks } = getCalendarGrid(currentDate);

  return (
    <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 min-h-[380px] relative">
      {/* Header: Temporal Context & Picker Toggle */}
      <header className="flex justify-between items-center mb-6">
        <div className="relative">
          <button
            onClick={() => setShowMonthPicker(!showMonthPicker)}
            className="group flex items-center gap-2 hover:bg-slate-50 px-2 py-1 -ml-2 rounded-lg transition-all"
            aria-haspopup="grid"
            aria-expanded={showMonthPicker}
          >
            <div>
              <h2 className="text-lg font-bold text-slate-800 capitalize leading-none flex items-center gap-1">
                {format(currentDate, "MMMM yyyy")}
                <span
                  className={`transition-transform duration-200 ${showMonthPicker ? "rotate-180" : ""}`}
                >
                  {CHEVRON_DOWN}
                </span>
              </h2>
              <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">
                Click to change month
              </span>
            </div>
          </button>

          {/* Month Selection Menu */}
          {showMonthPicker && (
            <div className="absolute top-12 left-0 z-50 bg-white border border-slate-200 shadow-2xl rounded-xl p-3 w-64 animate-in fade-in zoom-in-95 duration-200">
              <div className="grid grid-cols-3 gap-2">
                {MONTHS_SHORT.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => {
                      onSelectMonth(index);
                      setShowMonthPicker(false);
                    }}
                    className={`text-xs py-2 rounded-lg font-medium transition-colors ${
                      currentDate.getMonth() === index
                        ? "bg-blue-600 text-white"
                        : "hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-1">
          <button
            onClick={onPrevMonth}
            aria-label="Previous month"
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          >
            {CHEVRON_LEFT}
          </button>
          <button
            onClick={onNextMonth}
            aria-label="Next month"
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          >
            {CHEVRON_RIGHT}
          </button>
        </div>
      </header>

      {/* Week Header: Days of the week initials */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {WEEKDAYS_INITIALS.map((day, i) => (
          <div
            key={i}
            className="text-[10px] font-bold text-slate-300 text-center uppercase tracking-widest"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Primary Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 relative">
        {/* Padding cells for previous month overflow */}
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="aspect-square"></div>
        ))}

        {days.map((day) => {
          // Precise Date Key Generation for Map Lookup
          const dateInstance = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          );
          const dateKey = format(dateInstance, "yyyy-MM-dd");
          const dayEvents = eventsMap[dateKey] || [];
          const hasEvents = dayEvents.length > 0;

          return (
            <div key={day} className="relative">
              <button
                onMouseEnter={() => hasEvents && setHoveredDate(dateKey)}
                onMouseLeave={() => setHoveredDate(null)}
                onClick={() => hasEvents && onDateClick(dateKey)}
                disabled={!hasEvents}
                className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs transition-all ${
                  hasEvents
                    ? "bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md scale-105"
                    : "bg-slate-50 text-slate-400 cursor-default"
                }`}
              >
                {day}
              </button>

              {/* Event Preview Tooltip: Displayed on hover for active dates */}
              {hoveredDate === dateKey && hasEvents && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-[60] w-36 bg-white rounded-xl shadow-2xl border border-slate-100 p-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                    <img
                      src={
                        dayEvents[0].image || "https://via.placeholder.com/150"
                      }
                      alt={dayEvents[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[9px] font-bold text-slate-800 mt-1.5 truncate px-1 text-center">
                    {dayEvents[0].title}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <footer className="mt-6 pt-3 border-t border-slate-100">
        <Link
          to="/user/saved-events"
          className="text-[10px] font-bold text-blue-600 hover:text-blue-800 transition-colors block text-center uppercase tracking-widest"
        >
          View full collection →
        </Link>
      </footer>
    </section>
  );
};

export default SavedEventsCalendar;
