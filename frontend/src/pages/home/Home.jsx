import HomeLayout from "../../shared/components/Layout/HomeLayout";
import EventDiscovery from "../../events/features/EventDiscovery";
import FeaturedEvents from "../../events/features/FeaturedEvents";
import CategoryEvents from "../../events/features/CategoryEvents";
import Events from "../../events/features/Events";

/**
 * Main Landing Page Component.
 * * This component serves as the high-level Composition Layer for the ticketing platform. 
 * It organizes core event features (Discovery, Featured, Categories, and Results) 
 * into a cohesive user experience.
 * * Architectural Note:
 * Following the migration to React Context, this page is now "Prop-Drilling Free." 
 * Features like EventDiscovery and CategoryEvents are self-sufficient units 
 * that consume the global state independently via the useEvents hook.
 * * @component
 * @category Pages
 * @returns {JSX.Element} The rendered landing page orchestrating autonomous event features.
 */
const Home = () => {
  return (
    <HomeLayout>
      
      {/* EventDiscovery: 
          Autonomous Search Feature. Internally handles search intent 
          and autocomplete providers from the EventsContext. 
      */}
      <EventDiscovery />
      
      {/* FeaturedEvents: 
          High-priority or trending events section. 
      */}
      <FeaturedEvents />

      {/* CategoryEvents: 
          Interactive filtering grid. Independently handles category selection 
          logic by communicating directly with the global state. 
      */}
      <CategoryEvents />

      {/* Events: 
          Dynamic result area. Automatically re-renders the filtered 
          event collection whenever the context state changes. 
      */}
      <Events />

    </HomeLayout>
  );
};

export default Home;