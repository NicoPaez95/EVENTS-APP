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
 * @typedef {Object} PageHeaderProps
 * @property {React.ReactNode} title - The primary headline string, translation node, or custom compound elements.
 * @property {React.ReactNode} [description] - Optional context subtitle text, reactive counters, or micro-state loaders.
 * @property {1|2|3} [level=1] - Semantic HTML heading rank used to generate dynamic nodes (H1, H2, H3).
 * @property {'left'|'center'} [align='left'] - Structural layout inline text orchestration alignment.
 * @property {string} [textColor='text-primary'] - Tailwind typography design color token class mapping override.
 * @property {string} [className=''] - Escape hatch utility used to inject custom margins, paddings, or flex parameters.
 */

/**
 * PageHeader Polymorphic Component.
 *
 * Highly adaptive presentational component designed to unify semantic heading ranks
 * while maintaining rigid adherence to corporate design tokens and typography scaling layouts.
 *
 * @component
 * @category Components/Shared/UI
 * @param {PageHeaderProps} props - Component property payloads.
 * @returns {React.JSX.Element} A scalable, accessible semantic header layout tree structure.
 */
const PageHeader = ({
  title,
  description,
  level = 1,
  align = "left",
  textColor = "text-primary",
  className = "",
  ...props
}) => {
  // Dynamic semantic tag construction based on architectural hierarchy level
  const Tag = `h${level}`;

  // Typography design tokens scaled dynamically by heading depth (Mobile-First approach)
  const sizeStyles = {
    1: "text-3xl font-bold tracking-tight md:text-4xl",
    2: "text-2xl font-bold tracking-tight md:text-3xl",
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
      {/* Dynamic injection of sizing rules and color parameters over structural web fonts */}
      <Tag className={`${sizeStyles[level]} ${textColor} font-sans`}>
        {title}
      </Tag>

      {description && (
        /* Uses text-secondary (#475569) Charcoal Gray for a softer, highly readable text */
        <div
          className={`text-secondary-description font-medium text-sm md:text-base ${alignStyles[align]}`}
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
  textColor: PropTypes.string,
  className: PropTypes.string,
};

PageHeader.defaultProps = {
  description: null,
  level: 1,
  align: "left",
  textColor: "text-primary",
  className: "",
};

export default PageHeader;
