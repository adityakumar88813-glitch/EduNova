import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import {
  FiUploadCloud,
  FiX,
  FiCheckCircle,
  FiPlayCircle,
} from "react-icons/fi"

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
  const [selectedFile, setSelectedFile] = useState(null)

  const [previewSource, setPreviewSource] = useState(
    viewData || editData || ""
  )

  // =====================================================
  // FILE SELECT / DROP
  // =====================================================
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles?.[0]

    if (!file) return

    setSelectedFile(file)

    // Local preview
    const previewURL = URL.createObjectURL(file)
    setPreviewSource(previewURL)
  }

  // =====================================================
  // DROPZONE
  // =====================================================
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video
      ? {
          "video/mp4": [".mp4"],
          "video/webm": [".webm"],
          "video/quicktime": [".mov"],
        }
      : {
          "image/jpeg": [".jpeg", ".jpg"],
          "image/png": [".png"],
          "image/webp": [".webp"],
        },

    maxFiles: 1,
    multiple: false,
    onDrop,
  })

  // =====================================================
  // REGISTER FIELD
  // =====================================================
  useEffect(() => {
    register(name, {
      required: !viewData,
    })
  }, [register, name, viewData])

  // =====================================================
  // SET SELECTED FILE IN REACT-HOOK-FORM
  // =====================================================
  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, name, setValue])

  // =====================================================
  // CLEANUP LOCAL VIDEO / IMAGE URL
  // =====================================================
  useEffect(() => {
    return () => {
      if (previewSource?.startsWith("blob:")) {
        URL.revokeObjectURL(previewSource)
      }
    }
  }, [previewSource])

  // =====================================================
  // REMOVE FILE
  // =====================================================
  const removeFile = () => {
    if (previewSource?.startsWith("blob:")) {
      URL.revokeObjectURL(previewSource)
    }

    setPreviewSource("")
    setSelectedFile(null)
    setValue(name, null)
  }

  return (
    <div className="w-full space-y-4">

      {/* =====================================================
          LABEL
      ====================================================== */}
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
          <div className="
            flex
            items-center
            gap-1.5
            rounded-full
            border
            border-green-300/20
            bg-green-300/10
            px-3
            py-1
            text-xs
            font-medium
            text-green-300
          ">
            <FiCheckCircle className="text-sm" />

            <span>Selected</span>
          </div>
        )}
      </div>

      {/* =====================================================
          MAIN UPLOAD BOX
      ====================================================== */}
      <div
        className={`
          group
          relative
          w-full
          overflow-hidden
          rounded-2xl
          border
          backdrop-blur-xl
          transition-all
          duration-300

          ${
            isDragActive
              ? "border-yellow-50/70 bg-yellow-50/[0.04]"
              : errors[name]
              ? "border-pink-300/60 bg-richblack-800/80"
              : "border-richblack-600 bg-richblack-800/70 hover:border-richblack-500"
          }
        `}
      >

        {/* =====================================================
            FILE EXISTS
        ====================================================== */}
        {previewSource ? (

          <div className="relative w-full p-4 sm:p-5">

            {/* =================================================
                IMAGE PREVIEW
            ================================================== */}
            {!video ? (

              <div className="
                relative
                overflow-hidden
                rounded-xl
                border
                border-richblack-600
                bg-richblack-900
              ">

                <img
                  src={previewSource}
                  alt="Preview"
                  className="
                    aspect-video
                    w-full
                    object-cover
                  "
                />

                <div className="absolute left-3 top-3">
                  <span className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-richblack-900/80
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-richblack-100
                  ">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-50" />
                    Image Preview
                  </span>
                </div>

              </div>

            ) : (

              /* =================================================
                 VIDEO PREVIEW
              ================================================== */

              <div className="
                relative
                overflow-hidden
                rounded-xl
                border
                border-richblack-600
                bg-black
              ">

                <video
                  key={previewSource}
                  src={previewSource}
                  controls
                  playsInline
                  preload="metadata"
                  className="
                    aspect-video
                    h-auto
                    w-full
                    bg-black
                    object-contain
                  "
                >
                  Your browser does not support the video tag.
                </video>

                {/* Video badge */}
                <div className="
                  pointer-events-none
                  absolute
                  left-3
                  top-3
                ">
                  <span className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-richblack-900/80
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-richblack-100
                  ">
                    <FiPlayCircle className="text-sm" />

                    Video Preview
                  </span>
                </div>

              </div>
            )}

            {/* =================================================
                SELECTED FILE DETAILS
            ================================================== */}
            {selectedFile && (
              <div className="
                mt-4
                flex
                items-center
                justify-between
                gap-4
                rounded-xl
                border
                border-richblack-600
                bg-richblack-900/50
                px-4
                py-3
              ">

                <div className="min-w-0">

                  <p className="
                    truncate
                    text-sm
                    font-semibold
                    text-richblack-5
                  ">
                    {selectedFile.name}
                  </p>

                  <p className="
                    mt-1
                    text-xs
                    text-richblack-400
                  ">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>

                </div>

                {!viewData && (
                  <button
                    type="button"
                    onClick={removeFile}
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-richblack-600
                      bg-richblack-700
                      text-richblack-300
                      transition-all
                      hover:border-pink-300/50
                      hover:bg-pink-300/10
                      hover:text-pink-200
                    "
                    title="Remove file"
                  >
                    <FiX className="text-lg" />
                  </button>
                )}

              </div>
            )}

            {/* =================================================
                CHANGE FILE
            ================================================== */}
            {!viewData && (
              <div
                {...getRootProps()}
                className="
                  mt-4
                  flex
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-dashed
                  border-richblack-600
                  bg-richblack-900/30
                  px-4
                  py-4
                  text-center
                  transition-all
                  hover:border-yellow-50/50
                  hover:bg-yellow-50/[0.03]
                "
              >

                <input {...getInputProps()} />

                <span className="text-xs text-richblack-300">

                  Want to change the file?{" "}

                  <span className="font-semibold text-yellow-50">
                    Browse another
                  </span>

                </span>

              </div>
            )}

          </div>

        ) : (

          /* =====================================================
             EMPTY UPLOAD AREA
          ====================================================== */

          <div
            {...getRootProps()}
            className="
              relative
              flex
              min-h-[320px]
              w-full
              cursor-pointer
              flex-col
              items-center
              justify-center
              px-5
              py-10
              text-center
              sm:min-h-[360px]
              sm:px-8
            "
          >

            <input {...getInputProps()} />

            {/* =================================================
                UPLOAD ICON
            ================================================== */}
            <div
              className={`
                relative
                mb-6
                flex
                h-[78px]
                w-[78px]
                items-center
                justify-center
                rounded-2xl
                border
                transition-all
                duration-300

                ${
                  isDragActive
                    ? "scale-110 border-yellow-50/50 bg-yellow-50/10"
                    : "border-richblack-600 bg-richblack-700/80 group-hover:scale-105 group-hover:border-yellow-50/30"
                }
              `}
            >

              <FiUploadCloud
                className={`
                  text-3xl

                  ${
                    isDragActive
                      ? "text-yellow-50"
                      : "text-richblack-200 group-hover:text-yellow-50"
                  }
                `}
              />

              <span
                className={`
                  absolute
                  -right-1
                  -top-1
                  h-3
                  w-3
                  rounded-full
                  border-2
                  border-richblack-800

                  ${
                    isDragActive
                      ? "bg-yellow-50"
                      : "bg-richblack-500 group-hover:bg-yellow-50"
                  }
                `}
              />

            </div>

            {/* =================================================
                HEADING
            ================================================== */}
            <h3 className="
              text-lg
              font-semibold
              text-richblack-5
              sm:text-xl
            ">
              {isDragActive
                ? `Drop your ${video ? "video" : "image"} here`
                : `Upload your ${video ? "video" : "image"}`}
            </h3>

            {/* =================================================
                DESCRIPTION
            ================================================== */}
            <p className="
              mt-2
              max-w-[400px]
              text-sm
              leading-6
              text-richblack-300
            ">
              Drag & drop your file here, or{" "}

              <span className="font-semibold text-yellow-50">
                browse
              </span>{" "}

              from your device
            </p>

            {/* =================================================
                DIVIDER
            ================================================== */}
            <div className="
              my-7
              flex
              w-full
              max-w-[400px]
              items-center
              gap-4
            ">

              <div className="h-px flex-1 bg-richblack-600" />

              <span className="
                rounded-full
                border
                border-richblack-600
                bg-richblack-700/60
                px-3
                py-1
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-richblack-400
              ">
                OR
              </span>

              <div className="h-px flex-1 bg-richblack-600" />

            </div>

            {/* =================================================
                REQUIREMENTS
            ================================================== */}
            <div className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-2
            ">

              <span className="
                rounded-lg
                border
                border-richblack-600
                bg-richblack-700/70
                px-3
                py-1.5
                text-xs
                font-medium
                text-richblack-300
              ">
                {video ? "MP4 / WEBM / MOV" : "JPG / PNG / WEBP"}
              </span>

              <span className="
                rounded-lg
                border
                border-richblack-600
                bg-richblack-700/70
                px-3
                py-1.5
                text-xs
                font-medium
                text-richblack-300
              ">
                16:9 Ratio
              </span>

              <span className="
                rounded-lg
                border
                border-richblack-600
                bg-richblack-700/70
                px-3
                py-1.5
                text-xs
                font-medium
                text-richblack-300
              ">
                1024 × 576
              </span>

            </div>

            <p className="
              mt-5
              text-xs
              text-richblack-500
            ">
              Click anywhere in this area to select a file
            </p>

          </div>
        )}

      </div>

      {/* =====================================================
          ERROR MESSAGE
      ====================================================== */}
            {/* ERROR MESSAGE */}
      {errors?.[name] && (
        <div className="flex items-center gap-2 px-1 text-xs text-pink-200">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-200" />

          <span>{label} is required</span>
        </div>
      )}
    </div>
  )
}