import React from 'react'
import { toast } from "react-hot-toast"
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';

// ================ get Catalog Page Data  ================
export const getCatalogPageData = async (categoryId) => {
  let result = {};

  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
      categoryId,
    });

    if (!response?.data?.success)
      throw new Error("Could not fetch Category page data");

    console.log("CATALOG PAGE DATA API RESPONSE............", response);

    const data = response?.data?.data // extract from data
console.log("chandan from api page",data);

    // result = {
    //   selectedCourse: data.selectedCourse || [],
    //   differentCourses: data.differentCourses || [],
    //   mostSellingCourse: data.mostSellingCourse || []
    // };
    return data;

  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    result = error.response?.data?.data;
  }

  return result;
};
