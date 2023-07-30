import React, { useEffect, useState } from "react";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  // const {user} = useSelector((state)=> state.profile);
  // const {totalItems} = useSelector ((state)=> state.totalItems);
  let user = null,
    totalItems = 0;

  const instructor = "Instructor";

  const location = useLocation();

  const subLinks = [
    {
      title: "web dev",
      path: "/catalog/web-dev",
    },
    {
      title: "python",
      path: "/catalog/web-dev",
    },
    {
      title: "android",
      path: "/catalog/web-dev",
    },
  ];

  // const [subLinks, setsublinks] = useState([]);

  // const getSubLinks = async () => {
  //   try {
  //     console.log(categories.CATEGORIES_API)
  //     const result = await apiConnector("GET", categories.CATEGORIES_API);
  //     setsublinks(result?.data);
  //     console.log(subLinks)
  //   } catch (err) {
  //     console.log("Could not fetch category list", err);
  //   }
  // };

  // useEffect(() => {
  //   getSubLinks();
  // },[]);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

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
                    <div className=" flex items-center gap-2 relative group">
                      <p>{e.title}</p>
                      <IoIosArrowDropdownCircle />

                      <div
                        className="invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[40%]
                                 top-[50%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 z-50 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]"
                      >
                        <div
                          className="absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5"
                        ></div>

                        {subLinks.length ? (
                          subLinks.map((subLink, index) => (
                            <Link to={`${subLink.path}`} key={index} className=" text-richblack-700 text-[1.2rem]">
                              <p>{subLink.title}</p>
                            </Link>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={e?.path}>
                      <p
                        className={`${
                          matchRoute(e?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {e.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login/Signup/Dashboard */}

        <div className=" flex gap-x-4 items-center">
          {user && user?.accountType !== instructor && (
            <Link to="/dashboard/cart">
              <AiOutlineShoppingCart></AiOutlineShoppingCart>
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
