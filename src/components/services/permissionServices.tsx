
import type { ICreatePermissionPayload,ICreatePermissionResponse} from "../../types/types"
import { newRequest } from "../newRequest"

export   const createPermission =  async (permissionData:ICreatePermissionPayload) : Promise<ICreatePermissionResponse> =>{
    try {
        const response = await newRequest.post<ICreatePermissionResponse>(`create-permission`, permissionData);
        return response.data
    } catch (error) {
        console.log(error)
       throw error   
    }

}