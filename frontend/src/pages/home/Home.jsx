import FeaturedEvents from "../../events/features/FeaturedEvents";
import CategoryEvents from "../../events/features/CategoryEvents";
import EventsFeature from "../../events/features/EventsFeature";

/**
 * Home Page Component.
 *
 * This component serves as the primary landing page shell. Following the
 * "Thin Page" architectural pattern, it avoids managing local state,
 * data fetching, or business logic.
 *
 * Instead, it acts as a declarative orchestrator that composes several
 * autonomous "Smart Components" (Features). Each feature is responsible
 * for its own data lifecycle and internal logic.
 *
 * Architectural Strategy:
 * - Layout: General structure (Header/Sidebar) is delegated to the MainLayout
 *   via the AppRouter.
 * - Composition: Assembles the Hero section (Featured), Discovery (Categories),
 *   and the Main Feed (EventsFeature).
 *
 * @component
 * @category Pages
 * @returns {JSX.Element} The assembled Home page view.
 */
const Home = () => {
  return (
    <>
      {/* Hero Feature: Showcases high-priority or trending events */}
      <FeaturedEvents />

      {/* Discovery Feature: Allows users to filter the global state by category */}
      <CategoryEvents />

      {/* Main Feed Feature: Renders the core list of available events */}
      <EventsFeature />
    </>
  );
};

export default Home;
