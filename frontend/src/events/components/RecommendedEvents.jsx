/**
 * @file RecommendedEvents.jsx
 * @description Presentational list sub-renderer that displays recommended events with thumbnails constrained on the right side.
 * Designed to cleanly stream data entries within layout parent containers like headers or sidebar wrappers.
 * @module components/events/RecommendedEvents
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import EventDate from "shared/components/UI/EventDate";
import VenueInfo from "shared/components/UI/VenueInfo";
import EventThumbnail from "shared/components/UI/EventThumbnail";

/**
 * @typedef {Object} RecommendedEventVenue
 * @property {string} [city] - Metropolitan region location boundary.
 */

/**
 * @typedef {Object} RecommendedEvent
 * @property {string|number} id - Unique target primary domain identifier of the event.
 * @property {string} title - Explicit display name of the event asset.
 * @property {string} date - Temporal ISO operational schedule string.
 * @property {string} [image] - Remote asset raw image path string signature.
 * @property {RecommendedEventVenue} [venue] - Geographic venue spatial compound entity.
 */

/**
 * @typedef {Object} RecommendedEventsI18n
 * @property {string} link - Localized screen-reader accessible text for navigation action accessibility enhancements.
 */

/**
 * @typedef {Object} RecommendedEventsProps
 * @property {RecommendedEvent[]} events - Collection of event payloads to be rendered as recommendations.
 * @property {RecommendedEventsI18n} i18n - Structured localization dictionary payload.
 */

/**
 * RecommendedEvents Presentational Component.
 *
 * A lean user interface element responsible for rendering a list of recommended events.
 * It enforces strict visual alignment, keeping textual context on the left and thumbnails on the right,
 * ensuring layout stability across adaptive layout containers.
 *
 * @component
 * @category Components/Events
 * @param {RecommendedEventsProps} props - Component property payloads.
 * @returns {React.JSX.Element} The rendered recommended events list tree structure.
 */
const RecommendedEvents = ({ events, i18n }) => {
  return (
    <div className="space-y-3">
      {events.map((event) => (
        <Link
          key={event.id}
          to={`/events/${event.id}`}
          className="block group"
          aria-label={`${i18n.link} ${event.title}`}
        >
          <article className="bg-surface-subcard p-4 rounded-xl shadow-sm border border-secondary-border group-hover:border-primary group-hover:shadow-md transition-all duration-300 flex items-center justify-start gap-3 w-full">
            {/* Text content container on the left with max-width restriction to handle large displays */}
            <div className="flex-1 min-w-0 max-w-[70%] sm:max-w-[75%] space-y-1.5">
              <h3 className="text-md font-semibold text-secondary-subtitle group-hover:text-primary transition-colors line-clamp-2 operational-title">
                {event.title}
              </h3>
              <div className="space-y-1">
                <EventDate date={event.date} />
                <VenueInfo
                  venue={{ city: event.venue?.city }}
                  useEmoji={true}
                />
              </div>
            </div>
            {/* Event thumbnail placed consistently on the right side */}
            <EventThumbnail src={event.image} alt={event.title} size="md" />
          </article>
        </Link>
      ))}
    </div>
  );
};

RecommendedEvents.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      image: PropTypes.string,
      venue: PropTypes.shape({
        city: PropTypes.string,
      }),
    })
  ).isRequired,
  i18n: PropTypes.shape({
    link: PropTypes.string.isRequired,
  }).isRequired,
};

RecommendedEvents.defaultProps = {
  events: [],
};

export default RecommendedEvents;
