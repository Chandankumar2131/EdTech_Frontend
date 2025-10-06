import { useState } from "react";
import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"

import ConfirmationModal from './../../../common/ConfirmationModal';
import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [check, setCheck] = useState(false);

  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      <div className="my-10 flex flex-col sm:flex-row gap-5 rounded-md border border-pink-700 bg-pink-900 p-6 sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>

        <div className="flex flex-col flex-1 mt-4 sm:mt-0">
          <h2 className="text-lg font-semibold text-gray-100">Delete Account</h2>

          <div className="sm:w-3/5 mt-1 text-pink-100 flex flex-col gap-3">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the content associated with it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
            <input
              type="checkbox"
              className="h-4 w-4 rounded cursor-pointer accent-pink-500"
              checked={check}
              onChange={() => setCheck(prev => !prev)}
            />

            <button
              type="button"
              className="italic text-pink-300 hover:text-pink-400 transition-colors"
              onClick={() => check &&
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "Delete my account...!",
                  btn1Text: "Delete",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(deleteProfile(token, navigate)),
                  btn2Handler: () => { setConfirmationModal(null); setCheck(false) },
                })
              }
            >
              I want to delete my account.
            </button>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
