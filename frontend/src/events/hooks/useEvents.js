import { useContext } from 'react';
import { EventsContext } from '../context/EventsContext';

/**
 * Custom Hook: useEvents.
 * * This hook acts as a functional "Facade," encapsulating the complexity 
 * of the React Context API for the entire events domain.
 * * It provides a centralized point of access to the global event state, 
 * including filtered collections, loading indicators, and orchestrated 
 * handlers (search, category selection, etc.).
 * * @hook
 * @category Hooks
 * @returns {Object} The complete EventsContext value.
 * @property {Array<Object>} events - The currently filtered list of events.
 * @property {boolean} loading - Global loading state for event data.
 * @property {Function} handleSearch - Search orchestration handler.
 * @property {Function} handleCategorySelect - Category filtering handler.
 * @property {Object} suggestions - Provider functions for autocomplete inputs.
 * * @throws {Error} If the hook is invoked outside of an <EventsProvider />, 
 * preventing silent failures in the component tree.
 */
export const useEvents = () => {
  const context = useContext(EventsContext);

  /**
   * Defensive Programming:
   * Ensures that the hook is only used within its designated Provider.
   * This provides an immediate, descriptive error in the console 
   * during development if the architectural boundary is breached.
   */
  if (!context) {
    throw new Error(
      '[useEvents Error]: This hook must be used within an <EventsProvider>. ' +
      'Check your App.jsx or Main.jsx to ensure the provider wraps this component tree.'
    );
  }

  return context;
};