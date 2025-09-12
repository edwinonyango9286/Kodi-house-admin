import { Box, Divider, FormControl, FormLabel, InputAdornment, Paper, TextField, Typography, type SelectChangeEvent, Select, MenuItem, Menu } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import dropdownGreyIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown Icon grey.svg"
import refreshIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/refresh icon.svg"
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import filterIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/filter icon.svg"
import deleteIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon.svg"
import printerIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/printer icon.svg"
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import type { Payments } from '../interfaces/interfaces'
import { listPayments } from '../components/services/paymentsService'
import NoRowsOverlay from '../components/common/NoRowsOverlay'
import { useDebounce } from '../hooks/useDebounce'

const Payments = () => {
  const paymentStatuses = [
    {id:1, value:"all",label:"All"},
    {id:2, value:"successful", label:"Successfull"},
    {id:3, value:"cancelled",label:"Cancelled"},
    {id:4, value:"pending", label:"Pending"},
  ]

  const [selectedStatus,setSelectedStatus] =  React.useState("all");

  const handleSelectStatus = (e:SelectChangeEvent) =>{
    if(e.target.value === "all"){
      setSelectedStatus("");
    }else{
     setSelectedStatus(e.target.value as string)
    }
  }

 
 const [paginationModel,setPaginationModel] = useState({ page:0, pageSize:10});
  const [paymentsList,setPaymentsList] = useState<Payments[]>([]);

   const sortOptions = [
    {value:"-createdAt", label:"Newest"},
    {value:"createdAt", label:"Oldest"}
  ]
  const [sortOption,setSortOption] = useState("-createdAt");

  const handleSortChange =(e:SelectChangeEvent)=>{
    setSortOption(e.target.value as string);
    setPaginationModel({...paginationModel, page:0})
  }

  const [searchQuery,setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery,500);
  const [paymentsCount,setPaymentsCount] = useState(0);


  const [loadingPayments,setLoadingPayments] = useState(false)
  const listAllPayments = useCallback( async()=>{
    try {
      setLoadingPayments(true)
      const  params :Record<string,string|number> ={
        page:paginationModel.page+1,
        limit:paginationModel.pageSize,
        sort:sortOption
      }
      if(debouncedSearchQuery){
        params.search =debouncedSearchQuery.trim();
      }
      if(selectedStatus){
        params.status = selectedStatus
      }

      const response = await listPayments(params);
      if(response.status === 200){
        setPaymentsList(response.data.data);
        setPaymentsCount(response.data.totalCount);
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoadingPayments(false)
    }
  },[paginationModel, sortOption, debouncedSearchQuery, selectedStatus]);


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

 const handleRefresh = ()=>{
  setSearchQuery("");
  setSelectedStatus("all")
  setSortOption("-createdAt");
  setPaginationModel({ page:0, pageSize:10})
 }

  const [anchorElPageSizeMenu,setAnchorElPageSizeMenu] = useState<null | HTMLElement>(null);
   const openPageSizeMenu = Boolean(anchorElPageSizeMenu);
 
     const handleOpenPageSizeMenu = ( event:React.MouseEvent<HTMLButtonElement>)=>{
     setAnchorElPageSizeMenu(event.currentTarget)
     }
   
     const handleClosePageSizeMenu = ()=>{
     setAnchorElPageSizeMenu(null);
     }

    const handlePageSizeSelection =(size:number)=>{
      setPaginationModel({ pageSize:size, page:0})
      handleClosePageSizeMenu()
    }

  return (
     <Box sx={{width:"100%",}}>
      <Paper elevation={0} sx={{ borderRadius:"4px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", width:"100#", backgroundColor:"#fff", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"}}>
        <Typography sx={{fontSize:"18px", fontWeight:"600",textAlign:"start", color:"#2C2E3E"}}>Payment reports</Typography>
        <Divider sx={{borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1"}}/>
             <Box sx={{ marginY:"4px", width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"24%"}}>
                     <FormLabel  htmlFor="status" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='payment-status-select' value={selectedStatus} onChange={handleSelectStatus} sx={{height:"42px", borderRadius:"8px", width:"100%"}}>
                       {paymentStatuses.map((status)=>(<MenuItem key={status.id} value={status.value}>{status.label}</MenuItem>))}
                     </Select>
                  </FormControl>
              </Box>
         <Divider sx={{ borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1"}}/>


        <Box sx={{ width:"100%", display:"flex", justifyContent:"space-between"}}>
          <Box sx={{ display:"flex", gap:"20px"}}>
          <Box sx={{height:"42px", alignItems:"center", padding:"8px", width:"100px", borderRadius:"8px", border:"1px solid #D1D5DB", display:"flex", justifyContent:"space-between"}}>
              <Box onClick={handleOpenPageSizeMenu} component={"button"} sx={{ border:"none", backgroundColor:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"4px"}}>
              <Typography variant='body2' sx={{ color:"#4B5563",fontSize:"14px", fontWeight:"500", textAlign:"start"}}>{paginationModel.pageSize}</Typography>
              <img src={dropdownGreyIcon} alt="dropdownGreyIcon" />
            </Box>
              <Menu id="basic-menu" anchorEl={anchorElPageSizeMenu} open={openPageSizeMenu} onClose={handleClosePageSizeMenu} MenuListProps={{ 'aria-labelledby': 'basic-button'}} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                  {[10, 20, 50, 100].map((size) => (
                    <MenuItem key={size} onClick={() => handlePageSizeSelection(size)}>
                      {size}
                    </MenuItem>
                  ))}
              </Menu>
            <Divider orientation='vertical' sx={{height:"42px", backgroundColor:"#9CA3AF",borderWidth:"1px"}}/>
            <img style={{ cursor:"pointer"}} onClick={handleRefresh} src={refreshIcon} alt="refreshIcon" />
          </Box>
          <Box sx={{ padding:"10px" ,border:"1px solid #D1D5DB", width:"100px", height:"42px", borderRadius:"8px"}}>
            <Typography variant='body2' sx={{fontSize:"14px",fontWeight:"500",textAlign:"center",color:"#4B5563"}}>Export</Typography>
          </Box>
          </Box>

          <Box sx={{ display:"flex", gap:"20px"}}>
            <TextField placeholder='Search by transaction id, invoice number...' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} sx={{ width:"190px"}} InputProps={{ startAdornment:(<InputAdornment position='start'><img src={searchIcon} alt="searchIcon" style={{width:"20px", height:"20px"}} /></InputAdornment>),sx:{width:"200px", height:"42px"} }}/>
                <Box sx={{ height: "42px", width: "140px", borderRadius: "8px", border: "1px solid #D1D5DB", display: "flex", alignItems: "center", justifyContent: "space-between", paddingX: "10px" }}>
              <Select
                value={sortOption}
                onChange={handleSortChange}
                variant="standard"
                disableUnderline
                sx={{ color: "#4B5563", fontSize: "14px", fontWeight: "500", border: "none", width: "100%" }}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
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
          <DataGrid rowCount={paymentsCount} loading={loadingPayments} onPaginationModelChange={setPaginationModel} paginationModel={paginationModel} paginationMode='server' sx={{ width:"100%"}} slots={{ noRowsOverlay:NoRowsOverlay }} columns={paymentColumns} rows={paymentRows} pageSizeOptions={[10,20,50,100]}/>
        </Box>

      </Paper>

    </Box>
  )
}

export default Payments
