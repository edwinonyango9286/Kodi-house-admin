import type { ICreateCategoryPayload, ICreateCategoryResponse } from "../../types/types";
import { newRequest } from "../../utils/newRequest";

 export const createCategory = async (categoryData:ICreateCategoryPayload):Promise<ICreateCategoryResponse> => {
    try {
        const response = await newRequest.post<ICreateCategoryResponse>(`create-category`,categoryData)
        return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
}