/**
 * @file SavedEventsListFeature.jsx
 * @description Orchestrates the "My Saved Experiences" view. Handles mixed filtering
 * capabilities through calendar days (URL queries) and reusable proximity buttons.
 * @module features/user/SavedEventsListFeature
 * @author Nico Paez
 */

import React, { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEvents } from "../../events/hooks/useEvents";
import { useUser } from "../context/UserContext";
import EventCard from "../../events/components/EventCard";
import TimeFilterNav from "../../shared/components/UI/TimeFilterNav";
import { filterByIds, filterByDate } from "events/utils/filterEvents";
import { filterEventsByTime } from "events/utils/eventHelpers";
import PageHeader from "shared/components/UI/PageHeader";
import EmptyState from "shared/components/UI/EmptyState";
import { useTranslation } from "react-i18next";
import { formatDynamicTitle } from "user/utils/formatDynamicTitle";
import EventCardSkeleton from "../../shared/components/UI/EventCardSkeleton";

/**
 * SavedEventsListFeature Component.
 *
 * Coordinates user-specific bookmarked events, integrating localized pluralization bindings
 * and decoupling stateful side-effects from structural view nodes.
 *
 * @component
 * @category Features/User
 * @returns {React.JSX.Element} Populated event cards matching standard or strict calendar parameters.
 */
const SavedEventsListFeature = () => {
  const { events, loading } = useEvents();
  const { savedIds, isSaved, toggleSavedEvent } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation("events");

  const navigate = useNavigate();

  /**
   * Internal Time Filter State.
   * @type {string} Defaults to 'all' because the calendar or generic list acts as the core hub here.
   */
  const [timeFilter, setTimeFilter] = useState("all");

  /**
   * Captures the query state modified by the calendar feature.
   * @type {string|null} Clean YYYY-MM-DD literal from URL parameters or null if idle.
   */
  const dateFilter = searchParams.get("date");

  /**
   * Dispatches and updates the active macro time scope window.
   * Purges active micro calendar parameters from URL state to prevent unexpected filter intersections.
   *
   * @param {string} filterId - Target time filter scope designation (e.g., 'dia', 'semana', 'mes', 'all').
   * @returns {void}
   */
  const handleTimeFilterChange = (filterId) => {
    setTimeFilter(filterId);
    if (searchParams.has("date")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("date");
      setSearchParams(newParams);
    }
  };

  /**
   * Combined Pipeline Data Filtering Stage.
   * Memoizes collection changes across cascading filters:
   * 1. Bookmarked explicit IDs mapping.
   * 2. URL single-day constraint enforcement.
   * 3. Macro window timeline bounds.
   *
   * @type {Array<Object>}
   */
  const displayList = useMemo(() => {
    // Stage 1: Filter full catalog against user personal bookmarks
    let list = filterByIds(events, savedIds);

    // Stage 2: Apply calendar strict single-day constraint if present
    if (dateFilter) {
      return filterByDate(list, dateFilter);
    }

    // Stage 3: Apply standard upcoming time-window scopes if calendar is idle
    if (timeFilter !== "all") {
      list = filterEventsByTime(list, timeFilter);
    }

    return list;
  }, [events, savedIds, dateFilter, timeFilter]);

  if (loading) {
    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="status"
        aria-label={t("savedEventsListFeature.loading")}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <EventCardSkeleton key={`saved-skeleton-${i}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 
        Dynamic Header: Adapts based on active URL filters or selected time scope.
        Updated border to map semantic design tokens.
      */}
      <header className="border-b border-secondary-border/50 pb-6 space-y-6">
        {/* Integrated Reusable Title with Pluralized Event Count Context */}
        <PageHeader
          title={
            dateFilter
              ? formatDynamicTitle(dateFilter)
              : t("savedEventsListFeature.mySaved")
          }
          description={t("savedEventsListFeature.event", {
            count: displayList.length,
          })}
        />

        {/* Integrated Reusable Time Filters Navigation */}
        <div className="pt-2">
          <TimeFilterNav
            activeFilter={dateFilter ? "" : timeFilter}
            onFilterChange={handleTimeFilterChange}
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
      </header>

      {/* Main Results Grid Section */}
      {displayList.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {displayList.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              isSaved={isSaved(event.id)}
              onToggleSave={toggleSavedEvent}
              showRemoveButton={true}
              i18n={{
                directPurchase: t("events.eventCard.buy"),
                viewDetails: t("events.eventCard.viewDetails"),
              }}
            />
          ))}
        </div>
      ) : (
        /* Empty State Handler */
        <EmptyState
          title={t("savedEventsListFeature.emptyState.title")}
          description={t("savedEventsListFeature.emptyState.description")}
          actionLabel={t("savedEventsListFeature.emptyState.actionLabel")}
          onAction={() => navigate("/")}
        />
      )}
    </div>
  );
};

export default SavedEventsListFeature;
