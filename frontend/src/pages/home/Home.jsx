import HomeLayout from "../../shared/components/Layout/HomeLayout";
import EventDiscovery from "../../events/features/EventDiscovery";
import FeaturedEvents from "../../events/features/FeaturedEvents";
import CategoryEvents from "../../events/features/CategoryEvents";
import Events from "../../events/features/Events";
import { useEvents } from "../../events/hooks/useEvents";

/**
 * Main Landing Page Component.
 * * Acts as a composition layer that organizes the core features 
 * of the ticketing platform (Discovery, Featured, and Categories).
 * * @component
 * @returns {JSX.Element} The main layout containing the event discovery grid.
 */
const Home = () => {
  // Extract business logic and state from the specialized hook
  const { events, handleSearch, suggestions } = useEvents();

  return (
    <HomeLayout>
      <EventDiscovery 
        onSearch={handleSearch}
        getTitleSuggestions={suggestions.getTitle}
        getCategorySuggestions={suggestions.getCategory}
        getLocationSuggestions={suggestions.getLocation} 
      />
      
      <FeaturedEvents />

      <CategoryEvents />

      <Events events={events} />
    </HomeLayout>
  );
};

export default Home;