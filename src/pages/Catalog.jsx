import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";

import Course_Card from "../components/core/Catalog/Course_Card";
import CourseSlider from "../components/core/Catalog/CourseSlider";

import ReviewSlider from "../components/common/ReviewSlider";
import { MdOutlineRateReview } from "react-icons/md";
import { FaBookOpen, FaGraduationCap, FaCode } from "react-icons/fa";

const Catalog = () => {
  const { catalogName } = useParams();

  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // GET ALL CATEGORIES
  // =========================================================

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);

        const res = await apiConnector(
          "GET",
          categories.CATEGORIES_API
        );

        const allCategories = res?.data?.data || [];

        const selectedCategory = allCategories.find((ct) => {
          const categoryName = ct?.Name || ct?.name;

          if (!categoryName) return false;

          return (
            categoryName
              .trim()
              .split(" ")
              .join("-")
              .toLowerCase() === catalogName?.toLowerCase()
          );
        });

        if (!selectedCategory) {
          setCategoryId("");
          setCatalogPageData(null);
          setLoading(false);
          return;
        }

        setCategoryId(selectedCategory._id);
      } catch (error) {
        console.log("GET CATEGORIES ERROR:", error);

        setCategoryId("");
        setCatalogPageData(null);
        setLoading(false);
      }
    };

    if (catalogName) {
      getCategories();
    }
  }, [catalogName]);

  // =========================================================
  // GET CATEGORY PAGE DETAILS
  // =========================================================

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        setLoading(true);

        const res = await getCatalogPageData(categoryId);

        console.log("CATALOG PAGE DATA:", res);

        setCatalogPageData(res);
      } catch (error) {
        console.log("GET CATEGORY DETAILS ERROR:", error);

        setCatalogPageData(null);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  // =========================================================
  // SAFE DATA
  // =========================================================

  const selectedCategory =
    catalogPageData?.data?.selectedCategory;

  const differentCategory =
    catalogPageData?.data?.differentCategory;

  const selectedCategoryName =
    selectedCategory?.Name ||
    selectedCategory?.name ||
    "";

  const selectedCategoryDescription =
    selectedCategory?.description ||
    `Learn ${selectedCategoryName} from beginner to advanced level with practical, industry-focused courses.`;

  const differentCategoryName =
    differentCategory?.Name ||
    differentCategory?.name ||
    "";

  const selectedCourses =
    selectedCategory?.courses ||
    selectedCategory?.course ||
    [];

  const differentCourses =
    differentCategory?.courses ||
    differentCategory?.course ||
    [];

  const mostSellingCourses =
    catalogPageData?.data?.mostSellingCourses || [];

  // =========================================================
  // NEW COURSES
  // =========================================================

  const newCourses = [...selectedCourses].sort((a, b) => {
    const dateA = new Date(a?.createdAt || 0).getTime();
    const dateB = new Date(b?.createdAt || 0).getTime();

    return dateB - dateA;
  });

  const displayedCourses =
    active === 1 ? selectedCourses : newCourses;

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <div className="flex flex-col items-center gap-5">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#334155] border-t-[#FACC15]" />

          <p className="text-lg font-medium text-slate-300">
            Loading courses...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // CATEGORY NOT FOUND
  // =========================================================

  if (!categoryId || !catalogPageData) {
    return (
      <>
        <div className="flex min-h-[70vh] items-center justify-center bg-[#020617] px-5">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-10 text-center shadow-xl">
            <h1 className="text-3xl font-bold text-white">
              Category Not Found
            </h1>

            <p className="mt-3 text-slate-400">
              No category found for "{catalogName}"
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <div className="bg-[#020617] text-white">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#020617]">

        {/* Background glow */}
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-maxContent px-5 py-16 sm:py-20 lg:py-24">

          {/* Breadcrumb */}
          <div className="mb-7 flex items-center gap-2 text-sm">
            <span className="text-slate-500">
              Home
            </span>

            <span className="text-slate-600">
              /
            </span>

            <span className="font-medium text-yellow-400">
              {selectedCategoryName}
            </span>
          </div>

          <div className="max-w-4xl">

            {/* Small badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300">
              <FaGraduationCap />
              Explore our courses
            </div>

            {/* Main heading */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Master{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {selectedCategoryName}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {selectedCategoryDescription}
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-4">

              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400/10 text-yellow-400">
                  <FaBookOpen />
                </div>

                <div>
                  <p className="text-lg font-bold text-white">
                    {selectedCourses.length}+
                  </p>

                  <p className="text-xs text-slate-400">
                    Courses
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-400/10 text-blue-400">
                  <FaCode />
                </div>

                <div>
                  <p className="text-lg font-bold text-white">
                    Practical
                  </p>

                  <p className="text-xs text-slate-400">
                    Learning
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-400/10 text-green-400">
                  <FaGraduationCap />
                </div>

                <div>
                  <p className="text-lg font-bold text-white">
                    Beginner
                  </p>

                  <p className="text-xs text-slate-400">
                    Friendly
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="bg-[#020617]">

        {/* ===================================================
            COURSES TO GET STARTED
        =================================================== */}

        <section className="mx-auto max-w-maxContent px-5 py-16">

          {/* Heading */}
          <div className="mb-8">

            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-400">
              Start learning today
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Courses to get you started
            </h2>

            <p className="mt-3 max-w-2xl text-slate-400">
              Choose from our most popular and recently added courses.
            </p>

          </div>

          {/* =================================================
              TABS
          ================================================= */}

          <div className="mb-8 flex w-fit rounded-xl border border-slate-700 bg-slate-900 p-1">

            {/* Most Popular */}
            <button
              type="button"
              onClick={() => setActive(1)}
              className={`relative rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                active === 1
                  ? "!bg-yellow-400 !text-slate-950 shadow-lg shadow-yellow-400/10"
                  : "!bg-transparent !text-slate-400 hover:!bg-slate-800 hover:!text-white"
              }`}
            >
              Most Popular
            </button>

            {/* New */}
            <button
              type="button"
              onClick={() => setActive(2)}
              className={`relative rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                active === 2
                  ? "!bg-yellow-400 !text-slate-950 shadow-lg shadow-yellow-400/10"
                  : "!bg-transparent !text-slate-400 hover:!bg-slate-800 hover:!text-white"
              }`}
            >
              New
            </button>

          </div>

          {/* Course Slider */}

          <div>

            {displayedCourses.length > 0 ? (
              <CourseSlider
                Courses={displayedCourses}
              />
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 py-16 text-center">
                <FaBookOpen className="mx-auto text-4xl text-slate-600" />

                <p className="mt-4 text-xl font-semibold text-white">
                  No courses found
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  There are no courses available in this category yet.
                </p>
              </div>
            )}

          </div>
        </section>

        {/* ===================================================
            TOP COURSES
        =================================================== */}

        <section className="border-y border-slate-800/70 bg-[#050b16]">

          <div className="mx-auto max-w-maxContent px-5 py-16">

            <div className="mb-8">

              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
                Recommended
              </p>

              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Top Courses
                {differentCategoryName && (
                  <>
                    {" "}
                    in{" "}
                    <span className="text-yellow-400">
                      {differentCategoryName}
                    </span>
                  </>
                )}
              </h2>

              <p className="mt-3 text-slate-400">
                Explore courses learners are enjoying right now.
              </p>

            </div>

            <div>
              {differentCourses.length > 0 ? (
                <CourseSlider
                  Courses={differentCourses}
                />
              ) : (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 py-16 text-center">
                  <p className="text-xl font-semibold text-white">
                    No courses found
                  </p>
                </div>
              )}
            </div>

          </div>

        </section>

        {/* ===================================================
            FREQUENTLY BOUGHT
        =================================================== */}

        <section className="mx-auto max-w-maxContent px-5 py-16">

          <div className="mb-8">

            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-400">
              Learners' choice
            </p>

            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Frequently Bought
            </h2>

            <p className="mt-3 text-slate-400">
              Popular courses that students often learn together.
            </p>

          </div>

          <div>

            {mostSellingCourses.length > 0 ? (

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {mostSellingCourses
                  .slice(0, 6)
                  .map((course, index) => (
                    <Course_Card
                      course={course}
                      key={course?._id || index}
                    />
                  ))}

              </div>

            ) : (

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 py-16 text-center">

                <p className="text-xl font-semibold text-white">
                  No courses found
                </p>

              </div>

            )}

          </div>

        </section>

        {/* ===================================================
            REVIEWS
        =================================================== */}

        <section className="mx-auto max-w-maxContent px-5 pb-16">

          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 py-12">

            <div className="px-5 text-center">

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10">
                <MdOutlineRateReview className="text-3xl text-yellow-400" />
              </div>

              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Reviews from other learners
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-slate-400">
                See what other students think about their learning
                experience.
              </p>

            </div>

            <div className="mt-8">
              <ReviewSlider />
            </div>

          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Catalog;