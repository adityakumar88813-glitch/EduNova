
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions || [])
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList])

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
  <div className="w-full space-y-3">
    {/* Label */}
    <label
      className="text-sm font-medium text-richblack-5"
      htmlFor={name}
    >
      {label}
      <sup className="ml-1 text-pink-200">*</sup>
    </label>

    {/* Input + Add Button */}
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleAddRequirement()
            }
          }}
          placeholder="Enter a course requirement..."
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
            focus:ring-2
            focus:ring-yellow-50/10
          "
        />
      </div>

      <button
        type="button"
        onClick={handleAddRequirement}
        className="
          flex w-full
          items-center justify-center
          rounded-xl
          bg-yellow-50
          px-6 py-3
          text-sm font-semibold
          text-richblack-900
          transition-all duration-200
          hover:bg-yellow-100
          hover:shadow-[0_0_20px_rgba(255,214,10,0.12)]
          active:scale-[0.98]
          sm:w-auto
        "
      >
        Add Requirement
      </button>
    </div>

    {/* Helper Text */}
    <p className="px-1 text-xs text-richblack-400">
      Add requirements one by one. Press{" "}
      <span className="font-medium text-richblack-200">
        Enter
      </span>{" "}
      or click the button to add.
    </p>

    {/* Requirements List */}
    {requirementsList.length > 0 && (
      <div className="mt-5 rounded-xl border border-richblack-700 bg-richblack-900/40 p-4">
        {/* List Header */}
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-richblack-300">
            Course Requirements
          </p>

          <span className="rounded-full bg-richblack-700 px-2.5 py-1 text-[10px] font-medium text-richblack-300">
            {requirementsList.length}{" "}
            {requirementsList.length === 1
              ? "Requirement"
              : "Requirements"}
          </span>
        </div>

        {/* List */}
        <ul className="space-y-2">
          {requirementsList.map((requirement, index) => (
            <li
              key={index}
              className="
                group flex
                items-start
                justify-between
                gap-3
                rounded-lg
                border border-richblack-700
                bg-richblack-800
                px-3 py-3
                transition-all duration-200
                hover:border-richblack-500
              "
            >
              {/* Number + Requirement */}
              <div className="flex min-w-0 items-start gap-3">
                <span
                  className="
                    flex h-6 w-6
                    shrink-0
                    items-center justify-center
                    rounded-full
                    bg-yellow-50/10
                    text-[11px]
                    font-semibold
                    text-yellow-50
                  "
                >
                  {index + 1}
                </span>

                <span className="break-words pt-0.5 text-sm leading-5 text-richblack-100">
                  {requirement}
                </span>
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="
                  shrink-0
                  rounded-md
                  px-2 py-1
                  text-xs
                  text-richblack-400
                  transition-all duration-200
                  hover:bg-pink-200/10
                  hover:text-pink-200
                  focus:outline-none
                "
                aria-label={`Remove requirement ${index + 1}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Error */}
    {errors[name] && (
      <div className="flex items-center gap-2 px-1 text-xs text-pink-200">
        <span className="h-1 w-1 rounded-full bg-pink-200" />
        <span>{label} is required</span>
      </div>
    )}
  </div>
)
}