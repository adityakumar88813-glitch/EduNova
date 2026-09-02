import React, { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";
import { Link } from "react-router-dom";

const Course_Card = ({ course, Height = "h-[215px]" }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const reviews = Array.isArray(course?.ratingAndReviews)
      ? course.ratingAndReviews
      : [];

    if (reviews.length > 0) {
      const count = GetAvgRating(reviews);
      setAvgReviewCount(Number(count) || 0);
    } else {
      setAvgReviewCount(0);
    }
  }, [course]);

  if (!course) {
    return null;
  }

  const reviewCount = Array.isArray(course?.ratingAndReviews)
    ? course.ratingAndReviews.length
    : 0;

  return (
    <Link
      to={`/courses/${course._id}`}
      className="group block h-full"
    >
      <div className="h-full overflow-hidden rounded-xl bg-richblack-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">

        {/* Course Image */}
        <div className="overflow-hidden">
          <img
            src={course?.thumbnail}
            alt={course?.courseName || "Course thumbnail"}
            className={`${Height} w-full object-cover transition-transform duration-300 group-hover:scale-105`}
          />
        </div>

        {/* Course Information */}
        <div className="flex flex-col gap-2 px-3 py-4">

          {/* Course Name */}
          <h3 className="line-clamp-2 min-h-[56px] text-lg font-semibold text-richblack-5">
            {course?.courseName || "Course Name"}
          </h3>

          {/* Instructor */}
          <p className="text-sm text-richblack-300">
            {course?.instructor?.firstName || ""}{" "}
            {course?.instructor?.lastName || ""}
          </p>

          {/* Rating */}
          <div className="flex flex-wrap items-center gap-2">

            <span className="font-semibold text-yellow-50">
              {avgReviewCount.toFixed(1)}
            </span>

            <RatingStars
              Review_Count={avgReviewCount}
              Star_Size={18}
            />

            <span className="text-xs text-richblack-400">
              ({reviewCount} Ratings)
            </span>

          </div>

          {/* Price */}
          <p className="mt-1 text-xl font-bold text-richblack-5">
            Rs. {course?.price || 0}
          </p>

        </div>
      </div>
    </Link>
  );
};

export default Course_Card;