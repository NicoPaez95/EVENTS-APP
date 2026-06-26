/**
 * @file UpcomingSidebarFeature.jsx
 * @description Feature orchestrator that manages data logic and slicing for upcoming sidebar previews.
 * Decouples layout persistence from ambient runtime feed filters to ensure stable navigation roadmaps.
 * @module features/events/UpcomingSidebarFeature
 * @author Nico Paez
 */

import React, { useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import UpcomingEvents from "../components/UpcomingEvents";
import PageHeader from "shared/components/UI/PageHeader";
import { useTranslation } from "react-i18next";

/**
 * UpcomingSidebarFeature Component (Feature Orchestrator).
 *
 * A specialized "Smart Component" that serves as the data provider for the
 * chronological upcoming roadmap segment in the application sidebar.
 *
 * Architectural Strategy:
 * This feature specifically consumes `allEvents` (the master catalog) instead of
 * the filtered `events` array. This ensures that the sidebar remains persistent
 * and unaffected by user-applied search filters or category selections in the
 * main application view.
 *
 * @component
 * @category Features/Events
 * @returns {React.JSX.Element|null} The orchestrated sidebar section or null if no data exists.
 */
const UpcomingSidebarFeature = () => {
  /**
   * Global State Consumption.
   * Extracts the full master list from EventsContext to preserve structural visibility bounds.
   */
  const { allEvents } = useEvents();

  /**
   * Internationalization Hook scoped to the local events localization bundle workspace.
   * @type {Object}
   */
  const { t } = useTranslation("events");

  /**
   * Memoized Chronological Slicing Logic.
   *
   * Slices the master catalog to display the top 5 upcoming events.
   * Memoized to prevent re-calculations during unrelated parent re-renders.
   *
   * @type {Array<Object>}
   */
  const sidebarEvents = useMemo(() => {
    return allEvents?.slice(0, 5) || [];
  }, [allEvents]);

  /**
   * Defensive Rendering Guard.
   * Prevents rendering an empty section if the event catalog hasn't loaded
   * or is empty, maintaining a clean UI skeleton balance.
   */
  if (sidebarEvents.length === 0) {
    return null;
  }

  return (
    <section
      className="animate-in fade-in duration-700 space-y-4"
      aria-labelledby="upcoming-sidebar-title"
    >
      {/* Standardized Section Header aligned outside the presentation card */}
      <PageHeader
        id="upcoming-sidebar-title"
        title={t("upcomingSidebarFeature.title")}
        level={3}
        className="px-1"
      />

      {/* Presentational layer containing strictly the collection list card */}
      <UpcomingEvents
        events={sidebarEvents}
        i18n={{
          actionLink: t("upcomingSidebarFeature.upcomingEvents.actionLink"),
          link: t("upcomingSidebarFeature.upcomingEvents.link"),
        }}
      />
    </section>
  );
};

export default UpcomingSidebarFeature;
