import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

/**
 * @typedef {Object} FeaturedEvent
 * @property {string|number} id - Unique identifier for the event.
 * @property {string|Object} title - The display name of the event.
 * @property {string} image - The URL of the promotional cover image.
 * @property {string|Object} category - The event classification (e.g., Music, Tech).
 */

/**
 * FeaturedEventsCarousel Component (Presentational).
 * * This component provides a high-impact visual slider for top-tier events.
 * It strictly handles Swiper.js configuration and UI layout transitions,
 * remaining decoupled from the global state logic.
 * * Features:
 * - Responsive image scaling on hover.
 * - Dynamic loop enabling based on item count.
 * - Accessible navigation via ARIA-compliant pagination.
 * * @component
 * @category Components
 * @param {Object} props - Component properties.
 * @param {FeaturedEvent[]} props.featuredEvents - An array of event objects to be rendered in the carousel.
 * @param {string} props.clickToSeeDetails - Localized action text overlay helper for user interaction cues.
 * @returns {JSX.Element} A full-width interactive slider with auto-playing capabilities.
 */
const FeaturedEventsCarousel = ({ featuredEvents = [], clickToSeeDetails }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={featuredEvents.length > 1}
        className="rounded-2xl shadow-lg overflow-hidden"
      >
        {featuredEvents.map((event) => (
          <SwiperSlide key={event.id}>
            {/* The Link wrapper ensures the entire slide area is navigable,
              improving UX on mobile and touch devices.
            */}
            <Link
              to={`/events/${event.id}`}
              className="relative block group h-64 md:h-80 w-full"
              aria-label={`View details for ${event.title}`}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* UI Overlay: Visual hierarchy for event metadata */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
                  {event.category}
                </span>
                <h3 className="text-white text-2xl md:text-3xl font-bold font-display">
                  {event.title}
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  {clickToSeeDetails}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedEventsCarousel;
