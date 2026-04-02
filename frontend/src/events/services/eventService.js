/**
 * @file eventService.js
 * @description Data access layer for the Events domain.
 * Optimized for Create React App or Standard Webpack environments.
 * @module services/eventService
 */

/** * API Base URL from environment variables.
 * @constant {string} 
 */
const API_BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Fetch all events from the remote server.
 * @async
 * @function fetchEventsService
 * @returns {Promise<Array>} The collection of event objects.
 */
const fetchEventsService = async () => {
  try {
    // We append the specific endpoint to the base URL
    const response = await fetch(`${API_BASE_URL}/events`);
    
    // Parse the JSON response body
    const responseData = await response.json();

    if (!response.ok) {
      // Prioritize the error message sent by your Express HttpError model
      throw new Error(responseData.message || 'Fetching events failed.');
    }

    // Return the events array from the response object
    return responseData.events;
  } catch (error) {
    // Log for debugging and re-throw for the Context to handle
    console.error('[EventService Error]:', error.message);
    throw error;
  }
};

export default fetchEventsService;