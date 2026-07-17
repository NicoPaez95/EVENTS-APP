/**
 * @file ActionLink.jsx
 * @description Presentational atomic component that renders a standardized navigation link.
 * Tailored for primary calls-to-action such as lists details expansions or directory indexes.
 * @module components/shared/UI/ActionLink
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * @typedef {Object} ActionLinkProps
 * @property {string} to - The destination route path managed by the router package.
 * @property {React.ReactNode} children - Text content or inline child elements to render within the link hook.
 * @property {string} [className=""] - Optional template extension strings for tailored layout modifications.
 * @property {boolean} [centered=false] - Explicit spatial modifier switch to justify elements symmetrically inside parent nodes.
 */

/**
 * ActionLink Component.
 *
 * Provides a highly reusable, accessible link interface embedded with explicit interactive
 * design hints (such as animated inline direction glyphs) and flexible spatial alignment.
 *
 * @component
 * @category Components/Shared/UI
 * @param {ActionLinkProps} props - Component property payloads.
 * @returns {React.JSX.Element} An isolated thematic interactive application navigation anchor markup tree.
 */
const ActionLink = ({ to, children, className = "", centered = false }) => {
  const baseStyles =
    "group text-[10px] font-bold text-action hover:text-action-hover uppercase tracking-widest transition-all flex items-center gap-1";
  const alignment = centered ? "justify-center" : "";

  return (
    <Link to={to} className={`${baseStyles} ${alignment} ${className}`}>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
};

ActionLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  centered: PropTypes.bool,
};

ActionLink.defaultProps = {
  className: "",
  centered: false,
};

export default ActionLink;
