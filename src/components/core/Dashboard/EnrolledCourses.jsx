import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ProgressBar from "@ramonak/react-progress-bar";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import Img from "../../common/Img";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    };
    fetchCourses();
  }, [token]);

  // Empty state with icon, description, and button
  if (enrolledCourses?.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-1/2 w-full text-center text-gray-100 gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17v-6h6v6M12 3v4m6 6H6"
          />
        </svg>

        <h2 className="text-3xl font-semibold">No Courses Enrolled Yet</h2>
        <p className="text-gray-300 max-w-sm">
          You haven’t enrolled in any courses. Start exploring our library and find the perfect course for you!
        </p>

        <button
          onClick={() => navigate("/dashboard/catalog")}
          className="mt-4 rounded-lg bg-yellow-500 px-6 py-2 font-medium text-gray-900 hover:bg-yellow-400 transition"
        >
          Explore Courses
        </button>
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="text-4xl text-gray-100 font-bold text-center sm:text-left mb-6">
        Enrolled Courses
      </h2>

      {!enrolledCourses ? (
        <p className="text-gray-300">Loading...</p>
      ) : (
        enrolledCourses.map((course, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-700 p-4 rounded-lg mb-4 hover:shadow-lg transition-shadow bg-gray-800"
          >
            <Img
              src={course.thumbnail}
              alt="course"
              className="h-14 w-14 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-100">{course.courseName}</h3>
              <p className="text-xs text-gray-400">
                {course.courseDescription.length > 50
                  ? `${course.courseDescription.slice(0, 50)}...`
                  : course.courseDescription}
              </p>
            </div>

            <div className="flex-1 mt-2 sm:mt-0">
              <p className="text-gray-100 mb-1">
                Progress: {course.progressPercentage || 0}%
              </p>
              <ProgressBar
                completed={course.progressPercentage || 0}
                height="8px"
                isLabelVisible={false}
                className="rounded-full bg-gray-600"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
