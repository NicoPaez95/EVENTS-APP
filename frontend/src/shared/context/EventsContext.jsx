import React, { createContext, useState, useMemo, useCallback } from 'react';
import { events as mockData } from '../../events/data/events.mock';
import { filterEvents } from '../../events/utils/filterEvents';
import { 
  getTitleSuggestions, 
  getCategorySuggestions, 
  getLocationSuggestions 
} from '../../events/utils/eventSuggestions';

/**
 * EventsContext.
 * * Context object for global event state management.
 * * Provides access to the event catalog, loading status, and search handlers.
 */
export const EventsContext = createContext();

/**
 * EventsProvider Component.
 * * Domain Orchestrator that centralizes event state, adaptive filtering, 
 * and autocomplete suggestion providers.
 * * @component
 * @category Contexts/Events
 * * @description
 * This provider implements the **Single Source of Truth** pattern for the events domain:
 * 1. **State Partitioning**: Separates the "Master Catalog" (`allEvents`) from 
 * the "Active View" (`events`), ensuring recommendations stay persistent while 
 * the main grid remains filterable.
 * 2. **Performance Optimization**: Uses `useCallback` and `useMemo` to prevent 
 * unnecessary re-renders in heavy components like the SearchBar or EventGrid.
 * 3. **Abstraction**: Encapsulates complex filtering logic within a unified 
 * `handleSearch` interface.
 * * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Child components that will consume the context.
 * * @returns {JSX.Element} The Context Provider wrapping the application subtree.
 */
export const EventsProvider = ({ children }) => {
  /**
   * Domain States:
   * - filteredEvents: The dynamic collection displayed in the main grid.
   * - loading: Global flag for asynchronous simulation or API fetching.
   */
  const [filteredEvents, setFilteredEvents] = useState(mockData);
  const [loading, setLoading] = useState(false);

  /**
   * handleSearch:
   * Search orchestrator that updates the filtered collection based on user input.
   * Uses `useCallback` to maintain a stable reference across re-renders.
   */
  const handleSearch = useCallback((filters) => {
    setLoading(true);
    // Applies adaptive filtering utility over the master data set
    const results = filterEvents(mockData, filters);
    setFilteredEvents(results);
    setLoading(false);
  }, []);

  /**
   * handleCategorySelect:
   * Quick-access handler for category-specific filtering.
   * Includes a smooth scroll UX enhancement to improve user flow after selection.
   */
  const handleCategorySelect = useCallback((categoryName) => {
    const filterValue = categoryName === 'All' ? '' : categoryName;
    handleSearch({ category: filterValue });
    
    // UI Enhancement: Smooth scroll to results area
    window.scrollTo({ top: 800, behavior: 'smooth' });
  }, [handleSearch]);

  /**
   * suggestionProviders:
   * Memoized logic for the SearchBar autocomplete engine.
   * Decoupled from the filtered state to ensure suggestions are always 
   * pulled from the master catalog.
   */
  const suggestionProviders = useMemo(() => ({
    getTitle: (query) => getTitleSuggestions(mockData, query),
    getCategory: (query) => getCategorySuggestions(mockData, query),
    getLocation: (query) => getLocationSuggestions(mockData, query),
  }), []);

  /**
   * Context Value Composition:
   * We explicitly separate 'events' (dynamic) from 'allEvents' (static master) 
   * to support dual-purpose UI (filtered grids vs. persistent sidebars).
   */
  const value = useMemo(() => ({
    events: filteredEvents,     // Dynamic results for the main grid
    allEvents: mockData,         // Static master data for details/recommendations
    loading,
    handleSearch,
    handleCategorySelect,
    suggestions: suggestionProviders
  }), [filteredEvents, loading, handleSearch, handleCategorySelect, suggestionProviders]);

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;