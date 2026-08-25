import { FiSettings, FiShield } from "react-icons/fi";

import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

export default function Settings() {
  return (
    <div className="mx-auto w-full max-w-[1000px] pb-16">

      {/* ================= PAGE HEADER ================= */}
      <div className="mb-10 flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-richblack-900 shadow-lg">
          <FiSettings size={24} />
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-richblack-5">
            Account Settings
          </h1>

          <p className="mt-1 text-sm text-richblack-300">
            Manage your profile, password and account preferences
          </p>
        </div>

      </div>

      {/* ================= PROFILE SETTINGS ================= */}
      <section>
        <div className="mb-5 flex items-center gap-2">
          <FiSettings className="text-yellow-50" size={19} />

          <h2 className="text-xl font-semibold text-richblack-5">
            Profile Settings
          </h2>
        </div>

        {/* Profile Picture */}
        <ChangeProfilePicture />

        {/* Profile Information */}
        <EditProfile />
      </section>

      {/* ================= SECURITY ================= */}
      <section className="mt-12">

        <div className="mb-5 flex items-center gap-2">
          <FiShield className="text-yellow-50" size={19} />

          <div>
            <h2 className="text-xl font-semibold text-richblack-5">
              Security
            </h2>

            <p className="mt-1 text-xs text-richblack-400">
              Keep your account secure by updating your password regularly.
            </p>
          </div>
        </div>

        <UpdatePassword />

      </section>

      {/* ================= DANGER ZONE ================= */}
      <section className="mt-12">

        <div className="mb-5">
          <h2 className="text-xl font-semibold text-pink-200">
            Danger Zone
          </h2>

          <p className="mt-1 text-xs text-richblack-400">
            These actions are permanent. Please proceed carefully.
          </p>
        </div>

        <DeleteAccount />

      </section>

    </div>
  );
}