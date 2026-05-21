/**
 * @file eventFallbackMapper.js
 * @description Utility module that handles defensive image resolution and structural visual fallbacks for events based on domain category taxnomies.
 * @module utils/eventFallbackMapper
 * @author Nico Paez
 */

/**
 * Visual fallbacks for broken or missing event images mapped by category.
 * @private
 * @type {Record<string, string>}
 */
const EVENT_FALLBACKS = {
    art: "/assets/images/fallbacks/art-placeholder.webp",
    food: "/assets/images/fallbacks/food-placeholder.webp",
    music: "/assets/images/fallbacks/music-placeholder.webp",
    tech: "/assets/images/fallbacks/tech-placeholder.webp"
};

/**
 * Resolves the appropriate image path for an event entity.
 * Evaluates the validity of the remote backend image asset, falling back to a 
 * highly contextual, category-specific local vector asset if the payload is missing.
 *
 * @function resolveEventImage
 * @param {string} category - The domain classification taxonomy of the event (e.g., 'art', 'music').
 * @param {string} [image] - The remote binary image URL source string delivered asynchronously by MongoDB.
 * @returns {string} The finalized, safe visual path string deployment source ready for image tags.
 */
export const resolveEventImage = (category, image) => {
    // Check if the remote image string exists and contains printable data
    if (image && image.trim() !== "") {
        return image;
    }

    // Normalize incoming domain strings to guarantee safe dictionary lookups
    const normalizedCategory = category?.trim().toLowerCase();

    // Defensive Fallback Strategy: If an unexpected domain taxonomy bypasses validation,
    // default to the 'tech' placeholder matrix to enforce UI application stability.
    return EVENT_FALLBACKS[normalizedCategory] || EVENT_FALLBACKS.tech;
};