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
    return (
      <div className="p-5 bg-slate-100 rounded-2xl animate-pulse flex flex-col gap-2 h-32 justify-center">
        <div className="h-4 w-24 bg-slate-200 rounded" />
        <div className="h-8 w-16 bg-slate-200 rounded" />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="p-4 border border-dashed border-slate-200 rounded-2xl text-center">
        <p className="text-xs text-slate-400 italic">
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
