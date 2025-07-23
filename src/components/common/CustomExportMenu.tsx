import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";


const CustomExportMenu = ({ }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
      <Box>
            <Button sx={{ backgroundColor:"#fff", width:"140px", height:"42px", borderRadius:"8px", border:"1px solid #D1D5DB", ":hover":{boxShadow:"none"}, boxShadow:"none", fontSize:"14px", fontWeight:"500", color:"#4B5563"}} id="basic-button"  aria-controls={open ? 'basic-menu' : undefined}  aria-haspopup="true"  aria-expanded={open ? 'true' : undefined} onClick={handleClick}>Export</Button>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} slotProps={{ list: { 'aria-labelledby': 'basic-button' }}}>
                <MenuItem onClick={handleClose}>Export to CSV</MenuItem>
                <MenuItem onClick={handleClose}>Export to Excel</MenuItem>
               <MenuItem onClick={handleClose}>Export to PDF</MenuItem>
            </Menu>
      </Box>
      
  )
}

export default CustomExportMenu
