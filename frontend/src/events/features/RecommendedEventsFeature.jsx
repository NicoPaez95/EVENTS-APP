/**
 * @file RecommendedEventsFeature.jsx
 * @description Feature orchestrator that manages recommendation data mapping and business logic filters.
 * Decouples layout state from active catalog queries to maintain persistent sidebar suggestions.
 * @module features/events/RecommendedEventsFeature
 * @author Nico Paez
 */

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useEvents } from "../hooks/useEvents";
import RecommendedEvents from "../components/RecommendedEvents";
import { getRecommendedEvents } from "events/utils/filterEvents";
import PageHeader from "shared/components/UI/PageHeader";
import { useTranslation } from "react-i18next";

/**
 * RecommendedEventsFeature Component (Feature Orchestrator).
 *
 * A specialized "Smart Component" acting as the data and business provider for the
 * recommendation engine subdomain.
 *
 * Architectural Strategy:
 * To maximize conversion and user experience, this orchestrator consumes the unfiltered
 * `allEvents` master collection instead of active view states. This boundaries design
 * guarantees recommendations remain visible in peripheral layouts even when users apply
 * destructive search criteria or restrictive category tags in the primary route viewport.
 *
 * @component
 * @category Features/Events
 * @param {Object} props - Component property payloads.
 * @param {boolean} [props.showHeader=true] - Toggles local header component rendering. Enforces false when hosted by compound accordion containers.
 * @returns {React.JSX.Element|null} The encapsulated recommendation stack or null if data collections are empty.
 */
const RecommendedEventsFeature = ({ showHeader = true }) => {
  const { allEvents } = useEvents();
  const { t } = useTranslation("events");

  /**
   * Memoized execution branch preventing expensive computation loops on global catalog mutations.
   * @type {Array<Object>}
   */
  const recommended = useMemo(() => {
    return getRecommendedEvents(allEvents, { limit: 3 });
  }, [allEvents]);

  if (recommended.length === 0) return null;

  return (
    <section className="w-full animate-in fade-in duration-700">
      {/* 
        Conditional Presentation Boundary:
        Renders standalone headers if mounted directly into isolated structural views.
        Bypasses local rendering inside accordion panels to prevent heading duplications.
      */}
      {showHeader && (
        <PageHeader
          id="recommended-title"
          title={t("recommendedEventsFeature.title")}
          level={3}
          textColor="text-accent"
          className="mb-4 px-1"
        />
      )}

      <RecommendedEvents
        events={recommended}
        i18n={{
          link: t("recommendedEventsFeature.recommendedEvents.link"),
        }}
      />
    </section>
  );
};

RecommendedEvents.propTypes = {
  showHeader: PropTypes.bool,
};

export default RecommendedEventsFeature;
