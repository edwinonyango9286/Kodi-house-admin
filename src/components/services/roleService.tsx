import { newRequest } from "../../utils/newRequest";
import type {ICreateRolePayload,ICreateRoleResponse} from "../../types/types"

 export const createRole = async (roleData:ICreateRolePayload ) :Promise<ICreateRoleResponse> =>{
    try {
        const response = await newRequest.post<ICreateRoleResponse>(`create-role`,roleData)
        return response.data
    } catch (error) {
       console.log(error) 
       throw error
    }
 }