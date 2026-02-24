// ===============================
// FeaturedEventsCarousel Component
// -------------------------------
// Displays highlighted events
// inside an auto-playing carousel.
//
// Receives featured events as props.
// Pure presentational component.
// ===============================

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const FeaturedEventsCarousel = ({ featuredEvents }) => {
  return (
    <section>
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
            <div>
              <img
                src={event.image}
                alt={event.alt}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedEventsCarousel;