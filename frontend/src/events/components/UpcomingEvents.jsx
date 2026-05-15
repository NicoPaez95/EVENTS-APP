/**
 * @file UpcomingEvents.jsx
 * @description Presentational component that renders a compact list of upcoming events.
 * Tailored for secondary layouts such as sidebars, utilizing the EventDate atom for
 * typographic consistency and ActionLink for explicit route navigation.
 * @module components/events/UpcomingEvents
 * @author Nico Paez
 */

import { Link } from "react-router-dom";
import ActionLink from "shared/components/UI/ActionLink";
import EventDate from "shared/components/UI/EventDate";

/**
 * UpcomingEvents Presentational Component.
 *
 * Slices the incoming collection to enforce a maximum display layout constraints,
 * ensuring high visual efficiency within space-restricted container bounds.
 *
 * @component
 * @category Components/Events
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.events - A collection of future event entities to be previewed.
 * @param {string|number} props.events[].id - Unique identifier for the event.
 * @param {string} props.events[].title - Headline or designation title text of the event.
 * @param {string} props.events[].date - Scheduled timestamp or formatted date string.
 * @returns {JSX.Element} A stylized card section wrapping a localized collection list.
 */
const UpcomingEvents = ({ events }) => {
  return (
    <section
      className="bg-blue-100 rounded-2xl p-5 shadow-sm border border-blue-200"
      aria-labelledby="upcoming-sidebar-title"
    >
      <h2
        id="upcoming-sidebar-title"
        className="text-lg font-bold mb-4 text-blue-900"
      >
        Upcoming Events
      </h2>

      <ul className="space-y-3 text-sm" role="list">
        {/* We display only the top 3 for maximum sidebar visual efficiency */}
        {events.slice(0, 3).map((event) => (
          <li
            key={event.id}
            className="transition-transform duration-200 hover:translate-x-1"
          >
            <Link
              to={`/events/${event.id}`}
              className="group block"
              aria-label={`View details for ${event.title}`}
            >
              <span className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                {event.title}
              </span>

              {/* Atomic component for date. 
                We pass "italic" via className to maintain the specific 
                sidebar style without breaking global consistency.
              */}
              <EventDate date={event.date} className="mt-0.5 italic" />
            </Link>
          </li>
        ))}
      </ul>

      {/* Standardized Action Link */}
      <ActionLink
        to="/events/upcoming"
        centered
        className="mt-5 pt-3 border-t border-blue-200"
      >
        View All Upcoming
      </ActionLink>
    </section>
  );
};

export default UpcomingEvents;
