import type { IAddUserPayload, IUpdatePasswordPayload, IUpdateUserInfoPayload, IUpdateUserInfoResponse } from "../../types/types"
import { config } from "../../utils/config";
import { newRequest } from "../../utils/newRequest"


export const addUser = async (userData:IAddUserPayload)  => {
    try {
      const response = await newRequest.post(`user/create`,userData, config);
      return response
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

// get user profile
export const getUserProfile =  async () =>{
  try {
   const response = await newRequest.get(`/user/user-profile`, config);
   return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

// list users type landlord 
 export const listLandlords =  async(userType:string) => {
  try {
    const response = await newRequest.get(`user/list-users/${userType}`,config)
    return response;
  } catch (error) {
    console.log(error)
    throw error
  }
}

// list tenants

export const listTenants =  async (userType:string) =>{
  try {
    const response = await newRequest.get(`user/list-users/${userType}`, config);
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const listSystemUsers =  async () => {
  try {
    const response = await newRequest.get(`/user/list-system-users`,config);
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}