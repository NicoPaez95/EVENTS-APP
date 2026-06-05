/**
 * @file PageHeader.jsx
 * @description Reusable polymorphic semantic header component.
 * Guarantees typography, structural tracking, and spacing consistency across different application domains.
 * @module shared/components/UI/PageHeader
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * PageHeader Polymorphic Component.
 *
 * Highly adaptive presentational component designed to unify semantic heading ranks
 * while maintaining rigid adherence to corporate design tokens and typography scaling layouts.
 *
 * @component
 * @category Components/Shared/UI
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.title - The primary headline string, translation node, or custom compound elements.
 * @param {React.ReactNode} [props.description] - Optional context subtitle text, reactive counters, or micro-state loaders.
 * @param {1|2|3} [props.level=1] - Semantic HTML heading rank used to generate dynamic nodes (H1, H2, H3).
 * @param {'left'|'center'} [props.align='left'] - Structural layout inline text orchestration alignment.
 * @param {string} [props.className=''] - Escape hatch utility used to inject custom margins, paddings, or flex parameters.
 * @returns {React.JSX.Element} A scalable, accessible semantic header layout tree.
 */
const PageHeader = ({
  title,
  description,
  level = 1,
  align = "left",
  className = "",
  ...props
}) => {
  // Dynamic semantic tag construction based on architectural hierarchy level
  const Tag = `h${level}`;

  // Rigid typography design tokens calibrated by semantic layer depth
  const sizeStyles = {
    1: "text-3xl font-bold tracking-tight",
    2: "text-2xl font-bold tracking-tight",
    3: "text-xl font-semibold tracking-wide",
  };

  const alignStyles = {
    left: "text-left",
    center: "text-center mx-auto",
  };

  return (
    <div
      className={`space-y-2 ${alignStyles[align]} ${className}`}
      {...props} // Securely spreads native attributes (e.g. id for aria-labelledby, data-attributes, roles)
    >
      <Tag className={`${sizeStyles[level]} text-slate-900 font-display`}>
        {title}
      </Tag>

      {description && (
        <div
          className={`text-slate-500 font-medium text-sm md:text-base ${alignStyles[align]}`}
        >
          {description}
        </div>
      )}
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  level: PropTypes.oneOf([1, 2, 3]),
  align: PropTypes.oneOf(["left", "center"]),
  className: PropTypes.string,
};

export default PageHeader;
