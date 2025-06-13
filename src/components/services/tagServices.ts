import type { ICreateTagPayload, ICreateTagResponse } from "../../types/types";
import { newRequest } from "../../utils/newRequest";

export const createTag = async (tagData:ICreateTagPayload): Promise<ICreateTagResponse> => {
    try {
        const response = await newRequest.post<ICreateTagResponse>(`create-tag`, tagData)
        return response.data
    } catch (error) {
       console.log(error);
       throw error 
    }
}