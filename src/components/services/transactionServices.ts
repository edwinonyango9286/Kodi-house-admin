import { config } from "../../utils/config"
import { newRequest } from "../../utils/newRequest"

interface ListTransactionsParams {
  page: number;
  pageSize: number;
}

 export const listTransactions = async({ page, pageSize}:ListTransactionsParams)=>{
    try {
        const response = await newRequest.get(`transaction/transactions?page=${page}&limit=${pageSize}`, config);
        return response
    } catch (error) {
      console.log(error)  
      throw error
    }
 }