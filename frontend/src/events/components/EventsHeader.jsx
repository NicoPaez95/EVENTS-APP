/**
 * @file EventsHeader.jsx
 * @description Presentational header component for the events catalog section.
 * Displays domain typography alongside a contextual animated loading micro-state.
 * @module components/events/EventsHeader
 * @author Nico Paez
 */

import React from "react";

/**
 * @typedef {Object} EventsHeaderProps
 * @property {boolean} [isLoading=false] - Operational flag to trigger the active search animation.
 */

/**
 * EventsHeader Presentational Component.
 *
 * @component
 * @category Components/Events
 * @param {EventsHeaderProps} props
 * @returns {JSX.Element}
 */
const EventsHeader = ({ isLoading = false }) => {
  return (
    <div className="mb-6 space-y-1">
      <h2 className="text-2xl font-bold text-slate-900 font-display">
        Explore Events
      </h2>
      {isLoading && (
        <p className="text-sm font-medium text-blue-600 animate-pulse flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
          Searching for best experiences...
        </p>
      )}
    </div>
  );
};

export default EventsHeader;
