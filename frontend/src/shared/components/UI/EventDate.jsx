/**
 * @file EventDate.jsx
 * @description Atomic component for consistent and accessible date rendering.
 * Safely merges default Tailwind CSS utility classes with custom overrides.
 * @module components/shared/UI/EventDate
 * @author Nico Paez
 */

import { cn } from "../../utils/cn";

/**
 * EventDate Atomic Component.
 *
 * Renders an inline text block displaying temporary event contexts alongside a standardized icon.
 * Employs the `cn` utility pattern to absorb context-driven aesthetic overrides without style collision.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.date - The localized or raw timestamp string representing the event's schedule.
 * @param {string} [props.className=""] - Optional extra Tailwind class strings to alter structural or typographic defaults.
 * @returns {JSX.Element} A flexible, accessible typography component.
 */
const EventDate = ({ date, className = "" }) => (
  <p
    className={cn("text-xs text-slate-600 flex items-center gap-2", className)}
  >
    <span className="opacity-70" aria-hidden="true">
      📅
    </span>
    {date}
  </p>
);

export default EventDate;
