import { config } from "../../utils/config";
import { newRequest } from "../../utils/newRequest";

export const listReceipts = async () => {
  try {
    const response = await newRequest.get(`/receipts`, config);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
