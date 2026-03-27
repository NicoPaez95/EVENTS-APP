/**
 * Recommendation Engine Utility: getRelatedEvents.
 * * A deterministic algorithm that calculates a list of related events 
 * based on a hierarchical fallback strategy.
 * * @category Utilities/Events
 * * @description
 * The function follows a **Tiered Matching Strategy** to ensure the user 
 * always receives relevant suggestions:
 * 1. **Tier 1 (Category Match)**: Prioritizes events within the same category 
 * (e.g., Music, Tech).
 * 2. **Tier 2 (Location Match)**: If no category matches exist, it falls back 
 * to events in the same geographical location.
 * 3. **Tier 3 (General Fallback)**: If both tiers fail, it returns a subset 
 * of the general catalog to avoid empty UI states.
 * * @param {Object} currentEvent - The event currently being viewed (Reference Point).
 * @param {string|number} currentEvent.id - ID used to exclude the current event from results.
 * @param {string} currentEvent.category - Primary matching criterion.
 * @param {string} currentEvent.location - Secondary matching criterion.
 * @param {Array<Object>} allEvents - The master event catalog to filter from.
 * * @returns {Array<Object>} A filtered array containing up to 3 related events. 
 * Returns an empty array if no reference event is provided.
 */
export const getRelatedEvents = (currentEvent, allEvents) => {
  // Defensive check: If no reference event exists, we cannot calculate relations.
  if (!currentEvent) return [];

  /**
   * TIER 1: Category-Based Filtering
   * Logic: Same category, excluding the current event.
   */
  const byCategory = allEvents.filter(
    (e) => e.category === currentEvent.category && e.id !== currentEvent.id
  );
  if (byCategory.length > 0) return byCategory.slice(0, 3);

  /**
   * TIER 2: Location-Based Filtering (Fallback)
   * Logic: Same location, excluding the current event.
   */
  const byLocation = allEvents.filter(
    (e) => e.location === currentEvent.location && e.id !== currentEvent.id
  );
  if (byLocation.length > 0) return byLocation.slice(0, 3);

  /**
   * TIER 3: Global Discovery (Final Fallback)
   * Logic: Simply returns the first 3 events available (excluding current).
   * This ensures the "Similar Experiences" section is never empty.
   */
  return allEvents
    .filter((e) => e.id !== currentEvent.id)
    .slice(0, 3);
};