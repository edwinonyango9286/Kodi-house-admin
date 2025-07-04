import { newRequest } from "../../utils/newRequest";
import type {ICreateRolePayload} from "../../interfaces"
import { config } from "../../utils/config";

 export const createRole = async (roleData:ICreateRolePayload ) =>{
    try {
        const response = await newRequest.post(`roles/create`,roleData, config)
        return response
    } catch (error) {
       console.log(error) 
       throw error
    }
 }

 export const  listRoles =  async ()=>{
   try {
      const response = await newRequest.get(`roles/all/roles`, config)
      return response
   } catch (error) {
      console.log(error)
      throw error
   }
 }

 