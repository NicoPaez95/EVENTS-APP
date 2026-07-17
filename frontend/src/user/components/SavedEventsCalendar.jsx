/**
 * @file SavedEventsCalendar.jsx
 * @description Presentational high-fidelity calendar interface component.
 * Visualizes user-saved events mapping inside a structural monthly grid arrangement.
 * Implements a dynamic, responsive grid tooltip to display multiple events without scrolling.
 * @module components/user/SavedEventsCalendar
 * @author Nico Paez
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { getCalendarGrid } from "../../shared/utils/dateHelpers";
import ActionLink from "../../shared/components/UI/ActionLink";
import EventThumbnail from "shared/components/UI/EventThumbnail";

/**
 * @typedef {Object} CalendarEvent
 * @property {string|number} id - Unique identifier for the event.
 * @property {string} title - The title/headline of the event.
 * @property {string} image - Source URL or reference path for the event thumbnail imagery.
 */

/**
 * @typedef {Object} CalendarLocalization
 * @property {string} changeMonth - Label text instructing the user they can modify the active calendar month.
 * @property {string} actionLink - Footer link label routing to the extended saved events overview screen.
 */

/**
 * @typedef {Object} SavedEventsCalendarI18n
 * @property {CalendarLocalization} SavedEventsCalendar - Localization tokens grouped by domain key.
 */

/**
 * @typedef {Object} SavedEventsCalendarProps
 * @property {Date} currentDate - The currently active/focused JavaScript Date pointer.
 * @property {Object.<string, CalendarEvent[]>} [eventsMap={}] - Mapping dictionary with key strings matching ISO strings containing lists of event entities.
 * @property {string} [selectedDate=null] - The ISO string pointer representing the currently active user date choice.
 * @property {function(string): void} onDateClick - Event handler triggered when selecting an active day button cell.
 * @property {function(): void} onNextMonth - Notification handler shifting pagination forward one month cycle.
 * @property {function(): void} onPrevMonth - Notification handler shifting pagination backward one month cycle.
 * @property {function(number): void} onSelectMonth - Direct pagination selection update callback matching index mappings.
 * @property {SavedEventsCalendarI18n} i18n - Core localization multi-language context values.
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
 * @component
 * @category Components/User
 * @param {SavedEventsCalendarProps} props - Component property payloads.
 * @returns {React.JSX.Element} The visual monthly grid layout structured ecosystem tree.
 */
const SavedEventsCalendar = ({
  currentDate,
  eventsMap = {},
  selectedDate = null,
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
    <section className="bg-surface rounded-2xl p-5 shadow-sm border border-secondary-border min-h-[380px] relative">
      <header className="flex justify-between items-center mb-6">
        <div className="relative">
          <button
            onClick={() => setShowMonthPicker(!showMonthPicker)}
            className="group flex items-center gap-2 hover:bg-secondary-light px-2 py-1 -ml-2 rounded-lg transition-all"
            aria-haspopup="grid"
            aria-expanded={showMonthPicker}
          >
            <div>
              <h2 className="text-lg font-sans font-bold text-primary capitalize leading-none flex items-center gap-1">
                {format(currentDate, "MMMM yyyy")}
                <span
                  className={`transition-transform duration-200 ${showMonthPicker ? "rotate-180" : ""}`}
                >
                  {CHEVRON_DOWN}
                </span>
              </h2>
              <span className="font-sans text-[10px] text-accent font-bold uppercase tracking-tighter block mt-0.5">
                {i18n.SavedEventsCalendar.changeMonth}
              </span>
            </div>
          </button>

          {showMonthPicker && (
            <div className="absolute top-12 left-0 z-50 bg-surface border border-secondary-border shadow-2xl rounded-xl p-3 w-64 animate-in fade-in zoom-in-95 duration-200">
              <div className="grid grid-cols-3 gap-2">
                {MONTHS_SHORT.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => {
                      onSelectMonth(index);
                      setShowMonthPicker(false);
                    }}
                    className={`text-xs py-2 rounded-lg font-semibold transition-colors ${
                      currentDate.getMonth() === index
                        ? "bg-accent text-inverse"
                        : "hover:bg-secondary-light text-secondary-dark"
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-1">
          <button
            onClick={onPrevMonth}
            aria-label="Previous month"
            className="p-2 hover:bg-secondary-light rounded-lg text-secondary hover:text-primary transition-colors"
          >
            {CHEVRON_LEFT}
          </button>
          <button
            onClick={onNextMonth}
            aria-label="Next month"
            className="p-2 hover:bg-secondary-light rounded-lg text-secondary hover:text-primary transition-colors"
          >
            {CHEVRON_RIGHT}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {WEEKDAYS_INITIALS.map((day, i) => (
          <div
            key={i}
            className="text-[10px] font-bold text-secondary text-center uppercase tracking-widest opacity-60"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 relative">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="aspect-square"></div>
        ))}

        {days.map((day) => {
          const utcDate = new Date(
            Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), day)
          );
          const dateKey = utcDate.toISOString();

          const dayEvents = eventsMap[dateKey] || [];
          const hasEvents = dayEvents.length > 0;
          const isSelected = selectedDate === dateKey;

          let buttonStyles = "";
          if (hasEvents) {
            buttonStyles = isSelected
              ? "bg-accent text-inverse font-bold ring-2 ring-offset-2 ring-accent scale-105 shadow-md"
              : "bg-accent/10 text-accent font-bold hover:bg-accent hover:text-inverse shadow-sm scale-105";
          } else {
            buttonStyles =
              "bg-transparent text-secondary hover:bg-secondary-light opacity-50 cursor-default";
          }

          let tooltipWidth = "w-36";
          let gridLayout = "grid-cols-1";

          if (dayEvents.length === 2) {
            tooltipWidth = "w-56";
            gridLayout = "grid-cols-2";
          } else if (dayEvents.length >= 3 && dayEvents.length <= 4) {
            tooltipWidth = "w-64";
            gridLayout = "grid-cols-2";
          } else if (dayEvents.length >= 5) {
            tooltipWidth = "w-72";
            gridLayout = "grid-cols-3";
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

              {hoveredDate === dateKey && hasEvents && !isSelected && (
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-[60] bg-surface rounded-xl shadow-2xl border border-secondary-border p-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none transition-all ${tooltipWidth}`}
                >
                  <div className={`grid gap-2 ${gridLayout}`}>
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex flex-col items-center justify-start"
                      >
                        <EventThumbnail
                          src={event.image}
                          alt={event.title}
                          size="fluid"
                          className="aspect-[4/3] shadow-sm"
                        />
                        <p className="text-[9px] font-sans font-bold text-secondary-dark mt-1.5 line-clamp-2 w-full text-center px-1 leading-tight">
                          {event.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <footer className="mt-6 pt-3 border-t border-secondary-border">
        <ActionLink to="/user/saved-events" centered>
          {i18n.SavedEventsCalendar.actionLink}
        </ActionLink>
      </footer>
    </section>
  );
};

SavedEventsCalendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  eventsMap: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      })
    )
  ),
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

// Declared explicitly to sustain architecture uniformity with the atomic design ecosystem
SavedEventsCalendar.defaultProps = {
  eventsMap: {},
  selectedDate: null,
};

export default SavedEventsCalendar;
