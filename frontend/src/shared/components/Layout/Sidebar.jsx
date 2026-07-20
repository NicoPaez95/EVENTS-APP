/**
 * @file Sidebar.jsx
 * @description Composite structural orchestrator for the application's auxiliary layout panel.
 * Transforms autonomous features into a unified configuration matrix managed by an accordion UI.
 * @module components/shared/Sidebar
 * @author Nico Paez
 */

import React from "react";
import { useTranslation } from "react-i18next";
import WeatherFeature from "../../../events/features/WeatherFeature";
import UpcomingSidebarFeature from "../../../events/features/UpcomingSidebarFeature";
import RecommendedEventsFeature from "../../../events/features/RecommendedEventsFeature";
import SavedCalendarFeature from "../../../user/features/SavedCalendarFeature";
import SidebarAccordion from "../UI/SidebarAccordion";

/**
 * @typedef {Object} SidebarWidgetConfig
 * @property {string} id - Unique identifier used for DOM anchoring, tracking, and accordion state keys.
 * @property {string} title - The translated section headline or localized presentational string.
 * @property {React.JSX.Element} component - The self-sufficient feature orchestrator instance.
 */

/**
 * Sidebar Component.
 *
 * Structural layout layer that compiles a sequence of autonomous widgets into a cohesive
 * presentation configuration. It maps features to an accordion interface to clean up the
 * viewport space while keeping the data execution isolated within each feature domain.
 *
 * Architectural Note:
 * This component continues to leverage the "Self-Sufficient Feature" pattern. Rather than
 * managing layout lifecycles or drilling prop payloads directly, it compiles a decoupled
 * widget array configuration (`widgetsSetup`) and passes layout responsibility downstream.
 *
 * @component
 * @category Shared Components
 * @returns {React.JSX.Element} A structured UI orchestration layout utilizing SidebarAccordion.
 */
const Sidebar = () => {
  // Hook instance limited exclusively to layout-level vocabulary schemas, not business rules
  const { t } = useTranslation("shared");

  /**
   * Central layout definition tree containing explicit operational boundaries and i18n payloads.
   * @type {SidebarWidgetConfig[]}
   */
  const widgetsSetup = [
    {
      id: "sidebar-weather",
      title: t("sidebar.sections.weather", "Meteorología 🌤️"),
      component: <WeatherFeature />,
    },
    {
      id: "sidebar-upcoming",
      title: t("sidebar.sections.upcoming", "Próximas aventuras 📅"),
      component: <UpcomingSidebarFeature showHeader={true} />,
    },
    {
      id: "sidebar-recommended",
      title: t("sidebar.sections.recommended", "Te puede interesar 🔥"),
      component: <RecommendedEventsFeature showHeader={true} />,
    },
    {
      id: "sidebar-calendar",
      title: t("sidebar.sections.calendar", "Mi Calendario 📌"),
      component: <SavedCalendarFeature />,
    },
  ];

  return <SidebarAccordion widgets={widgetsSetup} />;
};

export default Sidebar;
