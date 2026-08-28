import { useSelector } from "react-redux"

import frameImg from "../../../assets/frame.png"
import LoginForm from "./LoginForm.jsx"
import SignupForm from "./SignupForm.jsx"

function Template({
  title,
  description1,
  description2,
  image,
  formType,
}) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-richblack-900 px-4 py-8 sm:px-6 lg:px-8">
      {loading ? (
        <div className="grid min-h-[calc(100vh-5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
          
          <div className="flex w-full flex-col-reverse items-center justify-between gap-10 lg:flex-row lg:gap-16">
            
            {/* ================= LEFT : FORM ================= */}
            <div className="w-full max-w-[450px]">
              <div className="mb-6">
                <h1 className="text-3xl font-semibold leading-tight text-richblack-5 sm:text-4xl">
                  {title}
                </h1>

                <p className="mt-3 text-sm leading-6 text-richblack-300 sm:text-base">
                  <span className="text-richblack-100">
                    {description1}
                  </span>{" "}
                  <span className="font-edu-sa font-bold italic text-blue-100">
                    {description2}
                  </span>
                </p>
              </div>

              {/* Form */}
              <div className="rounded-xl border border-richblack-700 bg-richblack-800/40 p-5 shadow-lg sm:p-6">
                {formType === "signup" ? (
                  <SignupForm />
                ) : (
                  <LoginForm />
                )}
              </div>
            </div>

            {/* ================= RIGHT : IMAGE ================= */}
            <div className="relative hidden w-full max-w-[500px] lg:block">
              <div className="relative mx-auto aspect-square w-full max-w-[470px]">
                
                {/* Background frame */}
                <img
                  src={frameImg}
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain"
                  loading="lazy"
                />

                {/* Main image */}
                <img
                  src={image}
                  alt="Students learning"
                  className="absolute inset-[5%] h-[90%] w-[90%] rounded-xl object-cover shadow-2xl"
                  loading="lazy"
                />

              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default Template