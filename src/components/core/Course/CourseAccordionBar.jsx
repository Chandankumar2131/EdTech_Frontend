import { useEffect, useRef, useState } from "react"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"
import { IoMdArrowDropdown } from "react-icons/io"

export default function CourseAccordionBar({ course, isActive, handleActive }) {

  const contentEl = useRef(null)
  const [active, setActive] = useState(false)
  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])

  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  return (
    <div className="overflow-hidden border border-solid border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-100 last:mb-0 duration-200">
      
      <div>
        <div
          className="flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-all"
          onClick={() => handleActive(course._id)}
        >
          <div className="flex items-center gap-2">
            <i className={isActive.includes(course._id) ? "rotate-180 duration-300" : "rotate-0 duration-300"}>
              <IoMdArrowDropdown size={25} />
            </i>
            <p>{course?.sectionName}</p>
          </div>

          <div className="space-x-4">
            <span className="text-yellow-300">
              {`${course.subSection.length || 0} lecture(s)`}
            </span>
          </div>
        </div>
      </div>

      <div
        ref={contentEl}
        className="relative h-0 overflow-hidden bg-gray-900 transition-[height] duration-300 ease-in-out"
        style={{ height: sectionHeight }}
      >
        <div className="flex flex-col gap-2 px-7 py-6 font-semibold text-gray-200">
          {course?.subSection?.map((subSec, i) => (
            <CourseSubSectionAccordion subSec={subSec} key={i} />
          ))}
        </div>
      </div>

    </div>
  )
}
