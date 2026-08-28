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
} from "react-icons/fi";

export default function AddCourse() {
  const tips = [
    {
      icon: <FiBookOpen />,
      text: "Set the Course Price option or make it free.",
    },
    {
      icon: <FiImage />,
      text: "Standard size for the course thumbnail is 1024×576.",
    },
    {
      icon: <FiPlayCircle />,
      text: "Video section controls the course overview video.",
    },
    {
      icon: <FiLayers />,
      text: "Course Builder is where you create and organize a course.",
    },
    {
      icon: <FiCheckCircle />,
      text: "Add Topics to create lessons, quizzes, and assignments.",
    },
    {
      icon: <FiInfo />,
      text: "Additional Data appears on the course single page.",
    },
    {
      icon: <FiBell />,
      text: "Make announcements to notify enrolled students.",
    },
    {
      icon: <FiFileText />,
      text: "Add notes and important information for your students.",
    },
  ];

  return (
    <div className="w-full px-2 pb-10 sm:px-4 lg:px-6">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 xl:flex-row xl:items-start xl:gap-10">
        
        {/* ================= MAIN CONTENT ================= */}
        <div className="min-w-0 flex-1">
          
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <div className="mb-2 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-yellow-50 sm:h-10" />

              <h1 className="text-2xl font-bold tracking-tight text-richblack-5 sm:text-3xl lg:text-4xl">
                Add Course
              </h1>
            </div>

            <p className="ml-4 text-sm text-richblack-300 sm:text-base">
              Create and publish your course by following the steps below.
            </p>
          </div>

          {/* Render Steps */}
          <div className="rounded-xl border border-richblack-700 bg-richblack-800/40 p-3 shadow-[0_10px_40px_rgba(0,0,0,0.15)] sm:p-6 lg:p-8">
            <RenderSteps />
          </div>
        </div>

        {/* ================= COURSE TIPS ================= */}
        <aside className="w-full xl:sticky xl:top-8 xl:w-[350px] 2xl:w-[390px]">
          <div className="overflow-hidden rounded-xl border border-richblack-700 bg-richblack-800 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
            
            {/* Tips Header */}
            <div className="border-b border-richblack-700 bg-richblack-750 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-xl text-richblack-900">
                  ⚡
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-richblack-5">
                    Course Upload Tips
                  </h2>

                  <p className="mt-1 text-xs text-richblack-300">
                    Helpful guidelines while creating your course
                  </p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="p-5 sm:p-6">
              <div className="space-y-4">
                {tips.map((tip, index) => (
                  <div
                    key={index}
                    className="group flex gap-3 rounded-lg border border-transparent p-2 transition-all duration-200 hover:border-richblack-600 hover:bg-richblack-700/50"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-richblack-700 text-yellow-50 transition-all duration-200 group-hover:bg-yellow-50 group-hover:text-richblack-900">
                      {tip.icon}
                    </div>

                    <p className="text-xs leading-5 text-richblack-100 sm:text-sm">
                      {tip.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Note */}
            <div className="border-t border-richblack-700 bg-richblack-900/50 px-5 py-4 sm:px-6">
              <p className="text-xs leading-5 text-richblack-300">
                💡 <span className="text-richblack-100">Tip:</span> Make sure
                all required information is completed before publishing your
                course.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}