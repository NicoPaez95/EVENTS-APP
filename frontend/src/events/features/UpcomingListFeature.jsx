/**
 * @file UpcomingListFeature.jsx
 * @description Feature orchestrator component that manages the "Upcoming Experiences" view.
 * Coordinates time-based proximity filters with global bookmark persistence synchronization hooks.
 * Automatically delegates decoupled i18n localization contexts to structural child components.
 * @module features/events/UpcomingListFeature
 * @author Nico Paez
 */

import React, { useState, useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import EventGrid from "../components/EventGrid";
import { filterEventsByTime } from "events/utils/eventHelpers";
import TimeFilterNav from "../../shared/components/UI/TimeFilterNav";
import useToggleEventSave from "user/hooks/useToggleEventSave";
import PageHeader from "shared/components/UI/PageHeader";
import { useTranslation } from "react-i18next";

/**
 * UpcomingListFeature Component.
 *
 * This smart orchestrator provides a time-window filtering boundary layer, managing state transitions
 * between user session curation states and real-time chronological data structures.
 * It encapsulates namespace-isolated translations and injects structured dictionary payloads into presentation layers.
 *
 * @component
 * @category Features/Events
 * @returns {React.JSX.Element} Composed chronological discovery shell containing localized time filters and a populated results grid.
 */
const UpcomingListFeature = () => {
  /**
   * User Session Bookmarking Hook.
   * Pulls structural cross-domain handler states to toggle user bookmarks and intercept active selection ids.
   */
  const { onToggleSave, isEventSaved } = useToggleEventSave();

  /**
   * Global Catalog State Consumption.
   * Extract historical core event metadata collection registries and active runtime data hydration flags.
   */
  const { events, loading } = useEvents();

  /**
   * Internal Time Filter State.
   * Tracks the currently active structural temporal window scope query parameter.
   * @type {'24h' | '7d' | '30d' | 'all'}
   */
  const [timeFilter, setTimeFilter] = useState("7d");

  /**
   * Date Pipeline Filtering Logic (Memoized).
   * Prevents expensive iterative parsing re-filtering execution workflows during unrelated parent triggers.
   */
  const filteredEvents = useMemo(() => {
    return filterEventsByTime(events, timeFilter);
  }, [events, timeFilter]);

  /**
   * Global i18next Translation Instance.
   * Pulls the reactive localization hook scoped exclusively to the "events" namespace.
   */
  const { t } = useTranslation("events");

  /**
   * Hydration Guard.
   * Renders visual scan feedback metrics while the main async catalog records are being populated.
   */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg font-medium text-secondary animate-pulse">
          {t("savedEventsListFeature.loading")}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8 animate-in fade-in duration-500">
      {/* Feature Header & Filter Controls */}
      <div className="space-y-6">
        <PageHeader title={t("upcomingListFeature.pageHeader")} level={2} />

        <TimeFilterNav
          activeFilter={timeFilter}
          onFilterChange={setTimeFilter}
          i18n={{
            timeFilterNav: {
              dia: t("timeFilterNav.dia"),
              semana: t("timeFilterNav.semana"),
              mes: t("timeFilterNav.mes"),
              all: t("timeFilterNav.all"),
            },
          }}
        />
      </div>

      {/* Results Section: Presentational Layer */}
      <section aria-label="Filtered Events Grid">
        {filteredEvents.length > 0 ? (
          <EventGrid
            events={filteredEvents}
            onToggleSave={onToggleSave}
            isEventSaved={isEventSaved}
            i18n={{
              directPurchase: t("events.eventCard.buy"),
              viewDetails: t("events.eventCard.viewDetails"),
            }}
          />
        ) : (
          /* Empty State Handler for filtered results adjusted to modern token palette */
          <div className="text-center py-20 bg-surface rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center px-4">
            <p className="text-secondary text-lg max-w-md font-medium">
              {t("upcomingListFeature.notFound")}
            </p>
            <button
              type="button"
              onClick={() => setTimeFilter("all")}
              className="mt-6 text-sm font-bold px-5 py-2.5 rounded-full border border-slate-200 
                         text-primary hover:border-primary bg-white shadow-sm transition-all duration-200 
                         active:scale-95 tracking-wide"
            >
              {t("upcomingListFeature.showAll")}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default UpcomingListFeature;
