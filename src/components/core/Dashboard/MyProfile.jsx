import { RiEditBoxLine } from "react-icons/ri";
import { FiUser, FiMail, FiPhone, FiCalendar } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const about = user?.additionalDetails?.about;
  const gender = user?.additionalDetails?.gender;
  const contactNumber = user?.additionalDetails?.contactNumber;
  const dateOfBirth = user?.additionalDetails?.dateOfBirth;

  return (
    <div className="mx-auto w-full max-w-[950px] pb-12">

      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-richblack-5">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-richblack-300">
          View and manage your personal information
        </p>
      </div>

      {/* ================= PROFILE HEADER ================= */}
      <div className="flex flex-col justify-between gap-6 rounded-2xl border border-richblack-700 bg-richblack-800 p-6 md:flex-row md:items-center md:px-8">

        <div className="flex items-center gap-5">

          {/* Profile Image */}
          <div className="relative">
            <img
              src={
                user?.image ||
                `https://api.dicebear.com/5.x/initials/svg?seed=${
                  user?.firstName || "User"
                }`
              }
              alt={`profile-${user?.firstName || "user"}`}
              className="h-[80px] w-[80px] rounded-full object-cover ring-2 ring-yellow-50/30"
            />

            <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-richblack-800 bg-green-400" />
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-xl font-semibold text-richblack-5">
              {user?.firstName || "User"} {user?.lastName || ""}
            </h2>

            <p className="mt-1 flex items-center gap-2 text-sm text-richblack-300">
              <FiMail size={15} />
              {user?.email || "Email not available"}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard/settings")}
          className="flex items-center justify-center gap-2 rounded-lg bg-yellow-50 px-5 py-2.5 font-semibold text-richblack-900 transition-all hover:bg-yellow-100 active:scale-95"
        >
          <RiEditBoxLine size={18} />
          Edit Profile
        </button>
      </div>

      {/* ================= ABOUT ================= */}
      <div className="my-8 rounded-2xl border border-richblack-700 bg-richblack-800 p-6 md:p-8">

        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-richblack-5">
              About
            </h2>

            <p className="mt-1 text-xs text-richblack-400">
              A short description about yourself
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex items-center gap-2 rounded-lg bg-richblack-700 px-4 py-2 text-sm font-medium text-richblack-5 transition-all hover:bg-richblack-600"
          >
            <RiEditBoxLine size={16} />
            Edit
          </button>
        </div>

        <div className="rounded-lg bg-richblack-700/50 p-4">
          <p
            className={`text-sm leading-6 ${
              about ? "text-richblack-100" : "text-richblack-400"
            }`}
          >
            {about || "Write something about yourself..."}
          </p>
        </div>
      </div>

      {/* ================= PERSONAL DETAILS ================= */}
      <div className="rounded-2xl border border-richblack-700 bg-richblack-800 p-6 md:p-8">

        {/* Heading */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-richblack-5">
              Personal Details
            </h2>

            <p className="mt-1 text-xs text-richblack-400">
              Your personal information
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex items-center gap-2 rounded-lg bg-richblack-700 px-4 py-2 text-sm font-medium text-richblack-5 transition-all hover:bg-richblack-600"
          >
            <RiEditBoxLine size={16} />
            Edit
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid gap-6 sm:grid-cols-2">

          {/* First Name */}
          <DetailItem
            icon={<FiUser />}
            label="First Name"
            value={user?.firstName}
          />

          {/* Last Name */}
          <DetailItem
            icon={<FiUser />}
            label="Last Name"
            value={user?.lastName}
          />

          {/* Email */}
          <DetailItem
            icon={<FiMail />}
            label="Email"
            value={user?.email}
          />

          {/* Phone */}
          <DetailItem
            icon={<FiPhone />}
            label="Phone Number"
            value={contactNumber}
            fallback="Add Contact Number"
          />

          {/* Gender */}
          <DetailItem
            icon={<FiUser />}
            label="Gender"
            value={gender}
            fallback="Add Gender"
          />

          {/* DOB */}
          <DetailItem
            icon={<FiCalendar />}
            label="Date of Birth"
            value={
              dateOfBirth
                ? formattedDate(dateOfBirth)
                : null
            }
            fallback="Add Date Of Birth"
          />

        </div>
      </div>
    </div>
  );
}


/* ================= DETAIL ITEM ================= */

function DetailItem({ icon, label, value, fallback }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-richblack-700 bg-richblack-700/30 p-4 transition-all hover:border-richblack-600">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-richblack-700 text-yellow-50">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="mb-1 text-xs text-richblack-400">
          {label}
        </p>

        <p
          className={`break-words text-sm font-medium ${
            value
              ? "text-richblack-5"
              : "text-richblack-400"
          }`}
        >
          {value || fallback || "Not available"}
        </p>
      </div>
    </div>
  );
}