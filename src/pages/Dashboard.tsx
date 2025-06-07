import { Box, Typography, Paper ,Avatar} from '@mui/material';
import dotsVerticalIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dots vertical icon.svg"
import arrowUpIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/arrow up icon.svg"
import chatIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/chat Icon.svg"
import arrowDownRedIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/arrow down red.svg"
import chartRedIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/chat red icon.svg"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {Link } from "react-router-dom"
import userImage from "../assets/Avatars square-20230907T172556Z-001/Avatars square/WebP/Demi Wilkinson.webp"


const Dashboard = () => {

  const data:[] =[]
  return (
    <Box sx={{width:"100%",}}>
      <Box sx={{width:"100%",display:"flex",alignItems:"start",gap:"12px", flexDirection:"column"}}>
      <Box sx={{ width:"100%", display: 'flex', gap:"24px", marginBottom:"24px", }}>
        <Paper elevation={0} sx={{ display:"flex", flexDirection:"column", gap:"12px", border:"1px solid #EAECF0", borderRadius:"8px", cursor:"pointer", padding:"20px 16px", flex: 1 }}>
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
           <Typography sx={{color:"#1F2937", fontSize:"20px", fontWeight:"700"}} variant="h6">Total Landlords</Typography>
           <img src={dotsVerticalIcon} alt="dotsVerticalIcon"/>
          </Box>
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <Box sx={{display:"flex", flexDirection:"column", gap:"6px"}}>
             <Typography sx={{color:"#1F2937", fontSize:"28px", fontWeight:"600"}} variant="h4">24</Typography>
             <Box sx={{display:"flex", gap:"4px", alignItems:"center", justifyContent:"start"}}>
                <img src={arrowUpIcon} alt="arrowUpIcon"/>
                <Typography sx={{ color:"#667085", fontSize:"14px", fontWeight:"400"}}><span style={{color:"#027A48", fontSize:"14px", fontWeight:"500"}}>40%</span> vs last month </Typography>
             </Box>
          </Box>
          <img src={chatIcon} alt="chatIcon" />
          </Box>
        </Paper>


       <Paper elevation={0} sx={{ display:"flex", flexDirection:"column", gap:"12px", border:"1px solid #EAECF0", borderRadius:"8px", cursor:"pointer", padding:"20px 16px", flex: 1 }}>
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
           <Typography sx={{color:"#1F2937", fontSize:"20px", fontWeight:"700"}} variant="h6">Total Tenants</Typography>
           <img src={dotsVerticalIcon} alt="dotsVerticalIcon"/>
          </Box>
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <Box sx={{display:"flex", flexDirection:"column", gap:"6px"}}>
             <Typography sx={{color:"#1F2937", fontSize:"28px", fontWeight:"600"}} variant="h4">24</Typography>
             <Box sx={{display:"flex", gap:"4px", alignItems:"center", justifyContent:"start"}}>
                <img src={arrowDownRedIcon} alt="arrowUpIcon"/>
                <Typography sx={{ color:"#667085", fontSize:"14px", fontWeight:"400"}}><span style={{color:"#B42318", fontSize:"14px", fontWeight:"500"}}>40%</span> vs last month </Typography>
             </Box>
          </Box>
          <img src={chartRedIcon} alt="chatIcon" />
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ display:"flex", flexDirection:"column", gap:"12px", border:"1px solid #EAECF0", borderRadius:"8px", cursor:"pointer", padding:"20px 16px", flex: 1 }}>
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
           <Typography sx={{color:"#1F2937", fontSize:"20px", fontWeight:"700"}} variant="h6">Total Properties</Typography>
           <img src={dotsVerticalIcon} alt="dotsVerticalIcon"/>
          </Box>
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <Box sx={{display:"flex", flexDirection:"column", gap:"6px"}}>
             <Typography sx={{color:"#1F2937", fontSize:"28px", fontWeight:"600"}} variant="h4">24</Typography>
             <Box sx={{display:"flex", gap:"4px", alignItems:"center", justifyContent:"start"}}>
                <img src={arrowUpIcon} alt="arrowUpIcon"/>
                <Typography sx={{ color:"#667085", fontSize:"14px", fontWeight:"400"}}><span style={{color:"#027A48", fontSize:"14px", fontWeight:"500"}}>40%</span> vs last month </Typography>
             </Box>
          </Box>
          <img src={chatIcon} alt="chatIcon" />
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ display:"flex", flexDirection:"column", gap:"12px", border:"1px solid #EAECF0", borderRadius:"8px", cursor:"pointer", padding:"20px 16px", flex: 1 }}>
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
           <Typography sx={{color:"#1F2937", fontSize:"20px", fontWeight:"700"}} variant="h6">Total Units</Typography>
           <img src={dotsVerticalIcon} alt="dotsVerticalIcon"/>
          </Box>
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <Box sx={{display:"flex", flexDirection:"column", gap:"6px"}}>
             <Typography sx={{color:"#1F2937", fontSize:"28px", fontWeight:"600"}} variant="h4">24</Typography>
             <Box sx={{display:"flex", gap:"4px", alignItems:"center", justifyContent:"start"}}>
                <img src={arrowUpIcon} alt="arrowUpIcon"/>
                <Typography sx={{ color:"#667085", fontSize:"14px", fontWeight:"400"}}><span style={{color:"#027A48", fontSize:"14px", fontWeight:"500"}}>40%</span> vs last month </Typography>
             </Box>
          </Box>
          <img src={chatIcon} alt="chatIcon" />
          </Box>
        </Paper>

      </Box>

      <Box sx={{ width:"100%", display:"flex",gap:"20px"}}> 
        <Paper elevation={0} sx={{ width:"76%", height:"400px", backgroundColor:"#fff"}}>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#1976d2" />
          </BarChart>
        </Paper>

        <Paper elevation={0} sx={{ padding:"20px 16px", width:"24%", height:"400px", backgroundColor:"#fff"}}>
          <Box sx={{display:"flex", flexDirection:"column", gap:"10px"}}>
           <Box sx={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
              <Typography sx={{ fontSize:"20px", fontWeight:"700", color:"#101828"}}>Activity</Typography>
              <Link to={"/"} style={{ color:"#3B82F6", fontSize:"14px", fontWeight:"500", textDecoration:"none"}} >View all</Link>
           </Box>
           <Box sx={{ display:"flex", gap:"12px"}}>
              <Avatar src={userImage} alt='userImage' />
            <Box sx={{ display:"flex", flexDirection:"column",}}>
                 <Typography variant='body2' sx={{fontSize:"16px", fontWeight:"600", color:"#344054"}}>Demi Wikinson<span style={{ marginLeft:"40px", color:"#344054", fontWeight:"400", fontSize:"12px" }}>2 Hours ago</span></Typography>
                 <Typography variant='body2' sx={{fontSize:"14px", fontWeight:"500", color:"#4B5563"}}>Added Property<span style={{ marginLeft:"4px", color:"#3B82F6", fontWeight:"400", fontSize:"14px" }}>:Garden City Estates</span> </Typography>
            </Box>
           </Box>
          </Box>
        </Paper> 

      </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;