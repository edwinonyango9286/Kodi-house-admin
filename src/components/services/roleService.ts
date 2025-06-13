import { newRequest } from "../../utils/newRequest";
import type {ICreateRolePayload} from "../../types/types"
import { config } from "../../utils/config";

 export const createRole = async (roleData:ICreateRolePayload ) =>{
    try {
        const response = await newRequest.post(`create-role`,roleData)
        return response.data
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

 