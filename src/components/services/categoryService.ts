import type { ICreateCategoryPayload, } from "../../types/types";
import { config } from "../../utils/config";
import { newRequest } from "../../utils/newRequest";

 export const createCategory = async (categoryData:ICreateCategoryPayload) => {
    try {
      const response = await newRequest.post(`categories/create`, categoryData, config)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
}

export const listCategories = async()=>{
  try {
    const response = await newRequest.get(`categories/list`,config);
    return response
  } catch (error) {
    console.log(error);
    throw error;
  }
}

