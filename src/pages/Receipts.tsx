import { Box, Divider, FormControl, FormLabel, InputAdornment, MenuItem, Paper, Select, TextField, Typography, type SelectChangeEvent } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import dropdownGreyIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown Icon grey.svg"
import refreshIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/refresh icon.svg"
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import filterIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/filter icon.svg"
import deleteIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon.svg"
import printerIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/printer icon.svg"
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import type { Receipts } from '../interfaces/interfaces'
import { listReceipts } from '../components/services/receiptServices'

const Receipts = () => {

  const [seletedReceiptCategory,setSelectedReceiptCategory]  = React.useState("All");
  const handleSelectReceiptChange = (e:SelectChangeEvent) => {
    setSelectedReceiptCategory(e.target.value as string)
  }

  const receiptStatus = [
    {id:1, name:"All" },
    {id:2 , name:"Paid"},
    {id:2 , name:"Overdue"},
    {id:2 , name:"Partially paid"}
  ]

  const receiptColums:GridColDef[]  = [
    {field:"#" , headerName:"#", flex:0.5},
    {field:"invoiceNumber", headerName:"Invoice", flex:1},
    {field:"tenant",headerName:"Tenant", flex:1 },
    {field:"property", headerName:"Property", flex:1},
    {field:"attachment", headerName:"Attachment", flex:1},
    {field:"amount", headerName:"Amount", flex:1},
    {field:"dueDate", headerName:"Due Date", flex:1},
    {field:"status", headerName:"Status", flex:1}
  ]

  const [receiptList,setReceiptList] = useState<Receipts[]>([]);
  const [loadingReceipts,setLoadingReceipts] = useState<boolean>(false)

  const receiptRows = receiptList.map((receipt)=>({
    id:receipt._id
  }))


  const listAllReceipts = useCallback(async()=>{
    try {
      setLoadingReceipts(true)
      const response = await listReceipts();
      if(response.status===200){
        setReceiptList(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoadingReceipts(false)
    }
  },[])

  useEffect(()=>{
   listAllReceipts()
  },[listAllReceipts])



  return (
     <Box sx={{width:"100%",}}>
      <Paper elevation={0} sx={{ borderRadius:"4px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", width:"100#", backgroundColor:"#fff", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"}}>
        <Typography sx={{fontSize:"18px", fontWeight:"600",textAlign:"start", color:"#2C2E3E"}}>Receipts reports</Typography>

        <Divider sx={{borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1"}}/>
             <Box sx={{ marginY:"4px", width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"24%"}}>
                     <FormLabel  htmlFor="status" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='payment-status-select' value={seletedReceiptCategory} onChange={handleSelectReceiptChange} sx={{height:"42px", borderRadius:"8px", width:"100%"}}>
                       {receiptStatus.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
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
          <DataGrid  loading={loadingReceipts} sx={{ width:"100%"}} columns={receiptColums} rows={receiptRows} pageSizeOptions={[10,20,50,100]}/>
        </Box>

      </Paper>

    </Box>
  )
}

export default Receipts

