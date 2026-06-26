/**
 * @file RecommendedEventsFeature.jsx
 * @description Feature orchestrator that manages recommendation data mapping and logic.
 * Decouples layout persistence from ambient runtime feed filters to ensure stable sidebar suggestions.
 * @module features/events/RecommendedEventsFeature
 * @author Nico Paez
 */

import React, { useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import RecommendedEvents from "../components/RecommendedEvents";
import { getRecommendedEvents } from "events/utils/filterEvents";
import PageHeader from "shared/components/UI/PageHeader";
import { useTranslation } from "react-i18next";

/**
 * RecommendedEventsFeature Component (Feature Orchestrator).
 *
 * A specialized "Smart Component" that serves as the data provider for the
 * recommendation engine domain.
 *
 * Architectural Strategy:
 * To maintain a consistent User Experience, this component consumes `allEvents`
 * (the master catalog) instead of the filtered `events` array. This decoupling
 * ensures that recommendations stay visible in the sidebar even when the user
 * applies restrictive search filters in the main view.
 *
 * @component
 * @category Features/Events
 * @returns {React.JSX.Element|null} The recommended events section or null if empty.
 */
const RecommendedEventsFeature = () => {
  /**
   * Global State Consumption.
   * Extracts the full master list from EventsContext.
   */
  const { allEvents } = useEvents();

  /**
   * Internationalization Hook scoped to the local events localization bundle workspace.
   * @type {Object}
   */
  const { t } = useTranslation("events");

  /**
   * Memoized Recommendation Logic.
   *
   * Processing Sequence:
   * 1. Invokes the `getRecommendedEvents` utility to filter by 'isRecommended' flag.
   * 2. Limits the output to 3 items to preserve sidebar layout integrity.
   * 3. Performance: Only re-computes if the master catalog structure changes.
   *
   * @type {Array<Object>}
   */
  const recommended = useMemo(() => {
    return getRecommendedEvents(allEvents, { limit: 3 });
  }, [allEvents]);

  /**
   * Defensive Rendering Guard.
   * Returns null to avoid rendering empty headers or containers if the
   * recommendation engine returns no matches.
   */
  if (recommended.length === 0) {
    return null;
  }

  return (
    <section
      className="w-full animate-in fade-in duration-700"
      aria-labelledby="recommended-title"
    >
      {/* Standardized Section Header linked via accessibility anchors */}
      <PageHeader
        id="recommended-title"
        title={t("recommendedEventsFeature.title")}
        level={3}
        className="mb-4 px-1"
      />

      {/* 
        Presentational Layer:
        Delegates the UI mapping and styling to the stateless 
        RecommendedEvents presentational component.
      */}
      <RecommendedEvents
        events={recommended}
        i18n={{
          title: t("recommendedEventsFeature.recommendedEvents.title"),
          link: t("recommendedEventsFeature.recommendedEvents.link"),
        }}
      />
    </section>
  );
};

export default RecommendedEventsFeature;
