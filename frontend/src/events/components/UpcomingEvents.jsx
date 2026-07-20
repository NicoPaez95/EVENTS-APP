/**
 * @file UpcomingEvents.jsx
 * @description Presentational list sub-renderer that displays a compressed feed of upcoming events with thumbnails aligned to the left.
 * Stripped of fixed card wrappers to ensure seamless integration into adaptive container structures.
 * @module components/events/UpcomingEvents
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ActionLink from "shared/components/UI/ActionLink";
import EventDate from "shared/components/UI/EventDate";
import EventThumbnail from "shared/components/UI/EventThumbnail";

/**
 * @typedef {Object} UpcomingEvent
 * @property {string|number} id - Unique primary target identifier of the event entity.
 * @property {string} title - Display name or header string of the upcoming event asset.
 * @property {string} date - Temporal ISO operational schedule string.
 * @property {string} [image] - Remote asset raw image path string signature.
 */

/**
 * @typedef {Object} UpcomingEventsI18n
 * @property {string} actionLink - Localized label text for the section redirection link action.
 * @property {string} link - Localized screen-reader descriptive prefix for assistive navigation technologies.
 */

/**
 * @typedef {Object} UpcomingEventsProps
 * @property {UpcomingEvent[]} events - Collection of raw event datasets to filter and map.
 * @property {UpcomingEventsI18n} i18n - Structured localization dictionary payload.
 */

/**
 * UpcomingEvents Presentational Component.
 *
 * A pure user interface element responsible for slicing and rendering sequential feed nodes.
 * It intentionally discards padding, shadow boxes, and borders to remain entirely agnostic to
 * structural layout boundaries dictated by parent view matrices.
 *
 * @component
 * @category Components/Events
 * @param {UpcomingEventsProps} props - Component property payloads.
 * @returns {React.JSX.Element} The rendered upcoming events compressed layout tree structure.
 */
const UpcomingEvents = ({ events, i18n }) => {
  return (
    <div className="w-full">
      <ul className="space-y-3 text-sm" role="list">
        {events.slice(0, 3).map((event) => (
          <li
            key={event.id}
            className="transition-transform duration-200 hover:translate-x-1"
          >
            <Link
              to={`/events/${event.id}`}
              className="group flex items-center justify-start gap-3 p-1 rounded-xl hover:bg-secondary-light/30 transition-colors w-full"
              aria-label={`${i18n.link} ${event.title}`}
            >
              <EventThumbnail src={event.image} alt={event.title} size="md" />

              <div className="flex-1 min-w-0">
                <span className="block font-semibold text-secondary-subtitle group-hover:text-primary transition-colors truncate">
                  {event.title}
                </span>
                <EventDate date={event.date} className="mt-0.5" />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <ActionLink
        to="/events/upcoming"
        centered
        className="mt-5 pt-3 border-t border-secondary-border"
      >
        {i18n.actionLink}
      </ActionLink>
    </div>
  );
};

UpcomingEvents.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
  i18n: PropTypes.shape({
    actionLink: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpcomingEvents;
