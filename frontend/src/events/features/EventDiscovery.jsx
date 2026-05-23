/**
 * @file EventDiscovery.jsx
 * @description Feature orchestrator connecting global event filters with the presentational SearchBar.
 * Dispatches a decoupled custom DOM event upon successful search execution to allow secondary layouts to respond.
 * @module features/events/EventDiscovery
 * @author Nico Paez
 */

import React from "react";
import SearchBar from "../components/SearchBar";
import { useEvents } from "../hooks/useEvents";
import { hasActiveFilterCriteria } from "../utils/filterEvents";

/**
 * EventDiscovery Feature Component.
 *
 * Orchestrates the search interaction layer. Emits a broad-casted custom DOM event
 * whenever search execution occurs, allowing contextual features (like main grids)
 * to safely trigger focus or scroll states without structural coupling.
 *
 * @component
 * @category Features
 * @returns {React.JSX.Element} Composed feature section hosting the autonomous search bar.
 */
const EventDiscovery = () => {
  const { handleSearch, suggestions } = useEvents();

  /**
   * Intercepts search submittal requests from the UI layout.
   * Updates the global business domain filters and dispatches a lightweight notification event.
   *
   * @param {Object} searchFilters - Aggregated field parameters from the form inputs.
   * @param {boolean} isStrict - Validation strictness flag.
   */
  const UISearchTrigger = (searchFilters, isStrict) => {
    // 1. Fire original domain logic data fetching pipeline
    handleSearch(searchFilters, isStrict);

    // 2. Broadcast decoupled custom DOM event exclusively when conditions are actively populated
    if (hasActiveFilterCriteria(searchFilters)) {
      const searchEvent = new CustomEvent("app:event-search-submitted", {
        detail: { filters: searchFilters, isStrict },
      });
      window.dispatchEvent(searchEvent);
    }
  };

  return (
    <section className="space-y-6" aria-label="Event search and discovery">
      <SearchBar
        onSearch={UISearchTrigger}
        getTitleSuggestions={suggestions.getTitle}
        getCategorySuggestions={suggestions.getCategory}
        getLocationSuggestions={suggestions.getLocation}
      />
    </section>
  );
};

export default EventDiscovery;
