import React from "react";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  codeColor,
}) => {
  return (
    <div
      className={`flex flex-col ${position} w-full items-center justify-between gap-16 py-16`}
    >
      {/* LEFT SECTION */}
      <div className="flex w-full flex-col gap-6 lg:w-[48%]">
        {heading}

        <p className="text-richblack-300 leading-7">
          {subheading}
        </p>

        <div className="mt-2 flex gap-5">
          <CTAButton
            active={ctabtn1.active}
            linkto={ctabtn1.linkto}
          >
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton
            active={ctabtn2.active}
            linkto={ctabtn2.linkto}
          >
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="relative flex w-full justify-center items-center lg:w-[48%]">

        {/* Glow Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-80 w-80 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 opacity-40 blur-[120px]"></div>
        </div>

        {/* Code Box */}
        <div className="relative z-10 flex w-full max-w-[500px] rounded-xl border border-richblack-700 bg-richblack-800 shadow-2xl">

          {/* Line Numbers */}
          <div className="select-none border-r border-richblack-700 px-4 py-5 text-richblack-400 font-mono">
            {Array.from({ length: 14 }, (_, index) => (
              <p key={index}>{index + 1}</p>
            ))}
          </div>

          {/* Animated Code */}
          <div className="flex-1 p-5 font-mono text-sm">
            <TypeAnimation
              sequence={[codeblock, 3000]}
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
              style={{
                whiteSpace: "pre-line",
                display: "block",
                color: "#FFD60A",
                lineHeight: "1.7",
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;

//...