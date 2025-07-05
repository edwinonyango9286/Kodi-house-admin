import React, { useEffect, useState } from 'react';
import {Drawer as MuiDrawer, List,ListItem,ListItemIcon, ListItemText,Box,Typography,Collapse } from '@mui/material';
import {useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineLightningBolt } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5";
import { PiBuildingOffice } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { SlBriefcase } from "react-icons/sl";
import { HiAdjustments } from "react-icons/hi";
import  logoWhite from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg";
import { ExpandLess,  ExpandMore,} from '@mui/icons-material';
import type { User } from '../interfaces/interfaces';


type DrawerItem = {
  text: React.ReactElement;
  icon?: React.ReactNode;
  path?: string;
  children?: DrawerItem[];
  divider?: boolean;
};

type DrawerProps = {
  open: boolean;
  toggleDrawer?: () => void;
  children?: React.ReactNode;
  navItems?: DrawerItem[];
};

const drawerWidth = 232;

const Drawer = ({open,children}: DrawerProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [userData,setUserData] = useState<User | null>(null)

  const navItems: DrawerItem[] = [
    { text: <Typography sx={{ fontSize:"16px", fontWeight:"700", textAlign:"start"}}>Welcome {userData?.userName.split(" ")[0]}</Typography>, icon:<HiOutlineLightningBolt fontSize={20}/>},
    { text: <Typography sx={{ fontSize:"16px", fontWeight:"700", textAlign:"start"}}>Dashboard</Typography>, icon: <IoHomeOutline fontSize={20} />, path: 'dashboard' },
    { text: <Typography sx={{ fontSize:"16px", fontWeight:"700" ,textAlign:"start"}}>Properties</Typography>, icon: <PiBuildingOffice  fontSize={20} />, path:"properties"},
    { text: <Typography sx={{ fontSize:"16px", fontWeight:"700", textAlign:"start"}}>Landlords</Typography>, icon: <FiUsers fontSize={20} />, path:"landlords",},
    { text: <Typography sx={{ fontSize:"16px", fontWeight:"700", textAlign:"start"}}>Users</Typography>, icon: <FiUsers fontSize={20 } />, path: 'users'},
    { text: <Typography sx={{ fontSize:"16px", fontWeight:"700", textAlign:"start"}}>Reports</Typography>, icon: <SlBriefcase fontSize={20} />, path:"reports",
      children: [
        { text: <Typography sx={{ fontSize:"16px", fontWeight:"500", textAlign:"start"}}>Invoices</Typography>,path: 'invoices' },
        { text: <Typography sx={{ fontSize:"16px", fontWeight:"500", textAlign:"start"}}>Payments</Typography>,path: 'payments' },
        { text: <Typography sx={{ fontSize:"16px", fontWeight:"500", textAlign:"start"}}>Receipts</Typography>,path: 'receipts' },
      ]
    },
    { text: <Typography sx={{ cursor:"pointer", fontSize:"16px", fontWeight:"700", textAlign:"start"}}>Setups</Typography>,icon: <HiAdjustments fontSize={20} />, path: 'setups' },
  ]


const handleNavigation = (path?: string) => {
  if (!path) return;
  if (path === 'dashboard') {
    navigate('/dashboard'); 
  } else {
    navigate(`/dashboard/${path}`);
  }
};

const isActive = (path?: string) => {
  if (!path) return false;
  
  const currentPath = location.pathname.replace(/\/+$/, '');
  
  // Special case for dashboard
  if (path === 'dashboard') {
    return currentPath === '/dashboard';
  }
  
  return currentPath === `/dashboard/${path}` || 
         (path !== '' && currentPath.startsWith(`/dashboard/${path}/`));
};

  const toggleExpand = (text: string) => {
    setExpandedItems(prev => ({...prev,[text]: !prev[text]}));
  };

  const renderItem = (item: DrawerItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemExpanded = expandedItems[item.text] ?? false;
    const itemIsActive = isActive(item.path) || (hasChildren && item.children?.some(child => isActive(child.path)));

    return (
      <React.Fragment key={`${item.text}-${depth}`}>
        <ListItem component={"div"}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.text);
            } else {
              handleNavigation(item.path);
            }
          }}
          sx={{ width:"208px", my:"4px", height:"40px", borderRadius:"8px",cursor:"pointer", pl: depth === 0 ? 2 : depth * 3, marginLeft:"10px", backgroundColor: itemIsActive ? 'rgba(37, 99, 235, 0.12)' : 'inherit', '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.08)'}
          }}
        >
          <ListItemIcon sx={{color:"#333", minWidth: depth > 0 ? '24px' : '36px'}}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
          {hasChildren && (isItemExpanded ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        
        {hasChildren && (
          <Collapse in={isItemExpanded} timeout="auto" unmountOnExit>
            <List disablePadding>
              {item.children?.map(child => renderItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
       </React.Fragment>
    );
  };

  useEffect(()=>{
    const localStorageUserData  = localStorage.getItem("userData");
    if(localStorageUserData){
      const userData  = JSON.parse(localStorageUserData)
      setUserData(userData)
    }
  },[])

  return (
    <MuiDrawer  variant="persistent" open={open} sx={{width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', overflowX: 'hidden', display: 'flex', flexDirection: 'column',borderRight:"1px solid #E5E7EB"}}}>

      <Box onClick={()=>navigate("")} sx={{ cursor:"pointer", position: "relative",  padding: "20px",  display: "flex",alignItems: "center",justifyContent: "center", width: "100%", backgroundColor: "#2563EB", height: "68px",flexShrink: 0}}>
        <img src={logoWhite} alt="logoWhite" style={{ maxWidth: '80%' }} />
        <Box sx={{top: "44px",left: "78px",borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", position: "absolute", width: "60px", height: "20px",}}>
          <Typography sx={{fontSize: "12px", fontWeight: "600", textAlign: "center", color: "#fff"}}>{userData?.role?.name}</Typography>
        </Box>
      </Box>

      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        <List>
          {navItems.map((item) => renderItem(item))}
        </List>
      </Box>

      {children && (
        <Box sx={{padding:"16px", borderTop: '1px solid rgba(0, 0, 0, 0.12)',flexShrink: 0 }}>{children}</Box>
      )}

    </MuiDrawer>
  );
};

export default Drawer;