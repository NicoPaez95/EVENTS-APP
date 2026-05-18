/**
 * @file EventDate.jsx
 * @description Atomic component for consistent and accessible date rendering across domains.
 * Safely merges default Tailwind CSS utility classes with context-driven style overrides.
 * @module components/shared/UI/EventDate
 * @author Nico Paez
 */

import { cn } from "../../utils/cn";
import { formatEventDate } from "../../utils/dateHelpers";

/**
 * EventDate Atomic Component.
 *
 * Renders an inline typographic block displaying standardized date information alongside an accessible icon.
 * Consumes tokenized utilities to guarantee uniform localized formatting while leveraging the `cn`
 * pattern to safely absorb structural or aesthetic layout extensions.
 *
 * @component
 * @category Components/Shared/UI
 *
 * @param {Object} props - Component properties.
 * @param {string} props.date - The raw ISO timestamp string delivered by the orchestration layers.
 * @param {string} [props.className=""] - Optional Tailwind CSS utility classes to alter structural alignment or typography styles.
 *
 * @returns {JSX.Element|null} An accessible text block element, or null if the execution payload lacks a valid date parameter.
 */
const EventDate = ({ date, className = "" }) => {
  if (!date) return null;

  // Delegates structural tokenization to the shared utility layer
  const dateTokens = formatEventDate(date);

  // Fallback structural string behavior if token evaluation experiences anomalies
  const displayDate = dateTokens
    ? `${dateTokens.day} ${dateTokens.month}`
    : date;

  return (
    <p
      className={cn(
        "text-xs text-slate-600 flex items-center gap-2",
        className
      )}
    >
      <span className="opacity-70" aria-hidden="true">
        📅
      </span>
      {displayDate}
    </p>
  );
};

export default EventDate;
