import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)

  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)

      const categories = await fetchCourseCategories()

      console.log("CATEGORIES RECEIVED IN FORM =>", categories)

      if (Array.isArray(categories)) {
        setCourseCategories(categories)
      } else {
        setCourseCategories([])
      }

      setLoading(false)
    }

    // ================= EDIT MODE =================
    if (editCourse && course) {
      setValue("courseTitle", course?.courseName || "")
      setValue("courseShortDesc", course?.courseDescription || "")
      setValue("coursePrice", course?.price ?? "")
      setValue("courseTags", course?.tag || [])
      setValue("courseBenefits", course?.whatYouWillLearn || "")
      setValue("courseCategory", course?.category?._id || "")
      setValue("courseRequirements", course?.instructions || [])
      setValue("courseImage", course?.thumbnail || "")
    }

    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCourse, course])

  // ================= CHECK FORM UPDATED =================
  const isFormUpdated = () => {
    const currentValues = getValues()

    const currentTags = currentValues.courseTags || []
    const oldTags = course?.tag || []

    const currentRequirements = currentValues.courseRequirements || []
    const oldRequirements = course?.instructions || []

    if (
      currentValues.courseTitle !== course?.courseName ||
      currentValues.courseShortDesc !== course?.courseDescription ||
      currentValues.coursePrice !== course?.price ||
      currentTags.toString() !== oldTags.toString() ||
      currentValues.courseBenefits !== course?.whatYouWillLearn ||
      currentValues.courseCategory !== course?.category?._id ||
      currentRequirements.toString() !== oldRequirements.toString() ||
      currentValues.courseImage !== course?.thumbnail
    ) {
      return true
    }

    return false
  }

  // ================= SUBMIT =================
  const onSubmit = async (data) => {
    console.log("FORM DATA =>", data)

    // =====================================================
    // EDIT COURSE
    // =====================================================
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues()

        const formData = new FormData()

        formData.append("courseId", course?._id)

        // Course Title
        if (currentValues.courseTitle !== course?.courseName) {
          formData.append("courseName", data.courseTitle)
        }

        // Course Description
        if (
          currentValues.courseShortDesc !== course?.courseDescription
        ) {
          formData.append(
            "courseDescription",
            data.courseShortDesc
          )
        }

        // Price
        if (currentValues.coursePrice !== course?.price) {
          formData.append("price", data.coursePrice)
        }

        // Tags
        if (
          (currentValues.courseTags || []).toString() !==
          (course?.tag || []).toString()
        ) {
          formData.append(
            "tag",
            JSON.stringify(data.courseTags || [])
          )
        }

        // Benefits
        if (
          currentValues.courseBenefits !==
          course?.whatYouWillLearn
        ) {
          formData.append(
            "whatYouWillLearn",
            data.courseBenefits
          )
        }

        // Category
        if (
          currentValues.courseCategory !==
          course?.category?._id
        ) {
          formData.append(
            "category",
            data.courseCategory
          )
        }

        // Requirements
        if (
          (currentValues.courseRequirements || []).toString() !==
          (course?.instructions || []).toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements || [])
          )
        }

        // Thumbnail
        if (
          currentValues.courseImage !==
          course?.thumbnail
        ) {
          formData.append(
            "thumbnailImage",
            data.courseImage
          )
        }

        console.log("Edit Form Data Created")

        setLoading(true)

        const result = await editCourseDetails(
          formData,
          token
        )

        setLoading(false)

        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }

      return
    }

    // =====================================================
    // ADD NEW COURSE
    // =====================================================

    const formData = new FormData()

    formData.append(
      "courseName",
      data.courseTitle
    )

    formData.append(
      "courseDescription",
      data.courseShortDesc
    )

    formData.append(
      "price",
      data.coursePrice
    )

    formData.append(
      "tag",
      JSON.stringify(data.courseTags || [])
    )

    formData.append(
      "whatYouWillLearn",
      data.courseBenefits
    )

    formData.append(
      "category",
      data.courseCategory
    )

    formData.append(
      "status",
      COURSE_STATUS.DRAFT
    )

    formData.append(
      "instructions",
      JSON.stringify(data.courseRequirements || [])
    )

    formData.append(
      "thumbnailImage",
      data.courseImage
    )

    setLoading(true)

    const result = await addCourseDetails(
      formData,
      token
    )

    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }

    setLoading(false)
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        mx-auto w-full max-w-4xl
        space-y-8
        rounded-2xl
        border border-richblack-700
        bg-richblack-800
        p-5
        shadow-xl shadow-black/10
        sm:p-7
        lg:p-8
      "
    >
      {/* ================= HEADER ================= */}

      <div className="border-b border-richblack-700 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-50" />

          <h2 className="text-xl font-semibold text-richblack-5 sm:text-2xl">
            Course Information
          </h2>
        </div>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-richblack-400">
          Provide the basic information about your course.
          This information will be visible to students.
        </p>
      </div>

      {/* ================= COURSE TITLE ================= */}

      <div className="space-y-2">
        <label
          htmlFor="courseTitle"
          className="text-sm font-medium text-richblack-5"
        >
          Course Title
          <sup className="ml-1 text-pink-200">*</sup>
        </label>

        <input
          id="courseTitle"
          placeholder="e.g. Complete MERN Stack Development Course"
          {...register("courseTitle", {
            required: true,
          })}
          className="
            w-full rounded-xl
            border border-richblack-600
            bg-richblack-700
            px-4 py-3.5
            text-sm text-richblack-5
            placeholder:text-richblack-400
            outline-none
            transition
            focus:border-yellow-50/60
            focus:ring-2
            focus:ring-yellow-50/10
          "
        />

        {errors.courseTitle && (
          <p className="px-1 text-xs text-pink-200">
            Course title is required
          </p>
        )}
      </div>

      {/* ================= SHORT DESCRIPTION ================= */}

      <div className="space-y-2">
        <label
          htmlFor="courseShortDesc"
          className="text-sm font-medium text-richblack-5"
        >
          Course Short Description
          <sup className="ml-1 text-pink-200">*</sup>
        </label>

        <textarea
          id="courseShortDesc"
          placeholder="Write a short and attractive description of your course..."
          {...register("courseShortDesc", {
            required: true,
          })}
          className="
            min-h-[120px]
            w-full resize-none
            rounded-xl
            border border-richblack-600
            bg-richblack-700
            px-4 py-3.5
            text-sm leading-6
            text-richblack-5
            placeholder:text-richblack-400
            outline-none
            transition
            focus:border-yellow-50/60
            focus:ring-2
            focus:ring-yellow-50/10
          "
        />

        {errors.courseShortDesc && (
          <p className="px-1 text-xs text-pink-200">
            Course description is required
          </p>
        )}
      </div>

      {/* ================= PRICE + CATEGORY ================= */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* PRICE */}

        <div className="space-y-2">
          <label
            htmlFor="coursePrice"
            className="text-sm font-medium text-richblack-5"
          >
            Course Price
            <sup className="ml-1 text-pink-200">*</sup>
          </label>

          <div className="relative">
            <HiOutlineCurrencyRupee
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-xl
                text-richblack-400
              "
            />

            <input
              id="coursePrice"
              type="number"
              min="0"
              placeholder="Enter course price"
              {...register("coursePrice", {
                required: true,
                valueAsNumber: true,
              })}
              className="
                w-full rounded-xl
                border border-richblack-600
                bg-richblack-700
                py-3.5 pl-11 pr-4
                text-sm text-richblack-5
                placeholder:text-richblack-400
                outline-none
                transition
                focus:border-yellow-50/60
                focus:ring-2
                focus:ring-yellow-50/10
              "
            />
          </div>

          {errors.coursePrice && (
            <p className="px-1 text-xs text-pink-200">
              Course price is required
            </p>
          )}
        </div>

        {/* CATEGORY */}

        <div className="space-y-2">
          <label
            htmlFor="courseCategory"
            className="text-sm font-medium text-richblack-5"
          >
            Course Category
            <sup className="ml-1 text-pink-200">*</sup>
          </label>

          <select
            id="courseCategory"
            defaultValue=""
            {...register("courseCategory", {
              required: true,
            })}
            className="
              w-full cursor-pointer
              rounded-xl
              border border-richblack-600
              bg-richblack-700
              px-4 py-3.5
              text-sm
              text-richblack-5
              outline-none
              transition
              focus:border-yellow-50/60
              focus:ring-2
              focus:ring-yellow-50/10
            "
          >
            <option value="" disabled>
              {loading
                ? "Loading categories..."
                : "Choose a category"}
            </option>

            {!loading &&
              courseCategories?.map((category) => (
                <option
                  key={category?._id}
                  value={category?._id}
                >
                  {category?.name || category?.Name}
                </option>
              ))}
          </select>

          {errors.courseCategory && (
            <p className="px-1 text-xs text-pink-200">
              Course category is required
            </p>
          )}
        </div>
      </div>

      {/* ================= TAGS ================= */}

      <div>
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
      </div>

      {/* ================= THUMBNAIL ================= */}

      <div>
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={
            editCourse
              ? course?.thumbnail
              : null
          }
        />
      </div>

      {/* ================= BENEFITS ================= */}

      <div className="space-y-2">
        <label
          htmlFor="courseBenefits"
          className="text-sm font-medium text-richblack-5"
        >
          Benefits of the Course
          <sup className="ml-1 text-pink-200">*</sup>
        </label>

        <textarea
          id="courseBenefits"
          placeholder="What will students learn or achieve from this course?"
          {...register("courseBenefits", {
            required: true,
          })}
          className="
            min-h-[120px]
            w-full resize-none
            rounded-xl
            border border-richblack-600
            bg-richblack-700
            px-4 py-3.5
            text-sm leading-6
            text-richblack-5
            placeholder:text-richblack-400
            outline-none
            transition
            focus:border-yellow-50/60
            focus:ring-2
            focus:ring-yellow-50/10
          "
        />

        {errors.courseBenefits && (
          <p className="px-1 text-xs text-pink-200">
            Benefits of the course is required
          </p>
        )}
      </div>

      {/* ================= REQUIREMENTS ================= */}

      <div>
        <RequirementsField
          name="courseRequirements"
          label="Requirements / Instructions"
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
        />
      </div>

      {/* ================= ACTION BUTTONS ================= */}

      <div
        className="
          flex flex-col-reverse
          gap-3
          border-t border-richblack-700
          pt-6
          sm:flex-row
          sm:justify-end
        "
      >
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="
              w-full rounded-xl
              border border-richblack-500
              bg-richblack-700
              px-6 py-3
              text-sm font-semibold
              text-richblack-100
              transition
              hover:bg-richblack-600
              disabled:opacity-50
              sm:w-auto
            "
          >
            Continue Without Saving
          </button>
        )}

        <div className="w-full sm:w-auto">
          <IconBtn
            disabled={loading}
            text={
              loading
                ? "Saving..."
                : !editCourse
                ? "Next"
                : "Save Changes"
            }
          >
            <MdNavigateNext className="text-xl" />
          </IconBtn>
        </div>
      </div>
    </form>
  )
}