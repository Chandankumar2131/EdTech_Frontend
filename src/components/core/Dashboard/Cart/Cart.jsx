import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      <h1 className="mb-8 text-4xl font-bold text-white text-center sm:text-left">
        Your Cart
      </h1>

      <p className="border-b border-gray-600 pb-2 font-semibold text-gray-400 mb-6">
        {totalItems} {totalItems === 1 ? "Course" : "Courses"} in Cart
      </p>

      {total > 0 ? (
        <div className="flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <div className="flex-1 bg-gray-900 rounded-xl p-6 shadow-lg">
            <RenderCartCourses />
          </div>
          <RenderTotalAmount />
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-40 w-40 text-gray-600 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9M6 6h15"
            />
          </svg>
          <p className="text-center text-gray-300 text-xl sm:text-2xl">
            Your cart is empty! <br /> Browse courses and add them to get started.
          </p>
        </div>
      )}
    </div>
  )
}
