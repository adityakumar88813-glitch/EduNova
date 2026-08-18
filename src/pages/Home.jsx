import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import LearingLanguageSection from "../components/core/HomePage/LearingLanguageSection";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import InstructorSection from "../components/InstructorSection"
import Banner from "../assets/Banner.mp4";
import Footer from "../components/common/Footer"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import ReviewSlider from "../components/common/ReviewSlider"
import Signup from "./Signup";

const Home = () => {
  return (
    <div className="text-white">

      {/* Hero Section */}
      <div>
        <div className="relative mx-auto flex w-11/12 max-w-[1200px] flex-col items-center">

        <Link to="/signup">
          <div className="group mt-16 rounded-full bg-richblack-800 p-[1px] font-bold text-richblack-200 transition-all duration-200 hover:scale-95">
            <div className="flex items-center gap-2 rounded-full px-6 py-3">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="mt-8 text-center text-4xl font-semibold lg:text-5xl">
          Empower Your Future with{" "}
          <HighlightText text="Coding Skills" />
        </div>

        <div className="mt-6 w-[90%] text-center text-lg text-richblack-300">
          With our online coding courses, you can learn at your own pace,
          from anywhere in the world.
        </div>

        <div className="mt-8 flex gap-5">
          <CTAButton active={true} linkto="/signup">
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto="/login">
            Book a Demo
          </CTAButton>
        </div>




<div className="my-10 flex justify-center">
  <div className="w-full h-[400px] rounded-2xl overflow-hidden">
    <video
      className="w-full h-full object-contain"
      muted
      loop
      autoPlay
      playsInline
    >
      <source src={Banner} type="video/mp4" />
    </video>
  </div>
</div>


        {/* First Code Section */}

        <CodeBlocks
          position="lg:flex-row"
          heading={
            <div className="text-4xl font-semibold">
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

        {/* Second Code Section */}

        <CodeBlocks
          position="lg:flex-row-reverse"
          heading={
            <div className="text-4xl font-semibold">
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



   <div className="relative z-10 translate-y-24">
  <ExploreMore />
</div>





    </div>






{/* section 2 of home page white bg vala */}

  <div className="-mt-10 bg-white text-richblack-700">
  <div className="image_png h-[320px] ">


<div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">

<div className="h-[210px]"></div>
 <div className="flex flex-row gap-7 text-white ">

 <CTAButton active={true} linkto={"/signup"}>
 <div className="flex items-center gap-1">
  Expore Full Catalog
  <FaArrowRight/>
 </div>

 </CTAButton>


 <CTAButton active={false} linkto={"/login"}>
        <div className="flex items-center gap-1">
           Learn More
         <FaArrowRight/>
           </div>

 </CTAButton>




 

 </div>




</div>



  </div>
  


 <div className="w-11/12 mx-auto  flex flex-col max-w-maxContent items-center justify-between gap-7">
    
    <div className="flex felx-row gap-5 mb-10 mt-[95px]" >
      
      <div className="text-4xl font-semibold w-[45%]">
        Get the skills you need for a 
        <HighlightText text={"job that is in demand"}/>
      </div>

      <div className="flex flex-col gap-10 w-[40%] items-start ">
    <div className="text-[16px]">
      The modern StudyNotion is the dictates its own terms. Today, to be a competitive
      specialist requires more than professional skills.
    </div>

    <CTAButton active={true} linkto={"/signup"}>
    <div>Learn More</div>
    </CTAButton>
    </div>


    </div>


    

 </div>


<TimelineSection/>

<LearingLanguageSection/>

</div>


{/* section 3 */}
<div className="flex flex-col gap-8 w-11/12 mx-auto max-w-maxContent items-center justify-between bg-richblack-900 text-white ">

<InstructorSection/>

<h2 className="text-center  text-4xl font-semibold mt-16">Review from Other Learners</h2>
{/* reviewslider code  */}
<ReviewSlider/>

<Footer/>
</div>

  <div>
   
  </div>


      </div>





  




  );
};

export default Home;

//...