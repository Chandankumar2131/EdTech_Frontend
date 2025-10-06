import { useEffect, useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { sidebarLinks } from "./../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";
import Loading from "./../../common/Loading";

import { HiMenuAlt1 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import { setOpenSideMenu, setScreenSize } from "../../../slices/sidebarSlice";

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  const { openSideMenu, screenSize } = useSelector((state) => state.sidebar);

  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth));

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 640) {
      dispatch(setOpenSideMenu(false));
    } else dispatch(setOpenSideMenu(true));
  }, [screenSize]);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-gray-700 bg-gray-900">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {/* Menu icon for small screens */}
      <div
        className="sm:hidden text-white absolute left-5 top-3 z-50 cursor-pointer"
        onClick={() => dispatch(setOpenSideMenu(!openSideMenu))}
      >
        {openSideMenu ? <IoMdClose size={30} /> : <HiMenuAlt1 size={30} />}
      </div>

      {openSideMenu && (
        <div
          className="
            fixed sm:relative
            top-0 left-0
            z-40
            h-full sm:h-[calc(100vh-3.5rem)]
            w-64 sm:min-w-[220px]
            flex flex-col
            border-r border-gray-700 bg-gray-900
            py-10 px-4 sm:px-0
            transition-all duration-300 ease-in-out
          "
        >
          <div className="flex flex-col mt-8 sm:mt-6 space-y-1 sm:space-y-0">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink
                  key={link.id}
                  link={link}
                  iconName={link.icon}
                  setOpenSideMenu={setOpenSideMenu}
                />
              );
            })}
          </div>

          <div className="mx-auto my-6 h-px w-10/12 bg-gray-700" />

          <div className="flex flex-col">
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName={"VscSettingsGear"}
              setOpenSideMen={setOpenSideMenu}
            />

            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="w-full text-left"
            >
              <div className="flex items-center gap-x-2 px-6 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 relative">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
