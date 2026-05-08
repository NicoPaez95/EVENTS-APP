/**
 * @file eventService.js
 * @description Data access layer for the Events domain.
 * Provides methods to interact with the events-related endpoints of the backend API.
 * @module services/eventService
 * @author Nico Paez
 */

/**
 * API Base URL derived from environment variables.
 * @constant {string}
 */
const API_BASE_URL = import.meta.env?.VITE_API_URL || process.env.REACT_APP_API_URL;

/**
 * Retrieves the complete collection of events from the remote server.
 * 
 * @async
 * @function fetchEventsService
 * @throws {Error} If the server responds with a non-2xx status code or if a network error occurs.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of event objects.
 */
const fetchEventsService = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      /**
       * Error Handling:
       * Prioritizes specific error messages from the Express HttpError model.
       */
      throw new Error(responseData.message || 'Failed to fetch events from the server.');
    }

    /**
     * @property {Array} responseData.events - The payload containing the event list.
     */
    return responseData.events;
  } catch (error) {
    /**
     * Logging for development debugging.
     * In a production environment, this could be sent to an error tracking service.
     */
    console.error('[EventService] fetchEventsService Error:', error.message);
    throw error;
  }
};

export default fetchEventsService;