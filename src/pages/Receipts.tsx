import { Box, Divider, FormControl, FormLabel, InputAdornment, Menu, MenuItem, Paper, Select, TextField, Typography, type SelectChangeEvent } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import dropdownGreyIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown Icon grey.svg"
import refreshIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/refresh icon.svg"
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import filterIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/filter icon.svg"
import deleteIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon.svg"
import printerIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/printer icon.svg"
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import type { Receipts } from '../interfaces/interfaces'
import { listReceipts } from '../components/services/receiptServices'
import { useDebounce } from '../hooks/useDebounce'
import CustomExportMenu from '../components/common/CustomExportMenu'

const Receipts = () => {
  const [seletedReceiptCategory,setSelectedReceiptCategory]  = useState("all");
  console.log(seletedReceiptCategory,"selectedreceiptcategoryhere.......")

  const receiptStatus = [
    {value:"all", label:"All" },
    {value:"Paid" , label:"Paid"},
    {value:"Overdue" , label:"Overdue"},
    {value:"Partially paid" , label:"Partially paid"}
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
  const [loadingReceipts,setLoadingReceipts] = useState<boolean>(false);
  const [receiptsCount,setReceiptsCount] = useState(0);
  const [paginationModel,setPaginationModel] = useState({ page:0, pageSize:10});


  const receiptRows = receiptList.map((receipt)=>({
    id:receipt._id
  }))

  const [sortOption,setSortOption] = useState("-createdAt");
  const sortOptions  = [
    {value:"-createdAt",label:"Newest"},
    {value:"createdAt", label:"Oldest"}
  ]

  const handleSortChange  =(e:SelectChangeEvent) =>{
    setSortOption(e.target.value as string);
    setPaginationModel({ ...paginationModel, page:0});
  }

  const [searchQuery,setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery,500);


  const listAllReceipts = useCallback(async()=>{
    try {
       setLoadingReceipts(true)
      const params:Record<string,string|number> = {
        page:paginationModel.page+1,
        limit:paginationModel.pageSize,
        sort:sortOption
      }

      if(debouncedSearchQuery){
        params.search = debouncedSearchQuery.trim();
      }

      if(seletedReceiptCategory && seletedReceiptCategory !=="all"){
        params.status = seletedReceiptCategory
      }
      const response = await listReceipts(params);
      if(response.status===200){
        setReceiptList(response.data.data);
        setReceiptsCount(response.data.totalCount);
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoadingReceipts(false)
    }
  },[paginationModel,sortOption, debouncedSearchQuery, seletedReceiptCategory]);

  useEffect(()=>{
   listAllReceipts()
  },[listAllReceipts])

  const handleRefresh =() =>{
    setSearchQuery("");
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
  
    const handlePageSizeSelection = (size:number) =>{
      setPaginationModel({ page:0, pageSize:size})
      handleClosePageSizeMenu();
    }



  return (
     <Box sx={{width:"100%",}}>
      <Paper elevation={0} sx={{ borderRadius:"4px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", width:"100#", backgroundColor:"#fff", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"}}>
        <Typography sx={{fontSize:"18px", fontWeight:"600",textAlign:"start", color:"#2C2E3E"}}>Receipts reports</Typography>

        <Divider sx={{borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1"}}/>
             <Box sx={{ marginY:"4px", width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"24%"}}>
                     <FormLabel  htmlFor="status" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='payment-status-select' value={seletedReceiptCategory} onChange={(e)=>setSelectedReceiptCategory(e.target.value)} sx={{height:"42px", borderRadius:"8px", width:"100%"}}>
                       {receiptStatus.map((status, index)=>(<MenuItem key={index} value={status.value}>{status.label}</MenuItem>))}
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
            <TextField placeholder='Search' onChange={(e)=>setSearchQuery(e.target.value)} sx={{ width:"190px"}} InputProps={{ startAdornment:(<InputAdornment position='start'><img src={searchIcon} alt="searchIcon" style={{width:"20px", height:"20px"}} /></InputAdornment>),sx:{width:"200px", height:"42px"} }}/>
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
             <Box sx={{ cursor:"pointer", borderRadius:"8px", border:"1px solid #D1D5DB", height:"42px", width:"50px", display:"flex", alignItems:"center", justifyContent:"center"}}>
              <img src={deleteIcon} alt="deleteIcon" style={{ height:"24px", width:"24px"}} />
             </Box>
             <Box  sx={{cursor:"pointer", borderRadius:"8px", border:"1px solid #D1D5DB", height:"42px", width:"50px", display:"flex", alignItems:"center", justifyContent:"center"}}>
              <img  src={printerIcon} alt="printerIcon" style={{ height:"24px", width:"24px"}} />
             </Box>
          </Box>
        </Box>

        <Box sx={{width:"100%", height:"500px", marginTop:"20px"}}>
          <DataGrid rowCount={receiptsCount} paginationModel={paginationModel}  onPaginationModelChange={setPaginationModel} loading={loadingReceipts} sx={{ width:"100%"}} columns={receiptColums} rows={receiptRows} pageSizeOptions={[10,20,50,100]}/>
        </Box>

      </Paper>

    </Box>
  )
}

export default Receipts

