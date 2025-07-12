import { newRequest } from "../../utils/newRequest";
import type {CreateAccountPayload, RequestResetPasswordPayload, ResetPasswordPayload, SignInPayload, VerifyCodePayload} from "../../interfaces/interfaces"


export const createAccount = async (accountData: CreateAccountPayload) => {
  try {
    const response = await newRequest.post(`auth/register`,accountData);
    return response;
  } catch (error) {
    console.log(error)
    throw error
  }
};

export const verifyCode = async (codeData: VerifyCodePayload) => {
  try {
    const response = await newRequest.post(`auth/activate-admin`, codeData);
    return response;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const signIn = async (signInData:SignInPayload)=>{
  try {
    const response = await newRequest.post(`auth/sign-in-admin`, signInData)
    return response     
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const requestResetPasswordEmail = async (email: RequestResetPasswordPayload) =>{
  try {
    const response = await newRequest.post(`auth/password-reset-token`,email)
    return response
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const resetUserPassword = async (passwordData:ResetPasswordPayload) =>{
  try {
    const {token, ...restPasswordData} = passwordData
    const response = await newRequest.put(`auth/reset-password/${token}`, restPasswordData);
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const logout =  async ()=>{
  try {
    const response = await  newRequest.post(`auth/logout`, )
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}
