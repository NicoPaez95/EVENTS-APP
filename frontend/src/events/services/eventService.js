/**
 * @file eventService.js
 * @description Data access layer for the Events domain.
 * Provides methods to interact with the events-related endpoints of the backend API.
 * @module services/eventService
 * @author Nico Paez
 */

const API_BASE_URL = import.meta.env?.VITE_API_URL || process.env.REACT_APP_API_URL;

/**
 * Retrieves the complete collection of events from the remote server.
 * @async
 * @function fetchEventsService
 * @throws {Error} If the server responds with a non-2xx status code or if a network error occurs.
 * @returns {Promise<Object[]>} A promise that resolves to an array of raw/sanitized event objects.
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
      throw new Error(responseData.message || 'Failed to fetch events from the server.');
    }

    /**
     * Sanitization & Normalization Layer:
     * Maps database fields into strict frontend domain attributes.
     * Guarantees that 'price' is consistently treated as a clean operational float/number.
     */
    return responseData.events.map((event) => ({
      ...event,
      price: event.price ? Number(event.price) : 0,
    }));
  } catch (error) {
    console.error('[EventService] fetchEventsService Error:', error.message);
    throw error;
  }
};

export default fetchEventsService;