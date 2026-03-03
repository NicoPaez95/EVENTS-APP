// ==========================================
// Home Page Component
// ------------------------------------------
// Main landing page of the application.
//
// Responsible for composing multiple
// feature-level components inside a
// shared layout structure.
//
// This component does NOT handle business
// logic or data fetching directly.
// It acts as a composition layer.
//
// Structure:
// - Layout (HomeLayout)
//   - FeaturedEvents (feature)
//   - CategoryEvents (feature)
//   - Events (feature)
// ==========================================

import HomeLayout from "../../shared/components/Layout/HomeLayout";
import FeaturedEvents from "../../events/features/FeaturedEvents";
import CategoryEvents from "../../events/features/CategoryEvents";
import Events from "../../events/features/Events";

const Home = () => {
  return (
    <HomeLayout>
      <FeaturedEvents />
      <CategoryEvents />
      <Events />
    </HomeLayout>
  );
};

export default Home;