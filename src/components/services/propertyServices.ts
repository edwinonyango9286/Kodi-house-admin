import type {ICreatePropertyCategoryPayload, ICreatePropertyTagPayload, ICreatePropertyTagResponse, ICreatePropertyTypePayload,} from "../../types/types"
import { config } from "../../utils/config"
import { newRequest } from "../../utils/newRequest"


export const createPropertyType = async (propertyTypeData:ICreatePropertyTypePayload)=>{
    try {
     const response = await newRequest.post(`property-types/create`, propertyTypeData, config)
     return response
    } catch (error) {
      console.log(error)  
      throw error
    }
}

export  const listPropertyTypes =  async ()=>{
    try {
        const response = await newRequest.get(`property-types/property-types/list`, config);
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}


export const createPropertyTag = async (propertyTypeTag:ICreatePropertyTagPayload):Promise<ICreatePropertyTagResponse> => {
    try {
        const response = await newRequest.post<ICreatePropertyTagResponse>(`create-property-tag`,propertyTypeTag);
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}



