import { useAutocomplete } from "../hooks/useAutocomplete";

/**
 * Navigation-style Search Bar component.
 * * Provides a multi-input filtering system with real-time autocomplete 
 * for event titles, categories, and locations.
 * * It operates as a controlled component, delegating suggestion logic 
 * to external providers and emitting the final filter state on submit.
 * * @component
 * @param {Object} props - Component properties.
 * @param {Function} props.onSearch - Callback triggered on form submission. Receives { values }.
 * @param {Function} props.getTitleSuggestions - Provider function for title autocomplete.
 * @param {Function} props.getCategorySuggestions - Provider function for category autocomplete.
 * @param {Function} props.getLocationSuggestions - Provider function for location autocomplete.
 * @returns {JSX.Element} A search form with multiple input fields and suggestion overlays.
 */
const SearchBar = ({
  onSearch,
  getTitleSuggestions,
  getCategorySuggestions,
  getLocationSuggestions
}) => {

  const { values, suggestions, handleChange, selectSuggestion } = useAutocomplete();

  /**
   * Handles the form submission and passes the current filter state to the parent.
   * @param {{import("react").FormEvent} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ values });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white shadow-md p-4 flex items-center gap-4">
      
      {/* Search Input: Handles free text and title suggestions */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Buscar eventos..."
          value={values.searchTerm}
          onChange={(e) => handleChange("searchTerm", e.target.value, getTitleSuggestions)}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
        />
        {suggestions.titles.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border shadow-lg rounded-b-md mt-1">
            {suggestions.titles.map((event) => (
              <li 
                key={event.id} 
                onClick={() => selectSuggestion("searchTerm", event.title)}
                className="p-2 hover:bg-blue-50 cursor-pointer transition-colors"
              >
                {event.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Category Input: Dynamic filtering by event type */}
      <div className="relative">
        <input
          type="text"
          placeholder="Categoría"
          value={values.category}
          onChange={(e) => handleChange("category", e.target.value, getCategorySuggestions)}
          className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
        />
        {suggestions.categories.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border shadow-lg rounded-b-md mt-1">
            {suggestions.categories.map((cat) => (
              <li 
                key={cat} 
                onClick={() => selectSuggestion("category", cat)}
                className="p-2 hover:bg-blue-50 cursor-pointer transition-colors"
              >
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>

      <input 
        type="date" 
        value={values.date} 
        onChange={(e) => handleChange("date", e.target.value)} 
        className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold transition-colors">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;