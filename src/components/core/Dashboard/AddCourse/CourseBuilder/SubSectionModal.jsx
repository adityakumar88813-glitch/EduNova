import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  // console.log("view", view)
  // console.log("edit", edit)
  // console.log("add", add)

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    if (view || edit) {
      // console.log("modalData", modalData)
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, [])

  // =========================================================
  // GET ACTUAL VIDEO DURATION
  // =========================================================
  const getVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video")

      video.preload = "metadata"

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src)
        resolve(video.duration)
      }

      video.onerror = () => {
        window.URL.revokeObjectURL(video.src)
        reject(new Error("Could not read video duration"))
      }

      video.src = URL.createObjectURL(file)
    })
  }

  // =========================================================
  // FORMAT DURATION
  // Example:
  // 11 sec       -> 00:11
  // 1 min 25 sec -> 01:25
  // =========================================================
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration % 60)

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`
  }

  // detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)

    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true
    }

    return false
  }

  // =========================================================
  // HANDLE EDITING OF SUBSECTION

  const handleEditSubsection = async () => {
    const currentValues = getValues()

    // console.log("changes after editing form values:", currentValues)

    const formData = new FormData()

    // console.log("Values After Editing form values:", currentValues)

    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }

    // =========================================================
    // UPDATE VIDEO + ACTUAL DURATION
    // =========================================================
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      // IMPORTANT:
      // Backend expects "videoFile", not "video"
      formData.append("videoFile", currentValues.lectureVideo)

      try {
        // Calculate duration only when a new File is selected
        if (currentValues.lectureVideo instanceof File) {
          const duration = await getVideoDuration(
            currentValues.lectureVideo
          )

          const formattedDuration = formatDuration(duration)

          formData.append("timeDuration", formattedDuration)
        }
      } catch (error) {
        console.error("Video duration error:", error)
        toast.error("Could not read video duration")
        return
      }
    }

    setLoading(true)

    const result = await updateSubSection(formData, token)

    if (result) {
      // console.log("result", result)

      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )

      const updatedCourse = {
        ...course,
        courseContent: updatedCourseContent,
      }

      dispatch(setCourse(updatedCourse))
    }

    setModalData(null)
    setLoading(false)
  }

  // =========================================================
  // FORM SUBMIT
  // =========================================================
  const onSubmit = async (data) => {
    // console.log(data)

    if (view) return

    // =========================================================
    // EDIT
    // =========================================================
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        await handleEditSubsection()
      }

      return
    }

    // =========================================================
    // CREATE NEW SUBSECTION
    // =========================================================
    const formData = new FormData()

    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)

    // =========================================================
    // GET ACTUAL VIDEO DURATION
    // =========================================================
    try {
      const duration = await getVideoDuration(data.lectureVideo)

      const formattedDuration = formatDuration(duration)

      formData.append("timeDuration", formattedDuration)
    } catch (error) {
      console.error("Video duration error:", error)
      toast.error("Could not read video duration")
      return
    }

    // Backend expects videoFile
    formData.append("videoFile", data.lectureVideo)

    setLoading(true)

    const result = await createSubSection(formData, token)

    if (result) {
      // console.log("result", result)

      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )

      const updatedCourse = {
        ...course,
        courseContent: updatedCourseContent,
      }

      dispatch(setCourse(updatedCourse))
    }

    setModalData(null)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 flex min-h-screen w-screen items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md sm:p-6">
      <div className="relative my-6 w-full max-w-[760px] overflow-hidden rounded-2xl border border-richblack-600/80 bg-richblack-800 shadow-2xl shadow-black/40">

        {/* Top Accent */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-50/70 to-transparent" />

        {/* ================= MODAL HEADER ================= */}
        <div className="flex items-center justify-between border-b border-richblack-600 bg-richblack-700/80 px-5 py-5 backdrop-blur-xl sm:px-7">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-yellow-50/20 bg-yellow-50/10">
                <span className="text-sm font-bold text-yellow-50">
                  ▶
                </span>
              </div>

              <p className="text-lg font-semibold tracking-tight text-richblack-5 sm:text-xl">
                {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
              </p>
            </div>

            <p className="mt-1.5 ml-12 text-xs text-richblack-400">
              {view
                ? "Watch and review your lecture"
                : edit
                ? "Update your lecture details"
                : "Add a new lecture to this section"}
            </p>
          </div>

          {/* Close Button */}
          <button
            type="button"
            disabled={loading}
            onClick={() => (!loading ? setModalData(null) : {})}
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl border border-richblack-600
              bg-richblack-800/70
              text-richblack-300
              transition-all duration-200
              hover:border-pink-300/40
              hover:bg-pink-300/10
              hover:text-pink-200
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RxCross2 className="text-xl" />
          </button>
        </div>

        {/* ================= MODAL FORM ================= */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-7 px-5 py-6 sm:px-7 sm:py-8"
        >

          {/* ================= VIDEO UPLOAD ================= */}
          <div className="rounded-2xl border border-richblack-600 bg-richblack-900/30 p-4 sm:p-5">
            <div className="mb-4">
              <p className="text-sm font-semibold text-richblack-5">
                Lecture Video
                {!view && (
                  <sup className="ml-1 text-pink-200">*</sup>
                )}
              </p>

              <p className="mt-1 text-xs text-richblack-400">
                Upload the video students will watch in this lecture.
              </p>
            </div>

            <Upload
              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
            />
          </div>

          {/* ================= LECTURE TITLE ================= */}
          <div className="space-y-2">
            <label
              className="flex items-center gap-1 text-sm font-semibold text-richblack-5"
              htmlFor="lectureTitle"
            >
              Lecture Title

              {!view && (
                <sup className="text-pink-200">*</sup>
              )}
            </label>

            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="
                w-full rounded-xl
                border border-richblack-600
                bg-richblack-700
                px-4 py-3.5
                text-sm text-richblack-5
                placeholder:text-richblack-400
                outline-none
                transition-all duration-200
                hover:border-richblack-500
                focus:border-yellow-50/60
                focus:bg-richblack-700
                focus:ring-2
                focus:ring-yellow-50/10
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            />

            {errors.lectureTitle && (
              <div className="flex items-center gap-2 px-1 text-xs text-pink-200">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-200" />
                <span>Lecture title is required</span>
              </div>
            )}
          </div>

          {/* ================= LECTURE DESCRIPTION ================= */}
          <div className="space-y-2">
            <label
              className="flex items-center gap-1 text-sm font-semibold text-richblack-5"
              htmlFor="lectureDesc"
            >
              Lecture Description

              {!view && (
                <sup className="text-pink-200">*</sup>
              )}
            </label>

            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="
                min-h-[140px] w-full resize-none
                rounded-xl
                border border-richblack-600
                bg-richblack-700
                px-4 py-3.5
                text-sm leading-6 text-richblack-5
                placeholder:text-richblack-400
                outline-none
                transition-all duration-200
                hover:border-richblack-500
                focus:border-yellow-50/60
                focus:bg-richblack-700
                focus:ring-2
                focus:ring-yellow-50/10
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            />

            {errors.lectureDesc && (
              <div className="flex items-center gap-2 px-1 text-xs text-pink-200">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-200" />
                <span>Lecture description is required</span>
              </div>
            )}
          </div>

          {/* ================= ACTION ================= */}
          {!view && (
            <div className="flex justify-end border-t border-richblack-700 pt-5">
              <IconBtn
                disabled={loading}
                text={
                  loading
                    ? "Loading.."
                    : edit
                    ? "Save Changes"
                    : "Save"
                }
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}