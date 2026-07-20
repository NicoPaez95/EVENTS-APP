/**
 * @file WeatherFeature.jsx
 * @description Smart container component for the meteorological domain.
 * Orchestrates external weather state integration, manages async lifecycle layouts (loading, errors),
 * and dynamically translates weather condition tokens via structural localization keys.
 * @module features/events/components/WeatherFeature
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useWeather } from "../../shared/hooks/useWeather";
import WeatherWidget from "../components/WeatherWidget";

/**
 * WeatherFeature Component.
 *
 * Acts as a Smart Component (Orchestrator) for the weather domain view model.
 * Directs defensive fallbacks if asynchronous micro-services or endpoint broadcasts collapse.
 *
 * @component
 * @category Features/Events
 * @param {Object} props - Component properties.
 * @param {string} [props.location="Cordoba,AR"] - The targeted structural city lookup string used for weather telemetry.
 * @returns {React.JSX.Element} The active interactive weather rendering lifecycle tree.
 */
const WeatherFeature = ({ location }) => {
  const { weather, loading, error } = useWeather(location);
  const { t } = useTranslation("events");

  // --- Asynchronous Conditional Render Lifecycle Boundaries ---

  if (loading) {
    // Retains Skeleton UI to prevent CLS and maintain widget structure,
    // updated to semantic design tokens.
    return (
      <div className="p-5 bg-surface rounded-2xl border border-secondary-border animate-pulse flex flex-col gap-2 h-32 justify-center">
        <div className="h-4 w-24 bg-secondary-border/50 rounded" />
        <div className="h-8 w-16 bg-secondary-border/50 rounded" />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="p-4 border border-dashed border-secondary-border rounded-2xl text-center">
        <p className="text-xs text-secondary-muted italic">
          {t("WeatherFeature.weatherUnavailable")}
        </p>
      </div>
    );
  }

  /**
   * Evaluates operational dictionary files dynamically using token streams.
   * Leverages structural defaults to prevent breaking layouts if conditions are unmatched.
   */
  const translatedCondition = t(
    `WeatherFeature.weatherWidget.weatherConditions.${weather.condition}`,
    { defaultValue: weather.condition }
  );

  return <WeatherWidget {...weather} condition={translatedCondition} />;
};

WeatherFeature.propTypes = {
  location: PropTypes.string,
};

WeatherFeature.defaultProps = {
  location: "Cordoba,AR",
};

export default WeatherFeature;
