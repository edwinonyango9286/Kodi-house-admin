import { Box, Button, FormControl, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState,} from 'react'
import iconBlue from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon blue.svg"
import { Link } from 'react-router-dom'
import logoWhite from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg"
import bgImage from "../../assets/images-20230907T172340Z-001/images/Sign up  Loading  1.jpg"


interface formData {
    email:string,
}

const ForgotPassword: React.FC =  () => {
    const [formData,setFormData] = useState<formData>({ email:""})

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name,value}  = e.target
        setFormData((prev)=>({...prev,[name]:value}))
    }

    const handleChecked = (e) =>{

    }

  return (
       <Box sx={{ opacity:0.9, position:"relative", width:"100%", height:"100vh", backgroundColor:"rgba(36, 46, 58, 0.70)" }}>
          <img src={bgImage} style={{ objectFit:"cover", position:"absolute", mixBlendMode:'overlay', width:"100%", height:"100%", zIndex:0 }} alt="bgImage" />       
        <Box sx={{ position:"relative", width:'100%', display:"flex" }}>
          <Box sx={{ height:"100vh", width:'50%', display:"flex", alignItems:"center", justifyContent:"center"}}>

            <Box sx={{ padding:"32px", borderRadius:"8px", width:"60%", backgroundColor:"#F9FAFB", height:"56vh"}}>
                <Box sx={{gap:"10px", marginY:'20px',  width:"100%", flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <img src={iconBlue} alt="iconBlue" />
                    <Typography variant="body2" sx={{fontWeight:"700", fontSize:"30px", textAlign:"center"}}>Forgot your password?</Typography>
                    <Typography variant='body2' sx={{ width:"100%", alignSelf:"start", fontWeight:"400", fontSize:"14px", textAlign:"start" }}>Don’t  fret! Just type your email and we will send you a code to reset  your password.  </Typography>
                </Box>

              <form style={{ width:"100%", display:"flex", alignItems:"start", flexDirection:"column", gap:"10px" }}>
                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="email" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Email</FormLabel>
                    <TextField type="email"  name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
                </Box>

                <Button type="submit" variant="contained" disabled={!formData.email} sx={{ marginTop:"20px", width:"100%", height:"50px",backgroundColor:"#1A56DB" , color:"#fff", borderRadius:"12px", fontWeight:"600", fontSize:"16px", textAlign:"center" }}>Recover password</Button>
                <Box sx={{ marginTop:"10px", width:"100%", display:"flex", gap:"4px"}}>
                    <Typography variant="body2" sx={{fontSize:"14px", fontWeight:"500", textAlign:"start" }}>Remembered it ?</Typography>
                    <Link to={"/"} style={{ textDecoration:"none", color:"#2563EB" , fontWeight:"500", fontSize:"14px"}}>Sign in</Link>
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

export default ForgotPassword
