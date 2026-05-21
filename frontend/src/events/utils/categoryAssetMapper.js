/**
 * @file categoryAssetMapper.js
 * @description Utility module that handles structural visual mapping and local asset resolution for application category filters.
 * @module utils/categoryAssetMapper
 * @author Nico Paez
 */

/**
 * Local relative paths for category-specific placeholder images.
 * These assets reside in the public directory as static design resources.
 * @private
 * @type {Record<string, string>}
 */
const FALLBACK_IMAGES = {
    art: "/assets/images/category/art-placeholder.webp",
    food: "/assets/images/category/food-placeholder.webp",
    music: "/assets/images/category/music-placeholder.webp",
    tech: "/assets/images/category/tech-placeholder.webp",
    generic: "/assets/images/category/generic-placeholder.webp"
};

/**
 * Resolves the local relative image source path for a specific domain category entity.
 * Sanitizes the input string to match the local design system dictionary tokens,
 * defaulting to a safe generic brand asset if the category is unassigned or unrecognized.
 *
 * @function resolveCategoryFallback
 * @param {string} category - The domain category type taxonomy (e.g., 'Art', 'Food', 'All').
 * @returns {string} The finalized, safe local path to the targeted webp asset.
 */
export const resolveCategoryFallback = (category) => {
    // If no category identity is provided, immediately return the safe generic branding lifesaver
    if (!category) return FALLBACK_IMAGES.generic;

    // Normalize incoming filter text to guarantee clean dictionary lookups
    const normalizedCategory = category.trim().toLowerCase();

    // Evaluate the sanitized string and return the specific asset or cascade to generic fallback
    return FALLBACK_IMAGES[normalizedCategory] || FALLBACK_IMAGES.generic;
};