/**
 * Core event filtering utility.
 * * Orchestrates the search logic by applying multiple criteria (title, category, date, and location)
 * simultaneously to the event catalog.
 * * If a filter is empty or null, it defaults to 'true', allowing for additive filtering.
 * * @function
 * @param {Object[]} events - The complete array of event objects to be filtered.
 * @param {Object} filters - The search criteria object.
 * @param {string} [filters.searchTerm] - Text to search within event titles (case-insensitive).
 * @param {string} [filters.category] - Selected category to match against.
 * @param {string} [filters.date] - Exact date string to match.
 * @param {string} [filters.location] - Venue or city name to match.
 * @returns {Object[]} A filtered subset of events that meet ALL provided criteria.
 */
export const filterEvents = (events, filters) => {
  const { searchTerm, category, date, location } = filters;

  return events.filter((event) => {
    // Check if the title matches or if no search term was provided
    const matchesTitle = searchTerm
      ? event.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    // Check if the category matches
    const matchesCategory = category
      ? event.category.toLowerCase().includes(category.toLowerCase())
      : true;

    // Direct string comparison for dates
    const matchesDate = date ? event.date === date : true;

    // Check if the location matches
    const matchesLocation = location
      ? event.location.toLowerCase().includes(location.toLowerCase())
      : true;

    // The event is included only if it passes all active filters (AND logic)
    return (
      matchesTitle &&
      matchesCategory &&
      matchesDate &&
      matchesLocation
    );
  });
};