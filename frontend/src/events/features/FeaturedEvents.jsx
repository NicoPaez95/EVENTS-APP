import { featuredEvents } from "../data/featuredEvents.mock";
import FeaturedEventsCarousel from "../components/FeaturedEventsCarousel";

/**
 * FeaturedEvents Feature Component.
 * * Acts as the entry point and container for the highlighted events section.
 * * It retrieves specialized 'featured' data and orchestrates its display 
 * through a carousel interface, ensuring the most important events 
 * are prioritized in the UI.
 * * @component
 * @returns {JSX.Element} The feature layout including the page title and the event carousel.
 */
const FeaturedEvents = () => {
  return (
    <main>
      {/* Page Title: High-level heading for the Featured section */}
      <h1 className="text-2xl font-bold text-center p-4 m-2">
        Featured Events
      </h1>

      {/* Carousel Component: Receives the specific featuredEvents array 
          to render the interactive sliding cards. 
      */}
      <FeaturedEventsCarousel featuredEvents={featuredEvents} />
    </main>
  );
};

export default FeaturedEvents;