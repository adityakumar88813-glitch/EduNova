import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import {
  markLectureAsComplete,
} from "../../../services/operations/courseDetailsAPI"

import {
  updateCompletedLectures,
} from "../../../slices/viewCourseSlice"

import IconBtn from "../../common/IconBtn"


const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const { token } = useSelector((state) => state.auth)

  const {
    courseSectionData,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)


  // =========================================================
  // FIND CURRENT VIDEO
  // =========================================================

  useEffect(() => {
    if (
      !courseSectionData ||
      courseSectionData.length === 0
    ) {
      return
    }

    const currentSection = courseSectionData.find(
      (section) => section._id === sectionId
    )

    if (!currentSection) {
      console.log("Section not found:", sectionId)
      return
    }

    const currentVideo =
      currentSection.subSection?.find(
        (subSection) =>
          subSection._id === subSectionId
      )

    if (!currentVideo) {
      console.log(
        "SubSection not found:",
        subSectionId
      )
      return
    }


    // =======================================================
    // DEBUG
    // =======================================================

    console.log("========== CURRENT VIDEO ==========")
    console.log("Title:", currentVideo.title)
    console.log(
      "Video URL:",
      currentVideo.videoUrl
    )
    console.log(
      "Duration:",
      currentVideo.timeDuration
    )
    console.log("===================================")


    setVideoData(currentVideo)
    setVideoEnded(false)

  }, [
    courseSectionData,
    sectionId,
    subSectionId,
    location.pathname,
  ])


  // =========================================================
  // FIRST VIDEO
  // =========================================================

  const isFirstVideo = () => {

    if (
      !courseSectionData ||
      courseSectionData.length === 0
    ) {
      return false
    }

    const currentSectionIndex =
      courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

    if (currentSectionIndex === -1) {
      return false
    }

    const currentSubSectionIndex =
      courseSectionData[
        currentSectionIndex
      ]?.subSection?.findIndex(
        (data) => data._id === subSectionId
      )

    return (
      currentSectionIndex === 0 &&
      currentSubSectionIndex === 0
    )
  }


  // =========================================================
  // LAST VIDEO
  // =========================================================

  const isLastVideo = () => {

    if (
      !courseSectionData ||
      courseSectionData.length === 0
    ) {
      return false
    }

    const currentSectionIndex =
      courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

    if (currentSectionIndex === -1) {
      return false
    }

    const currentSubSectionIndex =
      courseSectionData[
        currentSectionIndex
      ]?.subSection?.findIndex(
        (data) => data._id === subSectionId
      )

    const lastSectionIndex =
      courseSectionData.length - 1

    const lastSubSectionIndex =
      courseSectionData[
        currentSectionIndex
      ]?.subSection?.length - 1

    return (
      currentSectionIndex === lastSectionIndex &&
      currentSubSectionIndex ===
        lastSubSectionIndex
    )
  }


  // =========================================================
  // NEXT VIDEO
  // =========================================================

  const goToNextVideo = () => {

    if (
      !courseSectionData ||
      courseSectionData.length === 0
    ) {
      return
    }

    const currentSectionIndex =
      courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

    if (currentSectionIndex === -1) {
      return
    }

    const currentSubSectionIndex =
      courseSectionData[
        currentSectionIndex
      ]?.subSection?.findIndex(
        (data) => data._id === subSectionId
      )

    const currentSection =
      courseSectionData[
        currentSectionIndex
      ]


    // =======================================================
    // NEXT VIDEO IN SAME SECTION
    // =======================================================

    if (
      currentSubSectionIndex <
      currentSection.subSection.length - 1
    ) {

      const nextSubSectionId =
        currentSection.subSection[
          currentSubSectionIndex + 1
        ]._id

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )

      return
    }


    // =======================================================
    // NEXT SECTION
    // =======================================================

    const nextSection =
      courseSectionData[
        currentSectionIndex + 1
      ]

    if (!nextSection) {
      return
    }

    const nextSubSectionId =
      nextSection.subSection?.[0]?._id

    if (!nextSubSectionId) {
      return
    }

    navigate(
      `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSubSectionId}`
    )
  }


  // =========================================================
  // PREVIOUS VIDEO
  // =========================================================

  const goToPrevVideo = () => {

    if (
      !courseSectionData ||
      courseSectionData.length === 0
    ) {
      return
    }

    const currentSectionIndex =
      courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

    if (currentSectionIndex === -1) {
      return
    }

    const currentSubSectionIndex =
      courseSectionData[
        currentSectionIndex
      ]?.subSection?.findIndex(
        (data) => data._id === subSectionId
      )


    // =======================================================
    // PREVIOUS VIDEO IN SAME SECTION
    // =======================================================

    if (currentSubSectionIndex > 0) {

      const prevSubSectionId =
        courseSectionData[
          currentSectionIndex
        ].subSection[
          currentSubSectionIndex - 1
        ]._id

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )

      return
    }


    // =======================================================
    // PREVIOUS SECTION
    // =======================================================

    const previousSection =
      courseSectionData[
        currentSectionIndex - 1
      ]

    if (!previousSection) {
      return
    }

    const previousSubSectionId =
      previousSection.subSection?.[
        previousSection.subSection.length - 1
      ]?._id

    if (!previousSubSectionId) {
      return
    }

    navigate(
      `/view-course/${courseId}/section/${previousSection._id}/sub-section/${previousSubSectionId}`
    )
  }


  // =========================================================
  // MARK LECTURE COMPLETE
  // =========================================================

  const handleLectureCompletion = async () => {

    try {

      setLoading(true)

      const res =
        await markLectureAsComplete(
          {
            courseId: courseId,
            subSectionId: subSectionId,
          },
          token
        )

      if (res) {

        dispatch(
          updateCompletedLectures(
            subSectionId
          )
        )
      }

    } catch (error) {

      console.log(
        "Error completing lecture:",
        error
      )

    } finally {

      setLoading(false)

    }
  }


  // =========================================================
  // LOADING
  // =========================================================

  if (!videoData) {

    return (
      <div className="flex min-h-[500px] items-center justify-center text-white">

        <div className="text-center">

          <div
            className="
              mx-auto
              mb-4
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-richblack-600
              border-t-yellow-50
            "
          />

          <p className="text-sm text-richblack-300">
            Loading video...
          </p>

        </div>

      </div>
    )
  }


  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="flex flex-col gap-5 text-white">


      {/* =====================================================
          VIDEO PLAYER
      ====================================================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-xl
          border
          border-richblack-700
          bg-black
          shadow-2xl
        "
      >

        <video
          key={videoData.videoUrl}
          className="
            aspect-video
            w-full
            bg-black
            object-contain
          "
          src={videoData.videoUrl}
          controls
          playsInline
          preload="metadata"
          onEnded={() => setVideoEnded(true)}
          onError={(error) => {
            console.error(
              "VIDEO PLAY ERROR:",
              error
            )
            console.log(
              "VIDEO URL:",
              videoData.videoUrl
            )
          }}
        />

      </div>


      {/* =====================================================
          VIDEO END SCREEN
      ====================================================== */}

      {videoEnded && (
        <div
          className="
            rounded-xl
            border
            border-richblack-700
            bg-richblack-800
            p-6
            text-center
          "
        >

          {/* =================================================
              COMPLETION BUTTON
          ================================================= */}

          {!completedLectures.includes(
            subSectionId
          ) && (

            <IconBtn
              disabled={loading}
              onclick={
                handleLectureCompletion
              }
              text={
                !loading
                  ? "Mark As Completed"
                  : "Loading..."
              }
              customClasses="
                mx-auto
                max-w-max
                px-5
                text-lg
              "
            />

          )}


          {/* =================================================
              REWATCH BUTTON
          ================================================= */}

          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setVideoEnded(false)

              const video =
                document.querySelector(
                  "video"
                )

              if (video) {
                video.currentTime = 0
                video.play()
              }
            }}
            className="
              mx-auto
              mt-3
              block
              rounded-lg
              border
              border-richblack-500
              bg-richblack-700
              px-5
              py-2
              text-lg
              font-semibold
              text-white
              transition-all
              hover:border-yellow-50
              hover:text-yellow-50
            "
          >
            Rewatch
          </button>


          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="mt-8 flex justify-center gap-4">

            {!isFirstVideo() && (

              <button
                disabled={loading}
                onClick={goToPrevVideo}
                className="
                  rounded-lg
                  border
                  border-richblack-500
                  bg-richblack-800
                  px-5
                  py-2
                  font-semibold
                  text-white
                  transition-all
                  hover:border-yellow-50
                  hover:text-yellow-50
                "
              >
                ← Prev
              </button>

            )}


            {!isLastVideo() && (

              <button
                disabled={loading}
                onClick={goToNextVideo}
                className="
                  rounded-lg
                  bg-yellow-50
                  px-5
                  py-2
                  font-semibold
                  text-richblack-900
                  transition-all
                  hover:bg-yellow-100
                "
              >
                Next →
              </button>

            )}

          </div>

        </div>
      )}


      {/* =====================================================
          VIDEO INFORMATION
      ====================================================== */}

      <div
        className="
          rounded-xl
          border
          border-richblack-700
          bg-richblack-800/50
          p-5
        "
      >

        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
          "
        >

          {/* =================================================
              TITLE
          ================================================= */}

          <div>

            <p
              className="
                mb-1
                text-xs
                uppercase
                tracking-wider
                text-yellow-50
              "
            >
              Current Lecture
            </p>

            <h1
              className="
                text-2xl
                font-bold
                text-white
              "
            >
              {videoData.title}
            </h1>

          </div>


          {/* =================================================
              DURATION
          ================================================= */}

          {videoData.timeDuration && (

            <div
              className="
                rounded-lg
                border
                border-richblack-600
                bg-richblack-700
                px-4
                py-2
                text-sm
                text-richblack-200
              "
            >
              ⏱ {videoData.timeDuration}
            </div>

          )}

        </div>


        {/* ===================================================
            DIVIDER
        ==================================================== */}

        <div className="my-4 h-px bg-richblack-700" />


        {/* ===================================================
            DESCRIPTION
        ==================================================== */}

        <p
          className="
            text-sm
            leading-6
            text-richblack-300
          "
        >
          {videoData.description}
        </p>

      </div>

    </div>
  )
}

export default VideoDetails