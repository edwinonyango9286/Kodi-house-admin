import type { ICreatePropertyCategoryPayload } from "../../interfaces";
import { config } from "../../utils/config";
import { newRequest } from "../../utils/newRequest";


export const createPropertyCategory = async (propertyCategoryData:ICreatePropertyCategoryPayload)=>{
    try {
        const response = await newRequest.post(`property-categories/create`,propertyCategoryData, config)
        return response
    } catch (error) {
       console.log(error);
       throw error 
    }
}

export const listPropertyCategories =  async ()=>{
    try {
        const response = await newRequest.get("property-categories/list/property-categories",config);
        return response
    } catch (error) {
      console.log(error);
      throw error  
    }
}