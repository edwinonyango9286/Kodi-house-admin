import { useEffect, useState, type MouseEvent } from 'react';
import { AppBar as MuiAppBar, IconButton, Toolbar, Typography, TextField, Box, InputAdornment, Avatar, Menu, MenuItem, useTheme, useMediaQuery} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import mailIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/mail icon small.svg"
import bellIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/bell icon.svg"
import dropdownIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown icon small.svg"
import { useNavigate } from 'react-router-dom';
import type { User } from '../interfaces/interfaces';
import LogoutDialog from './LogoutDialog';
import  type { AppBarProps } from "../interfaces/interfaces"

const drawerWidth = 232;
const AppBar = ({ open, toggleDrawer, handleLogout , loggingOut} : AppBarProps) => {
  const navigate = useNavigate()
  const [anchorElement,setAnchorElement] = useState<null| HTMLElement>(null);
  const openUserProfile = Boolean(anchorElement)
  const [userData,setUserData] = useState<User | null>(null)

  const handleOpenUserProfile = (e: MouseEvent<HTMLDivElement>) => {
      setAnchorElement(e.currentTarget);
     };

  const handleCloseUserProfile = ()=>{ 
    setAnchorElement(null);
    }

    useEffect(()=>{
      const localStorageUserData = localStorage.getItem("userData");
      if(localStorageUserData){ 
        const userData =  JSON.parse(localStorageUserData)
        setUserData(userData)
      }
    },[])
      const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
      const handleOpenLogoutDialog = () => {
        setOpenLogoutDialog(true);
      };
      const handleCloseDialog = () => {
        setOpenLogoutDialog(false);
      };

      const theme = useTheme();
      const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
      const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <MuiAppBar  position="fixed"  
      sx={{ height:"68px", boxShadow:"none", backgroundColor:"#fff", borderBottom:"1px solid #E5E7EB",
         zIndex: (theme) => isMobile ? theme.zIndex.drawer - 1 : theme.zIndex.drawer + 1,
        transition: (theme) =>
          theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        ...(open && !isMobile && {
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
          <Box sx={{width:"50%", display:"flex", gap:{ xs:"20px", lg:"68px"}}}>
              <IconButton aria-label="open drawer" onClick={toggleDrawer}>
                <MenuIcon sx={{color:"#242E3A"}} />
              </IconButton>
            { !isMobile && <TextField variant='outlined' placeholder='Search' InputProps={{ startAdornment:(<InputAdornment position='start' sx={{display:"flex", alignItems:"center", justifyContent:"start"}}><img src={searchIcon} alt="searchIcon"/></InputAdornment>),sx:{ minWidth:"300px", width:"auto", height:"56px"} }} sx={{ width:"168px", '& .MuiOutlinedInput-root': {height: '40px',}}}/> } 
        </Box>
         <Box sx={{width:"50%" , display:"flex", gap:'10px', justifyContent:"end", alignItems:"center"}}>
          <IconButton sx={{}}>
            <img src={mailIcon} alt="mailIcon" style={{ width:"24px", height:"24px", color:"#111827"}} />
          </IconButton>

           <IconButton sx={{}}>
            <img src={bellIcon} alt="mailIcon" style={{ width:"24px", height:"24px", color:"#111827"}} />
          </IconButton>

          <Box onClick={handleOpenUserProfile} sx={{ cursor:"pointer", display:"flex", alignItems:"center", gap:"4px" }}>
              <Avatar src={userData?.avatar?.secure_url} alt='userImage' sx={{ width:"34px", height:"34px"}} />
              {!isMobile && !isTablet && <Typography sx={{fontSize:"16px", fontWeight:"400", color:"#374151" }}>{userData?.userName}</Typography> } 
              <img src={dropdownIcon} alt="dropdownIcon" />
          </Box>

          <Menu id="basic-menu" sx={{ '& .MuiPaper-root': { width: '120px', maxWidth: 'none'}}} anchorEl={anchorElement} open={openUserProfile} onClose={handleCloseUserProfile} MenuListProps={{'aria-labelledby': 'basic-button',}}>
            <MenuItem onClick={()=>{navigate("user-profile"); handleCloseUserProfile()}}>My Profile</MenuItem>
            <MenuItem onClick={ ()=>{handleOpenLogoutDialog(); handleCloseUserProfile();} }>Logout</MenuItem>
          </Menu>
          <LogoutDialog loggingOut={loggingOut} openLogoutDialog={openLogoutDialog} handleCloseDialog={handleCloseDialog} handleLogout={handleLogout} />
        </Box>
      </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;