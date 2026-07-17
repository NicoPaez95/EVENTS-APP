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
 * @typedef {Object} BookmarkButtonProps
 * @property {boolean} [isSaved=false] - Evaluated state matching user bookmarks catalog presence.
 * @property {boolean} [showRemoveButton=false] - Operational toggle switch to display alternative removal elements.
 * @property {function(React.MouseEvent<HTMLButtonElement>): void} onClick - Interaction callback handler.
 * @property {string} [className=""] - Optional template extension strings for tailored layout modifications.
 */

/**
 * BookmarkButton Component.
 *
 * An atomic, stateless button that encapsulates the visual representation of saving or removing
 * a target entity. It automatically intercepts pointer interactions to prevent unwanted parent bubble
 * propagation workflows.
 *
 * @component
 * @category Shared/UI
 * @param {BookmarkButtonProps} props - Component property payloads.
 * @returns {React.JSX.Element} The isolated bookmark toggle action element markup tree structure.
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
      className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90"
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
      className={`w-5 h-5 transition-all duration-300 ${
        isSaved
          ? "text-danger scale-110 animate-heartbeat"
          : "text-secondary-dark/60 group-hover:text-primary group-hover:scale-110"
      }`}
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

  let buttonColorStyles = "";
  if (showRemoveButton) {
    buttonColorStyles =
      "bg-danger/10 text-danger hover:bg-danger hover:text-inverse border border-danger/20";
  } else if (isSaved) {
    buttonColorStyles =
      "bg-surface/90 border border-danger/30 text-danger hover:bg-white hover:border-danger hover:ring-4 hover:ring-danger/20";
  } else {
    buttonColorStyles =
      "bg-surface/90 border border-secondary-border text-secondary-dark hover:text-primary hover:border-primary hover:bg-white hover:ring-4 hover:ring-primary/20";
  }

  return (
    <button
      type="button"
      onClick={handleInteraction}
      aria-label={showRemoveButton ? "Remove experience" : "Save experience"}
      className={`group p-3 rounded-full backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/40 ${buttonColorStyles} ${className}`}
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

BookmarkButton.defaultProps = {
  isSaved: false,
  showRemoveButton: false,
  className: "",
};

export default BookmarkButton;
