/**
 * @file RecommendedEvents.jsx
 * @description Presentational component that renders a curated vertical list of event previews.
 * Designed specifically for application sidebars, utilizing atomic UI components to maintain
 * design language consistency across the platform.
 * @module components/events/RecommendedEvents
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import EventDate from "shared/components/UI/EventDate";
import EventLocation from "shared/components/UI/EventLocation";

/**
 * @typedef {Object} RecommendedEventsI18n
 * @property {string} title - Localized main heading text for the recommended sidebar segment.
 * @property {string} link - Localized assistance description value utilized inside accessible contextual attributes.
 */

/**
 * @typedef {Object} RecommendedEventVenue
 * @property {string} [city] - The specific municipality or city location name where the venue rests.
 */

/**
 * @typedef {Object} RecommendedEventEntity
 * @property {string|number} id - Unique database record identifier for the target event.
 * @property {string} title - Primary headline or textual subject designation of the event.
 * @property {string} date - Structured ISO-8601 calendar timestamp string.
 * @property {RecommendedEventVenue} [venue] - Spatial geographical coordinates or data structure mapping options.
 */

/**
 * RecommendedEvents Presentational Component.
 *
 * Maps over a provided collection of event data models to display a clean,
 * stacked layout of navigable preview cards optimized for secondary content areas.
 *
 * @component
 * @category Components/Events
 * @param {Object} props - Component properties.
 * @param {Array<RecommendedEventEntity>} props.events - A collection of structured event entities to be rendered.
 * @param {RecommendedEventsI18n} props.i18n - Explicit localization contract encapsulating presentational textual content labels.
 * @returns {React.JSX.Element} A themed sidebar container holding a stack of event links.
 */
const RecommendedEvents = ({ events, i18n }) => {
  return (
    <section
      /* 
        Cambiamos bg-surface por bg-secondary-light para crear la "cuna" grisácea.
        Esto resalta las tarjetas blancas interiores y da un aspecto mucho más moderno y limpio.
      */
      className="bg-secondary-light p-5 rounded-2xl shadow-sm border border-secondary-border"
      aria-labelledby="recommended-heading"
    >
      <h2
        id="recommended-heading"
        className="text-lg font-bold text-primary mb-4 px-1"
      >
        {i18n.title}
      </h2>

      <div className="space-y-3">
        {events.map((event) => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="block group"
            aria-label={`${i18n.link} ${event.title}`}
          >
            {/* 
              - Mantenemos bg-surface para la tarjeta individual para que flote sobre el fondo grisáceo.
              - group-hover:border-accent suaviza el cambio de color de borde.
            */}
            <article className="bg-surface p-4 rounded-xl shadow-sm border border-secondary-border group-hover:border-accent group-hover:shadow-md transition-all duration-300">
              {/* 
                - Cambiamos group-hover:text-accent-light a group-hover:text-accent.
                Esto garantiza que siga siendo legible sobre la tarjeta blanca (bg-surface) al hacer hover.
              */}
              <h3 className="text-md font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2">
                {event.title}
              </h3>

              <div className="mt-2 space-y-1">
                {/* Using atomic components ensures that date and location 
                    look the same here as they do in EventCard or UpcomingEvents.
                */}
                <EventDate date={event.date} />

                <EventLocation city={event.venue?.city} />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

RecommendedEvents.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      venue: PropTypes.shape({
        city: PropTypes.string,
      }),
    })
  ).isRequired,
  i18n: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecommendedEvents;
