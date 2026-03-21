import React, { createContext, useState, useMemo } from 'react';
import { events as mockData } from '../../events/data/events.mock';
import { filterEvents } from '../../events/utils/filterEvents';
import { 
  getTitleSuggestions, 
  getCategorySuggestions, 
  getLocationSuggestions 
} from '../../events/utils/eventSuggestions';

/**
 * EventsContext.
 * Context object for global event state management.
 */
export const EventsContext = createContext();

/**
 * EventsProvider Component.
 * * This "Domain Orchestrator" manages the global state for the events ecosystem.
 * It centralizes data filtering, search execution, and suggestion providers, 
 * ensuring a single source of truth for all event-related features.
 * * Performance Optimization:
 * Uses useMemo to stabilize the context value and prevent unnecessary 
 * re-renders across the component tree.
 * * @component
 * @category Context
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The component tree to be wrapped by the provider.
 * @returns {JSX.Element} The Provider component with the memoized event domain state.
 */
export const EventsProvider = ({ children }) => {
  const [filteredEvents, setFilteredEvents] = useState(mockData);
  const [loading, setLoading] = useState(false);

  /**
   * Search Orchestration:
   * Updates the global filtered collection based on multi-input criteria.
   * * @param {Object} filters - Search terms, category, location, and date.
   */
  const handleSearch = (filters) => {
    setLoading(true);
    // Logic: Processes the mock catalog through the filtering utility
    const results = filterEvents(mockData, filters);
    setFilteredEvents(results);
    setLoading(false);
  };

  /**
   * Rapid Navigation Handler:
   * Specialized for category selections from grids or quick-access badges.
   * Includes a smooth scroll effect to focus the user on the results area.
   * * @param {string} categoryName - The target category (e.g., 'Music', 'Sports', 'All').
   */
  const handleCategorySelect = (categoryName) => {
    const filterValue = categoryName === 'All' ? '' : categoryName;
    handleSearch({ category: filterValue });
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  /**
   * Context Value Composition:
   * Memoizes state and handlers to ensure consumers only re-render when strictly necessary.
   */
  const value = useMemo(() => ({
    events: filteredEvents,
    allEvents: mockData, // Critical for ID lookups in Detail Features
    loading,
    handleSearch,
    handleCategorySelect,
    suggestions: {
      getTitle: (query) => getTitleSuggestions(mockData, query),
      getCategory: (query) => getCategorySuggestions(mockData, query),
      getLocation: (query) => getLocationSuggestions(mockData, query),
    }
  }), [filteredEvents, loading]);

  return (
    <EventsContext.Provider value={value}>
      {/* The children prop allows this provider to wrap any part 
        of the application (typically the main App or a specific Route). 
      */}
      {children}
    </EventsContext.Provider>
  );
};