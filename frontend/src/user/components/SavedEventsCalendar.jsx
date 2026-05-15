/**
 * @file SavedEventsCalendar.jsx
 * @description Presentational high-fidelity calendar interface component.
 * Visualizes user-saved events mapping inside a structural monthly grid arrangement.
 * @module components/user/SavedEventsCalendar
 * @author Nico Paez
 */

import { useState } from "react";
import { format } from "date-fns";
import { getCalendarGrid } from "../../shared/utils/dateHelpers";
import ActionLink from "../../shared/components/UI/ActionLink";

/**
 * Static UI Icon representing a downwards arrow indicator.
 * Stored outside the component to prevent redundant memory allocation during re-renders.
 * @type {JSX.Element}
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

/**
 * Static UI Icon representing a left calendar paging arrow.
 * Stored outside the component to prevent redundant memory allocation during re-renders.
 * @type {JSX.Element}
 */
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

/**
 * Static UI Icon representing a right calendar paging arrow.
 * Stored outside the component to prevent redundant memory allocation during re-renders.
 * @type {JSX.Element}
 */
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

/**
 * Static abbreviation strings for calendar months layout lookup.
 * @type {Array<string>}
 */
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

/**
 * Static initials representing structural weekdays titles mapping.
 * @type {Array<string>}
 */
const WEEKDAYS_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];

/**
 * SavedEventsCalendar Component (Presentational).
 *
 * Implements an advanced UI monthly matrix layout. Resolves grid boundaries dynamically
 * based on operational time anchors while isolating internal navigational layout open states.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Date} props.currentDate - Core temporal anchor JavaScript date reference object representing the currently selected month context.
 * @param {Object.<string, Array.<Object>>} [props.eventsMap={}] - A structured hash map mapping localized ISO date strings ("yyyy-MM-dd") to groups of event objects.
 * @param {function} props.onDateClick - Event handler callback fired when interacting with an eligible calendar day cell. Receives an ISO date string.
 * @param {function} props.onNextMonth - Control workflow callback triggered to step forward into the next consecutive month context.
 * @param {function} props.onPrevMonth - Control workflow callback triggered to step backward into the previous consecutive month context.
 * @param {function} props.onSelectMonth - Inline execution handler callback triggered during matrix navigation changes. Receives the explicit index integer.
 * @returns {JSX.Element} A flexible interactive grid element encapsulating date cells and preview tooltips.
 */
const SavedEventsCalendar = ({
  currentDate,
  eventsMap = {},
  onDateClick,
  onNextMonth,
  onPrevMonth,
  onSelectMonth,
}) => {
  /**
   * Boolean state that controls the dropdown menu visibility for structural quick month selections.
   * @type {[boolean, function]}
   */
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  /**
   * Localized calendar string key targeting the single date node cell actively hovered by the user pointer.
   * @type {[string|null, function]}
   */
  const [hoveredDate, setHoveredDate] = useState(null);

  /**
   * Destructured return arrays capturing days count and offsetting empty prefix cells.
   * @type {{days: Array.<number>, blanks: Array.<null>}}
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

      {/* Week Header */}
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
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="aspect-square"></div>
        ))}

        {days.map((day) => {
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

              {/* Event Preview Tooltip */}
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
        <ActionLink to="/user/saved-events" centered>
          View full collection
        </ActionLink>
      </footer>
    </section>
  );
};

export default SavedEventsCalendar;
