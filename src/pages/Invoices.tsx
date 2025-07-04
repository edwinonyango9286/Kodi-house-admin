import { Box, Divider, FormControl, FormLabel, InputAdornment, MenuItem, Paper, Select, TextField, Typography, type SelectChangeEvent } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import { debounce } from 'lodash'

const Invoices = () => {
const [page, setPage] = useState(0); 
const [pageSize, setPageSize] = useState(10);
const [rowCount, setRowCount] = useState(0);

  const statusCategories = [
    {id:1, name: "All"},
    {id:2, name: "Paid"},
    {id:3, name: "Overdue"},
    {id:4, name: "Partially paid"},
  ]

  interface IInvoice {
    _id:string;
     createdBy:{
      userName:string;
    }
    invoiceNumber:string;
    description:string;
    allowedMethodOfPayment:string;
    recurringStatus:string;
    invoiceCategory:string;
    amount:number;
    tenant:{
      userName:string;
    };
    property:{
      name:string;
    }
    unit:{
      unitNumber?:string
    }
    invoiceDate:Date,
    dueDate:Date,
    status:string
  }

  const [invoiceList,setInvoiceList] = useState<IInvoice[]>([])
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
    {field:"action",headerName:"Action", flex:1}
  ]


  const [seletedInvoiceCategory,setSeletedInvoiceCategory] = useState("All");

const handleSelectStatusCategory = async (e:SelectChangeEvent) => {
  const status = e.target.value as string;
  setSeletedInvoiceCategory(status);
  setPage(0); 
  setLoadingInvoices(true);
  try {
    await listAllInvoices(searchQuery, status, 0, pageSize);
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingInvoices(false);
  }
};

  const [searchQuery,setSearchQuery] = useState<string>("");

  const listAllInvoices = useCallback(async (search = "", status = "", page = 0, pageSize = 10) => {
  try {
    setLoadingInvoices(true);
    const params: { search?: string; status?: string; limit: number; offset: number } = {
      limit: pageSize,
      offset: page * pageSize,
    };   
    if (search) params.search = search;
    if (status && status !== "All") params.status = status;

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
}, []);


  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        listAllInvoices(value, seletedInvoiceCategory);
      },500),
      [listAllInvoices,seletedInvoiceCategory]);

 const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSearchQuery(value);
  setPage(0); 
  debouncedSearch(value);
 };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);


   useEffect(() => {
   listAllInvoices(searchQuery, seletedInvoiceCategory, page, pageSize);
   }, [listAllInvoices, searchQuery, seletedInvoiceCategory, page, pageSize]);



  return (
     <Box sx={{width:"100%",}}>
      <Paper elevation={0} sx={{ borderRadius:"4px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", width:"100#", backgroundColor:"#fff", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"}}>
        <Typography sx={{fontSize:"18px", fontWeight:"600",textAlign:"start", color:"#2C2E3E"}}>Invoice reports</Typography>

        <Divider sx={{borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1"}}/>
             <Box sx={{ marginY:"4px", width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"24%"}}>
                     <FormLabel  htmlFor="status" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='payment-status-select' value={seletedInvoiceCategory} onChange={handleSelectStatusCategory} sx={{height:"42px", borderRadius:"8px", width:"100%"}}>
                       {statusCategories.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
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
            <img onClick={()=>{ listAllInvoices(searchQuery, seletedInvoiceCategory, page, pageSize)}}  style={{ cursor:"pointer",}} src={refreshIcon} alt="refreshIcon" />
          </Box>
          <Box sx={{cursor:"pointer", padding:"10px" ,border:"1px solid #D1D5DB", width:"100px", height:"42px", borderRadius:"8px"}}>
            <Typography variant='body2' sx={{fontSize:"14px",fontWeight:"500",textAlign:"center",color:"#4B5563"}}>Export</Typography>
          </Box>
          </Box>

          <Box sx={{ display:"flex", gap:"20px"}}>
            <TextField placeholder='Search by invoice number, category or status' value={searchQuery} onChange={handleSearch} sx={{ width:"190px"}} InputProps={{ startAdornment:(<InputAdornment position='start'><img src={searchIcon} alt="searchIcon" style={{width:"20px", height:"20px"}} /></InputAdornment>),sx:{width:"200px", height:"42px"} }}/>
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
        <DataGrid
          loading={loadingInvoices}
          columns={invoiceColumns}
          rows={invoiceRows}
          rowCount={rowCount}
          slots={{ noRowsOverlay: NoRowsOverlay }}
          paginationMode="server"
          paginationModel={{
            page: page,
            pageSize: pageSize,
          }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          pageSizeOptions={[10, 20, 50, 100]}
        />
      
        </Box>

      </Paper>

    </Box>
  )
}

export default Invoices

