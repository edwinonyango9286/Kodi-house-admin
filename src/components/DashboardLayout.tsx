import { useEffect, useState } from 'react';
import { Box, CssBaseline, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import AppBar from "../components/AppBar";
import Drawer from '../components/Drawer';
import { logout } from './services/authServices';
import Cookies  from 'js-cookie';
import { showErrorToast, showInfoToast } from '../utils/toast';
import type { AxiosError } from 'axios';

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [loggingOut,setLoggingOut] = useState(false)
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const drawerWidth =  232;

  useEffect(()=>{
  if(isMobile){
    setDrawerOpen(false);
  }else{
    setDrawerOpen(true)
  }
  },[isMobile])

  const handleLogout =  async ()=>{
    try {
      setLoggingOut(true)
      const response = await logout();
      if(response.status === 200){
        localStorage.clear();
      }
       const allCookies = Cookies.get();
         for( const cookieName in allCookies){
          Cookies.remove(cookieName)
        }
      showInfoToast(response.data.message);
      navigate("/")
    } catch (err) {
      const error = err as AxiosError<{ message:string}>
      showErrorToast(error.response?.data.message || error.message)
    }finally{
      setLoggingOut(false);
    }
  }


  return (
    <Box sx={{ display: 'flex', backgroundColor:"#F3F4F6" }}>
      <CssBaseline /> 
      <AppBar open={drawerOpen} handleLogout={handleLogout} loggingOut={loggingOut} toggleDrawer={toggleDrawer} />
      <Drawer open={drawerOpen} handleLogout ={handleLogout} loggingOut={loggingOut} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1,  padding: { xs: "10px", sm: "20px" },
          transition: (theme) => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
           marginLeft:{ xs:0, sm:`-${drawerWidth}px`},
          ...(drawerOpen && !isMobile && {
            transition: (theme) => theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }), marginLeft: 0,
          }),
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` }
        }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;