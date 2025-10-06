import React, { useState, useEffect } from 'react'
import { Link, matchPath, useLocation } from 'react-router'
import { useSelector } from 'react-redux'

import { NavbarLinks } from "../../data/navbar-links";
import studyNotionLogo from '../../assets/Logo/Logo-Full-Light.png'
import { fetchCourseCategories } from './../../services/operations/courseDetailsAPI';

import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md"
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchSublinks = async () => {
    try {
      setLoading(true)
      const res = await fetchCourseCategories();
      setSubLinks(res);
    } catch (error) {
      console.log("Could not fetch the category list = ", error);
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSublinks();
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  }

  const [showNavbar, setShowNavbar] = useState('top');
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  },)

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY)
        setShowNavbar('hide')
      else setShowNavbar('show')
    } else setShowNavbar('top')
    setLastScrollY(window.scrollY);
  }

  return (
    <nav
      className={`z-[10] flex h-14 w-full items-center justify-center border-b border-gray-700 text-white translate-y-0 transition-all ${showNavbar}`}
    >
      <div className='flex w-11/12 max-w-[1260px] items-center justify-between'>

        {/* LOGO */}
        <Link to="/">
          <img
            src={studyNotionLogo}
            width={140}
            height={40}
            loading='lazy'
            alt="StudyNotion Logo"
          />
        </Link>

        {/* HAMBURGER (MOBILE) */}
        <div className="flex items-center gap-3 sm:hidden">
          {user && user?.accountType === "Student" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-3xl text-gray-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-1 -right-2 grid h-4 w-4 place-items-center rounded-full bg-gray-600 text-[10px] font-bold text-yellow-200">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-3xl text-gray-200"
          >
            {mobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* NAV LINKS (DESKTOP) */}
        <ul className='hidden sm:flex gap-x-6 text-gray-200'>
          {
            NavbarLinks.map((link, index) => (
              <li key={index}>
                {
                  link.title === "Catalog" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                        ? "bg-yellow-200 text-black rounded-xl p-1 px-3"
                        : "text-gray-200 rounded-xl p-1 px-3"
                        }`}
                    >
                      <p>{link.title}</p>
                      <MdKeyboardArrowDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] 
                        flex-col rounded-lg bg-gray-100 p-4 text-gray-900 opacity-0 transition-all duration-150 group-hover:visible 
                        group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                      >
                        <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-gray-100"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                className="rounded-lg py-3 pl-4 hover:bg-gray-200"
                                key={i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p className={`${matchRoute(link?.path)
                        ? "bg-yellow-200 text-black"
                        : "text-gray-200"} rounded-xl p-1 px-3 `}>
                        {link.title}
                      </p>
                    </Link>
                  )
                }
              </li>
            ))
          }
        </ul>

        {/* AUTH BUTTONS / PROFILE (DESKTOP) */}
        <div className='hidden sm:flex gap-x-4 items-center'>
          {user && user?.accountType === "Student" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-[2.35rem] text-gray-100 hover:bg-gray-700 rounded-full p-2 duration-200" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-gray-600 text-center text-xs font-bold text-yellow-200">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <>
              <Link to="/login">
                <button className={`cursor-pointer px-[12px] py-[8px] text-gray-200 rounded-md 
                ${matchRoute('/login') ? 'border-[2.5px] border-yellow-200' : 'border border-gray-700 bg-gray-800'} `}>
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className={`cursor-pointer px-[12px] py-[8px] text-gray-200 rounded-md 
                ${matchRoute('/signup') ? 'border-[2.5px] border-yellow-200' : 'border border-gray-700 bg-gray-800'} `}>
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>

     {/* MOBILE MENU */}
{mobileMenuOpen && (
  <div className="fixed inset-0 z-[50] bg-black/60 backdrop-blur-md sm:hidden flex flex-col items-center justify-start">
    <div className="bg-gray-900 w-[90%] mt-4 rounded-xl flex flex-col gap-5 py-6 px-6 border border-gray-700 shadow-lg">
      {NavbarLinks.map((link, index) => (
        <Link
          to={link?.path || "#"}
          key={index}
          className="text-gray-200 text-lg font-medium hover:text-yellow-200 w-full text-center border-b border-gray-800 pb-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          {link.title}
        </Link>
      ))}

      <div className="flex flex-col gap-3 mt-4">
        {token === null ? (
          <>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full border border-gray-700 bg-gray-800 rounded-md py-2 text-gray-200 hover:bg-gray-700">
                Log in
              </button>
            </Link>
            <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full border border-gray-700 bg-gray-800 rounded-md py-2 text-gray-200 hover:bg-gray-700">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <ProfileDropDown mobile />
        )}
      </div>
    </div>
  </div>
)}

    </nav>
  )
}

export default Navbar
