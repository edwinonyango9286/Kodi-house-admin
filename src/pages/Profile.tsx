import { Avatar, Box, Button, FormControl, FormControlLabel, FormGroup, FormLabel, InputAdornment, Paper, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import freyaBrowning from "../assets/Avatars square-20230907T172556Z-001/Avatars square/WebP/Freya Browning.webp"
import uploadIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/upload icon.svg"
import eyeIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon eye.svg"
import type { IUpdatePasswordPayload, IUpdateUserInfoPayload } from '../types/types'
import { updatePassword, updateUserInfo } from '../components/services/userServices'
import { showErrorToast, showInfoToast } from '../utils/toast'
import type { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'



const Profile = () => {
  const navigate = useNavigate()
  const [showCurrentPassword,setShowCurrentPassword] = useState<boolean>(false)
  const [showNewPassword,setShowNewPassword]  = useState<boolean>(false)
  const [showConfirmNewPassword,setShowConfirmNewPassword] = useState<boolean>(false)
  const [passwordData,setPasswordData] = useState<IUpdatePasswordPayload>({ currentPassword:"",newPassword:"", confirmNewPassword:""})
  const [isSubmitting,setIsSubmitting] = useState<boolean>(false)
  const [userInfoData,setUserInfoData] = useState<IUpdateUserInfoPayload>({ email:"",phoneNumber:"", firstName:"", secondName:"", lastName:"", nationalId:"", address:"" })
  const [updatingUserInfo,setUpdatingUserInfo] = useState<boolean>(false)
  const [securityAandNotificationsData,setSecurityAndNotificationsData] =  useState({twoFa:false, accountActivity:false, newMessages:false})

  const handleChangePasswordInput =  (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target
    setPasswordData((prev)=>({...prev, [name]:value}))
  }

  const handleUpdatePassword = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setIsSubmitting(true)

    if(passwordData.newPassword !== passwordData.confirmNewPassword){
      showErrorToast("New password and confirm password do not match.")
      setIsSubmitting(false)
      return
    }
    try {
      const response = await updatePassword(passwordData);
      if(response.status === 200){
        setPasswordData({ newPassword:"", currentPassword:"",confirmNewPassword:""})
        Cookies.remove("refreshToken")
        localStorage.clear();
        const allCookies = Cookies.get();
        for( const cookieName in allCookies){
        Cookies.remove(cookieName)
         }
       showInfoToast(response.data.message)
       navigate("/")
      }
    } catch (err) {
      const error = err as AxiosError<{message?:string}>
      showErrorToast(error?.response?.data?.message || error.message)
    }finally{
      setIsSubmitting(false)
    }
  }

  
  const handleUserInfoChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target;
    setUserInfoData((prev)=>({...prev, [name]:value}))
  }

  const handleUpdateUserInfo = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setUpdatingUserInfo(true);
    try {
      const response = await updateUserInfo(userInfoData)
      return response
    } catch (error) {
      console.log(error)
    }finally{
      setUpdatingUserInfo(false)
    }
  }

  const handleSwitchChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, checked} = e.target
    setSecurityAndNotificationsData((prev)=>({...prev, [name]:checked}))
  }




  return (
    <Box sx={{ width:"100%", display:"flex",gap:"20px",}}>
      <Box sx={{ width:"32%" , display:"flex", flexDirection:"column", gap:"20px"}}>
        <Paper elevation={0} sx={{ display:"flex", gap:"20px", alignItems:"center", paddingY:"24px", paddingX:"32px", height:"176px",width:"100%", backgroundColor:"#fff", borderRadius:"8px"}}>
          <Avatar src={freyaBrowning} sx={{ width:"112px", height:"112px" }}/>

          <Box sx={{ display:"flex",flexDirection:"column",}}>
            <Typography sx={{fontSize:"24px",fontWeight:"600", color:"#1F2937"}}>Freya Browning</Typography>
            <Typography  sx={{ fontSize:"14px",fontWeight:"400", color:"#6B7280"}}>SuperAdmin</Typography>
            <Button disableRipple variant='contained' sx={{ ":hover":{ boxShadow:"none"},boxShadow:"none", borderRadius:"8px", marginTop:"10px", width:"140px", height:"40px", backgroundColor:"#1A56DB", display:"flex", gap:"4px"}}>
              <img src={uploadIcon} alt="uploadIcon" style={{width:"12px", height:"12px"}}/>
              <Typography sx={{ fontSize:"12px", fontWeight:"600", color:"#fff", textWrap:"nowrap" }}>Change picture</Typography>
            </Button>
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ borderRadius:"8px", padding:"24px", display:"flex", flexDirection:"column",}}>
          <form onSubmit={handleUpdatePassword}  style={{ display:"flex", flexDirection:"column"}}>
          <Typography sx={{textAlign:"start",fontSize:"20px", fontWeight:"700", color:"#1F2937" }}>Password information</Typography>
          <Box sx={{width:"100%", display:"flex", flexDirection:"column" , gap:"10px", marginTop:"10px"}}>

              <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel htmlFor="currentPassword" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Current Password</FormLabel>
                    <TextField type={showCurrentPassword ? "text" : "password"} name="currentPassword" value={passwordData.currentPassword} onChange={handleChangePasswordInput} placeholder="***********************" fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}} InputProps={{ endAdornment:(<InputAdornment sx={{cursor:"pointer"}} onClick={()=>setShowCurrentPassword(!showCurrentPassword)} position="end"><img src={eyeIcon} alt="eyeIcon"/></InputAdornment>)}} />
                  </FormControl>
              </Box>

              <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel htmlFor="newPassword" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>New Password</FormLabel>
                    <TextField type={showNewPassword ? "text" : "password"} name="newPassword" value={passwordData.newPassword} onChange={handleChangePasswordInput} placeholder="***********************" fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}} InputProps={{ endAdornment:(<InputAdornment sx={{cursor:"pointer"}} onClick={()=>setShowNewPassword(!showNewPassword)} position="end"><img src={eyeIcon} alt="eyeIcon"/></InputAdornment>)}} />
                  </FormControl>
              </Box>

              <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel htmlFor="confirmNewPassword" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Confirm New Password</FormLabel>
                    <TextField type={showConfirmNewPassword ? "text" : "password"} name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handleChangePasswordInput} placeholder="***********************" fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}} InputProps={{ endAdornment:(<InputAdornment sx={{cursor:"pointer"}} onClick={()=>setShowConfirmNewPassword(!showConfirmNewPassword)} position="end"><img src={eyeIcon} alt="eyeIcon"/></InputAdornment>)}} />
                  </FormControl>
              </Box>

              <Box sx={{width:"100%", marginTop:"10px"}}>
                <Typography sx={{fontSize:"16px", fontWeight:"600",color:"#1F2937", textAlign:"start"}}>Password requirements:</Typography>
                <Typography sx={{marginTop:"4px", fontSize:"14px", fontWeight:"400",color:"#6B7280", textAlign:"start"}}>Ensure that these requirements are met:</Typography>

                <Box sx={{ display:"flex", flexDirection:"column", gap:"4px", marginLeft:"20px" }}>
                  <Typography sx={{fontSize:"12px", fontWeight:"400", color:"#6B7280", textAlign:"start"}}>At least 8 characters (and up to 16 characters)</Typography>
                  <Typography sx={{fontSize:"12px", fontWeight:"400", color:"#6B7280", textAlign:"start"}}>At least one uppercase character</Typography>
                  <Typography sx={{fontSize:"12px", fontWeight:"400", color:"#6B7280", textAlign:"start"}}>At least one lowercase character</Typography>
                  <Typography sx={{fontSize:"12px", fontWeight:"400", color:"#6B7280", textAlign:"start"}}>Inclusion of at least one special character, e.g., ! @ # ?</Typography>
                </Box>

             </Box>

              <Button type='submit' loading={isSubmitting} variant='contained' disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmNewPassword || isSubmitting} sx={{ borderRadius:"8px", marginTop:"10px", alignSelf:'start', backgroundColor:"#1A56DB", width:"120px", height:"40px"}}>Update</Button>
          </Box>
          </form>
        </Paper>

      </Box>

      <Box sx={{ width:"68%", display:"flex", flexDirection:"column", gap:"20px"}}>

        <Paper elevation={0} sx={{width:"100%", padding:"24px", backgroundColor:"#fff", borderRadius:"8px"  }} >
        <Typography sx={{ fontSize:"20px", fontWeight:"700", color:"#1F2937" }}>General information</Typography>
        <form onSubmit={handleUpdateUserInfo} style={{marginTop:"20px", width:"100%" , gap:"14px",display:"flex", flexDirection:"column"}}>

        <Box sx={{ width:"100%", display:"flex", gap:"20px" }}>

          <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
              <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                  <FormLabel  htmlFor="email" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Email</FormLabel>
                  <TextField type="email"  name="email" value={userInfoData.email} onChange={handleUserInfoChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
              </FormControl>
          </Box>

          <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                   <FormLabel  htmlFor="phoneNumber" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Phone Number</FormLabel>
                   <TextField type="text" name="phoneNumber" value={userInfoData.phoneNumber} onChange={handleUserInfoChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                </FormControl>
          </Box>

        </Box>


          <Box sx={{ width:"100%", display:"flex", gap:"20px" }}>
          <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
              <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                  <FormLabel  htmlFor="firstName" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>First Name</FormLabel>
                  <TextField type="text"  name="firstName" value={userInfoData.firstName} onChange={handleUserInfoChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
              </FormControl>
          </Box>

          <Box sx={{ width:"100%",display:"flex", gap:"8px"}}>
                <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                   <FormLabel htmlFor="secondName" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Second Name</FormLabel>
                   <TextField type="text" name="secondName" value={userInfoData.secondName} onChange={handleUserInfoChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                </FormControl>
          </Box>

        </Box>


        <Box sx={{ width:"100%", display:"flex", gap:"20px" }}>
          <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
              <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                  <FormLabel  htmlFor="lastName" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Last Name</FormLabel>
                  <TextField type="text"  name="lastName" value={userInfoData.lastName} onChange={handleUserInfoChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
              </FormControl>
          </Box>

          <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                   <FormLabel  htmlFor="nationalId" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>National Id Number</FormLabel>
                   <TextField type="number"  name="nationalId" value={userInfoData.nationalId} onChange={handleUserInfoChange} placeholder="" fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                </FormControl>
          </Box>
        </Box>

          <Box sx={{ width:"100%", display:"flex", gap:"20px" }}>
          <Box sx={{ width:"49%",display:"flex" , gap:"8px"}}>
              <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                  <FormLabel  htmlFor="address" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Address</FormLabel>
                  <TextField type="text"  name="address" value={userInfoData.address} onChange={handleUserInfoChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
              </FormControl>
          </Box>
        </Box>

        <Button variant='contained' type='submit' loading={updatingUserInfo} disabled={!userInfoData.firstName || !userInfoData.lastName || !userInfoData.nationalId || !userInfoData.phoneNumber || !userInfoData.email }  sx={{borderRadius:"8px", marginTop:"20px", backgroundColor:"#2563EB", alignSelf:"start", width:"120px", height:"40px"}}>Update</Button>

        </form>

        </Paper>

        <Paper elevation={0} sx={{ borderRadius:"8px", width:"100%", padding:"24px", backgroundColor:"#fff"}}>
          <Typography sx={{ fontSize:"20px", fontWeight:"700", color:"#1F2937" }}>Security and Notifications</Typography>
          <Box sx={{ width:"100%", display:"flex", flexDirection:"column", marginTop:"20px", gap:"32px"}}>

            <Box sx={{ width:"100%", display:"flex", gap:"20px",  alignItems:"center", justifyContent:"space-between" }}> 
              <Box sx={{ display:"flex", flexDirection:"column"}}>
                <Typography sx={{fontSize:"18px", fontWeight:"600", color:"#1F2937", textAlign:"start"}}>2FA Authentication</Typography>
                <Typography sx={{ fontWeight:"500", fontSize:"16px", textAlign:"start",color:"#4B5563" }}>Activate two Factor Authentication(2FA) for increased security and prevent unauthorized persons from accessing your account.</Typography>
              </Box>

              <Box sx={{ }}>
                <FormGroup>
                  <FormControlLabel label control={ <Switch name="twoFa" checked={securityAandNotificationsData.twoFa} onChange={handleSwitchChange}  sx={{'& .MuiSwitch-thumb': { backgroundColor: '#2563EB' },}}  />}/>
                </FormGroup> 
              </Box>
            </Box>


             <Box sx={{ width:"100%", display:"flex", gap:"20px",  alignItems:"center", justifyContent:"space-between" }}> 
              <Box sx={{ display:"flex", flexDirection:"column"}}>
                <Typography sx={{fontSize:"18px", fontWeight:"600", color:"#1F2937", textAlign:"start"}}>Account Activity</Typography>
                <Typography sx={{ fontWeight:"500", fontSize:"16px", textAlign:"start",color:"#4B5563" }}>Get important notifications about you or activity you've missed or associated with your account</Typography>
              </Box>

              <Box sx={{ }}>
                <FormGroup>
                  <FormControlLabel label control={ <Switch name="accountActivity" checked={securityAandNotificationsData.accountActivity} onChange={handleSwitchChange} sx={{'& .MuiSwitch-thumb': { backgroundColor: '#2563EB' },}} /> }/>
                </FormGroup> 
              </Box>
            </Box>

             <Box sx={{ width:"100%", display:"flex", gap:"20px",  alignItems:"center", justifyContent:"space-between" }}>
              <Box sx={{ display:"flex", flexDirection:"column"}}>
                <Typography sx={{fontSize:"18px", fontWeight:"600", color:"#1F2937", textAlign:"start"}}>New Messages</Typography>
                <Typography sx={{ fontWeight:"500", fontSize:"16px", textAlign:"start",color:"#4B5563" }}>Get Kodi House news, announcements, and product updates</Typography>
              </Box>

              <Box sx={{ }}>
                <FormGroup>
                  <FormControlLabel label control={ <Switch name="newMessages" checked={securityAandNotificationsData.newMessages} onChange={handleSwitchChange} sx={{'& .MuiSwitch-thumb': { backgroundColor: '#2563EB' },}} /> }/>
                </FormGroup> 
              </Box>
            </Box>
            <Button variant='contained' disabled={!Object.values(securityAandNotificationsData).some(Boolean)} sx={{ width:"120px", height:"40px", borderRadius:"8px", backgroundColor:"#2563EB"}}>Save</Button>

          </Box>
        </Paper>


      </Box>

    </Box>
  )
}

export default Profile