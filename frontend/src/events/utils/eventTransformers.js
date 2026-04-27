/**
 * Transforms a flat list of events into a date-indexed Hash Map.
 * * @description
 * This utility performs a two-step transformation:
 * 1. **Filtering**: Isolates only the events that persist in the user's local `savedIds` array.
 * 2. **Grouping**: Aggregates the resulting events into an object where each key represents 
 * a unique ISO date ("YYYY-MM-DD").
 * * This structure is optimized for calendar components that need to render events day-by-day 
 * without re-filtering the entire collection on every cell.
 *
 * @function
 * @category Utils/Events
 * @param {Array<Object>} events - The master catalog containing all available events.
 * @param {Array<string|number>} savedIds - Collection of identifiers bookmarked by the user.
 * @returns {Object.<string, Array.<Object>>} A map where keys are "YYYY-MM-DD" and values are event arrays.
 */
export const groupSavedEventsByDate = (events, savedIds) => {
    // Defensive check: return empty map if required data is missing
    if (!events || !savedIds) return {};

    return events
        .filter((event) => savedIds.includes(event.id))
        .reduce((acc, event) => {
            // Normalizing the date key (Expected format: "YYYY-MM-DD")
            const dateKey = event.date;

            // Initialize the date bucket if it doesn't exist
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }

            // Push the event into its corresponding chronological bucket
            acc[dateKey].push(event);
            return acc;
        }, {});
};