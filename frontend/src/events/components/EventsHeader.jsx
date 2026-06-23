/**
 * @file EventsHeader.jsx
 * @description Presentational header component for the events catalog section.
 * Displays domain typography and interactive shortcuts alongside a contextual animated loading micro-state.
 * @module components/events/EventsHeader
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { Search } from "lucide-react";
import PageHeader from "shared/components/UI/PageHeader";

/**
 * @typedef {Object} EventsHeaderProps
 * @property {boolean} [isLoading=false] - Operational flag to trigger the active search animation.
 * @property {function(): void} onSearchFocusRequested - Callback notification dispatched when the search focus action is triggered.
 * @property {string} exploreEvents - Localized header text title for catalog exploration.
 * @property {string} searchExperiences - Localized loading text indicator displayed during catalog querying.
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
const EventsHeader = ({
  isLoading = false,
  onSearchFocusRequested,
  exploreEvents,
  searchExperiences,
}) => {
  return (
    <>
      {/* Polymorphic header resolving direct flex nodes injection */}
      <PageHeader
        level={2}
        className="mb-6"
        title={
          <div className="flex items-center gap-3">
            <span>{exploreEvents}</span>
            <button
              type="button"
              onClick={onSearchFocusRequested}
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              aria-label="Focus search input bar"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        }
        description={
          isLoading && (
            <span className="text-sm font-medium text-blue-600 animate-pulse flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
              {searchExperiences}
            </span>
          )
        }
      />
    </>
  );
};
EventsHeader.propTypes = {
  isLoading: PropTypes.bool,
  onSearchFocusRequested: PropTypes.func.isRequired,
  exploreEvents: PropTypes.string.isRequired,
  searchExperiences: PropTypes.string.isRequired,
};

export default EventsHeader;
