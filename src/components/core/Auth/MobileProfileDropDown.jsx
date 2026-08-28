import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Img from "../../common/Img";

import { logout } from "../../../services/operations/authAPI";

import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { AiOutlineCaretDown, AiOutlineHome } from "react-icons/ai";
import { MdOutlineContactPhone } from "react-icons/md";
import { TbMessage2Plus } from "react-icons/tb";
import { PiNotebook } from "react-icons/pi";

export default function MobileProfileDropDown() {
  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  // Close dropdown when clicking outside
  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  const closeDropdown = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    setOpen(false);
    dispatch(logout(navigate));
  };

  return (
    <div className="relative sm:hidden" ref={ref}>
      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-x-1"
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        <Img
          src={user?.image}
          alt={`profile-${user?.firstName || "user"}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />

        <AiOutlineCaretDown
          className={`text-sm text-richblack-100 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-[118%] z-[1000] min-w-[170px] overflow-hidden rounded-lg border border-richblack-700 bg-richblack-800 shadow-lg"
          role="menu"
        >
          {/* Dashboard */}
          <Link
            to="/dashboard/my-profile"
            onClick={closeDropdown}
            className="flex w-full items-center gap-x-2 px-3 py-3 text-sm text-richblack-100 transition-all duration-200 hover:bg-richblack-700"
          >
            <VscDashboard className="text-lg" />
            <span>Dashboard</span>
          </Link>

          {/* Home */}
          <Link
            to="/"
            onClick={closeDropdown}
            className="flex w-full items-center gap-x-2 border-t border-richblack-700 px-3 py-3 text-sm text-richblack-100 transition-all duration-200 hover:bg-richblack-700"
          >
            <AiOutlineHome className="text-lg" />
            <span>Home</span>
          </Link>

          {/* Catalog */}
          <Link
            to="/catalog"
            onClick={closeDropdown}
            className="flex w-full items-center gap-x-2 border-t border-richblack-700 px-3 py-3 text-sm text-richblack-100 transition-all duration-200 hover:bg-richblack-700"
          >
            <PiNotebook className="text-lg" />
            <span>Catalog</span>
          </Link>

          {/* About */}
          <Link
            to="/about"
            onClick={closeDropdown}
            className="flex w-full items-center gap-x-2 border-t border-richblack-700 px-3 py-3 text-sm text-richblack-100 transition-all duration-200 hover:bg-richblack-700"
          >
            <TbMessage2Plus className="text-lg" />
            <span>About Us</span>
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            onClick={closeDropdown}
            className="flex w-full items-center gap-x-2 border-t border-richblack-700 px-3 py-3 text-sm text-richblack-100 transition-all duration-200 hover:bg-richblack-700"
          >
            <MdOutlineContactPhone className="text-lg" />
            <span>Contact Us</span>
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-x-2 border-t border-richblack-700 px-3 py-3 text-sm text-richblack-100 transition-all duration-200 hover:bg-richblack-700"
          >
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}