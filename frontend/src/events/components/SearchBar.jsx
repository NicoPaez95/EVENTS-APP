/**
 * @file SearchBar.jsx
 * @description Intelligent multi-input navigation search bar component.
 * Orchestrates autocomplete query parameters across title, category, and location domains
 * utilizing unified UI atomic design wrappers.
 * @module components/events/SearchBar
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { useAutocomplete } from "../hooks/useAutocomplete";
import PrimaryButton from "shared/components/UI/PrimaryButton";
import PrimaryInput from "shared/components/UI/PrimaryInput";

/**
 * @typedef {Object} SearchFilters
 * @property {string} searchTerm - Active textual keywords matching titles, general descriptions, or location tags.
 * @property {string} category - Specific classification category criterion text.
 * @property {string} location - Target municipality boundary constraint value.
 * @property {string} date - Calendar temporal value tracking (YYYY-MM-DD).
 */

/**
 * @typedef {Object} SearchBarI18nPlaceholders
 * @property {string} whatLook - Localized prompt text for the primary query keywords input.
 * @property {string} category - Localized prompt text for the category category taxonomy input.
 * @property {string} location - Localized prompt text for spatial/geographical constraints input.
 */

/**
 * @typedef {Object} SearchBarI18n
 * @property {SearchBarI18nPlaceholders} placeholder - Nested localization text mapping for input prompts.
 * @property {string} buttonSearch - Localized action label applied to the primary submission button.
 */

/**
 * @typedef {Object} SearchBarProps
 * @property {function(SearchFilters, boolean): void} onSearch - Global submit callback pipeline method. Receives the aggregated state object alongside a strictness evaluation execution flag.
 * @property {function(string): (Promise<Array<Object>>|Array<Object>)} getTitleSuggestions - Data fetching provider function resolved when modifying the core title string.
 * @property {function(string): (Promise<Array<string>>|Array<string>)} getCategorySuggestions - Data fetching provider function resolved when modifying the category classification string.
 * @property {function(string): (Promise<Array<string>>|Array<string>)} getLocationSuggestions - Data fetching provider function resolved when modifying the spatial query string.
 * @property {React.RefObject<HTMLInputElement>} [inputRef] - Externalized DOM reference instance to allow programmatic focusing loops on the primary text track.
 * @property {SearchBarI18n} i18n - Explicit translation contract providing interface labeling.
 */

/**
 * SearchBar Presentational Component.
 *
 * Coordinates state extraction hooks with granular user filtering configurations. Drops explicit
 * descriptive typography labels to maximize inline horizontal density on widescreen display viewports.
 *
 * @component
 * @category Components/Events
 * @param {SearchBarProps} props - Component property payloads.
 * @returns {React.JSX.Element} An interactive horizontal inline form encapsulating filters and autocomplete anchors.
 */
const SearchBar = ({
  onSearch,
  getTitleSuggestions,
  getCategorySuggestions,
  getLocationSuggestions,
  inputRef,
  i18n,
}) => {
  /**
   * Destructured custom autocomplete utilities handling local debounce states and form arrays.
   * @type {Object}
   * @property {SearchFilters} values - Current state values for all filter tracking domains.
   * @property {Object} suggestions - Managed maps tracking matching string matrices or entity arrays.
   * @property {function(string, string, function): void} handleChange - Trigger bound to standard keystroke alterations.
   * @property {function(string, string): void} selectSuggestion - Direct selection override state updater.
   */
  const { values, suggestions, handleChange, selectSuggestion } =
    useAutocomplete();

  /**
   * Intercepts individual select operations from list suggestions to programmatically synchronize state keys.
   * Fires an immediate search dispatch event to optimize user query responsiveness.
   *
   * @param {string} field - Domain target property identifier key inside the local value collection (e.g., 'searchTerm', 'category').
   * @param {string} value - Selected text sequence parameter applied as the replacement payload.
   */
  const handleSelect = (field, value) => {
    selectSuggestion(field, value);
    const updatedValues = { ...values, [field]: value };
    onSearch(updatedValues, false);
  };

  /**
   * Default form execution wrapper preventing browser refresh loops.
   * Submits aggregate criteria to the upstream controller orchestrator.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Native React form submission event argument.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(values, true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white shadow-lg p-5 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-100"
    >
      {/* --- Global/Title Search Section --- */}
      <div className="relative flex-1 min-w-[250px]">
        <PrimaryInput
          inputRef={inputRef}
          type="text"
          placeholder={i18n.placeholder.whatLook}
          value={values.searchTerm}
          onChange={(e) =>
            handleChange("searchTerm", e.target.value, getTitleSuggestions)
          }
        />
        {suggestions.titles?.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border border-slate-100 shadow-xl mt-2 rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-1">
            {suggestions.titles.map((event) => (
              <li
                key={event.id}
                onClick={() => handleSelect("searchTerm", event.title)}
                className="p-3 hover:bg-blue-50 cursor-pointer transition-colors text-slate-700 text-sm border-b border-slate-50 last:border-none"
              >
                {event.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --- Category Filter Section --- */}
      <div className="relative min-w-[180px]">
        <PrimaryInput
          type="text"
          placeholder={i18n.placeholder.category}
          value={values.category}
          onChange={(e) =>
            handleChange("category", e.target.value, getCategorySuggestions)
          }
        />
        {suggestions.categories?.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border border-slate-100 shadow-xl mt-2 rounded-xl overflow-hidden">
            {suggestions.categories.map((cat) => (
              <li
                key={cat}
                onClick={() => handleSelect("category", cat)}
                className="p-3 hover:bg-blue-50 cursor-pointer transition-colors text-slate-700 text-sm"
              >
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --- Location Filter Section --- */}
      <div className="relative min-w-[180px]">
        <PrimaryInput
          type="text"
          placeholder={i18n.placeholder.location}
          value={values.location}
          onChange={(e) =>
            handleChange("location", e.target.value, getLocationSuggestions)
          }
        />
        {suggestions.locations?.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border border-slate-100 shadow-xl mt-2 rounded-xl overflow-hidden">
            {suggestions.locations.map((loc) => (
              <li
                key={loc}
                onClick={() => handleSelect("location", loc)}
                className="p-3 hover:bg-blue-50 cursor-pointer transition-colors text-slate-700 text-sm"
              >
                {loc}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --- Date Picker Section --- */}
      <div className="min-w-[160px]">
        <PrimaryInput
          type="date"
          value={values.date}
          onChange={(e) => handleSelect("date", e.target.value)}
          className="cursor-pointer text-slate-600"
        />
      </div>

      <PrimaryButton type="submit" fullWidth={false} className="px-10">
        {i18n.buttonSearch}
      </PrimaryButton>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  getTitleSuggestions: PropTypes.func.isRequired,
  getCategorySuggestions: PropTypes.func.isRequired,
  getLocationSuggestions: PropTypes.func.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  i18n: PropTypes.shape({
    placeholder: PropTypes.shape({
      whatLook: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    }).isRequired,
    buttonSearch: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchBar;
