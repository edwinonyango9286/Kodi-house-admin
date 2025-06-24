import { config } from "../../utils/config";
import { newRequest } from "../../utils/newRequest"

export const listInvoices = async (params?: { search?: string; status?: string;  page?: number; limit?: number; }) => {
  try {
    const requestConfig = { ...config, params: params || {} };
    const response = await newRequest.get(`/invoices/invoices`, requestConfig);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}