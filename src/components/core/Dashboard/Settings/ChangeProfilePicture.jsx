import { useEffect, useRef, useState } from "react";
import {
  FiCheck,
  FiImage,
  FiUpload,
  FiX,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  // ================= SELECT IMAGE =================
  const handleClick = () => {
    if (!loading) {
      fileInputRef.current?.click();
    }
  };

  // ================= FILE CHANGE =================
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check image type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a JPG, PNG, GIF or WEBP image.");
      return;
    }

    // Check size - 5 MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    setImageFile(file);
  };

  // ================= PREVIEW =================
  useEffect(() => {
    if (!imageFile) {
      setPreviewSource(null);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPreviewSource(reader.result);
    };

    reader.readAsDataURL(imageFile);

    return () => {
      reader.onload = null;
    };
  }, [imageFile]);

  // ================= UPLOAD =================
  const handleFileUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image first.");
      return;
    }

    if (!token) {
      toast.error("Please login again.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("displayPicture", imageFile);

      console.log("Uploading:", imageFile.name);

      await dispatch(
        updateDisplayPicture(token, formData)
      );

      toast.success("Profile picture updated successfully!");

      // Keep uploaded preview
      // Don't immediately remove preview

      setImageFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(
        "PROFILE PICTURE UPDATE ERROR:",
        error
      );

      toast.error("Could not update profile picture.");
    } finally {
      setLoading(false);
    }
  };

  // ================= CANCEL =================
  const handleCancel = () => {
    setImageFile(null);
    setPreviewSource(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800 shadow-lg">

      {/* ================= HEADER ================= */}
      <div className="border-b border-richblack-700 px-6 py-5 md:px-8">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-50 text-richblack-900 shadow">
            <FiImage size={21} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-richblack-5">
              Profile Picture
            </h2>

            <p className="mt-1 text-xs text-richblack-400">
              Update your profile photo
            </p>
          </div>

        </div>

      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-col gap-7 p-6 md:flex-row md:items-center md:p-8">

        {/* ================= IMAGE ================= */}
        <div className="relative mx-auto shrink-0 md:mx-0">

          <img
            src={
              previewSource ||
              user?.image ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${
                user?.firstName || "User"
              }`
            }
            alt={`profile-${user?.firstName || "user"}`}
            className="h-28 w-28 rounded-full border-4 border-richblack-700 object-cover shadow-xl md:h-32 md:w-32"
          />

          {/* New image indicator */}
          {previewSource && (
            <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white shadow-lg">
              <FiCheck size={17} />
            </div>
          )}

        </div>

        {/* ================= DETAILS ================= */}
        <div className="flex-1">

          <h3 className="text-base font-semibold text-richblack-5">
            {imageFile
              ? "New profile picture selected"
              : "Choose a profile picture"}
          </h3>

          <p className="mt-1 max-w-[500px] text-sm leading-6 text-richblack-400">
            Upload a clear profile picture. This image will be displayed
            across your EduNova profile.
          </p>

          {/* File info */}
          {imageFile && (
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-richblack-600 bg-richblack-700/50 p-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-richblack-600">
                <FiImage className="text-yellow-50" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-richblack-5">
                  {imageFile.name}
                </p>

                <p className="text-xs text-richblack-400">
                  {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

            </div>
          )}

          {/* ================= BUTTONS ================= */}
          <div className="mt-5 flex flex-wrap gap-3">

            {/* Select */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png,image/jpeg,image/gif,image/webp"
            />

            <button
              type="button"
              onClick={handleClick}
              disabled={loading}
              className="rounded-lg bg-richblack-700 px-5 py-2.5 text-sm font-semibold text-richblack-5 transition hover:bg-richblack-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Select Image
            </button>

            {/* Cancel */}
            {imageFile && (
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg border border-richblack-600 px-5 py-2.5 text-sm font-semibold text-richblack-200 transition hover:bg-richblack-700 disabled:opacity-50"
              >
                <FiX size={17} />
                Cancel
              </button>
            )}

            {/* Upload */}
            <button
              type="button"
              onClick={handleFileUpload}
              disabled={!imageFile || loading}
              className="flex items-center gap-2 rounded-lg bg-yellow-50 px-5 py-2.5 text-sm font-semibold text-richblack-900 transition hover:bg-yellow-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiUpload size={17} />

              {loading ? "Uploading..." : "Upload"}
            </button>

          </div>

          {/* Requirements */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-richblack-400">
            <span>✓ JPG</span>
            <span>✓ PNG</span>
            <span>✓ GIF</span>
            <span>✓ WEBP</span>
            <span>✓ Max 5MB</span>
          </div>

        </div>

      </div>
    </div>
  );
}