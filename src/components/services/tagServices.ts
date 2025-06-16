import type { ICreateTagPayload } from "../../types/types";
import { config } from "../../utils/config";
import { newRequest } from "../../utils/newRequest";

export const createTag = async (tagData:ICreateTagPayload) => {
    try {
        const response = await newRequest.post(`tags/create`, tagData, config)
        return response
    } catch (error) {
       console.log(error);
       throw error 
    }
}

export const listTags =async ()=>{
    try {
        const response = await newRequest.get(`tags/list`,config);
        return response
    } catch (error) {
      console.log();
      throw error;
    }
}