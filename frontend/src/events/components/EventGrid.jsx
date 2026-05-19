/**
 * @file EventGrid.jsx
 * @description Presentational layout component that renders a grid of event cards.
 * Manages the visual transition between loading skeleton matrices and active domain asset collections.
 * @module components/events/EventGrid
 * @author Nico Paez
 */

import React from "react";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";

/**
 * @typedef {Object} Event
 * @property {string|number} id - Unique identifier for the event.
 * @property {string} title - The display name of the event experience.
 * @property {string} category - Classification genre tag.
 * @property {string} date - ISO temporal date string tracking the event schedule.
 * @property {string} [location] - General geographical placement description string.
 * @property {Object} venue - Physical facility structure hosting the event.
 * @property {string} venue.name - Specific architectural name of the location.
 * @property {string} venue.city - Urban municipality boundary location.
 */

/**
 * @typedef {Object} EventGridProps
 * @property {Event[]} [events=[]] - Collection of dynamic domain event entities to iterate.
 * @property {boolean} [isLoading=false] - Operational infrastructure state flag enforcing skeleton mounting layers.
 * @property {function(string|number): void} onToggleSave - Pipeline handler tracking bookmark persistence mutations.
 * @property {function(string|number): boolean} [isEventSaved] - Structural selector evaluating active saved states.
 */

/**
 * EventGrid Presentational Component.
 *
 * Stateless grid layout system built using dynamic grid viewport matrices. Isolates rendering layout matching
 * from internal business logic dependencies.
 *
 * @component
 * @category Components/Events
 * @param {EventGridProps} props - Component property payloads.
 * @returns {JSX.Element} An accessible and organized grid viewport matching current system states.
 */
const EventGrid = ({
  events = [],
  isLoading = false,
  onToggleSave,
  isEventSaved,
}) => {
  /**
   * 1. Loading Structural State Guard
   * Renders a standardized sequence of 6 pulsing assets inside the layout grid.
   */
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        role="status"
        aria-label="Loading catalog content"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <EventCardSkeleton key={`catalog-skeleton-${index}`} />
        ))}
      </div>
    );
  }

  /* 2. Clean Core: Single responsibility layer dedicated to mapping resolved dynamic collection structures */
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      role="list"
      aria-label="Event catalog grid"
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          {...event}
          onToggleSave={onToggleSave}
          isSaved={isEventSaved ? isEventSaved(event.id) : false}
        />
      ))}
    </div>
  );
};

export default EventGrid;
