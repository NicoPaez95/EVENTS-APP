import SearchBar from "../components/SearchBar";

/**
 * EventDiscovery Feature Component.
 * * Orchestrates the event discovery experience by composing the SearchBar 
 * and managing the flow of filter criteria.
 * * This component acts as a bridge between the user's search intent 
 * and the event filtering domain logic.
 * * @component
 * @param {Object} props - Component properties.
 * @param {Function} props.onSearch - Callback function that processes the final search filters.
 * @param {Function} props.getTitleSuggestions - Data provider for event title autocomplete.
 * @param {Function} props.getCategorySuggestions - Data provider for event category suggestions.
 * @param {Function} props.getLocationSuggestions - Data provider for event location suggestions.
 * @returns {JSX.Element} A composed feature section containing the search interface.
 */
const EventDiscovery = ({
  onSearch,
  getTitleSuggestions,
  getCategorySuggestions,
  getLocationSuggestions
}) => {

  return (
    <section className="space-y-6">
      {/* The SearchBar handles the user input and internal autocomplete state,
        then bubbles up the 'onSearch' event to this feature layer.
      */}
      <SearchBar
        onSearch={onSearch}
        getTitleSuggestions={getTitleSuggestions}
        getCategorySuggestions={getCategorySuggestions}
        getLocationSuggestions={getLocationSuggestions}
      />
      
      {/* Tip: In the future, you can add an EventGrid here to display 
        the filtered results immediately below the SearchBar.
      */}
    </section>
  );
};

export default EventDiscovery;