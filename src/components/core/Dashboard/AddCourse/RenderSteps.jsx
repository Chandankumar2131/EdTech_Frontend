import React from "react"
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseInformationForm from "./CourseInformation/CourseInformationForm"

export default function RenderSteps() {

  const { step } = useSelector((state) => state.course)
  const { editCourse } = useSelector(state => state.course)

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ]

  return (
    <>
      <div className="relative mb-2 flex w-full select-none justify-center ">
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center ">
              <div
                className={`grid aspect-square w-[34px] place-items-center rounded-full border-[1px]
                ${step === item.id
                    ? "border-yellow-100 bg-yellow-600 text-yellow-100"
                    : "border-gray-700 bg-gray-800 text-gray-300"}
                ${step > item.id && "bg-yellow-100 text-yellow-100"} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-gray-900" />
                ) : (
                  item.id
                )}
              </div>
            </div>

            {/* dashes */}
            {item.id !== steps.length && (
              <div
                className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 
                ${step > item.id ? "border-yellow-200" : "border-gray-500"}`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <div
            className={`sm:min-w-[130px] flex flex-col items-center gap-y-2 ${
              editCourse && "sm:min-w-[270px]"
            }`}
            key={item.id}
          >
            <p className={`text-sm ${step >= item.id ? "text-gray-100" : "text-gray-500"}`}>
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
    </>
  )
}
