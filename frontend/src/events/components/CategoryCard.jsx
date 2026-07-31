/**
 * @file CategoryCard.jsx
 * @description Presentational component for displaying event categories using interactive visual cards.
 * Integrates synchronized local asset mapping, fluid sizing capability, and full accessibility support.
 * @module components/events/CategoryCard
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { resolveCategoryFallback } from "../utils/categoryAssetMapper";

/**
 * @typedef {Object} CategoryCardProps
 * @property {string} title - The explicit display title of the category (e.g., 'Music', 'Tech').
 * @property {string} imagekey - The unique asset resolution token mapped to static local images.
 * @property {Function} onClick - Interceptor callback executed upon pointer activation or keyboard confirmation.
 */

/**
 * CategoryCard Presentational Component.
 *
 * A stateless, pure user interface element responsible for rendering an interactive category tile.
 * Leverages local synchronous resolution for background layers and enforces semantic keyboard accessibility boundaries.
 *
 * @component
 * @category Components/Events
 * @param {CategoryCardProps} props - Component property payloads.
 * @returns {React.JSX.Element} An accessible and styled visual category tile.
 */
const CategoryCard = ({ title, imagekey, onClick }) => {
  // Resolve the visual asset path synchronously inside the presentational layer
  const imageSrc = resolveCategoryFallback(imagekey);

  return (
    <article
      /* 
        Responsive Width Strategy:
        - Mobile: Fixed width (`w-64`) to preserve story card aspect ratio during swipe scrolling.
        - Desktop (`md:w-full`): Adapts dynamically to 100% of the parent wrapper width to maintain spacing and scaling.
      */
      className="relative w-64 md:w-full h-40 rounded-xl overflow-hidden cursor-pointer shadow-sm border border-solid border-secondary-border hover:shadow-md hover:scale-[1.02] transition-all duration-300 group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Visual Asset Layer */}
      <img
        src={imageSrc}
        alt={`${title} category background`}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/85 transition-colors duration-300" />

      {/* Content Layer */}
      <div className="absolute inset-0 p-4 flex items-end">
        <h3 className="font-bold text-inverse text-lg md:text-xl tracking-wide drop-shadow-sm font-display truncate">
          {title}
        </h3>
      </div>
    </article>
  );
};

CategoryCard.propTypes = {
  /** Display title for the category */
  title: PropTypes.string.isRequired,
  /** Asset mapping key token for image lookup */
  imagekey: PropTypes.string.isRequired,
  /** Click/Selection handler */
  onClick: PropTypes.func.isRequired,
};

export default CategoryCard;
