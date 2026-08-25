import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiCalendar,
  FiPhone,
  FiEdit3,
  FiSave,
  FiX,
} from "react-icons/fi";

import { updateProfile } from "../../../../services/operations/SettingsAPI";

const genders = [
  "Male",
  "Female",
  "Non-Binary",
  "Prefer not to say",
  "Other",
];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const submitProfileForm = async (data) => {
    try {
      console.log("PROFILE UPDATE DATA:", data);

      await dispatch(updateProfile(token, data));

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("PROFILE UPDATE ERROR:", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[950px] px-4 pb-12">

      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-50 text-richblack-900">
            <FiUser size={22} />
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-richblack-5">
              Edit Profile
            </h1>

            <p className="mt-1 text-sm text-richblack-300">
              Update your personal information and profile details
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(submitProfileForm)}>

        {/* ================= PROFILE CARD ================= */}
        <div className="overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800 shadow-lg">

          {/* Card Header */}
          <div className="border-b border-richblack-700 px-6 py-5 md:px-8">
            <div className="flex items-center gap-3">
              <FiEdit3 className="text-yellow-50" size={21} />

              <div>
                <h2 className="text-lg font-semibold text-richblack-5">
                  Personal Information
                </h2>

                <p className="text-xs text-richblack-300">
                  Keep your profile information up to date
                </p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="space-y-7 p-6 md:p-8">

            {/* ================= NAME ================= */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium text-richblack-5"
                >
                  First Name
                  <span className="ml-1 text-pink-200">*</span>
                </label>

                <div className="relative">
                  <FiUser
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-richblack-400"
                    size={18}
                  />

                  <input
                    id="firstName"
                    type="text"
                    placeholder="Enter first name"
                    defaultValue={user?.firstName || ""}
                    className={`w-full rounded-lg border bg-richblack-700 py-3 pl-11 pr-4 text-sm text-richblack-5 outline-none transition-all placeholder:text-richblack-400 ${
                      errors.firstName
                        ? "border-pink-500"
                        : "border-richblack-600 focus:border-yellow-50"
                    }`}
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                </div>

                {errors.firstName && (
                  <p className="mt-1.5 text-xs text-pink-200">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium text-richblack-5"
                >
                  Last Name
                  <span className="ml-1 text-pink-200">*</span>
                </label>

                <div className="relative">
                  <FiUser
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-richblack-400"
                    size={18}
                  />

                  <input
                    id="lastName"
                    type="text"
                    placeholder="Enter last name"
                    defaultValue={user?.lastName || ""}
                    className={`w-full rounded-lg border bg-richblack-700 py-3 pl-11 pr-4 text-sm text-richblack-5 outline-none transition-all placeholder:text-richblack-400 ${
                      errors.lastName
                        ? "border-pink-500"
                        : "border-richblack-600 focus:border-yellow-50"
                    }`}
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                </div>

                {errors.lastName && (
                  <p className="mt-1.5 text-xs text-pink-200">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* ================= DOB + GENDER ================= */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="mb-2 block text-sm font-medium text-richblack-5"
                >
                  Date of Birth
                  <span className="ml-1 text-pink-200">*</span>
                </label>

                <div className="relative">
                  <FiCalendar
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-richblack-400"
                    size={18}
                  />

                  <input
                    id="dateOfBirth"
                    type="date"
                    defaultValue={formatDate(
                      user?.additionalDetails?.dateOfBirth
                    )}
                    className={`w-full rounded-lg border bg-richblack-700 py-3 pl-11 pr-4 text-sm text-richblack-5 outline-none transition-all ${
                      errors.dateOfBirth
                        ? "border-pink-500"
                        : "border-richblack-600 focus:border-yellow-50"
                    }`}
                    {...register("dateOfBirth", {
                      required: "Date of birth is required",
                      validate: (value) =>
                        value <= new Date().toISOString().split("T")[0] ||
                        "Date cannot be in the future",
                    })}
                  />
                </div>

                {errors.dateOfBirth && (
                  <p className="mt-1.5 text-xs text-pink-200">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="mb-2 block text-sm font-medium text-richblack-5"
                >
                  Gender
                  <span className="ml-1 text-pink-200">*</span>
                </label>

                <select
                  id="gender"
                  defaultValue={
                    user?.additionalDetails?.gender || "Prefer not to say"
                  }
                  className={`w-full rounded-lg border bg-richblack-700 px-4 py-3 text-sm text-richblack-5 outline-none transition-all ${
                    errors.gender
                      ? "border-pink-500"
                      : "border-richblack-600 focus:border-yellow-50"
                  }`}
                  {...register("gender", {
                    required: "Please select your gender",
                  })}
                >
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>

                {errors.gender && (
                  <p className="mt-1.5 text-xs text-pink-200">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            {/* ================= CONTACT + ABOUT ================= */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* Contact Number */}
              <div>
                <label
                  htmlFor="contactNumber"
                  className="mb-2 block text-sm font-medium text-richblack-5"
                >
                  Contact Number
                  <span className="ml-1 text-pink-200">*</span>
                </label>

                <div className="relative">
                  <FiPhone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-richblack-400"
                    size={18}
                  />

                  <input
                    id="contactNumber"
                    type="tel"
                    placeholder="Enter contact number"
                    defaultValue={
                      user?.additionalDetails?.contactNumber || ""
                    }
                    className={`w-full rounded-lg border bg-richblack-700 py-3 pl-11 pr-4 text-sm text-richblack-5 outline-none transition-all placeholder:text-richblack-400 ${
                      errors.contactNumber
                        ? "border-pink-500"
                        : "border-richblack-600 focus:border-yellow-50"
                    }`}
                    {...register("contactNumber", {
                      required: "Contact number is required",
                      minLength: {
                        value: 10,
                        message: "Enter a valid contact number",
                      },
                      maxLength: {
                        value: 12,
                        message: "Enter a valid contact number",
                      },
                    })}
                  />
                </div>

                {errors.contactNumber && (
                  <p className="mt-1.5 text-xs text-pink-200">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>

              {/* About */}
              <div>
                <label
                  htmlFor="about"
                  className="mb-2 block text-sm font-medium text-richblack-5"
                >
                  About
                  <span className="ml-1 text-pink-200">*</span>
                </label>

                <textarea
                  id="about"
                  rows={1}
                  placeholder="Tell us something about yourself"
                  defaultValue={user?.additionalDetails?.about || ""}
                  className={`w-full resize-none rounded-lg border bg-richblack-700 px-4 py-3 text-sm text-richblack-5 outline-none transition-all placeholder:text-richblack-400 ${
                    errors.about
                      ? "border-pink-500"
                      : "border-richblack-600 focus:border-yellow-50"
                  }`}
                  {...register("about", {
                    required: "About is required",
                  })}
                />

                {errors.about && (
                  <p className="mt-1.5 text-xs text-pink-200">
                    {errors.about.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() => navigate("/dashboard/my-profile")}
            className="flex items-center justify-center gap-2 rounded-lg bg-richblack-700 px-6 py-3 text-sm font-semibold text-richblack-5 transition-all hover:bg-richblack-600"
          >
            <FiX size={18} />
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-yellow-50 px-6 py-3 text-sm font-semibold text-richblack-900 transition-all hover:bg-yellow-100 active:scale-95"
          >
            <FiSave size={18} />
            Save Changes
          </button>

        </div>
      </form>
    </div>
  );
}