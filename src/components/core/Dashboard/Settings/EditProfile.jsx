import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-6 rounded-md border border-gray-700 bg-gray-900 p-6 sm:p-8 text-gray-100">
          <h2 className="text-lg font-semibold text-gray-100">
            Profile Information
          </h2>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 w-full lg:w-1/2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-200">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="w-full rounded-md border border-gray-600 bg-gray-800 py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="mt-1 text-xs text-yellow-400">
                  Please enter your first name.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full lg:w-1/2">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-200">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="w-full rounded-md border border-gray-600 bg-gray-800 py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="mt-1 text-xs text-yellow-400">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 w-full lg:w-1/2">
              <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-200">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="w-full rounded-md border border-gray-600 bg-gray-800 py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="mt-1 text-xs text-yellow-400">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full lg:w-1/2">
              <label htmlFor="gender" className="text-sm font-medium text-gray-200">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="w-full rounded-md border border-gray-600 bg-gray-800 py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => (
                  <option key={i} value={ele}>{ele}</option>
                ))}
              </select>
              {errors.gender && (
                <span className="mt-1 text-xs text-yellow-400">
                  Please enter your Gender.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 w-full lg:w-1/2">
              <label htmlFor="contactNumber" className="text-sm font-medium text-gray-200">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="w-full rounded-md border border-gray-600 bg-gray-800 py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="mt-1 text-xs text-yellow-400">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full lg:w-1/2">
              <label htmlFor="about" className="text-sm font-medium text-gray-200">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="w-full rounded-md border border-gray-600 bg-gray-800 py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="mt-1 text-xs text-yellow-400">
                  Please enter your About.
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
          <IconBtn type="submit" text="Save" />
        </div>

      </form>
    </>
  )
}
