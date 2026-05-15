/**
 * @file EventLocation.jsx
 * @description Atomic component for consistent and accessible location rendering.
 * Leverages the style merging utility to safely combine architectural layout defaults with context overrides.
 * @module components/shared/UI/EventLocation
 * @author Nico Paez
 */

import { cn } from "../../utils/cn";

/**
 * EventLocation Atomic Component.
 *
 * Renders an inline visual block presenting spatial context data alongside a localized icon.
 * Features automated fallback text processing for unassigned spatial entries and safe style extension.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} [props.city] - The specific city or venue name where the event takes place.
 * @param {string} [props.className=""] - Optional custom Tailwind utility class strings to override layout or text defaults.
 * @returns {JSX.Element} An adaptive typography layout block.
 */
const EventLocation = ({ city, className = "" }) => (
  <p
    className={cn("text-xs text-slate-500 flex items-center gap-2", className)}
  >
    <span className="opacity-70" aria-hidden="true">
      📍
    </span>
    {city || "Location TBD"}
  </p>
);

export default EventLocation;
