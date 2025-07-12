import type { AddUserPayload, UpdatePasswordPayload, UpdateUserInfoPayload, } from "../../interfaces/interfaces"
import { config } from "../../utils/config";
import { newRequest } from "../../utils/newRequest"


export const addUser = async (userData:AddUserPayload)  => {
    try {
      const response = await newRequest.post(`user/create`,userData, config);
      return response
    } catch (error) {
       console.log(error) 
       throw error
    }
}

export const updatePassword =  async (passwordData:UpdatePasswordPayload) =>{
  try {
    const response = await  newRequest.put(`auth/update-password`, passwordData, config)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateUserInfo = async ( userInfoData:UpdateUserInfoPayload)  =>{
  try {
    const response = await newRequest.patch(`user/update-user-profile`,userInfoData,config)
    return response
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
 export const listLandlords =  async () => {
  try {
    const response = await newRequest.get(`user/list-users?role=Landlord`,config)
    return response;
  } catch (error) {
    console.log(error)
    throw error
  }
}

// list tenants

export const listTenants =  async () =>{
  try {
    const response = await newRequest.get(`user/list-users?role=Tenant`, config);
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