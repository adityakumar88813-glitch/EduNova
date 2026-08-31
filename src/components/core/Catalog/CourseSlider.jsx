import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  FreeMode,
  Navigation,
  Pagination,
} from "swiper/modules";

import Course_Card from "./Course_Card";

const CourseSlider = ({ Courses = [] }) => {
  return (
    <div className="w-full">
      {Courses.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={Courses.length > 3}
          freeMode={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Navigation, Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="!pb-12"
        >
          {Courses.map((course, index) => (
            <SwiperSlide key={course?._id || index}>
              <Course_Card
                course={course}
                Height="h-[215px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex min-h-[150px] items-center justify-center rounded-lg border border-richblack-700 bg-richblack-800">
          <p className="text-xl text-richblack-200">
            No Course Found
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseSlider;