/**
 * @file SecondaryButton.jsx
 * @description Reusable atomic component for the design system's alternative or low-priority action button.
 * Standardizes secondary interfaces within the shared UI layer to complement primary user paths.
 * @module shared/components/UI/SecondaryButton
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} SecondaryButtonProps
 * @property {React.ReactNode} children - Dynamic node content acting as the active label for the action button.
 * @property {boolean} [isLoading=false] - Operational toggle that replaces label contents with animation spinners and limits interaction.
 * @property {string} [loadingText="Loading..."] - Alternate contextual label displayed exclusively when the loading state is active.
 * @property {boolean} [fullWidth=true] - Structural flag enforcing block layout matching 100% width of the direct parent viewport boundary.
 * @property {'sm'|'md'|'lg'} [size='md'] - Visual scale configuration key used to scale inner spacing tokens and font dimensions.
 * @property {string} [className=""] - Extensible string placeholder used to inject micro-layout parameters or position updates.
 */

/**
 * SecondaryButton Component.
 *
 * An atomic component that standardizes alternative or low-priority actions.
 * Complements PrimaryButton by using a softer border/background footprint.
 *
 * @component
 * @category Shared/UI
 * @param {SecondaryButtonProps} props - Component property payloads.
 * @returns {React.JSX.Element} The structural interactive button markup root tree.
 */
const SecondaryButton = ({
  children,
  isLoading = false,
  loadingText = "Loading...",
  fullWidth = true,
  size = "md",
  className = "",
  ...props
}) => {
  // Size variations map
  const sizeStyles = {
    sm: "py-2 px-4 text-xs rounded-xl",
    md: "py-3 px-6 text-sm rounded-xl",
    lg: "py-4 px-8 text-lg rounded-2xl",
  };

  return (
    <button
      {...props}
      type={props.type || "button"}
      disabled={isLoading || props.disabled}
      className={`
        ${fullWidth ? "w-full" : "w-auto"}
        ${sizeStyles[size]}
        
        /* DESIGN SYSTEM APPLICATION */
        bg-surface-input
        text-secondary-subtitle
        border border-secondary-border
        font-semibold

        hover:bg-surface-subcard
        hover:border-primary
        hover:text-primary
        hover:shadow-sm

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary/30
        focus-visible:ring-offset-2

        active:scale-95

        disabled:bg-surface-disabled
        disabled:text-secondary-muted
        disabled:border-secondary-border/50
        disabled:shadow-none
        disabled:cursor-not-allowed

        cursor-pointer
        transition-all duration-200

        flex justify-center items-center gap-2
        uppercase tracking-wider

        ${className}
      `}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-current/20 border-t-current rounded-full animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};

// Declared explicitly to sustain architecture uniformity with the atomic design ecosystem
SecondaryButton.defaultProps = {
  isLoading: false,
  loadingText: "Loading...",
  fullWidth: true,
  size: "md",
  className: "",
};

export default SecondaryButton;
