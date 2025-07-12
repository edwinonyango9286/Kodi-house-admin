import { newRequest } from "../../utils/newRequest";
import type {CreateAccountPayload, RequestResetPasswordPayload, ResetPasswordPayload, SignInPayload, VerifyCodePayload} from "../../interfaces/interfaces"


export const createAccount = async (accountData: CreateAccountPayload) => {
  try {
    const response = await newRequest.post(`v1/auth/register`,accountData);
    return response;
  } catch (error) {
    console.log(error)
    throw error
  }
};

export const verifyCode = async (codeData: VerifyCodePayload) => {
  try {
    const response = await newRequest.post(`v1/auth/activate-admin`, codeData);
    return response;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const signIn = async (signInData:SignInPayload)=>{
  try {
    const response = await newRequest.post(`v1/auth/sign-in-admin`, signInData)
    return response     
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const requestResetPasswordEmail = async (email: RequestResetPasswordPayload) =>{
  try {
    const response = await newRequest.post(`v1/auth/password-reset-token`,email)
    return response
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const resetUserPassword = async (passwordData:ResetPasswordPayload) =>{
  try {
    const {token, ...restPasswordData} = passwordData
    const response = await newRequest.put(`v1/auth/reset-password/${token}`, restPasswordData);
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const logout =  async ()=>{
  try {
    const response = await  newRequest.post(`v1/auth/logout`, )
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}
