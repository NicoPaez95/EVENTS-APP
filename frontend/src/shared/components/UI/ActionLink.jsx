/**
 * @file ActionLink.jsx
 * @description Presentational atomic component that renders a standardized navigation link.
 * Tailored for primary calls-to-action such as lists details expansions or directory indexes.
 * @module components/shared/UI/ActionLink
 * @author Nico Paez
 */

import { Link } from "react-router-dom";

/**
 * ActionLink Component.
 *
 * Provides a highly reusable, accessible link interface embedded with explicit interactive
 * design hints (such as animated inline direction glyphs) and flexible spatial alignment.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.to - The destination route path managed by the router package.
 * @param {React.ReactNode} props.children - Text content or inline child elements to render within the link hook.
 * @param {string} [props.className=""] - Optional template extension strings for tailored layout modifications.
 * @param {boolean} [props.centered=false] - Explicit spatial modifier switch to justify elements symmetrically inside parent nodes.
 * @returns {JSX.Element} An isolated thematic interactive application navigation anchor.
 */
const ActionLink = ({ to, children, className = "", centered = false }) => {
  const baseStyles =
    "text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest transition-all flex items-center gap-1";
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

export default ActionLink;
