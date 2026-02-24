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
      <h1>
        Featured Events
      </h1>
      <FeaturedEventsCarousel featuredEvents={featuredEvents} />
    </main>
  );
};

export default FeaturedEvents;