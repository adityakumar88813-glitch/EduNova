import { useState } from "react";
import { FiTrash2, FiAlertTriangle, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteProfile } from "../../../../services/operations/SettingsAPI";

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteProfile(token, navigate));
      setShowModal(false);
    } catch (error) {
      console.log("DELETE ACCOUNT ERROR:", error);
    }
  };

  return (
    <>
      {/* ================= DELETE ACCOUNT CARD ================= */}
      <div className="my-10 overflow-hidden rounded-2xl border border-pink-700/50 bg-pink-950/40 shadow-lg">

        <div className="flex flex-col gap-6 p-6 md:flex-row md:p-8">

          {/* Icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-700/40">
            <FiTrash2 className="text-2xl text-pink-200" />
          </div>

          {/* Content */}
          <div className="flex-1">

            <h2 className="text-xl font-semibold text-richblack-5">
              Delete Account
            </h2>

            <p className="mt-2 text-sm font-medium text-pink-200">
              Are you sure you want to delete your account?
            </p>

            <p className="mt-2 max-w-[650px] text-sm leading-6 text-pink-100/70">
              This action is permanent and cannot be undone. Your profile,
              courses, and other account-related information may be removed
              permanently.
            </p>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="mt-5 flex items-center gap-2 rounded-lg bg-pink-700 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-pink-600 active:scale-95"
            >
              <FiTrash2 size={17} />
              Delete My Account
            </button>

          </div>
        </div>
      </div>

      {/* ================= CONFIRMATION MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

          <div className="w-full max-w-[430px] rounded-2xl border border-richblack-600 bg-richblack-800 p-6 shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-700/30">
                  <FiAlertTriangle
                    className="text-pink-200"
                    size={22}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-richblack-5">
                    Delete Account?
                  </h3>

                  <p className="text-xs text-richblack-400">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-richblack-300 transition hover:bg-richblack-700 hover:text-richblack-5"
              >
                <FiX size={20} />
              </button>

            </div>

            {/* Warning */}
            <div className="mt-6 rounded-lg border border-pink-700/40 bg-pink-900/20 p-4">
              <p className="text-sm leading-6 text-pink-100">
                Deleting your account will permanently remove your account
                information. You will not be able to recover it later.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-lg bg-richblack-700 px-4 py-3 text-sm font-semibold text-richblack-5 transition hover:bg-richblack-600"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-pink-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-600 active:scale-95"
              >
                <FiTrash2 size={17} />
                Delete
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}