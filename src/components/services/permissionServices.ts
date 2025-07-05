
import type { CreatePermissionPayload} from "../../interfaces/interfaces"
import { config } from "../../utils/config";
import { newRequest } from "../../utils/newRequest"

export   const createPermission =  async (permissionData:CreatePermissionPayload) => {
    try {
        const response = await newRequest.post(`permissions/create`, permissionData, config);
        return response
    } catch (error) {
        console.log(error)
       throw error   
    }
}

export const listPermissions = async ()=>{
    try {
      const response = await newRequest.get(`permissions/permissions`, config)
      return response
    } catch (error) {
      console.log(error)
      throw error  
    }
}

export const deleteAPermission = async (permissionId:string)=>{
  try {
    const response = await newRequest.patch(`permissions/${permissionId}/delete`, {} , config);
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}



