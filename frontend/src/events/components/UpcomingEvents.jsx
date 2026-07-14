/**
 * @file UpcomingEvents.jsx
 * @description Presentational component that renders a compact list of upcoming events.
 * Tailored for secondary layouts such as sidebars, utilizing the EventDate atom for
 * typographic consistency and ActionLink for explicit route navigation.
 * @module components/events/UpcomingEvents
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ActionLink from "shared/components/UI/ActionLink";
import EventDate from "shared/components/UI/EventDate";

/**
 * @typedef {Object} UpcomingEventsI18n
 * @property {string} actionLink - Localized label text displayed within the bottom ActionLink element.
 * @property {string} link - Localized accessibility prefix context for screen reader announcements.
 */

/**
 * @typedef {Object} UpcomingEventEntity
 * @property {string|number} id - Unique entity identifier matching standard schema definitions.
 * @property {string} title - The primary textual banner or headline designation of the event.
 * @property {string} date - Scheduled calendar timestamp or formatted date string representation.
 */

/**
 * UpcomingEvents Presentational Component.
 *
 * Slices the incoming collection to enforce a maximum display layout constraints,
 * ensuring high visual efficiency within space-restricted container bounds.
 *
 * @component
 * @category Components/Events
 * @param {Object} props - Component properties.
 * @param {Array<UpcomingEventEntity>} props.events - A collection of future event entities to be previewed.
 * @param {UpcomingEventsI18n} props.i18n - Explicit internationalization language contract definitions.
 * @returns {React.JSX.Element} A stylized card wrapping a localized collection list.
 */
const UpcomingEvents = ({ events, i18n }) => {
  return (
    <div className="bg-secondary-light rounded-2xl p-5 shadow-sm border border-secondary-border">
      <ul className="space-y-3 text-sm" role="list">
        {events.slice(0, 3).map((event) => (
          <li
            key={event.id}
            className="transition-transform duration-200 hover:translate-x-1"
          >
            <Link
              to={`/events/${event.id}`}
              className="group block"
              aria-label={`${i18n.link} ${event.title}`}
            >
              <span className="font-semibold text-primary group-hover:text-accent transition-colors">
                {event.title}
              </span>

              <EventDate date={event.date} className="mt-0.5 italic" />
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
    })
  ).isRequired,
  i18n: PropTypes.shape({
    actionLink: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpcomingEvents;
