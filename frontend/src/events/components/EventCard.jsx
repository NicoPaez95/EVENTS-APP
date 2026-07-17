/**
 * @file EventCard.jsx
 * @description Presentational component for displaying a summarized event card with defensive UI image handling.
 * Integrates atomic UI components for consistent typography, branding, spacing, and bookmark isolation.
 * Completely decoupled from global side-effects, relying entirely on layout injection handlers and internationalization payloads.
 * @module components/events/EventCard
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import VenueInfo from "../../shared/components/UI/VenueInfo";
import ActionLink from "shared/components/UI/ActionLink";
import EventDate from "shared/components/UI/EventDate";
import BookmarkButton from "shared/components/UI/BookmarkButton";
import PrimaryButton from "shared/components/UI/PrimaryButton";
import { resolveEventImage } from "../utils/eventFallbackMapper";

/**
 * @typedef {Object} EventVenue
 * @property {string} name - Architectural moniker or venue name hosting the activity.
 * @property {string} city - Metropolitan region location boundary.
 */

/**
 * @typedef {Object} EventCardI18n
 * @property {string} directPurchase - Localized label text assigned to the primary express checkout button.
 * @property {string} viewDetails - Localized anchor text targeting the granular details layout view.
 * @property {string} addtocart - Localized text for the default state of the shopping cart action.
 * @property {string} addedtocart - Localized confirmation text when the item matches shopping cart presence.
 */

/**
 * @typedef {Object} EventCardProps
 * @property {string|number} id - Unique target primary domain identifier of the event.
 * @property {string} title - Explicit display name of the event asset.
 * @property {string} date - Temporal ISO operational schedule string.
 * @property {EventVenue} venue - Geographic venue spatial compound entity.
 * @property {string} category - Classification taxonomy label.
 * @property {number} [price=0] - Direct commercial entry fee fetched from persistence layers.
 * @property {string} [image] - Remote asset raw image path string signature.
 * @property {boolean} isSaved - Evaluated reactive state flag matching user bookmarks catalog.
 * @property {boolean} isInCart - Evaluated reactive state flag verifying presence within the shopping cart.
 * @property {boolean} [showRemoveButton=false] - Operational toggle switch to display alternative removal elements.
 * @property {Function} [onToggleSave] - Cross-domain handler callback used to toggle bookmark state persistence.
 * @property {Function} [onCartToggle] - Business mutation callback dispatched to handle additions or removals from the shopping cart.
 * @property {Function} [onDirectPurchase] - Interceptor hook dispatched when triggering immediate express checkout workflow.
 * @property {Function} [onDetailNavigate] - Clean layout callback used to route browser location to an exclusive details view.
 * @property {EventCardI18n} i18n - Structured localization dictionary payload delegated down from the parent orchestration layer.
 */

/**
 * EventCard Presentational Component.
 *
 * A stateless, pure user interface element responsible for rendering a summarized preview tile of an event experience.
 * Consumes pre-localized properties to ensure separation of concerns between layout rendering and runtime i18n context state.
 * Refactored action layout using vertical stacking to ensure structural integrity across desktop and laptop viewports.
 *
 * @component
 * @category Components/Events
 * @param {EventCardProps} props - Component property payloads.
 * @returns {React.JSX.Element} The presentational event summary tile markup tree structure.
 */
const EventCard = ({
  id,
  title,
  date,
  venue,
  category,
  price = 0,
  image,
  isSaved,
  isInCart,
  showRemoveButton = false,
  onToggleSave,
  onCartToggle,
  onDirectPurchase,
  onDetailNavigate,
  i18n,
}) => {
  const resolvedImage = resolveEventImage(category, image);

  const eventPayload = {
    id,
    title,
    price,
    image: resolvedImage,
    category,
    venue,
    date,
  };

  return (
    <article className="group relative bg-surface border border-secondary-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <BookmarkButton
        isSaved={isSaved}
        showRemoveButton={showRemoveButton}
        onClick={() => onToggleSave && onToggleSave(id)}
        className="absolute top-3 right-3 z-10 scale-90"
      />

      <div
        onClick={() => onDetailNavigate && onDetailNavigate(id)}
        className="relative w-full aspect-video bg-surface-subcard overflow-hidden cursor-pointer"
      >
        <img
          src={resolvedImage}
          alt={`Visual highlight for ${title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent-muted px-2 py-1 rounded-md">
              {category}
            </span>
            <span className="text-sm font-bold text-secondary-title font-display">
              ${price.toLocaleString()}
            </span>
          </div>

          <Link
            to={`/events/${id}`}
            className="block group-hover:text-primary transition-colors"
          >
            <h3 className="font-bold text-lg text-secondary-title leading-tight line-clamp-2">
              {title}
            </h3>
          </Link>

          <div className="space-y-2 pt-1">
            <EventDate date={date} />
            <VenueInfo venue={venue} isClickable={false} />
          </div>
        </div>
      </div>

      <footer className="px-5 pb-5 pt-4 border-t border-secondary-border flex flex-col space-y-3 mt-auto">
        <div className="flex flex-col gap-2 w-full">
          <PrimaryButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onDirectPurchase) onDirectPurchase(eventPayload);
            }}
            className="w-full text-xs py-3 px-4 rounded-xl tracking-wide shadow-sm text-center justify-center"
          >
            {i18n?.directPurchase}
          </PrimaryButton>

          <button
            type="button"
            onClick={() => onCartToggle && onCartToggle(eventPayload)}
            aria-label={
              isInCart
                ? "Remove experience from cart"
                : "Add experience to cart"
            }
            className={`w-full py-3 px-4 rounded-xl border transition-all duration-300 text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 select-none ${
              isInCart
                ? "bg-success/10 border-success/30 text-success shadow-sm animate-in fade-in zoom-in-95 duration-200"
                : "bg-surface-subcard border-secondary-border text-secondary-description hover:bg-surface-disabled"
            }`}
          >
            {isInCart ? (
              <>
                <svg
                  className="w-3.5 h-3.5 stroke-[3] shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span>{i18n?.addedtocart}</span>
              </>
            ) : (
              <>
                <span className="text-sm mr-1">🛒</span>
                <span>{i18n?.addtocart}</span>
              </>
            )}
          </button>
        </div>

        <div className="text-center pt-1">
          <ActionLink to={`/events/${id}`}>{i18n?.viewDetails}</ActionLink>
        </div>
      </footer>
    </article>
  );
};

EventCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  venue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number,
  image: PropTypes.string,
  isSaved: PropTypes.bool.isRequired,
  isInCart: PropTypes.bool.isRequired,
  showRemoveButton: PropTypes.bool,
  onToggleSave: PropTypes.func,
  onCartToggle: PropTypes.func,
  onDirectPurchase: PropTypes.func,
  onDetailNavigate: PropTypes.func,
  i18n: PropTypes.shape({
    directPurchase: PropTypes.string.isRequired,
    viewDetails: PropTypes.string.isRequired,
    addtocart: PropTypes.string.isRequired,
    addedtocart: PropTypes.string.isRequired,
  }).isRequired,
};

EventCard.defaultProps = {
  price: 0,
  image: null,
  showRemoveButton: false,
  onToggleSave: null,
  onCartToggle: null,
  onDirectPurchase: null,
  onDetailNavigate: null,
};

export default EventCard;
