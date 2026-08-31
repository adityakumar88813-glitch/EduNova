import React from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { BsFillCaretRightFill, BsLightningChargeFill } from "react-icons/bs";
import { FaShareSquare, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../../slices/cartSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";

function CourseDetailsCard({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!course) {
    return null;
  }

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    courseName,
    studentsEnrolled = [],
    instructions = [],
  } = course;

  const isEnrolled =
    user && studentsEnrolled.includes(user?._id);

  // Share course
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  // Add course to cart
  const handleAddToCart = () => {
    if (
      user &&
      user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
    ) {
      toast.error(
        "You are an Instructor. You can't buy a course."
      );
      return;
    }

    if (token) {
      dispatch(addToCart(course));
      toast.success("Course added to cart");
      return;
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add this course to cart.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  // Buy course
  const handleBuy = () => {
    if (isEnrolled) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    handleBuyCourse();
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-richblack-600 bg-richblack-800 shadow-xl">

      {/* Course Image */}
      <div className="relative overflow-hidden">
        <img
          src={ThumbnailImage}
          alt={courseName || "Course thumbnail"}
          className="h-[230px] w-full object-cover transition-all duration-300 hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-richblack-900 to-transparent" />
      </div>

      {/* Card Content */}
      <div className="p-5">

        {/* Price */}
        <div className="mb-5">
          <p className="text-sm text-richblack-300">
            Course Price
          </p>

          <p className="mt-1 text-3xl font-bold text-richblack-5">
            Rs. {CurrentPrice}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">

          {/* Buy Now */}
          <button
            type="button"
            onClick={handleBuy}
            className="
              group
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-yellow-50
              px-6
              py-4
              text-base
              font-bold
              text-richblack-900
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-yellow-100
              hover:shadow-lg
              active:translate-y-0
            "
          >
            <BsLightningChargeFill />

            <span>
              {isEnrolled ? "Go To Course" : "Buy Now"}
            </span>

            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>

          {/* Add To Cart */}
          {!isEnrolled && (
            <button
              type="button"
              onClick={handleAddToCart}
              className="
                group
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-richblack-400
                bg-richblack-700
                px-6
                py-4
                text-base
                font-semibold
                text-richblack-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-yellow-25
                hover:bg-richblack-600
                hover:text-yellow-25
                active:translate-y-0
              "
            >
              <FaShoppingCart className="transition-transform duration-300 group-hover:scale-110" />

              <span>
                Add to Cart
              </span>
            </button>
          )}

        </div>

        {/* Money Back Guarantee */}
        <div className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3">
          <span className="text-lg">
            🛡️
          </span>

          <p className="text-sm font-medium text-richblack-100">
            30-Day Money-Back Guarantee
          </p>
        </div>

        {/* Course Includes */}
        <div className="mt-6 border-t border-richblack-600 pt-6">

          <h3 className="text-xl font-semibold text-richblack-5">
            This Course Includes
          </h3>

          <div className="mt-5 flex flex-col gap-4">

            {instructions.length > 0 ? (
              instructions.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-caribbeangreen-500/10">
                    <BsFillCaretRightFill className="text-xs text-caribbeangreen-100" />
                  </div>

                  <p className="text-sm leading-6 text-richblack-100">
                    {item}
                  </p>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-caribbeangreen-500/10">
                    <BsFillCaretRightFill className="text-xs text-caribbeangreen-100" />
                  </div>

                  <p className="text-sm text-richblack-100">
                    Lifetime access to course
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-caribbeangreen-500/10">
                    <BsFillCaretRightFill className="text-xs text-caribbeangreen-100" />
                  </div>

                  <p className="text-sm text-richblack-100">
                    Learn at your own pace
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-caribbeangreen-500/10">
                    <BsFillCaretRightFill className="text-xs text-caribbeangreen-100" />
                  </div>

                  <p className="text-sm text-richblack-100">
                    Certificate after completion
                  </p>
                </div>
              </>
            )}

          </div>
        </div>

        {/* Share */}
        <div className="mt-6 border-t border-richblack-600 pt-5">

          <button
            type="button"
            onClick={handleShare}
            className="
              mx-auto
              flex
              items-center
              gap-2
              rounded-lg
              px-5
              py-2
              text-sm
              font-semibold
              text-yellow-25
              transition-all
              duration-200
              hover:bg-richblack-700
              hover:text-yellow-50
            "
          >
            <FaShareSquare size={16} />
            Share this course
          </button>

        </div>

      </div>
    </div>
  );
}

export default CourseDetailsCard;