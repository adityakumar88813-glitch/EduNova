
import React from 'react'
import Highlighttext from "../HomePage/HighlightText"
import know_your_progress from "../../../assets/Know_your_progress.png"
import compare_with_others from "../../../assets/Compare_with_others.svg"
import plan_your_lesson from "../../../assets/Plan_your_lessons.svg"
import CTAButton from "../HomePage/Button";

const LearingLanguageSection = () => {
  return (
    <div className='mt-[140px] mb-32'>
  <div className='flex flex-col gap-5 items-center'>

  <div className='text-semibold text-center text-5xl '>
    Your Swiss Knife for 
    <Highlighttext text={"learing any Language"}/>
  </div>

  <div className="mx-auto max-w-3xl text-center text-base font-medium leading-6 text-richblack-600">
  <p>
    Using Spin making learning multiple
    languages easy, with 20+ languages realistic voice-over,
  </p>
  <p>progress tracking, custom schedule and more.</p>
</div>


<div className="flex flex-row items-center justify-center mt-5">
  <img
    src={know_your_progress}
    alt="KnowYourProgressImage"
    className="object-contain -mr-32 ml-3"
  />

  <img
    src={compare_with_others}
    alt="CompareWithOthersImage"
    className="object-contain ml-3"
  />

  <img
    src={plan_your_lesson}
    alt="PlanYourLessonImage"
    className="object-contain -ml-32"
  />
</div>

<div className='w-fit mb-20 mt-2'>
  <CTAButton active={true} linkto={"/signup"}>
  <div>
    Learn More
  </div>
</CTAButton>

</div>

  </div>

    </div>






  )
}

export default LearingLanguageSection