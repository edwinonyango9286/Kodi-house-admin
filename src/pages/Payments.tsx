import { Box, Divider, FormControl, FormLabel, InputAdornment, Paper, TextField, Typography, type SelectChangeEvent, Select, MenuItem } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import dropdownGreyIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown Icon grey.svg"
import refreshIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/refresh icon.svg"
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import filterIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/filter icon.svg"
import deleteIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon.svg"
import printerIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/printer icon.svg"
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import type { IPayments } from '../types/types'
import { listPayments } from '../components/services/paymentsService'
import NoRowsOverlay from '../components/common/NoRowsOverlay'

const Payments = () => {
  const rows = []

  const paymentStatuses = [
    {id:1, name:"All"},
    {id:2, name:"Successful"},
    {id:3, name:"Cancelled"},
    {id:4, name:"Pending"},
  ]

  const [selectedStatus,setSelectedStatus] =  React.useState("All");

  const handleSelectStatus = (e:SelectChangeEvent) =>{
    setSelectedStatus(e.target.value as string)
  }

  const [paymentsList,setPaymentsList] = useState<IPayments[]>([])

  const listAllPayments = useCallback( async()=>{
    try {
      const response = await listPayments()
      if(response.status === 200){
        setPaymentsList(response.data.data)
      }
      
    } catch (error) {
      console.log(error)
    }
  },

  [])

 useEffect(()=>{
  listAllPayments()
 },[listAllPayments])

 const paymentColumns:GridColDef[] = [
  {field:"#", headerName:"#",flex:0.5,},
  {field:"date",headerName:"Date", flex:1},
  {field:"invoiceNumber", headerName:"Invoice #", flex:1},
  {field:"tenant", headerName:"Tenant", flex:1 },
  {field:"property", headerName:"Property", flex:1},
  {field:"paymentMode", headerName:"Payment Mode", flex:1},
  {field:"amount", headerName:"Amount", flex:1},
  {field:"transactionId", headerName:"Transaction Id", flex:1},
  {field:"status", headerName:"Status", flex:1}
 ]

 const paymentRows = paymentsList.map((payment)=>({
  id:payment._id,
 }))

  return (
     <Box sx={{width:"100%",}}>
      <Paper elevation={0} sx={{ borderRadius:"4px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", width:"100#", backgroundColor:"#fff", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"}}>
        <Typography sx={{fontSize:"18px", fontWeight:"600",textAlign:"start", color:"#2C2E3E"}}>Payment reports</Typography>

        <Divider sx={{borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1"}}/>
             <Box sx={{ marginY:"4px", width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"24%"}}>
                     <FormLabel  htmlFor="status" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='payment-status-select' value={selectedStatus} onChange={handleSelectStatus} sx={{height:"42px", borderRadius:"8px", width:"100%"}}>
                       {paymentStatuses.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                  </FormControl>
              </Box>
         <Divider sx={{ borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1"}}/>


        <Box sx={{ width:"100%", display:"flex", justifyContent:"space-between"}}>
          <Box sx={{ display:"flex", gap:"20px"}}>
          <Box sx={{height:"42px", alignItems:"center", padding:"8px", width:"100px", borderRadius:"8px", border:"1px solid #D1D5DB", display:"flex", justifyContent:"space-between"}}>
            <Typography variant='body2' sx={{ color:"#4B5563",fontSize:"14px", fontWeight:"500", textAlign:"start"}}>10</Typography>
            <img src={dropdownGreyIcon} alt="dropdownGreyIcon" />
            <Divider orientation='vertical' sx={{height:"42px", backgroundColor:"#9CA3AF",borderWidth:"1px"}}/>
            <img src={refreshIcon} alt="refreshIcon" />
          </Box>
          <Box sx={{ padding:"10px" ,border:"1px solid #D1D5DB", width:"100px", height:"42px", borderRadius:"8px"}}>
            <Typography variant='body2' sx={{fontSize:"14px",fontWeight:"500",textAlign:"center",color:"#4B5563"}}>Export</Typography>
          </Box>
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
          <DataGrid sx={{ width:"100%"}} slots={{ noRowsOverlay:NoRowsOverlay }} columns={paymentColumns} rows={paymentRows} pageSizeOptions={[10,20,50,100]}/>
        </Box>

      </Paper>

    </Box>
  )
}

export default Payments
