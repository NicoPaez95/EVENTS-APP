// ===============================
// FeaturedEvents Page
// -------------------------------
// Main page responsible for rendering
// highlighted (featured) events.
//
// Acts as entry point for the
// featured events view.
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