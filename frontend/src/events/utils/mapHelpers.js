/**
 * mapHelpers Utility.
 * Pure functions for geographical data transformation.
 */

/**
 * Generates a Google Maps URL for external navigation.
 * @param {number} lat 
 * @param {number} lng 
 * @param {string} name - Venue name for the search query.
 * @returns {string}
 */
export const getExternalMapUrl = (lat, lng, name) => {
  const query = encodeURIComponent(name);
  return `https://www.google.com/maps/search/?api=1&query=${query}&query_place_id=${lat},${lng}`;
};