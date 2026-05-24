/**
 * @file TimeFilterNav.jsx
 * @description Presentational navigation bar rendering reusable time-window filter buttons.
 * Provides a standardized visual interface for switching granular temporal metrics.
 * @module shared/components/UI/TimeFilterNav
 * @author Nico Paez
 */

import React from "react";

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
 * @param {function(string): void} props.onFilterChange - Callback handler triggered when an active button selection event occurs.
 * @param {FilterButton[]} [props.customFilters] - Optional alternative array matrix to override default button configurations.
 * @returns {React.JSX.Element} A horizontal, responsive button group tailored for temporal data filtering pipelines.
 */
const TimeFilterNav = ({ activeFilter, onFilterChange, customFilters }) => {
  /**
   * Fallback configuration mapping collection for horizontal navigation buttons.
   * @type {FilterButton[]}
   */
  const defaultFilters = [
    { id: "24h", label: "Next 24 Hours" },
    { id: "7d", label: "This Week" },
    { id: "30d", label: "This Month" },
    { id: "all", label: "All" },
  ];

  const buttons = customFilters || defaultFilters;

  return (
    <nav className="flex flex-wrap gap-4" aria-label="Time filters">
      {buttons.map((btn) => (
        <button
          key={btn.id}
          type="button"
          onClick={() => onFilterChange(btn.id)}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${
            activeFilter === btn.id
              ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105"
              : "bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600"
          }`}
        >
          {btn.label}
        </button>
      ))}
    </nav>
  );
};

export default TimeFilterNav;
