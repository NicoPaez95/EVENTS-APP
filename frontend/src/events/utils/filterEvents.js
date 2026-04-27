// src/events/utils/eventHelpers.js

/**
 * Advanced event filtering utility with an adaptive fallback mechanism.
 * * @description
 * This function operates in two execution stages:
 * 1. **Stage 1 (Strict Match)**: Applies an 'AND' logic across all active filters 
 * (Search, Category, Location, Date).
 * 2. **Stage 2 (Adaptive Fallback)**: If Stage 1 returns no results, the engine 
 * relaxes constraints to prevent "Zero State" fatigue:
 * - **Temporal Relaxation**: Searches for events within a +/- 3-day proximity window.
 * - **Logical OR Match**: Switches from 'AND' to 'OR' logic for text-based filters.
 *
 * @function
 * @category Utils/Events
 * @param {Array<Object>} events - The master catalog of event objects.
 * @param {Object} filters - User-defined search criteria.
 * @param {string} [filters.searchTerm=""] - Global text search across Title, Category, and City.
 * @param {string} [filters.category=""] - Target category. 'All' is ignored to show global results.
 * @param {string} [filters.date=""] - Specific date string in ISO YYYY-MM-DD format.
 * @param {string} [filters.location=""] - Geographical filter targeting City or Venue.
 * @returns {Array<Object>} A prioritized subset of events.
 */
export const filterEvents = (events, filters) => {
  let { searchTerm, category, date, location } = filters;

  // Normalization: Treat 'all' as an inactive filter
  if (category?.toLowerCase() === 'all') category = undefined;

  // --- STAGE 1: Strict Filtering (AND Logic) ---
  let results = events.filter((event) => {
    const term = searchTerm?.toLowerCase();

    const matchesSearch = term
      ? event.title?.toLowerCase().includes(term) ||
      event.category?.toLowerCase().includes(term) ||
      event.venue?.city?.toLowerCase().includes(term)
      : true;

    const matchesCategory = category
      ? event.category?.toLowerCase().includes(category.toLowerCase())
      : true;

    const matchesLocation = location
      ? event.venue?.city?.toLowerCase().includes(location.toLowerCase())
      : true;

    const matchesDate = date ? event.date === date : true;

    return matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });

  // --- STAGE 2: Adaptive Fallback (Fallback Logic) ---
  if (results.length === 0) {

    /** * Fallback A: Proximity Search (+/- 3 days)
     * Triggered if a date was specified without conflicting text filters.
     */
    if (date && !searchTerm && !category && !location) {
      const targetDate = new Date(date);
      results = events.filter((event) => {
        const eventDate = new Date(event.date);
        const diffTime = Math.abs(eventDate.getTime() - targetDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3;
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    /** * Fallback B: Relaxed Partial Matching (OR Logic)
     * Broadens results by searching for any criteria match if specific ones fail.
     */
    if (results.length === 0 && (category || location || searchTerm)) {
      results = events.filter((event) => {
        return (
          (category && event.category?.toLowerCase().includes(category.toLowerCase())) ||
          (location && event.venue?.city?.toLowerCase().includes(location.toLowerCase())) ||
          (searchTerm && event.title?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
    }
  }

  return results;
};

/**
 * Extracts a subset of events explicitly flagged for promotion.
 * * @function
 * @param {Array<Object>} events - The master catalog.
 * @param {Object} options - Configuration for recommendations.
 * @param {number} [options.limit=3] - Maximum items to retrieve.
 * @returns {Array<Object>} List of curated recommended events.
 */
export const getRecommendedEvents = (events, { limit = 3 } = {}) => {
  if (!events) return [];

  return events
    .filter((event) => event.isRecommended === true)
    .slice(0, limit);
};

/**
 * Filters a collection by matching identifiers against an allowed list.
 * Useful for rendering "Saved Items" or "Favorites".
 * * @function
 * @param {Array<Object>} events - Source event list.
 * @param {Array<string|number>} ids - Target list of saved event IDs.
 * @returns {Array<Object>} Filtered collection of events.
 */
export const filterByIds = (events, ids) => {
  if (!events || !ids) return [];
  return events.filter((event) => ids.includes(event.id));
};

/**
 * Performs a precise date match filter.
 * * @function
 * @param {Array<Object>} events - Source event list.
 * @param {string} date - The target date (YYYY-MM-DD).
 * @returns {Array<Object>} Events matching the specific date or original list if no date provided.
 */
export const filterByDate = (events, date) => {
  if (!events || !date) return events;
  return events.filter((event) => event.date === date);
};