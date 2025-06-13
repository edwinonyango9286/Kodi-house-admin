import { Box, Button, FormControl, FormLabel, InputAdornment, TextField, Typography } from '@mui/material'
import type React from 'react'
import iconBlue from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon blue.svg"
import { useState, type ChangeEvent, type FormEvent } from 'react'
import logoWhite from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg"
import eyeIcon from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon eye.svg"
import bgImage from "../../assets/images-20230907T172340Z-001/images/Sign up  Loading  1.jpg"
import { useNavigate, useParams } from 'react-router-dom'
import { resetUserPassword } from '../../components/services/authServices'
import type { IResetPasswordPayload } from '../../types/types'
import type { AxiosError } from 'axios'
import { showErrorToast, showInfoToast } from '../../utils/toast'


const ResetPassword : React.FC =  () => {
  const [formData,setFormData] = useState<IResetPasswordPayload>({ password:"", confirmPassword:"", token:"" })
  const [showNewPassword,setShowNewPassword]  = useState<boolean>(false);
  const [reenterNewPassword,setReenterNewPassword] = useState<boolean>(false)
  const [isSubmitting,setIsSubmitting]  = useState<boolean>(false)
  const navigate = useNavigate();

  const {token}  = useParams();
  console.log(token,"=>token")


  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    setFormData((prev)=>({ ...prev,[name]:value }))
  }

  const handleResetPassword = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const resetPasswordFormData ={...formData,token:token }
    try {
      const response = await resetUserPassword(resetPasswordFormData)
      if(response.status === 200){
        setFormData({ password:"", confirmPassword:"", token:"" });
        showInfoToast(response.data.message);
        navigate("/");
      }
    } catch (err) {
      const error = err as AxiosError<{ message?:string}>
      showErrorToast(error?.response?.data?.message || error.message)
    }finally{
      setIsSubmitting(false)
    }
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
    
                  <form onSubmit={handleResetPassword} style={{ width:"100%", display:"flex", alignItems:"start", flexDirection:"column", gap:"10px" }}>
                    <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                      <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                        <FormLabel  htmlFor="password" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Enter new password</FormLabel>
                        <TextField type={showNewPassword ? "text" :"password" } name="password" value={formData.password} onChange={handleChange} placeholder="************" fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}} InputProps={{ endAdornment:(<InputAdornment sx={{cursor:"pointer"}} onClick={()=>setShowNewPassword(!showNewPassword)} position='end'><img src={eyeIcon} alt="eyeIcon" /></InputAdornment>) }} />
                      </FormControl>
                    </Box>

                    <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                      <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                        <FormLabel  htmlFor="confirmPassword" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Re-enter password</FormLabel>
                        <TextField type={reenterNewPassword ? "text" : "password"}  name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="************" fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}} InputProps={{endAdornment:(<InputAdornment onClick={()=>setReenterNewPassword(!reenterNewPassword)} sx={{ cursor:"pointer"}} position='end'><img src={eyeIcon} alt="eyeIcon"/></InputAdornment>)}}/>
                      </FormControl>
                    </Box>
                    <Button loading={isSubmitting} type="submit" variant="contained" disabled={!formData.confirmPassword || !formData.confirmPassword} sx={{ marginTop:"20px", width:"100%", height:"50px",backgroundColor:"#1A56DB" , color:"#fff", borderRadius:"12px", fontWeight:"600", fontSize:"16px", textAlign:"center" }}>Recover password</Button>
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
