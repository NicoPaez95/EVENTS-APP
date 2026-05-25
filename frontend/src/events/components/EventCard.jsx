/**
 * @file EventCard.jsx
 * @description Presentational component for displaying a summarized event card with defensive UI image handling.
 * Integrates atomic UI components for consistent typography, branding, spacing, and bookmark isolation.
 * @module components/events/EventCard
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import VenueInfo from "./VenueInfo";
import ActionLink from "shared/components/UI/ActionLink";
import EventDate from "shared/components/UI/EventDate";
import BookmarkButton from "shared/components/UI/BookmarkButton";
import { resolveEventImage } from "../utils/eventFallbackMapper";

/**
 * EventCard Presentational Component.
 *
 * Visualizes a clean, interactive summary layout for individual events. Accommodates
 * dynamic bookmarking states via isolated atomic components, lazy-loads images, and relies
 * on structural domain mappers to absorb missing asset payloads without polluting the view.
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
 * @param {function(string|number): void} [props.onToggleSave] - Callback triggered when modifying the core save state. Receives the event's ID.
 * @param {function(string|number): void} [props.onAction] - General-purpose secondary action handler execution hook. Receives the event's ID.
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
  // Fall back to a default visual category asset if remote image property returns missing or broken
  const resolvedImage = resolveEventImage(category, image);

  /**
   * Dispatches the local unique identifier up into parent container layers
   * to trigger underlying storage mutations or cross-cutting features.
   */
  const handleBookmarkClick = () => {
    if (onToggleSave) {
      onToggleSave(id);
    }
    if (onAction) {
      onAction(id);
    }
  };

  return (
    <article className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Save/Remove Action Button - Positioned compactly at top-right corner over the visual grid mesh */}
      <BookmarkButton
        isSaved={isSaved}
        showRemoveButton={showRemoveButton}
        onClick={handleBookmarkClick}
        className="absolute top-3 right-3 z-10 scale-90"
      />

      {/* Visual Resource Header Mesh */}
      <div className="relative w-full aspect-video bg-slate-50 overflow-hidden">
        <img
          src={resolvedImage}
          alt={`Visual highlight for ${title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      {/* BODY LINK: Encapsulates informational text items in isolation to prevent layout collision */}
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
            <EventDate date={date} />
            <VenueInfo venue={venue} isClickable={false} />
          </div>
        </div>
      </Link>

      {/* FOOTER CONTAINER: Rendered adjacently to avoid nested interactive Link hierarchies */}
      <footer className="px-5 pb-5 pt-4 border-t border-slate-50 mt-auto">
        <ActionLink to={`/events/${id}`}>View Details</ActionLink>
      </footer>
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
