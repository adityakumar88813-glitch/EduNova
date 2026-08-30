import React from "react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");

  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      {
        categoryId: categoryId,
      }
    );

    console.log("CATALOG PAGE DATA RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could not fetch category page data"
      );
    }

    result = response?.data;
  } catch (error) {
    console.log(
      "CATALOG PAGE DATA API ERROR....",
      error?.response?.data || error
    );

    toast.error(
      error?.response?.data?.message || error.message || "Something went wrong"
    );

    result = null;
  }

  toast.dismiss(toastId);

  return result;
};