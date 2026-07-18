/**
 * @file EventGrid.jsx
 * @description Presentational layout component that renders a grid of event cards.
 * Manages the visual transition between loading skeleton matrices and active domain asset collections.
 * Delivers decoupled i18n translation objects down to individual presentational card nodes.
 * Supports fluid responsive scaling variations via custom column specifications and compactness variations.
 * @module components/events/EventGrid
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import EventCard from "./EventCard";
import EventCardSkeleton from "../../shared/components/UI/EventCardSkeleton";

/**
 * @typedef {Object} Venue
 * @property {string} name - Specific architectural name of the location.
 * @property {string} city - Urban municipality boundary location.
 */

/**
 * @typedef {Object} Event
 * @property {string|number} id - Unique identifier for the event.
 * @property {string} title - The display name of the event experience.
 * @property {string} category - Classification genre tag.
 * @property {string} date - ISO temporal date string tracking the event schedule.
 * @property {string} [location] - General geographical placement description string.
 * @property {Venue} venue - Physical facility structure hosting the event.
 */

/**
 * @typedef {Object} EventGridI18n
 * @property {string} directPurchase - Localized string for the direct buy action.
 * @property {string} viewDetails - Localized string for the detail navigation action.
 */

/**
 * @typedef {Object} EventGridProps
 * @property {Event[]} [events=[]] - Collection of dynamic domain event entities to iterate.
 * @property {boolean} [isLoading=false] - Operational infrastructure state flag enforcing skeleton mounting layers.
 * @property {string} [cols="lg:grid-cols-3"] - Custom responsive column utility string mapping layout configurations.
 * @property {Function} onToggleSave - Pipeline handler tracking bookmark preference persistence mutations.
 * @property {Function} [isEventSaved] - Structural selector evaluating active user saved states.
 * @property {Function} [onDirectPurchase] - Interceptor hook dispatched when triggering immediate express checkout flow.
 * @property {Function} isInCart - Domain evaluation function to verify if an asset identifier resides inside the cart state.
 * @property {Function} onCartToggle - Business mutation callback dispatched to handle additions or removals from the shopping cart.
 * @property {Function} onDetailNavigate - Clean layout callback used to route browser location to an exclusive details view.
 * @property {("default"|"compact")} [variant="default"] - Design configuration scheme determining grid cell distributions and spacing densities.
 * @property {EventGridI18n} i18n - Structured, decoupled localization dictionary keys required by child presentational components.
 */

/**
 * EventGrid Presentational Component.
 *
 * Stateless grid layout system built using dynamic grid viewport matrices. Isolates rendering layout matching
 * from internal business logic dependencies by serving as an intermediate passthrough boundary for localization data.
 *
 * @component
 * @category Components/Events
 * @param {EventGridProps} props - Component property payloads.
 * @returns {React.JSX.Element} An accessible and organized grid viewport matching current system states.
 */
const EventGrid = ({
  events = [],
  isLoading = false,
  cols = "lg:grid-cols-3",
  onToggleSave,
  isEventSaved,
  onDirectPurchase,
  isInCart,
  onCartToggle,
  onDetailNavigate,
  variant = "default",
  i18n,
}) => {
  const isCompact = variant === "compact";

  /**
   * 1. Loading Structural State Guard
   * Renders a standardized sequence of 6 pulsing assets inside the layout grid.
   */
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-4 w-full justify-center justify-items-center mx-auto max-w-7xl`}
        role="status"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <EventCardSkeleton key={`catalog-skeleton-${index}`} />
        ))}
      </div>
    );
  }

  /**
   * 2. Active State Grid Viewport Rendering
   * Uses items-start to neutralize the default vertical stretching behavior of CSS Grid/Flexbox layouts.
   * Leverages a dynamic gap strategy for the compact variant to cleanly distribute space if overflow exists.
   */
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${cols} ${
        isCompact ? "gap-x-8 gap-y-6" : "gap-4"
      } w-full justify-center justify-items-center items-start mx-auto max-w-7xl`}
      role="list"
      aria-label="Event catalog grid"
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          {...event}
          variant={variant}
          onToggleSave={onToggleSave}
          isSaved={isEventSaved ? isEventSaved(event.id) : false}
          isInCart={isInCart ? isInCart(event.id) : false}
          onCartToggle={onCartToggle}
          onDirectPurchase={onDirectPurchase}
          onDetailNavigate={onDetailNavigate}
          i18n={i18n}
        />
      ))}
    </div>
  );
};

EventGrid.propTypes = {
  events: PropTypes.array,
  isLoading: PropTypes.bool,
  cols: PropTypes.string,
  onToggleSave: PropTypes.func.isRequired,
  isEventSaved: PropTypes.func,
  onDirectPurchase: PropTypes.func,
  isInCart: PropTypes.func.isRequired,
  onCartToggle: PropTypes.func.isRequired,
  onDetailNavigate: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["default", "compact"]),
  i18n: PropTypes.shape({
    directPurchase: PropTypes.string.isRequired,
    viewDetails: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventGrid;
