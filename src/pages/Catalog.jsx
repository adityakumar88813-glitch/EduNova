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

const Catalog = () => {
  const { catalogName } = useParams();

  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(true);

  // GET ALL CATEGORIES
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

  // GET CATEGORY PAGE DETAILS
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

  // SAFE DATA
  const selectedCategory =
    catalogPageData?.data?.selectedCategory;

  const differentCategory =
    catalogPageData?.data?.differentCategory;

  const selectedCategoryName =
    selectedCategory?.Name ||
    selectedCategory?.name ||
    "";

  const selectedCategoryDescription =
    selectedCategory?.description || "";

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

  // LOADING
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-richblack-900">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner"></div>

          <p className="text-lg text-richblack-200">
            Loading courses...
          </p>
        </div>
      </div>
    );
  }

  // CATEGORY NOT FOUND
  if (!categoryId || !catalogPageData) {
    return (
      <>
        <div className="flex min-h-[70vh] items-center justify-center bg-richblack-900">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-richblack-5">
              Category Not Found
            </h1>

            <p className="mt-3 text-richblack-300">
              No category found for "{catalogName}"
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="bg-richblack-800">
        <div className="mx-auto flex min-h-[300px] max-w-maxContent flex-col justify-center px-5 py-12">

          {/* Breadcrumb */}
          <p className="mb-4 text-sm text-richblack-300">
            
            <span className="ml-1 text-yellow-25">
              {selectedCategoryName}
            </span>
          </p>

          {/* Category Name */}
          <h1 className="text-3xl font-bold text-richblack-5 sm:text-4xl">
            {selectedCategoryName}
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-[850px] text-base leading-7 text-richblack-200">
            {selectedCategoryDescription}
          </p>
        </div>
      </section>

      {/* ================= MAIN ================= */}
      <main className="bg-richblack-900">

        {/* ================= COURSES TO GET STARTED ================= */}
        <section className="mx-auto max-w-maxContent px-5 py-12">

          <h2 className="text-3xl font-semibold text-richblack-5">
            Courses to get you started
          </h2>

          {/* Tabs */}
         <div className="mt-6 flex w-fit border-b border-richblack-600">

  <div
    onClick={() => setActive(1)}
    className={`cursor-pointer px-6 py-3 text-sm font-medium transition-all duration-200 ${
      active === 1
        ? "border-b-2 border-yellow-25 text-yellow-25"
        : "text-richblack-300 hover:text-richblack-5"
    }`}
  >
    Most Popular
  </div>

  <div
    onClick={() => setActive(2)}
    className={`cursor-pointer px-6 py-3 text-sm font-medium transition-all duration-200 ${
      active === 2
        ? "border-b-2 border-yellow-25 text-yellow-25"
        : "text-richblack-300 hover:text-richblack-5"
    }`}
  >
    New
  </div>

</div>

          {/* Course Slider */}
          <div className="mt-8">

            {selectedCourses.length > 0 ? (
              <CourseSlider
                Courses={selectedCourses}
              />
            ) : (
              <div className="rounded-lg border border-richblack-700 bg-richblack-800 py-12 text-center">
                <p className="text-xl font-semibold text-richblack-100">
                  No courses found
                </p>

                <p className="mt-2 text-sm text-richblack-300">
                  There are no courses available in this category yet.
                </p>
              </div>
            )}

          </div>
        </section>

        {/* ================= TOP COURSES ================= */}
        <section className="mx-auto max-w-maxContent px-5 py-12">

          <h2 className="text-3xl font-semibold text-richblack-5">
            Top Courses
            {differentCategoryName && (
              <>
                {" "}
                in{" "}
                <span className="text-yellow-25">
                  {differentCategoryName}
                </span>
              </>
            )}
          </h2>

          <div className="mt-8">

            {differentCourses.length > 0 ? (
              <CourseSlider
                Courses={differentCourses}
              />
            ) : (
              <div className="rounded-lg border border-richblack-700 bg-richblack-800 py-12 text-center">
                <p className="text-xl font-semibold text-richblack-100">
                  No courses found
                </p>
              </div>
            )}

          </div>
        </section>

        {/* ================= FREQUENTLY BOUGHT ================= */}
        <section className="mx-auto max-w-maxContent px-5 py-12">

          <h2 className="text-3xl font-semibold text-richblack-5">
            Frequently Bought
          </h2>

          <div className="mt-8">

            {mostSellingCourses.length > 0 ? (

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {mostSellingCourses
                  .slice(0, 6)
                  .map((course, index) => (
                    <Course_Card
                      course={course}
                      key={course?._id || index}
                      Height="h-[220px]"
                    />
                  ))}

              </div>

            ) : (

              <div className="rounded-lg border border-richblack-700 bg-richblack-800 py-12 text-center">

                <p className="text-xl font-semibold text-richblack-100">
                  No courses found
                </p>

              </div>

            )}

          </div>
        </section>

        {/* ================= REVIEWS ================= */}
        <section className="mx-auto max-w-maxContent px-5 py-12">

          <div className="rounded-xl bg-richblack-800 py-10">

            <h2 className="flex items-center justify-center gap-3 px-4 text-center text-3xl font-semibold text-richblack-5 sm:text-4xl">
              Reviews from other learners
              <MdOutlineRateReview className="text-yellow-25" />
            </h2>

            <div className="mt-8">
              <ReviewSlider />
            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Catalog;