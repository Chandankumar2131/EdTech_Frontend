import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homwpage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-0"> 
      {/* Explore more section */}
      <div>
        <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center my-6 sm:my-8 lg:my-10">
          Unlock the
          <HighlightText text={"Power of Code"} />
          <p className="text-center text-gray-400 text-sm sm:text-base lg:text-lg font-semibold mt-2 sm:mt-3">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex gap-2 sm:gap-3 lg:gap-5 mt-4 sm:mt-0 -mt-2 sm:-mt-3 lg:-mt-5 mx-4 sm:mx-auto w-full sm:w-max overflow-x-auto scrollbar-hide bg-gray-800 text-gray-400 p-2 sm:p-1 rounded-2xl font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]
">
        {tabsName.map((ele, index) => {
          return (
            <div
              className={`text-sm sm:text-[16px] flex flex-row items-center gap-2 ${
                currentTab === ele
                  ? "bg-gray-900 text-gray-200 font-medium"
                  : "text-gray-400"
              } px-4 sm:px-6 lg:px-7 py-[6px] sm:py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-gray-900 hover:text-gray-200`}
              key={index}
              onClick={() => setMyCards(ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>

      <div className="hidden lg:block lg:h-[200px]"></div>

      {/* Cards Group */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-0 lg:absolute lg:justify-between w-full text-black lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] mb-10 sm:mb-12 lg:mb-0 px-2 sm:px-4 lg:px-0">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
