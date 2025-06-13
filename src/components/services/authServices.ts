import { newRequest } from "../../utils/newRequest";
import type {ICreateAccountPayload, IRequestResetPasswordEmail, IResetPasswordPayload, ISignInPayload, IVerifyCodePayload} from "../../types/types"


export const createAccount = async (accountData: ICreateAccountPayload) => {
  try {
    const response = await newRequest.post(`auth/register`,accountData);
    return response;
  } catch (error) {
    console.log(error)
    throw error
  }
};

export const verifyCode = async (codeData: IVerifyCodePayload) => {
  try {
    const response = await newRequest.post(`auth/activate-admin`, codeData);
    return response;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const signIn = async (signInData:ISignInPayload)=>{
  try {
    const response = await newRequest.post(`auth/sign-in-admin`, signInData)
    return response     
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const requestResetPasswordEmail = async (email: IRequestResetPasswordEmail) =>{
  try {
    const response = await newRequest.post(`auth/password-reset-token`,email)
    return response
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const resetUserPassword = async (passwordData:IResetPasswordPayload) =>{
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
    const response = await  newRequest.post(`auth/logout`)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }

}




