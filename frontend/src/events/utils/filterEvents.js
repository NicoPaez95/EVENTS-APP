<<<<<<< Updated upstream
/**
 * Advanced event filtering utility with adaptive logic.
 * * This function performs a multi-layered search:
 * 1. **Strict Match**: Filters by all provided criteria (AND logic).
 * 2. **Adaptive Fallback**: If no strict matches are found, it expands the search:
 * - Date: Searches for events within a +/- 3-day window.
 * - Location/Category: Relaxes constraints to find partial matches.
 * * @function
 * @param {Array<Object>} events - The complete array of event objects.
 * @param {Object} filters - Search criteria.
 * @param {string} [filters.searchTerm=""] - Global text to match across title, category, or location.
 * @param {string} [filters.category=""] - Specific category filter. Use 'all' to bypass category filtering.
 * @param {string} [filters.date=""] - Target date string in YYYY-MM-DD format.
 * @param {string} [filters.location=""] - Specific city or venue filter.
 * @returns {Array<Object>} A filtered and prioritized subset of events.
=======
/**
 * @file eventHelpers.js
 * @description Utility functions for event manipulation, including adaptive filtering,
 * recommendation extraction, and collection mapping.
 * @module utils/eventHelpers
 * @author Nico Paez
 */

/**
 * Advanced event filtering utility with an adaptive fallback mechanism.
 * 
 * Logic Flow:
 * 1. **Stage 1 (Strict Match)**: Applies 'AND' logic across all active filters.
 * 2. **Stage 2 (Adaptive Fallback)**: If Stage 1 is empty, it relaxes constraints:
 *    - Temporal: Searches +/- 3 days from the target date.
 *    - Logical: Switches to 'OR' logic for text/category/location matches.
 *
 * @function filterEvents
 * @param {Array<Object>} events - Master catalog of event objects.
 * @param {Object} filters - Search criteria.
 * @param {string} [filters.searchTerm=""] - Text search (Title, Category, City).
 * @param {string} [filters.category=""] - Target category (ignores 'all').
 * @param {string} [filters.date=""] - Specific date (ISO YYYY-MM-DD).
 * @param {string} [filters.location=""] - Geographical filter (City or Venue).
 * @returns {Array<Object>} A prioritized or relaxed subset of events.
>>>>>>> Stashed changes
 */
export const filterEvents = (events, filters) => {
  if (!events) return [];

  let { searchTerm, category, date, location } = filters;
<<<<<<< Updated upstream
  
  // Normalize category value: 'all' is treated as no filter
=======

  // Normalization
>>>>>>> Stashed changes
  if (category?.toLowerCase() === 'all') category = undefined;
  const term = searchTerm?.trim().toLowerCase();
  const loc = location?.trim().toLowerCase();
  const cat = category?.trim().toLowerCase();

  // --- STAGE 1: Strict Filtering ---
  let results = events.filter((event) => {
<<<<<<< Updated upstream
    const term = searchTerm?.toLowerCase();
    
=======
>>>>>>> Stashed changes
    const matchesSearch = term
      ? event.title.toLowerCase().includes(term) || 
        event.category.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
      : true;

<<<<<<< Updated upstream
    const matchesCategory = category
      ? event.category.toLowerCase().includes(category.toLowerCase())
      : true;

    const matchesLocation = location
      ? event.location.toLowerCase().includes(location.toLowerCase())
=======
    const matchesCategory = cat
      ? event.category?.toLowerCase().includes(cat)
      : true;

    const matchesLocation = loc
      ? event.venue?.city?.toLowerCase().includes(loc)
>>>>>>> Stashed changes
      : true;

    const matchesDate = date ? event.date?.split('T')[0] === date : true;

    return matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });

<<<<<<< Updated upstream
  // --- STAGE 2: Adaptive Fallback (If no results found) ---
  if (results.length === 0) {
    
    // Fallback A: Date Proximity Search (+/- 3 days)
    if (date && !searchTerm && !category && !location) {
=======
  // --- STAGE 2: Adaptive Fallback ---
  if (results.length === 0) {
    /** 
     * Fallback A: Proximity Search (+/- 3 days)
     * Active only if a date was provided without other specific text filters.
     */
    if (date && !term && !cat && !loc) {
>>>>>>> Stashed changes
      const targetDate = new Date(date);
      results = events.filter((event) => {
        const eventDate = new Date(event.date);
        const diffTime = Math.abs(eventDate.getTime() - targetDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3;
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

<<<<<<< Updated upstream
    // Fallback B: Partial Term Matching
    if (results.length === 0 && (category || location || searchTerm)) {
      results = events.filter((event) => {
        return (
          (category && event.category.toLowerCase().includes(category.toLowerCase())) ||
          (location && event.location.toLowerCase().includes(location.toLowerCase())) ||
          (searchTerm && event.title.toLowerCase().includes(searchTerm.toLowerCase()))
=======
    /** 
     * Fallback B: Relaxed Partial Matching (OR Logic)
     * Triggered if text-based criteria are present but yielded no strict matches.
     */
    if (results.length === 0 && (cat || loc || term)) {
      results = events.filter((event) => {
        return (
          (cat && event.category?.toLowerCase().includes(cat)) ||
          (loc && event.venue?.city?.toLowerCase().includes(loc)) ||
          (term && event.title?.toLowerCase().includes(term))
>>>>>>> Stashed changes
        );
      });
    }
  }

  return results;
<<<<<<< Updated upstream
=======
};

/**
 * Extracts events explicitly flagged as recommended.
 * 
 * @function getRecommendedEvents
 * @param {Array<Object>} events - Master catalog.
 * @param {Object} [options] - Config options.
 * @param {number} [options.limit=3] - Max number of items.
 * @returns {Array<Object>} Curated recommendations.
 */
export const getRecommendedEvents = (events, { limit = 3 } = {}) => {
  if (!events) return [];

  return events
    .filter((event) => event.isRecommended === true)
    .slice(0, limit);
};

/**
 * Maps a list of IDs to their full event objects.
 * Useful for displaying "Favorites" from a stored list of identifiers.
 * 
 * @function filterByIds
 * @param {Array<Object>} events - Source list.
 * @param {Array<string|number>} ids - Target IDs.
 * @returns {Array<Object>} Found event objects.
 */
export const filterByIds = (events, ids) => {
  if (!events || !ids || ids.length === 0) return [];

  const idSet = new Set(ids.map(id => id.toString()));
  return events.filter((event) => idSet.has(event.id?.toString()));
};

/**
 * Performs a precise date match by ignoring time components.
 * 
 * @function filterByDate
 * @param {Array<Object>} events - Source list.
 * @param {string} date - Target date (YYYY-MM-DD).
 * @returns {Array<Object>} Filtered list or original if date is missing.
 */
export const filterByDate = (events, date) => {
  if (!events || !date) return events;

  return events.filter((event) => {
    const eventDateOnly = event.date?.split('T')[0];
    return eventDateOnly === date;
  });
>>>>>>> Stashed changes
};