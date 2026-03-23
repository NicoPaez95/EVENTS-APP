import { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { savedEventIds as mockSavedIds } from '../data/savedEvents.mock';

/**
 * @typedef {Object} UserContextValue
 * @property {Array<string|number>} savedIds - List of event IDs bookmarked by the user.
 * @property {function(string|number): void} toggleSaveEvent - Toggles the saved status of an event.
 * @property {function(string|number): boolean} isEventSaved - Checks if a specific event is in the saved list.
 */

const UserContext = createContext(null);

/**
 * UserProvider Component.
 * * Centralizes user-specific state and preferences, such as bookmarked events.
 * It serves as the single source of truth for user interactions across the application.
 * * Optimization Note: 
 * Uses useCallback and useMemo to prevent unnecessary re-renders in consumer components 
 * (like EventCard) when the global state updates.
 * * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider.
 * @returns {JSX.Element}
 */
export const UserProvider = ({ children }) => {
  // Initialize with mock data (to be replaced by API/LocalStorage in production)
  const [savedIds, setSavedIds] = useState(mockSavedIds);

  /**
   * Toggles an event ID in the global saved list.
   * Memoized to prevent re-renders in action-triggering components.
   */
  const toggleSaveEvent = useCallback((eventId) => {
    setSavedIds((prevIds) => 
      prevIds.includes(eventId)
        ? prevIds.filter(id => id !== eventId) // Unsave logic
        : [...prevIds, eventId]                // Save logic
    );
  }, []);

  /**
   * Utility to check if an event is currently saved.
   */
  const isEventSaved = useCallback((eventId) => {
    return savedIds.includes(eventId);
  }, [savedIds]);

  /**
   * Context value memoization.
   * Ensures that consumers only re-render when the state or memoized functions change.
   */
  const value = useMemo(() => ({
    savedIds,
    toggleSaveEvent,
    isEventSaved
  }), [savedIds, toggleSaveEvent, isEventSaved]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook for accessing the UserContext.
 * * @throws {Error} If used outside of a UserProvider.
 * @returns {UserContextValue} The user state and management methods.
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};