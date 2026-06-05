/**
 * @file paymentFormatter.js
 * @description Real-time sanitization and formatting utilities for financial and transaction inputs.
 * @module shared/utils/paymentFormatter
 * @author Nico Paez
 */

/**
 * Formats a raw string into a grouped 16-digit credit card number.
 * 1. Removes all non-numeric characters and spaces.
 * 2. Restricts the string length to 16 digits max.
 * 3. Groups digits into blocks of 4 separated by spaces (e.g., "4242 4242...").
 *
 * @function formatCardNumber
 * @param {string} value - The raw input value from the card number field.
 * @returns {string} The sanitized and space-formatted card number.
 */
export const formatCardNumber = (value) => {
  const sanitized = value.replace(/[^0-9]/g, '').substring(0, 16);
  const parts = sanitized.match(/.{1,4}/g);
  return parts ? parts.join(' ') : sanitized;
};

/**
 * Formats a raw string into a standard MM/YY expiration date format.
 * 1. Removes non-numeric characters.
 * 2. Injects a forward slash after the second digit.
 * 3. Restricts total digits to 4 characters (MMYY).
 *
 * @function formatExpiryDate
 * @param {string} value - The raw input value from the expiry field.
 * @returns {string} The formatted date string (MM/YY).
 */
export const formatExpiryDate = (value) => {
  const sanitized = value.replace(/[^0-9]/g, '').substring(0, 4);
  if (sanitized.length > 2) {
    return `${sanitized.substring(0, 2)}/${sanitized.substring(2, 4)}`;
  }
  return sanitized;
};

/**
 * Sanitizes CVC/CVV input to allow only up to 3 numeric digits.
 *
 * @function formatCVC
 * @param {string} value - The raw input value from the CVC field.
 * @returns {string} A string containing 0 to 3 numeric digits.
 */
export const formatCVC = (value) => {
  return value.replace(/[^0-9]/g, '').substring(0, 3);
};

/**
 * Formats a numeric value into a localized currency string using the Intl API.
 * Automatically defaults to USD and en-US representation for standard web billing profiles.
 *
 * @function formatCurrency
 * @param {number} value - The raw numeric price.
 * @param {string} [currency='USD'] - The ISO 4217 currency code (e.g., 'ARS', 'USD', 'EUR').
 * @param {string} [locale='en-US'] - The BCP 47 language tag (e.g., 'es-AR', 'en-US').
 * @returns {string} The beautifully formatted currency string.
 */
export const formatCurrency = (value, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};