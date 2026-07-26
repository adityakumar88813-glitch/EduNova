import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"

import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/Button'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'

import Banner from '../assets/Banner.mp4'

const Home = () => {
  return (
    <div>

      {/* Section 1 */}
      <div className='mt-16 p-2 relative mx-auto max-w-maxContent flex flex-col w-11/12 items-center text-white'>

        <Link to={"/signup"}>
          <div className='rounded-full bg-richblack-800 font-bold text-richblack-200 hover:scale-95 w-fit'>
            <div className='flex items-center gap-2 px-6 py-2'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className='text-center text-4xl font-semibold mt-7'>
          Empower Your Future with{" "}
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world.
        </div>

        <div className='flex gap-7 mt-8'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mt-12">
          <video muted loop autoPlay className="w-[700px] rounded-lg shadow-lg">
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}
        <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <div className='text-4xl font-semibold'>
              Unlock Your{" "}
              <HighlightText text={"coding potential"} /> with our courses
            </div>
          }
          subheading={"Learn from industry experts."}
          ctabtn1={{
            btnText: "Try it yourself",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn more",
            linkto: "/login",
            active: false,
          }}
          codeblock={`<h1>Hello World</h1>`}
          codeColor={"text-yellow-25"}
        />

      </div>
    </div>
  )
}

export default Home


//this is new