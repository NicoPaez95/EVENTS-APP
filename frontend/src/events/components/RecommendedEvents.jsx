/**
 * @file RecommendedEvents.jsx
 * @description Presentational component that renders a curated vertical list of event previews.
 * Designed specifically for application sidebars, utilizing atomic UI components to maintain
 * design language consistency across the platform.
 * @module components/events/RecommendedEvents
 * @author Nico Paez
 */

import { Link } from "react-router-dom";
import EventDate from "shared/components/UI/EventDate";
import EventLocation from "shared/components/UI/EventLocation";

/**
 * RecommendedEvents Presentational Component.
 *
 * Maps over a provided collection of event data models to display a clean,
 * stacked layout of navigable preview cards optimized for secondary content areas.
 *
 * @component
 * @category Components/Events
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.events - A collection of structured event entities to be rendered.
 * @param {string|number} props.events[].id - Unique identifier for the event.
 * @param {string} props.events[].title - Headline or title text of the event.
 * @param {string} props.events[].date - Scheduled timestamp or formatted date string.
 * @param {Object} [props.events[].venue] - Spatial context data structure for the event location.
 * @param {string} [props.events[].venue.city] - The specific city name where the venue is located.
 * @returns {JSX.Element} A themed sidebar container holding a stack of event links.
 */
const RecommendedEvents = ({ events }) => {
  return (
    <section
      className="bg-sky-50 p-5 rounded-2xl shadow-sm border border-slate-200"
      aria-labelledby="recommended-heading"
    >
      <h2
        id="recommended-heading"
        className="text-lg font-bold text-slate-800 mb-4 px-1"
      >
        Recommended Events
      </h2>

      <div className="space-y-3">
        {events.map((event) => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="block group"
            aria-label={`View details for ${event.title}`}
          >
            <article className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 group-hover:border-blue-400 group-hover:shadow-md transition-all duration-300">
              <h3 className="text-md font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
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

export default RecommendedEvents;
