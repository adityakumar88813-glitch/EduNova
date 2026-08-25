import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo-Full-Light.png";

import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { NavbarLinks } from "../../data/navbarlink";

import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
} from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Navbar scroll state
  const [showNavbar, setShowNavbar] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);

  // ================= ACTIVE ROUTE =================
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // ================= NAVBAR SCROLL =================
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 80) {
        setShowNavbar("top");
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar("hide");
      } else {
        setShowNavbar("show");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  // ================= CLOSE MOBILE MENU =================
  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  return (
    <nav
      className={`
        sticky top-0 z-[999]
        h-14 w-full
        border-b border-richblack-700
        bg-richblack-900/95
        backdrop-blur-md
        text-white
        transition-transform duration-300 ease-in-out
        ${
          showNavbar === "hide"
            ? "-translate-y-full"
            : "translate-y-0"
        }
      `}
    >
      <div className="mx-auto flex h-full w-11/12 max-w-maxContent items-center justify-between">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="flex items-center transition-transform duration-200 hover:scale-[1.02]"
        >
          <img
            src={logo}
            width={150}
            height={40}
            loading="lazy"
            alt="EduNova"
            className="w-[135px] sm:w-[150px]"
          />
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <ul className="hidden items-center gap-x-4 lg:flex xl:gap-x-6">
          {NavbarLinks.map((link, index) => (
            <li key={index}>

              {/* ================= CATALOG ================= */}
              {link?.title === "Catalog" ? (
                <div
                  className={`
                    group relative flex cursor-pointer
                    items-center gap-1
                    rounded-lg px-3 py-1.5
                    font-semibold
                    transition-all duration-200
                    ${
                      matchRoute("/catalog/:catalogName")
                        ? "bg-yellow-25 text-richblack-900"
                        : "text-richblack-25 hover:bg-richblack-800 hover:text-yellow-25"
                    }
                  `}
                >
                  <p className="text-sm xl:text-[15px]">
                    {link?.title}
                  </p>

                  <MdKeyboardArrowDown
                    size={18}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />

                  {/* ================= DROPDOWN ================= */}
                  <div
                    className="
                      invisible absolute left-1/2 top-full z-[1000]
                      mt-3 w-[230px]
                      -translate-x-1/2
                      rounded-xl
                      border border-richblack-700
                      bg-richblack-5
                      p-3
                      text-richblack-900
                      opacity-0
                      shadow-xl
                      transition-all duration-200
                      group-hover:visible
                      group-hover:opacity-100
                    "
                  >
                    {/* Arrow */}
                    <div
                      className="
                        absolute -top-2 left-1/2
                        h-4 w-4
                        -translate-x-1/2
                        rotate-45
                        border-l border-t
                        border-richblack-700
                        bg-richblack-5
                      "
                    />

                    {subLinks.length > 0 ? (
                      subLinks.map((subLink, i) => (
                        <Link
                          key={i}
                          to={`/catalog/${subLink?.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}`}
                          className="
                            block rounded-lg
                            px-4 py-3
                            text-sm font-medium
                            transition-all duration-200
                            hover:bg-richblack-50
                            hover:text-yellow-600
                          "
                        >
                          {subLink?.name}
                        </Link>
                      ))
                    ) : (
                      <p className="py-3 text-center text-sm">
                        No Courses Found
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* ================= NORMAL LINK ================= */
                <Link to={link?.path}>
                  <p
                    className={`
                      rounded-lg
                      px-3 py-1.5
                      text-sm
                      font-semibold
                      transition-all duration-200
                      xl:text-[15px]

                      ${
                        matchRoute(link?.path)
                          ? "bg-yellow-25 text-richblack-900"
                          : "text-richblack-25 hover:bg-richblack-800 hover:text-yellow-25"
                      }
                    `}
                  >
                    {link.title}
                  </p>
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* ================= CART ================= */}
          {user && user?.accountType !== "Instructor" && (
            <Link
              to="/dashboard/cart"
              className="relative"
              title="Shopping Cart"
            >
              <div
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  text-richblack-5
                  transition-all duration-200
                  hover:bg-richblack-700
                  hover:text-yellow-25
                "
              >
                <AiOutlineShoppingCart size={22} />
              </div>

              {/* Cart Count */}
              {totalItems > 0 && (
                <span
                  className="
                    absolute -right-1 -top-1
                    flex h-5 w-5
                    items-center justify-center
                    rounded-full
                    bg-yellow-50
                    text-[10px]
                    font-bold
                    text-richblack-900
                  "
                >
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* ================= PROFILE ================= */}
          {token !== null && user && (
            <Link
              to="/dashboard/my-profile"
              title="My Profile"
              className={`
                flex items-center gap-2
                rounded-lg
                px-2 py-1
                transition-all duration-200
                ${
                  matchRoute("/dashboard/my-profile")
                    ? "bg-richblack-700"
                    : "hover:bg-richblack-800"
                }
              `}
            >
              {/* Profile Image */}
              {user?.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="
                    h-8 w-8
                    rounded-full
                    border border-richblack-600
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-full
                    bg-yellow-50
                    text-richblack-900
                  "
                >
                  <AiOutlineUser size={18} />
                </div>
              )}

              {/* First Name */}
              <span
                className="
                  hidden
                  text-sm
                  font-semibold
                  text-richblack-5
                  md:block
                "
              >
                {user?.firstName || "Profile"}
              </span>
            </Link>
          )}

          {/* ================= LOGIN + SIGNUP ================= */}
          {token === null && (
            <div className="hidden items-center gap-2 sm:flex">

              {/* Login */}
              <Link to="/login">
                <button
                  className={`
                    rounded-lg
                    px-3 py-1.5
                    text-sm font-semibold
                    transition-all duration-200
                    ${
                      matchRoute("/login")
                        ? "border-2 border-yellow-50 text-yellow-50"
                        : "border border-richblack-700 bg-richblack-800 text-richblack-100 hover:border-richblack-500 hover:bg-richblack-700"
                    }
                  `}
                >
                  Log in
                </button>
              </Link>

              {/* Signup */}
              <Link to="/signup">
                <button
                  className={`
                    rounded-lg
                    px-3 py-1.5
                    text-sm font-semibold
                    transition-all duration-200
                    ${
                      matchRoute("/signup")
                        ? "bg-yellow-25 text-richblack-900"
                        : "border border-richblack-700 bg-richblack-800 text-richblack-100 hover:bg-yellow-25 hover:text-richblack-900"
                    }
                  `}
                >
                  Sign Up
                </button>
              </Link>

            </div>
          )}

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            type="button"
            onClick={() => setMobileMenu((prev) => !prev)}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              text-richblack-5
              transition-all
              hover:bg-richblack-700
              sm:hidden
            "
          >
            {mobileMenu ? (
              <AiOutlineClose size={23} />
            ) : (
              <AiOutlineMenu size={23} />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenu && (
        <div
          className="
            absolute left-0 top-14
            z-[1000]
            w-full
            border-b border-richblack-700
            bg-richblack-900
            px-5 py-5
            shadow-xl
            sm:hidden
          "
        >
          <div className="flex flex-col gap-2">

            {/* Mobile Profile */}
            {token !== null && user && (
              <Link
                to="/dashboard/my-profile"
                className="
                  mb-2 flex items-center gap-3
                  rounded-xl
                  border border-richblack-700
                  bg-richblack-800
                  px-4 py-3
                  transition-all
                  hover:border-yellow-50
                "
              >
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="
                      h-10 w-10
                      rounded-full
                      border border-richblack-600
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-full
                      bg-yellow-50
                      text-richblack-900
                    "
                  >
                    <AiOutlineUser size={20} />
                  </div>
                )}

                <div className="flex flex-col">
                  <span className="text-xs text-richblack-400">
                    My Account
                  </span>

                  <span className="text-sm font-semibold text-richblack-5">
                    {user?.firstName || "My Profile"}
                  </span>
                </div>
              </Link>
            )}

            {/* Mobile Navigation Links */}
            {NavbarLinks.map((link, index) => (
              <Link
                key={index}
                to={link?.path}
                className={`
                  rounded-lg
                  px-4 py-3
                  text-sm
                  font-semibold
                  transition-all duration-200
                  ${
                    matchRoute(link?.path)
                      ? "bg-yellow-25 text-richblack-900"
                      : "text-richblack-25 hover:bg-richblack-800 hover:text-yellow-25"
                  }
                `}
              >
                {link.title}
              </Link>
            ))}

            {/* Mobile Login / Signup */}
            {token === null && (
              <div
                className="
                  mt-3 grid grid-cols-2
                  gap-3
                  border-t border-richblack-700
                  pt-4
                "
              >
                <Link to="/login">
                  <button
                    className="
                      w-full rounded-lg
                      border border-richblack-600
                      bg-richblack-800
                      px-4 py-2.5
                      text-sm font-semibold
                      text-richblack-5
                      hover:border-yellow-50
                      hover:text-yellow-50
                    "
                  >
                    Log in
                  </button>
                </Link>

                <Link to="/signup">
                  <button
                    className="
                      w-full rounded-lg
                      bg-yellow-50
                      px-4 py-2.5
                      text-sm font-semibold
                      text-richblack-900
                      hover:bg-yellow-100
                    "
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;