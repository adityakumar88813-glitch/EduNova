import { useMemo, useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"
import {
  FiBarChart2,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi"

Chart.register(...registerables)

export default function InstructorChart({ courses = [] }) {
  const [currChart, setCurrChart] = useState("students")

  // ---------------------------------------------------------
  // Generate stable colors
  // ---------------------------------------------------------

  const chartColors = useMemo(() => {
    const colors = [
      "#FACC15",
      "#38BDF8",
      "#A78BFA",
      "#34D399",
      "#FB7185",
      "#60A5FA",
      "#F97316",
      "#2DD4BF",
      "#C084FC",
      "#F472B6",
    ]

    return courses.map(
      (_, index) => colors[index % colors.length]
    )
  }, [courses])

  // ---------------------------------------------------------
  // Total students
  // ---------------------------------------------------------

  const totalStudents = useMemo(() => {
    return courses.reduce(
      (total, course) =>
        total + Number(course?.totalStudentsEnrolled || 0),
      0
    )
  }, [courses])

  // ---------------------------------------------------------
  // Total income
  // ---------------------------------------------------------

  const totalIncome = useMemo(() => {
    return courses.reduce(
      (total, course) =>
        total + Number(course?.totalAmountGenerated || 0),
      0
    )
  }, [courses])

  // ---------------------------------------------------------
  // Students Chart
  // ---------------------------------------------------------

  const chartDataStudents = {
    labels: courses.map(
      (course) => course?.courseName || "Untitled Course"
    ),

    datasets: [
      {
        data: courses.map(
          (course) =>
            Number(course?.totalStudentsEnrolled || 0)
        ),

        backgroundColor: chartColors,

        borderColor: "#161D29",

        borderWidth: 3,

        hoverOffset: 8,
      },
    ],
  }

  // ---------------------------------------------------------
  // Income Chart
  // ---------------------------------------------------------

  const chartIncomeData = {
    labels: courses.map(
      (course) => course?.courseName || "Untitled Course"
    ),

    datasets: [
      {
        data: courses.map(
          (course) =>
            Number(course?.totalAmountGenerated || 0)
        ),

        backgroundColor: chartColors,

        borderColor: "#161D29",

        borderWidth: 3,

        hoverOffset: 8,
      },
    ],
  }

  // ---------------------------------------------------------
  // Chart Options
  // ---------------------------------------------------------

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: "#CBD5E1",

          padding: 18,

          usePointStyle: true,

          pointStyle: "circle",

          font: {
            size: 11,
            weight: "500",
          },
        },
      },

      tooltip: {
        backgroundColor: "#111827",

        borderColor: "#374151",

        borderWidth: 1,

        padding: 12,

        titleColor: "#FFFFFF",

        bodyColor: "#CBD5E1",

        displayColors: true,

        callbacks: {
          label: function (context) {
            const label = context.label || ""

            const value = context.raw || 0

            if (currChart === "income") {
              return `${label}: ₹${Number(value).toLocaleString(
                "en-IN"
              )}`
            }

            return `${label}: ${Number(value).toLocaleString(
              "en-IN"
            )} students`
          },
        },
      },
    },
  }

  // ---------------------------------------------------------
  // Empty State
  // ---------------------------------------------------------

  if (!courses || courses.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[420px]
          flex-1
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-richblack-700
          bg-richblack-800
          p-6
          text-center
        "
      >
        <div
          className="
            flex h-16 w-16
            items-center justify-center
            rounded-2xl
            bg-richblack-700
            text-yellow-50
          "
        >
          <FiBarChart2 className="text-3xl" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-richblack-5">
          No Course Data
        </h2>

        <p className="mt-2 max-w-[300px] text-sm leading-6 text-richblack-400">
          Create and publish a course to see your student and
          income analytics here.
        </p>
      </div>
    )
  }

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------

  return (
    <div
      className="
        flex
        min-h-[520px]
        flex-1
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-richblack-700
        bg-richblack-800
        shadow-[0_15px_50px_rgba(0,0,0,0.18)]
      "
    >
      {/* Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50" />

      {/* Header */}
      <div
        className="
          flex
          flex-col
          gap-5
          border-b
          border-richblack-700
          p-6
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* Title */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-xl
              bg-yellow-50/10
              text-yellow-50
            "
          >
            <FiBarChart2 className="text-xl" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-50">
              Analytics
            </p>

            <h2 className="mt-1 text-xl font-bold text-richblack-5">
              Course Performance
            </h2>
          </div>
        </div>

        {/* Toggle */}
        <div
          className="
            flex
            w-full
            rounded-xl
            border
            border-richblack-600
            bg-richblack-900
            p-1
            sm:w-auto
          "
        >
          <button
            type="button"
            onClick={() => setCurrChart("students")}
            className={`
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-lg
              px-4
              py-2
              text-sm
              font-semibold
              transition-all
              duration-200
              sm:flex-none
              ${
                currChart === "students"
                  ? "bg-yellow-50 text-richblack-900 shadow-md"
                  : "text-richblack-300 hover:text-white"
              }
            `}
          >
            <FiUsers />
            Students
          </button>

          <button
            type="button"
            onClick={() => setCurrChart("income")}
            className={`
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-lg
              px-4
              py-2
              text-sm
              font-semibold
              transition-all
              duration-200
              sm:flex-none
              ${
                currChart === "income"
                  ? "bg-yellow-50 text-richblack-900 shadow-md"
                  : "text-richblack-300 hover:text-white"
              }
            `}
          >
            <FiDollarSign />
            Income
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 p-6 pb-2">
        {/* Students */}
        <div
          className="
            rounded-xl
            border
            border-richblack-700
            bg-richblack-900/50
            p-4
          "
        >
          <div className="flex items-center gap-2 text-richblack-400">
            <FiUsers />
            <span className="text-xs font-medium">
              Total Students
            </span>
          </div>

          <p className="mt-2 text-xl font-bold text-richblack-5">
            {totalStudents.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Income */}
        <div
          className="
            rounded-xl
            border
            border-richblack-700
            bg-richblack-900/50
            p-4
          "
        >
          <div className="flex items-center gap-2 text-richblack-400">
            <FiTrendingUp />
            <span className="text-xs font-medium">
              Total Income
            </span>
          </div>

          <p className="mt-2 text-xl font-bold text-yellow-50">
            ₹{totalIncome.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative min-h-[340px] flex-1 px-5 pb-6 pt-4 sm:px-8">
        <Pie
          data={
            currChart === "students"
              ? chartDataStudents
              : chartIncomeData
          }
          options={options}
        />
      </div>
    </div>
  )
}