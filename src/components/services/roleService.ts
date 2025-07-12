import { newRequest } from "../../utils/newRequest";
import type {CreateRolePayload, RenameRolePayload} from "../../interfaces/interfaces"
import { config } from "../../utils/config";

 export const createRole = async (roleData:CreateRolePayload ) =>{
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

 export const renameRole = async ({roleId,name} : RenameRolePayload )=>{
   try {
      const response = await newRequest.patch(`roles/${roleId}/rename`, {name}, config);
      return response;
   } catch (error) {
      console.log(error)
      throw error
   }
 }

 export const getRoleByRoleId = async (roleId:string)=>{
   try {
      const response = await newRequest.get(`roles/${roleId}`, config);
      return response
   } catch (error) {
      console.log(error);
      throw error
   }
 }

 