export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-[450px] rounded-lg bg-richblack-800 p-6">
        <h2 className="text-xl font-semibold text-richblack-5">
          {modalData?.text1}
        </h2>

        <p className="mt-3 text-richblack-300">
          {modalData?.text2}
        </p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={modalData?.btn1Handler}
            className="rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900"
          >
            {modalData?.btn1Text}
          </button>

          <button
            onClick={modalData?.btn2Handler}
            className="rounded-md bg-richblack-700 px-5 py-2 font-semibold text-richblack-5"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}