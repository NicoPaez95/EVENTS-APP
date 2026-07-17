/**
 * @file VenueInfo.jsx
 * @description Standardized, multi-purpose atomic component for displaying venue location info.
 * Absorbs alternative location presentation needs to provide platform-wide visual consistency.
 * @module components/shared/UI/VenueInfo
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} VenuePayload
 * @property {string} [name] - The official structural name or moniker of the physical venue site.
 * @property {string} [city] - The metropolitan municipality or region location boundary.
 */

/**
 * VenueInfo Component (Presentational & Polymorphic).
 *
 * A unified atomic component used to manage geographic context layouts. Supports optional
 * venue names, fallback states, interactive hover states, and alternative icon styles.
 *
 * Architectural Strategy:
 * - Polymorphic Data Handling: Flexes gracefully between full venue compounds (Name + City)
 *   and isolated region declarations (City only), eliminating layout duplication.
 * - Defensive Rendering: Safeguards the DOM tree by injecting elegant text fallbacks
 *   and early exits if data streams are partial or broken.
 * - Centralized Design Tokens: Links directly to the application's semantic color system
 *   (primary, secondary, and acent tokens) to avoid inline color leaks.
 *
 * @component
 * @category Components/UI
 *
 * @param {Object} props - Component property payloads.
 * @param {VenuePayload} [props.venue=null] - Core geographic data structure mapping options.
 * @param {boolean} [props.isClickable=false] - Injects pointer cursors and custom interactive branding color tokens.
 * @param {boolean} [props.useEmoji=false] - Visual variant flag to switch from the native SVG pin to an inline emoji.
 *
 * @returns {React.JSX.Element|null} The formatted geolocation layout tree block or null if data is completely absent.
 */
const VenueInfo = ({ venue, isClickable = false, useEmoji = false }) => {
  // Salida defensiva en caso de que el objeto llegue totalmente nulo
  if (!venue) return null;

  const { name, city } = venue;

  // Si no hay datos legibles, mostramos un fallback seguro
  if (!name && !city) {
    return (
      <span className="text-xs text-secondary-muted italic">Location TBD</span>
    );
  }

  // Si viene el objeto completo: "Estadio (Córdoba)". Si solo viene ciudad: "Córdoba"
  const displayPath = name && city ? `${name} (${city})` : city || name;

  return (
    <div
      className={`flex items-center gap-2 transition-colors duration-200 text-xs ${
        isClickable
          ? "cursor-pointer hover:text-primary text-accent font-semibold"
          : "text-secondary-description font-medium"
      }`}
    >
      {/* Selector de Iconografía centralizado */}
      {useEmoji ? (
        <span className="opacity-70 text-sm shrink-0" aria-hidden="true">
          📍
        </span>
      ) : (
        <svg
          className={`w-3.5 h-3.5 flex-shrink-0 ${isClickable ? "text-primary" : "text-secondary-muted"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      )}

      <span className="truncate" title={displayPath}>
        {displayPath}
      </span>
    </div>
  );
};

VenueInfo.propTypes = {
  venue: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
  }),
  isClickable: PropTypes.bool,
  useEmoji: PropTypes.bool,
};

VenueInfo.defaultProps = {
  venue: null,
  isClickable: false,
  useEmoji: false,
};

export default VenueInfo;
