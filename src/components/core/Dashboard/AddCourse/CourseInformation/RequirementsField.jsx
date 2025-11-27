import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RiDeleteBin6Line } from "react-icons/ri"

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions)
    }
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    })
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
  }, [requirementsList])

  const handleAddRequirement = () => {
    if (requirement && !requirementsList.includes(requirement)) {
      setRequirementsList([...requirementsList, requirement])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-white" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-600 text-white focus:outline-none"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-300"
        >
          Add
        </button>
      </div>

      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((req, index) => (
            <li key={index} className="flex items-center text-white">
              <span>{req}</span>
              <button
                type="button"
                className="ml-2 text-xs text-gray-300"
                onClick={() => handleRemoveRequirement(index)}
              >
                <RiDeleteBin6Line className="text-pink-200 text-sm hover:scale-125 duration-200" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
