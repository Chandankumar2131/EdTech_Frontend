import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { updateUserProfileImage } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"
import Img from './../../../common/Img';

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)


  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("image", profileImage)

      dispatch(updateUserProfileImage(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (profileImage) {
      previewFile(profileImage)
    }
  }, [profileImage])

console.log("TOKEN before API:", token);


  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-md border border-gray-700 bg-gray-900 p-6 sm:p-8 text-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="w-20 h-20 rounded-full object-cover"
          />

          <div className="mt-4 sm:mt-0 space-y-2">
            <p className="font-medium text-gray-100">Change Profile Picture</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg, image/jpg"
              />

              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md py-2 px-5 font-semibold bg-gray-300 text-gray-900 hover:bg-gray-900 hover:text-gray-100 transition-colors duration-300"
              >
                Select
              </button>

              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg" />
                )}
              </IconBtn>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
