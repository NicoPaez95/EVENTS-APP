/**
 * @file CategoryGrid.jsx
 * @description Presentational container component rendering a responsive collection of category cards.
 * Implements a dual-layout strategy: an Instagram Stories-style horizontal swipe carousel for mobile viewports,
 * and a single-row fluid responsive flex grid for desktop viewports.
 * @module components/events/CategoryGrid
 */

import React from "react";
import PropTypes from "prop-types";
import CategoryCard from "./CategoryCard";

/**
 * @typedef {Object} CategoryItem
 * @property {string|number} id - Unique identifier for the category.
 * @property {string} title - Display name of the category.
 * @property {string} key - Asset token used to map and resolve the card background image.
 */

/**
 * CategoryGrid Presentational Component.
 *
 * A stateless container component decoupled from global application state.
 * Receives category data and event handler callbacks strictly via props.
 *
 * @component
 * @category Components/Events
 * @param {Object} props - Component props payload.
 * @param {CategoryItem[]} [props.categories=[]] - Array of category items to render.
 * @param {Function} [props.onCategoryClick] - Callback fired when a category card is selected.
 * @returns {React.JSX.Element} The rendered category selection container.
 */
const CategoryGrid = ({ categories = [], onCategoryClick }) => {
  return (
    /*
      Layout Engine Strategy:
      - Mobile (< md): Horizontal scroll carousel with CSS snap points (`snap-x`, `snap-mandatory`).
      - Desktop (>= md): Single-row flex layout (`md:flex-nowrap`), centered (`md:justify-center`),
        with overflow hidden (`md:overflow-hidden`) to avoid overlapping sibling components.
    */
    <section
      className="w-full flex overflow-x-auto snap-x snap-mandatory md:overflow-hidden md:snap-none md:flex-nowrap justify-start md:justify-center gap-4 p-4 no-scrollbar"
      aria-label="Event categories selection"
    >
      {categories.map((category) => (
        /*
          Card Container Wrapper:
          - Mobile: Fixed dimensions, preventing shrink (`shrink-0`) to enable horizontal scroll.
          - Desktop: Fluid scaling (`md:shrink md:min-w-0 md:w-full md:max-w-[16rem]`) to fit 
            all cards into a single row without squeezing out the layout gap.
        */
        <div
          key={category.id}
          className="snap-start shrink-0 md:shrink md:min-w-0 md:w-full md:max-w-[16rem]"
        >
          <CategoryCard
            title={category.title}
            imagekey={category.key}
            onClick={() => onCategoryClick?.(category.title)}
          />
        </div>
      ))}
    </section>
  );
};

CategoryGrid.propTypes = {
  /** Array of category objects */
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ),
  /** Callback fired when a user selects a category, passing the category title */
  onCategoryClick: PropTypes.func,
};

export default CategoryGrid;
