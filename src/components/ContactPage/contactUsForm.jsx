import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiPhone, FiUser, FiMessageSquare } from "react-icons/fi";

import CountryCode from "../../data/countrycode.json";
import { apiConnector } from "../../services/apis";
import { contactusEndpoint } from "../../services/apiconnector";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    try {
      setLoading(true);

      /*
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      */

      console.log("Contact Form Data:", data);

      setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
        countrycode: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  // Reusable input class
  const inputClass = (error) =>
    `w-full rounded-xl border bg-richblack-700 px-4 py-3.5 text-sm
    text-richblack-5 outline-none transition-all duration-200
    placeholder:text-richblack-400
    hover:border-richblack-500
    focus:bg-richblack-700
    focus:border-yellow-50
    focus:ring-1 focus:ring-yellow-50/30
    ${
      error
        ? "border-pink-500 focus:border-pink-500 focus:ring-pink-500/20"
        : "border-richblack-600"
    }`;

  const labelClass =
    "mb-1 text-sm font-medium text-richblack-100";

  return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className="flex w-full flex-col gap-6"
    >
      {/* =====================================================
          FIRST NAME + LAST NAME
      ===================================================== */}
      <div className="flex flex-col gap-5 sm:flex-row">

        {/* First Name */}
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="firstname" className={labelClass}>
            First Name <span className="text-pink-200">*</span>
          </label>

          <div className="relative">
            <FiUser
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-richblack-400"
            />

            <input
              type="text"
              id="firstname"
              placeholder="Enter your first name"
              className={`${inputClass(errors.firstname)} pl-11`}
              {...register("firstname", {
                required: "Please enter your first name.",
              })}
            />
          </div>

          {errors.firstname && (
            <span className="text-xs text-pink-200">
              {errors.firstname.message}
            </span>
          )}
        </div>

        {/* Last Name */}
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="lastname" className={labelClass}>
            Last Name
          </label>

          <div className="relative">
            <FiUser
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-richblack-400"
            />

            <input
              type="text"
              id="lastname"
              placeholder="Enter your last name"
              className={`${inputClass(errors.lastname)} pl-11`}
              {...register("lastname")}
            />
          </div>
        </div>

      </div>

      {/* =====================================================
          EMAIL
      ===================================================== */}
      <div className="flex flex-col gap-2">

        <label htmlFor="email" className={labelClass}>
          Email Address <span className="text-pink-200">*</span>
        </label>

        <div className="relative">
          <FiMail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-richblack-400"
          />

          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            className={`${inputClass(errors.email)} pl-11`}
            {...register("email", {
              required: "Please enter your email address.",
            })}
          />
        </div>

        {errors.email && (
          <span className="text-xs text-pink-200">
            {errors.email.message}
          </span>
        )}

      </div>

      {/* =====================================================
          PHONE NUMBER
      ===================================================== */}
      <div className="flex flex-col gap-2">

        <label htmlFor="phonenumber" className={labelClass}>
          Phone Number <span className="text-pink-200">*</span>
        </label>

        <div className="flex w-full gap-3">

          {/* Country Code */}
          <select
            id="countrycode"
            className={`${inputClass(errors.countrycode)} w-[110px] cursor-pointer px-2 sm:w-[130px]`}
            {...register("countrycode", {
              required: "Country code is required",
            })}
          >
            {CountryCode.map((ele, i) => (
              <option
                key={i}
                value={ele.code}
                className="bg-richblack-800 text-richblack-5"
              >
                {ele.code}
              </option>
            ))}
          </select>

          {/* Phone */}
          <div className="relative flex-1">
            <FiPhone
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-richblack-400"
            />

            <input
              type="tel"
              id="phonenumber"
              placeholder="Enter your phone number"
              className={`${inputClass(errors.phoneNo)} pl-11`}
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your phone number.",
                },
                minLength: {
                  value: 10,
                  message: "Phone number must be at least 10 digits.",
                },
                maxLength: {
                  value: 12,
                  message: "Invalid phone number.",
                },
              })}
            />
          </div>

        </div>

        {errors.phoneNo && (
          <span className="text-xs text-pink-200">
            {errors.phoneNo.message}
          </span>
        )}

      </div>

      {/* =====================================================
          MESSAGE
      ===================================================== */}
      <div className="flex flex-col gap-2">

        <label htmlFor="message" className={labelClass}>
          Message <span className="text-pink-200">*</span>
        </label>

        <div className="relative">

          <FiMessageSquare
            size={19}
            className="absolute left-4 top-4 text-richblack-400"
          />

          <textarea
            id="message"
            rows="7"
            placeholder="Tell us how we can help you..."
            className={`${inputClass(errors.message)}
              min-h-[160px]
              resize-y
              pl-11
              pt-3.5
              leading-6
            `}
            {...register("message", {
              required: "Please enter your message.",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters.",
              },
            })}
          />

        </div>

        {errors.message && (
          <span className="text-xs text-pink-200">
            {errors.message.message}
          </span>
        )}

        <p className="text-xs text-richblack-400">
          Tell us about your question, feedback, or how we can help.
        </p>

      </div>

      {/* =====================================================
          SUBMIT BUTTON
      ===================================================== */}
      <button
        disabled={loading}
        type="submit"
        className="mt-2 flex w-full items-center justify-center rounded-xl bg-yellow-50 px-6 py-3.5 text-sm font-bold text-richblack-900 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-yellow-100 hover:shadow-none active:translate-y-0 disabled:cursor-not-allowed disabled:bg-richblack-500 disabled:text-richblack-300 sm:text-base"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

    </form>
  );
};

export default ContactUsForm;