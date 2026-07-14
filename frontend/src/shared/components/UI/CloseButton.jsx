/**
 * @file CloseButton.jsx
 * @description Reusable atomic UI button dedicated to close, cancel, or removal interactions.
 * Encapsulates standard SVG icons, tailwind variants, and keyboard/screen-reader accessibility props.
 * @module shared/components/UI/CloseButton
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * CloseButton Component.
 *
 * A clean, atomic button designed specifically for dismantling modal states, alerts,
 * or removing items from dashboard lists with built-in bubble propagation prevention.
 *
 * @component
 * @category Shared/UI
 * @param {Object} props - Component properties.
 * @param {function(React.MouseEvent): void} props.onClick - Callback executed upon button press.
 * @param {string} [props.ariaLabel="Close"] - Accessibility label text for screen readers.
 * @param {string} [props.className=""] - Optional Tailwind utility extensions for custom scaling or positioning.
 * @param {boolean} [props.stopPropagation=true] - Enforces boundary isolation against parent click captures.
 * @returns {React.JSX.Element} An accessible, reactive icon button shell.
 */
const CloseButton = ({
  onClick,
  ariaLabel = "Close",
  className = "",
  stopPropagation = true,
}) => {
  /**
   * Safe click event handler.
   * Isolates pointer signals to avoid firing unwanted background link routing.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e - Native pointer event payload.
   */
  const handleInteraction = (e) => {
    if (stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onClick) onClick(e);
  };

  return (
    <button
      type="button"
      onClick={handleInteraction}
      aria-label={ariaLabel}
      className={`p-2 rounded-xl text-secondary-muted hover:text-primary hover:bg-surface active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 ${className}`}
    >
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
    </button>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  stopPropagation: PropTypes.bool,
};

export default CloseButton;
