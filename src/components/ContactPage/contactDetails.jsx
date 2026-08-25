import React from "react";
import * as Icon1 from "react-icons/bi";
import * as Icon2 from "react-icons/io5";
import * as Icon3 from "react-icons/hi2";
import { FiArrowUpRight } from "react-icons/fi";

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat with us",
    description: "Our friendly team is here to help.",
    details: "aman.kumar250796@gmail.com",

    // Opens default email application
    link: "mailto:aman.kumar250796@gmail.com",
  },

 {
  icon: "BiWorld",
  heading: "Location",
  description: "Currently based in India.",
  details: "Silchar, Assam, India",
  link: "https://www.google.com/maps/search/?api=1&query=Silchar%2C%20Assam%2C%20India",
},

  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri from 8 AM to 5 PM",
    details: "+91 98765 43210",

    // Opens phone dialer
    link: "tel:+919876543210",
  },
];

const ContactDetails = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      {contactDetails.map((ele, i) => {
        const Icon =
          Icon1[ele.icon] ||
          Icon2[ele.icon] ||
          Icon3[ele.icon];

        const cardClass =
          "group relative overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800 p-5 transition-all duration-300 sm:p-6 " +
          "hover:-translate-y-1 hover:border-richblack-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]";

        const content = (
          <>
            {/* Decorative background */}
            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-28
                w-28
                rounded-full
                bg-yellow-50/5
                blur-2xl
                transition-all
                duration-300
                group-hover:bg-yellow-50/10
              "
            />

            <div className="relative z-10">

              {/* TOP */}
              <div className="flex items-start justify-between gap-4">

                {/* Icon + Text */}
                <div className="flex min-w-0 items-center gap-4">

                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-richblack-700
                      text-yellow-50
                      transition-all
                      duration-300
                      group-hover:bg-yellow-50
                      group-hover:text-richblack-900
                    "
                  >
                    {Icon && <Icon size={22} />}
                  </div>

                  {/* Heading */}
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-richblack-5 sm:text-lg">
                      {ele.heading}
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-richblack-400 sm:text-sm">
                      {ele.description}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <FiArrowUpRight
                  size={20}
                  className="
                    shrink-0
                    text-richblack-500
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                    group-hover:text-yellow-50
                  "
                />
              </div>

              {/* DIVIDER */}
              <div className="my-5 h-px bg-richblack-700" />

              {/* DETAILS */}
              <p
                className="
                  break-words
                  text-sm
                  font-medium
                  leading-6
                  text-richblack-200
                  transition-colors
                  duration-300
                  group-hover:text-richblack-5
                "
              >
                {ele.details}
              </p>

            </div>
          </>
        );

        {/* ================= CLICKABLE CARD ================= */}
        if (ele.link) {
          return (
            <a
              key={i}
              href={ele.link}
              className={cardClass}
              aria-label={`${ele.heading}: ${ele.details}`}
            >
              {content}
            </a>
          );
        }

        {/* ================= NON-CLICKABLE CARD ================= */}
        return (
          <div key={i} className={cardClass}>
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default ContactDetails;