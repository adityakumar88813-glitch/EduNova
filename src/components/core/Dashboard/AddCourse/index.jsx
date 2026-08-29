import RenderSteps from "./RenderSteps";
import {
  FiBookOpen,
  FiCheckCircle,
  FiImage,
  FiLayers,
  FiPlayCircle,
  FiInfo,
  FiBell,
  FiFileText,
  FiArrowRight,
} from "react-icons/fi";

export default function AddCourse() {
  const tips = [
    {
      icon: <FiBookOpen />,
      title: "Course Pricing",
      text: "Set the course price or make your course completely free.",
    },
    {
      icon: <FiImage />,
      title: "Course Thumbnail",
      text: "Use 1024 × 576 for the best course thumbnail quality.",
    },
    {
      icon: <FiPlayCircle />,
      title: "Course Video",
      text: "Upload a clear overview video to introduce your course.",
    },
    {
      icon: <FiLayers />,
      title: "Course Builder",
      text: "Create and organize sections and subsections here.",
    },
    {
      icon: <FiCheckCircle />,
      title: "Course Content",
      text: "Add topics to create lessons, quizzes, and assignments.",
    },
    {
      icon: <FiInfo />,
      title: "Additional Data",
      text: "Add extra information that will appear on the course page.",
    },
    {
      icon: <FiBell />,
      title: "Announcements",
      text: "Notify your enrolled students about important updates.",
    },
    {
      icon: <FiFileText />,
      title: "Course Notes",
      text: "Add useful notes and important information for students.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-richblack-900 px-3 pb-12 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1450px] flex-col gap-8 xl:flex-row xl:items-start xl:gap-10">

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main className="min-w-0 flex-1">

          {/* Header */}
          <div className="relative mb-7 overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800/70 p-5 shadow-[0_15px_50px_rgba(0,0,0,0.2)] sm:p-7">

            {/* Background Glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-yellow-50/5 blur-3xl" />

            <div className="relative flex items-start gap-4">

              {/* Accent */}
              <div className="mt-1 h-12 w-1.5 shrink-0 rounded-full bg-yellow-50 shadow-[0_0_20px_rgba(255,214,10,0.25)]" />

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight text-richblack-5 sm:text-3xl lg:text-4xl">
                    Add Course
                  </h1>

                  <span className="rounded-full border border-yellow-50/20 bg-yellow-50/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-yellow-50">
                    Instructor
                  </span>
                </div>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-richblack-300 sm:text-base">
                  Create an engaging course by adding the details, content,
                  videos, and other information step by step.
                </p>
              </div>
            </div>
          </div>

          {/* Render Steps */}
          <div className="relative overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800/40 shadow-[0_15px_50px_rgba(0,0,0,0.2)]">

            {/* Top Line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-50/40 to-transparent" />

            <div className="p-3 sm:p-6 lg:p-8">
              <RenderSteps />
            </div>
          </div>
        </main>

        {/* =====================================================
            COURSE TIPS
        ===================================================== */}

        <aside className="w-full xl:sticky xl:top-6 xl:w-[350px] 2xl:w-[380px]">

          <div className="overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800 shadow-[0_15px_50px_rgba(0,0,0,0.25)]">

            {/* Header */}
            <div className="relative overflow-hidden border-b border-richblack-700 bg-richblack-800 px-5 py-5 sm:px-6">

              {/* Glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-yellow-50/10 blur-3xl" />

              <div className="relative flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-yellow-50/20 bg-yellow-50/10 text-yellow-50">
                  <FiBookOpen className="text-xl" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-richblack-5">
                    Course Tips
                  </h2>

                  <p className="mt-1 text-xs text-richblack-400">
                    Helpful guidelines for instructors
                  </p>
                </div>
              </div>
            </div>

            {/* Tips List */}
            <div className="p-4 sm:p-5">

              <div className="space-y-1">

                {tips.map((tip, index) => (
                  <div
                    key={index}
                    className="
                      group flex gap-3 rounded-xl
                      border border-transparent
                      p-3
                      transition-all duration-200
                      hover:border-richblack-600
                      hover:bg-richblack-700/50
                    "
                  >

                    {/* Icon */}
                    <div
                      className="
                        mt-0.5 flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-lg
                        border border-richblack-600
                        bg-richblack-700
                        text-yellow-50
                        transition-all duration-200
                        group-hover:border-yellow-50/30
                        group-hover:bg-yellow-50
                        group-hover:text-richblack-900
                      "
                    >
                      {tip.icon}
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">

                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-richblack-100">
                          {tip.title}
                        </p>

                        <FiArrowRight
                          className="
                            shrink-0
                            text-sm
                            text-richblack-600
                            opacity-0
                            transition-all duration-200
                            group-hover:translate-x-1
                            group-hover:text-yellow-50
                            group-hover:opacity-100
                          "
                        />
                      </div>

                      <p className="mt-1 text-xs leading-5 text-richblack-400">
                        {tip.text}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* Bottom Note */}
            <div className="border-t border-richblack-700 bg-richblack-900/60 px-5 py-4">

              <div className="flex gap-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-50/10 text-sm">
                  💡
                </div>

                <p className="text-xs leading-5 text-richblack-400">
                  <span className="font-semibold text-richblack-100">
                    Pro tip:
                  </span>{" "}
                  Complete all required fields before publishing your course
                  to avoid validation issues.
                </p>

              </div>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
}