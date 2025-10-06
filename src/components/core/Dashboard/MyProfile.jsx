import { useEffect } from "react"
import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"
import Img from './../../common/Img'

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* Title */}
      <h1 className="mb-8 sm:mb-14 text-3xl sm:text-4xl font-medium font-boogaloo text-center sm:text-left text-white">
        My Profile
      </h1>

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 sm:gap-0 rounded-2xl border border-gray-700 bg-gray-800 p-6 sm:p-8 sm:px-12">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-x-6 text-center sm:text-left">
          <Img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-24 sm:w-20 rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold capitalize text-white">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-gray-300">{user?.email}</p>
          </div>
        </div>

        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>

      {/* About Section */}
      <div className="my-8 sm:my-10 flex flex-col gap-y-6 sm:gap-y-10 rounded-2xl border border-gray-700 bg-gray-800 p-6 sm:p-8 sm:px-12">
        <div className="flex flex-col sm:flex-row w-full items-center sm:items-center justify-between gap-4 sm:gap-0">
          <p className="text-lg font-semibold text-white">About</p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-white"
              : "text-gray-400"
          } text-sm font-medium text-center sm:text-left`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      {/* Personal Details Section */}
      <div className="my-8 sm:my-10 flex flex-col gap-y-6 sm:gap-y-10 rounded-2xl border border-gray-700 bg-gray-800 p-6 sm:p-8 sm:px-12">
        <div className="flex flex-col sm:flex-row w-full items-center sm:items-center justify-between gap-4 sm:gap-0">
          <p className="text-lg font-semibold text-white">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        {/* Responsive Details Grid */}
        <div className="flex flex-col sm:flex-row w-full justify-between gap-8 sm:gap-0">
          <div className="flex flex-col gap-y-5 w-full sm:w-1/2">
            <div>
              <p className="mb-2 text-sm text-gray-600">First Name</p>
              <p className="text-sm font-semibold capitalize text-white">
                {user?.firstName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-600">Account Type</p>
              <p className="text-sm font-semibold capitalize text-white">
                {user?.accountType}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-600">Email</p>
              <p className="text-sm font-semibold text-white">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-600">Gender</p>
              <p className="text-sm font-semibold text-white">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-5 w-full sm:w-1/2">
            <div>
              <p className="mb-2 text-sm text-gray-600">Last Name</p>
              <p className="text-sm font-semibold capitalize text-white">
                {user?.lastName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-600">Phone Number</p>
              <p className="text-sm font-semibold text-white">
                {user?.additionalDetails?.contactNumber ??
                  "Add Contact Number"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-600">Date Of Birth</p>
              <p className="text-sm font-semibold text-white">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
