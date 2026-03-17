/**
 * @typedef {Object} Category
 * @property {string} id - Unique identifier for the category (e.g., 'c1').
 * @property {string} title - Display name of the category.
 */

/**
 * Mock data for event categories.
 * * Used for the category grid and search filters.
 * * @type {Category[]}
 */
export const categories = [
    {
        id: 'c0',
        title: 'All',
    },
    {
        id: 'c1',
        title: 'Tech',
    },
    {
        id: 'c2',
        title: 'Music',
    },
    {
        id: 'c3',
        title: 'Art',
    },
    {
        id: 'c4',
        title: 'Food',
    },
];