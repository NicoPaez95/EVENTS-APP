import { useAutocomplete } from "../hooks/useAutocomplete";
import PrimaryButton from "shared/components/UI/PrimaryButton";

/**
 * Intelligent Navigation Search Bar.
 * * A reusable UI component that manages a multi-input search interface and local
 * autocomplete state. It follows the "Dumb Component" pattern, staying decoupled
 * from the global EventsContext by communicating strictly via props with its parent Feature.
 * * @component
 * @category Components
 * @param {Object} props - Component properties.
 * @param {Function} props.onSearch - Callback to trigger the global filtering logic in the Context.
 * @param {Function} props.getTitleSuggestions - Provider for event title autocomplete results.
 * @param {Function} props.getCategorySuggestions - Provider for category-specific suggestions.
 * @param {Function} props.getLocationSuggestions - Provider for location-based suggestions.
 * @returns {JSX.Element} A styled, responsive search form with real-time feedback.
 */
const SearchBar = ({
  onSearch,
  getTitleSuggestions,
  getCategorySuggestions,
  getLocationSuggestions,
}) => {
  /**
   * Internal Autocomplete Logic:
   * Values: Current local state of all inputs.
   * Suggestions: Filtered lists for titles, categories, and locations.
   */
  const { values, suggestions, handleChange, selectSuggestion } =
    useAutocomplete();

  /**
   * Synchronizes autocomplete selection with the global search state.
   * Updates the local hook state and immediately notifies the parent Feature.
   * * @param {string} field - The field identifier (searchTerm, category, location, or date).
   * @param {string} value - The chosen suggestion or input value.
   */
  const handleSelect = (field, value) => {
    selectSuggestion(field, value);
    const updatedValues = { ...values, [field]: value };
    onSearch(updatedValues);
  };

  /**
   * Form Submission Handler:
   * Prevents default browser behavior and executes search with all current local values.
   * * @param {React.FormEvent} e - The form submission event.
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
        <input
          type="text"
          placeholder="What are you looking for?"
          value={values.searchTerm}
          onChange={(e) =>
            handleChange("searchTerm", e.target.value, getTitleSuggestions)
          }
          className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
        <input
          type="text"
          placeholder="Category"
          value={values.category}
          onChange={(e) =>
            handleChange("category", e.target.value, getCategorySuggestions)
          }
          className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500 transition-all"
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
        <input
          type="text"
          placeholder="Location"
          value={values.location}
          onChange={(e) =>
            handleChange("location", e.target.value, getLocationSuggestions)
          }
          className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500 transition-all"
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
      <input
        type="date"
        value={values.date}
        onChange={(e) => handleSelect("date", e.target.value)}
        className="border border-slate-200 p-3 rounded-xl outline-none cursor-pointer hover:bg-slate-50 transition-colors text-slate-600"
      />

      <PrimaryButton
        type="submit"
        fullWidth={false}
        className="px-10" // Sobreescribimos solo el padding lateral
      >
        Search
      </PrimaryButton>
    </form>
  );
};

export default SearchBar;
