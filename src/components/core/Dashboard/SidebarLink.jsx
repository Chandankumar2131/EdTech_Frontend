import * as Icons from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router";
import { resetCourseState } from "../../../slices/courseSlice";
import { setOpenSideMenu } from "../../../slices/sidebarSlice";

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();

  const { openSideMenu, screenSize } = useSelector((state) => state.sidebar);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const handleClick = () => {
    dispatch(resetCourseState());
    if (openSideMenu && screenSize <= 640) dispatch(setOpenSideMenu(false));
  };

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}
      className={`relative flex items-center gap-2 sm:gap-3 md:gap-4 px-5 sm:px-7 md:px-8 py-2 text-xs sm:text-sm md:text-base font-medium
        ${
          matchRoute(link.path)
            ? "bg-yellow-600 text-yellow-50"
            : "text-gray-300 hover:bg-gray-700 duration-200"
        }
        transition-all`}
    >
      {/* Left highlight bar */}
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 transition-opacity duration-200
          ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}
        `}
      ></span>

      <div className="flex items-center gap-x-2 sm:gap-x-3">
        <Icon className="text-base sm:text-lg md:text-xl" />
        <span className="truncate">{link.name}</span>
      </div>
    </NavLink>
  );
}
