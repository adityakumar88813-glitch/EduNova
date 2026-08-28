import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"

import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"

import IconBtn from "../../../../common/IconBtn"
import NestedView from "./NestedView"

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)

  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)

  const dispatch = useDispatch()

  // Safe fallback when courseContent is undefined
  const courseContent = course?.courseContent || []

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true)

    let result

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course?._id,
        },
        token
      )
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course?._id,
        },
        token
      )
    }

    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }

    setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }

    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const goToNext = () => {
     console.log("COURSE CONTENT BEFORE NEXT:", courseContent)
    if (courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }

    if (
      courseContent.some(
        (section) =>
          !section.subSection || section.subSection.length === 0
      )
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }

    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

return (
  <div className="w-full overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800 shadow-xl shadow-black/20">

    {/* ================= HEADER ================= */}
    <div className="border-b border-richblack-700 bg-richblack-800 px-5 py-6 sm:px-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-50 shadow-[0_0_10px_rgba(255,214,10,0.5)]" />

            <h1 className="text-xl font-semibold text-richblack-5 sm:text-2xl">
              Course Builder
            </h1>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-richblack-300">
            Organize your course by creating sections and adding lectures.
            Build a clear learning path for your students.
          </p>
        </div>

        {/* Section count */}
        <div className="hidden rounded-xl border border-richblack-600 bg-richblack-700/60 px-4 py-3 text-center sm:block">
          <p className="text-xs text-richblack-300">
            Sections
          </p>

          <p className="mt-1 text-lg font-bold text-yellow-50">
            {courseContent.length}
          </p>
        </div>
      </div>
    </div>

    {/* ================= CONTENT ================= */}
    <div className="space-y-8 p-5 sm:p-7">

      {/* ================= ADD SECTION ================= */}
      <div className="rounded-xl border border-richblack-700 bg-richblack-900/40 p-5 sm:p-6">

        <div className="mb-5">
          <h2 className="text-base font-semibold text-richblack-5">
            {editSectionName
              ? "Edit Section"
              : "Create a New Section"}
          </h2>

          <p className="mt-1 text-xs leading-5 text-richblack-400">
            {editSectionName
              ? "Update the name of your section."
              : "Give your section a clear and descriptive name."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="flex flex-col space-y-2">
            <label
              className="text-sm font-medium text-richblack-5"
              htmlFor="sectionName"
            >
              Section Name
              <sup className="ml-1 text-pink-200">*</sup>
            </label>

            <input
              id="sectionName"
              disabled={loading}
              placeholder="e.g. Introduction to React"
              {...register("sectionName", {
                required: true,
              })}
              className="
                w-full rounded-xl
                border border-richblack-600
                bg-richblack-700
                px-4 py-3
                text-sm text-richblack-5
                placeholder:text-richblack-400
                outline-none
                transition-all duration-200

                hover:border-richblack-500

                focus:border-yellow-50/70
                focus:bg-richblack-700
                focus:ring-2
                focus:ring-yellow-50/10

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            />

            {errors.sectionName && (
              <span className="ml-1 text-xs text-pink-200">
                Section name is required
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">

            <IconBtn
              type="submit"
              disabled={loading}
              text={
                editSectionName
                  ? "Update Section"
                  : "Create Section"
              }
              outline={true}
            >
              <IoAddCircleOutline
                size={20}
                className="text-yellow-50"
              />
            </IconBtn>

            {editSectionName && (
              <button
                type="button"
                onClick={cancelEdit}
                disabled={loading}
                className="
                  rounded-lg
                  px-4 py-2
                  text-sm font-medium
                  text-richblack-300
                  transition-all duration-200

                  hover:bg-richblack-700
                  hover:text-richblack-5

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>
            )}

          </div>
        </form>
      </div>

      {/* ================= SECTIONS ================= */}
      {courseContent.length > 0 ? (
        <div className="space-y-4">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-richblack-5">
                Course Sections
              </h2>

              <p className="mt-1 text-xs text-richblack-400">
                Add lectures inside each section to complete your course.
              </p>
            </div>

            <span className="
              rounded-full
              border border-richblack-600
              bg-richblack-700
              px-3 py-1
              text-xs font-medium
              text-richblack-200
            ">
              {courseContent.length}{" "}
              {courseContent.length === 1 ? "Section" : "Sections"}
            </span>
          </div>

          <div className="rounded-xl border border-richblack-700 bg-richblack-900/30 p-3 sm:p-4">
            <NestedView
              handleChangeEditSectionName={
                handleChangeEditSectionName
              }
            />
          </div>

        </div>
      ) : (
        /* ================= EMPTY STATE ================= */
        <div className="
          flex flex-col
          items-center
          justify-center
          rounded-xl
          border border-dashed
          border-richblack-600
          bg-richblack-900/30
          px-6 py-12
          text-center
        ">
          <div className="
            mb-4 flex h-14 w-14
            items-center justify-center
            rounded-full
            border border-richblack-600
            bg-richblack-700
          ">
            <IoAddCircleOutline
              size={28}
              className="text-richblack-300"
            />
          </div>

          <h3 className="text-base font-semibold text-richblack-5">
            No sections yet
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-richblack-400">
            Start building your course by creating your first section
            above.
          </p>
        </div>
      )}
    </div>

    {/* ================= FOOTER ================= */}
    <div className="
      flex flex-col-reverse
      gap-3
      border-t border-richblack-700
      bg-richblack-900/30
      px-5 py-5
      sm:flex-row
      sm:items-center
      sm:justify-between
      sm:px-7
    ">

      {/* Back */}
      <button
        type="button"
        onClick={goBack}
        disabled={loading}
        className="
          flex w-full
          cursor-pointer
          items-center justify-center
          rounded-xl
          border border-richblack-600
          bg-richblack-700
          px-5 py-3
          text-sm font-semibold
          text-richblack-100
          transition-all duration-200

          hover:border-richblack-500
          hover:bg-richblack-600

          disabled:cursor-not-allowed
          disabled:opacity-50

          sm:w-auto
        "
      >
        Back
      </button>

      {/* Next */}
      <div className="w-full sm:w-auto">
        <IconBtn
          disabled={loading}
          text="Next"
          onclick={goToNext}
        >
          <MdNavigateNext className="text-xl" />
        </IconBtn>
      </div>

    </div>
  </div>
)
}