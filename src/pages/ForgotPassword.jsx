import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "../services/operations/authAPI"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

 return (
  <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-richblack-900 px-4 py-8 sm:px-6">
    {loading ? (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-richblack-600 border-t-yellow-50" />
        <p className="text-sm text-richblack-300">Loading...</p>
      </div>
    ) : (
      <div className="w-full max-w-[480px]">
        {/* Card */}
        <div className="rounded-2xl border border-richblack-700 bg-richblack-800 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">
          
          {/* Header */}
          <div className="mb-7">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50/10">
              <span className="text-2xl">🔐</span>
            </div>

            <h1 className="text-2xl font-semibold leading-tight text-richblack-5 sm:text-3xl">
              {!emailSent ? "Reset your password" : "Check your email"}
            </h1>

            <p className="mt-3 text-sm leading-6 text-richblack-200 sm:text-base">
              {!emailSent
                ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
                : `We have sent the reset email to ${email}`}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="block w-full">
                <p className="mb-2 text-sm font-medium text-richblack-5">
                  Email Address{" "}
                  <sup className="text-pink-200">*</sup>
                </p>

                <div className="relative">
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-sm text-richblack-5 outline-none transition-all duration-200 placeholder:text-richblack-400 focus:border-yellow-50 focus:ring-2 focus:ring-yellow-50/20 sm:text-base"
                  />
                </div>
              </label>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-yellow-50 px-4 py-3 text-sm font-semibold text-richblack-900 transition-all duration-200 hover:scale-[1.01] hover:bg-yellow-100 hover:shadow-lg hover:shadow-yellow-50/10 active:scale-[0.99] sm:text-base"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 border-t border-richblack-700 pt-5">
            <Link
              to="/login"
              className="group inline-flex items-center gap-x-2 text-sm font-medium text-richblack-100 transition-colors duration-200 hover:text-yellow-50 sm:text-base"
            >
              <BiArrowBack className="transition-transform duration-200 group-hover:-translate-x-1" />
              Back To Login
            </Link>
          </div>
        </div>

        {/* Bottom text */}
        <p className="mt-5 text-center text-xs text-richblack-400 sm:text-sm">
          We'll help you get back into your account securely.
        </p>
      </div>
    )}
  </div>
)
}

export default ForgotPassword