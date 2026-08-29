import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { FiCheckCircle, FiPlayCircle, FiStar } from "react-icons/fi"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")

  const navigate = useNavigate()
  const location = useLocation()

  const { sectionId, subSectionId } = useParams()

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  // =========================================================
  // SET ACTIVE SECTION & SUBSECTION
  // =========================================================
  useEffect(() => {
    if (!courseSectionData || courseSectionData.length === 0) {
      return
    }

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    if (currentSectionIndex === -1) {
      return
    }

    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex]?.subSection?.findIndex(
        (data) => data._id === subSectionId
      )

    const activeSubSectionId =
      courseSectionData[currentSectionIndex]?.subSection?.[
        currentSubSectionIndex
      ]?._id

    setActiveStatus(courseSectionData[currentSectionIndex]?._id)
    setVideoBarActive(activeSubSectionId || "")
  }, [
    courseSectionData,
    courseEntireData,
    sectionId,
    subSectionId,
    location.pathname,
  ])

  // =========================================================
  // CALCULATE PROGRESS
  // =========================================================
  const completedCount = completedLectures?.length || 0
  const totalLectures = totalNoOfLectures || 0

  const progress =
    totalLectures > 0
      ? Math.round((completedCount / totalLectures) * 100)
      : 0

  return (
    <aside className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-richblack-700 bg-richblack-900 shadow-2xl">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="border-b border-richblack-700 bg-richblack-800 px-5 py-5">

        {/* Top Actions */}
        <div className="flex items-center justify-between gap-3">

          {/* Back Button */}
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/enrolled-courses")
            }}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl border border-richblack-600
              bg-richblack-700 text-richblack-100
              transition-all duration-200
              hover:-translate-x-0.5
              hover:border-richblack-400
              hover:bg-richblack-600
            "
            title="Back to enrolled courses"
          >
            <IoIosArrowBack size={22} />
          </button>

          {/* Review Button */}
          <button
            type="button"
            onClick={() => setReviewModal(true)}
            className="
              flex items-center gap-2
              rounded-xl border border-yellow-50/20
              bg-yellow-50/10 px-3 py-2
              text-xs font-semibold text-yellow-50
              transition-all duration-200
              hover:border-yellow-50/40
              hover:bg-yellow-50/15
            "
          >
            <FiStar />
            Add Review
          </button>
        </div>

        {/* Course Information */}
        <div className="mt-6">

          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-yellow-50">
            Course
          </p>

          <h2 className="line-clamp-2 text-lg font-bold leading-6 text-richblack-5">
            {courseEntireData?.courseName}
          </h2>

          {/* Progress */}
          <div className="mt-5">

            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-richblack-300">
                Course Progress
              </span>

              <span className="font-semibold text-richblack-100">
                {completedCount}/{totalLectures}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-richblack-600">
              <div
                className="h-full rounded-full bg-yellow-50 transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-[11px] text-richblack-500">
                {progress}% completed
              </span>

              {progress === 100 && (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-green-300">
                  <FiCheckCircle />
                  Completed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          COURSE CONTENT
      ===================================================== */}
      <div className="flex-1 overflow-y-auto">

        {/* Content Header */}
        <div className="sticky top-0 z-10 border-b border-richblack-700 bg-richblack-900/95 px-5 py-3 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-wider text-richblack-400">
            Course Content
          </p>
        </div>

        {/* Sections */}
        <div className="pb-6">

          {courseSectionData?.map((course, index) => {

            const isActiveSection =
              activeStatus === course?._id

            const sectionCompleted =
              course?.subSection?.length > 0 &&
              course.subSection.every((topic) =>
                completedLectures?.includes(topic?._id)
              )

            return (
              <div
                key={course?._id || index}
                className="border-b border-richblack-700/60"
              >

                {/* =================================================
                    SECTION HEADER
                ================================================= */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveStatus(
                      isActiveSection ? "" : course?._id
                    )
                  }}
                  className={`
                    flex w-full items-center justify-between
                    px-5 py-4 text-left
                    transition-all duration-200
                    ${
                      isActiveSection
                        ? "bg-richblack-800"
                        : "bg-richblack-900 hover:bg-richblack-800/70"
                    }
                  `}
                >

                  <div className="flex min-w-0 items-center gap-3">

                    {/* Section Number */}
                    <div
                      className={`
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        rounded-lg text-xs font-bold
                        ${
                          sectionCompleted
                            ? "bg-green-400/10 text-green-300"
                            : isActiveSection
                            ? "bg-yellow-50/10 text-yellow-50"
                            : "bg-richblack-700 text-richblack-300"
                        }
                      `}
                    >
                      {sectionCompleted ? (
                        <FiCheckCircle />
                      ) : (
                        index + 1
                      )}
                    </div>

                    {/* Section Name */}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-richblack-100">
                        {course?.sectionName}
                      </p>

                      <p className="mt-0.5 text-[10px] text-richblack-500">
                        {course?.subSection?.length || 0}{" "}
                        {course?.subSection?.length === 1
                          ? "lecture"
                          : "lectures"}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <span
                    className={`
                      ml-3 shrink-0
                      text-richblack-300
                      transition-transform duration-300
                      ${
                        isActiveSection
                          ? "rotate-180 text-yellow-50"
                          : "rotate-0"
                      }
                    `}
                  >
                    <BsChevronDown size={15} />
                  </span>
                </button>

                {/* =================================================
                    SUBSECTIONS
                ================================================= */}
                {isActiveSection && (
                  <div className="bg-richblack-900/70 px-3 pb-3">

                    {course?.subSection?.map((topic, i) => {

                      const isActive =
                        videoBarActive === topic?._id

                      const isCompleted =
                        completedLectures?.includes(topic?._id)

                      return (
                        <button
                          type="button"
                          key={topic?._id || i}
                          onClick={() => {
                            navigate(
                              `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                            )

                            setVideoBarActive(topic?._id)
                          }}
                          className={`
                            group flex w-full items-center
                            gap-3 rounded-xl px-3 py-3
                            text-left transition-all duration-200
                            ${
                              isActive
                                ? "bg-yellow-50 text-richblack-900 shadow-lg"
                                : "text-richblack-200 hover:bg-richblack-800 hover:text-white"
                            }
                          `}
                        >

                          {/* Status Icon */}
                          <div
                            className={`
                              flex h-8 w-8 shrink-0
                              items-center justify-center
                              rounded-lg
                              ${
                                isActive
                                  ? "bg-richblack-900/10"
                                  : isCompleted
                                  ? "bg-green-400/10"
                                  : "bg-richblack-800"
                              }
                            `}
                          >
                            {isCompleted ? (
                              <FiCheckCircle
                                className={
                                  isActive
                                    ? "text-richblack-900"
                                    : "text-green-300"
                                }
                                size={15}
                              />
                            ) : (
                              <FiPlayCircle
                                className={
                                  isActive
                                    ? "text-richblack-900"
                                    : "text-richblack-400 group-hover:text-yellow-50"
                                }
                                size={15}
                              />
                            )}
                          </div>

                          {/* Lecture Info */}
                          <div className="min-w-0 flex-1">

                            <p className="truncate text-xs font-semibold">
                              {topic?.title}
                            </p>

                            <div className="mt-1 flex items-center gap-2">

                              <span
                                className={`
                                  text-[10px]
                                  ${
                                    isActive
                                      ? "text-richblack-700"
                                      : "text-richblack-500"
                                  }
                                `}
                              >
                                Lecture {i + 1}
                              </span>

                              {topic?.timeDuration && (
                                <>
                                  <span
                                    className={
                                      isActive
                                        ? "text-richblack-500"
                                        : "text-richblack-700"
                                    }
                                  >
                                    •
                                  </span>

                                  <span
                                    className={`
                                      text-[10px]
                                      ${
                                        isActive
                                          ? "text-richblack-700"
                                          : "text-richblack-500"
                                      }
                                    `}
                                  >
                                    {topic.timeDuration}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Active Indicator */}
                          {isActive && (
                            <div className="h-2 w-2 shrink-0 rounded-full bg-richblack-900" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <div className="border-t border-richblack-700 bg-richblack-800 px-5 py-3">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400" />

            <span className="text-[10px] font-medium text-richblack-400">
              Learning Progress
            </span>
          </div>

          <span className="text-[10px] font-semibold text-richblack-300">
            {progress}%
          </span>

        </div>
      </div>
    </aside>
  )
}