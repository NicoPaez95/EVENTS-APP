/**
 * @typedef {Object} FeaturedEvent
 * @property {string|number} id - Unique identifier for the featured slide.
 * @property {string} image - High-resolution URL for the carousel display.
 * @property {string} alt - Alternative text for screen readers and accessibility.
 */

/**
 * Mock data for the Featured Events Carousel.
 * * These items are specifically structured for visual promotion,
 * focusing on imagery rather than detailed event metadata.
 * * @type {FeaturedEvent[]}
 */
export const featuredEvents = [
  {
    id: "f1",
    image: "https://picsum.photos/800/400?random=1",
    alt: "Featured Event 1",
  },
  {
    id: "f2",
    image: "https://picsum.photos/800/400?random=2",
    alt: "Featured Event 2",
  },
  {
    id: "f3",
    image: "https://picsum.photos/800/400?random=3",
    alt: "Featured Event 3",
  },
];