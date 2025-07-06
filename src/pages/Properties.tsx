import { Box, Button, CircularProgress, Divider, IconButton, InputAdornment, Modal, Paper, TextField, Typography, useTheme } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import dropdownGreyIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown Icon grey.svg"
import refreshIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/refresh icon.svg"
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import filterIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/filter icon.svg"
import deleteIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon.svg"
import printerIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/printer icon.svg"
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { deleteProperty, listOccuppiedProperties, listProperties, listVacantProperties } from '../components/services/propertyService'
import { listUnits } from '../components/services/unitsService'
import editIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/edit icon.svg"
import deleteIconGrey from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/deleted Icon grey.svg"
import dotsVertical from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dots vertical icon.svg"
import { debounce } from 'lodash';
import NoRowsOverlay from '../components/common/NoRowsOverlay'
import { showErrorToast, showInfoToast } from '../utils/toast'
import type { AxiosError } from 'axios'
import type { Property } from '../interfaces/property'
import { getModalStyle } from '../theme'
import cancelIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/cancel Icon.svg"
import warningIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/warning icon.svg"

const Properties = () => {

  const [propertiesList,setPropertiesList] = useState<Property[]>([])
  const [loadingProperties,setLoadingProperties]  = useState<boolean>(false)
  const [unitsCount,setUnitsCount] = useState<number>(0);
  const [searchQuery,setSearchQuery] = useState<string>("")

  const propertyColumns: GridColDef[] = [
    {field:"propertyImage", headerName:"Property Image" , flex:1,
      renderCell:(params)=>{
        const propertyImage = params.row.propertyImage 
        return (
          <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"10px", width:"120px", height:"100%"}}>
            <img src={propertyImage} alt="propertyImage" style={{ flexShrink:0, borderRadius:"20px", width:"80px" , height:"80px", objectFit:"cover"}} />
          </Box>
        )
      }
    },
    {field:"propertyName", headerName:"Property Name" , flex:1},
    {field:"propertyType", headerName:"Property Type" , flex:1},
    {field:"propertyCategory", headerName:"Property Category" , flex:1},
    {field:"numberOfUnits", headerName:"Units" , flex:1},
    {field:"occupiedUnits", headerName:"Occupied Units" , flex:1},
    {field:"landlordName", headerName:"Landlord Name" , flex:1},
    {field:"status", headerName:"Status" , flex:1,
      renderCell:(params)=>(
        <Box sx={{ display:"flex", alignItems:"center", height:"100%"}}>
          <Typography sx={{ padding:"4px 8px", borderRadius:"16px", color:params.row.status === "Vacant" ? "#B42318":"#027A48", backgroundColor: params.row.status ==="Vacant" ? "#FEF3F2" : "#ECFDF3" }}>{params.row.status}</Typography>
        </Box>
    )
    },
    {field:"action", headerName:"Action" , flex:1, renderCell:(params)=>(
      <Box sx={{display:"flex", gap:"10px", alignItems:"center", height:"100%", justifyContent:"start"}}>
      <IconButton>
        <img src={editIcon} style={{ width:"24px", height:"24px"}} alt="editIcon" />
      </IconButton>
       <IconButton >
        <img onClick={()=>{handleOpneDeletePropertyModal(params.row)}} src={deleteIconGrey} style={{ width:"24px", height:"24px"}} alt="deleteIcon" />
      </IconButton>
       <IconButton >
        <img src={dotsVertical} style={{ width:"24px", height:"24px"}} alt="dotsVertical" />
      </IconButton>
    </Box>
  )},
  ]

  const propertyRows = propertiesList.map((property)=>({
    id:property?._id,
    propertyName:property?.name,
    propertyType:property?.type || "N/A",
    numberOfUnits:property?.numberOfUnits,
    occupiedUnits:property?.occupiedUnits,
    landlordName:property?.createdBy?.userName,
    status:property?.currentStatus,
    propertyCategory:property?.category,
    propertyImage: property?.images?.[0]?.secure_url
  }))



const listAllProperties = useCallback( async (search = "") => {
  try {
    setLoadingProperties(true);
    const response = await listProperties(search ? { search } : undefined);
    if (response.status === 200) {
      setPropertiesList(response.data.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingProperties(false);
  }
},[]);

 const debouncedSearch = useMemo(
  () =>
    debounce((value: string) => {
      listAllProperties(value);
    },500),[listAllProperties]);

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value)
  }


useEffect(() => {
  return () => {
    debouncedSearch.cancel();
  };
}, [debouncedSearch]);

  useEffect(()=>{
    listAllProperties()
  },[listAllProperties])
  

  const [fetchingAllUnits,setFetchingAllUnits]  = useState(false)
  const listAllUnits =  async ()=>{
    try {
      setFetchingAllUnits(true)
      const response = await listUnits();
      if(response.status === 200){
        setUnitsCount(response?.data?.data?.unitsCount)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setFetchingAllUnits(false)
    }
  }

  useEffect(()=>{
   listAllUnits()
  },[])
  
  const [occuppiedProperties,setOccuppiedProperties] = useState([]);
  const [fetchingOccupiedProperties,setFetchingOccupiedProperties] = useState(false)

  const listAllOccuppiedProperties = async() => {
    try {
      setFetchingOccupiedProperties(true)
      const response = await listOccuppiedProperties()
      if(response.status === 200){
        setOccuppiedProperties(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setFetchingOccupiedProperties(false);
    }
  }

  useEffect(()=>{
    listAllOccuppiedProperties();
  },[])

  const [vaccantProperties,setVaccantProperties] = useState([])
  const [fetchingVacantProperties,setFetchingVacantProperties]  = useState(false)

  const listAllVacantProperties =  async ()=>{
    try {
      setFetchingVacantProperties(true)
      const response = await listVacantProperties();
      if(response.status === 200 ){
        setVaccantProperties(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setFetchingVacantProperties(false)
    }
  }

  useEffect(()=>{
    listAllVacantProperties()
  },[])

  
  const [deletingProperty,setDeletingProperty]  = useState(false);
  const [propertyToDeleteId,setPropertyToDeleteId]  = useState<string>("")
  const [propertyName,setPropertyName]  = useState<string>("")

  const handleDeleteProperty = async ()=>{
    try {
      setDeletingProperty(true)
      const response = await deleteProperty(propertyToDeleteId);
      if(response.status === 200){
        showInfoToast(response.data.message);
        handleCloseDeletePropertyModal();
        listAllProperties();
        listAllVacantProperties();
        listAllOccuppiedProperties();
        listAllUnits();
      }
    } catch (error) {
      const err = error as AxiosError<{message?:string}>
      showErrorToast(err.response?.data.message || err.message)
    }finally{
      setDeletingProperty(false)
    }
  }

  const theme = useTheme()
  const modalStyles =  getModalStyle(theme.palette.mode)

  const [openDeletePropertyModal,setOpenDeletePropertyModal]  = useState(false);

  const handleOpneDeletePropertyModal =(property:Property)=>{
    console.log(property,"=>property...")
    setPropertyToDeleteId(property.id);
    setPropertyName(property.propertyName)
    setOpenDeletePropertyModal(true);
  }

  const handleCloseDeletePropertyModal = ()=>{
    setOpenDeletePropertyModal(false);
    setPropertyToDeleteId("")
  }


  return (
    <Box sx={{width:"100%",}}>
      <Paper elevation={0} sx={{ borderRadius:"4px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", width:"100#", backgroundColor:"#fff", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"}}>
        <Typography sx={{fontSize:"18px", fontWeight:"600",textAlign:"start", color:"#2C2E3E"}}>Properties  Overview</Typography>
        <Box sx={{paddingX:"24px", width:"100%", display:"flex",justifyContent:"space-between"}}>

          <Box sx={{ display:"flex", flexDirection:"column", gap:"6px",}}>
            <Typography variant='body2' sx={{color:"#4B5563", fontSize:"16px", fontWeight:"400" }}>Total Properties</Typography>
             { loadingProperties ? <CircularProgress size={20} thickness={5} sx={{ color:"#333",  marginTop:"10px"}} /> :<Typography variant='body2' sx={{ fontSize:"36px", fontWeight:"600", textAlign:"start", color:"#1F2937" }}>{propertiesList?.length}</Typography> } 
          </Box>
          <Divider orientation='vertical' sx={{ height:"80px", borderWidth:"1px", backgroundColor:"#9CA3AF"}} />
           <Box sx={{ display:"flex", flexDirection:"column", gap:"6px", marginTop:"10px"}}>
            <Typography variant='body2' sx={{color:"#059669", fontSize:"16px", fontWeight:"400" }}>Occupied properties</Typography>
           { fetchingOccupiedProperties ?  <CircularProgress size={20} thickness={5} sx={{ color:"#333", marginTop:"10px"}}/> : <Typography variant='body2' sx={{ fontSize:"36px", fontWeight:"600", textAlign:"start", color:"#1F2937" }}>{occuppiedProperties.length}</Typography> }  
          </Box>
          <Divider orientation='vertical' sx={{ height:"80px", borderWidth:"1px", backgroundColor:"#9CA3AF"}} />
           <Box sx={{ display:"flex", flexDirection:"column", gap:"6px", marginTop:"10px"}}>
             <Typography variant='body2' sx={{color:"#DC2626", fontSize:"16px", fontWeight:"400" }}>Vacant properties</Typography>
            { fetchingVacantProperties ? <CircularProgress size={20} thickness={5} sx={{ marginTop:"10px", color:"#333"}} />: <Typography variant='body2' sx={{ fontSize:"36px", fontWeight:"600", textAlign:"start", color:"#1F2937" }}>{vaccantProperties.length}</Typography>}
          </Box>
            <Divider orientation='vertical' sx={{ height:"80px", borderWidth:"1px" , backgroundColor:"#9CA3AF"}} />
           <Box sx={{ display:"flex", flexDirection:"column", gap:"6px", marginTop:"10px"}}>
            <Typography variant='body2' sx={{color:"#4B5563", fontSize:"16px", fontWeight:"400" }}>Total Units</Typography>
           {fetchingAllUnits ? <CircularProgress thickness={5} size={20} sx={{ color:"#333", marginTop:"10px" }}/> :<Typography variant='body2' sx={{ fontSize:"36px", fontWeight:"600", textAlign:"start", color:"#1F2937" }}>{unitsCount || 0}</Typography> }  
          </Box>

        </Box>

        <Divider sx={{ borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1"}}/>

        <Box sx={{ width:"100%", display:"flex", justifyContent:"space-between"}}>
          <Box sx={{height:"42px", alignItems:"center", padding:"8px", width:"100px", borderRadius:"8px", border:"1px solid #D1D5DB", display:"flex", justifyContent:"space-between"}}>
            <Typography variant='body2' sx={{ color:"#4B5563",fontSize:"14px", fontWeight:"500", textAlign:"start"}}>10</Typography>
            <img src={dropdownGreyIcon} alt="dropdownGreyIcon" />
            <Divider orientation='vertical' sx={{height:"42px", backgroundColor:"#9CA3AF",borderWidth:"1px"}}/>
            <img src={refreshIcon} alt="refreshIcon" style={{ cursor:"pointer"}} onClick={()=>{listAllProperties()}} />
          </Box>
          <Box sx={{ display:"flex", gap:"20px"}}>
            <TextField placeholder='Search by name, category, status or type' value={searchQuery} onChange={handleSearch} sx={{ width:"190px"}} InputProps={{ startAdornment:(<InputAdornment position='start'><img src={searchIcon} alt="searchIcon" style={{width:"20px", height:"20px"}} /></InputAdornment>),sx:{width:"200px", height:"42px"} }}/>
             <Box sx={{ cursor:"pointer", height:"42px", width:"100px", borderRadius:"8px",border:"1px solid #D1D5DB", display:"flex", alignItems:"center", justifyContent:"space-between",paddingX:"10px"}}>
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
          <DataGrid  slots={{ noRowsOverlay:NoRowsOverlay}} getRowHeight={()=>100} sx={{ width:"100%" }} loading={loadingProperties} columns={propertyColumns} rows={propertyRows} pageSizeOptions={[10,20,50,100]}/>
        </Box>

       {/* delete property  modal */}
          <Modal open={openDeletePropertyModal} onClose={handleCloseDeletePropertyModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={modalStyles}>
            <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px"}}>
                  <IconButton sx={{ width:"48px", height:"48px", backgroundColor:"#fde8ee", cursor:"pointer",}}>
                    <img style={{ }} src={warningIcon} alt="warningIcon" />
                  </IconButton>
                <IconButton onClick={handleCloseDeletePropertyModal}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
            </Box>
            <Box sx={{ width:"100%", marginTop:"10px", marginBottom:"10px"}}>
               <Typography id="modal-modal-title" sx={{ fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Delete {propertyName}?</Typography>
            </Box>
  
            <Box style={{ width:"100%", display:"flex", flexDirection:"column", gap:"10px", alignItems:"start"}}>
               <Typography style={{fontSize:"14px" , fontWeight:"700"}}>Deleting this  property  will:</Typography>
            <Box sx={{ display:"flex", flexDirection:"column", marginTop:"-6px"}}>
                <Typography style={{ fontSize:"14px", fontWeight:"400"}}>🚫 Permanently deleted the property  from the system.</Typography>
                <Typography style={{ fontSize:"14px", fontWeight:"400"}}>🚫 This action cannot be undone.</Typography>
            </Box>
            <Box sx={{ display:"flex", alignSelf:"end", gap:"20px"}}>
                <Button type='submit' onClick={()=>{handleCloseDeletePropertyModal()}}  variant='contained' sx={{ ":hover":{ boxShadow:"none"},  border:"solid 1px #ee1d52" ,boxShadow:"none", marginTop:"10px", width:"156px",  backgroundColor:"#fff",fontSize:"16px", fontWeight:"500", color:"#ee1d52"}}>Cancel</Button>
                <Button type='submit' onClick={handleDeleteProperty} loading={deletingProperty} variant='contained' disabled={deletingProperty} sx={{ ":hover":{boxShadow:"none"}, boxShadow:"none", marginTop:"10px", width:"156px",  backgroundColor:"#111",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Delete</Button>
            </Box>
            </Box>
          </Box>
        </Modal>
      </Paper>

    </Box>
  )
}

export default Properties
