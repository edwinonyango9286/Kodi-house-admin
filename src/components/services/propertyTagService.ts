import type { ICreatePropertyTagPayload } from "../../types/types";
import { config } from "../../utils/config";
import { newRequest } from "../../utils/newRequest";


export const createPropertyTag = async (propertyTypeTag:ICreatePropertyTagPayload) => {
    try {
        const response = await newRequest.post(`property-tags/create`, propertyTypeTag, config);
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const listPropertyTags = async ()=>{
    try {
        const response = await newRequest.get(`property-tags/property-tags/get`, config);
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}
 