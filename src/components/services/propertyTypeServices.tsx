import type {ICreatePropertyCategoryPayload, ICreatePropertyCategoryResponse, ICreatePropertyTagPayload, ICreatePropertyTagResponse, ICreatePropertyTypePayload, ICreatePropertyTypeResponse,} from "../../types/types"
import { newRequest } from "../../utils/newRequest"

export const createPropertyType = async (propertyTypeData:ICreatePropertyTypePayload): Promise<ICreatePropertyTypeResponse> =>{
    try {
     const response = await newRequest.post<ICreatePropertyTypeResponse>(`create-property-type`, propertyTypeData)
     return response.data
    } catch (error) {
      console.log(error)  
      throw error
    }
}

export const createPropertyCategory = async (propertyCategoryData:ICreatePropertyCategoryPayload):Promise<ICreatePropertyCategoryResponse>=>{
    try {
        const response = await newRequest.post<ICreatePropertyCategoryResponse>(`create-property-category`,propertyCategoryData )
        return response.data
    } catch (error) {
       console.log(error);
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



