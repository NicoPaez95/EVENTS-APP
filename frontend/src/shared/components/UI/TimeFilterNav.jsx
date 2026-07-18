/**
 * @file TimeFilterNav.jsx
 * @description Presentational navigation bar rendering reusable time-window filter buttons.
 * Provides a standardized visual interface for switching granular temporal metrics aligned with the design tokens.
 * @module shared/components/UI/TimeFilterNav
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} FilterButton
 * @property {string} id - Unique identifier for the filter window target state (e.g., '24h', '7d').
 * @property {string} label - The human-readable text string rendered inside the target button.
 */

/**
 * TimeFilterNav Component.
 *
 * A stateless presentational layout component that maps incoming temporal options into structured,
 * accessible interactive nodes, signaling selection states back to the supervising domain feature orchestrator.
 *
 * @component
 * @category Shared/UI
 * @param {Object} props - Component properties.
 * @param {string} props.activeFilter - The currently selected operational filter identification query flag.
 * @param {Function} props.onFilterChange - Callback handler triggered when an active button selection event occurs.
 * @param {FilterButton[]} [props.customFilters] - Optional alternative array matrix to override default button configurations.
 * @param {Object} props.i18n - Pre-localized string dictionary containing translations for the filter navigation labels.
 * @returns {React.JSX.Element} A horizontal, responsive button group tailored for temporal data filtering pipelines.
 */
const TimeFilterNav = ({
  activeFilter,
  onFilterChange,
  customFilters,
  i18n,
}) => {
  const defaultFilters = [
    { id: "24h", label: i18n?.timeFilterNav?.dia || "Today" },
    { id: "7d", label: i18n?.timeFilterNav?.semana || "This Week" },
    { id: "30d", label: i18n?.timeFilterNav?.mes || "This Month" },
    { id: "all", label: i18n?.timeFilterNav?.all || "All" },
  ];

  const buttons = customFilters || defaultFilters;

  return (
    <nav className="flex flex-wrap gap-4" aria-label="Time filters">
      {buttons.map((btn) => {
        const isActive = activeFilter === btn.id;

        return (
          <button
            key={btn.id}
            type="button"
            onClick={() => onFilterChange(btn.id)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 border ${
              isActive
                ? "bg-primary text-inverse border-primary shadow-lg shadow-primary/20 scale-105"
                : "bg-surface text-secondary border-secondary-border/20 hover:border-primary hover:text-primary"
            }`}
          >
            {btn.label}
          </button>
        );
      })}
    </nav>
  );
};

TimeFilterNav.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  customFilters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  i18n: PropTypes.shape({
    timeFilterNav: PropTypes.shape({
      dia: PropTypes.string,
      semana: PropTypes.string,
      mes: PropTypes.string,
      all: PropTypes.string,
    }),
  }).isRequired,
};

TimeFilterNav.defaultProps = {
  customFilters: null,
};

export default TimeFilterNav;
