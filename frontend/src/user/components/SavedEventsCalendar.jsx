/**
 * @file SavedEventsCalendar.jsx
 * @description Presentational high-fidelity calendar interface component.
 * Visualizes user-saved events mapping inside a structural monthly grid arrangement.
 * @module components/user/SavedEventsCalendar
 * @author Nico Paez
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { getCalendarGrid } from "../../shared/utils/dateHelpers";
import ActionLink from "../../shared/components/UI/ActionLink";

/**
 * Static UI SVG Icon representing a generic chevron down vector asset.
 * @type {React.JSX.Element}
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
 * Static UI SVG Icon representing a generic chevron left vector asset.
 * @type {React.JSX.Element}
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
 * Static UI SVG Icon representing a generic chevron right vector asset.
 * @type {React.JSX.Element}
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
 * Month short abbreviations used within the local dropdown popover interface.
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
 * Weekday singular initials displayed at the top grid level layout of the component.
 * @type {Array<string>}
 */
const WEEKDAYS_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];

/**
 * @typedef {Object} CalendarI18nLabels
 * @property {string} changeMonth - Localized small banner caption indicating interactive dropdown triggers.
 * @property {string} actionLink - Localized redirection label located inside the footer ActionLink element.
 */

/**
 * @typedef {Object} SavedEventsCalendarI18n
 * @property {CalendarI18nLabels} SavedEventsCalendar - Namespace nested translation bindings for the calendar workspace.
 */

/**
 * SavedEventsCalendar Component (Presentational).
 *
 * Renders a standard calendar structure to map bookmarked items. Implements high-performance
 * event listeners for cell hovers, abstracting complex transformations to parent features.
 *
 * @component
 * @category Components/User
 * @param {Object} props - The component properties.
 * @param {Date} props.currentDate - Reference date object used to frame the current monthly view context.
 * @param {Object<string, Array<Object>>} [props.eventsMap={}] - High-efficiency dictionary lookup mapping ISO timestamp strings to arrays of saved event objects.
 * @param {string|null} props.selectedDate - The active full ISO string key indicating a single-day item selection.
 * @param {function(string): void} props.onDateClick - Event handler triggered when clicking an eligible day cell wrapper. Receives the string ISO date key.
 * @param {function(): void} props.onNextMonth - Callback function responsible for advancing the temporal calendar state forward by one month.
 * @param {function(): void} props.onPrevMonth - Callback function responsible for rewinding the temporal calendar state backward by one month.
 * @param {function(number): void} props.onSelectMonth - Direct month alteration dropdown handler. Receives the numeric 0-indexed month index value.
 * @param {SavedEventsCalendarI18n} props.i18n - Explicit translation schema dictionary passed down by structural parents.
 * @returns {React.JSX.Element} The presentational interactive calendar shell mesh.
 */
const SavedEventsCalendar = ({
  currentDate,
  eventsMap = {},
  selectedDate,
  onDateClick,
  onNextMonth,
  onPrevMonth,
  onSelectMonth,
  i18n,
}) => {
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);
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
                {i18n.SavedEventsCalendar.changeMonth}
              </span>
            </div>
          </button>

          {/* Month Selection Dropdown */}
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

        {/* Navigation Controllers */}
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

      {/* Week Day Labels */}
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

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2 relative">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="aspect-square"></div>
        ))}

        {days.map((day) => {
          /**
           * Build standard UTC midnights to eliminate time zone displacement offsets.
           * This matches the exact ISO string schema used to index keys inside eventsMap.
           */
          const utcDate = new Date(
            Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), day)
          );
          const dateKey = utcDate.toISOString();

          const dayEvents = eventsMap[dateKey] || [];
          const hasEvents = dayEvents.length > 0;
          const isSelected = selectedDate === dateKey;

          // Resolve dynamic layout styles for day buttons based on event status
          let buttonStyles = "bg-slate-50 text-slate-400 cursor-default";
          if (hasEvents) {
            buttonStyles = isSelected
              ? "bg-blue-800 text-white font-bold ring-2 ring-offset-2 ring-blue-600 scale-105 shadow-md"
              : "bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md scale-105";
          }

          return (
            <div key={day} className="relative">
              <button
                onMouseEnter={() => hasEvents && setHoveredDate(dateKey)}
                onMouseLeave={() => setHoveredDate(null)}
                onClick={() => hasEvents && onDateClick(dateKey)}
                disabled={!hasEvents}
                className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs transition-all ${buttonStyles}`}
              >
                {day}
              </button>

              {/* Hover Tooltip Preview */}
              {hoveredDate === dateKey && hasEvents && !isSelected && (
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

      {/* Footer redirection asset link container */}
      <footer className="mt-6 pt-3 border-t border-slate-100">
        <ActionLink to="/user/saved-events" centered>
          {i18n.SavedEventsCalendar.actionLink}
        </ActionLink>
      </footer>
    </section>
  );
};

SavedEventsCalendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  eventsMap: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
  selectedDate: PropTypes.string,
  onDateClick: PropTypes.func.isRequired,
  onNextMonth: PropTypes.func.isRequired,
  onPrevMonth: PropTypes.func.isRequired,
  onSelectMonth: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    SavedEventsCalendar: PropTypes.shape({
      changeMonth: PropTypes.string.isRequired,
      actionLink: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SavedEventsCalendar;
