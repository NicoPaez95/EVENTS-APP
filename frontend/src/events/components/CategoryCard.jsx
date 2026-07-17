/**
 * @file CategoryCard.jsx
 * @description Presentational component for displaying event categories using interactive visual cards.
 * Integrates synchronized local asset mapping and full keyboard interaction support for screen reader accessibility.
 * @module components/events/CategoryCard
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { resolveCategoryFallback } from "../utils/categoryAssetMapper";

/**
 * @typedef {Object} CategoryCardProps
 * @property {string} title - The explicit display name or taxonomic title of the category (e.g., 'Music', 'Tech').
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
 * @returns {React.JSX.Element} An accessible and styled visual category summary markup tree structure.
 */
const CategoryCard = ({ title, imagekey, onClick }) => {
  // Resolve the visual asset path synchronously inside the presentational layer
  const imageSrc = resolveCategoryFallback(imagekey);

  return (
    <article
      className="relative w-64 h-40 rounded-xl overflow-hidden cursor-pointer shadow-sm border border-solid border-secondary-border hover:shadow-md hover:scale-[1.02] transition-all duration-300 group"
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/85 transition-colors duration-300" />

      {/* Content Layer */}
      <div className="absolute inset-0 p-4 flex items-end">
        <h3 className="font-bold text-inverse text-xl tracking-wide drop-shadow-sm font-display">
          {title}
        </h3>
      </div>
    </article>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  imagekey: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryCard;
