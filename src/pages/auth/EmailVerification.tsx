import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import logoWhite from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg"
import { Link } from 'react-router-dom'
import mailIcom from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/mail icon.svg"
import iconBlue from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon blue.svg"
import bgImage from "../../assets/images-20230907T172340Z-001/images/Sign up  Loading  1.jpg"

const EmailVerification : React.FC =  () => {
  return (
      <Box sx={{ opacity:0.9, position:"relative", width:"100%", height:"100vh", backgroundColor:"rgba(36, 46, 58, 0.70)" }}>
          <img src={bgImage} style={{ objectFit:"cover", position:"absolute", mixBlendMode:'overlay', width:"100%", height:"100%", zIndex:0 }} alt="bgImage" />        
          <Box sx={{ position:"relative", width:'100%', display:"flex" }}>
          <Box sx={{ height:"100vh", width:'50%', display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Box sx={{ padding:"32px", borderRadius:"8px", width:"60%", backgroundColor:"#F9FAFB", height:"56vh"}}>
                <Box sx={{gap:"10px", marginY:'20px',  width:"100%", flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <img src={iconBlue} alt="iconBlue" />
                    <Typography variant="body2" sx={{fontWeight:"700", fontSize:"30px", textAlign:"center"}}>Forgot your password?</Typography>
                    <Typography variant='body2' sx={{ width:"100%", alignSelf:"start", fontWeight:"400", fontSize:"14px", textAlign:"start" }}>We have sent you verification email example@abc.com, Please check it.</Typography>
                </Box>

              <form style={{ width:"100%", display:"flex", alignItems:"start", flexDirection:"column", gap:"10px" }}>
                <Box sx={{ marginTop:"10px", width:"100%", display:"flex", alignItems:"center", justifyContent:"center",}}>
                    <Box sx={{ backgroundColor:"#E5E7EB", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"50%", width:"94px", height:"94px"}}>
                      <img src={mailIcom} alt="mailIcom" />
                    </Box>
                </Box>
        
                <Button type="submit" variant="contained" sx={{ marginTop:"20px", width:"100%", height:"50px",backgroundColor:"#1A56DB" , color:"#fff", borderRadius:"12px", fontWeight:"600", fontSize:"16px", textAlign:"center" }}>Verify email </Button>
                <Box sx={{ marginTop:"10px", width:"100%", display:"flex", gap:"4px"}}>
                    <Typography variant="body2" sx={{fontSize:"14px", fontWeight:"500", textAlign:"start" }}>Didn’t recieve the email ? </Typography>
                    <Link to={"/forgot-password"} style={{ textDecoration:"none", color:"#2563EB" , fontWeight:"500", fontSize:"14px"}}>Resend</Link>
                </Box>
              </form>
            </Box>
          </Box>
          <Box sx={{ width:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Box sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" , gap:"10px" }}>
                 <img src={logoWhite} alt="logoWhite" style={{marginRight:"40px"}} />
                 <Typography sx={{color:"#fff", textAlign:"center", fontSize:"16px", fontWeight:"400" }}>Sign up  or create an account</Typography>
            </Box>
          </Box>
        </Box>
    </Box>
  )
}

export default EmailVerification
