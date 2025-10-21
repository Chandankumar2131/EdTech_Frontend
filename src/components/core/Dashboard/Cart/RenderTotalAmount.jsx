import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { AiOutlineShoppingCart } from "react-icons/ai"

import IconBtn from "../../../common/IconBtn"
// import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = async () => {
    const courses = cart.map((course) => course._id)
    console.log("buy these courses :", courses)
    
    // await buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[280px] rounded-md border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-lg">
      
      {/* Header with cart icon */}
      <div className="flex items-center gap-2 mb-4">
        <AiOutlineShoppingCart className="text-2xl text-yellow-400" />
        <p className="text-gray-400 font-semibold">{cart.length} Courses</p>
      </div>

      {/* Total Amount */}
      <p className="mb-1 text-sm font-medium text-gray-400">Total:</p>
      <p className="mb-2 text-3xl font-bold text-yellow-400">₹ {total}</p>
      
      {/* Optional savings info */}
      {cart.length > 1 && (
        <p className="mb-6 text-xs text-green-400">You are saving 10% 🎉</p>
      )}

      {/* Buy Now Button */}
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center hover:scale-105 transition-transform"
      />
    </div>
  )
}
