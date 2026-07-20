/**
 * @file UpcomingSidebarFeature.jsx
 * @description Feature orchestrator that manages data logic and slicing for upcoming sidebar previews.
 * Decouples layout persistence from ambient runtime feed filters to ensure stable navigation roadmaps.
 * @module features/events/UpcomingSidebarFeature
 * @author Nico Paez
 */

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useEvents } from "../hooks/useEvents";
import UpcomingEvents from "../components/UpcomingEvents";
import PageHeader from "shared/components/UI/PageHeader";
import { useTranslation } from "react-i18next";

/**
 * UpcomingSidebarFeature Component (Feature Orchestrator).
 *
 * A specialized "Smart Component" serving as the data manager for the upcoming events domain.
 *
 * Architectural Strategy:
 * Similar to the recommendations engine, this orchestrator slices data directly from the
 * master `allEvents` stream instead of the active filter mutations array. This isolation barrier
 * guarantees that upcoming structural summaries maintain chronological continuity in peripheral
 * widgets without being wiped out when users apply highly narrow search terms or category exclusions.
 *
 * @component
 * @category Features/Events
 * @param {Object} props - Component property payloads.
 * @param {boolean} [props.showHeader=true] - Structural flag to control polymorphic layout title boundaries. Bypassed inside accordions.
 * @returns {React.JSX.Element|null} The orchestrated sidebar section or null if no data exists.
 */
const UpcomingSidebarFeature = ({ showHeader = true }) => {
  const { allEvents } = useEvents();
  const { t } = useTranslation("events");

  /**
   * Memoized processing scope that slices the master collection to provide a top-5 preview array.
   * @type {Array<Object>}
   */
  const sidebarEvents = useMemo(() => {
    return allEvents?.slice(0, 5) || [];
  }, [allEvents]);

  if (sidebarEvents.length === 0) {
    return null;
  }

  return (
    <section
      className={`animate-in fade-in duration-700 ${showHeader ? "space-y-4" : ""}`}
      aria-labelledby="upcoming-sidebar-title"
    >
      {/* 
        Polymorphic Title Layout Boundary:
        Renders isolated PageHeader nodes if used as an independent widget view.
        Silences local headers inside sidebar accordions to avoid visual duplication.
      */}
      {showHeader && (
        <PageHeader
          id="upcoming-sidebar-title"
          title={t("upcomingSidebarFeature.title")}
          level={3}
          textColor="text-accent"
          className="px-1"
        />
      )}

      {/* Presentational layer containing strictly the collection list */}
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

UpcomingSidebarFeature.propTypes = {
  showHeader: PropTypes.bool,
};

export default UpcomingSidebarFeature;
