
import React from 'react'
import Logo1 from "../../../assets/LeadershipLogo.svg"
import Logo2 from "../../../assets/responsbileLogo.svg"
import Logo3 from "../../../assets/flexLogo.svg"
import Logo4 from "../../../assets/sloveLogo.svg"
import timelineimage from "../../../assets/TimelineImage.jpg"

const timeline = [
    {
        logo: Logo1,
        heading : "Leadership",
        Description:"Fully committed to the success company",
    },

     {
        logo: Logo2,
        heading : "Responsibility",
        Description:"Students will always to our top priority",
    },

     {
        logo: Logo3,
        heading : "Flexibility",
        Description:"The ability to switch in a professional skills",
    },

     {
        logo: Logo4,
        heading : "Solve the problem",
        Description:"Code you way to a solution",
    },
]

const TimelineSection = () => {
  return (
    <div>
   
   <div className='flex flex-row items-center gap-16'>

  <div className='flex flex-col gap-7 w-[45%]'>
  {
    timeline.map((element , index)=>{
        return(
            <div className='flex flex-row gap-4 ml-20 key={index}'>

            <div className='w-[50px] h-[50px] flex items-center'>
            <img src={element.logo}/>
            </div>

            <div>
                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                <p className='text-base'>{element.Description}</p>
            </div>

            </div>
        )
    })
  }

  </div>

<div className='relative shadow-blue-200 object-cover '>

<img src={timelineimage}
    alt='timelineImage'
    className='w-[700px] h-[500px] shadow-white rounded-md mt-3'
/>


<div className='absolute bg-caribbeangreen-700 flex fex-row text-white uppercase py-7
      left-[50%] translate-x-[-50%] translate-y-[-50%]'>
     <div className='flex flex-row gap-3 items-center border-r border-caribbeangreen-200  pr-4 py-3'>
        <p className='text-3xl font-bold'>10</p>
        <p className='text-caribbeangreen-200 text-sm'>Years of Experience</p>
     </div>

     <div className='flex gap-3 items-center px-7'>
        <p className='text-3xl font-bold'>250</p>
        <p className='text-caribbeangreen-200 text-sm'>Types of courses</p>
     </div>
</div>

</div>


  </div>

  </div>



  )
}

export default TimelineSection