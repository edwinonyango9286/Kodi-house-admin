import { Box, Typography, Paper ,Avatar, Divider, IconButton} from '@mui/material';
import dotsVerticalIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dots vertical icon.svg"
import arrowUpIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/arrow up icon.svg"
import chatIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/chat Icon.svg"
import arrowDownRedIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/arrow down red.svg"
import chartRedIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/chat red icon.svg"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {Link } from "react-router-dom"
import userImage from "../assets/Avatars square-20230907T172556Z-001/Avatars square/WebP/Demi Wilkinson.webp"
import adilFloyd from "../assets/Avatars square-20230907T172556Z-001/Avatars square/WebP/Adil Floyd.webp"
import { useState } from 'react';
import dotVerticalIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dots vertical icon.svg"
import {DataGrid} from "@mui/x-data-grid"
import type {GridColDef,GridRowsProp } from "@mui/x-data-grid"


const Dashboard = () => {
  const data:[] =[]
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("Weekly")

interface Transaction {
  id:number;
  date: Date;
  transaction:string;
  amount: string; 
  status: 'pending' | 'completed' | 'failed' | 'refunded'; 
  transactionId: string; 
  currency?: string; 
  description?: string;
}

const transactionsRows:GridRowsProp<Transaction>[] = [
  { id: 1, transaction: 'Payment from Bonnie Green', transactionId: '70AB09NS4QUP', date: new Date('2020-01-15'), amount:"Ksh 75,736", status:"Completed"},
  { id: 2, transaction: 'Payment from Bonnie Green', transactionId: '70AB09NS4QUP', date: new Date('2020-01-15'), amount:"Ksh 75,736", status:"Completed"},
  { id: 3, transaction: 'Payment from Bonnie Green', transactionId: '70AB09NS4QUP', date: new Date('2020-01-15'), amount:"Ksh 75,736", status:"Completed"},
  { id: 4, transaction: 'Payment from Bonnie Green', transactionId: '70AB09NS4QUP', date: new Date('2020-01-15'), amount:"Ksh 75,736", status:"Completed"},
  { id: 5, transaction: 'Payment from Bonnie Green', transactionId: '70AB09NS4QUP', date: new Date('2020-01-15'), amount:"Ksh 75,736", status:"Completed"},
  { id: 6, transaction: 'Payment from Bonnie Green', transactionId: '70AB09NS4QUP', date: new Date('2020-01-15'), amount:"Ksh 75,736", status:"Completed"},
  { id: 7, transaction: 'Payment from Bonnie Green', transactionId: '70AB09NS4QUP', date: new Date('2020-01-15'), amount:"Ksh 75,736", status:"Completed"},
  { id: 8, transaction: 'Payment from Bonnie Green', transactionId: '70AB09NS4QUP', date: new Date('2020-01-15'), amount:"Ksh 75,736", status:"Completed"},
  { id: 9, transaction: 'Payment from Bonnie Green', transactionId: '70AB09NS4QUP', date: new Date('2020-01-15'), amount:"Ksh 75,736", status:"Completed"},
  { id: 10, transaction: 'Payment from Bonnie Green', transactionId: '70AB09NS4QUP', date: new Date('2020-01-15'), amount:"Ksh 75,736", status:"Completed"},
  { id: 11, transaction: 'Payment from Bonnie Green', transactionId: '70AB09NS4QUP', date: new Date('2020-01-15'), amount:"Ksh 75,736", status:"Completed"},
  { id: 12, transaction: 'Payment from Bonnie Green', transactionId: '70AB09NS4QUP', date: new Date('2020-01-15'), amount:"Ksh 75,736", status:"Completed"},
]

  const transactionsColumns: GridColDef<Transaction>[] =[
    { field: 'transaction', headerName: 'Transaction', flex:1 },
    { field: 'transactionId', headerName: 'Transaction Id', flex:1 },
    { field: 'date',headerName: 'Date',type: 'date', flex:1,},
    { field: 'amount', headerName: 'Amount', flex:1 },
    { field: 'status', headerName: 'Status', flex:1 },
  ]  
  
  return (
    <Box sx={{width:"100%",}}>
      <Box sx={{width:"100%",display:"flex",alignItems:"start",gap:"12px", flexDirection:"column"}}>
      <Box sx={{ width:"100%", display: 'flex', gap:"24px", marginBottom:"24px", }}>
        <Paper elevation={0} sx={{ display:"flex", flexDirection:"column", gap:"12px", border:"1px solid #EAECF0", borderRadius:"8px", cursor:"pointer", padding:"20px 16px", flex: 1,boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)" }}>
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
           <Typography sx={{color:"#1F2937", fontSize:"20px", fontWeight:"700"}} variant="h6">Total Landlords</Typography>
           <IconButton>
            <img style={{width:"24px", height:'24px'}} src={dotsVerticalIcon} alt="dotsVerticalIcon"/>
           </IconButton>
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


       <Paper elevation={0} sx={{ display:"flex", flexDirection:"column", gap:"12px", border:"1px solid #EAECF0", borderRadius:"8px", cursor:"pointer", padding:"20px 16px", flex: 1,boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)" }}>
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
           <Typography sx={{color:"#1F2937", fontSize:"20px", fontWeight:"700"}} variant="h6">Total Tenants</Typography>
            <IconButton>
             <img style={{height:"24px", width:"24px" }} src={dotsVerticalIcon} alt="dotsVerticalIcon"/>
           </IconButton>
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

        <Paper elevation={0} sx={{ display:"flex", flexDirection:"column", gap:"12px", border:"1px solid #EAECF0", borderRadius:"8px", cursor:"pointer", padding:"20px 16px", flex: 1,boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)" }}>
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
           <Typography sx={{color:"#1F2937", fontSize:"20px", fontWeight:"700"}} variant="h6">Total Properties</Typography>
           <IconButton>
             <img style={{width:"24px", height:"24px"}} src={dotsVerticalIcon} alt="dotsVerticalIcon"/>
           </IconButton>
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

        <Paper elevation={0} sx={{ display:"flex", flexDirection:"column", gap:"12px", border:"1px solid #EAECF0", borderRadius:"8px", cursor:"pointer", padding:"20px 16px", flex: 1, boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)" }}>
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
           <Typography sx={{color:"#1F2937", fontSize:"20px", fontWeight:"700"}} variant="h6">Total Units</Typography>
           <IconButton>
             <img style={{width:"24px", height:"24px"}} src={dotsVerticalIcon} alt="dotsVerticalIcon"/>
           </IconButton>
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
        <Box sx={{ width:"76%", display:"flex", gap:"20px", flexDirection:"column"}}>

         <Paper elevation={0} sx={{padding:"24px",width:"100%", height:"400px", backgroundColor:"#fff",boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)"}}>
          <Box sx={{ width:"100%",display:"flex",flexDirection:"column", gap:"10px"}}> 
            <Box sx={{width:"100%", display:"flex", justifyContent:"space-between"}}>
              <Typography variant='body2'  sx={{width:"50%",color:"#1F2937", fontWeight:"700", fontSize:"20px", textAlign:"start", }}>Total payment (Ksh 11,353,373.67)</Typography>
              <Box sx={{display:"flex", justifyContent:"end", gap:"8px", width:"50%"}}>
                <Box  onClick={()=>setSelectedTimePeriod("Weekly")} sx={{ cursor:"pointer", width:"72px", justifyContent:"center", display:"flex", flexDirection:"column", gap:"2px"}}>
                  <Typography sx={{ alignSelf:"center", color: selectedTimePeriod === "Weekly" ? "#2563EB" :"#4B5563",  fontSize:"14px", fontWeight:"600"}}>Weekly</Typography>
                 { selectedTimePeriod === "Weekly" && <Divider sx={{borderWidth:"2px", borderRadius:"4px", width:"px", backgroundColor:"#2563EB" }}/>}
                </Box>
                <Box onClick={()=>setSelectedTimePeriod("Monthly")} sx={{ cursor:"pointer", width:"72px", justifyContent:"center", display:"flex", flexDirection:"column", gap:"2px"}}>
                  <Typography sx={{ alignSelf:"center", color: selectedTimePeriod === "Monthly" ? "#2563EB" :"#4B5563",  fontSize:"14px", fontWeight:"600"}}>Monthly</Typography>
                  { selectedTimePeriod === "Monthly" && <Divider sx={{borderWidth:"2px", borderRadius:"4px", width:"px", backgroundColor:"#2563EB" }}/>}
                </Box>
                <IconButton sx={{ }}>
                  <img src={dotVerticalIcon} alt="dotVerticalIcon" style={{ width:"25px", height:"25px"}} />
                </IconButton>

              </Box>

            </Box>
           <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#1976d2" />
          </BarChart>
          </Box>
         </Paper>

         <Box sx={{ display:"flex", gap:"20px", width:"100%",  }}>
          <Paper elevation={0} sx={{ display:"flex" , flexDirection:"column", gap:"16px", padding:"24px", width:"50%",height:"400px", backgroundColor:"#fff", boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)" }}>
            <Typography sx={{ textAlign:"start", fontSize:"20px", fontWeight:"600", color:"#111827"}}>Latest Landlords</Typography>
            <Box sx={{ width:"100%", display:"flex", justifyContent:"space-between"}}>
              <Box sx={{ display:"flex", gap:"10px", width:"50%"}}>
                <Avatar src={adilFloyd} alt=''  sx={{ }}/>
                <Box sx={{ display:"flex", flexDirection:"column"}}>
                  <Typography variant='body2' sx={{fontSize:"16px", fontWeight:"600", color:"#374151"}}>Neil Sims</Typography>
                  <Typography sx={{ fontSize:"12px", fontWeight:"400", color:"#374151"}}>email@example.com</Typography>
                </Box>
              </Box>
              <Box sx={{ width:"50%" }}>
                <Typography variant='body2' sx={{ textAlign:"end", fontSize:"16px", fontWeight:"600"}}>Found Property Group</Typography>
              </Box>
            </Box>
          </Paper> 
           <Paper elevation={0} sx={{ display:"flex" , gap:"16px", flexDirection:"column", padding:"24px", width:"50%",height:"400px", backgroundColor:"#fff", boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)" }}>
            <Typography sx={{ textAlign:"start", fontSize:"20px", fontWeight:"600", color:"#111827"}}>Top properties</Typography>
            <Box sx={{ width:"100%", display:"flex", justifyContent:"space-between"}}>
              <Box sx={{ width:"50%" , display:"flex" , flexDirection:"column"}}>
                <Typography sx={{fontSize:"16px", fontWeight:"600", color:"#111827"}}>Elgin St. Celina Places</Typography>
                <Typography sx={{ fontWeight:"400", fontSize:"12px", color:"#3B82F6" }}>Michael Onkwani</Typography>
              </Box>
              <Box sx={{ width:"50%"}}>
                <Typography sx={{ textAlign:"end",fontSize:"16px", fontWeight:"600",color:"#111827"}}>710 <span style={{fontSize:"16px", fontWeight:"400", color:"#4B5563"}}>Rents</span></Typography>
              </Box>
            </Box>
          </Paper>
         </Box>
        </Box>

        <Paper elevation={0} sx={{ padding:"20px 16px", width:"24%", height:"820px", backgroundColor:"#fff" , boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)"}}>
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

      <Paper elevation={0} sx={{padding:"20px", width:"100%",height:"600px",backgroundColor:"#fff",marginTop:"10px", boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)"}}>
        <Box sx={{ height:"100%", display:"flex", flexDirection:"column",gap:"4px"}}>
          <Typography sx={{fontWeight:"600", fontSize:"20px", color:"#111827", textAlign:"start"}}>Transactions</Typography>
          <Typography sx={{fontWeight:"400", fontSize:"14px", color:"##6B7280", textAlign:"start"}}>This is a list of latest transactions.</Typography>
          <Box sx={{ width:"100%", marginTop:"20px"}}>
             <DataGrid sx={{ width:"100%", height:"476px"}} rows={transactionsRows} columns={transactionsColumns} pageSize={5} pageSizeOptions={[10,20,50,100]} />
          </Box>
        </Box>
      </Paper>
      

      </Box>
    </Box>
  );
};

export default Dashboard;