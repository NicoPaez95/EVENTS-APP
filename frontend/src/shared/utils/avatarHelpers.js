/**
 * @file avatarHelpers.js
 * @description Specialized utility functions for user identity extraction and profile fallbacks.
 * @module shared/utils/avatarHelpers
 * @author Nico Paez
 */

/**
 * Extracts secure initials from a user's display name.
 * Handles double names, single characters, and empty or null values gracefully.
 * 
 * @function getInitials
 * @param {string} [name] - The user display name to process.
 * @returns {string} One or two uppercase character tokens representing the name initials (e.g., "NP").
 */
export const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '??';

    const tokens = name.trim().split(/\s+/);
    if (tokens.length === 0 || !tokens[0]) return '??';

    if (tokens.length === 1) {
        return tokens[0].substring(0, 2).toUpperCase();
    }

    return `${tokens[0].charAt(0)}${tokens[tokens.length - 1].charAt(0)}`.toUpperCase();
};

/**
 * Generates a consistent Tailwind CSS gradient class string based on the user's name signature.
 * Ensures the same user always receives the same visual avatar color spectrum.
 * 
 * @function getAvatarColorGradient
 * @param {string} [name] - The identity target signature string.
 * @returns {string} Linear gradient Tailwind class utility combinations.
 */
export const getAvatarColorGradient = (name) => {
    const gradients = [
        'from-blue-600 to-indigo-700 text-white',
        'from-emerald-500 to-teal-700 text-white',
        'from-purple-600 to-pink-700 text-white',
        'from-amber-500 to-orange-600 text-white',
        'from-rose-500 to-red-700 text-white',
        'from-cyan-500 to-blue-600 text-white'
    ];

    if (!name) return gradients[0];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
};