import HomeLayout from "../../shared/components/Layout/HomeLayout";
import FeaturedEvents from "../../events/features/FeaturedEvents";
import CategoryEvents from "../../events/features/CategoryEvents";
import Events from "../../events/features/Events";

/**
 * Home Page Component.
 * * This component serves as the high-level Composition Layer for the application's 
 * landing experience. It orchestrates specialized event features within the 
 * global structural layout.
 * * Architectural Note:
 * Following the "Composition over Configuration" principle, this page is strictly 
 * declarative. It delegates all data fetching and state logic to self-sufficient 
 * Feature components, ensuring a "Prop-Drilling Free" architecture.
 * * @component
 * @category Pages
 * @returns {JSX.Element} The rendered Home page composed of autonomous event features.
 */
const Home = () => {
  return (
    <HomeLayout>
      
      {/**
       * FeaturedEvents: 
       * Renders high-priority or trending experiences. 
       * Consumes global state via useEvents hook.
       */}
      <FeaturedEvents />

      {/**
       * CategoryEvents: 
       * Provides an interactive grid for domain-specific filtering. 
       * Updates the global EventsContext on user interaction.
       */}
      <CategoryEvents />

      {/**
       * Events: 
       * The primary results display area. Automatically synchronizes 
       * with the filtered collection provided by the context.
       */}
      <Events />

    </HomeLayout>
  );
};

export default Home;