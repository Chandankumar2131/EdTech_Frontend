import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const result = await fetchInstructorCourses(token);
      setLoading(false);
      if (result) setCourses(result);
    };
    fetchCourses();
  }, [token]);

  console.log("chandan from fetch course details:",courses[0]?.courseContent?.[0]?.subSection?.[0]?.timeDuration);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-3 sm:px-4 md:px-8 lg:px-16 w-full overflow-x-hidden">
      
      {/* Header Responsive */}
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-100 font-boogaloo">
          My Courses
        </h1>

        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <IconBtn
            text="Add Course"
            onClick={() => navigate("/dashboard/add-course/basic-details")}
            className="w-full sm:w-auto"
          >
            <VscAdd />
          </IconBtn>
        </div>
      </div>

      {/* Courses Table Wrapper to allow mobile scroll */}
      <div className="w-full overflow-x-auto">
        {courses && (
          <CoursesTable
            courses={courses}
            setCourses={setCourses}
            loading={loading}
            setLoading={setLoading}
            
          />
        )}
      </div>
    </div>
  );
}
