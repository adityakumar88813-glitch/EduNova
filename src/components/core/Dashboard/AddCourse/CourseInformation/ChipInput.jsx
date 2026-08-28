import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { FiTag, FiPlus } from "react-icons/fi"
import { useSelector } from "react-redux"

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)

  const [chips, setChips] = useState([])

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag || [])
    }

    register(name, {
      required: true,
      validate: (value) =>
        value?.length > 0 || `${label} is required`,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, chips, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }, [chips, name, setValue])

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()

      const chipValue = event.target.value.trim()

      if (chipValue && !chips.includes(chipValue)) {
        setChips((prev) => [...prev, chipValue])
        event.target.value = ""
      }
    }
  }

  const handleDeleteChip = (chipIndex) => {
    setChips((prev) =>
      prev.filter((_, index) => index !== chipIndex)
    )
  }

  return (
    <div className="w-full space-y-3">
      {/* Label */}
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="text-sm font-medium text-richblack-5"
        >
          {label}
          <sup className="ml-1 text-pink-200">*</sup>
        </label>

        {chips.length > 0 && (
          <span className="text-xs text-richblack-400">
            {chips.length} {chips.length === 1 ? "tag" : "tags"}
          </span>
        )}
      </div>

      {/* Main Input Container */}
      <div
        className={`
          min-h-[130px] w-full rounded-2xl
          border bg-richblack-800
          p-3 transition-all duration-300
          ${
            errors[name]
              ? "border-pink-300/60"
              : "border-richblack-600 focus-within:border-yellow-50/50 focus-within:shadow-[0_0_25px_rgba(255,214,10,0.06)]"
          }
        `}
      >
        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          {chips.map((chip, index) => (
            <div
              key={`${chip}-${index}`}
              className="
                group flex max-w-full
                items-center gap-1.5
                rounded-full
                border border-yellow-50/20
                bg-yellow-50/10
                px-3 py-1.5
                text-xs font-medium
                text-yellow-50
                transition-all duration-200
                hover:border-yellow-50/40
                hover:bg-yellow-50/15
              "
            >
              {/* Tag Icon */}
              <FiTag className="shrink-0 text-[12px]" />

              {/* Chip Text */}
              <span className="max-w-[200px] truncate sm:max-w-[300px]">
                {chip}
              </span>

              {/* Delete */}
              <button
                type="button"
                onClick={() => handleDeleteChip(index)}
                aria-label={`Remove ${chip}`}
                className="
                  ml-0.5 flex h-5 w-5
                  items-center justify-center
                  rounded-full
                  text-yellow-50/70
                  transition-all duration-200
                  hover:bg-pink-200/15
                  hover:text-pink-200
                  focus:outline-none
                "
              >
                <MdClose className="text-sm" />
              </button>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="mt-3 flex items-center gap-2">
          <FiPlus className="ml-1 shrink-0 text-lg text-richblack-400" />

          <input
            id={name}
            name={name}
            type="text"
            placeholder={
              chips.length > 0
                ? "Add another tag..."
                : placeholder || "Enter a tag..."
            }
            onKeyDown={handleKeyDown}
            className="
              min-w-0 flex-1
              bg-transparent
              py-2
              text-sm
              text-richblack-5
              outline-none
              placeholder:text-richblack-500
            "
          />
        </div>
      </div>

      {/* Helper Text */}
      {!errors[name] && (
        <div className="flex flex-wrap items-center gap-2 px-1 text-xs text-richblack-400">
          <span className="rounded-md bg-richblack-800 px-2 py-1">
            Press <span className="text-richblack-200">Enter</span>
          </span>

          <span>or</span>

          <span className="rounded-md bg-richblack-800 px-2 py-1">
            press <span className="text-richblack-200">,</span>
          </span>

          <span>to add a tag</span>
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