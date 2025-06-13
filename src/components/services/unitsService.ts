import { config } from "../../utils/config"
import { newRequest } from "../../utils/newRequest"


export const listUnits =  async() => {
    try {
        const response = await newRequest.get(`units/units`, config)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}