/**
 * @file EventMapFeature.jsx
 * @description Domain-level orchestrator component responsible for managing the geospatial layout state.
 * Bridges real-time interactive mapping layers with external mapping redirection engines while integrating multi-language labels.
 * @module features/events/components/EventMapFeature
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import InteractiveMap from "shared/components/UI/InteractiveMap";
import VenueInfo from "shared/components/UI/VenueInfo";
import { getExternalMapUrl } from "../utils/mapHelpers";

/**
 * @typedef {Object} EventMapVenue
 * @property {string} name - Operational display identifier label representing the physical venue site.
 * @property {string} [city] - City territory where the event is structurally scheduled.
 * @property {number} lat - Spatial floating point parameter representing latitude.
 * @property {number} lng - Spatial floating point parameter representing longitude.
 */

/**
 * @typedef {Object} EventMapFeatureProps
 * @property {EventMapVenue} [venue] - Core geographic and building infrastructure structure.
 */

/**
 * EventMapFeature Component.
 *
 * Orchestrates rendering boundaries for embedded geolocation components. Consumes deep coordinate variables
 * defensively to block fatal layout rendering crashes when data streams are partial or missing.
 *
 * Architectural Strategy:
 * - Resource Synchronization: Integrates the unbundled, shared `VenueInfo` atom directly to avoid
 *   local context state duplication.
 *
 * @component
 * @category Features/Events
 * @param {EventMapFeatureProps} props - Component property payloads.
 * @returns {React.JSX.Element|null} The interactive map feature node layout, or null if coordinates breach validation.
 */
const EventMapFeature = ({ venue }) => {
  const { t } = useTranslation("events");

  // Security verification: Early defensive exit to protect the canvas engine
  if (!venue || !venue.lat || !venue.lng) return null;

  /**
   * Generates a structural, fully-qualified absolute external tracking URL pointing to global navigation hubs.
   */
  const googleMapsUrl = getExternalMapUrl(venue.lat, venue.lng, venue.name);

  return (
    <section className="bg-surface p-6 rounded-3xl border border-secondary-border shadow-sm">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-secondary-title">
            {t("eventMapFeature.location")}
          </h3>
          <p className="text-[10px] text-secondary-muted uppercase tracking-widest font-bold">
            {t("eventMapFeature.poweredBy")}
          </p>
        </div>

        {/* The "Bridge" to External Map Engine Navigation */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent-muted text-accent px-4 py-2 rounded-xl text-xs font-bold hover:bg-accent-hover hover:text-inverse transition-all shadow-sm"
        >
          {t("eventMapFeature.getDirections")}
        </a>
      </header>

      {/* Real Map Canvas Viewport Container */}
      <div className="w-full h-64 rounded-2xl overflow-hidden border border-secondary-border relative group">
        <InteractiveMap lat={venue.lat} lng={venue.lng} title={venue.name} />

        {/* Subtle hover overlay guidance tooltips */}
        <div className="absolute top-2 right-2 z-[400] opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-inverse/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-secondary-muted shadow-sm border border-secondary-border">
            {t("eventMapFeature.useForGps")}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <VenueInfo venue={venue} />
      </div>
    </section>
  );
};

EventMapFeature.propTypes = {
  venue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    city: PropTypes.string,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};

EventMapFeature.defaultProps = {
  venue: null,
};

export default EventMapFeature;
