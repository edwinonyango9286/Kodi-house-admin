import { config } from "../../utils/config"
import { newRequest } from "../../utils/newRequest"

// list all properties 
 export  const listProperties =  async()=>{
    try {
     const response = await newRequest.get(`/properties/properties`, config);
     return response
    } catch (error) {
        console.log(error)
        throw(error)
    }
 }