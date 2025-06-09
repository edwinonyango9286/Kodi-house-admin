import { newRequest } from "../newRequest";
import type {ICreateAccountPayload, ICreateAccountResponse} from "../../types/types"


export const createAccount = async (accountData: ICreateAccountPayload): Promise<ICreateAccountResponse> => {
  try {
    const response = await newRequest.post<ICreateAccountResponse>('create-account',accountData);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error
  }
};