import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FiBookOpen,
  FiUsers,
  FiDollarSign,
  FiArrowUpRight,
  FiPlus,
  FiBarChart2,
} from "react-icons/fi";

import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import InstructorChart from "./InstructorChart";

export default function Instructor() {
  const { token } = useSelector((state) => state?.auth);
  const { user } = useSelector((state) => state?.profile);

  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const instructorApiData = await getInstructorData(token);
        const result = await fetchInstructorCourses(token);

        console.log("INSTRUCTOR DATA:", instructorApiData);
        console.log("INSTRUCTOR COURSES:", result);

        if (Array.isArray(instructorApiData)) {
          setInstructorData(instructorApiData);
        }

        if (Array.isArray(result)) {
          setCourses(result);
        }
      } catch (error) {
        console.log("INSTRUCTOR DASHBOARD ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  // =========================
  // TOTAL INCOME
  // =========================
  const totalAmount = instructorData.reduce(
    (acc, curr) => acc + Number(curr?.totalAmountGenerated || 0),
    0
  );

  // =========================
  // TOTAL STUDENTS
  // =========================
  const totalStudents = instructorData.reduce(
    (acc, curr) => acc + Number(curr?.totalStudentsEnrolled || 0),
    0
  );

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner"></div>

          <p className="text-sm text-richblack-300">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-richblack-400">
            Instructor Dashboard
          </p>

          <h1 className="text-3xl font-bold text-richblack-5 sm:text-4xl">
            Hi {user?.firstName || "Instructor"}{" "}
            <span className="inline-block">👋</span>
          </h1>

          <p className="mt-2 text-sm text-richblack-300 sm:text-base">
            Let's start something new and inspire your students.
          </p>
        </div>

        <Link
          to="/dashboard/add-course"
          className="group flex w-fit items-center gap-2 rounded-lg bg-yellow-50 px-4 py-2.5 text-sm font-bold text-richblack-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-yellow-100"
        >
          <FiPlus className="text-lg" />
          Create Course
        </Link>

      </div>

      {/* =====================================================
          NO COURSES
      ===================================================== */}
      {courses.length === 0 ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-richblack-700 bg-richblack-800 px-6 text-center shadow-sm">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-richblack-700">
            <FiBookOpen className="text-3xl text-yellow-50" />
          </div>

          <h2 className="text-2xl font-bold text-richblack-5">
            No courses yet
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-richblack-300">
            You haven't created any courses yet. Start creating your first
            course and share your knowledge with students.
          </p>

          <Link
            to="/dashboard/add-course"
            className="mt-6 flex items-center gap-2 rounded-lg bg-yellow-50 px-5 py-3 text-sm font-bold text-richblack-900 transition-all hover:bg-yellow-100"
          >
            <FiPlus />
            Create Your First Course
          </Link>

        </div>
      ) : (
        <>
          {/* =====================================================
              STAT CARDS
          ===================================================== */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {/* Courses */}
            <div className="group rounded-xl border border-richblack-700 bg-richblack-800 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-richblack-500">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-richblack-300">
                    Total Courses
                  </p>

                  <p className="mt-2 text-3xl font-bold text-richblack-5">
                    {courses.length}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/10">
                  <FiBookOpen className="text-xl text-blue-400" />
                </div>

              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-richblack-400">
                <span className="text-green-400">
                  Active
                </span>
                <span>•</span>
                <span>Your published content</span>
              </div>

            </div>

            {/* Students */}
            <div className="group rounded-xl border border-richblack-700 bg-richblack-800 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-richblack-500">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-richblack-300">
                    Total Students
                  </p>

                  <p className="mt-2 text-3xl font-bold text-richblack-5">
                    {totalStudents}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-500/10">
                  <FiUsers className="text-xl text-green-400" />
                </div>

              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-richblack-400">
                <span className="text-green-400">
                  Growing
                </span>
                <span>•</span>
                <span>Across your courses</span>
              </div>

            </div>

            {/* Income */}
            <div className="group rounded-xl border border-richblack-700 bg-richblack-800 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-richblack-500">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-richblack-300">
                    Total Income
                  </p>

                  <p className="mt-2 text-3xl font-bold text-richblack-5">
                    Rs. {totalAmount.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-500/10">
                  <FiDollarSign className="text-xl text-yellow-50" />
                </div>

              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-richblack-400">
                <span className="text-yellow-50">
                  Revenue
                </span>
                <span>•</span>
                <span>Total earnings</span>
              </div>

            </div>

          </div>

          {/* =====================================================
              ANALYTICS + STATISTICS
          ===================================================== */}
          <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">

            {/* Chart */}
            <div className="min-w-0 overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800">

              <div className="flex items-center justify-between border-b border-richblack-700 px-5 py-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-richblack-700">
                    <FiBarChart2 className="text-lg text-yellow-50" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-richblack-400">
                      Analytics
                    </p>

                    <h2 className="text-base font-bold text-richblack-5">
                      Course Performance
                    </h2>
                  </div>

                </div>

              </div>

              <div className="min-h-[350px] p-4 sm:p-6">

                {totalAmount > 0 || totalStudents > 0 ? (
                  <InstructorChart courses={instructorData} />
                ) : (
                  <div className="flex h-[300px] flex-col items-center justify-center text-center">

                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-richblack-700">
                      <FiBarChart2 className="text-2xl text-richblack-300" />
                    </div>

                    <p className="text-lg font-bold text-richblack-5">
                      Not enough data
                    </p>

                    <p className="mt-2 max-w-sm text-sm text-richblack-400">
                      More student enrollments and course activity are
                      required to visualize your performance.
                    </p>

                  </div>
                )}

              </div>

            </div>

            {/* Statistics */}
            <div className="rounded-2xl border border-richblack-700 bg-richblack-800 p-5">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                  <FiBarChart2 className="text-lg text-yellow-50" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-richblack-400">
                    Overview
                  </p>

                  <h2 className="text-base font-bold text-richblack-5">
                    Statistics
                  </h2>
                </div>

              </div>

              <div className="space-y-5">

                <div className="border-b border-richblack-700 pb-5">
                  <p className="text-sm text-richblack-400">
                    Total Courses
                  </p>

                  <p className="mt-1 text-2xl font-bold text-richblack-5">
                    {courses.length}
                  </p>
                </div>

                <div className="border-b border-richblack-700 pb-5">
                  <p className="text-sm text-richblack-400">
                    Total Students
                  </p>

                  <p className="mt-1 text-2xl font-bold text-richblack-5">
                    {totalStudents}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-richblack-400">
                    Total Income
                  </p>

                  <p className="mt-1 break-words text-2xl font-bold text-yellow-50">
                    Rs. {totalAmount.toLocaleString("en-IN")}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* =====================================================
              YOUR COURSES
          ===================================================== */}
          <div className="rounded-2xl border border-richblack-700 bg-richblack-800 p-5 sm:p-6">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-richblack-400">
                  Learning Content
                </p>

                <h2 className="mt-1 text-xl font-bold text-richblack-5">
                  Your Courses
                </h2>
              </div>

              <Link
                to="/dashboard/my-courses"
                className="group flex items-center gap-1 text-sm font-semibold text-yellow-50 transition-colors hover:text-yellow-100"
              >
                View All
                <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

              {courses.slice(0, 3).map((course) => {

                const studentCount =
                  course?.studentsEnroled?.length ??
                  course?.studentsEnrolled?.length ??
                  0;

                return (
                  <Link
                    to={`/courses/${course?._id}`}
                    key={course?._id}
                    className="group overflow-hidden rounded-xl border border-richblack-700 bg-richblack-900 transition-all duration-300 hover:-translate-y-1 hover:border-richblack-500"
                  >

                    {/* Image */}
                    <div className="aspect-video w-full overflow-hidden bg-richblack-700">

                      <img
                        src={course?.thumbnail}
                        alt={course?.courseName || "Course thumbnail"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                    </div>

                    {/* Content */}
                    <div className="p-4">

                      <h3 className="line-clamp-2 min-h-[48px] text-base font-semibold leading-6 text-richblack-5">
                        {course?.courseName || "Untitled Course"}
                      </h3>

                      <div className="mt-3 flex items-center justify-between gap-3">

                        <div className="flex items-center gap-2 text-xs text-richblack-400">
                          <FiUsers />
                          <span>
                            {studentCount} students
                          </span>
                        </div>

                        <p className="text-sm font-bold text-yellow-50">
                          Rs. {course?.price || 0}
                        </p>

                      </div>

                    </div>

                  </Link>
                );
              })}

            </div>

          </div>
        </>
      )}
    </div>
  );
}