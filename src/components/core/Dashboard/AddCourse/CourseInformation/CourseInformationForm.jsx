
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

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      console.log("CATEGORIES RECEIVED IN FORM =>", categories)

if (Array.isArray(categories)) {
  setCourseCategories(categories)
} 
      if (categories.length > 0) {
        // console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editCourseDetails(formData, token)
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

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }
return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="
      w-full space-y-7
      rounded-2xl
      border border-richblack-700
      bg-richblack-800
      p-4
      shadow-xl shadow-black/10
      sm:p-6
      lg:p-8
    "
  >
    {/* ================= HEADER ================= */}
    <div className="border-b border-richblack-700 pb-6">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-yellow-50" />

        <h2 className="text-xl font-semibold text-richblack-5 sm:text-2xl">
          Course Information
        </h2>
      </div>

      <p className="mt-2 text-xs leading-5 text-richblack-400 sm:text-sm">
        Provide the basic information about your course. This information
        will be visible to students.
      </p>
    </div>

    {/* ================= COURSE TITLE ================= */}
    <div className="flex flex-col space-y-2">
      <label
        className="text-sm font-medium text-richblack-5"
        htmlFor="courseTitle"
      >
        Course Title
        <sup className="ml-1 text-pink-200">*</sup>
      </label>

      <input
        id="courseTitle"
        placeholder="e.g. Complete MERN Stack Development Course"
        {...register("courseTitle", { required: true })}
        className="
          w-full rounded-xl
          border border-richblack-600
          bg-richblack-700
          px-4 py-3
          text-sm text-richblack-5
          outline-none
          transition-all duration-200
          placeholder:text-richblack-400
          focus:border-yellow-50/60
          focus:bg-richblack-700
          focus:ring-2
          focus:ring-yellow-50/10
        "
      />

      {errors.courseTitle && (
        <span className="px-1 text-xs text-pink-200">
          Course title is required
        </span>
      )}
    </div>

    {/* ================= SHORT DESCRIPTION ================= */}
    <div className="flex flex-col space-y-2">
      <label
        className="text-sm font-medium text-richblack-5"
        htmlFor="courseShortDesc"
      >
        Course Short Description
        <sup className="ml-1 text-pink-200">*</sup>
      </label>

      <textarea
        id="courseShortDesc"
        placeholder="Write a short and attractive description of your course..."
        {...register("courseShortDesc", { required: true })}
        className="
          min-h-[140px]
          w-full
          resize-none
          rounded-xl
          border border-richblack-600
          bg-richblack-700
          px-4 py-3
          text-sm leading-6
          text-richblack-5
          outline-none
          transition-all duration-200
          placeholder:text-richblack-400
          focus:border-yellow-50/60
          focus:ring-2
          focus:ring-yellow-50/10
        "
      />

      {errors.courseShortDesc && (
        <span className="px-1 text-xs text-pink-200">
          Course description is required
        </span>
      )}
    </div>

    {/* ================= PRICE + CATEGORY ================= */}
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* PRICE */}
      <div className="flex flex-col space-y-2">
        <label
          className="text-sm font-medium text-richblack-5"
          htmlFor="coursePrice"
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
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="
              w-full rounded-xl
              border border-richblack-600
              bg-richblack-700
              py-3 pl-11 pr-4
              text-sm text-richblack-5
              outline-none
              transition-all duration-200
              placeholder:text-richblack-400
              focus:border-yellow-50/60
              focus:ring-2
              focus:ring-yellow-50/10
            "
          />
        </div>

        {errors.coursePrice && (
          <span className="px-1 text-xs text-pink-200">
            Course price is required
          </span>
        )}
      </div>

      {/* CATEGORY */}
      <div className="flex flex-col space-y-2">
        <label
          className="text-sm font-medium text-richblack-5"
          htmlFor="courseCategory"
        >
          Course Category
          <sup className="ml-1 text-pink-200">*</sup>
        </label>
<select
  {...register("courseCategory", {
    required: true,
  })}
  defaultValue=""
  id="courseCategory"
  className="
    w-full
    cursor-pointer
    appearance-none
    rounded-xl
    border border-richblack-600
    bg-richblack-700
    px-4 py-3
    pr-10
    text-sm
    font-medium
    text-richblack-5
    outline-none
    transition-all duration-200

    hover:border-richblack-400

    focus:border-yellow-50
    focus:ring-2
    focus:ring-yellow-50/20

    [&>option]:bg-richblack-800
    [&>option]:text-richblack-5
  "
>
          <option value="" disabled>
            Choose a category
          </option>

          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.Name}
              </option>
            ))}
        </select>

        {errors.courseCategory && (
          <span className="px-1 text-xs text-pink-200">
            Course category is required
          </span>
        )}
      </div>
    </div>

    {/* ================= TAGS ================= */}
    <div className="rounded-xl border border-richblack-700 bg-richblack-900/30 p-4 sm:p-5">
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
    <div className="rounded-xl border border-richblack-700 bg-richblack-900/30 p-4 sm:p-5">
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
    </div>

    {/* ================= BENEFITS ================= */}
    <div className="flex flex-col space-y-2">
      <label
        className="text-sm font-medium text-richblack-5"
        htmlFor="courseBenefits"
      >
        Benefits of the Course
        <sup className="ml-1 text-pink-200">*</sup>
      </label>

      <textarea
        id="courseBenefits"
        placeholder="What will students learn or achieve from this course?"
        {...register("courseBenefits", { required: true })}
        className="
          min-h-[140px]
          w-full
          resize-none
          rounded-xl
          border border-richblack-600
          bg-richblack-700
          px-4 py-3
          text-sm leading-6
          text-richblack-5
          outline-none
          transition-all duration-200
          placeholder:text-richblack-400
          focus:border-yellow-50/60
          focus:ring-2
          focus:ring-yellow-50/10
        "
      />

      {errors.courseBenefits && (
        <span className="px-1 text-xs text-pink-200">
          Benefits of the course is required
        </span>
      )}
    </div>

    {/* ================= REQUIREMENTS ================= */}
    <div className="rounded-xl border border-richblack-700 bg-richblack-900/30 p-4 sm:p-5">
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
            flex w-full
            cursor-pointer
            items-center justify-center
            rounded-xl
            border border-richblack-500
            bg-richblack-700
            px-5 py-3
            text-sm font-semibold
            text-richblack-100
            transition-all duration-200
            hover:border-richblack-400
            hover:bg-richblack-600
            disabled:cursor-not-allowed
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
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext className="text-xl" />
        </IconBtn>
      </div>
    </div>
  </form>
)
}