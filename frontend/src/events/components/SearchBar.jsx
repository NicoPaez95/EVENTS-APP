/**
 * @file SearchBar.jsx
 * @description Intelligent multi-input navigation search bar component.
 * Orchestrates autocomplete query parameters across title, category, and location domains
 * utilizing unified UI atomic design wrappers. Handles click-away document bindings to dismiss lists.
 * @module components/events/SearchBar
 * @author Nico Paez
 */

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useAutocomplete } from "../hooks/useAutocomplete";
import PrimaryButton from "shared/components/UI/PrimaryButton";
import PrimaryInput from "shared/components/UI/PrimaryInput";

/**
 * SearchBar Presentational Component.
 *
 * Coordinates state extraction hooks with granular user filtering configurations. Drops explicit
 * descriptive typography labels to maximize inline horizontal density on widescreen display viewports.
 *
 * @component
 * @category Components/Events
 * @param {Object} props - Component property payloads.
 * @param {function(Object, boolean): void} props.onSearch - Global submit callback pipeline method.
 * @param {function(string): (Promise<Array<Object>>|Array<Object>)} props.getTitleSuggestions - Title data provider.
 * @param {function(string): (Promise<Array<string>>|Array<string>)} props.getCategorySuggestions - Category data provider.
 * @param {function(string): (Promise<Array<string>>|Array<string>)} props.getLocationSuggestions - Location data provider.
 * @param {React.RefObject<HTMLInputElement>} [props.inputRef] - Externalized DOM reference instance for core focus.
 * @param {Object} props.i18n - Explicit translation contract providing interface labeling.
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
  const { values, suggestions, handleChange, selectSuggestion } =
    useAutocomplete();

  /**
   * Local toggle state to manage programmatic rendering visibility of the autocomplete dropdown overlays.
   * Prevents persistent overlays when focus is moved or explicit document click-away occurs.
   */
  const [activeDropdown, setActiveDropdown] = useState(null);

  /**
   * Anchor DOM container boundary references used to isolate inside component clicks from root closures.
   */
  const searchBarContainerRef = useRef(null);

  /**
   * Effect: Auto-dismiss click tracking and keyboard escape accessibility handlers.
   */
  useEffect(() => {
    const handleDocumentInteraction = (event) => {
      // If the target element clicked lies inside our form structure, skip processing
      if (
        searchBarContainerRef.current &&
        searchBarContainerRef.current.contains(event.target)
      ) {
        return;
      }
      setActiveDropdown(null);
    };

    const handleKeyboardEscape = (event) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleDocumentInteraction);
    document.addEventListener("keydown", handleKeyboardEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentInteraction);
      document.removeEventListener("keydown", handleKeyboardEscape);
    };
  }, []);

  /**
   * Intercepts individual select operations from list suggestions to programmatically synchronize state keys.
   * Fires an immediate search dispatch event to optimize user query responsiveness.
   *
   * @param {string} field - Domain target property identifier key inside the local value collection.
   * @param {string} value - Selected text sequence parameter applied as the replacement payload.
   */
  const handleSelect = (field, value) => {
    selectSuggestion(field, value);
    setActiveDropdown(null); // Instantly drop visibility upon selection
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
    setActiveDropdown(null);
    onSearch(values, true);
  };

  return (
    <form
      ref={searchBarContainerRef}
      onSubmit={handleSubmit}
      className="w-full bg-surface shadow-lg p-5 flex flex-wrap items-center gap-4 rounded-2xl border border-secondary-border"
    >
      {/* --- Global/Title Search Section --- */}
      <div className="relative flex-1 min-w-[250px]">
        <PrimaryInput
          inputRef={inputRef}
          type="text"
          placeholder={i18n.placeholder.whatLook}
          value={values.searchTerm}
          onFocus={() => setActiveDropdown("searchTerm")}
          onChange={(e) => {
            setActiveDropdown("searchTerm");
            handleChange("searchTerm", e.target.value, getTitleSuggestions);
          }}
        />
        {activeDropdown === "searchTerm" && suggestions.titles?.length > 0 && (
          <ul className="absolute z-50 w-full bg-surface border border-secondary-border shadow-xl mt-2 rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-1">
            {suggestions.titles.map((event) => (
              <li
                key={event.id}
                onClick={() => handleSelect("searchTerm", event.title)}
                className="p-3 hover:bg-primary/10 hover:text-primary-hover cursor-pointer transition-colors text-secondary-description text-sm border-b border-secondary-border last:border-none"
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
          onFocus={() => setActiveDropdown("category")}
          onChange={(e) => {
            setActiveDropdown("category");
            handleChange("category", e.target.value, getCategorySuggestions);
          }}
        />
        {activeDropdown === "category" &&
          suggestions.categories?.length > 0 && (
            <ul className="absolute z-50 w-full bg-surface border border-secondary-border shadow-xl mt-2 rounded-xl overflow-hidden">
              {suggestions.categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => handleSelect("category", cat)}
                  className="p-3 hover:bg-primary/10 hover:text-primary-hover cursor-pointer transition-colors text-secondary-description text-sm border-b border-secondary-border last:border-none"
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
          onFocus={() => setActiveDropdown("location")}
          onChange={(e) => {
            setActiveDropdown("location");
            handleChange("location", e.target.value, getLocationSuggestions);
          }}
        />
        {activeDropdown === "location" && suggestions.locations?.length > 0 && (
          <ul className="absolute z-50 w-full bg-surface border border-secondary-border shadow-xl mt-2 rounded-xl overflow-hidden">
            {suggestions.locations.map((loc) => (
              <li
                key={loc}
                onClick={() => handleSelect("location", loc)}
                className="p-3 hover:bg-primary/10 hover:text-primary-hover cursor-pointer transition-colors text-secondary-description text-sm border-b border-secondary-border last:border-none"
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
          className="cursor-pointer text-secondary-description"
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
