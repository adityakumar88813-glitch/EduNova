import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";
import { FiMessageCircle } from "react-icons/fi";

const ContactFormSection = () => {
  return (
    <section className="mx-auto w-full max-w-[900px] px-1 sm:px-4">

      {/* ================= HEADER ================= */}
      <div className="mx-auto max-w-[700px] text-center">

        {/* Icon */}
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50 text-richblack-900 shadow-lg">
          <FiMessageCircle size={23} />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold leading-tight text-richblack-5 sm:text-4xl lg:text-5xl">
          Get in{" "}
          <span className="bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 bg-clip-text text-transparent">
            Touch
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-[600px] text-sm leading-6 text-richblack-300 sm:text-base sm:leading-7">
          We'd love to hear from you. Whether you have a question, feedback,
          or simply want to say hello, feel free to reach out to us.
        </p>

      </div>

      {/* ================= FORM CARD ================= */}
      <div className="mt-8 rounded-2xl border border-richblack-700 bg-richblack-800 p-4 shadow-xl sm:mt-10 sm:p-6 md:p-8 lg:p-10">

        {/* Card Header */}
        <div className="mb-6 border-b border-richblack-700 pb-5">
          <h2 className="text-lg font-semibold text-richblack-5 sm:text-xl">
            Send us a message
          </h2>

          <p className="mt-1 text-xs text-richblack-400 sm:text-sm">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </div>

        {/* Existing Form */}
        <div className="w-full">
          <ContactUsForm />
        </div>

      </div>

    </section>
  );
};

export default ContactFormSection;