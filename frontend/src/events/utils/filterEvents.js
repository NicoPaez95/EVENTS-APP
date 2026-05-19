/**
 * @file filterEvents.js
 * @description Advanced business logic utilities for processing, filtering, and segmenting the global events catalog.
 * Provides adaptive multi-stage fallback pipelines for robust search resolution.
 * @module events/utils/filterEvents
 * @author Nico Paez
 */

/**
 * @typedef {Object} EventVenueEntity
 * @property {string} name - Architectural moniker of the venue.
 * @property {string} city - Metropolitan region location boundary.
 */

/**
 * @typedef {Object} FilteringEventSchema
 * @property {string|number} id - Unique domain identification token.
 * @property {string} title - Explicit display name of the event asset.
 * @property {string} category - Classification taxonomy label.
 * @property {string} date - Temporal ISO operational schedule string (e.g., YYYY-MM-DDTHH:mm:ssZ).
 * @property {string} [location] - General geographical text fallback pattern.
 * @property {EventVenueEntity} venue - Geographic venue spatial compound entity.
 * @property {boolean} [isRecommended] - Flag tracking high-priority marketing layout distribution promotion.
 */

/**
 * @typedef {Object} CatalogQueryFilters
 * @property {string} [searchTerm] - Search matching constraint checking title, category, or location strings.
 * @property {string} [category] - Explicit targeted experience category tag constraint.
 * @property {string} [date] - Target temporal calendar date matching constraint (YYYY-MM-DD).
 * @property {string} [location] - Geographical urban municipality name mapping constraint.
 */

/**
 * @typedef {Object} RecommendationOptions
 * @property {number} [limit=3] - Maximum number of recommendation objects to slice and return.
 */

/**
 * Advanced event filtering utility with an adaptive fallback mechanism.
 * Processes search queries through a dual-stage pipeline maximizing system recall value.
 *
 * @function filterEvents
 * @param {FilteringEventSchema[]} events - Master catalog array containing domain event objects.
 * @param {CatalogQueryFilters} filters - Active search filter parameter configurations.
 * @param {boolean} [isStrict=false] - When true, bypasses the Stage 2 adaptive fallback logic to enforce absolute precision matches.
 * @returns {FilteringEventSchema[]} A prioritized, strict, or relaxed localized subset of domain event objects.
 */
export const filterEvents = (events, filters, isStrict = false) => {
  if (!events) return [];

  let { searchTerm, category, date, location } = filters;

  if (category?.toLowerCase() === "all") category = undefined;

  const term = searchTerm?.trim().toLowerCase();
  const loc = location?.trim().toLowerCase();
  const cat = category?.trim().toLowerCase();

  // --- STAGE 1: Strict Filtering (AND Logic) ---
  let results = events.filter((event) => {
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

    const matchesCategory = cat ? eventCategory.includes(cat) : true;
    const matchesLocation = loc ? eventCity.includes(loc) || eventGeneralLocation.includes(loc) : true;
    const matchesDate = date ? event?.date?.split("T")[0] === date : true;

    return matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });

  // --- STAGE 2: Adaptive Fallback (Only executed if NOT in strict mode) ---
  if (results.length === 0 && !isStrict) {
    /**
     * Fallback A: Proximity Search (+/- 3 days)
     * Triggered exclusively on targeted isolated date mutations yielding empty results.
     */
    if (date && !term && !cat && !loc) {
      const targetDate = new Date(date);
      results = events
        .filter((event) => {
          if (!event?.date) return false;
          const eventDate = new Date(event.date);
          const diffTime = Math.abs(eventDate.getTime() - targetDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 3;
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    /**
     * Fallback B: Relaxed Partial Matching (OR Logic)
     * Deconstructs rigorous input matrices into loose individual conditions when text matches yield no direct alignment.
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
 * Filters the catalog to extract recommended user experiences.
 * Segments active collections based on administrative promotion status flags.
 *
 * @function getRecommendedEvents
 * @param {FilteringEventSchema[]} events - Global master collection array of event data structures.
 * @param {RecommendationOptions} [options={}] - Configurable operational slicing parameters.
 * @returns {FilteringEventSchema[]} Segmented priority sub-collection matching recommendation parameters.
 */
export const getRecommendedEvents = (events, { limit = 3 } = {}) => {
  if (!events) return [];

  return events
    .filter((event) => event?.isRecommended === true)
    .slice(0, limit);
};

/**
 * Computes the intersection subset between the master catalog and a group of user bookmarks.
 * Maximizes performance indexing configurations through high-speed internal Set evaluations.
 *
 * @function filterByIds
 * @param {FilteringEventSchema[]} events - Complete domain event target reference collection array.
 * @param {Array<string|number>} ids - Array containing targeted operational tracking identifier criteria.
 * @returns {FilteringEventSchema[]} Intersected matched structural array representation data schemas.
 */
export const filterByIds = (events, ids) => {
  if (!events || !ids) return [];
  const idSet = new Set(ids.map((id) => String(id)));
  return events.filter((event) => idSet.has(String(event?.id)));
};

/**
 * Filters an event sequence using an absolute temporal calendar string pattern match.
 * Decouples timezone mutations from pure string dates extracted natively from ISO patterns.
 *
 * @function filterByDate
 * @param {FilteringEventSchema[]} events - Target domain reference collection array.
 * @param {string} dateString - Strict temporal calendar extraction match argument pattern (YYYY-MM-DD).
 * @returns {FilteringEventSchema[]} Time-synchronized filtered subset of collection domain entities.
 */
export const filterByDate = (events, dateString) => {
  if (!events || !dateString) return [];
  return events.filter((event) => event?.date?.split("T")[0] === dateString);
};