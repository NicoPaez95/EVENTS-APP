// ===============================
// FeaturedEvents Feature
// -------------------------------
// Entry component for the featured events feature.
// ===============================

import { featuredEvents } from "../data/featuredEvents.mock";
import FeaturedEventsCarousel from "../components/FeaturedEventsCarousel";


const FeaturedEvents = () => {
  return (
    <main>
      <h1 className="text-2xl font-bold text-center p-4 m-2">
        Featured Events
      </h1>
      <FeaturedEventsCarousel featuredEvents={featuredEvents} />
    </main>
  );
};

export default FeaturedEvents;