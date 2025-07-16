import { Box, Button, Typography } from '@mui/material'
import logo from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/logo.svg"
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";


const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ height:"100vh", gap:"14px", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
      <img src={logo} alt="" />
      <Box sx={{ display:"flex",flexDirection:"column" }}>
        <Typography sx={{fontSize:"16px",fontWeight:"700" }}>Ooops...</Typography>
        <Typography sx={{ fontSize:"16px", fontWeight:"400"}}>The page you’re looking for doesn’t exist.</Typography>
      </Box>
      <Button onClick={()=>{navigate(-1)}} sx={{ ":hover":{ boxShadow:"none"}, color:"#fff", width:"154px", height:"44px", boxShadow:"none", borderRadius:"8px", fontSize:"16px",fontWeight:"700", padding:"12px 24px", backgroundColor:"#2563EB"}}>Go Back <FaArrowRight style={{ marginLeft:"10px", color:"#fff"}}/> </Button>
    </Box>
  )
}

export default PageNotFound
