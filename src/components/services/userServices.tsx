import type { IAddUserPayload, IAddUserResponse, IUpdatePasswordPayload, IUpdatePasswordResponse, IUpdateUserInfoPayload, IUpdateUserInfoResponse } from "../../types/types"
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

export const updatePassword =  async (passwordData:IUpdatePasswordPayload) : Promise<IUpdatePasswordResponse> =>{
  try {
    const response = await  newRequest.patch<IUpdatePasswordResponse>(`update-password`, passwordData)
    return response.data
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