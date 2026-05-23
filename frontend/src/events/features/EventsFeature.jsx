/**
 * @file EventsFeature.jsx
 * @description Master domain orchestration component for the event discovery layout.
 * Acts as a Clean Architecture Smart Controller, resolving domain hook dependencies,
 * managing network error boundaries, and coordinating pure presentational components.
 * Listens for systemic broadcast search signals to focus its layout grid automatically.
 * @module features/events/EventsFeature
 * @author Nico Paez
 */

import React from "react";
import { useEvents } from "../hooks/useEvents";
import EventsHeader from "../components/EventsHeader";
import EventGrid from "../components/EventGrid";
import EmptyState from "shared/components/UI/EmptyState";
import useToggleEventSave from "../../user/hooks/useToggleEventSave";
import { useScrollToSectionOnSearch } from "../hooks/useScrollToSectionOnSearch";

/**
 * @typedef {Object} EventVenue
 * @property {string} name - Architectural moniker or venue name hosting the activity.
 * @property {string} city - Metropolitan region location boundary.
 */

/**
 * @typedef {Object} EventEntity
 * @property {string|number} id - Unique domain identifier.
 * @property {string} title - Explicit display name of the event asset.
 * @property {string} category - Classification taxonomy label.
 * @property {string} date - Temporal ISO operational schedule string.
 * @property {EventVenue} venue - Geographic venue spatial compound entity.
 */

/**
 * EventsFeature Component.
 *
 * Coordinates data resolution states, network execution anomalies, and domain hooks
 * with modular presentation engines. Serves as a state-decoupled container layout.
 *
 * @component
 * @category Features/Events
 * @returns {React.JSX.Element} A declarative orchestrator layout displaying structural content states.
 */
const EventsFeature = () => {
  /**
   * Destructured global event states and management utilities from domain context hook.
   * @type {Object}
   * @property {EventEntity[]} events - Collection of parsed event domain entities.
   * @property {boolean} loading - Operational flag tracking active data resolution cycles.
   * @property {Object|null} error - Infrastructure error tracking metadata or instance reference.
   * @property {function(): void} clearFilters - Pipeline modifier callback to strip out query state boundaries.
   */
  const { events, loading, error, clearFilters } = useEvents();

  /**
   * Destructured bookmark interaction handlers from user preference synchronization hook.
   * @type {Object}
   * @property {function(string|number): void} onToggleSave - Triggers state modification for personal catalogs.
   * @property {function(string|number): boolean} isEventSaved - Conditional check reflecting personal persistence bounds.
   */
  const { onToggleSave, isEventSaved } = useToggleEventSave();

  /**
   * DOM Reference used to programmatically anchor viewport physics upon search execution.
   * @type {React.RefObject<HTMLElement>}
   */
  const gridContainerRef = useScrollToSectionOnSearch();

  /**
   * Broadcasts a global system event notifying that a focus request has been initiated
   * from the presentation header layer.
   *
   * @returns {void}
   */
  const handleSearchFocusTrigger = () => {
    const focusEvent = new CustomEvent("app:search-focus-requested");
    window.dispatchEvent(focusEvent);
  };

  /**
   * Infrastructure Critical Failure Guard.
   * Intercepts the rendering pipeline to provide immediate feedback if the remote server fails.
   */
  if (!loading && error) {
    return (
      <EmptyState
        title="Connection anomaly detected"
        description="Our premium content servers are temporarily unreachable. Please check your network connection or try reloading the platform."
        actionLabel="RETRY CONNECTION"
        onAction={() => window.location.reload()}
      />
    );
  }

  /**
   * Actionable Empty State Guard.
   * Intercepts flow at orchestration level to inject business-driven recovery callbacks when data returns empty but successful.
   */
  if (!loading && (!events || events.length === 0)) {
    return (
      <EmptyState
        title="No exact events found matching your criteria"
        description="We couldn't find any premium experiences for this specific selection. Clear your active filters to resume exploration."
        actionLabel="RESET CATALOG FILTERS"
        onAction={
          clearFilters ||
          (() =>
            console.warn("Missing clearFilters linking inside useEvents hook."))
        }
      />
    );
  }

  return (
    <section
      ref={gridContainerRef}
      aria-label="Event Results"
      className="animate-in fade-in duration-500 scroll-mt-10"
    >
      {/* Dynamic Header Composition */}
      <EventsHeader
        isLoading={loading}
        onSearchFocusRequested={handleSearchFocusTrigger}
      />

      {/* Event Grid Layout Execution Layer */}
      <EventGrid
        events={events}
        isLoading={loading}
        onToggleSave={onToggleSave}
        isEventSaved={isEventSaved}
      />
    </section>
  );
};

export default EventsFeature;
