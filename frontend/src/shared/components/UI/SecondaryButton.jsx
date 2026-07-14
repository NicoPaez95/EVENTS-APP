/**
 * @file SecondaryButton.jsx
 * @description Reusable component Button.
 * Standardizes alternative or low-priority actions within the shared UI layer.
 * @module shared/components/UI/SecondaryButton
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * SecondaryButton Component
 *
 * An atomic component that standardizes alternative or low-priority actions.
 * Complements PrimaryButton by using a softer border/background footprint
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label.
 * @param {boolean} [props.isLoading] - Shows spinner and disables interaction.
 * @param {string} [props.loadingText] -Shows text "loading" while the modal loads.
 * @param {boolean} [props.fullWidth=true] - If the button should take 100% of container.
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Visual scale of the button.
 * @param {string} [props.className] - Extra Tailwind classes for specific positioning.
 */

const SecondaryButton = ({
  children,
  isLoading,
  loadingText,
  fullWidth = true,
  size = "md",
  className = "",
  ...props
}) => {
  const sizeStyles = {
    sm: "py-2 px-4 text-xs rounded-xl",
    md: "py-3 px-6 text-sm rounded-xl",
    lg: "py-4 px-8 text-lg rounded-2xl",
  };

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`
        ${fullWidth ? "w-full" : "w-auto"}
        ${sizeStyles[size]}
        
        /* DESIGN SYSTEM APPLICATION */
        bg-secondary-light text-secondary border border-secondary-border font-bold
        hover:bg-surface hover:text-primary active:scale-95 
      
        transition-all duration-200
        disabled:bg-secondary-light disabled:text-secondary-muted disabled:border-secondary-border/50 disabled:shadow-none
        flex justify-center items-center gap-2 uppercase tracking-wider
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
          <span>{loadingText || "Loading..."}</span>
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

export default SecondaryButton;
