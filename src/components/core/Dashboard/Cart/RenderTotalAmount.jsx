import { FiShield, FiShoppingBag, FiArrowRight } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"
import IconBtn from "../../../common/IconBtn"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    if (!cart || cart.length === 0) return

    const courses = cart.map((course) => course._id)

    buyCourse(
      token,
      courses,
      user,
      navigate,
      dispatch
    )
  }

  return (
    <div
      className="
        sticky top-6
        w-full
        min-w-0
        overflow-hidden
        rounded-2xl
        border border-richblack-700
        bg-richblack-800
        shadow-[0_15px_50px_rgba(0,0,0,0.25)]
        sm:min-w-[320px]
      "
    >
      {/* Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50" />

      <div className="p-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-yellow-50/10
              text-yellow-50
            "
          >
            <FiShoppingBag className="text-xl" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-richblack-400">
              Order Summary
            </p>

            <p className="mt-1 text-sm text-richblack-200">
              {cart?.length || 0}{" "}
              {cart?.length === 1 ? "course" : "courses"}
            </p>
          </div>
        </div>

        {/* Price */}
        <div
          className="
            rounded-xl
            border border-richblack-700
            bg-richblack-900/60
            p-5
          "
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-richblack-300">
              Total Amount
            </span>

            <span className="text-xs text-green-300">
              Secure checkout
            </span>
          </div>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-sm font-medium text-richblack-400">
              ₹
            </span>

            <span className="text-4xl font-bold tracking-tight text-yellow-50">
              {Number(total || 0).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Buy Button */}
        <div className="mt-5">
          <IconBtn
            text="Buy Now"
            onclick={handleBuyCourse}
            customClasses="
              w-full
              justify-center
              gap-2
              rounded-xl
              py-3
              text-base
              font-semibold
              shadow-lg
              transition-all
              duration-200
              hover:-translate-y-0.5
            "
          />
        </div>

        {/* Security */}
        <div
          className="
            mt-5
            flex items-start gap-3
            rounded-xl
            border border-richblack-700
            bg-richblack-900/40
            p-3
          "
        >
          <FiShield className="mt-0.5 shrink-0 text-green-300" />

          <div>
            <p className="text-xs font-semibold text-richblack-200">
              Secure Payment
            </p>

            <p className="mt-1 text-[11px] leading-5 text-richblack-500">
              Your payment information is protected and securely processed.
            </p>
          </div>
        </div>

        {/* Small Info */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-richblack-500">
          <FiArrowRight />
          <span>Complete your purchase to start learning</span>
        </div>
      </div>
    </div>
  )
}