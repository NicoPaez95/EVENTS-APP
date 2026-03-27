/**
 * Filters and returns the top title matches for the autocomplete provider.
 * * @function
 * @category Utils/Suggestions
 * @param {Object[]} events - The full catalog of event objects.
 * @param {string} term - The search string provided by the user.
 * @returns {Object[]} An array of up to 5 event objects matching the title.
 */
export const getTitleSuggestions = (events, term) => {
  if (!term) return [];
  const lowerTerm = term.toLowerCase();

  return events
    .filter(event =>
      event.title?.toLowerCase().includes(lowerTerm)
    )
    .slice(0, 5);
};

/**
 * Extracts and filters unique categories matching the user input.
 * * @function
 * @category Utils/Suggestions
 * @param {Object[]} events - The full catalog of event objects.
 * @param {string} term - The search string provided by the user.
 * @returns {string[]} An array of up to 5 unique and filtered category names.
 */
export const getCategorySuggestions = (events, term) => {
  if (!term) return [];
  const lowerTerm = term.toLowerCase();

  return [...new Set(
    events
      .map(event => event.category)
      .filter(cat =>
        cat?.toLowerCase().includes(lowerTerm)
      )
  )].slice(0, 5);
};

/**
 * Extracts unique city names from the venue data and filters them by term.
 * * @function
 * @category Utils/Suggestions
 * @param {Object[]} events - The full catalog of event objects.
 * @param {string} term - The search string provided by the user.
 * @returns {string[]} An array of up to 5 unique and filtered city names.
 */
export const getLocationSuggestions = (events, term) => {
  if (!term) return [];
  const lowerTerm = term.toLowerCase();

  // Mapping through the new 'venue' object structure to extract city names
  const uniqueCities = [...new Set(
    events
      .map(event => event.venue?.city)
      .filter(city => city !== undefined)
  )];

  return uniqueCities
    .filter(city => city?.toLowerCase().includes(lowerTerm))
    .slice(0, 5);
};