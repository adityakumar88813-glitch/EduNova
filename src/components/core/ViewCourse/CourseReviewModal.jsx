import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import { FiStar, FiSend } from "react-icons/fi"
import ReactStars from "react-rating-stars-component"
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
    formState: { errors },
  } = useForm()

  const courseRating = watch("courseRating")

  // =========================================================
  // INITIAL VALUES
  // =========================================================

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
  }, [setValue])

  // =========================================================
  // RATING
  // =========================================================

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating, {
      shouldValidate: true,
    })
  }

  // =========================================================
  // SUBMIT
  // =========================================================

  const onSubmit = async (data) => {
    if (!courseEntireData?._id) {
      return
    }

    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )

    setReviewModal(false)
  }

  return (
    <div
      className="
        fixed inset-0 z-[1000]
        flex min-h-screen items-center justify-center
        overflow-y-auto
        bg-black/60
        px-4 py-8
        backdrop-blur-md
      "
      onClick={() => setReviewModal(false)}
    >

      {/* =====================================================
          MODAL
      ===================================================== */}

      <div
        className="
          relative
          w-full max-w-[560px]
          overflow-hidden
          rounded-2xl
          border border-richblack-600
          bg-richblack-800
          shadow-[0_25px_80px_rgba(0,0,0,0.5)]
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

        <div className="flex items-center justify-between border-b border-richblack-600 bg-richblack-800 px-6 py-5">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-50">
              Course Feedback
            </p>

            <h2 className="mt-1 text-xl font-bold text-richblack-5">
              Add Review
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setReviewModal(false)}
            className="
              flex h-9 w-9
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

          <div className="
            flex items-center gap-4
            rounded-xl
            border border-richblack-600
            bg-richblack-900/50
            p-4
          ">

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

            <div className="
              rounded-xl
              border border-richblack-600
              bg-richblack-900/40
              p-5
            ">

              <div className="flex items-center gap-2">
                <FiStar className="text-yellow-50" />

                <p className="text-sm font-semibold text-richblack-5">
                  How would you rate this course?
                </p>
              </div>

              <div className="mt-4 flex flex-col items-center">

                <ReactStars
                  count={5}
                  value={courseRating || 0}
                  onChange={ratingChanged}
                  size={34}
                  activeColor="#ffd700"
                  color="#4b5563"
                  isHalf={false}
                />

                <p className="mt-2 text-xs text-richblack-400">
                  {courseRating
                    ? `${courseRating} out of 5 stars`
                    : "Select your rating"}
                </p>
              </div>

              {/* Hidden rating validation */}
              <input
                type="hidden"
                {...register("courseRating", {
                  validate: (value) =>
                    Number(value) > 0 ||
                    "Please select a rating",
                })}
              />

              {errors.courseRating && (
                <p className="mt-2 text-center text-xs text-pink-200">
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

              {errors.courseExperience && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-200" />

                  <span className="text-xs text-pink-200">
                    {errors.courseExperience.message}
                  </span>
                </div>
              )}
            </div>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="
              mt-7
              flex
              flex-col-reverse
              gap-3
              sm:flex-row
              sm:justify-end
            ">

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
                  px-5 py-2.5
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
                text="Save Review"
                customClasses="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-5
                  py-2.5
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

        <div className="
          flex items-center justify-center
          gap-2
          border-t border-richblack-700
          bg-richblack-900/40
          px-6 py-3
          text-[10px]
          text-richblack-500
        ">
          <FiSend />
          Your feedback helps other students choose better courses
        </div>

      </div>
    </div>
  )
}