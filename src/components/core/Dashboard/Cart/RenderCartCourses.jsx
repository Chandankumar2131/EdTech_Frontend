import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"
import Img from './../../../common/Img';

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-1 flex-col">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg ${indx !== cart.length - 1 && "border-b border-gray-400 pb-6"} ${indx !== 0 && "mt-6"}`}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            {/* course thumbnail with badge */}
            <div className="relative">
              <Img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-36 w-56 rounded-lg object-cover"
              />
              {course?.ratingAndReviews?.length > 50 && (
                <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full absolute top-2 left-2 font-semibold">
                  Popular
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-white">{course?.courseName}</p>
              <p className="text-sm text-gray-400">{course?.category?.name}</p>

              {/* Ratings */}
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">4.5</span>
                <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-gray-400">{course?.ratingAndReviews?.length} Ratings</span>
              </div>

              {/* Preview Button */}
              <button className="mt-1 w-max rounded-md bg-blue-600 text-white px-3 py-1 text-sm hover:bg-blue-500 transition-colors">
                Preview
              </button>

              {/* Progress Bar */}
              <div className="w-full mt-2">
                <div className="h-2 bg-gray-600 rounded-full">
                  <div
                    className="h-2 bg-yellow-400 rounded-full"
                    style={{ width: `${course?.progressPercentage || 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">Progress: {course?.progressPercentage || 0}%</p>
              </div>
            </div>
          </div>

          {/* Price & Remove */}
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-1 rounded-md border border-gray-600 bg-gray-700 py-3 px-3 text-pink-400 hover:bg-gray-600 transition-colors"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-3xl font-medium text-yellow-400">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
