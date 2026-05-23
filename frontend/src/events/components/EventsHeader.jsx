/**
 * @file EventsHeader.jsx
 * @description Presentational header component for the events catalog section.
 * Displays domain typography and interactive shortcuts alongside a contextual animated loading micro-state.
 * @module components/events/EventsHeader
 * @author Nico Paez
 */

import React from "react";
import { Search } from "lucide-react";

/**
 * @typedef {Object} EventsHeaderProps
 * @property {boolean} [isLoading=false] - Operational flag to trigger the active search animation.
 * @property {function(): void} onSearchFocusRequested - Callback notification dispatched when the search focus action is triggered.
 */

/**
 * EventsHeader Presentational Component.
 *
 * Renders the section title, a quick-action button to delegate focus back to the
 * search input bar, and a contextual loading micro-state indicator.
 *
 * @component
 * @category Components/Events
 * @param {EventsHeaderProps} props - The component props.
 * @returns {React.JSX.Element} The rendered presentational header.
 */
const EventsHeader = ({ isLoading = false, onSearchFocusRequested }) => {
  return (
    <div className="mb-6 space-y-1">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-slate-900 font-display">
          Explore Events
        </h2>
        <button
          type="button"
          onClick={onSearchFocusRequested}
          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="Focus search input bar"
          title="Jump to search bar"
        >
          <Search className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

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
