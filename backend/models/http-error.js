/**
 * @file http-error.js
 * @description Custom error model for handling HTTP exceptions.
 * @module models/http-error
 */

/**
 * Custom class to standardize error responses across the application.
 * @extends Error
 */
export default class HttpError extends Error {
  /**
   * Creates an instance of HttpError.
   * @param {string} message - The human-readable description of the error.
   * @param {number} errorCode - The HTTP status code (e.g., 404, 500, 401).
   */
  constructor(message, errorCode) {
    super(message); // Adds a "message" property via the parent Error class
    
    /**
     * @type {number}
     * @description The numeric HTTP status code assigned to this error.
     */
    this.code = errorCode; 
  }
}