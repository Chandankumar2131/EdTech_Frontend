import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../common/RatingStars"
import Img from "./../../common/Img";

function Course_Card({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <div className="hover:scale-105 transition-all duration-200 z-50">
      <Link to={`/courses/${course._id}`}>
        <div>
          <div className="rounded-lg">
            <Img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${Height} w-full rounded-xl object-cover`}
            />
          </div>

          <div className="flex flex-col gap-2 px-1 py-3">
            {/* Course Name */}
            <p className="text-xl text-white font-medium">
              {course?.courseName}
            </p>

            {/* Instructor */}
            <p className="text-sm text-gray-300">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">
                {avgReviewCount || 0}
              </span>

              <RatingStars Review_Count={avgReviewCount} />

              <span className="text-gray-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>

            {/* Price */}
            <p className="text-xl text-white font-semibold">
              Rs. {course?.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Course_Card;
