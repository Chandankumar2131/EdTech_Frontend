import React from "react";
import { Link, matchPath } from "react-router";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router";
export default function Navbar() {



  const location = useLocation();

  const matchRout = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-gray-700">
      <div className="flex w-11/12 max-w-[1200px] items-center justify-between">
        {/*Logo*/}
        <Link to="/">
          <img src={logo} width={160} height={42} />
        </Link>
        {/*Nav Links*/}
        <nav>
          <ul className="flex gap-6 text-white font-medium">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div>Catalog</div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRout(link?.path) ? "text-yellow-400" : "text-white"
                      }`}
                    >
                      {link?.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

{/* login/signup/dashboard */}

<div className="flex gap-x-4 items-center">

</div>
      </div>
    </div>
  );
}
