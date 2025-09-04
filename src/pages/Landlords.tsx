import { Box, Divider, IconButton, InputAdornment, Menu, MenuItem, Paper, Select, TextField, Typography, type SelectChangeEvent } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import dropdownGreyIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown Icon grey.svg";
import refreshIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/refresh icon.svg";
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg";
import filterIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/filter icon.svg";
import deleteIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon.svg";
import printerIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/printer icon.svg";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { listLandlords } from '../components/services/userServices';
import editIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/edit icon.svg";
import dotsVertical from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dots vertical icon.svg";
import deleteIconGrey from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon small.svg";
import type { Landlord } from '../interfaces/interfaces';
import { useReactToPrint } from "react-to-print";
import React from 'react';
import { useDebounce } from '../hooks/useDebounce';
import CustomExportMenu from '../components/common/CustomExportMenu';

// Create a new component for the printable content
const PrintableComponent = React.forwardRef<HTMLDivElement, { landlords: Landlord[] }>(({ landlords }, ref) => {
  return (
    <div ref={ref} style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Landlords List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Phone Number</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {landlords.map((landlord) => (
            <tr key={landlord._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{landlord.userName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{landlord.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{landlord.phoneNumber}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{landlord.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ textAlign: 'right', marginTop: '20px', fontSize: '12px' }}>
        Printed on: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
});


const Landlords = () => {
  const [landlords, setLandlords] = useState<Landlord[]>([]);
  const [loadingLandlords, setLoadingLandlords] = useState<boolean>(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: () => componentRef.current,
    pageStyle: `
      @page { size: auto; margin: 10mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
      }
    `,
    documentTitle: 'Landlords List',
  });

  const [paginationModel,setPaginationModel] = useState({ page:0, pageSize:10 });
  const [landlordCount,setLandlordsCount] = useState(0);
  const [searchQuery,setSearchQuery] = useState("");
  const [sortOption,setSortOption] = useState("-createdAt");
  const debouncedSearchQuery =useDebounce(searchQuery,500);

  const listAllLandlords = useCallback(async () => {
    try {
      setLoadingLandlords(true);
      const params: Record<string, string | number> = {
        page:paginationModel.page + 1,
        limit:paginationModel.pageSize,
        sort:sortOption,
        role:"Landlord"
      }
      if(debouncedSearchQuery){
        params.search = debouncedSearchQuery.trim();
      }
      const response = await listLandlords(params);
      if (response.status === 200) {
        setLandlords(response.data.data);
        setLandlordsCount(response.data.totalCount);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingLandlords(false);
    }
  },[paginationModel, debouncedSearchQuery, sortOption])

  useEffect(() => {
    listAllLandlords();
  }, [listAllLandlords]);


  const handleRefresh =()=>{
    setSearchQuery("");
    setSortOption("-createdAt");
    setPaginationModel({ page:0, pageSize:10})
  }

  const handleSortChange =(e:SelectChangeEvent) =>{
    setSortOption(e.target.value as string);
    setPaginationModel({ ...paginationModel, page:0});
  }


  const sortOptions = [
    {value:"-createdAt", label:"Newest"},
    {value:"createdAt", label:"Oldest"},
  ]



  const landlordColumns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: () => (
        <Box sx={{ display: "flex", gap: "10px" }}>
          <IconButton><img src={editIcon} alt="" style={{ width: "24px", height: "24px" }} /></IconButton>
          <IconButton><img src={deleteIconGrey} alt="" style={{ width: "24px", height: "24px" }} /></IconButton>
          <IconButton><img src={dotsVertical} alt="" style={{ width: "24px", height: "24px" }} /></IconButton>
        </Box>
      )
    }
  ];

  const landlordRows = landlords.map((landlord) => ({
    id: landlord?._id,
    name: landlord?.userName,
    email: landlord?.email,
    phoneNumber: landlord?.phoneNumber,
    status: landlord.status
  }));

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
    <Box sx={{ width: "100%" }}>
      <Paper elevation={0} sx={{ borderRadius: "4px", display: "flex", flexDirection: "column", gap: "20px", padding: "24px", width: "100%", backgroundColor: "#fff", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)" }}>
        <Typography sx={{ fontSize: "18px", fontWeight: "600", textAlign: "start", color: "#2C2E3E" }}>Landlords Overview</Typography>
        <Divider sx={{ borderWidth: "1px", width: "100%", backgroundColor: "#DDDFE1" }} />
        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display:"flex", gap:"20px"}}>
          <Box sx={{ cursor: "pointer", height: "42px", alignItems: "center", padding: "8px", width: "100px", borderRadius: "8px", border: "1px solid #D1D5DB", display: "flex", justifyContent: "space-between" }}>
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
            <Divider orientation='vertical' sx={{ height: "42px", backgroundColor: "#9CA3AF", borderWidth: "1px" }} />
            <img onClick={handleRefresh} style={{ cursor:"pointer"}} src={refreshIcon} alt="refreshIcon" />
          </Box>
          <CustomExportMenu/>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <TextField onChange={(e)=>setSearchQuery(e.target.value)} placeholder='Search by name,email, phone number....' sx={{ width: "190px" }} InputProps={{ startAdornment: (<InputAdornment position='start'><img src={searchIcon} alt="searchIcon" style={{ width: "20px", height: "20px" }} /></InputAdornment>), sx: { width: "200px", height: "42px" } }} />
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
            <Box sx={{ cursor:"pointer", borderRadius: "8px", border: "1px solid #D1D5DB", height: "42px", width: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={deleteIcon} alt="deleteIcon" style={{ height: "24px", width: "24px" }} />
            </Box>
            <Box onClick={handlePrint} sx={{ borderRadius: "8px", border: "1px solid #D1D5DB", height: "42px", width: "50px",display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", "&:hover": { backgroundColor: "#f5f5f5" }}}>
              <img src={printerIcon} alt="printerIcon" style={{ height: "24px", width: "24px" }} />
            </Box>
          </Box>
        </Box>

        <Box style={{ display: "none" }}>
          <PrintableComponent ref={componentRef} landlords={landlords} />
        </Box>
        <Box sx={{ width: "100%", height: "500px" }}>
          <DataGrid rowCount={landlordCount}  paginationMode='server' paginationModel={paginationModel} onPaginationModelChange={setPaginationModel} loading={loadingLandlords} sx={{ width: "100%" }} columns={landlordColumns} rows={landlordRows} pageSizeOptions={[10, 20, 50, 100]}/>
        </Box>
      </Paper>
    </Box>
  );
};

export default Landlords;
