import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiMail,
  FiPhone,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

import CountryCode from "../../data/countrycode.json";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // =========================
  // SUBMIT CONTACT FORM
  // =========================
  const submitContactForm = async (data) => {
    try {
      setLoading(true);

      console.log("CONTACT FORM DATA:", data);

      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );

      console.log("CONTACT FORM RESPONSE:", res);

      if (res?.data?.success) {
        toast.success(
          res?.data?.message || "Message sent successfully!"
        );

        // Reset form after successful submission
        reset();
      } else {
        toast.error(
          res?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.log("CONTACT FORM ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INPUT STYLE
  // =========================
  const inputClass = (error) =>
    `w-full rounded-xl border bg-richblack-700 px-4 py-3.5
    text-sm text-richblack-5 outline-none transition-all
    duration-200 placeholder:text-richblack-400
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
      {/* =========================================
          FIRST NAME + LAST NAME
      ========================================== */}
      <div className="flex flex-col gap-5 sm:flex-row">

        {/* FIRST NAME */}
        <div className="flex w-full flex-col gap-2">
          <label
            htmlFor="firstname"
            className={labelClass}
          >
            First Name{" "}
            <span className="text-pink-200">*</span>
          </label>

          <div className="relative">
            <FiUser
              size={18}
              className="absolute left-4 top-1/2
              -translate-y-1/2 text-richblack-400"
            />

            <input
              type="text"
              id="firstname"
              placeholder="Enter your first name"
              disabled={loading}
              className={`${inputClass(
                errors.firstname
              )} pl-11`}
              {...register("firstname", {
                required:
                  "Please enter your first name.",
                minLength: {
                  value: 2,
                  message:
                    "First name must be at least 2 characters.",
                },
              })}
            />
          </div>

          {errors.firstname && (
            <span className="text-xs text-pink-200">
              {errors.firstname.message}
            </span>
          )}
        </div>

        {/* LAST NAME */}
        <div className="flex w-full flex-col gap-2">
          <label
            htmlFor="lastname"
            className={labelClass}
          >
            Last Name
          </label>

          <div className="relative">
            <FiUser
              size={18}
              className="absolute left-4 top-1/2
              -translate-y-1/2 text-richblack-400"
            />

            <input
              type="text"
              id="lastname"
              placeholder="Enter your last name"
              disabled={loading}
              className={`${inputClass(
                errors.lastname
              )} pl-11`}
              {...register("lastname")}
            />
          </div>
        </div>
      </div>

      {/* =========================================
          EMAIL
      ========================================== */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className={labelClass}
        >
          Email Address{" "}
          <span className="text-pink-200">*</span>
        </label>

        <div className="relative">
          <FiMail
            size={18}
            className="absolute left-4 top-1/2
            -translate-y-1/2 text-richblack-400"
          />

          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            disabled={loading}
            className={`${inputClass(
              errors.email
            )} pl-11`}
            {...register("email", {
              required:
                "Please enter your email address.",
              pattern: {
                value:
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message:
                  "Please enter a valid email address.",
              },
            })}
          />
        </div>

        {errors.email && (
          <span className="text-xs text-pink-200">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* =========================================
          PHONE NUMBER
      ========================================== */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="phoneNo"
          className={labelClass}
        >
          Phone Number{" "}
          <span className="text-pink-200">*</span>
        </label>

        <div className="flex w-full gap-3">

          {/* COUNTRY CODE */}
          <select
            id="countrycode"
            disabled={loading}
            className={`${inputClass(
              errors.countrycode
            )} w-[110px] cursor-pointer px-2 sm:w-[130px]`}
            {...register("countrycode", {
              required: "Country code is required.",
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

          {/* PHONE */}
          <div className="relative flex-1">
            <FiPhone
              size={18}
              className="absolute left-4 top-1/2
              -translate-y-1/2 text-richblack-400"
            />

            <input
              type="tel"
              id="phoneNo"
              placeholder="Enter your phone number"
              disabled={loading}
              className={`${inputClass(
                errors.phoneNo
              )} pl-11`}
              {...register("phoneNo", {
                required: {
                  value: true,
                  message:
                    "Please enter your phone number.",
                },
                pattern: {
                  value: /^[0-9]{10,12}$/,
                  message:
                    "Phone number must contain 10-12 digits.",
                },
              })}
            />
          </div>
        </div>

        {errors.countrycode && (
          <span className="text-xs text-pink-200">
            {errors.countrycode.message}
          </span>
        )}

        {errors.phoneNo && (
          <span className="text-xs text-pink-200">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* =========================================
          MESSAGE
      ========================================== */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className={labelClass}
        >
          Message{" "}
          <span className="text-pink-200">*</span>
        </label>

        <div className="relative">
          <FiMessageSquare
            size={19}
            className="absolute left-4 top-4
            text-richblack-400"
          />

          <textarea
            id="message"
            rows="7"
            disabled={loading}
            placeholder="Tell us how we can help you..."
            className={`${inputClass(
              errors.message
            )}
            min-h-[160px]
            resize-y
            pl-11
            pt-3.5
            leading-6`}
            {...register("message", {
              required:
                "Please enter your message.",
              minLength: {
                value: 10,
                message:
                  "Message must be at least 10 characters.",
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
          Tell us about your question, feedback, or
          how we can help.
        </p>
      </div>

      {/* =========================================
          SUBMIT BUTTON
      ========================================== */}
      <button
        disabled={loading}
        type="submit"
        className="
          mt-2 flex w-full items-center justify-center
          rounded-xl bg-yellow-50 px-6 py-3.5
          text-sm font-bold text-richblack-900
          shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)]
          transition-all duration-200

          hover:-translate-y-[1px]
          hover:bg-yellow-100
          hover:shadow-none

          active:translate-y-0

          disabled:cursor-not-allowed
          disabled:bg-richblack-500
          disabled:text-richblack-300

          sm:text-base
        "
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <span
              className="
                h-4 w-4 animate-spin rounded-full
                border-2 border-richblack-900
                border-t-transparent
              "
            ></span>

            Sending...
          </div>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
};

export default ContactUsForm;