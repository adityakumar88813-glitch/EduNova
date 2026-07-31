import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData.heading;

  return (
    <div
      onClick={() => setCurrentCard(cardData.heading)}
      className={`w-[360px] h-[300px] cursor-pointer transition-all duration-300
      ${
        isActive
          ? "bg-white shadow-[12px_12px_0px] shadow-yellow-300"
          : "bg-richblack-800"
      }`}
    >
      {/* Upper Part */}

      <div
        className={`h-[80%] p-6 border-b-2 border-dashed flex flex-col justify-between
        ${
          isActive
            ? "border-richblack-300"
            : "border-richblack-500"
        }`}
      >
        <div>
          <h2
            className={`text-2xl font-bold ${
              isActive ? "text-richblack-900" : "text-richblack-5"
            }`}
          >
            {cardData.heading}
          </h2>

          <p
            className={`mt-4 text-base ${
              isActive ? "text-richblack-600" : "text-richblack-400"
            }`}
          >
            {cardData.description}
          </p>
        </div>
      </div>

      {/* Bottom */}

      <div
        className={`h-[20%] px-6 flex justify-between items-center text-sm font-medium
        ${
          isActive ? "text-blue-500" : "text-richblack-300"
        }`}
      >
        <div className="flex items-center gap-2">
          <HiUsers className="text-lg" />
          <span>{cardData.level}</span>
        </div>

        <div className="flex items-center gap-2">
          <ImTree className="text-lg" />
          <span>{cardData.lessionNumber} Lesson</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;