import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import { FiStar, FiSend } from "react-icons/fi"
import {
  TiStarFullOutline,
  TiStarOutline,
} from "react-icons/ti"
import { useSelector } from "react-redux"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)

  const { courseEntireData } = useSelector(
    (state) => state.viewCourse
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      courseExperience: "",
      courseRating: 0,
    },
  })

  const courseRating = watch("courseRating")

  // --------------------------------------------------
  // INITIAL VALUE
  // --------------------------------------------------

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
  }, [setValue])

  // --------------------------------------------------
  // RATING CHANGE
  // --------------------------------------------------

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  // --------------------------------------------------
  // SUBMIT REVIEW
  // --------------------------------------------------

  const onSubmit = async (data) => {
    if (!courseEntireData?._id) {
      console.error("Course ID not found")
      return
    }

    try {
      await createRating(
        {
          courseId: courseEntireData._id,
          rating: Number(data.courseRating),
          review: data.courseExperience,
        },
        token
      )

      setReviewModal(false)
    } catch (error) {
      console.error("CREATE REVIEW ERROR:", error)
    }
  }

  // --------------------------------------------------
  // STAR LABEL
  // --------------------------------------------------

  const getRatingText = () => {
    switch (courseRating) {
      case 1:
        return "Poor"
      case 2:
        return "Below Average"
      case 3:
        return "Good"
      case 4:
        return "Very Good"
      case 5:
        return "Excellent!"
      default:
        return "Select your rating"
    }
  }

  return (
    <div
      className="
        fixed inset-0 z-[1000]
        flex min-h-screen items-center justify-center
        overflow-y-auto
        bg-black/70
        px-4 py-8
        backdrop-blur-md
      "
      onClick={() => setReviewModal(false)}
    >
      {/* =================================================
          MODAL
      ================================================= */}

      <div
        className="
          relative
          w-full max-w-[580px]
          overflow-hidden
          rounded-2xl
          border border-richblack-600
          bg-richblack-800
          shadow-[0_25px_100px_rgba(0,0,0,0.6)]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* =================================================
            TOP ACCENT
        ================================================= */}

        <div className="h-1 w-full bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50" />

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex items-center justify-between
            border-b border-richblack-600
            bg-richblack-800
            px-6 py-5
          "
        >
          <div>
            <div className="flex items-center gap-2">
              <FiStar className="text-yellow-50" />

              <p
                className="
                  text-xs font-semibold
                  uppercase tracking-[0.18em]
                  text-yellow-50
                "
              >
                Course Feedback
              </p>
            </div>

            <h2 className="mt-1 text-xl font-bold text-richblack-5">
              Add Review
            </h2>
          </div>

          {/* Close Button */}

          <button
            type="button"
            onClick={() => setReviewModal(false)}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              border border-richblack-600
              bg-richblack-700
              text-richblack-300
              transition-all duration-200
              hover:border-pink-300/40
              hover:bg-pink-300/10
              hover:text-pink-200
            "
            aria-label="Close review modal"
          >
            <RxCross2 className="text-xl" />
          </button>
        </div>

        {/* =================================================
            BODY
        ================================================= */}

        <div className="px-6 py-7">
          {/* =================================================
              USER PROFILE
          ================================================= */}

          <div
            className="
              flex items-center gap-4
              rounded-xl
              border border-richblack-600
              bg-richblack-900/50
              p-4
            "
          >
            <img
              src={user?.image}
              alt={`${user?.firstName || "User"} profile`}
              className="
                h-12 w-12
                rounded-full
                border-2 border-richblack-500
                object-cover
              "
            />

            <div className="min-w-0">
              <p className="truncate font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>

              <p className="mt-0.5 text-xs text-richblack-400">
                Your review will be posted publicly
              </p>
            </div>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-7"
          >
            {/* =================================================
                RATING
            ================================================= */}

            <div
              className="
                rounded-xl
                border border-richblack-600
                bg-richblack-900/40
                p-5
              "
            >
              {/* Heading */}

              <div className="flex items-center gap-2">
                <FiStar className="text-yellow-50" />

                <p className="text-sm font-semibold text-richblack-5">
                  How would you rate this course?
                </p>
              </div>

              {/* Stars */}

              <div className="mt-5 flex flex-col items-center">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => ratingChanged(star)}
                      className="
                        rounded-md
                        p-1
                        transition-all duration-200
                        hover:scale-110
                        focus:outline-none
                        focus:ring-2
                        focus:ring-yellow-50/50
                      "
                      aria-label={`Rate ${star} out of 5`}
                    >
                      {courseRating >= star ? (
                        <TiStarFullOutline
                          size={38}
                          className="
                            text-yellow-50
                            drop-shadow-[0_0_8px_rgba(255,214,10,0.35)]
                          "
                        />
                      ) : (
                        <TiStarOutline
                          size={38}
                          className="
                            text-richblack-300
                            transition-colors duration-200
                            hover:text-yellow-50
                          "
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Rating Text */}

                <div className="mt-3 text-center">
                  <p
                    className={`
                      text-sm font-semibold
                      ${
                        courseRating
                          ? "text-yellow-50"
                          : "text-richblack-400"
                      }
                    `}
                  >
                    {getRatingText()}
                  </p>

                  <p className="mt-1 text-xs text-richblack-400">
                    {courseRating
                      ? `${courseRating} out of 5 stars`
                      : "Click a star to rate this course"}
                  </p>
                </div>
              </div>

              {/* Hidden Rating Field */}

              <input
                type="hidden"
                {...register("courseRating", {
                  validate: (value) =>
                    Number(value) > 0 ||
                    "Please select a rating",
                })}
              />

              {/* Rating Error */}

              {errors.courseRating && (
                <p className="mt-3 text-center text-xs text-pink-200">
                  {errors.courseRating.message}
                </p>
              )}
            </div>

            {/* =================================================
                EXPERIENCE
            ================================================= */}

            <div className="mt-5">
              <label
                htmlFor="courseExperience"
                className="
                  mb-2 block
                  text-sm font-semibold
                  text-richblack-5
                "
              >
                Share your experience
                <sup className="ml-1 text-pink-200">
                  *
                </sup>
              </label>

              <textarea
                id="courseExperience"
                placeholder="What did you like about this course? What could be improved?"
                {...register("courseExperience", {
                  required: "Please add your experience",
                  minLength: {
                    value: 5,
                    message:
                      "Review must contain at least 5 characters",
                  },
                })}
                className="
                  min-h-[140px]
                  w-full
                  resize-none
                  rounded-xl
                  border border-richblack-600
                  bg-richblack-900
                  px-4 py-3
                  text-sm
                  leading-6
                  text-richblack-5
                  outline-none
                  placeholder:text-richblack-500
                  transition-all duration-200
                  focus:border-yellow-50
                  focus:ring-1
                  focus:ring-yellow-50/30
                "
              />

              {/* Character hint */}

              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-richblack-500">
                  Minimum 5 characters
                </p>

                {errors.courseExperience && (
                  <p className="text-xs text-pink-200">
                    {errors.courseExperience.message}
                  </p>
                )}
              </div>
            </div>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div
              className="
                mt-7
                flex flex-col-reverse
                gap-3
                sm:flex-row
                sm:justify-end
              "
            >
              {/* Cancel */}

              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  border border-richblack-600
                  bg-richblack-700
                  px-5 py-3
                  text-sm font-semibold
                  text-richblack-200
                  transition-all duration-200
                  hover:border-richblack-500
                  hover:bg-richblack-600
                  hover:text-white
                "
              >
                Cancel
              </button>

              {/* Save */}

              <IconBtn
                type="submit"
                disabled={isSubmitting}
                text={
                  isSubmitting
                    ? "Saving..."
                    : "Save Review"
                }
                customClasses="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-6
                  py-3
                  text-sm
                  font-semibold
                "
              />
            </div>
          </form>
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div
          className="
            flex items-center justify-center
            gap-2
            border-t border-richblack-700
            bg-richblack-900/40
            px-6 py-3
            text-[10px]
            text-richblack-500
          "
        >
          <FiSend />

          <span>
            Your feedback helps other students choose better courses
          </span>
        </div>
      </div>
    </div>
  )
}