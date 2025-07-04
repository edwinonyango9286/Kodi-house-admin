import React, { useState,} from 'react'
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, TextField, Typography, InputAdornment } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import iconBlue from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon blue.svg"
import logoWhite from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg"
import appleIcon from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/apple icon black.svg"
import googleIcon from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/google icon.svg"
import twitterIcon from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/twitter icon blue.svg"
import facebookIcon from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/facebook icon blue.svg"
import eyeIcon from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon eye.svg"
import bgImage from "../../assets/images-20230907T172340Z-001/images/Sign up  Loading  1.jpg"
import type { CreateAccountPayload } from '../../interfaces/interfaces'
import { createAccount } from '../../components/services/authServices'
import { showErrorToast, showInfoToast } from '../../utils/toast'
import type { AxiosError } from 'axios'


const CreateAccount:React.FC = () => {
 const [formData,setFormData]  = useState<CreateAccountPayload>({userName:"", email:"",password:"",termsAndConditionsAccepted:false});
 const [showPassword,setShowPassword]  = useState<boolean>(false)
 const [isSubmitting,setIsSubmitting]  = useState<boolean>(false)
 const navigate = useNavigate()


 const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target 
    setFormData((prev)=>({...prev, [name]:value}))
 }

 const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await createAccount(formData);
      console.log(response.data, "=>response.data");
      if(response.status === 200){
        setFormData({ userName:"", email:"", password:"", termsAndConditionsAccepted:false})
        showInfoToast(response.data.message);
        navigate("/code-verification",{state:{email:response.data.data.email, activationToken:response.data.data.activationToken}})
      }
    } catch (err) {
      const error = err as AxiosError<{message?: string}>;
      showErrorToast(error?.response?.data?.message || error.message)
      console.error("Error creating account:", error);
    } finally {
      setIsSubmitting(false)
    }
  };

const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({...prev,termsAndConditionsAccepted: e.target.checked }));
};

  return (
     <Box sx={{ opacity:0.9, position:"relative", width:"100%", height:"100vh", backgroundColor:"rgba(36, 46, 58, 0.70)" }}>
          <img src={bgImage} style={{ objectFit:"cover", position:"absolute", mixBlendMode:'overlay', width:"100%", height:"100%", zIndex:0 }} alt="bgImage" />       
        <Box sx={{ position:"relative", width:'100%', display:"flex" }}>
          <Box sx={{ height:"100vh", width:'50%', display:"flex", alignItems:"center", justifyContent:"center"}}>

            <Box sx={{ padding:"32px", borderRadius:"8px", width:"60%", backgroundColor:"#F9FAFB", height:"92vh"}}>
                <Box sx={{gap:"10px", width:"100%", flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <img src={iconBlue} alt="iconBlue" />
                  <Typography variant="body2" sx={{fontWeight:"700", fontSize:"30px", textAlign:"center"}}>Create an account</Typography>
                  <Typography variant='body2' sx={{ fontWeight:"400", fontSize:"14px", textAlign:"center" }}>Create account with socials</Typography>
                </Box>

                <Box sx={{ width:"100%", marginY:"20px", display:"flex", alignItems:"center", justifyContent:"center" , gap:"20px" }}>
                  <Button type='button' variant="contained" sx={{ display:"flex", alignItems:"center", justifyContent:"center",boxShadow:"none", borderRadius:"8px", width:"50px", height:"50px", backgroundColor:"#fff", color:"#000" , fontWeight:"700", fontSize:"14px", border: "1px solid #4285F4"}}><img style={{width:"20px" , height:"20px"}} src={googleIcon} alt="googleIcon" /></Button>
                  <Button type='button' variant="contained" sx={{ display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"none", borderRadius:"8px", width:"50px", height:"50px", backgroundColor:"#fff", fontWeight:"700",fontSize:"14px", border: "1px solid #4285F4" }}><img style={{width:"20px", height:"20px"}} src={twitterIcon} alt="twitterIcon"/></Button>
                  <Button type='button' variant="contained" sx={{ display:"flex", justifyContent:"center", alignItems:"center", boxShadow:"none", borderRadius:"8px", width:"50px", height:"50px",  backgroundColor:"#fff", fontWeight:"700", fontSize:"14px" , border: "1px solid #000" }}> <img src={appleIcon} alt="appleIcon" style={{ width:"20px", height:"20px"}}/></Button>
                  <Button type='button' variant="contained" sx={{ display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"none", borderRadius:"8px", width:"50px", height:"50px" , backgroundColor:"#fff", fontWeight:"700", fontSize:"14px",border: "1px solid #4285F4" }}> <img src={facebookIcon} alt="facebookIcon"  style={{ width:"20px", height:"20px"}} /></Button>
                </Box>

                <Box sx={{ marginY:"30px", width:"100%", alignItems:"center", alignContent:"center", display:"flex", gap:"14px"}}>
                  <Divider sx={{ borderWidth:"1px", width:"26%"}}/>
                  <Typography variant="body2" sx={{color:"#1F2937", textAlign:"center", fontSize:"16px", fontWeight:"600"}}>Or, sign up  with your email</Typography>
                  <Divider sx={{ borderWidth:"1px", width:"26%"}}/>
                </Box>

              <form onSubmit={handleCreateAccount} style={{ width:"100%", display:"flex", alignItems:"start", flexDirection:"column", gap:"10px" }}>
                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="userName" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Name</FormLabel>
                    <TextField type="text"  name="userName" value={formData.userName} onChange={handleChange} placeholder="Name" fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
                </Box>
                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="email" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Email</FormLabel>
                    <TextField type="email"  name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
                </Box>

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel htmlFor="password" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Password</FormLabel>
                    <TextField type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="************************" fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}} InputProps={{ endAdornment:(<InputAdornment onClick={()=>setShowPassword(!showPassword)} sx={{cursor:"pointer"}} position='end'><img style={{ width:"20px", height:"20px" }} src={eyeIcon} alt="eyeIcon" /></InputAdornment>) }} />
                  </FormControl>
                </Box>

                <Box sx={{ width:"100%",}}>
                  <Box sx={{display:"flex", alignSelf:"start"}}>
                    <FormControlLabel label="I accept the terms and conditions" sx={{ "& .MuiFormControlLabel-label":{
                      fontSize:"12px", color:"#6B7280", fontWeight:"500"
                    }}}  control={<Checkbox sx={{ borderRadius:"4px"}}  onChange={handleChecked}/>} /> 
                  </Box>
                </Box>
                <Button type="submit" variant="contained" loading={isSubmitting} disabled={!formData.userName || !formData.password || !formData.email || !formData.termsAndConditionsAccepted} sx={{ marginTop:"10px", width:"100%", height:"50px",backgroundColor:"#1A56DB" , color:"#fff", borderRadius:"12px", fontWeight:"600", fontSize:"16px", textAlign:"center" }}>Create account</Button>
                <Box sx={{ marginTop:"10px", width:"100%", display:"flex", gap:"4px"}}>
                    <Typography variant="body2" sx={{fontSize:"14px", fontWeight:"500", textAlign:"start" }}>Already have account ?</Typography>
                    <Link to={"/"} style={{ textDecoration:"none", color:"#2563EB" , fontWeight:"500", fontSize:"14px"}}>Login here</Link>
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

export default CreateAccount
