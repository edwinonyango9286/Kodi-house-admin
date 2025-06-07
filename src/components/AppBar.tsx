import React from 'react';
import { AppBar as MuiAppBar, IconButton, Toolbar, Typography, TextField, Box, InputAdornment, Avatar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import mailIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/mail icon small.svg"
import bellIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/bell icon.svg"
import userImage from "../assets/Avatars square-20230907T172556Z-001/Avatars square/WebP/Adil Floyd.webp"
import dropdownIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown icon small.svg"

const drawerWidth = 232;

const AppBar = ({ open, toggleDrawer }) => {
  return (
    <MuiAppBar  position="fixed"  
      sx={{ height:"68px", boxShadow:"none", backgroundColor:"#fff", borderBottom:"1px solid #E5E7EB",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: (theme) =>
          theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: (theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }),
      }}
    >
      <Toolbar sx={{width:"100%"}}>
        <Box sx={{width:"100%",display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <Box sx={{width:"50%", display:"flex", gap:"68px"}}>
              <IconButton aria-label="open drawer" onClick={toggleDrawer}>
                <MenuIcon sx={{color:"#242E3A"}} />
              </IconButton>
           <TextField variant='outlined' placeholder='Search...' InputProps={{ startAdornment:(<InputAdornment position='start' sx={{display:"flex", alignItems:"center", justifyContent:"start"}}><img src={searchIcon} alt="searchIcon"/></InputAdornment>),sx:{ width:"400px", height:"56px"} }} sx={{ width:"168px", '& .MuiOutlinedInput-root': {height: '40px',}}}/>
        </Box>
         <Box sx={{width:"50%" , display:"flex", gap:'10px', justifyContent:"end", alignItems:"center"}}>
          <IconButton sx={{}}>
            <img src={mailIcon} alt="mailIcon" style={{ width:"24px", height:"24px", color:"#111827"}} />
          </IconButton>

           <IconButton sx={{}}>
            <img src={bellIcon} alt="mailIcon" style={{ width:"24px", height:"24px", color:"#111827"}} />
          </IconButton>

          <Box sx={{display:"flex", alignItems:"center", gap:"4px" }}>
              <Avatar src={userImage} alt='userImage' />
              <Typography sx={{fontSize:"16px", fontWeight:"400", color:"#374151" }}>James Miano</Typography>
              <img src={dropdownIcon} alt="dropdownIcon" />
          </Box>
        </Box>
      </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;