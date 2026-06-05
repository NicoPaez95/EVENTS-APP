/**
 * @file EventDiscovery.jsx
 * @description Feature orchestrator connecting global event filters with the presentational SearchBar.
 * Dispatches a decoupled custom DOM event upon successful search execution to allow secondary layouts to respond.
 * Listens for systemic focus request broadcasts to anchor structural viewport elements.
 * @module features/events/EventDiscovery
 * @author Nico Paez
 */

import React, { useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import { useEvents } from "../hooks/useEvents";
import { hasActiveFilterCriteria } from "../utils/filterEvents";

/**
 * EventDiscovery Feature Component.
 *
 * Orchestrates the search interaction layer. Emits a broadcasted custom DOM event
 * whenever search execution occurs, allowing contextual features (like main grids)
 * to safely trigger focus or scroll states without structural coupling.
 *
 * @component
 * @category Features
 * @returns {React.JSX.Element} Composed feature section hosting the autonomous search bar.
 */
const EventDiscoveryFeature = () => {
  const { handleSearch, suggestions } = useEvents();

  /**
   * Dedicated DOM reference used to target the core structural input inside presentation fields.
   * @type {React.RefObject<HTMLInputElement>}
   */
  const mainSearchInputRef = useRef(null);

  /**
   * Effect: Systemic Search Focus Synchronization.
   * Mounts a window-level event interaction broker to intercept global focus requests
   * dispatched by external presentational layout anchors.
   */
  useEffect(() => {
    /**
     * Handles incoming global focus broadcast triggers by scrolling smoothly
     * to the target input field boundaries and assigning focus.
     */
    const handleFocusRequested = () => {
      if (mainSearchInputRef.current) {
        // Smoothly position user viewport over the input center bounds
        mainSearchInputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Grant system cursor focus over the primary text field, stopping instant native jumps
        mainSearchInputRef.current.focus({ preventScroll: true });
      }
    };

    window.addEventListener("app:search-focus-requested", handleFocusRequested);

    return () => {
      window.removeEventListener(
        "app:search-focus-requested",
        handleFocusRequested
      );
    };
  }, []);

  /**
   * Intercepts search submittal requests from the UI layout.
   * Updates the global business domain filters and dispatches a lightweight notification event.
   *
   * @param {import('../components/SearchBar').SearchFilters} searchFilters - Aggregated field parameters from the form inputs.
   * @param {boolean} isStrict - Validation strictness flag.
   * @returns {void}
   */
  const UISearchTrigger = (searchFilters, isStrict) => {
    // Fire original domain logic data fetching pipeline
    handleSearch(searchFilters, isStrict);

    // Broadcast decoupled custom DOM event exclusively when conditions are actively populated
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
        inputRef={mainSearchInputRef}
        onSearch={UISearchTrigger}
        getTitleSuggestions={suggestions.getTitle}
        getCategorySuggestions={suggestions.getCategory}
        getLocationSuggestions={suggestions.getLocation}
      />
    </section>
  );
};

export default EventDiscoveryFeature;
