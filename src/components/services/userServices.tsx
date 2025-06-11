import type { IAddUserPayload, IAddUserResponse, IUpdatePasswordPayload, IUpdateUserInfoPayload, IUpdateUserInfoResponse } from "../../types/types"
import { config } from "../../utils/config";
import { newRequest } from "../../utils/newRequest"


export const addUser = async (userData:IAddUserPayload) : Promise<IAddUserResponse>  => {
    try {
      const response = await newRequest.post<IAddUserResponse>(`add-user`,userData);
      return response.data
    } catch (error) {
       console.log(error) 
       throw error
    }
}

export const updatePassword =  async (passwordData:IUpdatePasswordPayload) =>{
  try {
    const response = await  newRequest.put(`auth/update-password`, passwordData, config)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateUserInfo = async ( userInfoData:IUpdateUserInfoPayload) : Promise<IUpdateUserInfoResponse> =>{
  try {
    const response = await newRequest.patch<IUpdateUserInfoResponse>(`update-user-info`,userInfoData)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}