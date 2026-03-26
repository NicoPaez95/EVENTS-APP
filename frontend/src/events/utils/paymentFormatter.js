/**
 * Payment Formatter Utilities.
 * * A collection of pure functions designed to sanitize and format 
 * sensitive credit card input fields in real-time.
 */

/**
 * Formats a raw string into a grouped 16-digit credit card number.
 * * 1. Removes all non-numeric characters and spaces.
 * 2. Groups digits into blocks of 4 separated by spaces (e.g., "4242 4242...").
 *
 * @param {string} value - The raw input value from the card number field.
 * @returns {string} The sanitized and space-formatted card number.
 */
export const formatCardNumber = (value) => {
  // Remove whitespace and non-digits
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  return parts.length > 0 ? parts.join(' ') : v;
};

/**
 * Formats a raw string into a standard MM/YY expiration date format.
 * * 1. Removes non-numeric characters.
 * 2. Injects a forward slash after the second digit.
 *
 * @param {string} value - The raw input value from the expiry field.
 * @returns {string} The formatted date string (MM/YY).
 */
export const formatExpiryDate = (value) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  if (v.length >= 2) {
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
  }
  return v;
};

/**
 * Sanitizes CVC/CVV input to allow only up to 3 numeric digits.
 *
 * @param {string} value - The raw input value from the CVC field.
 * @returns {string} A string containing 0 to 3 numeric digits.
 */
export const formatCVC = (value) => {
  return value.replace(/[^0-9]/gi, '').substring(0, 3);
};