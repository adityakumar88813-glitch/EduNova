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

        console.log(
          "ALL CATEGORIES:",
          JSON.stringify(res?.data?.data, null, 2)
        );

        const allCategories = res?.data?.data || [];

        // Find category safely
        // API currently returns "Name", but "name" is also supported
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

        // Category not found
        if (!selectedCategory) {
          console.log(
            "CATEGORY NOT FOUND FOR:",
            catalogName
          );

          setCategoryId("");
          setCatalogPageData(null);
          setLoading(false);

          return;
        }

        console.log(
          "SELECTED CATEGORY:",
          selectedCategory
        );

        setCategoryId(selectedCategory._id);
      } catch (error) {
        console.log(
          "GET CATEGORIES ERROR:",
          error
        );

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

        console.log(
          "CATALOG PAGE DATA:",
          JSON.stringify(res, null, 2)
        );

        setCatalogPageData(res);
      } catch (error) {
        console.log(
          "GET CATEGORY DETAILS ERROR:",
          error
        );

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
  // SAFE CATEGORY NAME
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
    selectedCategory?.description || "";

  const differentCategoryName =
    differentCategory?.Name ||
    differentCategory?.name ||
    "";

  // =========================================================
  // SAFE COURSE ARRAYS
  // =========================================================
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
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-richblack-900 text-richblack-5">
        <div className="text-xl font-semibold">
          Loading...
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

  // =========================================================
  // MAIN UI
  // =========================================================
  return (
    <>
      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <div className="box-content bg-richblack-800 px-4">
        <div
          className="
            mx-auto
            flex
            min-h-[260px]
            max-w-maxContentTab
            flex-col
            justify-center
            gap-4
            lg:max-w-maxContent
          "
        >
          {/* Breadcrumb */}
          <p className="text-sm text-richblack-300">
            Home / Catalog /
            <span className="ml-1 text-yellow-25">
              {selectedCategoryName}
            </span>
          </p>

          {/* Category Name */}
          <h1 className="text-3xl font-semibold text-richblack-5">
            {selectedCategoryName}
          </h1>

          {/* Description */}
          <p className="max-w-[870px] text-richblack-200">
            {selectedCategoryDescription}
          </p>
        </div>
      </div>

      {/* =====================================================
          SECTION 1 - COURSES TO GET STARTED
      ===================================================== */}
      <div
        className="
          mx-auto
          box-content
          w-full
          max-w-maxContentTab
          px-4
          py-12
          lg:max-w-maxContent
        "
      >
        <div className="text-3xl font-semibold text-richblack-5">
          Courses to get you started
        </div>

        {/* Tabs */}
        <div className="my-4 flex border-b border-richblack-600 text-sm">
          {/* MOST POPULAR */}
          <p
            className={`
              cursor-pointer
              px-4
              py-2
              ${
                active === 1
                  ? "border-b border-yellow-25 text-yellow-25"
                  : "text-richblack-300"
              }
            `}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>

          {/* NEW */}
          <p
            className={`
              cursor-pointer
              px-4
              py-2
              ${
                active === 2
                  ? "border-b border-yellow-25 text-yellow-25"
                  : "text-richblack-300"
              }
            `}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>

        {/* Courses */}
        <div className="py-4">
          {selectedCourses.length > 0 ? (
            <CourseSlider Courses={selectedCourses} />
          ) : (
            <div className="py-10 text-xl font-semibold text-richblack-100">
              No Course Found
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          SECTION 2 - TOP COURSES
      ===================================================== */}
      <div
        className="
          mx-auto
          box-content
          w-full
          max-w-maxContentTab
          px-4
          py-12
          lg:max-w-maxContent
        "
      >
        <div className="text-3xl font-semibold text-richblack-5">
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
        </div>

        <div className="py-8">
          {differentCourses.length > 0 ? (
            <CourseSlider Courses={differentCourses} />
          ) : (
            <div className="py-6 text-xl font-semibold text-richblack-100">
              No Course Found
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          SECTION 3 - FREQUENTLY BOUGHT
      ===================================================== */}
      <div
        className="
          mx-auto
          box-content
          w-full
          max-w-maxContentTab
          px-4
          py-12
          lg:max-w-maxContent
        "
      >
        <div className="text-3xl font-semibold text-richblack-5">
          Frequently Bought
        </div>

        <div className="py-8">
          {mostSellingCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
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
            <div className="py-6 text-xl font-semibold text-richblack-100">
              No Course Found
            </div>
          )}
        </div>

        {/* =================================================
            REVIEWS
        ================================================= */}
        <div
          className="
            relative
            mx-auto
            my-20
            flex
            w-11/12
            max-w-maxContent
            flex-col
            items-center
            justify-between
            gap-8
            bg-richblack-900
            text-white
          "
        >
          <h1
            className="
              mt-8
              flex
              items-center
              justify-center
              gap-x-3
              text-center
              text-3xl
              font-semibold
              lg:text-4xl
            "
          >
            Reviews from other learners

            <MdOutlineRateReview className="text-yellow-25" />
          </h1>

          <ReviewSlider />
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <Footer />
    </>
  );
};

export default Catalog;