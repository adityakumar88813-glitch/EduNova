import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-1 flex-col">
      {cart?.length > 0 ? (
        cart.map((course, indx) => {
          // ==============================
          // RATING
          // ==============================

          const ratings = course?.ratingAndReviews || []

          const averageRating =
            ratings.length > 0
              ? ratings.reduce(
                  (sum, review) => sum + Number(review.rating || 0),
                  0
                ) / ratings.length
              : 0

          // ==============================
          // PRICE
          // ==============================

          const price = Number(course?.price || 0)

          return (
            <div
              key={course._id}
              className={`
                flex w-full flex-wrap
                items-start justify-between
                gap-6
                rounded-xl
                border border-richblack-700
                bg-richblack-800/40
                p-4
                transition-all duration-300
                hover:border-richblack-600
                hover:bg-richblack-800/70

                ${indx !== 0 ? "mt-4" : ""}
              `}
            >
              {/* =====================================
                  COURSE LEFT
              ===================================== */}

              <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row">

                {/* Thumbnail */}

                <div className="relative shrink-0">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName || "Course"}
                    className="
                      h-[120px]
                      w-full
                      rounded-xl
                      border
                      border-richblack-600
                      object-cover
                      sm:w-[200px]
                    "
                  />

                  {/* Small course badge */}

                  <div
                    className="
                      absolute
                      left-2
                      top-2
                      rounded-md
                      bg-black/70
                      px-2
                      py-1
                      text-[10px]
                      font-semibold
                      text-white
                      backdrop-blur-sm
                    "
                  >
                    COURSE
                  </div>
                </div>

                {/* Course Information */}

                <div className="flex min-w-0 flex-col">

                  <p
                    className="
                      line-clamp-2
                      text-lg
                      font-semibold
                      text-richblack-5
                    "
                  >
                    {course?.courseName}
                  </p>

                  <p className="mt-1 text-sm text-richblack-300">
                    {course?.category?.name || "Uncategorized"}
                  </p>

                  {/* Rating */}

                  <div className="mt-3 flex flex-wrap items-center gap-2">

                    <span className="font-semibold text-yellow-50">
                      {averageRating > 0
                        ? averageRating.toFixed(1)
                        : "No rating"}
                    </span>

                    <ReactStars
                      count={5}
                      value={averageRating}
                      size={18}
                      edit={false}
                      isHalf={true}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                      halfIcon={<FaStar />}
                    />

                    <span className="text-xs text-richblack-400">
                      {ratings.length}{" "}
                      {ratings.length === 1 ? "Rating" : "Ratings"}
                    </span>

                  </div>

                  {/* Course ID / extra info */}

                  <p className="mt-3 text-xs text-richblack-500">
                    Added to cart
                  </p>
                </div>
              </div>

              {/* =====================================
                  RIGHT SIDE
              ===================================== */}

              <div
                className="
                  flex
                  w-full
                  flex-row
                  items-center
                  justify-between
                  gap-4
                  sm:w-auto
                  sm:flex-col
                  sm:items-end
                "
              >

                {/* Remove Button */}

                <button
                  type="button"
                  onClick={() =>
                    dispatch(removeFromCart(course._id))
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-richblack-600
                    bg-richblack-700
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-pink-200
                    transition-all
                    duration-200
                    hover:border-pink-300/40
                    hover:bg-pink-300/10
                    hover:text-pink-100
                  "
                >
                  <RiDeleteBin6Line className="text-lg" />
                  <span>Remove</span>
                </button>

                {/* Price */}

                <div className="text-right">

                  <p className="text-xs text-richblack-400">
                    Course Price
                  </p>

                  <p
                    className="
                      mt-1
                      text-2xl
                      font-bold
                      text-yellow-50
                    "
                  >
                    ₹{price.toLocaleString("en-IN")}
                  </p>

                </div>

              </div>
            </div>
          )
        })
      ) : (
        /* =====================================
           EMPTY CART
        ===================================== */

        <div
          className="
            flex
            min-h-[250px]
            flex-col
            items-center
            justify-center
            rounded-xl
            border
            border-dashed
            border-richblack-600
            bg-richblack-800/40
            text-center
          "
        >
          <div
            className="
              mb-4
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-richblack-700
              text-2xl
            "
          >
            🛒
          </div>

          <h2 className="text-lg font-semibold text-richblack-5">
            Your cart is empty
          </h2>

          <p className="mt-1 text-sm text-richblack-400">
            Add a course to get started.
          </p>
        </div>
      )}
    </div>
  )
}