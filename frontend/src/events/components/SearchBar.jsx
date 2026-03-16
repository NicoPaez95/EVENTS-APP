import { useAutocomplete } from "../hooks/useAutocomplete";
/**
 * Intelligent Navigation Search Bar.
 * Features a multi-input system with real-time autocomplete.
 * @param {object} props - Component properties.
 * @param {(data: object) => void} props.onSearch - Search callback.
 * @param {(term: string) => Promise<string[]>} props.getTitleSuggestions - Titles.
 * @param {(term: string) => Promise<string[]>} props.getCategorySuggestions - Categories.
 * @param {(term: string) => Promise<string[]>} props.getLocationSuggestions - Locations.
 * @returns {JSX.Element} A responsive search form.
 */
const SearchBar = ({
  onSearch,
  getTitleSuggestions,
  getCategorySuggestions,
  getLocationSuggestions
}) => {
  const { values, suggestions, handleChange, selectSuggestion } = useAutocomplete();

  /**
   * Synchronizes autocomplete selection with the parent's search state.
   * Ensures real-time results by creating a fresh state object for the callback.
   * @param {string} field - The values object key to update.
   * @param {string} value - The selected suggestion string.
   */
  const handleSelect = (field, value) => {
    selectSuggestion(field, value);
    const updatedValues = { ...values, [field]: value };
    onSearch(updatedValues);
  };

  /**
   * Prevents default form behavior and triggers search with current local state.
   * @param {import("react").FormEvent} e - Form event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(values);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full bg-white shadow-md p-4 flex flex-wrap items-center gap-4 rounded-lg"
    >
      {/* Global/Title Search */}
      <div className="relative flex-1 min-w-[200px]">
        <input
          type="text"
          placeholder="Search events, artists..."
          value={values.searchTerm}
          onChange={(e) => handleChange("searchTerm", e.target.value, getTitleSuggestions)}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
        />
        {suggestions.titles?.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border shadow-lg mt-1 rounded-b-md max-h-60 overflow-y-auto">
            {suggestions.titles.map((event) => (
              <li 
                key={event.id} 
                onClick={() => handleSelect("searchTerm", event.title)}
                className="p-2 hover:bg-blue-50 cursor-pointer transition-colors"
              >
                {event.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Category Filter */}
      <div className="relative min-w-[150px]">
        <input
          type="text"
          placeholder="Category"
          value={values.category}
          onChange={(e) => handleChange("category", e.target.value, getCategorySuggestions)}
          className="w-full border p-2 rounded outline-none"
        />
        {suggestions.categories?.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border shadow-lg mt-1 rounded-b-md">
            {suggestions.categories.map((cat) => (
              <li 
                key={cat} 
                onClick={() => handleSelect("category", cat)}
                className="p-2 hover:bg-blue-50 cursor-pointer transition-colors"
              >
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Location Filter */}
      <div className="relative min-w-[150px]">
        <input
          type="text"
          placeholder="Location (e.g. Córdoba)"
          value={values.location}
          onChange={(e) => handleChange("location", e.target.value, getLocationSuggestions)}
          className="w-full border p-2 rounded outline-none"
        />
        {suggestions.locations?.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border shadow-lg mt-1 rounded-b-md">
            {suggestions.locations.map((loc) => (
              <li 
                key={loc} 
                onClick={() => handleSelect("location", loc)}
                className="p-2 hover:bg-blue-50 cursor-pointer transition-colors"
              >
                {loc}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Date Picker */}
      <input 
        type="date" 
        value={values.date} 
        onChange={(e) => handleSelect("date", e.target.value)} 
        className="border p-2 rounded outline-none cursor-pointer hover:bg-gray-50 transition-colors"
      />

      <button 
        type="submit" 
        className="bg-blue-600 text-white px-8 py-2 rounded font-bold hover:bg-blue-700 transition-all shadow-sm"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;