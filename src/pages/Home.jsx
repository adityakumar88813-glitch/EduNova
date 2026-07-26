
import React from 'react'
import { Link } from 'react-router-dom'
import{FaArrowRight} from "react-icons/fa"
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Banner.mp4'
import { BiCodeBlock } from 'react-icons/bi'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'

const Home = () => {
  return (
    <div>
        {/* section 1 */}

          <div className='mar-16 p-2 relative mx-auto max-w-maxContent flex flex-col w-11/12 items-center text-white justify-between'>
             
             <Link to={"/signup"}>
                <div className='mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]  transition-all duration-200 group-hover:bg-richblack-900'>
                        <p> Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
             </Link>


              <div className='text-centre text-4xl font-semibold mt-7'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"}/>
              </div>

              <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'> 
              Empower 
With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
              </div>
             
             
            <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>
                      
             <CTAButton active={false} linkto={"/login"}>
              Book a Demo
            </CTAButton>
            </div>

             
  <div className=" mx-3 mt-12 shadow-blue-100">
  <video muted loop autoPlay   className="w-[700px] rounded-lg shadow-lg">
    <source src={Banner} type="video/mp4" />
  </video>
</div>
    
    {/* code section 1 */}
<div>
  <CodeBlocks
    position={"lg:flex-row"}
    heading={
      <div className='text-4xl font-semibold'>
        Unlock Your
        <HighlightText text={"coding potential"}/>
        with our online courses
      </div>
    }
    subheading={
      "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
    }

    ctabtn1={
      {
        btnText:"try it yourself",
        linkto:"/signup",
        active:true,
      }
    }

    ctabtn2={
      {
        btnText:"learn more",
        linkto:"/login",
        active:false,
      }
    }


    codeblock={
       `<!DOCTYPE html>
<html>
<head>
    <title>Example: Flex Hug</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <h1 class="header"></h1>

    <nav>
        <a href="#one">One</a>
        <a href="#two">Two</a>
        <a href="#three">Three</a>
    </nav>

</body>
</html>`
    }
   codeColor={"text-yellow-25"} 
  />
  
</div>


{/* code section 2 */}
<div>
  <CodeBlocks
    position={"lg:flex-row-reverse"}
    heading={
      <div className='text-4xl font-semibold'>
        Unlock Your
        <HighlightText text={"coding potential"}/>
        with our online courses
      </div>
    }
    subheading={
      "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
    }

    ctabtn1={
      {
        btnText:"Continoue Lesson",
        linkto:"/signup",
        active:true,
      }
    }

    ctabtn2={
      {
        btnText:"learn more",
        linkto:"/login",
        active:false,
      }
    }


    codeblock={
       `<!DOCTYPE html>
<html>
<head>
    <title>Example: Flex Hug</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <h1 class="header"></h1>

    <nav>
        <a href="#one">One</a>
        <a href="#two">Two</a>
        <a href="#three">Three</a>
    </nav>

</body>
</html>`
    }
   codeColor={"text-yellow-25"} 
  />
  
</div>








{/* section2 */}



          </div>

              



         {/* section 2 */}




          {/* section 3 */}






           {/* section footer */}
    </div>
  )
}

export default Home