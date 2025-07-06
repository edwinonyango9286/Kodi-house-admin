
import type { PropertyTypePayload } from "../../interfaces/propertyType"
import { config } from "../../utils/config"
import { newRequest } from "../../utils/newRequest"


export const createPropertyType = async (propertyTypeData:PropertyTypePayload)=>{
    try {
     const response = await newRequest.post(`property-types/create`, propertyTypeData, config)
     return response
    } catch (error) {
      console.log(error)  
      throw error
    }
}

export const updatePropertyType = async ({name, description, status, _id}:PropertyTypePayload)=>{
    try {
        const newPropertTypeData = { name, status, description }
        const response = await newRequest.patch(`property-types/${_id}/update`, newPropertTypeData,config);
        return response
    } catch (error) {
      console.log(error)  
      throw error;
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


export const deletePropertyType = async (propertyTypeId:string)=>{
    try {
        const response = await newRequest.patch(`property-types/${propertyTypeId}/delete`,{},config);
        return response
    } catch (error) {
      console.log(error);
      throw error
    }
} 




