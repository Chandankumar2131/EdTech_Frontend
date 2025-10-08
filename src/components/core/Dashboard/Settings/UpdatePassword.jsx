import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    console.log("password Data - ", data)
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-6 rounded-md border border-gray-700 bg-gray-900 p-6 sm:p-8 text-gray-100">
          <h2 className="text-lg font-semibold text-gray-100">Password</h2>

          <div className="flex flex-col gap-5 lg:flex-row">
            {/* Current Password */}
            <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
              <label htmlFor="oldPassword" className="text-sm font-medium text-gray-200">
                Current Password
              </label>

              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="w-full rounded-md border border-gray-600 bg-gray-800 py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("oldPassword", { required: true })}
              />

              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-10 z-10 cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

              {errors.oldPassword && (
                <span className="mt-1 text-xs text-yellow-400">
                  Please enter your Current Password.
                </span>
              )}
            </div>

            {/* New Password */}
            <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
              <label htmlFor="newPassword" className="text-sm font-medium text-gray-200">
                New Password
              </label>

              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New newPassword"
                className="w-full rounded-md border border-gray-600 bg-gray-800 py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("newPassword", { required: true })}
              />

              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-10 z-10 cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

              {errors.newPassword && (
                <span className="mt-1 text-xs text-yellow-400">
                  Please enter your New Password.
                </span>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">
                Confirm New Password
              </label>

              <input
                type={showConfirmNewPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Enter Confirm New Password"
                className="w-full rounded-md border border-gray-600 bg-gray-800 py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("confirmPassword", { required: true })}
              />

              <span
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                className="absolute right-3 top-10 z-10 cursor-pointer"
              >
                {showConfirmNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

              {errors.confirmNewPassword && (
                <span className="mt-1 text-xs text-yellow-400">
                  Please enter your Confirm New Password.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
          <button
            onClick={() => { navigate("/dashboard/my-profile") }}
            className="cursor-pointer rounded-md bg-gray-700 py-2 px-5 font-semibold text-gray-100 hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </>
  )
}
