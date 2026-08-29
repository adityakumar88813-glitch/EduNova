import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <div className="w-full">

      {/* =====================================================
          STEP PROGRESS
      ===================================================== */}

      <div className="relative mx-auto w-full max-w-[750px]">

        {/* Progress Line */}
        <div className="absolute left-[16.66%] right-[16.66%] top-[20px] h-[2px] bg-richblack-700">
          <div
            className="h-full bg-yellow-50 transition-all duration-500"
            style={{
              width:
                step === 1
                  ? "0%"
                  : step === 2
                  ? "50%"
                  : "100%",
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex w-full justify-between">

          {steps.map((item) => {
            const isCompleted = step > item.id
            const isActive = step === item.id
            const isPending = step < item.id

            return (
              <div
                key={item.id}
                className="flex flex-col items-center"
              >

                {/* Step Circle */}
                <div
                  className={`
                    relative z-10
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full
                    border-2
                    text-sm font-bold
                    transition-all duration-300

                    ${
                      isCompleted
                        ? "border-yellow-50 bg-yellow-50 text-richblack-900 shadow-[0_0_20px_rgba(255,214,10,0.25)]"
                        : isActive
                        ? "border-yellow-50 bg-richblack-900 text-yellow-50 shadow-[0_0_20px_rgba(255,214,10,0.15)]"
                        : "border-richblack-600 bg-richblack-800 text-richblack-500"
                    }
                  `}
                >
                  {isCompleted ? (
                    <FaCheck className="text-sm" />
                  ) : (
                    item.id
                  )}

                  {/* Active Glow */}
                  {isActive && (
                    <span className="absolute inset-[-5px] -z-10 animate-pulse rounded-full border border-yellow-50/20" />
                  )}
                </div>

                {/* Step Title */}
                <div className="mt-3 text-center">
                  <p
                    className={`
                      text-xs font-semibold
                      transition-colors duration-300
                      sm:text-sm
                      ${
                        isActive || isCompleted
                          ? "text-richblack-5"
                          : "text-richblack-500"
                      }
                    `}
                  >
                    {item.title}
                  </p>

                  {/* Status */}
                  <p
                    className={`
                      mt-1 hidden text-[10px] uppercase tracking-wider sm:block
                      ${
                        isCompleted
                          ? "text-yellow-50"
                          : isActive
                          ? "text-yellow-50"
                          : "text-richblack-600"
                      }
                    `}
                  >
                    {isCompleted
                      ? "Completed"
                      : isActive
                      ? "Current"
                      : "Upcoming"}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* =====================================================
          FORM CONTAINER
      ===================================================== */}

      <div className="mt-12 rounded-2xl border border-richblack-700 bg-richblack-900/30 p-1 shadow-[0_10px_40px_rgba(0,0,0,0.15)] sm:p-2">

        <div className="rounded-xl bg-richblack-800/40 p-4 sm:p-6 lg:p-8">

          {/* Current Step Header */}
          <div className="mb-7 flex items-center gap-3 border-b border-richblack-700 pb-5">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50 text-sm font-bold text-richblack-900">
              {step}
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-richblack-400">
                Step {step} of {steps.length}
              </p>

              <h2 className="mt-0.5 text-lg font-semibold text-richblack-5">
                {steps[step - 1]?.title}
              </h2>
            </div>

          </div>

          {/* =================================================
              RENDER CURRENT STEP
          ================================================= */}

          {step === 1 && <CourseInformationForm />}

          {step === 2 && <CourseBuilderForm />}

          {step === 3 && <PublishCourse />}

        </div>
      </div>

    </div>
  )
}