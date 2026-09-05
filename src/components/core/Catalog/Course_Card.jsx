import React, { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";
import { Link } from "react-router-dom";

const Course_Card = ({ course }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const reviews = Array.isArray(course?.ratingAndReviews)
      ? course.ratingAndReviews
      : [];

    if (reviews.length > 0) {
      setAvgReviewCount(GetAvgRating(reviews));
    } else {
      setAvgReviewCount(0);
    }
  }, [course?.ratingAndReviews]);

  if (!course) return null;

  const reviewCount = Array.isArray(course?.ratingAndReviews)
    ? course.ratingAndReviews.length
    : 0;

  const instructorName = `${course?.instructor?.firstName || ""} ${
    course?.instructor?.lastName || ""
  }`.trim();

  return (
    <Link
      to={`/courses/${course._id}`}
      className="group block w-full"
    >

      <div className="flex min-h-[430px] w-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#111827] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-slate-600 hover:shadow-2xl">

        {/* =================================================
            IMAGE
        ================================================= */}

        <div className="relative h-[220px] w-full shrink-0 overflow-hidden bg-slate-800">

          <img
            src={course?.thumbnail}
            alt={course?.courseName || "Course thumbnail"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

          {/* View Course badge */}
          <div className="absolute bottom-4 left-4 translate-y-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View Course →
          </div>

        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="flex flex-1 flex-col p-5">

          {/* Course name */}

          <h3 className="line-clamp-2 min-h-[52px] text-lg font-bold leading-6 text-white transition-colors duration-200 group-hover:text-yellow-400">
            {course?.courseName || "Course Name"}
          </h3>

          {/* Instructor */}

          <p className="mt-3 truncate text-sm text-slate-400">
            {instructorName || "Instructor"}
          </p>

          {/* Divider */}

          <div className="my-4 h-px bg-slate-700/70" />

          {/* Rating */}

          <div className="flex min-h-[25px] items-center gap-2">

            <span className="font-bold text-yellow-400">
              {avgReviewCount.toFixed(1)}
            </span>

            <RatingStars
              Review_Count={avgReviewCount}
              Star_Size={17}
            />

            <span className="text-xs text-slate-500">
              ({reviewCount})
            </span>

          </div>

          {/* Price */}

          <div className="mt-auto flex items-end justify-between pt-5">

            <div>
              <p className="text-xs text-slate-500">
                Course price
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                ₹{course?.price || 0}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-slate-950 transition-transform duration-300 group-hover:translate-x-1">
              →
            </div>

          </div>

        </div>
      </div>

    </Link>
  );
};

export default Course_Card;