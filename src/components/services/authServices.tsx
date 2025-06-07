import { newRequest } from "../newRequest";

interface CreateAccountPayload {
  name:string,
  email: string;
  password: string;
  acceptTermsAndConditons:boolean
}

interface CreateAccountResponse {
  accessToken: string;
  refreshToken: string;
}

export const createAccount = async (accountData: CreateAccountPayload): Promise<CreateAccountResponse> => {
  try {
    const response = await newRequest.post<CreateAccountResponse>('create-account',accountData);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error
  }
};