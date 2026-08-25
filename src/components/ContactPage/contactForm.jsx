import React from "react";
import { FiArrowUpRight, FiMessageCircle } from "react-icons/fi";

import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">

      {/* ================= HEADER ================= */}
      <div className="border-b border-richblack-700 px-5 py-7 sm:px-8 sm:py-9 lg:px-12">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

          <div className="flex gap-4">

            {/* Icon */}
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-richblack-900 sm:flex">
              <FiMessageCircle size={23} />
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-2xl font-semibold leading-tight text-richblack-5 sm:text-3xl lg:text-4xl">
                Got an Idea?
                <br className="hidden sm:block" />{" "}
                We&apos;ve got the skills.
                <br className="hidden sm:block" />{" "}
                Let&apos;s team up.
              </h1>

              <p className="mt-3 max-w-[650px] text-sm leading-6 text-richblack-300 sm:text-base">
                Tell us more about yourself and what you&apos;ve got in mind.
                We&apos;d love to hear about your idea and see how we can help.
              </p>
            </div>

          </div>

          {/* Decorative Arrow */}
          <div className="hidden rounded-full border border-richblack-600 p-3 text-yellow-50 lg:flex">
            <FiArrowUpRight size={22} />
          </div>

        </div>

      </div>

      {/* ================= FORM ================= */}
      <div className="px-5 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-10">

        <ContactUsForm />

      </div>

    </div>
  );
};

export default ContactForm;