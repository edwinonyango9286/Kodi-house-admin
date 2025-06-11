import { newRequest } from "../../utils/newRequest";
import type {ICreateAccountPayload, ISignInPayload, IVerifyCodePayload} from "../../types/types"


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


