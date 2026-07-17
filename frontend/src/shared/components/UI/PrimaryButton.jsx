/**
 * @file PrimaryButton.jsx
 * @description Reusable atomic component for the design system's primary action button.
 * @module shared/components/UI/PrimaryButton
 * @author Nico Paez
 *
 */
import React from "react";
import PropTypes from "prop-types";
/**
 * PrimaryButton Component.
 *
 * A high-level atomic component that standardizes primary actions.
 * Supports different sizes and full-width layouts while maintaining brand consistency.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label.
 * @param {boolean} [props.isLoading] - Shows spinner and disables interaction.
 * @param {boolean} [props.fullWidth=true] - If the button should take 100% of container.
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Visual scale of the button.
 * @param {string} [props.className] - Extra Tailwind classes for specific positioning.
 */
const PrimaryButton = ({
  children,
  isLoading,
  loadingText,
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
      disabled={isLoading || props.disabled}
      className={`
        ${fullWidth ? "w-full" : "w-auto"}
        ${sizeStyles[size]}
      bg-primary text-inverse font-black
        hover:bg-primary-hover hover:-translate-y-0.5 active:scale-95 
        shadow-lg shadow-primary/20
        transition-all duration-200 
        disabled:bg-surface-disabled disabled:text-secondary-muted disabled:shadow-none disabled:translate-y-0 disabled:scale-100
        flex justify-center items-center gap-2 uppercase tracking-wider
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-inverse/30 border-t-inverse rounded-full animate-spin" />
          <span>{loadingText || "Loading..."}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};
export default PrimaryButton;
