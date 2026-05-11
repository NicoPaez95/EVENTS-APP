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
 */
export const filterEvents = (events, filters) => {
  if (!events) return [];

  let { searchTerm, category, date, location } = filters;

  // Normalization
  if (category?.toLowerCase() === 'all') category = undefined;

  const term = searchTerm?.trim().toLowerCase();
  const loc = location?.trim().toLowerCase();
  const cat = category?.trim().toLowerCase();

  // --- STAGE 1: Strict Filtering (AND Logic) ---
  let results = events.filter((event) => {
    // Defensive check: Ensure properties exist before calling toLowerCase()
    const eventTitle = (event?.title || "").toLowerCase();
    const eventCategory = (event?.category || "").toLowerCase();
    const eventCity = (event?.venue?.city || "").toLowerCase();
    const eventGeneralLocation = (event?.location || "").toLowerCase();

    const matchesSearch = term
      ? eventTitle.includes(term) ||
      eventCategory.includes(term) ||
      eventGeneralLocation.includes(term) ||
      eventCity.includes(term)
      : true;

    const matchesCategory = cat
      ? eventCategory.includes(cat)
      : true;

    const matchesLocation = loc
      ? eventCity.includes(loc) || eventGeneralLocation.includes(loc)
      : true;

    const matchesDate = date ? event?.date?.split('T')[0] === date : true;

    return matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });

  // --- STAGE 2: Adaptive Fallback ---
  if (results.length === 0) {
    /**
     * Fallback A: Proximity Search (+/- 3 days)
     * Active only if a date was provided without other specific text filters.
     */
    if (date && !term && !cat && !loc) {
      const targetDate = new Date(date);
      results = events.filter((event) => {
        if (!event?.date) return false;
        const eventDate = new Date(event.date);
        const diffTime = Math.abs(eventDate.getTime() - targetDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3;
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    /**
     * Fallback B: Relaxed Partial Matching (OR Logic)
     * Triggered if text-based criteria are present but yielded no strict matches.
     */
    if (results.length === 0 && (cat || loc || term)) {
      results = events.filter((event) => {
        const eventTitle = (event?.title || "").toLowerCase();
        const eventCategory = (event?.category || "").toLowerCase();
        const eventCity = (event?.venue?.city || "").toLowerCase();

        return (
          (cat && eventCategory.includes(cat)) ||
          (loc && eventCity.includes(loc)) ||
          (term && eventTitle.includes(term))
        );
      });
    }
  }

  return results;
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
    .filter((event) => event?.isRecommended === true)
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
  return events.filter((event) => event?.id && idSet.has(event.id.toString()));
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
    const eventDateOnly = event?.date?.split('T')[0];
    return eventDateOnly === date;
  });
};