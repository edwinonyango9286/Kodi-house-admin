import { useEffect, useState, type MouseEvent } from 'react';
import { AppBar as MuiAppBar, IconButton, Toolbar, Typography, TextField, Box, InputAdornment, Avatar, Menu, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import mailIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/mail icon small.svg"
import bellIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/bell icon.svg"
import userImage from "../assets/Avatars square-20230907T172556Z-001/Avatars square/WebP/Adil Floyd.webp"
import dropdownIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown icon small.svg"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { showErrorToast, showInfoToast } from '../utils/toast';
import { logout } from './services/authServices';

const drawerWidth = 232;

const AppBar = ({ open, toggleDrawer }) => {
  const navigate = useNavigate()
  const [anchorElement,setAnchorElement] = useState<null| HTMLElement>(null);
  const openUserProfile = Boolean(anchorElement)
  const [userData,setUserData] = useState()

  const handleOpenUserProfile = (e: MouseEvent<HTMLDivElement>) => {
      setAnchorElement(e.currentTarget);
     };

  const handleCloseUserProfile = ()=>{ 
    setAnchorElement(null);
    }

    const handleLogout = async () => {
      try {
        const response = await logout();
        if(response.status === 200){
         localStorage.clear();
         const allCookies = Cookies.get();
         for( const cookieName in allCookies){
            Cookies.remove(cookieName)
          }
        showInfoToast(response.data.message)
        navigate("/")
        }
      } catch (err) {
        const error = err as AxiosError<{ message:string}>
        showErrorToast(error.response?.data.message || error.message)
      }
    }

    useEffect(()=>{
      const localStorageUserData = localStorage.getItem("userData");
      const userData =  JSON.parse(localStorageUserData)
      setUserData(userData)
    },[])


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
           <TextField variant='outlined' placeholder='Search' InputProps={{ startAdornment:(<InputAdornment position='start' sx={{display:"flex", alignItems:"center", justifyContent:"start"}}><img src={searchIcon} alt="searchIcon"/></InputAdornment>),sx:{ width:"400px", height:"56px"} }} sx={{ width:"168px", '& .MuiOutlinedInput-root': {height: '40px',}}}/>
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
              <Typography sx={{fontSize:"16px", fontWeight:"400", color:"#374151" }}>{userData?.userName}</Typography>
              <img src={dropdownIcon} alt="dropdownIcon" />
          </Box>

          <Menu id="basic-menu" sx={{ '& .MuiPaper-root': { width: '168px', maxWidth: 'none'}}} anchorEl={anchorElement} open={openUserProfile} onClose={handleCloseUserProfile} MenuListProps={{'aria-labelledby': 'basic-button',}}>
            <MenuItem onClick={()=>{navigate("user-profile"); handleCloseUserProfile()}}>Profile</MenuItem>
            <MenuItem onClick={()=>{navigate("user-profile"); handleCloseUserProfile()}}>My account</MenuItem>
            <MenuItem onClick={ ()=>{ handleLogout(); handleCloseUserProfile();} }>Logout</MenuItem>
          </Menu>

        </Box>
      </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;