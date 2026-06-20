/**
 * @file eventTransformers.js
 * @description Data transformation utilities for the Events domain.
 * Provides pure functions to filter, group, and localize event datasets for presentation layers.
 * @module events/utils/eventTransformers
 * @author Nico Paez
 */

/**
 * Transforms a flat list of events into a date-indexed Hash Map.
 *
 * This utility performs a two-step transformation:
 * 1. **Filtering**: Isolates only the events that persist in the user's local `savedIds` array.
 * 2. **Grouping**: Aggregates the resulting events into an object where each key represents 
 * a unique ISO date ("YYYY-MM-DD").
 *
 * This structure is optimized for calendar components that need to render events day-by-day 
 * without re-filtering the entire collection on every cell.
 *
 * @function groupSavedEventsByDate
 * @category Utils/Events
 * @param {Object[]} events - The master catalog containing all available events.
 * @param {Array<string|number>} savedIds - Collection of identifiers bookmarked by the user.
 * @returns {Record<string, Object[]>} A map where keys are "YYYY-MM-DD" and values are arrays of events.
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

/**
 * Resolves a multilingual field according to the active language fallback chain.
 * 
 * @private
 * @function resolveLocalizedField
 * @param {string|Record<string, string>} field - Raw string or localized key-value dictionary mapping locales to titles.
 * @param {string} language - Target language locale code passed down from internationalization providers.
 * @returns {string} The localized text string, the English fallback, or an empty string if missing.
 */
const resolveLocalizedField = (field, language) => {
    if (!field) return "";

    if (typeof field === "string") {
        return field;
    }

    const lang = language?.slice(0, 2) || "en";

    return field[lang] ?? field.en ?? "";
};

/**
 * Converts a raw bilingual event entity into a single-language view model representation.
 * Maps localized fields across complex nested paths including sub-entities like venues.
 *
 * @function localizeEvent
 * @param {Object} event - Raw database event object containing multilingual text dictionaries.
 * @param {string} language - Operational runtime target language code.
 * @returns {Object} A new shallow-copied event instance containing strictly flat-string display primitives.
 */
export const localizeEvent = (event, language) => ({
    ...event,
    title: resolveLocalizedField(
        event.title,
        language
    ),
    description: resolveLocalizedField(
        event.description,
        language
    ),
    category: resolveLocalizedField(
        event.category,
        language
    ),
    venue: {
        ...event.venue,
        name: resolveLocalizedField(
            event.venue?.name,
            language
        ),
    },
});

/**
 * Maps a collection of raw events into highly optimized localized display models.
 * Preserves structural immutability patterns by returning newly computed arrays.
 *
 * @function localizeEvents
 * @param {Object[]} [events=[]] - Collection of raw multi-language target events.
 * @param {string} language - Operational runtime target language code driving the transformation.
 * @returns {Object[]} Collection of localized frontend view model entities.
 */
export const localizeEvents = (
    events = [],
    language
) => {
    return events.map((event) =>
        localizeEvent(event, language)
    );
};