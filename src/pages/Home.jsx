import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import LearingLanguageSection from "../components/core/HomePage/LearingLanguageSection";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import InstructorSection from "../components/InstructorSection";
import Banner from "../assets/Banner.mp4";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div className="w-full overflow-hidden bg-richblack-900 text-white">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative">
        <div className="mx-auto flex w-11/12 max-w-[1200px] flex-col items-center">

          {/* Instructor Button */}
          <Link to="/signup" className="mt-16 sm:mt-20 lg:mt-24">
  <div className="group rounded-full bg-richblack-800 p-[1px] font-bold text-richblack-200 transition-all duration-200 hover:scale-95">
    <div className="flex items-center gap-3 rounded-full px-4 py-3 sm:px-6 sm:py-3">
      <p className="text-sm sm:text-base">
        Become an Instructor
      </p>

      <FaArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
    </div>
  </div>
</Link>

          {/* Hero Heading */}
          <div className="mt-8 w-full text-center text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-[52px]">
            Empower Your Future with{" "}
            <HighlightText text="Coding Skills" />
          </div>

          {/* Hero Description */}
          <div className="mt-5 w-full max-w-[800px] text-center text-sm leading-6 text-richblack-300 sm:text-base md:text-lg">
            With our online coding courses, you can learn at your own pace,
            from anywhere in the world.
          </div>

          {/* Hero Buttons */}
          <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-5">
            <CTAButton active={true} linkto="/signup">
              Learn More
            </CTAButton>

            <CTAButton active={false} linkto="/login">
              Book a Demo
            </CTAButton>
          </div>

          {/* =================================================
              VIDEO
          ================================================= */}
          <div className="my-10 w-full sm:my-14">
            <div className="mx-auto w-full max-w-[1000px] overflow-hidden rounded-xl border border-richblack-700 bg-richblack-800 shadow-xl sm:rounded-2xl">
              <div className="aspect-video w-full">
                <video
                  className="h-full w-full object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                >
                  <source src={Banner} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* =================================================
              FIRST CODE SECTION
          ================================================= */}
          <div className="w-full">
            <CodeBlocks
              position="lg:flex-row"
              heading={
                <div className="text-3xl font-semibold leading-tight sm:text-4xl">
                  Unlock Your{" "}
                  <HighlightText text="coding potential" /> with our courses
                </div>
              }
              subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              ctabtn1={{
                btnText: "Try it yourself",
                linkto: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn More",
                linkto: "/login",
                active: false,
              }}
              codeblock={`<!DOCTYPE html>
<html>
<head>
<title>Example</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header>Header</header>
<nav>
<a href="/">One</a>
<a href="/">Two</a>
<a href="/">Three</a>
</nav>
</body>`}
              codeColor="text-yellow-25"
            />
          </div>

          {/* =================================================
              SECOND CODE SECTION
          ================================================= */}
          <div className="w-full">
            <CodeBlocks
              position="lg:flex-row-reverse"
              heading={
                <div className="text-3xl font-semibold leading-tight sm:text-4xl">
                  Start{" "}
                  <HighlightText text="coding in seconds" />
                </div>
              }
              subheading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              ctabtn1={{
                btnText: "Continue Lesson",
                linkto: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn More",
                linkto: "/login",
                active: false,
              }}
              codeblock={`<!DOCTYPE html>
<html>
<head>
<title>Example</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header>Header</header>
<nav>
<a href="/">One</a>
<a href="/">Two</a>
<a href="/">Three</a>
</nav>
</body>`}
              codeColor="text-yellow-25"
            />
          </div>
        </div>

        {/* Explore More */}
        <div className="relative z-10 mt-10 translate-y-16 px-4 sm:mt-16 sm:translate-y-20">
          <ExploreMore />
        </div>
      </section>

      {/* =====================================================
          WHITE SECTION
      ===================================================== */}
      <section className="bg-white text-richblack-700">

        {/* Catalog Banner */}
        <div className="image_png min-h-[300px] w-full">
          <div className="mx-auto flex min-h-[300px] w-11/12 max-w-maxContent flex-col items-center justify-center gap-6 py-12">

            <div className="h-10 sm:h-16"></div>

            <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-5">
              <CTAButton active={true} linkto="/signup">
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto="/login">
                <div className="flex items-center gap-2">
                  Learn More
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>

        {/* =================================================
            JOB SKILLS SECTION
        ================================================= */}
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-10 py-14 sm:py-20 lg:py-24">

          <div className="flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:gap-12">

            {/* Heading */}
            <div className="w-full text-3xl font-semibold leading-tight sm:text-4xl lg:w-[48%]">
              Get the skills you need for a{" "}
              <HighlightText text="job that is in demand" />
            </div>

            {/* Content */}
            <div className="flex w-full flex-col items-start gap-7 lg:w-[42%]">

              <div className="text-sm leading-6 text-richblack-600 sm:text-base">
                The modern StudyNotion dictates its own terms. Today, to be a
                competitive specialist requires more than professional skills.
              </div>

              <CTAButton active={true} linkto="/signup">
                Learn More
              </CTAButton>

            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mx-auto w-11/12 max-w-maxContent">
          <TimelineSection />
        </div>

        {/* Languages */}
        <div className="mx-auto w-11/12 max-w-maxContent">
          <LearingLanguageSection />
        </div>
      </section>

      {/* =====================================================
          INSTRUCTOR + REVIEWS + FOOTER
      ===================================================== */}
      <section className="bg-richblack-900 text-white">

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-12 py-14 sm:gap-16 sm:py-20">

          {/* Instructor */}
          <div className="w-full">
            <InstructorSection />
          </div>

          {/* Reviews */}
          <div className="w-full">
            <h2 className="mb-8 text-center text-3xl font-semibold sm:text-4xl">
              Review from Other Learners
            </h2>

            <ReviewSlider />
          </div>

        </div>

        {/* Footer */}
        <Footer />
      </section>

    </div>
  );
};

export default Home;