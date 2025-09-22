import React from "react";
import { Link } from "react-router";
import { FaArrowCircleRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBloks from "../components/core/HomePage/CodeBloks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
export default function Home() {
  return (
    <div>
      {/*Section 1 */}
      <div
        className="relative mx-auto  flex flex-col w-11/12 max-w-[1200px] items-center
        text-white justify-between"
      >
        <Link to={"/signup"}>
          <div
            className=" group mt-16 p-1 mx-auto rounded-full bg-gray-900 font-bold text-amber-50
            transition-all duration-200 hover:scale-95 w-fit"
          >
            <div className=" group-hover:bg-gray-950 flex flex-row items-center gap-2 rounded-full px-10 py-[5px]">
              <p>Become an instructor</p>
              <FaArrowCircleRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-3xl font-semibold mt-7">
          Empower your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="mt-4 w-[90%] text-center text-lg font-bold text-gray-400">
          With our online coding courses,you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on project, quizzes,and personalized feedback from
          instructors
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn more
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-12 shadow-[5px_5px_10px_white] shadow-blue-200 rounded-lg overflow-hidden">
          <video muted loop autoPlay className="w-full h-auto">
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        {/**Code Section 1 */}

        <div>
          <CodeBloks
            position={"lg:flex-row"}
            heading={
              <div className=" text-3xl lg:text-4xl font-semibold">
                Unlock Your
                <HighlightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
            codeColor={"text-yellow-300"}
            backgroundGradient={"code-block1-grad"}
          />
        </div>

        {/**Code Section 2 */}

        <div>
          <CodeBloks
            position={"lg:flex-row-reverse"}
            heading={
              <div className=" text-3xl lg:text-4xl font-semibold">
                Start
                <HighlightText text={"coding in second"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`import React, { useState, useEffect } from 'react';

function MovingText() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>React Counter: {count}</h1>
      <p>Watch this number increase every second!</p>
    </div>
  );
}

export default MovingText;`}
            codeColor={"text-green-300"}
            backgroundGradient={"code-block1-grad"}
          />
        </div>
      </div>

      {/*Section 2 */}

      <div className="bg-gray-200 text-black">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-[1200px] flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowCircleRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div>
          
        </div>
      </div>

      {/*Section 3 */}
    </div>
  );
}
