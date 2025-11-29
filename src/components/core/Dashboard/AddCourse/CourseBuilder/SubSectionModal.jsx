import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload";

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
      setValue("timeDuration", modalData.timeDuration || "00:00");
    }
  }, [modalData, setValue, view, edit]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl ||
      currentValues.timeDuration !== (modalData.timeDuration || "00:00")
    );
  };

  const handleEditSubsection = async () => {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("subSectionId", modalData._id);
    formData.append("sectionId", modalData.sectionId);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.timeDuration !== (modalData.timeDuration || "00:00")) {
      formData.append("timeDuration", currentValues.timeDuration);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("videoFile", currentValues.lectureVideo); // Match backend
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      dispatch(setCourse({ ...course, courseContent: updatedCourseContent }));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
        return;
      }
      handleEditSubsection();
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("timeDuration", data.timeDuration || "00:00"); // Default duration
    if (data.lectureVideo instanceof File) {
      formData.append("videoFile", data.lectureVideo); // Match backend
    }

    setLoading(true);
    const result = await createSubSection(formData, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      dispatch(setCourse({ ...course, courseContent: updatedCourseContent }));
    }
    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center overflow-auto bg-slate-700 bg-opacity-10 backdrop-blur-sm">
  <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-slate-500 bg-slate-900">
    
    {/* Modal Header */}
    <div className="flex items-center justify-between rounded-t-lg bg-slate-800 p-5">
      <p className="text-xl font-semibold text-gray-50">
        {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
      </p>

      <button onClick={() => (!loading ? setModalData(null) : {})}>
        <RxCross2 className="text-2xl text-gray-50" />
      </button>
    </div>

    {/* Modal Form */}
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">

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
        <label className="text-sm text-gray-50" htmlFor="lectureTitle">
          Lecture Title {!view && <sup className="text-pink-300">*</sup>}
        </label>

        <input
          disabled={view || loading}
          id="lectureTitle"
          placeholder="Enter Lecture Title"
          {...register("lectureTitle", { required: true })}
          className="form-style w-full text-white bg-slate-800"
        />

        {errors.lectureTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-300">
            Lecture title is required
          </span>
        )}
      </div>

      {/* Lecture Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-gray-50" htmlFor="lectureDesc">
          Lecture Description {!view && <sup className="text-pink-300">*</sup>}
        </label>

        <textarea
          disabled={view || loading}
          id="lectureDesc"
          placeholder="Enter Lecture Description"
          {...register("lectureDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full text-amber-50 bg-slate-800"
        />

        {errors.lectureDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-300">
            Lecture Description is required
          </span>
        )}
      </div>

      {/* Time Duration */}
      {!view && (
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-gray-50" htmlFor="timeDuration">
            Time Duration (mm:ss)
          </label>

          <input
            id="timeDuration"
            placeholder="00:00"
            {...register("timeDuration")}
            className="form-style w-full text-amber-50 bg-slate-800"
          />
        </div>
      )}

      {!view && (
        <div className="flex justify-end">
          <IconBtn
            disabled={loading}
            text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
          />
        </div>
      )}
    </form>
  </div>
</div>
  );
}