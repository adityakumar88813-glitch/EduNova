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
  console.log("SUBSECTION MODAL DATA =>", modalData)
  console.log("VIDEO URL =>", modalData?.videoUrl)
  console.log("VIEW =>", view)
  console.log("EDIT =>", edit)
  console.log("ADD =>", add)

  // =========================================================
  // FORM
  // =========================================================
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      lectureTitle: "",
      lectureDesc: "",
      lectureVideo: "",
    },
  })

  // =========================================================
  // REDUX
  // =========================================================
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  // =========================================================
  // INITIAL DATA FOR VIEW / EDIT
  // =========================================================
  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData?.title || "")
      setValue("lectureDesc", modalData?.description || "")
      setValue("lectureVideo", modalData?.videoUrl || "")
    }
  }, [view, edit, modalData, setValue])

  // =========================================================
  // GET ACTUAL VIDEO DURATION
  // Returns duration in seconds
  //
  // Example:
  // 2 min 30 sec => 150
  // =========================================================
  const getVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof File)) {
        reject(new Error("Invalid video file"))
        return
      }

      const video = document.createElement("video")

      video.preload = "metadata"

      const objectUrl = URL.createObjectURL(file)

      video.onloadedmetadata = () => {
        const duration = Math.floor(video.duration)

        URL.revokeObjectURL(objectUrl)

        if (!duration || duration <= 0) {
          reject(new Error("Invalid video duration"))
          return
        }

        console.log(
          "🎥 VIDEO DURATION:",
          duration,
          "seconds"
        )

        resolve(duration)
      }

      video.onerror = () => {
        URL.revokeObjectURL(objectUrl)

        reject(
          new Error("Could not read video duration")
        )
      }

      video.src = objectUrl
    })
  }

  // =========================================================
  // CHECK WHETHER FORM IS UPDATED
  // =========================================================
  const isFormUpdated = () => {
    const currentValues = getValues()

    const titleChanged =
      currentValues.lectureTitle !==
      (modalData?.title || "")

    const descriptionChanged =
      currentValues.lectureDesc !==
      (modalData?.description || "")

    const videoChanged =
      currentValues.lectureVideo !==
      (modalData?.videoUrl || "")

    return (
      titleChanged ||
      descriptionChanged ||
      videoChanged
    )
  }

  // =========================================================
  // HANDLE EDIT SUBSECTION
  // =========================================================
  const handleEditSubsection = async () => {
    const currentValues = getValues()

    const formData = new FormData()

    // Section ID
    formData.append(
      "sectionId",
      modalData?.sectionId
    )

    // SubSection ID
    formData.append(
      "subSectionId",
      modalData?._id
    )

    // =======================================================
    // TITLE
    // =======================================================
    if (
      currentValues.lectureTitle !==
      modalData?.title
    ) {
      formData.append(
        "title",
        currentValues.lectureTitle
      )
    }

    // =======================================================
    // DESCRIPTION
    // =======================================================
    if (
      currentValues.lectureDesc !==
      modalData?.description
    ) {
      formData.append(
        "description",
        currentValues.lectureDesc
      )
    }

    // =======================================================
    // NEW VIDEO
    // =======================================================
    if (
      currentValues.lectureVideo instanceof File
    ) {
      try {
        console.log(
          "🎬 NEW VIDEO SELECTED:",
          currentValues.lectureVideo.name
        )

        // Calculate actual duration
        const duration = await getVideoDuration(
          currentValues.lectureVideo
        )

        console.log(
          "⏱️ NEW VIDEO DURATION:",
          duration,
          "seconds"
        )

        // Send duration in seconds
        formData.append(
          "timeDuration",
          duration.toString()
        )

        // Backend expects videoFile
        formData.append(
          "videoFile",
          currentValues.lectureVideo
        )
      } catch (error) {
        console.error(
          "VIDEO DURATION ERROR:",
          error
        )

        toast.error(
          "Could not read video duration"
        )

        return
      }
    }

    // =======================================================
    // API CALL
    // =======================================================
    setLoading(true)

    try {
      const result = await updateSubSection(
        formData,
        token
      )

      console.log(
        "UPDATE SUBSECTION RESULT =>",
        result
      )

      if (result) {
        /*
          updateSubSection API generally returns
          updated section data.
        */

        const updatedCourseContent =
          course?.courseContent?.map(
            (section) =>
              section._id === modalData?.sectionId
                ? result
                : section
          )

        const updatedCourse = {
          ...course,
          courseContent:
            updatedCourseContent,
        }

        console.log(
          "UPDATED COURSE =>",
          updatedCourse
        )

        dispatch(
          setCourse(updatedCourse)
        )

        toast.success(
          "Lecture updated successfully"
        )

        setModalData(null)
      }
    } catch (error) {
      console.error(
        "UPDATE SUBSECTION ERROR:",
        error
      )

      toast.error(
        "Failed to update lecture"
      )
    } finally {
      setLoading(false)
    }
  }

  // =========================================================
  // FORM SUBMIT
  // =========================================================
  const onSubmit = async (data) => {
    // =======================================================
    // VIEW MODE
    // =======================================================
    if (view) {
      return
    }

    // =======================================================
    // EDIT MODE
    // =======================================================
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
        return
      }

      await handleEditSubsection()
      return
    }

    // =======================================================
    // CREATE NEW SUBSECTION
    // =======================================================
    if (!data.lectureVideo) {
      toast.error("Please upload a video")
      return
    }

    const formData = new FormData()

    // Section ID
    formData.append(
      "sectionId",
      modalData
    )

    // Lecture title
    formData.append(
      "title",
      data.lectureTitle
    )

    // Lecture description
    formData.append(
      "description",
      data.lectureDesc
    )

    // =======================================================
    // VIDEO DURATION
    // =======================================================
    try {
      const duration =
        await getVideoDuration(
          data.lectureVideo
        )

      console.log(
        "⏱️ CREATE VIDEO DURATION:",
        duration,
        "seconds"
      )

      /*
        IMPORTANT:
        Save seconds, NOT "MM:SS"

        Example:
        02:30 ❌
        150  ✅
      */

      formData.append(
        "timeDuration",
        duration.toString()
      )
    } catch (error) {
      console.error(
        "VIDEO DURATION ERROR:",
        error
      )

      toast.error(
        "Could not read video duration"
      )

      return
    }

    // =======================================================
    // VIDEO FILE
    // Backend expects videoFile
    // =======================================================
    formData.append(
      "videoFile",
      data.lectureVideo
    )

    // =======================================================
    // API CALL
    // =======================================================
    setLoading(true)

    try {
      const result = await createSubSection(
        formData,
        token
      )

      console.log(
        "CREATE SUBSECTION RESULT =>",
        result
      )

      if (result) {
        /*
          Backend returns updated section.
        */

        const updatedCourseContent =
          course?.courseContent?.map(
            (section) =>
              section._id === modalData
                ? result
                : section
          )

        const updatedCourse = {
          ...course,
          courseContent:
            updatedCourseContent,
        }

        console.log(
          "UPDATED COURSE =>",
          updatedCourse
        )

        dispatch(
          setCourse(updatedCourse)
        )

        toast.success(
          "Lecture created successfully"
        )

        setModalData(null)
      }
    } catch (error) {
      console.error(
        "CREATE SUBSECTION ERROR:",
        error
      )

      toast.error(
        "Failed to create lecture"
      )
    } finally {
      setLoading(false)
    }
  }

  // =========================================================
  // UI
  // =========================================================
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 flex min-h-screen w-screen items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md sm:p-6">
      <div className="relative my-6 w-full max-w-[760px] overflow-hidden rounded-2xl border border-richblack-600/80 bg-richblack-800 shadow-2xl shadow-black/40">

        {/* =================================================
            TOP ACCENT
        ================================================= */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-50/70 to-transparent" />

        {/* =================================================
            HEADER
        ================================================= */}
        <div className="flex items-center justify-between border-b border-richblack-600 bg-richblack-700/80 px-5 py-5 backdrop-blur-xl sm:px-7">

          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-yellow-50/20 bg-yellow-50/10">
                <span className="text-sm font-bold text-yellow-50">
                  ▶
                </span>
              </div>

              <p className="text-lg font-semibold tracking-tight text-richblack-5 sm:text-xl">
                {view && "Viewing"}
                {add && "Adding"}
                {edit && "Editing"} Lecture
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

          {/* CLOSE */}
          <button
            type="button"
            disabled={loading}
            onClick={() =>
              !loading &&
              setModalData(null)
            }
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              border border-richblack-600
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

        {/* =================================================
            FORM
        ================================================= */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-7 px-5 py-6 sm:px-7 sm:py-8"
        >

          {/* =================================================
              VIDEO UPLOAD
          ================================================= */}
          <div className="rounded-2xl border border-richblack-600 bg-richblack-900/30 p-4 sm:p-5">

            <div className="mb-4">

              <p className="text-sm font-semibold text-richblack-5">
                Lecture Video

                {!view && (
                  <sup className="ml-1 text-pink-200">
                    *
                  </sup>
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
              viewData={
                view
                  ? modalData?.videoUrl
                  : null
              }
              editData={
                edit
                  ? modalData?.videoUrl
                  : null
              }
            />
          </div>

          {/* =================================================
              TITLE
          ================================================= */}
          <div className="space-y-2">

            <label
              className="flex items-center gap-1 text-sm font-semibold text-richblack-5"
              htmlFor="lectureTitle"
            >
              Lecture Title

              {!view && (
                <sup className="text-pink-200">
                  *
                </sup>
              )}
            </label>

            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register(
                "lectureTitle",
                {
                  required:
                    "Lecture title is required",
                }
              )}
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

                <span>
                  {errors.lectureTitle.message}
                </span>
              </div>
            )}

          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}
          <div className="space-y-2">

            <label
              className="flex items-center gap-1 text-sm font-semibold text-richblack-5"
              htmlFor="lectureDesc"
            >
              Lecture Description

              {!view && (
                <sup className="text-pink-200">
                  *
                </sup>
              )}
            </label>

            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register(
                "lectureDesc",
                {
                  required:
                    "Lecture description is required",
                }
              )}
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

                <span>
                  {errors.lectureDesc.message}
                </span>

              </div>
            )}

          </div>

          {/* =================================================
              ACTION BUTTON
          ================================================= */}
          {!view && (
            <div className="flex justify-end border-t border-richblack-700 pt-5">

              <IconBtn
                type="submit"
                disabled={loading}
                text={
                  loading
                    ? "Loading..."
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