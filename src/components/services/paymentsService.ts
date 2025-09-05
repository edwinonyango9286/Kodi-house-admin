import { config } from "../../utils/config"
import { newRequest } from "../../utils/newRequest"


 export const listPayments =  async() => {
    try {
        const response = await newRequest.get(``,config);
        return response
    } catch (error) {
       console.log(error) 
       throw error
    }
}

