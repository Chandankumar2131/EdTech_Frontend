import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CountryCode from "../../../data/countrycode.json"
// import { apiConnector } from "../../../services/apiConnector"
// import { contactusEndpoint } from "../../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    try {
      setLoading(true)
      // const res = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
      // console.log("Email Res - ", res)
      setLoading(false)
    } catch (error) {
      console.log("ERROR WHILE CONTACT US - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      {/* First + Last Name */}
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-1/2">
          <label htmlFor="firstname" className="text-sm font-medium text-gray-200">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter first name"
            className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-gray-200 placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="text-xs text-yellow-400">Please enter your name.</span>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:w-1/2">
          <label htmlFor="lastname" className="text-sm font-medium text-gray-200">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter last name"
            className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-gray-200 placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
            {...register("lastname")}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-200">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-gray-200 placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-xs text-yellow-400">Please enter your Email address.</span>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="text-sm font-medium text-gray-200">
          Phone Number
        </label>
        <div className="flex gap-4">
          <select
            className="w-24 rounded-md border border-gray-600 bg-gray-800 px-2 py-2 text-gray-200 focus:border-yellow-400 focus:outline-none"
            {...register("countrycode", { required: true })}
          >
            {CountryCode.map((ele, i) => (
              <option key={i} value={ele.code}>
                {ele.code} - {ele.country}
              </option>
            ))}
          </select>

          <input
            type="number"
            id="phonenumber"
            placeholder="12345 67890"
            className="flex-1 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-gray-200 placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
            {...register("phoneNo", {
              required: { value: true, message: "Please enter your Phone Number." },
              maxLength: { value: 12, message: "Invalid Phone Number" },
              minLength: { value: 10, message: "Invalid Phone Number" },
            })}
          />
        </div>
        {errors.phoneNo && (
          <span className="text-xs text-yellow-400">{errors.phoneNo.message}</span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-200">
          Message
        </label>
        <textarea
          id="message"
          rows="7"
          placeholder="Enter your message here"
          className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-gray-200 placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="text-xs text-yellow-400">Please enter your Message.</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className={`w-full rounded-md bg-yellow-400 px-6 py-3 text-center text-sm font-bold text-black shadow-md transition-all duration-200 hover:scale-95 hover:bg-yellow-300 disabled:bg-gray-500 sm:text-base`}
      >
        Send Message
      </button>
    </form>
  )
}

export default ContactUsForm
