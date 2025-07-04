 
import { Box,FormLabel ,FormControl,TextField, Button, Typography ,FormControlLabel, Checkbox, Divider, InputAdornment,} from "@mui/material"
import React, {useState, type ChangeEvent } from "react"
import iconBlue from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon blue.svg"
import { Link, useNavigate } from "react-router-dom"
import googleIcon from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/google icon.svg"
import twitterIcon from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/twitter icon.svg"
import appleIcon from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/apple icon.svg"
import facebookIcon from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/facebook icon.svg"
import logoWhite from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg"
import eyeIcon from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon eye.svg"
import bgImage from "../../assets/images-20230907T172340Z-001/images/Sign up  Loading  1.jpg"
import type { SignInPayload } from "../../interfaces/interfaces"
import type { AxiosError } from "axios"
import { showErrorToast } from "../../utils/toast"
import { signIn } from "../../components/services/authServices"
import Cookies from "js-cookie"


const SignIn : React.FC = () => {
  const navigate = useNavigate()
  const [formData,setFormData]  = useState<SignInPayload>({email:"",password:""})
  const [showPassword,setShowPassword] = useState<boolean>(false);
  const [storeAccessTokenInCookies,setStoreAccessTokenInCookies] = useState<boolean>(false)
  const [isSubmitting,setIsSubmitting] = useState<boolean>(false)
  

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name,value} = e.target
    setFormData((prev)=>({ ...prev, [name]:value}))
  }
  console.log(storeAccessTokenInCookies)

  const handleSignIn = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await signIn(formData)
      if(response?.status === 200){
        navigate("/dashboard")
        setFormData({ email:"", password:""})
        localStorage.setItem("userData", JSON.stringify(response.data.data) )
        
         Cookies.set("accessToken", response.data.accessToken)

        if(storeAccessTokenInCookies){
          Cookies.set("accessToken", response.data.accessToken,{expires:7})
        }
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string}>
      showErrorToast(error?.response?.data.message || error.message)
      console.log(error.response?.data.message)
    }finally{
      setIsSubmitting(false)
      setStoreAccessTokenInCookies(false)
    }
  }
 const handleChecked = (e:ChangeEvent<HTMLInputElement>) => {
  setStoreAccessTokenInCookies(e.target.checked)
 }

  return (
    <Box sx={{ opacity:0.9, position:"relative", width:"100%", height:"100vh", backgroundColor:"rgba(36, 46, 58, 0.70)" }}>
        <img src={bgImage} style={{ objectFit:"cover", position:"absolute", mixBlendMode:'overlay', width:"100%", height:"100%", zIndex:0 }} alt="bgImage" /> 
        <Box sx={{ position:"relative", width:'100%', display:"flex" }}>
          <Box sx={{ height:"100vh", width:'50%', display:"flex", alignItems:"center", justifyContent:"center"}}>

            <Box sx={{ padding:"32px", borderRadius:"8px", width:"60%", backgroundColor:"#F9FAFB", height:"96vh"}}>
                <Box sx={{gap:"10px", width:"100%", flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <img src={iconBlue} alt="iconBlue" />
                  <Typography variant="body2" sx={{fontWeight:"700", fontSize:"30px", textAlign:"center"}}>Sign in</Typography>
                </Box>
              <form onSubmit={handleSignIn} style={{ width:"100%", display:"flex", alignItems:"start", flexDirection:"column", gap:"10px" }}>
                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="email" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Email</FormLabel>
                    <TextField type="email"  name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
                </Box>

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel htmlFor="password" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Password</FormLabel>
                    <TextField type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="***********************" fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}} InputProps={{ endAdornment:(<InputAdornment sx={{cursor:"pointer"}} onClick={()=>setShowPassword(!showPassword)} position="end"><img src={eyeIcon} alt="eyeIcon"/></InputAdornment>)}} />
                  </FormControl>
                </Box>

                <Box sx={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <Box sx={{display:"flex",}}>
                    <FormControlLabel label="Remember me" sx={{ "& .MuiFormControlLabel-label":{
                      fontSize:"12px", color:"#6B7280", fontWeight:"500"
                    }}}  control={<Checkbox onChange={handleChecked} />}/> 
                  </Box>
                    <Link to={"/forgot-password"} style={{ fontSize:"12px", fontWeight:"500", textAlign:"end", color:"#2563EB", textDecoration:"none",}}>Forgot your password?</Link>
                </Box>

                <Button loading={isSubmitting} type="submit" variant="contained" disabled={!formData.email || !formData.password} sx={{ marginTop:"10px", width:"100%", height:"50px",backgroundColor:"#1A56DB" , color:"#fff", borderRadius:"12px", fontWeight:"600", fontSize:"16px", textAlign:"center" }}>Sign In</Button>

                <Box sx={{ marginY:"10px", width:"100%", alignItems:"center", alignContent:"center", display:"flex", gap:"14px"}}>
                  <Divider sx={{ borderWidth:"1px", width:"45%"}}/>
                  <Typography variant="body2" sx={{color:"#6B7280", textAlign:"center", fontSize:"14px", fontWeight:"700"}}>OR</Typography>
                  <Divider sx={{ borderWidth:"1px", width:"45%"}}/>
                </Box>

                <Box sx={{ width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:"20px" }}> 
                  <Button variant="contained" sx={{ boxShadow:"none", borderRadius:"8px", width:"100%", height:"50px", backgroundColor:"#fff", color:"#000" , fontWeight:"700", fontSize:"14px"}}> <img style={{width:"20px" , height:"20px", marginRight:"10px" }} src={googleIcon} alt="googleIcon" /> Sign in via Google</Button>
                  <Button variant="contained" sx={{ boxShadow:"none", borderRadius:"8px", width:"100%", height:"50px", backgroundColor:"#1D9BF0", fontWeight:"700",fontSize:"14px" }}> <img style={{ marginRight:"10px", width:"20px", height:"20px"}} src={twitterIcon} alt="twitterIcon"/> Sign in via Twitter</Button>
                  <Button variant="contained" sx={{ boxShadow:"none", borderRadius:"8px", width:"100%", height:"50px",  backgroundColor:"#000", fontWeight:"700", fontSize:"14px" }}> <img src={appleIcon} alt="appleIcon" style={{ marginRight:"10px", width:"20px", height:"20px"}}/> Sign in via Apple</Button>
                  <Button variant="contained" sx={{ boxShadow:"none", borderRadius:"8px", width:"100%", height:"50px" , backgroundColor:"#2563EB", fontWeight:"700", fontSize:"14px" }}> <img src={facebookIcon} alt="facebookIcon"  style={{ marginRight:"10px", width:"20px", height:"20px"}} /> Sign in via Facebook</Button>
                </Box>
                <Box sx={{ marginTop:"10px", width:"100%", display:"flex", gap:"4px"}}>
                    <Typography variant="body2" sx={{fontSize:"14px", fontWeight:"500", textAlign:"start" }}>Doesn’t have account ?</Typography>
                    <Link to={"/create-account"} style={{ textDecoration:"none", color:"#2563EB" , fontWeight:"500", fontSize:"14px"}}>Create an account</Link>
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

export default SignIn
