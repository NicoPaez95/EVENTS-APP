/**
 * Filters and returns the top title matches for a given search term.
 * * @param {Object[]} events - The full catalog of event objects.
 * @param {string} term - The search string provided by the user.
 * @returns {Object[]} An array of up to 5 event objects matching the title.
 */
export const getTitleSuggestions = (events, term) => {
  if (!term) return [];
  return events
    .filter(event =>
      event.title.toLowerCase().includes(term.toLowerCase())
    )
    .slice(0, 5);
};

/**
 * Extracts and filters unique categories matching the search term.
 * * @param {Object[]} events - The full catalog of event objects.
 * @param {string} term - The search string provided by the user.
 * @returns {string[]} An array of up to 5 unique category names.
 */
export const getCategorySuggestions = (events, term) => {
  if (!term) return [];

  return [...new Set(
    events
      .map(event => event.category)
      .filter(cat =>
        cat.toLowerCase().includes(term.toLowerCase())
      )
  )].slice(0, 5);
};

/**
 * Extracts and filters unique locations matching the search term.
 * * @param {Object[]} events - The full catalog of event objects.
 * @param {string} term - The search string provided by the user.
 * @returns {string[]} An array of up to 5 unique location names.
 */
export const getLocationSuggestions = (events, term) => {
  if (!term) return [];

  return [...new Set(
    events
      .map(event => event.location)
      .filter(loc =>
        loc.toLowerCase().includes(term.toLowerCase())
      )
  )].slice(0, 5);
};