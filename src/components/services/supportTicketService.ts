import type { ICreateSupportTicketPayload, } from "../../types/types"
import { config } from "../../utils/config"
import { newRequest } from "../../utils/newRequest"

export const createSupportTicket = async (supportTicketData:ICreateSupportTicketPayload) => {
    try {
        const response = await newRequest.post(`support-tickets/create`,supportTicketData, config)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}


export const listSupportTickets = async ()=>{
    try {
        const response = await newRequest.get(`support-tickets/support-tickets/get`,config);
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}
