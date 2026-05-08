/**
 * @file userService.js
 * @description Data access layer for User-specific operations.
 * Handles synchronization of saved events and user preferences with the backend.
 * @module services/userService
 * @author Nico Paez
 */

/**
 * API Base URL compatible with both Vite and Create React App environments.
 * @constant {string}
 */
const API_BASE_URL = import.meta.env?.VITE_API_URL || process.env.REACT_APP_API_URL;

/**
 * Retrieves the collection of saved event identifiers for a specific user.
 * 
 * @async
 * @function fetchSavedEventsIds
 * @param {string} userId - The unique identifier of the user.
 * @param {string} token - JWT Bearer token for authentication.
 * @throws {Error} If the request is unauthorized or the user is not found.
 * @returns {Promise<Array<string>>} An array of event IDs stored in the user's profile.
 */
export const fetchSavedEventsIds = async (userId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/saved`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Could not retrieve saved events.');
        }

        /**
         * @property {Array} data.savedEvents - Expected array of MongoDB ObjectIds (as strings).
         */
        return data.savedEvents;
    } catch (error) {
        console.error('[UserService] fetchSavedEventsIds Error:', error.message);
        throw error;
    }
};

/**
 * Updates the user's saved events collection (Toggle logic on the backend).
 * 
 * @async
 * @function updateSavedEvent
 * @param {string} userId - The unique identifier of the user.
 * @param {string} eventId - The identifier of the event to add or remove.
 * @param {string} token - JWT Bearer token for authentication.
 * @throws {Error} If the update fails due to server-side validation or connectivity.
 * @returns {Promise<Array<string>>} The updated array of saved event IDs.
 */
export const updateSavedEvent = async (userId, eventId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/saved`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ eventId })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update saved events.');
        }

        // Returns the updated list to sync the UI optimistically or definitively.
        return data.savedEvents;
    } catch (error) {
        console.error('[UserService] updateSavedEvent Error:', error.message);
        throw error;
    }
};