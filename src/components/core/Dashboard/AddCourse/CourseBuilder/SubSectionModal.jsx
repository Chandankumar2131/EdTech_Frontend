import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"

export default function SubSectionModal({ modalData, setModalData, add = false, view = false, edit = false }) {
  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    )
  }

  const handleEditSubsection = async () => {
    const currentValues = getValues()
    const formData = new FormData()
    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)
    if (currentValues.lectureTitle !== modalData.title) formData.append("title", currentValues.lectureTitle)
    if (currentValues.lectureDesc !== modalData.description) formData.append("description", currentValues.lectureDesc)
    if (currentValues.lectureVideo !== modalData.videoUrl) formData.append("video", currentValues.lectureVideo)

    setLoading(true)
    const result = await updateSubSection(formData, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()
      }
      return
    }

    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)

    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 grid h-screen w-screen place-items-center overflow-auto bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-2xl rounded-lg border border-gray-400 bg-gray-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-gray-700 p-5">
          <p className="text-xl font-semibold text-gray-100">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-gray-100" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
          {/* Lecture Video Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-100" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-pink-400">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="border border-gray-400 rounded px-3 py-2 w-full bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs text-pink-400">Lecture title is required</span>
            )}
          </div>

          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-100" htmlFor="lectureDesc">
              Lecture Description {!view && <sup className="text-pink-400">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="border border-gray-400 rounded px-3 py-2 w-full bg-gray-900 text-gray-100 resize-none min-h-[130px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs text-pink-400">Lecture Description is required</span>
            )}
          </div>

          {!view && (
            <div className="flex justify-end">
              <IconBtn disabled={loading} text={loading ? "Loading.." : edit ? "Save Changes" : "Save"} />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
