import { Box, Divider, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import dropdownGreyIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown Icon grey.svg"
import refreshIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/refresh icon.svg"
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import filterIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/filter icon.svg"
import deleteIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon.svg"
import printerIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/printer icon.svg"
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { listOccuppiedProperties, listProperties, listVacantProperties } from '../components/services/propertyService'
import { listUnits } from '../components/services/unitsService'

const Properties = () => {
  interface property {
    _id:string,
  }

  const [propertiesList,setPropertiesList] = useState<property[]>([])
  const [loadingProperties,setLoadingProperties]  = useState<boolean>(false)
  const [unitsCount,setUnitsCount] = useState<number>(0)

  const propertyColumns: GridColDef[] = [
    {field:"propertyImage", headerName:"Property Image" , flex:1},
    {field:"propertyName", headerName:"Property Name" , flex:1},
    {field:"propertyType", headerName:"Property Type" , flex:1},
    {field:"units", headerName:"Units" , flex:1},
    {field:"landlordName", headerName:"Landlord Name" , flex:1},
    {field:"status", headerName:"Status" , flex:1},
    {field:"action", headerName:"Action" , flex:1},
  ]

  const propertyRows = propertiesList.map((property)=>({
    id:property?._id
  }))

  const listAllProperties = async() => {
    try {
      setLoadingProperties(true)
      const response = await listProperties()
      if(response.status === 200){
        setPropertiesList(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoadingProperties(false)
    }
  }

  useEffect(()=>{
    listAllProperties()
  },[])

  const listAllUnits =  async ()=>{
    try {
      const response = await listUnits();
      if(response.status === 200){
        setUnitsCount(response?.data?.data?.unitsCount)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
   listAllUnits()
  },[])
  
  const [occuppiedProperties,setOccuppiedProperties] = useState([]);

  const listAllOccuppiedProperties = async() => {
    try {
      const response = await listOccuppiedProperties()
      if(response.status === 200){
        setOccuppiedProperties(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    listAllOccuppiedProperties();
  },[])

  const [vaccantProperties,setVaccantProperties] = useState([])

  const listAllVacantProperties = async ()=>{
    try {
      const response = await listVacantProperties();
      if(response.status === 200 ){
        setVaccantProperties(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    listAllVacantProperties()
  },[])


  return (
    <Box sx={{width:"100%",}}>
      <Paper elevation={0} sx={{ borderRadius:"4px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", width:"100#", backgroundColor:"#fff", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"}}>
        <Typography sx={{fontSize:"18px", fontWeight:"600",textAlign:"start", color:"#2C2E3E"}}>Properties  Overview</Typography>
        <Box sx={{paddingX:"24px", width:"100%", display:"flex",justifyContent:"space-between"}}>

          <Box sx={{ display:"flex", flexDirection:"column", gap:"6px",}}>
            <Typography variant='body2' sx={{color:"#4B5563", fontSize:"16px", fontWeight:"400" }}>Total Properties</Typography>
            <Typography variant='body2' sx={{ fontSize:"36px", fontWeight:"600", textAlign:"start", color:"#1F2937" }}>{propertiesList?.length}</Typography>
          </Box>
          <Divider orientation='vertical' sx={{ height:"80px", borderWidth:"1px", backgroundColor:"#9CA3AF"}} />
           <Box sx={{ display:"flex", flexDirection:"column", gap:"6px", marginTop:"10px"}}>
            <Typography variant='body2' sx={{color:"#059669", fontSize:"16px", fontWeight:"400" }}>Occupied properties</Typography>
            <Typography variant='body2' sx={{ fontSize:"36px", fontWeight:"600", textAlign:"start", color:"#1F2937" }}>{occuppiedProperties.length}</Typography>
          </Box>
          <Divider orientation='vertical' sx={{ height:"80px", borderWidth:"1px", backgroundColor:"#9CA3AF"}} />
           <Box sx={{ display:"flex", flexDirection:"column", gap:"6px", marginTop:"10px"}}>
            <Typography variant='body2' sx={{color:"#DC2626", fontSize:"16px", fontWeight:"400" }}>Vacant properties</Typography>
            <Typography variant='body2' sx={{ fontSize:"36px", fontWeight:"600", textAlign:"start", color:"#1F2937" }}>{vaccantProperties.length}</Typography>
          </Box>
            <Divider orientation='vertical' sx={{ height:"80px", borderWidth:"1px" , backgroundColor:"#9CA3AF"}} />
           <Box sx={{ display:"flex", flexDirection:"column", gap:"6px", marginTop:"10px"}}>
            <Typography variant='body2' sx={{color:"#4B5563", fontSize:"16px", fontWeight:"400" }}>Total Units</Typography>
            <Typography variant='body2' sx={{ fontSize:"36px", fontWeight:"600", textAlign:"start", color:"#1F2937" }}>{unitsCount || 0}</Typography>
          </Box>

        </Box>

        <Divider sx={{ borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1"}}/>

        <Box sx={{ width:"100%", display:"flex", justifyContent:"space-between"}}>

          <Box sx={{height:"42px", alignItems:"center", padding:"8px", width:"100px", borderRadius:"8px", border:"1px solid #D1D5DB", display:"flex", justifyContent:"space-between"}}>
            <Typography variant='body2' sx={{ color:"#4B5563",fontSize:"14px", fontWeight:"500", textAlign:"start"}}>10</Typography>
            <img src={dropdownGreyIcon} alt="dropdownGreyIcon" />
            <Divider orientation='vertical' sx={{height:"42px", backgroundColor:"#9CA3AF",borderWidth:"1px"}}/>
            <img src={refreshIcon} alt="refreshIcon" />
          </Box>
          <Box sx={{ display:"flex", gap:"20px"}}>
            <TextField placeholder='Search' sx={{ width:"190px"}} InputProps={{ startAdornment:(<InputAdornment position='start'><img src={searchIcon} alt="searchIcon" style={{width:"20px", height:"20px"}} /></InputAdornment>),sx:{width:"200px", height:"42px"} }}/>
             <Box sx={{ height:"42px", width:"100px", borderRadius:"8px",border:"1px solid #D1D5DB", display:"flex", alignItems:"center", justifyContent:"space-between",paddingX:"10px"}}>
               <Typography sx={{ color:"#4B5563", fontSize:"14px", fontWeight:"500", textAlign:"start"}}>Newest</Typography>
               <img src={filterIcon} alt="filterIcon" style={{width:"20px", height:"20px"}} />
             </Box>
             <Box sx={{ borderRadius:"8px", border:"1px solid #D1D5DB", height:"42px", width:"50px", display:"flex", alignItems:"center", justifyContent:"center"}}>
              <img src={deleteIcon} alt="deleteIcon" style={{ height:"24px", width:"24px"}} />
             </Box>
             <Box sx={{ borderRadius:"8px", border:"1px solid #D1D5DB", height:"42px", width:"50px", display:"flex", alignItems:"center", justifyContent:"center"}}>
              <img src={printerIcon} alt="printerIcon" style={{ height:"24px", width:"24px"}} />
             </Box>
          </Box>
        </Box>

        <Box sx={{width:"100%", height:"500px", marginTop:"20px"}}>
          <DataGrid sx={{ width:"100%"}} loading={loadingProperties} columns={propertyColumns} rows={propertyRows} pageSizeOptions={[10,20,50,100]}/>
        </Box>

      </Paper>

    </Box>
  )
}

export default Properties
