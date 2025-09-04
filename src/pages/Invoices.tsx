import { Box, Divider, FormControl, FormLabel, IconButton, InputAdornment, Menu, MenuItem, Paper, Select, TextField, Typography, type SelectChangeEvent } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import dropdownGreyIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown Icon grey.svg"
import refreshIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/refresh icon.svg"
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import filterIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/filter icon.svg"
import deleteIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon.svg"
import printerIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/printer icon.svg"
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import NoRowsOverlay from '../components/common/NoRowsOverlay'
import { listInvoices } from '../components/services/InvoiceService'
import { dateFormatter } from '../utils/dateFormatter'
import type { Invoice } from '../interfaces/interfaces'
import { useDebounce } from '../hooks/useDebounce'
import CustomExportMenu from '../components/common/CustomExportMenu'
import deleteIconSmall from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon small.svg"
import editIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/edit icon.svg"
import dotsVertical from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dots vertical icon.svg"

const Invoices = () => {
  const statusCategories = [
    {value:"all", label:"All"},
    {value:"Paid", label: "Paid"},
    {value:"Draft", label: "Draft"},
    {value:"Overdue", label: "Overdue"},
    {value:"Partially paid", label: "Partially paid"},
  ]

  const [invoiceList,setInvoiceList] = useState<Invoice[]>([])
  const [loadingInvoices,setLoadingInvoices]  = useState<boolean>(false)


  const invoiceRows = invoiceList.map((invoice)=>({
    id:invoice._id,
    date:  dateFormatter(invoice?.invoiceDate),
    invoiceNumber:invoice?.invoiceNumber,
    tenant:invoice?.tenant?.userName,
    property:invoice?.property?.name,
    description:invoice?.description,
    amount:invoice?.amount,
    category:invoice?.invoiceCategory,
    dueDate:dateFormatter(invoice?.dueDate) ,
    status:invoice?.status
  }))

          
  const invoiceColumns:GridColDef[] =[
    {field:"date", headerName:"Date", flex:1},
    {field:"invoiceNumber", headerName:"Invoice Number", flex:1},
    {field:"tenant", headerName:"Tenant", flex:1},
    {field:"property", headerName:"Property", flex:1},
    {field:"description", headerName:"Description", flex:1},
    {field:"amount", headerName:"Amount", flex:1},
    {field:"category", headerName:"Category",flex:1},
    {field:"dueDate", headerName:"Due Date", flex:1},
    {field:"status", headerName:"Status", flex:1},
     {field:"action", headerName:"Action",flex:1, renderCell:(()=>(
      <Box sx={{ display:"flex",gap:"10px"}}>
        <IconButton> <img src={editIcon} alt="editIcon" style={{ width:"24px", height:"24px"}}/></IconButton>
        <IconButton> <img src={deleteIconSmall} alt="deleteIconSmall" style={{ width:"24px", height:"24px"}} /></IconButton>
        <IconButton> <img src={dotsVertical} alt="deleteIconSmall" style={{ width:"24px", height:"24px"}} /></IconButton>
      </Box>
    ))}
  ]


const [seletedInvoiceCategory,setSeletedInvoiceCategory] = useState("all");

const sortOptions = [
  {value:"-createdAt", label:"Newest"},
  {value:"createdAt", label:"0ldest"}
]

  const [searchQuery,setSearchQuery] = useState<string>("");
  const [paginationModel,setPaginationModel] = useState({ page:0, pageSize:10});
  const debouncedSearchQuery = useDebounce(searchQuery,500)
  const [sortOption,setSortOption] = useState("-createdAt")
  const [rowCount, setRowCount] = useState(0);


  const listAllInvoices = useCallback(async () => {
  try {
    setLoadingInvoices(true);
    const params: Record<string,string |number> = {
      page:paginationModel.page+1,
      limit: paginationModel.pageSize,
      sort:sortOption,
    };   

    if (debouncedSearchQuery){
      params.search = debouncedSearchQuery.trim();
    }

    if(seletedInvoiceCategory && seletedInvoiceCategory !== "all") {
      params.status = seletedInvoiceCategory
    }
    const response = await listInvoices(params);
    if (response.status === 200) {
      setInvoiceList(response.data.data);
      setRowCount(response.data.totalCount);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingInvoices(false);
  }
}, [debouncedSearchQuery, paginationModel,sortOption,seletedInvoiceCategory]);

useEffect(()=>{
  listAllInvoices()
},[listAllInvoices])
  const handleRefresh = ()=>{
    setSeletedInvoiceCategory("all")
    setSearchQuery("");
    setSortOption("-createdAt")
    setPaginationModel({ page:0, pageSize:10})
  }

  const handleSortChange = (e: SelectChangeEvent) => {
      setSortOption(e.target.value as string)
      setPaginationModel({ ...paginationModel, page: 0 }) 
    }

  const [anchorElPageSizeMenu,setAnchorElPageSizeMenu] = useState<null | HTMLElement>(null);
  const openPageSizeMenu = Boolean(anchorElPageSizeMenu);

    const handleOpenPageSizeMenu = ( event:React.MouseEvent<HTMLButtonElement>)=>{
    setAnchorElPageSizeMenu(event.currentTarget)
    }
  
    const handleClosePageSizeMenu = ()=>{
    setAnchorElPageSizeMenu(null);
    }

  const handlePageSizeSelection = (size:number) =>{
    setPaginationModel({ page:0, pageSize:size})
    handleClosePageSizeMenu();
  }



  return (
     <Box sx={{width:"100%",}}>
      <Paper elevation={0} sx={{ borderRadius:"4px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", width:"100#", backgroundColor:"#fff", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"}}>
        <Typography sx={{fontSize:"18px", fontWeight:"600",textAlign:"start", color:"#2C2E3E"}}>Invoice reports</Typography>

        <Divider sx={{borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1"}}/>
             <Box sx={{ marginY:"4px", width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"24%"}}>
                     <FormLabel  htmlFor="status" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='payment-status-select' value={seletedInvoiceCategory} onChange={(e)=>setSeletedInvoiceCategory(e.target.value)} sx={{height:"42px", borderRadius:"8px", width:"100%"}}>
                       {statusCategories.map((status,index)=>(<MenuItem key={index} value={status.value}>{status.label}</MenuItem>))}
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
            <img onClick={handleRefresh}  style={{ cursor:"pointer",}} src={refreshIcon} alt="refreshIcon" />
          </Box>
            <CustomExportMenu/>
        </Box>

          <Box sx={{ display:"flex", gap:"20px"}}>
            <TextField value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder='Search users by name,email,phone number....' sx={{ width:"190px"}} InputProps={{ startAdornment:(<InputAdornment position='start'><img src={searchIcon} alt="searchIcon" style={{width:"20px", height:"20px"}} /></InputAdornment>),sx:{width:"200px", height:"42px"} }}/>
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
              <img src={deleteIcon}  alt="deleteIcon" style={{ cursor:"pointer", height:"24px", width:"24px"}} />
             </Box>
             <Box sx={{ borderRadius:"8px", border:"1px solid #D1D5DB", height:"42px", width:"50px", display:"flex", alignItems:"center", justifyContent:"center"}}>
              <img src={printerIcon} alt="printerIcon" style={{ cursor:"pointer", height:"24px", width:"24px"}} />
             </Box>
          </Box>
        </Box>

        <Box sx={{width:"100%", height:"500px" }}>
        <DataGrid
          loading={loadingInvoices}
          columns={invoiceColumns}
          rows={invoiceRows}
          rowCount={rowCount}
          slots={{ noRowsOverlay: NoRowsOverlay }}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 50, 100]}
        />
        </Box>
      </Paper>
    </Box>
  )
}

export default Invoices

