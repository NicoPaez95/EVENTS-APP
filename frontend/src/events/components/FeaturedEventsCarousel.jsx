import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

/**
 * FeaturedEventsCarousel Component.
 * * Renders an auto-playing, infinite loop carousel to highlight top events.
 * * Powered by Swiper.js, featuring touch gestures, pagination dots, 
 * and responsive image containers.
 * * @component
 * @param {Object} props - Component properties.
 * @param {Object[]} props.featuredEvents - Array of highlighted event objects.
 * @param {string|number} props.featuredEvents[].id - Unique identifier for the slide.
 * @param {string} props.featuredEvents[].image - URL of the event's promotional image.
 * @param {string} props.featuredEvents[].alt - Descriptive text for the image (accessibility).
 * @returns {JSX.Element} A full-width section containing the Swiper carousel.
 */
const FeaturedEventsCarousel = ({ featuredEvents }) => {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {featuredEvents.map((event) => (
          <SwiperSlide key={event.id}>
            <div className="w-full h-64 overflow-hidden rounded-lg">
              <img
                src={event.image}
                alt={event.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedEventsCarousel;