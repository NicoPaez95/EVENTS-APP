/**
 * @file BookmarkButton.jsx
 * @description Reusable atomic UI button component that handles bookmarking and removal interactions.
 * Encapsulates presentation states, SVG icon nodes, and native event propagation isolation.
 * @module shared/components/UI/BookmarkButton
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * BookmarkButton Component.
 *
 * An atomic, stateless button that encapsulates the visual representation of saving or removing
 * a target entity. It automatically intercepts pointer interactions to prevent unwanted parent bubble
 * propagation workflows.
 *
 * @component
 * @category Shared/UI
 * @param {Object} props - Component properties.
 * @param {boolean} [props.isSaved=false] - Reactive flag indicating if the target entity is bookmarked.
 * @param {boolean} [props.showRemoveButton=false] - Swaps the heart icon for a removal close badge.
 * @param {function(React.MouseEvent): void} props.onClick - Upward callback handler triggered upon selection.
 * @param {string} [props.className=""] - Optional alternative utility classes to append or override positions.
 * @returns {React.JSX.Element} An isolated, interactive vector button shell.
 */
const BookmarkButton = ({
  isSaved = false,
  showRemoveButton = false,
  onClick,
  className = "",
}) => {
  const CLOSE_ICON = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const HEART_ICON = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={isSaved ? "currentColor" : "none"}
      stroke="currentColor"
      className={`w-5 h-5 transition-colors duration-300 ${isSaved ? "text-danger" : "text-secondary-muted"}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );

  /**
   * Safe interaction interceptor.
   * Enforces event isolation limits to prevent cross-component link routing collisions.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e - Native click event context.
   */
  const handleInteraction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      onClick={handleInteraction}
      aria-label={showRemoveButton ? "Remove experience" : "Save experience"}
      className={`p-3 rounded-full backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent/50
        ${
          showRemoveButton
            ? "bg-danger-light text-danger hover:bg-danger hover:text-white"
            : "bg-surface/90 text-secondary-muted hover:text-danger"
        } ${className}`}
    >
      {showRemoveButton ? CLOSE_ICON : HEART_ICON}
    </button>
  );
};

BookmarkButton.propTypes = {
  isSaved: PropTypes.bool,
  showRemoveButton: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default BookmarkButton;
