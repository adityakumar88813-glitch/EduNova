import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/core/Dashboard/Sidebar";

function Dashboard() {
  const { loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  const { loading: authLoading } = useSelector(
    (state) => state.auth
  );

  if (profileLoading || authLoading) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-richblack-900">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner"></div>
          <p className="text-sm text-richblack-300">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-richblack-900">

      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}
      <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto">

        <div className="w-full px-5 py-8 sm:px-8 lg:px-10 xl:px-12">

          <Outlet />

        </div>

      </main>
    </div>
  );
}

export default Dashboard;