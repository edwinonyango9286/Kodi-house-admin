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
    const response = await newRequest.get(`user/list-users?role=Landlord&page=1&limit=10`,config)
    return response;
  } catch (error) {
    console.log(error)
    throw error
  }
}

// list tenants

export const listTenants =  async () =>{
  try {
    const response = await newRequest.get(`user/list-users?role=Tenant&page=1&limit=10`, config);
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const listSystemUsers = async (params?: Record<string, string | number>) => {
  try {
    const queryString = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    const response = await newRequest.get(`/user/list-system-users${queryString}`, config);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};