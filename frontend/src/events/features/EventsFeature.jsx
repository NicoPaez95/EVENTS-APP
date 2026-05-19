/**
 * @file EventsFeature.jsx
 * @description Master domain orchestration component for the event discovery layout.
 * Acts as a Clean Architecture Smart Controller, resolving domain hook dependencies,
 * managing network error boundaries, and coordinating pure presentational components.
 * @module features/events/EventsFeature
 * @author Nico Paez
 */

import React from "react";
import { useEvents } from "../hooks/useEvents";
import EventsHeader from "../components/EventsHeader";
import EventGrid from "../components/EventGrid";
import EmptyState from "shared/components/UI/EmptyState";
import useToggleEventSave from "../../user/hooks/useToggleEventSave";

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
 * @returns {JSX.Element} A declarative orchestrator layout displaying structural content states.
 */
const EventsFeature = () => {
  /**
   * Destructured global event states and management utilities from domain context hook.
   * @type {{ events: EventEntity[], loading: boolean, error: Object|null, clearFilters: function }}
   */
  const { events, loading, error, clearFilters } = useEvents();

  /**
   * Destructured bookmark interaction handlers from user preference synchronization hook.
   * @type {{ onToggleSave: function(string|number): void, isEventSaved: function(string|number): boolean }}
   */
  const { onToggleSave, isEventSaved } = useToggleEventSave();

  /**
   * 1. Infrastructure Critical Failure Guard.
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
   * 2. Actionable Empty State Guard.
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

  /* 3. Domain Orchestration Core: Declarative pipeline structure compiling clean presentational sub-components */
  return (
    <section
      aria-label="Event Results"
      className="animate-in fade-in duration-500"
    >
      {/* Dynamic Header Composition */}
      <EventsHeader isLoading={loading} />

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
