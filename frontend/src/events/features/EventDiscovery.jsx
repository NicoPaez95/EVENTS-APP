import SearchBar from "../components/SearchBar";
import { useEvents } from "../hooks/useEvents";

/**
 * EventDiscovery Feature Component.
 * * This "Smart Component" orchestrates the event discovery experience by 
 * bridging the global EventsContext with the presentational SearchBar.
 * * It acts as a self-sufficient unit that encapsulates search intent logic, 
 * effectively eliminating prop drilling from parent pages (like Home) and 
 * ensuring the discovery interface is globally synchronized.
 * * @component
 * @category Features
 * @returns {JSX.Element} A composed feature section with an autonomous search interface.
 */
const EventDiscovery = () => {
  /**
   * Context Consumption:
   * Retrieves the global search handler and suggestion providers.
   * By consuming these directly from the context, the discovery feature 
   * remains consistent with the global event state (e.g., filtered results).
   */
  const { handleSearch, suggestions } = useEvents();

  return (
    <section 
      className="space-y-6" 
      aria-label="Event search and discovery"
    >
      {/* The SearchBar is a "Dumb Component" (Presentational Layer).
        It receives its logic and data providers from this Feature orchestrator, 
        maintaining a clean separation between UI state and domain logic.
      */}
      <SearchBar
        onSearch={handleSearch}
        getTitleSuggestions={suggestions.getTitle}
        getCategorySuggestions={suggestions.getCategory}
        getLocationSuggestions={suggestions.getLocation}
      />
      
      {/* Architectural Note: 
        Because this feature is autonomous, it can be relocated to a 
        dedicated "/search" page or a Modal without modifying its internal logic.
      */}
    </section>
  );
};

export default EventDiscovery;