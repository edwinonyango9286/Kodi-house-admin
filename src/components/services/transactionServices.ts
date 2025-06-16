import { config } from "../../utils/config"
import { newRequest } from "../../utils/newRequest"

 export const listTransactions = async()=>{
    try {
        const response = await newRequest.get(`transaction/list-transactions`, config);
        return response
    } catch (error) {
      console.log(error)  
      throw error
    }
 }