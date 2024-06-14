import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { takeActions } from "../../data/actions";

import Card from "./Card";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../css/carousel.scss";

const Carousel = () => {
  return (
    <>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {takeActions.map((action) => (
          <SwiperSlide key={action.id}>
            <Card action={action} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default Carousel;
