import IconBtn from "./IconBtn";

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-black/30 backdrop-blur-sm">
      <div className="w-10/12 max-w-[350px] rounded-lg border border-gray-400 bg-gray-900 p-6 z-10">
        <p className="text-2xl font-semibold text-gray-100">
          {modalData?.text1}
        </p>

        <p className="mt-3 mb-5 leading-6 text-gray-400">
          {modalData?.text2}
        </p>

        <div className="flex items-center gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="cursor-pointer rounded-md bg-gray-300 text-gray-900 hover:bg-gray-900 hover:text-gray-300 py-2 px-5 font-semibold duration-300"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}
