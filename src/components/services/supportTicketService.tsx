import type { ICreateSupportTicketPayload, ICreateSupportTicketResponse } from "../../types/types"
import { newRequest } from "../../utils/newRequest"

export const createSupportTicket = async (supportTicketData:ICreateSupportTicketPayload): Promise<ICreateSupportTicketResponse>=>{
    try {
        const response = await newRequest.post<ICreateSupportTicketResponse>(`create-support-ticket`,supportTicketData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }

}