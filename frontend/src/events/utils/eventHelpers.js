// src/events/utils/eventHelpers.js

/**
 * Finds a specific event within a collection based on its unique identifier.
 * * @description
 * This helper implements a "Safety Cast" strategy, converting both IDs to strings.
 * This prevents common lookup failures when IDs are provided as integers from an API
 * but as strings from URL parameters (via `useParams`).
 * * @function
 * @param {Array<Object>} events - The collection of event objects to search.
 * @param {string|number} id - The target ID (usually from URL params).
 * @returns {Object|undefined} The matched event object, or undefined if not found or params are invalid.
 */
export const findEventById = (events, id) => {
    if (!events || !id) return undefined;
    return events.find(e => String(e.id) === String(id));
};

/**
 * Filters a collection of events based on a dynamic future time window.
 * * @description
 * This utility performs two main operations:
 * 1. **Temporal Validation**: Automatically excludes any event whose date is in the past.
 * 2. **Proximity Filtering**: Segregates future events into buckets (24h, 7d, 30d) based on 
 * the difference between the current system time and the event's execution date.
 * * @function
 * @category Utils/Events
 * @param {Array<Object>} events - The array of event objects to process.
 * @param {'24h'|'7d'|'30d'|'all'} range - The time window identifier.
 * @returns {Array<Object>} A filtered subset containing only relevant future events.
 */
export const filterEventsByTime = (events, range) => {
    if (!events) return [];

    const now = new Date();

    return events.filter(event => {
        const eventDate = new Date(event.date);
        const timeDiff = eventDate - now;

        // Constant for millisecond-to-day conversion: (1000ms * 60s * 60m * 24h)
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

        // Retention Guard: Only include future events
        if (timeDiff < 0) return false;

        // Logic branching for specific temporal windows
        if (range === '24h') return daysDiff <= 1;
        if (range === '7d') return daysDiff <= 7;
        if (range === '30d') return daysDiff <= 30;

        // Default: Include all future events
        return true;
    });
};