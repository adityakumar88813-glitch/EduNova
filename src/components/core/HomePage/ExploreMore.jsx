import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "../../CourseCard";

const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);

    const result = HomePageExplore.filter(
      (course) => course.tag === value
    );

    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center relative">

      {/* Heading */}

      <div className="text-4xl font-semibold text-center">
        Unlock the <HighlightText text={"Power of Code"} />
      </div>

      <p className="text-richblack-300 text-lg mt-3 text-center">
        Learn to build anything you can imagine
      </p>

      {/* Tabs */}

      <div className="flex justify-center mt-10">
        <div className="flex flex-wrap gap-2 rounded-full bg-richblack-800 p-2">
          {tabName.map((element, index) => (
            <div
              key={index}
              onClick={() => setMyCards(element)}
              className={`px-7 py-3 rounded-full cursor-pointer transition-all duration-200
              ${
                currentTab === element
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5"
              }`}
            >
              {element}
            </div>
          ))}
        </div>
      </div>

      {/* Space before cards */}

      <div className="h-[180px]"></div>

      {/* Cards */}

      <div className="relative -mt-[90px] z-10 flex flex-wrap justify-center gap-8 w-full">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            cardData={course}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>

    </div>
  );
};

export default ExploreMore;