import { config } from "../../utils/config"
import { newRequest } from "../../utils/newRequest"


export const listProperties = async (params?: Record<string, string | number | undefined>) => {
  try {
    const requestConfig = {...config, params: params || {} };
    const response = await newRequest.get(`properties/properties`, requestConfig);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//  const list vacant properties

export const listVacantProperties  = async()=>{
    try {
        const response = await newRequest.get(`properties/properties?currentStatus=Vacant&page=1&limit=10`, config)
        return response
    } catch (error) {
       console.log(error) 
       throw error
    }
}

// list occupied properties 

export const listOccuppiedProperties = async ()=>{
    try {
        const response = await newRequest.get(`properties/properties?currentStatus=Occupied&page=1&limit=10`, config)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteProperty = async (propertyToDeleteId:string)=>{
  try {
    const response = await newRequest.patch(`properties/delete-a-property/${propertyToDeleteId}`, {}, config);
    return response
  } catch (error) {
    console.log(error);
    throw error

  }
}

export const restoreProperty =  async(propertyId:string)=>{
  try {
    const response = await newRequest.patch(`properties/property/restore/${propertyId}`, {}, config);
    return response
  } catch (error) {
   console.log(error);
   throw error
  }
}