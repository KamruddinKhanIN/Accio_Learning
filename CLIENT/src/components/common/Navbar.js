import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";

const Navbar = () => {

  const location =useLocation();
  const matchRoute = (route)=>{
    console.log(matchPath({path:route}, location.pathname))
    return matchPath({path:route}, location.pathname);
    
  }


  return (
    <div className=" flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className=" w-11/12 flex max-w-maxContent items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="Header logo"
            width={160}
            height={42}
            loading="lazy"
          />
        </Link>

        {/* NavLinks */}

        <nav>
          <ul className=" flex gap-x-6 text-richblack-25 ">
            {NavbarLinks.map((e, index) => {
              return (
                <li key={index}>
                  {e.title === "Catalog" ? (
                    " "
                  ) : (
                    <Link to={e?.path}>
                      <p className={`${matchRoute(e?.path)?"text-yellow-25" : "text-richblack-25"}`}>{e.title}</p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>


        {/* Login/Signup/Dashboard */}

        
      </div>
    </div>
  );
};

export default Navbar;
