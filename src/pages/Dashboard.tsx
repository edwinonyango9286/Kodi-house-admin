import { Box, Typography, Paper ,Avatar, Divider, IconButton} from '@mui/material';
import dotsVerticalIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dots vertical icon.svg"
import arrowUpIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/arrow up icon.svg"
import chatIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/chat Icon.svg"
import arrowDownRedIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/arrow down red.svg"
import chartRedIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/chat red icon.svg"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Link } from "react-router-dom"
import userImage from "../assets/Avatars square-20230907T172556Z-001/Avatars square/WebP/Demi Wilkinson.webp"
import { useCallback, useEffect, useState } from 'react';
import dotVerticalIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dots vertical icon.svg"
import {DataGrid} from "@mui/x-data-grid"
import type {GridColDef,} from "@mui/x-data-grid"
import { listLandlords, listTenants } from '../components/services/userServices';
import { listProperties } from '../components/services/propertyService';
import  { listUnits } from '../components/services/unitsService';
import { dateFormatter } from '../utils/dateFormatter';
import { listTransactions } from '../components/services/transactionServices';
import  CircularProgress from "@mui/material/CircularProgress";
import type { User } from '../interfaces/users';


const Dashboard = () => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Weekly")
  const [latestlandlordList,setLatestLandlordList] = useState<User[]>([])
  const [landlordsCount,setLandlordsCount] = useState(0)
  const [tenantsCount,setTenantsCount] = useState(0);
  const [propertiesCount,setPropertiesCount] = useState(0)
  const [unitsCount,setUnitsCount] = useState(0)

  // transactions
interface Transaction {
  _id:string;
  transactionDate: Date;
  transactionName:string;
  amount: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded'; 
  transactionId: string;
  currency?: string;
  description?: string;
  transactionBy:{
    userName:string;
  }
}

const [transactionsList,setTransactionsList] = useState<Transaction[]>([]);
const [loadingTransactions,setLoadingTransactions] = useState<boolean>(false)

const listAllTransactions = async ()=>{
  setLoadingTransactions(true);
  try {
    const response = await listTransactions()
    if(response.status === 200){
      setTransactionsList(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }finally{
    setLoadingTransactions(false)
  }
}

useEffect(()=>{
  listAllTransactions();
},[])


const transactionsRows = transactionsList.map((transaction)=>({
  id:transaction?._id,
  transactionName: transaction?.transactionName,
  transactionId:transaction?.transactionId,
  transactionDate:dateFormatter(transaction?.transactionDate),
  amount:transaction?.amount,
  status:transaction?.status,
  transactionBy:transaction?.transactionBy?.userName
}))

  const transactionsColumns: GridColDef<Transaction>[] =[
    { field: 'transactionName', headerName: 'Transaction Name', flex:1 },
    { field: 'transactionId', headerName: 'Transaction Id', flex:1 },
    { field: 'transactionDate',headerName: 'Date', flex:1,},
    { field: 'amount', headerName: 'Amount', flex:1 },
    { field: 'transactionBy', headerName: 'Transaction By', flex:1 },
    { field: 'status', headerName: 'Status', flex:1 , renderCell:(params) =>(<Typography sx={{ paddingY:"4px", display:"flex",alignItems:"center", justifyContent:"center", borderRadius:"16px", marginTop:"10px", width:"100px", color: params.value === "completed" ? "#027A48" : params.value === "pending" ? "#2563EB" : params.value === "failed" ? "#B42318": params.value === "refunded" ? "#344054" : "", textAlign:"center",  backgroundColor: params.value === "completed" ? "#ECFDF3": params.value ==="pending" ? "#EFF6FF" : params.value === "failed" ? "#FEF3F2" : params.value === "refunded" ? "#F2F4F7" :"" }}>{params.value}</Typography>) },
  ]  

    const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 2780 },
    { month: 'May', sales: 1890 },
    { month: 'Jun', sales: 2390 },
    { month: 'Jul', sales: 3490 },
    { month: 'Aug', sales: 4000 },
    { month: 'Sep', sales: 6000 },
    { month: 'Oct', sales: 7000 },
    { month: 'Nov', sales: 8000 },
    { month: 'Dec', sales: 9000 },
  ];

  const dailyData = [
  { day: 'Mon', sales: 1200 },
  { day: 'Tue', sales: 1900 },
  { day: 'Wed', sales: 1500 },
  { day: 'Thu', sales: 2100 },
  { day: 'Fri', sales: 1800 },
  { day: 'Sat', sales: 2500 },
  { day: 'Sun', sales: 1700 },
];

const [fetchingLandlords,setFetchingLandlords] = useState<boolean>(false)

const listAllLandlords = useCallback(async () => {
  try {
    setFetchingLandlords(true)
  const response = await listLandlords()
  if(response.status === 200 ){
    setLandlordsCount(response.data.data.length)
    const landlordsData= response.data.data;
    const mostRecentLandlord = landlordsData.slice(0,5);
    setLatestLandlordList(mostRecentLandlord);
  }
  } catch (error) {
   console.log(error);
  }finally{
    setFetchingLandlords(false)
  }
},[])


useEffect(()=>{
listAllLandlords()
},[listAllLandlords])

console.log(latestlandlordList,"list of latest landlords")


const [fetchingTenants,setFetchingTenants] = useState<boolean>(false)

const listAllTenants = useCallback( async() => {
  try {
    setFetchingTenants(true)
    const response = await listTenants();
    if(response.status === 200){
      setTenantsCount(response.data.data.length)
    }
  } catch (error) {
    console.log(error)
  }finally{
    setFetchingTenants(false)
  }
},[])

useEffect(()=>{
  listAllTenants()
},[listAllTenants])

// list all properties  
   const  [fetchingProperties,setFetchingProperties] = useState<boolean>(false)

const listAllProperties = useCallback (async()=>{
  try {
    setFetchingProperties(true)
    const response = await listProperties();
    if(response.status === 200){
      setPropertiesCount(response.data.data.length)
    }
  } catch (error) {
    console.log(error)
  }finally{
    setFetchingProperties(false)
  }
},[])

useEffect(()=>{
 listAllProperties()
},[listAllProperties])

const [fetchingUnits,setFetchingUnits] = useState<boolean>(false);

const listAllUnits = useCallback(async ()=>{
  try {
    setFetchingUnits(true)
    const response = await listUnits()
    if(response.status === 200){
      setUnitsCount(response.data.data.length)
    }
  } catch (error) {
    console.log(error)
  }finally{
    setFetchingUnits(false)
  }
},[])

useEffect(()=>{
listAllUnits()
},[listAllUnits])




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
            { fetchingLandlords ?  <CircularProgress thickness={5} size={24} sx={{ color:"#1F2937"}}/> : <Typography sx={{color:"#1F2937", fontSize:"28px", fontWeight:"600"}} variant="h4">{landlordsCount}</Typography>}
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
             {fetchingTenants ? <CircularProgress thickness={5} size={24} sx={{ color:"#1F2937"}}/> : <Typography sx={{color:"#1F2937", fontSize:"28px", fontWeight:"600"}} variant="h4">{tenantsCount}</Typography> }
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
             { fetchingProperties ? <CircularProgress thickness={5} size={24} sx={{ color:"#1F2937"}}  /> : <Typography sx={{color:"#1F2937", fontSize:"28px", fontWeight:"600"}} variant="h4">{propertiesCount}</Typography> }
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
            { fetchingUnits ? <CircularProgress size={24} thickness={5} sx={{ color:"#1F2937"}}/> : <Typography sx={{color:"#1F2937", fontSize:"28px", fontWeight:"600"}} variant="h4">{unitsCount}</Typography>}
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

         <Paper elevation={0} sx={{padding:"24px",width:"100%", height:"600px", backgroundColor:"#fff",boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)"}}>
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
            <Box sx={{width:"100%", marginTop:"14px"}}>
              <ResponsiveContainer width="100%" height={500}>
                { selectedTimePeriod ==="Weekly" ? 
                    <BarChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                       <XAxis dataKey="day" />
                       <YAxis />
                       <Tooltip />
                       <Legend />
                       <Bar dataKey="sales" fill="#2563EB" />
                  </BarChart>
                :
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#2563EB" />
                </BarChart>}
              </ResponsiveContainer>
            </Box>

          </Box>
         </Paper>
{/* 
          "properties": [
                {
                    "_id": "687b83eb8cacbd0ac44eaa41",
                    "name": "Kilimani Houses"
                },
                {
                    "_id": "687b84488cacbd0ac44eaa6d",
                    "name": "Kilimani Flats"
                }
            ], */}

         <Box sx={{ display:"flex", gap:"20px", width:"100%",  }}>
          <Paper elevation={0} sx={{ display:"flex" , flexDirection:"column", gap:"16px", padding:"24px", width:"50%",height:"400px", backgroundColor:"#fff", boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)" }}>
            <Typography sx={{ textAlign:"start", fontSize:"20px", fontWeight:"600", color:"#111827"}}>Latest Landlords</Typography>
            <Box sx={{ display:"flex", flexDirection:"column", gap:"10px"}}>
              {latestlandlordList.map((landlord)=>( 
              <Box key={landlord._id} sx={{ width:"100%", display:"flex", justifyContent:"space-between"}}>
              <Box sx={{ display:"flex", gap:"10px", width:"50%"}}>
                <Avatar src={landlord?.avatar?.secure_url}/>
                <Box sx={{ display:"flex", flexDirection:"column"}}>
                  <Typography variant='body2' sx={{fontSize:"16px", fontWeight:"600", color:"#374151"}}>{landlord.userName}</Typography>
                  <Typography sx={{ fontSize:"12px", fontWeight:"400", color:"#374151"}}>{landlord.email}</Typography>
                </Box>
              </Box>
              <Box sx={{ width:"50%" }}>
                <Typography variant='body2' sx={{ textAlign:"end", fontSize:"16px", fontWeight:"600"}}>{landlord?.properties[0]?.name}</Typography>
              </Box>
            </Box>
          ))}
           
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

        <Paper elevation={0} sx={{ padding:"20px 16px", width:"24%", height:"1020px", backgroundColor:"#fff" , boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)"}}>
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
             <DataGrid sx={{ width:"100%", height:"476px"}} loading={loadingTransactions}  columns={transactionsColumns} rows={transactionsRows} pageSizeOptions={[10,20,50,100]} />
          </Box>
        </Box>
      </Paper>
      

      </Box>
    </Box>
  );
};

export default Dashboard;