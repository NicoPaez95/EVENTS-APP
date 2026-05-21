/**
 * @file EventCard.jsx
 * @description Presentational component for displaying a summarized event card with defensive UI image handling.
 * Integrates atomic UI components for consistent typography, branding, and spacing.
 * @module components/events/EventCard
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import VenueInfo from "./VenueInfo";
import ActionLink from "shared/components/UI/ActionLink";
import EventDate from "shared/components/UI/EventDate";
import { resolveEventImage } from "../utils/eventFallbackMapper";

/**
 * Static UI Icon representing a close or remove operation.
 * @type {React.JSX.Element}
 */
const CLOSE_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

/**
 * Functional component that generates a dynamic heart icon based on the active bookmark state.
 *
 * @param {boolean} isSaved - Indicates whether the event is currently bookmarked by the user.
 * @returns {React.JSX.Element} The rendered SVG icon with context-aware styles.
 */
const HEART_ICON = (isSaved) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={isSaved ? "currentColor" : "none"}
    stroke="currentColor"
    className={`w-5 h-5 transition-colors ${isSaved ? "text-red-500" : "text-slate-400"}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

/**
 * EventCard Presentational Component.
 *
 * Visualizes a clean, interactive summary layout for individual events. Accommodates
 * dynamic bookmarking states, lazy-loads images, and relies on structural domain mappers
 * to absorb missing asset payloads without polluting the view with side-effects.
 *
 * @component
 * @category Components
 * @param {Object} props - The component properties.
 * @param {string|number} props.id - Unique domain identifier from MongoDB.
 * @param {string} props.title - Explicit display name of the event asset.
 * @param {string} props.date - Temporal ISO operational schedule string.
 * @param {Object} props.venue - Spatial and structured information regarding the location.
 * @param {string} props.category - Classification or taxonomy label of the event.
 * @param {string} [props.image] - Remote image URL string provided asynchronously by MongoDB.
 * @param {boolean} props.isSaved - Toggle that specifies if the event is shortlisted.
 * @param {boolean} [props.showRemoveButton=false] - Optional switch to swap the heart button for a distinct removal style.
 * @param {function} [props.onToggleSave] - Callback triggered when modifying the core save state. Receives the event's ID.
 * @param {function} [props.onAction] - General-purpose secondary action handler execution hook. Receives the event's ID.
 * @returns {React.JSX.Element} A themed, responsive grid item representing an event entity.
 */
const EventCard = ({
  id,
  title,
  date,
  venue,
  category,
  image,
  isSaved,
  showRemoveButton = false,
  onToggleSave,
  onAction,
}) => {
  /**
   * Intercepts the interactive mouse events to cleanly isolate bubbling.
   * Dispatches specialized event context upward through declarative callbacks.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e - Native React mouse click event argument.
   */
  const handleAction = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onToggleSave) {
      onToggleSave(id);
    }

    if (onAction) {
      onAction(id);
    }
  };

  // Resolve the visual fallback asset based on its business domain taxonomy category
  const resolvedImage = resolveEventImage(category, image);

  return (
    <article className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Save/Remove Action Button */}
      <button
        onClick={handleAction}
        aria-label={showRemoveButton ? "Remove event" : "Save event"}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm shadow-sm hover:scale-110 transition-all
          ${showRemoveButton ? "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white" : "bg-white/80 text-slate-400 hover:text-red-500"}`}
      >
        {showRemoveButton ? CLOSE_ICON : HEART_ICON(isSaved)}
      </button>

      {/* Visual Resource Header Mesh */}
      <div className="relative w-full aspect-video bg-slate-50 overflow-hidden">
        <img
          src={resolvedImage}
          alt={`Visual highlight for ${title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      <Link
        to={`/events/${id}`}
        className="block p-5 flex-grow flex flex-col justify-between"
      >
        <div>
          <header>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md">
              {category}
            </span>
            <h3 className="font-bold text-lg mt-4 text-slate-800 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
              {title}
            </h3>
          </header>

          <div className="mt-4 space-y-3">
            {/* Reusable Date Atom */}
            <EventDate date={date} />
            <VenueInfo venue={venue} isClickable={false} />
          </div>
        </div>

        <footer className="mt-6 pt-4 border-t border-slate-50">
          <ActionLink to={`/events/${id}`}>View Details</ActionLink>
        </footer>
      </Link>
    </article>
  );
};

EventCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  venue: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string,
  isSaved: PropTypes.bool.isRequired,
  showRemoveButton: PropTypes.bool,
  onToggleSave: PropTypes.func,
  onAction: PropTypes.func,
};

export default EventCard;
