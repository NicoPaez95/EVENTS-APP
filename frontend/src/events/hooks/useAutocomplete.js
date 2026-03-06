import { useState } from "react";

/**
 * @typedef {Object} AutocompleteValues
 * @property {string} searchTerm - The main text search input.
 * @property {string} category - Selected or typed category filter.
 * @property {string} location - Selected or typed location filter.
 * @property {string} date - Selected date filter.
 */

/**
 * @typedef {Object} AutocompleteSuggestions
 * @property {Array<Object>} titles - List of event objects matching the search term.
 * @property {string[]} categories - List of category names matching the input.
 * @property {string[]} locations - List of location names matching the input.
 */

/**
 * Custom Hook for managing multi-field autocomplete logic.
 * * It handles the state for multiple search inputs and their respective 
 * suggestion lists, providing unified handlers for changes and selection.
 * * @hook
 * @param {Object} [suggestionsHandlers] - Optional handlers for specialized suggestion logic.
 * @returns {{
 * values: AutocompleteValues,
 * suggestions: AutocompleteSuggestions,
 * handleChange: function(string, string, function=): void,
 * selectSuggestion: function(string, string): void,
 * setValues: function
 * }} The autocomplete state and controller functions.
 */
export const useAutocomplete = (suggestionsHandlers) => {
  const [values, setValues] = useState({
    searchTerm: "",
    category: "",
    location: "",
    date: ""
  });

  const [suggestions, setSuggestions] = useState({
    titles: [],
    categories: [],
    locations: []
  });

  /**
   * Updates a specific field value and fetches suggestions if a provider is present.
   * @param {string} field - The key in the values object (e.g., 'searchTerm').
   * @param {string} value - The new string value from the input.
   * @param {function} [getSuggestionsFn] - Function that returns filtered results.
   */
  const handleChange = (field, value, getSuggestionsFn) => {
    // Update input value
    setValues((prev) => ({ ...prev, [field]: value }));

    // Trigger suggestion update if provider exists
    if (getSuggestionsFn) {
      const results = getSuggestionsFn(value);
      const suggestionsField = 
        field === "searchTerm" ? "titles" : 
        field === "category" ? "categories" : "locations";
      
      setSuggestions((prev) => ({ ...prev, [suggestionsField]: results }));
    }
  };

  /**
   * Sets a specific field value and clears all active suggestion lists.
   * @param {string} field - The field to update.
   * @param {string} value - The selected suggestion text.
   */
  const selectSuggestion = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear suggestions upon selection to close dropdowns
    setSuggestions({ titles: [], categories: [], locations: [] });
  };

  return {
    values,
    suggestions,
    handleChange,
    selectSuggestion,
    setValues
  };
};