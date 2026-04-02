/**
 * @file EventsContext.jsx
 * @description Global state management for the Events domain.
 * Handles asynchronous data fetching, master-detail state partitioning, 
 * and memoized search logic for optimized performance.
 * @module context/EventsContext
 * @author Nico Paez
 */

import React, { createContext, useState, useMemo, useCallback, useEffect } from 'react';
import fetchEventsService from '../../events/services/eventService';
import { filterEvents } from '../../events/utils/filterEvents';
import { 
  getTitleSuggestions, 
  getCategorySuggestions, 
  getLocationSuggestions 
} from '../../events/utils/eventSuggestions';

/**
 * @typedef {Object} EventsContextValue
 * @property {Array} events - Dynamic filtered collection for the main grid.
 * @property {Array} allEvents - Master catalog for persistent sidebars/details.
 * @property {boolean} loading - Global asynchronous operation flag.
 * @property {string|null} error - Error message if the API fetch fails.
 * @property {Function} handleSearch - Orchestrator to update the filtered collection.
 * @property {Function} handleCategorySelect - High-level category filtering handler.
 * @property {Object} suggestions - Autocomplete engine providers.
 */

/**
 * Context object for global event state.
 * @type {React.Context<EventsContextValue>}
 */
export const EventsContext = createContext();

/**
 * EventsProvider Component.
 * Implements the "Single Source of Truth" pattern for the entire events ecosystem.
 * * @component
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Subtree that will consume this context.
 * @returns {JSX.Element} The decorated Context Provider.
 */
export const EventsProvider = ({ children }) => {
  /** * @section State Management
   * Master list (allEvents) is kept separate from the view list (filteredEvents).
   */
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Effect: Initial Data Bootstrap.
   * Connects to the backend service to populate the master catalog on mount.
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
        setError(err.message || 'Failed to sync events from the server.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  /**
   * handleSearch:
   * Search orchestrator that processes filtering over the master data set.
   * @param {Object} filters - Search parameters (title, category, date, etc.).
   */
  const handleSearch = useCallback((filters) => {
    setLoading(true);
    // Applies logic-heavy filtering utility
    const results = filterEvents(allEvents, filters);
    setFilteredEvents(results);
    setLoading(false);
  }, [allEvents]);

  /**
   * handleCategorySelect:
   * Provides a quick-filter interface with built-in UX scroll enhancement.
   * @param {string} categoryName - The target category (e.g., 'Music', 'Tech').
   */
  const handleCategorySelect = useCallback((categoryName) => {
    const filterValue = categoryName === 'All' ? '' : categoryName;
    handleSearch({ category: filterValue });
    
    // UX Enhancement: Smooth navigation to the results area
    window.scrollTo({ top: 800, behavior: 'smooth' });
  }, [handleSearch]);

  /**
   * suggestionProviders:
   * Memoized engine for the SearchBar autocomplete functionality.
   * Decoupled from active filters to maintain global suggestion scope.
   */
  const suggestionProviders = useMemo(() => ({
    getTitle: (query) => getTitleSuggestions(allEvents, query),
    getCategory: (query) => getCategorySuggestions(allEvents, query),
    getLocation: (query) => getLocationSuggestions(allEvents, query),
  }), [allEvents]);

  /**
   * Context Value Composition:
   * Explicitly memoized to prevent downstream re-renders unless core state changes.
   */
  const value = useMemo(() => ({
    events: filteredEvents,
    allEvents,
    loading,
    error,
    handleSearch,
    handleCategorySelect,
    suggestions: suggestionProviders
  }), [filteredEvents, allEvents, loading, error, handleSearch, handleCategorySelect, suggestionProviders]);

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;