import { Box, Button, FormControl, FormLabel, InputAdornment, TextField, Typography } from '@mui/material'
import type React from 'react'
import iconBlue from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon blue.svg"
import { useState, type ChangeEvent } from 'react'
import logoWhite from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg"
import eyeIcon from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon eye.svg"
import bgImage from "../../assets/images-20230907T172340Z-001/images/Sign up  Loading  1.jpg"

interface formData {
  newPassword:string,
  reenterNewPassword: string,
}

const ResetPassword : React.FC =  () => {
  const [formData,setFormData] = useState<formData>({ newPassword:"", reenterNewPassword:"" })
  const [showNewPassword,setShowNewPassword]  = useState<boolean>(false);
  const [reenterNewPassword,setReenterNewPassword] = useState<boolean>(false)

  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    setFormData((prev)=>({ ...prev,[name]:value }))
  }


  return (
        <Box sx={{ opacity:0.9, position:"relative", width:"100%", height:"100vh", backgroundColor:"rgba(36, 46, 58, 0.70)" }}>
             <img src={bgImage} style={{ objectFit:"cover", position:"absolute", mixBlendMode:'overlay', width:"100%", height:"100%", zIndex:0 }} alt="bgImage" />            
            <Box sx={{ position:"relative", width:'100%', display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Box sx={{ height:"100vh", width:'50%', display:"flex", alignItems:"center", justifyContent:"center"}}>
    
                <Box sx={{ position:"relative", padding:"32px", borderRadius:"8px", width:"60%", backgroundColor:"#F9FAFB", height:"58vh"}}>
                    <Box sx={{gap:"10px", marginY:'20px',  width:"100%", flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
                      <img src={iconBlue} alt="iconBlue" />
                        <Typography variant="body2" sx={{fontWeight:"700", fontSize:"30px", textAlign:"center"}}>Reset password?</Typography>
                    </Box>
    
                  <form style={{ width:"100%", display:"flex", alignItems:"start", flexDirection:"column", gap:"10px" }}>
                    <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                      <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                        <FormLabel  htmlFor="newPassword" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Enter new password</FormLabel>
                        <TextField type={showNewPassword ? "text" :"password" } name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="************" fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}} InputProps={{ endAdornment:(<InputAdornment sx={{cursor:"pointer"}} onClick={()=>setShowNewPassword(!showNewPassword)} position='end'><img src={eyeIcon} alt="eyeIcon" /></InputAdornment>) }} />
                      </FormControl>
                    </Box>

                    <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                      <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                        <FormLabel  htmlFor="reenterNewPassword" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Re-enter password</FormLabel>
                        <TextField type={reenterNewPassword ? "text" : "password"}  name="reenterNewPassword" value={formData.reenterNewPassword} onChange={handleChange} placeholder="************" fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}} InputProps={{endAdornment:(<InputAdornment onClick={()=>setReenterNewPassword(!reenterNewPassword)} sx={{ cursor:"pointer"}} position='end'><img src={eyeIcon} alt="eyeIcon"/></InputAdornment>)}}/>
                      </FormControl>
                    </Box>
                    <Button type="submit" variant="contained" disabled={!formData.newPassword || !formData.reenterNewPassword} sx={{ marginTop:"20px", width:"100%", height:"50px",backgroundColor:"#1A56DB" , color:"#fff", borderRadius:"12px", fontWeight:"600", fontSize:"16px", textAlign:"center" }}>Recover password</Button>
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

export default ResetPassword
