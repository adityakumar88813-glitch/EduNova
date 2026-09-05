import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import { FaQuoteLeft, FaStar, FaGraduationCap } from "react-icons/fa"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/autoplay"

import Img from "./Img"
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])

  const truncateWords = 22

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )

        if (data?.success) {
          setReviews(data?.data || [])
        }
      } catch (error) {
        console.log("REVIEWS FETCH ERROR:", error)
      }
    }

    fetchReviews()
  }, [])

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase()
  }

  return (
    <div className="w-full">

      {/* ==============================
          REVIEW SLIDER
      =============================== */}

      <div className="relative w-full">

        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
            },

            640: {
              slidesPerView: 1,
            },

            768: {
              slidesPerView: 2,
            },

            1024: {
              slidesPerView: 3,
            },

            1280: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={22}
          loop={reviews.length > 4}
          freeMode={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="review-swiper !pb-12"
        >

          {reviews.map((review, index) => {

            const firstName = review?.user?.firstName || "Anonymous"
            const lastName = review?.user?.lastName || ""
            const image = review?.user?.image
            const rating = Number(review?.rating) || 0
            const reviewText = review?.review || "Amazing learning experience."

            const shortReview =
              reviewText.split(" ").length > truncateWords
                ? `${reviewText
                    .split(" ")
                    .slice(0, truncateWords)
                    .join(" ")}...`
                : reviewText

            return (
             <SwiperSlide key={review?._id || index} className="!h-[310px]">
  <div
    className="
      group relative
      h-[310px]
      w-full
      overflow-hidden
      rounded-2xl
      border border-richblack-700
      bg-gradient-to-br
      from-richblack-800
      via-richblack-800
      to-richblack-900
      p-5
      shadow-[0_10px_35px_rgba(0,0,0,0.25)]
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-yellow-100/40
      hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]
    "
  >

                  {/* Glow Effect */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-12
                      -top-12
                      h-32
                      w-32
                      rounded-full
                      bg-yellow-100/10
                      blur-3xl
                      transition-all
                      duration-300
                      group-hover:bg-yellow-100/20
                    "
                  />

                  {/* Quote Icon */}

                  <div
                    className="
                      absolute
                      right-5
                      top-5
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-yellow-100/10
                      text-yellow-100
                    "
                  >
                    <FaQuoteLeft className="text-sm" />
                  </div>

                  {/* ==============================
                      USER
                  =============================== */}

                  <div className="relative flex items-center gap-3">

                    {/* Profile */}

                    {image ? (
                      <Img
                        src={image}
                        alt={`${firstName} ${lastName}`}
                        className="
                          h-12
                          w-12
                          rounded-full
                          border-2
                          border-yellow-100/30
                          object-cover
                          ring-4
                          ring-richblack-700
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border-2
                          border-yellow-100/30
                          bg-gradient-to-br
                          from-yellow-100
                          to-yellow-50
                          text-sm
                          font-bold
                          text-richblack-900
                          ring-4
                          ring-richblack-700
                        "
                      >
                        {getInitials(firstName, lastName)}
                      </div>
                    )}

                    {/* Name */}

                    <div className="min-w-0">

                      <h3
                        className="
                          truncate
                          text-sm
                          font-bold
                          capitalize
                          text-richblack-5
                        "
                      >
                        {firstName} {lastName}
                      </h3>

                      <div className="mt-1 flex items-center gap-1.5">

                        <FaGraduationCap
                          className="text-xs text-yellow-100"
                        />

                        <span className="text-[11px] text-richblack-400">
                          Student
                        </span>

                      </div>

                    </div>
                  </div>

                  {/* ==============================
                      RATING
                  =============================== */}

                  <div
                    className="
                      relative
                      mt-5
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-richblack-700
                      bg-richblack-900/70
                      px-3
                      py-2
                    "
                  >

                    <div className="flex items-center gap-2">

                      <ReactStars
                        count={5}
                        value={rating}
                        size={17}
                        edit={false}
                        activeColor="#ffd700"
                        emptyIcon={<FaStar />}
                        fullIcon={<FaStar />}
                      />

                    </div>

                    <span
                      className="
                        rounded-md
                        bg-yellow-100/10
                        px-2
                        py-1
                        text-xs
                        font-bold
                        text-yellow-100
                      "
                    >
                      {rating.toFixed(1)}
                    </span>

                  </div>

                  {/* ==============================
                      REVIEW
                  =============================== */}

                  <div className="relative mt-5">

                    <FaQuoteLeft
                      className="
                        mb-2
                        text-lg
                        text-yellow-100/30
                      "
                    />

                    <p
                      className="
                        min-h-[65px]
                        text-sm
                        leading-6
                        text-richblack-100
                      "
                    >
                      "{shortReview}"
                    </p>

                  </div>

                  {/* ==============================
                      COURSE
                  =============================== */}

                  {review?.course?.courseName && (
                    <div
                      className="
                        mt-5
                        border-t
                        border-richblack-700
                        pt-3
                      "
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-richblack-500">
                        Course
                      </p>

                      <p
                        className="
                          mt-1
                          truncate
                          text-xs
                          font-semibold
                          text-yellow-100
                        "
                      >
                        {review.course.courseName}
                      </p>
                    </div>
                  )}

                </div>

              </SwiperSlide>
            )
          })}

        </Swiper>

      </div>
    </div>
  )
}

export default ReviewSlider