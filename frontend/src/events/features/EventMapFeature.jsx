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
import InteractiveMap from "../../shared/components/UI/InteractiveMap";
import VenueInfo from "../components/VenueInfo";
import { getExternalMapUrl } from "../utils/mapHelpers";

/**
 * EventMapFeature Component.
 *
 * Orchestrates rendering boundaries for embedded geolocation components. Consumes deep coordinate variables
 * defensively to block fatal layout rendering crashes when data streams are partial or missing.
 *
 * @component
 * @category Features/Events
 * @param {Object} props - The component properties.
 * @param {Object} props.venue - Core geographic and building infrastructure structure.
 * @param {string} props.venue.name - Operational display identifier label representing the physical venue site.
 * @param {string} props.venue.city - City territory where the event is structurally scheduled.
 * @param {number} props.venue.lat - Spatial floating point parameter representing latitude.
 * @param {number} props.venue.lng - Spatial floating point parameter representing longitude.
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
    <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {t("eventMapFeature.location")}
          </h3>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            {t("eventMapFeature.poweredBy")}
          </p>
        </div>

        {/* The "Bridge" to External Map Engine Navigation */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm"
        >
          {t("eventMapFeature.getDirections")}
        </a>
      </header>

      {/* Real Map Canvas Viewport Container */}
      <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-100 relative group">
        <InteractiveMap lat={venue.lat} lng={venue.lng} title={venue.name} />

        {/* Subtle hover overlay guidance tooltips */}
        <div className="absolute top-2 right-2 z-[400] opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-500 shadow-sm border">
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
