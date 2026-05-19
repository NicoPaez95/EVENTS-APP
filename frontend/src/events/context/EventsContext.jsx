/**
 * @file EventsContext.jsx
 * @description Global state management provider for the Events domain.
 * Implements a Single Source of Truth architecture pattern, partitioning master catalogs
 * from active presentational matrices while handling data mutations and memoized filter streams.
 * @module events/context/EventsContext
 * @author Nico Paez
 */

import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import fetchEventsService from "../services/eventService";
import { filterEvents } from "../utils/filterEvents";
import {
  getTitleSuggestions,
  getCategorySuggestions,
  getLocationSuggestions,
} from "../utils/eventSuggestions";

/**
 * @typedef {Object} EventVenueEntity
 * @property {string} name - Explicit architectural name of the venue location.
 * @property {string} city - Urban municipality geographical boundary.
 */

/**
 * @typedef {Object} ContextEventSchema
 * @property {string|number} id - Unique operational domain identification token.
 * @property {string} title - Explicit display name of the experience.
 * @property {string} category - Classification taxonomy label.
 * @property {string} date - Temporal ISO operational schedule string.
 * @property {string} [location] - General geographical text fallback location.
 * @property {EventVenueEntity} venue - Structured physical facility entity tracking data.
 * @property {boolean} [isRecommended] - Flag driving structural administrative recommendations.
 */

/**
 * @typedef {Object} SuggestionEngineProviders
 * @property {function(string): Array} getTitle - Resolves unique collection arrays matching active title sequences.
 * @property {function(string): Array} getCategory - Resolves target classification arrays matching filter query structures.
 * @property {function(string): Array} getLocation - Resolves geographic text segments matching physical location strings.
 */

/**
 * @typedef {Object} EventsContextValue
 * @property {ContextEventSchema[]} events - Dynamic filtered sub-collection feeding active presentational grids.
 * @property {ContextEventSchema[]} allEvents - Persistent unmutated master repository cache serving as structural anchor.
 * @property {boolean} loading - Global structural infrastructure operational state indicator flag.
 * @property {string|null} error - Explicit network infrastructure anomaly message tracking.
 * @property {function(Object, boolean=): void} handleSearch - Search orchestrator managing calculation updates on view layers.
 * @property {function(string): void} handleCategorySelect - High-level quick filter bridge attaching visual UX scroll enhancements.
 * @property {function(): void} clearFilters - Flushes current view models to restore baseline operational arrays.
 * @property {SuggestionEngineProviders} suggestions - Decoupled lookup functions powering active autocomplete inputs.
 */

/**
 * Context object for global event state distribution layers.
 * @type {React.Context<EventsContextValue>}
 */
export const EventsContext = createContext();

/**
 * EventsProvider Component.
 *
 * Implements the centralized Single Source of Truth pattern for all events ecosystem components.
 * Prevents downstream re-renders across consumers by strictly controlling value compound identities.
 *
 * @component
 * @param {Object} props - Structural component property parameters.
 * @param {React.ReactNode} props.children - Subtree components granted global context parsing capabilities.
 * @returns {JSX.Element} The decorated Context Provider encapsulation wrapper.
 */
export const EventsProvider = ({ children }) => {
  /* --- State Management Units --- */
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Effect: Initial Data Bootstrap.
   * Pulls data from remote servers on initialization to synchronize current internal master collections.
   */
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const eventsData = await fetchEventsService();
        setAllEvents(eventsData);
        setFilteredEvents(eventsData);
      } catch (err) {
        setError(err.message || "Failed to sync events from the server.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  /**
   * Processes updated query parameters over unmutated collection matrices.
   * Updates state view layers upon completing heavy functional evaluations.
   *
   * @function handleSearch
   */
  const handleSearch = useCallback(
    (filters, isStrict = false) => {
      setLoading(true);
      const results = filterEvents(allEvents, filters, isStrict);
      setFilteredEvents(results);
      setLoading(false);
    },
    [allEvents]
  );

  /**
   * Flushes operational view filters to synchronize active listings with cached records.
   *
   * @function clearFilters
   */
  const clearFilters = useCallback(() => {
    setFilteredEvents(allEvents);
  }, [allEvents]);

  /**
   * Quick-filters current listing collections using explicit category taxonomies.
   * Controls horizontal window alignments to reposition displays smoothly over layout content.
   *
   * @function handleCategorySelect
   */
  const handleCategorySelect = useCallback(
    (categoryName) => {
      const filterValue = categoryName === "All" ? "" : categoryName;
      handleSearch({ category: filterValue }, false);

      /* UX Enhancement: Smooth navigation back onto results catalog grids */
      window.scrollTo({ top: 800, behavior: "smooth" });
    },
    [handleSearch]
  );

  /**
   * Memoized execution engines feeding autocomplete suggestion systems.
   * Preserves structural scope by reading records directly from active master state caches.
   */
  const suggestionProviders = useMemo(
    () => ({
      getTitle: (query) => getTitleSuggestions(allEvents, query),
      getCategory: (query) => getCategorySuggestions(allEvents, query),
      getLocation: (query) => getLocationSuggestions(allEvents, query),
    }),
    [allEvents]
  );

  /**
   * Compound Value Memoization Layer.
   * Guards against downstream structural reference invalidation loops across decoupled consumers.
   */
  const value = useMemo(
    () => ({
      events: filteredEvents,
      allEvents,
      loading,
      error,
      handleSearch,
      handleCategorySelect,
      clearFilters,
      suggestions: suggestionProviders,
    }),
    [
      filteredEvents,
      allEvents,
      loading,
      error,
      handleSearch,
      handleCategorySelect,
      clearFilters,
      suggestionProviders,
    ]
  );

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};

export default EventsProvider;
