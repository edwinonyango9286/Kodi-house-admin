import { config } from "../../utils/config"
import { newRequest } from "../../utils/newRequest"

// list all properties 
 export  const listProperties =  async()=>{
    try {
     const response = await newRequest.get(`properties/properties`, config);
     return response
    } catch (error) {
        console.log(error)
        throw(error)
    }
 }

//  const list vacant properties

export const listVacantProperties  = async()=>{
    try {
        const response = await newRequest.get(`properties/properties?currentStatus=Vacant`, config)
        return response
    } catch (error) {
       console.log(error) 
       throw error
    }
}

// list occupied properties 

export const listOccuppiedProperties = async ()=>{
    try {
        const response = await newRequest.get(`properties/properties?currentStatus=Occupied`, config)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}