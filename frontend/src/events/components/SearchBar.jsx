/**
 * @file SearchBar.jsx
 * @description Intelligent multi-input navigation search bar component.
 * Orchestrates autocomplete query parameters across title, category, and location domains
 * utilizing unified UI atomic design wrappers.
 * @module components/events/SearchBar
 * @author Nico Paez
 */

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
 * @param {Object} props - Component properties.
 * @param {function} props.onSearch - Global submit callback pipeline method. Receives the aggregated state object containing all active query inputs.
 * @param {function} props.getTitleSuggestions - Data fetching provider function resolved when modifying the core title string.
 * @param {function} props.getCategorySuggestions - Data fetching provider function resolved when modifying the category classification string.
 * @param {function} props.getLocationSuggestions - Data fetching provider function resolved when modifying the spatial query string.
 * @returns {JSX.Element} An interactive horizontal inline form encapsulating filters and autocomplete anchors.
 */
const SearchBar = ({
  onSearch,
  getTitleSuggestions,
  getCategorySuggestions,
  getLocationSuggestions,
}) => {
  /**
   * Destructured custom autocomplete utilities handling local debounce states and form arrays.
   * @type {{ values: Object, suggestions: Object, handleChange: function, selectSuggestion: function }}
   */
  const { values, suggestions, handleChange, selectSuggestion } =
    useAutocomplete();

  /**
   * Intercepts individual select operations from list suggestions to programmatically synchronization state keys.
   * Fires an immediate search dispatch event to optimize user query responsiveness.
   *
   * @param {string} field - Domain target property identifier key inside the local value collection (e.g., 'searchTerm', 'category').
   * @param {string} value - Selected text sequence parameter applied as the replacement payload.
   */
  const handleSelect = (field, value) => {
    selectSuggestion(field, value);
    const updatedValues = { ...values, [field]: value };
    onSearch(updatedValues);
  };

  /**
   * Default form execution wrapper preventing browser refresh loops.
   * Projects the current input states upward through the assigned primary callback pipeline.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Native React form submission event argument.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white shadow-lg p-5 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-100"
    >
      {/* --- Global/Title Search Section --- */}
      <div className="relative flex-1 min-w-[250px]">
        <PrimaryInput
          type="text"
          placeholder="What are you looking for?"
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
          placeholder="Category"
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
          placeholder="Location"
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
        Search
      </PrimaryButton>
    </form>
  );
};

export default SearchBar;
