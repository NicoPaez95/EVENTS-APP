// src/events/hooks/useEvents.js
import { useState } from "react";
import { events as mockData } from "../data/events.mock";
import { filterEvents } from "../utils/filterEvents";
import {
  getTitleSuggestions, 
  getCategorySuggestions,
  getLocationSuggestions 
} from "../utils/eventSuggestions";

/**
 * Custom Hook to manage event-related business logic.
 * * This hook centralizes event state management, filtering execution, 
 * and provides specialized suggestion providers for the search interface.
 * * @hook
 * @returns {{
 * events: Object[],
 * handleSearch: function(Object): void,
 * suggestions: {
 * getTitle: function(string): Object[],
 * getCategory: function(string): string[],
 * getLocation: function(string): string[]
 * }
 * }} The event state and orchestrated logic handlers.
 */
export const useEvents = () => {
  const [filteredEvents, setFilteredEvents] = useState(mockData);

  /**
   * Orchestrates the event filtering process.
   * * Applies the filtering logic to the full event catalog and updates 
   * the local state with the results.
   * * @param {Object} filters - Search criteria.
   * @param {string} filters.searchTerm - Text to match in event titles.
   * @param {string} filters.category - Selected category filter.
   * @param {string} filters.date - Target date string.
   * @param {string} filters.location - Target city or venue location.
   */
  const handleSearch = (filters) => {
    const results = filterEvents(mockData, filters);
    setFilteredEvents(results);
  };

  return {
    events: filteredEvents,
    handleSearch,
    suggestions: {
      /** @param {string} query */
      getTitle: (query) => getTitleSuggestions(mockData, query),
      /** @param {string} query */
      getCategory: (query) => getCategorySuggestions(mockData, query),
      /** @param {string} query */
      getLocation: (query) => getLocationSuggestions(mockData, query),
    }
  };
};