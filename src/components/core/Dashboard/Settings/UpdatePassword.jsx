import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import {
  FiLock,
  FiShield,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../../../services/operations/SettingsAPI";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const submitPasswordForm = async (data) => {
    try {
      console.log("PASSWORD DATA:", data);

      await changePassword(token, data);
    } catch (error) {
      console.log("PASSWORD UPDATE ERROR:", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[900px] pb-12">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-50 text-richblack-900">
            <FiLock size={21} />
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-richblack-5">
              Update Password
            </h1>

            <p className="mt-1 text-sm text-richblack-300">
              Change your password to keep your account secure
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(submitPasswordForm)}>

        {/* Password Card */}
        <div className="overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800 shadow-lg">

          {/* Card Header */}
          <div className="border-b border-richblack-700 px-6 py-5 md:px-8">
            <div className="flex items-center gap-3">
              <FiShield
                className="text-yellow-50"
                size={21}
              />

              <div>
                <h2 className="text-lg font-semibold text-richblack-5">
                  Password
                </h2>

                <p className="mt-1 text-xs text-richblack-400">
                  Enter your current password and choose a new one
                </p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 md:p-8">

            {/* Current + New Password */}
            <div className="grid gap-6 md:grid-cols-2">

              {/* Current Password */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="oldPassword"
                  className="text-sm font-medium text-richblack-5"
                >
                  Current Password
                  <span className="ml-1 text-pink-200">*</span>
                </label>

                <div className="relative">
                  <FiLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-richblack-400"
                    size={18}
                  />

                  <input
                    id="oldPassword"
                    type={
                      showOldPassword ? "text" : "password"
                    }
                    placeholder="Enter current password"
                    className={`w-full rounded-lg border bg-richblack-700 py-3 pl-11 pr-12 text-sm text-richblack-5 outline-none placeholder:text-richblack-400 ${
                      errors.oldPassword
                        ? "border-pink-500"
                        : "border-richblack-600 focus:border-yellow-50"
                    }`}
                    {...register("oldPassword", {
                      required:
                        "Current password is required",
                    })}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowOldPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-300 hover:text-richblack-5"
                  >
                    {showOldPassword ? (
                      <AiOutlineEyeInvisible size={22} />
                    ) : (
                      <AiOutlineEye size={22} />
                    )}
                  </button>
                </div>

                {errors.oldPassword && (
                  <p className="text-xs text-pink-200">
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-richblack-5"
                >
                  New Password
                  <span className="ml-1 text-pink-200">*</span>
                </label>

                <div className="relative">
                  <FiLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-richblack-400"
                    size={18}
                  />

                  <input
                    id="newPassword"
                    type={
                      showNewPassword ? "text" : "password"
                    }
                    placeholder="Enter new password"
                    className={`w-full rounded-lg border bg-richblack-700 py-3 pl-11 pr-12 text-sm text-richblack-5 outline-none placeholder:text-richblack-400 ${
                      errors.newPassword
                        ? "border-pink-500"
                        : "border-richblack-600 focus:border-yellow-50"
                    }`}
                    {...register("newPassword", {
                      required:
                        "New password is required",
                      minLength: {
                        value: 8,
                        message:
                          "Password must be at least 8 characters",
                      },
                    })}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-300 hover:text-richblack-5"
                  >
                    {showNewPassword ? (
                      <AiOutlineEyeInvisible size={22} />
                    ) : (
                      <AiOutlineEye size={22} />
                    )}
                  </button>
                </div>

                {errors.newPassword && (
                  <p className="text-xs text-pink-200">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mt-6 flex flex-col gap-2">
              <label
                htmlFor="confirmNewPassword"
                className="text-sm font-medium text-richblack-5"
              >
                Confirm New Password
                <span className="ml-1 text-pink-200">*</span>
              </label>

              <div className="relative">
                <FiLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-richblack-400"
                  size={18}
                />

                <input
                  id="confirmNewPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm new password"
                  className={`w-full rounded-lg border bg-richblack-700 py-3 pl-11 pr-12 text-sm text-richblack-5 outline-none placeholder:text-richblack-400 ${
                    errors.confirmNewPassword
                      ? "border-pink-500"
                      : "border-richblack-600 focus:border-yellow-50"
                  }`}
                  {...register("confirmNewPassword", {
                    required:
                      "Please confirm your new password",
                    validate: (value) =>
                      value === newPassword ||
                      "New password and confirm password do not match",
                  })}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-300 hover:text-richblack-5"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>

              {errors.confirmNewPassword && (
                <p className="text-xs text-pink-200">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="mt-7 rounded-xl border border-richblack-700 bg-richblack-700/40 p-4">
              <p className="mb-3 text-sm font-medium text-richblack-5">
                Password requirements
              </p>

              <div className="grid gap-2 text-xs text-richblack-300 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <FiCheck className="text-green-400" />
                  At least 8 characters
                </div>

                <div className="flex items-center gap-2">
                  <FiCheck className="text-green-400" />
                  Use a strong password
                </div>

                <div className="flex items-center gap-2">
                  <FiCheck className="text-green-400" />
                  Avoid common passwords
                </div>

                <div className="flex items-center gap-2">
                  <FiCheck className="text-green-400" />
                  Don't share your password
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/my-profile")
            }
            className="flex items-center justify-center gap-2 rounded-lg bg-richblack-700 px-6 py-3 text-sm font-semibold text-richblack-5 transition-all hover:bg-richblack-600 active:scale-95"
          >
            <FiX size={18} />
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-yellow-50 px-6 py-3 text-sm font-semibold text-richblack-900 transition-all hover:bg-yellow-100 active:scale-95"
          >
            <FiLock size={18} />
            Update Password
          </button>

        </div>
      </form>
    </div>
  );
}