import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud, FiX, FiCheckCircle } from "react-icons/fi"
import { useSelector } from "react-redux"

import "video-react/dist/video-react.css"
import { Player } from "video-react"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course)

  const [selectedFile, setSelectedFile] = useState(null)

  const [previewSource, setPreviewSource] = useState(
    viewData || editData || ""
  )

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles?.[0]

    if (!file) return

    setSelectedFile(file)
    previewFile(file)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video
      ? {
          "video/mp4": [".mp4"],
        }
      : {
          "image/jpeg": [".jpeg", ".jpg"],
          "image/png": [".png"],
        },
    maxFiles: 1,
    multiple: false,
    onDrop,
  })

  const previewFile = (file) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, {
      required: !viewData,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile])

  const removeFile = () => {
    setPreviewSource("")
    setSelectedFile(null)
    setValue(name, null)
  }

 return (
  <div className="w-full space-y-4">
    {/* ================= LABEL ================= */}
    <div className="flex items-center justify-between px-1">
      <label
        htmlFor={name}
        className="text-sm font-semibold tracking-wide text-richblack-5"
      >
        {label}

        {!viewData && (
          <sup className="ml-1 text-pink-200">*</sup>
        )}
      </label>

      {selectedFile && (
        <div className="flex items-center gap-1.5 rounded-full border border-green-300/20 bg-green-300/10 px-3 py-1 text-xs font-medium text-green-300">
          <FiCheckCircle className="text-sm" />
          <span>Uploaded</span>
        </div>
      )}
    </div>

    {/* ================= MAIN UPLOAD BOX ================= */}
    <div
      className={`
        group relative w-full overflow-hidden rounded-2xl
        border
        backdrop-blur-xl
        transition-all duration-300
        ${
          isDragActive
            ? "border-yellow-50/70 bg-yellow-50/[0.04] shadow-[0_0_40px_rgba(255,214,10,0.10)]"
            : errors[name]
            ? "border-pink-300/60 bg-richblack-800/80"
            : "border-richblack-600 bg-richblack-800/70 hover:border-richblack-500 hover:bg-richblack-800"
        }
      `}
    >
      {/* Subtle top gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-50/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {previewSource ? (
        /* ================= PREVIEW ================= */
        <div className="relative w-full p-4 sm:p-5">
          {/* Preview */}
          <div className="relative overflow-hidden rounded-xl border border-richblack-600 bg-richblack-900 shadow-lg">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="
                  aspect-video
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-[1.01]
                "
              />
            ) : (
              <div className="aspect-video w-full overflow-hidden bg-black">
                <Player
                  aspectRatio="16:9"
                  playsInline
                  src={previewSource}
                />
              </div>
            )}

            {/* Preview Badge */}
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-richblack-900/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-richblack-100 shadow-lg backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-50" />
                {video ? "Video Preview" : "Image Preview"}
              </span>
            </div>
          </div>

          {/* File Information */}
          {selectedFile && (
            <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-richblack-600 bg-richblack-900/50 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-richblack-5">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-xs text-richblack-400">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>

              {!viewData && (
                <button
                  type="button"
                  onClick={removeFile}
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-lg
                    border border-richblack-600
                    bg-richblack-700
                    text-richblack-300
                    transition-all duration-200
                    hover:border-pink-300/50
                    hover:bg-pink-300/10
                    hover:text-pink-200
                    hover:shadow-[0_0_15px_rgba(255,100,150,0.08)]
                  "
                  title="Remove file"
                >
                  <FiX className="text-lg" />
                </button>
              )}
            </div>
          )}

          {/* Change File */}
          {!viewData && (
            <div
              {...getRootProps()}
              className="
                mt-4 flex cursor-pointer
                items-center justify-center
                rounded-xl
                border border-dashed
                border-richblack-600
                bg-richblack-900/30
                px-4 py-3.5
                text-center
                transition-all duration-200
                hover:border-yellow-50/50
                hover:bg-yellow-50/[0.03]
              "
            >
              <input {...getInputProps()} />

              <span className="text-xs text-richblack-300">
                Want to change the file?{" "}
                <span className="font-semibold text-yellow-50 transition-colors hover:text-yellow-100">
                  Browse another
                </span>
              </span>
            </div>
          )}
        </div>
      ) : (
        /* ================= UPLOAD ================= */
        <div
          {...getRootProps()}
          className="
            relative flex min-h-[300px]
            w-full cursor-pointer
            flex-col items-center justify-center
            px-5 py-10
            text-center
            sm:min-h-[340px]
            sm:px-8
          "
        >
          <input {...getInputProps()} />

          {/* Glow */}
          <div
            className={`
              pointer-events-none absolute left-1/2 top-1/2
              h-40 w-40 -translate-x-1/2 -translate-y-1/2
              rounded-full blur-3xl
              transition-opacity duration-500
              ${
                isDragActive
                  ? "bg-yellow-50/10 opacity-100"
                  : "bg-yellow-50/5 opacity-0 group-hover:opacity-100"
              }
            `}
          />

          {/* Upload Icon */}
          <div
            className={`
              relative mb-6
              flex h-[76px] w-[76px]
              items-center justify-center
              rounded-2xl
              border
              transition-all duration-300
              ${
                isDragActive
                  ? "scale-110 border-yellow-50/50 bg-yellow-50/10 shadow-[0_0_30px_rgba(255,214,10,0.12)]"
                  : "border-richblack-600 bg-richblack-700/80 group-hover:scale-105 group-hover:border-yellow-50/30 group-hover:bg-yellow-50/5"
              }
            `}
          >
            <FiUploadCloud
              className={`
                text-3xl
                transition-all duration-300
                ${
                  isDragActive
                    ? "text-yellow-50"
                    : "text-richblack-200 group-hover:text-yellow-50"
                }
              `}
            />

            {/* Small status dot */}
            <span
              className={`
                absolute -right-1 -top-1
                h-3 w-3 rounded-full
                border-2 border-richblack-800
                transition-all duration-300
                ${
                  isDragActive
                    ? "bg-yellow-50 shadow-[0_0_10px_rgba(255,214,10,0.8)]"
                    : "bg-richblack-500 group-hover:bg-yellow-50"
                }
              `}
            />
          </div>

          {/* Heading */}
          <h3 className="relative text-lg font-semibold tracking-tight text-richblack-5 sm:text-xl">
            {isDragActive
              ? `Drop your ${video ? "video" : "image"} here`
              : `Upload your ${video ? "video" : "image"}`}
          </h3>

          {/* Description */}
          <p className="relative mt-2 max-w-[360px] text-sm leading-6 text-richblack-300">
            Drag & drop your file here, or{" "}
            <span className="font-semibold text-yellow-50 transition-colors group-hover:text-yellow-100">
              browse
            </span>{" "}
            from your device
          </p>

          {/* Divider */}
          <div className="relative my-7 flex w-full max-w-[380px] items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-richblack-600" />

            <span className="rounded-full border border-richblack-600 bg-richblack-700/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-richblack-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-richblack-600" />
          </div>

          {/* Requirements */}
          <div className="relative flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-lg border border-richblack-600 bg-richblack-700/70 px-3 py-1.5 text-[10px] font-medium text-richblack-300 transition-all duration-200 hover:border-richblack-500 hover:text-richblack-200 sm:text-xs">
              {video ? "MP4" : "JPG / PNG"}
            </span>

            <span className="rounded-lg border border-richblack-600 bg-richblack-700/70 px-3 py-1.5 text-[10px] font-medium text-richblack-300 transition-all duration-200 hover:border-richblack-500 hover:text-richblack-200 sm:text-xs">
              16:9 Ratio
            </span>

            <span className="rounded-lg border border-richblack-600 bg-richblack-700/70 px-3 py-1.5 text-[10px] font-medium text-richblack-300 transition-all duration-200 hover:border-richblack-500 hover:text-richblack-200 sm:text-xs">
              1024 × 576
            </span>
          </div>

          {/* Bottom hint */}
          <p className="relative mt-5 text-[10px] text-richblack-500">
            Click anywhere in this area to select a file
          </p>
        </div>
      )}
    </div>

    {/* ================= ERROR ================= */}
    {errors[name] && (
      <div className="flex items-center gap-2 px-1 text-xs text-pink-200">
        <span className="h-1.5 w-1.5 rounded-full bg-pink-200" />
        <span>{label} is required</span>
      </div>
    )}
  </div>
)
}