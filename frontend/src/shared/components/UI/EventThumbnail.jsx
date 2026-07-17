/**
 * @file EventThumbnail.jsx
 * @description Atomic UI component that renders a consistent, scalable event preview image.
 * Now supports a "fluid" mode for dynamic grid adaptation without fixed dimensions.
 * @module shared/components/UI/EventThumbnail
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * Structural size modifiers configuration map.
 * @type {Object.<string, string>}
 */
const SIZE_CLASSES = {
  xs: "w-12 h-9",
  sm: "w-16 h-12",
  md: "w-24 h-16",
  lg: "w-32 h-24",
  fluid: "w-full",
};

/**
 * @typedef {Object} EventThumbnailProps
 * @property {string} [src=""] - Remote raw image pathway source string.
 * @property {string} alt - Plain text fallback value required to describe the visual asset to assistive tech.
 * @property {"xs" | "sm" | "md" | "lg" | "fluid"} [size="md"] - Structural scale identifier mapping to pre-configured layout bounding boxes.
 * @property {string} [className=""] - Optional template extension layout helper overrides.
 */

/**
 * EventThumbnail Component.
 *
 * An atomic presentation element that isolates image formatting boundaries, maintaining uniform
 * aspect ratios and image containment techniques across media listings.
 *
 * @component
 * @category Shared/UI
 * @param {EventThumbnailProps} props - Component property payloads.
 * @returns {React.JSX.Element} The isolated bounding box element holding the rendered visual asset structure.
 */
const EventThumbnail = ({ src, alt, size, className }) => {
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  return (
    <div
      className={`relative ${sizeClass} rounded-lg overflow-hidden bg-secondary-light flex-shrink-0 border border-secondary-border/50 ${className}`}
    >
      <img
        src={src || "https://via.placeholder.com/150"}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};

EventThumbnail.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "fluid"]),
  className: PropTypes.string,
};

EventThumbnail.defaultProps = {
  src: "",
  size: "md",
  className: "",
};

export default EventThumbnail;
