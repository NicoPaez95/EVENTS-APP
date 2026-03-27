import HomeLayout from "../../shared/components/Layout/HomeLayout";
import FeaturedEvents from "../../events/features/FeaturedEvents";
import CategoryEvents from "../../events/features/CategoryEvents";
import EventsFeature from "../../events/features/EventsFeature";

/**
 * Home Page Component.
 * * This component serves as the high-level **Composition Layer** for the application's 
 * landing experience. It orchestrates specialized event features within the 
 * global structural layout.
 * * @component
 * @category Pages
 * * @description
 * **Architectural Strategy**: 
 * Following the **"Composition over Configuration"** principle, this page is strictly 
 * declarative. It does not manage state or fetch data directly. Instead, it:
 * 1. **Defines Layout**: Wraps features within the `HomeLayout` shell.
 * 2. **Delegates Responsibility**: Embeds autonomous Feature components that 
 * self-manage their data requirements via hooks.
 * 3. **Prop-Drilling Prevention**: Maintains a clean component tree by relying 
 * on the Context API for cross-component communication.
 * * @returns {JSX.Element} The rendered Home page composed of autonomous event features.
 */
const Home = () => {
  return (
    <HomeLayout>
      
      {/**
       * FeaturedEvents Feature: 
       * Renders high-priority or trending experiences. 
       * Independently consumes the global state via the `useEvents` hook.
       */}
      <FeaturedEvents />

      {/**
       * CategoryEvents Feature: 
       * Provides an interactive navigation grid for domain-specific filtering. 
       * Directly updates the global `EventsContext` upon user interaction.
       */}
      <CategoryEvents />

      {/**
       * EventsFeature: 
       * The primary catalog results display. 
       * Automatically synchronizes with the filtered collection provided by the 
       * context without requiring props from the Home parent.
       */}
      <EventsFeature />

    </HomeLayout>
  );
};

export default Home;