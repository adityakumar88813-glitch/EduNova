import React from "react";

import FoundingStory from "../assets/FoundingStory.png";
import BannerImage1 from "../assets/aboutus1.webp";
import BannerImage2 from "../assets/aboutus2.webp";
import BannerImage3 from "../assets/aboutus3.webp";

import Footer from "../components/common/Footer";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponenet from "../components/core/AboutPage/Stats";
import HighlightText from "../components/core/HomePage/HighlightText";
import Img from "../components/common/Img";
import ReviewSlider from "../components/common/ReviewSlider";

import { MdOutlineRateReview } from "react-icons/md";
import { motion } from "framer-motion";
import { fadeIn } from "../components/common/motionFrameVarients";

const About = () => {
  return (
    <div className="w-full overflow-hidden bg-richblack-900">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative bg-richblack-700">

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center text-center text-white">

          {/* Heading */}
          <motion.header
            className="mx-auto w-full py-14 sm:py-16 lg:w-[75%] lg:py-20"
            variants={fadeIn("down", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Driving Innovation in Online Education for a{" "}
              <HighlightText text="Brighter Future" />
            </h1>

            <motion.p
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="mx-auto mt-5 w-full text-sm leading-6 text-richblack-300 sm:text-base sm:leading-7 lg:w-[90%]"
            >
              EduNova is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </motion.p>
          </motion.header>

          {/* Banner Images */}
          <div className="relative z-10 mt-2 grid w-full grid-cols-1 gap-4 pb-8 sm:grid-cols-3 sm:gap-4 sm:pb-0">

            <motion.div
              variants={fadeIn("right", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Img
                src={BannerImage1}
                alt="Online learning"
                className="h-full w-full rounded-xl object-cover"
              />
            </motion.div>

            <motion.div
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Img
                src={BannerImage2}
                alt="Students learning"
                className="h-full w-full rounded-xl object-cover"
              />
            </motion.div>

            <motion.div
              variants={fadeIn("left", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Img
                src={BannerImage3}
                alt="Online education"
                className="h-full w-full rounded-xl object-cover"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          QUOTE SECTION
      ===================================================== */}
      <section className="border-b border-richblack-700 bg-richblack-900">

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-10 py-16 sm:py-20 lg:py-24">
          <Quote />
        </div>

      </section>

      {/* =====================================================
          FOUNDING STORY
      ===================================================== */}
      <section className="bg-richblack-900">

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-16 py-14 sm:py-20 lg:gap-24 lg:py-24">

          {/* Founding Story */}
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-16">

            <motion.div
              variants={fadeIn("right", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="w-full lg:w-1/2"
            >
              <div className="flex flex-col gap-6">

                <h2 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                  Our Founding Story
                </h2>

                <p className="text-sm leading-6 text-richblack-300 sm:text-base sm:leading-7">
                  Our e-learning platform was born out of a shared vision and
                  passion for transforming education. It all began with a group
                  of educators, technologists, and lifelong learners who
                  recognized the need for accessible, flexible, and
                  high-quality learning opportunities in a rapidly evolving
                  digital world.
                </p>

                <p className="text-sm leading-6 text-richblack-300 sm:text-base sm:leading-7">
                  As experienced educators ourselves, we witnessed firsthand
                  the limitations and challenges of traditional education
                  systems. We believed that education should not be confined
                  to the walls of a classroom or restricted by geographical
                  boundaries. We envisioned a platform that could bridge these
                  gaps and empower individuals from all walks of life to unlock
                  their full potential.
                </p>

              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              variants={fadeIn("left", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="w-full lg:w-[45%]"
            >
              <Img
                src={FoundingStory}
                alt="Our founding story"
                className="w-full rounded-2xl shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </motion.div>

          </div>

          {/* =================================================
              VISION + MISSION
          ================================================= */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Vision */}
            <motion.div
              variants={fadeIn("right", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col gap-5"
            >
              <h2 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                Our Vision
              </h2>

              <p className="text-sm leading-6 text-richblack-300 sm:text-base sm:leading-7">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              variants={fadeIn("left", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col gap-5"
            >
              <h2 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                Our Mission
              </h2>

              <p className="text-sm leading-6 text-richblack-300 sm:text-base sm:leading-7">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment
                of sharing and dialogue, and we foster this spirit of
                collaboration through forums, live sessions, and networking
                opportunities.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}
      <StatsComponenet />

      {/* =====================================================
          LEARNING + CONTACT
      ===================================================== */}
      <section className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-14 py-14 text-white sm:gap-20 sm:py-20 lg:py-24">

        <LearningGrid />

        <ContactFormSection />

      </section>

      {/* =====================================================
          REVIEWS
      ===================================================== */}
      <section className="bg-richblack-900">

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-8 py-14 text-white sm:py-20">

          <h2 className="flex flex-col items-center justify-center gap-2 text-center text-3xl font-semibold sm:flex-row sm:gap-x-3 sm:text-4xl">
            Reviews from other learners

            <MdOutlineRateReview className="text-yellow-25" />
          </h2>

          <div className="w-full">
            <ReviewSlider />
          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <Footer />

    </div>
  );
};

export default About;