import { config } from "../../utils/config"
import { newRequest } from "../../utils/newRequest"


 export const listPayments =  async(params?:{ search?:string, page?:number, limit?:number, sort?:string, }, ) => {
    try {
        const requestConfig = {...config , params:params || {}}
        const response = await newRequest.get(``,requestConfig);
        return response
    } catch (error) {
       console.log(error) 
       throw error
    }
}

