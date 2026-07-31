import React from "react";
import Instructor from "../assets/instrcutor.jpg";
import HighlightText from "./core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto mt-2">
      <div className="flex items-center justify-between gap-16">

        {/* Left Image */}
        <div className="w-1/2 -mt-4">
          <img
            src={Instructor}
            alt="Become an Instructor"
            className="w-full rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-1/2 flex flex-col gap-6">

          <h2 className="text-5xl font-semibold leading-tight ">
            Become an
            <br />
            <HighlightText text={"Instructor"} />
          </h2>

          <p className="text-richblack-300 text-lg leading-8">
            Instructors from around the world teach millions of students on
            StudyCode. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-2">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InstructorSection;