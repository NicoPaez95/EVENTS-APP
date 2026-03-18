import HomeLayout from "../../shared/components/Layout/HomeLayout";
import EventDiscovery from "../../events/features/EventDiscovery";
import FeaturedEvents from "../../events/features/FeaturedEvents";
import CategoryEvents from "../../events/features/CategoryEvents";
import Events from "../../events/features/Events";
import { useEvents } from "../../events/hooks/useEvents";

/**
 * Main Landing Page Component.
 * * * Acts as a composition layer that organizes the core features 
 * of the ticketing platform (Discovery, Featured, and Categories).
 * * It orchestrates the global event state by connecting the search 
 * and category selection logic with the event display grid.
 * * It provides the event data to the HomeLayout to ensure secondary 
 * features (like Sidebar recommendations) stay synchronized with the main catalog.
 * * @component
 * @category Pages
 * @returns {JSX.Element} The rendered landing page with orchestrated event features.
 */
const Home = () => {
  /**
   * Custom hook that encapsulates event business logic.
   * Includes state management, filtering, and suggestion providers.
   */
  const { 
    events, 
    handleSearch, 
    suggestions, 
    handleCategorySelect 
  } = useEvents();

  return (
    <HomeLayout events={events}>
      {/* EventDiscovery: Multi-input search interface with autocomplete support */}
      <EventDiscovery 
        onSearch={handleSearch}
        getTitleSuggestions={suggestions.getTitle}
        getCategorySuggestions={suggestions.getCategory}
        getLocationSuggestions={suggestions.getLocation} 
      />
      
      {/* FeaturedEvents: Curated list of high-priority or trending events */}
      <FeaturedEvents />

      {/* CategoryEvents: Interactive grid for rapid filtering by specific categories */}
      <CategoryEvents onCategoryClick={handleCategorySelect} />

      {/* Events: Result display area that renders the filtered event collection */}
      <Events events={events} />
    </HomeLayout>
  );
};

export default Home;