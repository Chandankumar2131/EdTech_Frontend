import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import ReactPlayer from "react-player"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )

  // file drop
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  // Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
    multiple: false,
  })

  // base64 preview
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  // RHF register
  useEffect(() => {
    register(name, { required: true })
  }, [register, name])

  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue, name])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-gray-100" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      {/* MAIN UPLOAD BOX */}
      <div
        {...getRootProps()}
        className={`${
          isDragActive ? "bg-gray-600" : "bg-gray-700"
        } flex cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-gray-500 overflow-hidden
          ${previewSource ? "min-h-0" : "min-h-[180px]"} max-h-[350px]`}
      >
        <input {...getInputProps()} />

        {previewSource ? (
          /* Preview section — fixed height, no layout stretching */
          <div className="flex w-full flex-col items-center p-4 max-h-[320px] overflow-y-auto">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="w-full h-auto max-h-[300px] object-cover rounded-md"
              />
            ) : (
              <div className="w-full max-h-[300px] overflow-hidden rounded-md">
                <ReactPlayer
                  url={previewSource}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            )}

            {!viewData && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-gray-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          /* Before upload */
          <div className="flex w-full flex-col p-6 h-[180px] overflow-hidden items-center justify-center">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-gray-800">
              <FiUploadCloud className="text-2xl text-yellow-100" />
            </div>

            <p className="mt-2 text-center text-sm text-gray-300">
              Drag & drop a {!video ? "image" : "video"}, or{" "}
              <span className="font-semibold text-yellow-100">Browse</span>
            </p>

            <ul className="mt-4 flex gap-4 text-center text-xs text-gray-300">
              <li>Aspect ratio 16:9</li>
              <li>1024x576 recommended</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
