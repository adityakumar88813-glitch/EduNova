import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo-Full-Light.png";

import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { NavbarLinks } from "../../data/navbarlink";
import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI";

import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
} from "react-icons/ai";

import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  // ================= REDUX =================
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  // ================= LOCATION =================
  const location = useLocation();

  // ================= STATES =================
  const [subLinks, setSubLinks] = useState([]);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Navbar scroll state
  const [showNavbar, setShowNavbar] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);

  // =====================================================
  // GET COURSE URL
  // =====================================================
  // IMPORTANT:
  // API me courseName aa raha hai.
  // Isliye hum subLink.courseName use karenge.
  // Yahan .split() use nahi kiya gaya hai.
  // =====================================================

  const getCoursePath = (courseName) => {
    if (
      typeof courseName !== "string" ||
      courseName.trim() === ""
    ) {
      return "/catalog";
    }

    return `/catalog/${courseName
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase()}`;
  };

  // =====================================================
  // FETCH COURSES
  // =====================================================

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCourseCategories();

        console.log(
          "COURSE CATEGORIES IN NAVBAR:",
          JSON.stringify(categories, null, 2)
        );

        // Make sure we always store an array
        if (Array.isArray(categories)) {
          setSubLinks(categories);
        } else {
          setSubLinks([]);
        }
      } catch (error) {
        console.log(
          "ERROR FETCHING COURSES IN NAVBAR:",
          error
        );

        setSubLinks([]);
      }
    };

    getCategories();
  }, []);

  // =====================================================
  // ACTIVE ROUTE
  // =====================================================

  const matchRoute = (route) => {
    if (!route) return false;

    return matchPath(
      {
        path: route,
      },
      location.pathname
    );
  };

  // =====================================================
  // NAVBAR SCROLL
  // =====================================================

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
      window.removeEventListener(
        "scroll",
        controlNavbar
      );
    };
  }, [lastScrollY]);

  // =====================================================
  // CLOSE MOBILE MENU ON ROUTE CHANGE
  // =====================================================

  useEffect(() => {
    setMobileMenu(false);
    setCatalogOpen(false);
  }, [location.pathname]);

  // =====================================================
  // CLOSE CATALOG WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".catalog-menu")) {
        setCatalogOpen(false);
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside
      );
    };
  }, []);

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
      {/* =====================================================
          MAIN NAVBAR CONTAINER
      ===================================================== */}

      <div
        className="
          mx-auto
          flex
          h-full
          w-11/12
          max-w-maxContent
          items-center
          justify-between
        "
      >
        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link
          to="/"
          className="
            flex
            items-center
            transition-transform
            duration-200
            hover:scale-[1.02]
          "
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

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <ul
          className="
            hidden
            items-center
            gap-x-4
            lg:flex
            xl:gap-x-6
          "
        >
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {/* =================================================
                  CATALOG
              ================================================= */}

              {link?.title === "Catalog" ? (
                <div
                  className="
                    catalog-menu
                    relative
                  "
                >
                  {/* CATALOG BUTTON */}

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setCatalogOpen(
                        (prev) => !prev
                      );
                    }}
                    className={`
                      flex
                      cursor-pointer
                      items-center
                      gap-1
                      rounded-lg
                      px-3
                      py-1.5
                      font-semibold
                      transition-all
                      duration-200

                      ${
                        catalogOpen ||
                        matchRoute(
                          "/catalog/:catalogName"
                        )
                          ? "bg-richblack-800 text-yellow-50"
                          : "text-richblack-50 hover:bg-richblack-800 hover:text-yellow-25"
                      }
                    `}
                  >
                    <span className="text-sm xl:text-[15px]">
                      Catalog
                    </span>

                    <MdKeyboardArrowDown
                      size={18}
                      className={`
                        transition-transform
                        duration-200

                        ${
                          catalogOpen
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    />
                  </button>

                  {/* =================================================
                      CATALOG DROPDOWN
                  ================================================= */}

                  {catalogOpen && (
                    <div
                      className="
                        absolute
                        left-1/2
                        top-full
                        z-[1000]
                        mt-3
                        w-[260px]
                        -translate-x-1/2
                        rounded-xl
                        border
                        border-richblack-700
                        bg-richblack-900
                        p-3
                        shadow-2xl
                      "
                    >
                      {/* ARROW */}

                      <div
                        className="
                          absolute
                          -top-2
                          left-1/2
                          h-4
                          w-4
                          -translate-x-1/2
                          rotate-45
                          border-l
                          border-t
                          border-richblack-700
                          bg-richblack-900
                        "
                      />

                      {/* TITLE */}

                      <p
                        className="
                          mb-2
                          px-3
                          pt-1
                          text-xs
                          font-bold
                          uppercase
                          tracking-wider
                          text-richblack-400
                        "
                      >
                        Available Courses
                      </p>

                      {/* COURSES */}

                      <div
                        className="
                          max-h-[280px]
                          overflow-y-auto
                        "
                      >
              {subLinks.length > 0 ? (
  subLinks.map((subLink, i) => {
    const categoryName = subLink?.Name;

    if (
      typeof categoryName !== "string" ||
      categoryName.trim() === ""
    ) {
      return null;
    }

    return (
      <Link
        key={subLink?._id || i}
        to={`/catalog/${categoryName
          .trim()
          .replace(/\s+/g, "-")
          .toLowerCase()}`}
        onClick={() => setCatalogOpen(false)}
        className="
          flex
          items-center
          gap-3
          rounded-lg
          px-3
          py-3
          text-sm
          font-medium
          text-richblack-100
          transition-all
          duration-200
          hover:bg-richblack-800
          hover:text-yellow-50
        "
      >
        <span
          className="
            h-2
            w-2
            shrink-0
            rounded-full
            bg-yellow-50
          "
        />

        <span>
          {categoryName}
        </span>
      </Link>
    );
  })
) : (
  <p
    className="
      px-3
      py-6
      text-center
      text-sm
      text-richblack-400
    "
  >
    No Courses Found
  </p>
)}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* =================================================
                   NORMAL NAVBAR LINK
                ================================================= */
<Link
  to={link?.path || "#"}
  className={`
    rounded-lg
    px-3 py-2
    text-sm
    font-semibold
    transition-all
    duration-200
    xl:text-[15px]

    ${
      matchRoute(link?.path)
        ? "bg-yellow-50 text-richblack-900"
        : "text-richblack-25 hover:bg-richblack-800 hover:text-yellow-50"
    }
  `}
>
  {link?.title}
</Link>
              )}
            </li>
          ))}
        </ul>

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
          "
        >
          {/* =================================================
              CART
          ================================================= */}

          {user &&
            user?.accountType !==
              "Instructor" && (
              <Link
                to="/dashboard/cart"
                className="relative"
                title="Shopping Cart"
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    text-richblack-5
                    transition-all
                    duration-200
                    hover:bg-richblack-700
                    hover:text-yellow-25
                  "
                >
                  <AiOutlineShoppingCart
                    size={22}
                  />
                </div>

                {/* CART COUNT */}

                {totalItems > 0 && (
                  <span
                    className="
                      absolute
                      -right-1
                      -top-1
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
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

          {/* =================================================
              PROFILE
          ================================================= */}

          {token !== null && user && (
            <Link
              to="/dashboard/my-profile"
              title="My Profile"
              className={`
                flex
                items-center
                gap-2
                rounded-lg
                px-2
                py-1
                transition-all
                duration-200

                ${
                  matchRoute(
                    "/dashboard/my-profile"
                  )
                    ? "bg-richblack-700"
                    : "hover:bg-richblack-800"
                }
              `}
            >
              {/* PROFILE IMAGE */}

              {user?.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="
                    h-8
                    w-8
                    rounded-full
                    border
                    border-richblack-600
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-yellow-50
                    text-richblack-900
                  "
                >
                  <AiOutlineUser size={18} />
                </div>
              )}

              {/* FIRST NAME */}

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

          {/* =================================================
              LOGIN + SIGNUP
          ================================================= */}

          {token === null && (
            <div
              className="
                hidden
                items-center
                gap-2
                sm:flex
              "
            >
              {/* LOGIN */}

              <Link to="/login">
                <button
                  type="button"
                  className={`
                    rounded-lg
                    px-3
                    py-1.5
                    text-sm
                    font-semibold
                    transition-all
                    duration-200

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

              {/* SIGN UP */}

              <Link to="/signup">
                <button
                  type="button"
                  className={`
                    rounded-lg
                    px-3
                    py-1.5
                    text-sm
                    font-semibold
                    transition-all
                    duration-200

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

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setMobileMenu(
                (prev) => !prev
              )
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
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

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {mobileMenu && (
        <div
          className="
            absolute
            left-0
            top-14
            z-[1000]
            w-full
            border-b
            border-richblack-700
            bg-richblack-900
            px-5
            py-5
            shadow-xl
            sm:hidden
          "
        >
          <div
            className="
              flex
              flex-col
              gap-2
            "
          >
            {/* =================================================
                MOBILE PROFILE
            ================================================= */}

            {token !== null && user && (
              <Link
                to="/dashboard/my-profile"
                className="
                  mb-2
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-richblack-700
                  bg-richblack-800
                  px-4
                  py-3
                  transition-all
                  hover:border-yellow-50
                "
              >
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="
                      h-10
                      w-10
                      rounded-full
                      border
                      border-richblack-600
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-yellow-50
                      text-richblack-900
                    "
                  >
                    <AiOutlineUser
                      size={20}
                    />
                  </div>
                )}

                <div className="flex flex-col">
                  <span
                    className="
                      text-xs
                      text-richblack-400
                    "
                  >
                    My Account
                  </span>

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-richblack-5
                    "
                  >
                    {user?.firstName ||
                      "My Profile"}
                  </span>
                </div>
              </Link>
            )}

            {/* =================================================
                MOBILE NAVIGATION
            ================================================= */}

            {NavbarLinks.map(
              (link, index) => (
                <div key={index}>
                  {/* MOBILE CATALOG */}

                  {link?.title ===
                  "Catalog" ? (
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setCatalogOpen(
                            (prev) =>
                              !prev
                          )
                        }
                        className="
                          flex
                          w-full
                          items-center
                          justify-between
                          rounded-lg
                          px-4
                          py-3
                          text-sm
                          font-semibold
                          text-richblack-25
                          hover:bg-richblack-800
                          hover:text-yellow-25
                        "
                      >
                        <span>
                          Catalog
                        </span>

                        <MdKeyboardArrowDown
                          size={20}
                          className={`
                            transition-transform
                            ${
                              catalogOpen
                                ? "rotate-180"
                                : ""
                            }
                          `}
                        />
                      </button>

                      {/* MOBILE COURSES */}

                      {catalogOpen && (
                        <div
                          className="
                            mt-1
                            rounded-lg
                            bg-richblack-800
                            p-2
                          "
                        >
                          {subLinks.length >
                          0 ? (
                            subLinks.map(
                              (
                                subLink,
                                i
                              ) => {
                                const courseName =
                                  subLink?.courseName;

                                if (
                                  typeof courseName !==
                                    "string" ||
                                  courseName.trim() ===
                                    ""
                                ) {
                                  return null;
                                }

                                return (
                                  <Link
                                    key={
                                      subLink?._id ||
                                      i
                                    }
                                    to={getCoursePath(
                                      courseName
                                    )}
                                    onClick={() => {
                                      setCatalogOpen(
                                        false
                                      );
                                      setMobileMenu(
                                        false
                                      );
                                    }}
                                    className="
                                      flex
                                      items-center
                                      gap-3
                                      rounded-lg
                                      px-3
                                      py-2.5
                                      text-sm
                                      text-richblack-100
                                      hover:bg-richblack-700
                                      hover:text-yellow-50
                                    "
                                  >
                                    <span
                                      className="
                                        h-1.5
                                        w-1.5
                                        rounded-full
                                        bg-yellow-50
                                      "
                                    />

                                    <span>
                                      {
                                        courseName
                                      }
                                    </span>
                                  </Link>
                                );
                              }
                            )
                          ) : (
                            <p
                              className="
                                px-3
                                py-3
                                text-center
                                text-sm
                                text-richblack-400
                              "
                            >
                              No Courses Found
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* NORMAL MOBILE LINK */

                    <Link
                      to={
                        link?.path || "/"
                      }
                      className={`
                        block
                        rounded-lg
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        transition-all
                        duration-200

                        ${
                          matchRoute(
                            link?.path
                          )
                            ? "bg-yellow-25 text-richblack-900"
                            : "text-richblack-25 hover:bg-richblack-800 hover:text-yellow-25"
                        }
                      `}
                    >
                      {link?.title}
                    </Link>
                  )}
                </div>
              )
            )}

            {/* =================================================
                MOBILE LOGIN / SIGNUP
            ================================================= */}

            {token === null && (
              <div
                className="
                  mt-3
                  grid
                  grid-cols-2
                  gap-3
                  border-t
                  border-richblack-700
                  pt-4
                "
              >
                {/* LOGIN */}

                <Link to="/login">
                  <button
                    type="button"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-richblack-600
                      bg-richblack-800
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-richblack-5
                      hover:border-yellow-50
                      hover:text-yellow-50
                    "
                  >
                    Log in
                  </button>
                </Link>

                {/* SIGNUP */}

                <Link to="/signup">
                  <button
                    type="button"
                    className="
                      w-full
                      rounded-lg
                      bg-yellow-50
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
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