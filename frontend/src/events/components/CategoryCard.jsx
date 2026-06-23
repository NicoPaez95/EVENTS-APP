import React from "react";
import PropTypes from "prop-types";
import { resolveCategoryFallback } from "../utils/categoryAssetMapper";

/**
 * CategoryCard Component.
 *
 * A presentational "Dumb" component that displays a single category's title
 * along with its corresponding contextual background image resolved locally.
 *
 * Architectural Design:
 * - Separation of Concerns: It does not handle category data states or filters directly;
 *   it receives configuration properties from its orchestrator parent.
 * - Asset Resolution: Delegates the background image mapping to an external, pure utility
 *   (`resolveCategoryFallback`) to keep the JSX markup free of dictionary strings.
 *
 * @component
 * @category Components
 * @param {Object} props - The component properties.
 * @param {string} props.title - The name or title of the category to display (e.g., 'Music', 'Tech', 'All').
 * @param {string} props.imagekey - The matching asset resolution token used to map local static images.
 * @param {function} props.onClick - Callback function executed when the card is clicked.
 * @returns {React.JSX.Element} A styled article element acting as an interactive category card.
 */
const CategoryCard = ({ title, imagekey, onClick }) => {
  // Resolve the visual asset path synchronously inside the presentational layer
  const imageSrc = resolveCategoryFallback(imagekey);

  return (
    <article
      className="relative w-64 h-40 rounded-xl overflow-hidden cursor-pointer shadow-sm border border-solid border-slate-200 hover:shadow-md hover:scale-[1.02] transition-all duration-300 group"
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

      {/* Dark Overlay Mask for Text Legibility */}
      <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/50 transition-colors" />

      {/* Content Layer */}
      <div className="absolute inset-0 p-4 flex items-end">
        <h3 className="font-bold text-white text-xl tracking-wide drop-shadow-sm font-display">
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
