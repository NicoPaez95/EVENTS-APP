
/**
 * Authentication Service.
 * * Provides low-level infrastructure methods to communicate with the 
 * Identity Management API. This service handles raw network requests
 * and error normalization before data reaches the Context layer.
 * * @module Services/Auth
 */

/**
 * The base endpoint for all API calls, retrieved from environment variables.
 * @constant {string}
 */
import process from "process";
const API_BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Sends a registration request to create a new user account.
 * * @async
 * @function registerUser
 * @param {string} name - The user's full legal name.
 * @param {string} email - A unique, valid email address.
 * @param {string} password - The raw password string.
 * @throws {Error} If the server returns a non-2xx status code or connection fails.
 * @returns {Promise<Object>} Object containing: { userId, email, name, token }.
 */
export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    /** * Error Normalization:
     * Extracts the specific backend message or provides a generic fallback.
     */
    throw new Error(data.message || 'Registration failed.');
  }

  return data;
};

/**
 * Authenticates an existing user and retrieves a session token.
 * * @async
 * @function loginUser
 * @param {string} email - The registered email address.
 * @param {string} password - The user's password.
 * @throws {Error} If credentials are invalid or the service is unavailable.
 * @returns {Promise<Object>} Object containing: { userId, email, name, token }.
 */
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    /** * Backend Guard:
     * Prevents the application from processing invalid sessions.
     */
    throw new Error(data.message || 'Login failed.');
  }

  return data;
};