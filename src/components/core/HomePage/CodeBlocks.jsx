import React from 'react'
import CTAButton from "./Button"
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  codeColor
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>

      {/* LEFT SIDE */}
      <div className='w-[50%] flex flex-col gap-8'>
        {heading}

        <div className='text-richblack-300 font-bold'>
          {subheading}
        </div>

        <div className='flex gap-7 mt-7'>
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center'>
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className='flex w-[50%] bg-black p-4 rounded-lg'>

        {/* Line Numbers */}
        <div className='text-center flex flex-col w-[10%] text-gray-400 font-mono'>
          {Array.from({ length: 11 }, (_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code */}
        <div className={`w-[90%] font-mono ${codeColor}`}>
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>

      </div>

    </div>
  )
}

export default CodeBlocks 

// this is new