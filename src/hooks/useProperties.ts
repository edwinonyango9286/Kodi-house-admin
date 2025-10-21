import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteProperty, listOccuppiedProperties, listProperties, listVacantProperties, restoreProperty } from "../components/services/propertyService"

 export const useGetProperties = (params?:Record< string , string | number>)=> {
    return useQuery({
       queryKey :["properties", params],
       queryFn:()=>listProperties(params),
       staleTime: 5*60*1000,
       gcTime:10*60*1000,
    })
}

export const useRestoreProperty =  ()=>{
   const queryClient = useQueryClient();
   return useMutation({
    mutationFn:restoreProperty,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["properties"]})
    }
   }) 
}

export const useDeleteProperty =()=>{
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn:deleteProperty,
      onSuccess:()=>{
         queryClient.invalidateQueries({ queryKey:["properties"]})
      }
   })
}


export const useFetchVacantProperties = ()=>{
   return useQuery({
      queryKey:["vacantProperties"],
      queryFn:listVacantProperties,
      staleTime:5*60*1000,
      gcTime:10*60*1000,
   })
}

export const useFetchOccupiedProperties = ()=>{
   return useQuery({
      queryKey:["occupiedProperties"],
      queryFn:listOccuppiedProperties,
      staleTime:5*60*1000,
      gcTime:10*60*1000
   })
}