import { config } from "../../utils/config";
import { newRequest } from "../../utils/newRequest";

export const listReceipts = async (params?:{ status?:string, search?:string , sort?:string, page?:number, limit?:number}) => {
  try {
    const paramsConfig = {...config, params:params || {} }
    const response = await newRequest.get(`/receipts`, paramsConfig);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
