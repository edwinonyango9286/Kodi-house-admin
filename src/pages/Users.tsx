import { Box, Button, Divider, FormControl, FormLabel, IconButton, InputAdornment, MenuItem, Modal, Paper, Select, TextField, Typography, useTheme, type SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'
import dropdownGreyIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown Icon grey.svg"
import refreshIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/refresh icon.svg"
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import filterIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/filter icon.svg"
import deleteIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon.svg"
import printerIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/printer icon.svg"
import { DataGrid } from '@mui/x-data-grid'
import type { IAddUserPayload } from '../types/types'
import { getModalStyle } from '../theme'
import cancelIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/cancel Icon.svg"
import { addUser } from '../components/services/userServices'

const Users = () => {
  const [userFormData,setUserFormData] = useState<IAddUserPayload>({firstName:"", lastName:"", status:"", role:"",email:"",phoneNumber:"",description:"" })
  const [isSubmiting,setIsSubmitting] = React.useState<boolean>(false)

  const columns =[] 
  const rows = []

  const theme = useTheme();
  const modalStyles = getModalStyle(theme.palette.mode);

  const [openAddUserModal,setOpenAddUserModal] = React.useState(false);

  const handleOpenAddUserModal =()=> setOpenAddUserModal(true);
  const handleCloseAddUserModel = () => {
    setOpenAddUserModal(false);
    setUserFormData({ firstName:"", lastName:"", status:"", role:"", email:"", description:"", phoneNumber:""}) 
  }

  const handleCreateUser = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setIsSubmitting(true);

    const userData = {
      firstName:userFormData.firstName,
      lastName:userFormData.lastName,
      status:userFormData.status, 
      role:userFormData.role,
      email:userFormData.email, 
      description:userFormData.description, 
      phoneNumber:userFormData.phoneNumber
    }
    try {
      const response = await addUser(userData)
      console.log(response)
    } catch (error) {
      console.log(error)
    }finally{
      setIsSubmitting(false)
    }
  }

  const userStatus = [
    {id:1,name:"Active"},
    {id:1, name:"Inactive"}
  ]

  const handleSelectUserStatus = (e:SelectChangeEvent) => {
    setUserFormData((prev) =>({...prev, status:e.target.value as string}))
  } 

  const handleAddUserChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name,value}  = e.target
    setUserFormData((prev)=>({...prev,[name]:value }))
  }

  const handleSelectRole = (e:SelectChangeEvent) => {
    setUserFormData((prev)=>({...prev, role:e.target.value as string}))
  }

  const roles = [
    {id:1, name:"SuperAdmin"},
    {id:2, name:"Admin"},
    {id:3, name:"landlord"},
    {id:4, name:"Tenant"},
    {id:5, name:"User"}
  ]

  
  return (
     <Box sx={{width:"100%",}}>
      <Paper elevation={0} sx={{ borderRadius:"4px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", width:"100#", backgroundColor:"#fff", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"}}>
        <Typography sx={{fontSize:"18px", fontWeight:"600",textAlign:"start", color:"#2C2E3E"}}>Users  Overview</Typography>
         <Button onClick={handleOpenAddUserModal} variant='contained' sx={{backgroundColor:"#2563EB",height:"48px", width:"120px", fontSize:"14px", fontWeight:"500"}}>+ Add user</Button>

        <Divider sx={{ borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1"}}/>
        <Box sx={{ width:"100%", display:"flex", justifyContent:"space-between"}}>

          <Box sx={{height:"42px", alignItems:"center", padding:"8px", width:"100px", borderRadius:"8px", border:"1px solid #D1D5DB", display:"flex", justifyContent:"space-between"}}>
            <Typography variant='body2' sx={{ color:"#4B5563",fontSize:"14px", fontWeight:"500", textAlign:"start"}}>10</Typography>
            <img src={dropdownGreyIcon} alt="dropdownGreyIcon" />
            <Divider orientation='vertical' sx={{height:"42px", backgroundColor:"#9CA3AF",borderWidth:"1px"}}/>
            <img src={refreshIcon} alt="refreshIcon" />
          </Box>
          <Box sx={{ display:"flex", gap:"20px"}}>
            <TextField placeholder='Search' sx={{ width:"190px"}} InputProps={{ startAdornment:(<InputAdornment position='start'><img src={searchIcon} alt="searchIcon" style={{width:"20px", height:"20px"}} /></InputAdornment>),sx:{width:"200px", height:"42px"} }}/>
             <Box sx={{ height:"42px", width:"100px", borderRadius:"8px",border:"1px solid #D1D5DB", display:"flex", alignItems:"center", justifyContent:"space-between",paddingX:"10px"}}>
               <Typography sx={{ color:"#4B5563", fontSize:"14px", fontWeight:"500", textAlign:"start"}}>Newest</Typography>
               <img src={filterIcon} alt="filterIcon" style={{width:"20px", height:"20px"}} />
             </Box>
             <Box sx={{ borderRadius:"8px", border:"1px solid #D1D5DB", height:"42px", width:"50px", display:"flex", alignItems:"center", justifyContent:"center"}}>
              <img src={deleteIcon} alt="deleteIcon" style={{ height:"24px", width:"24px"}} />
             </Box>
             <Box sx={{ borderRadius:"8px", border:"1px solid #D1D5DB", height:"42px", width:"50px", display:"flex", alignItems:"center", justifyContent:"center"}}>
              <img src={printerIcon} alt="printerIcon" style={{ height:"24px", width:"24px"}} />
             </Box>
          </Box>
        </Box>

        <Box sx={{width:"100%", height:"500px", marginTop:"20px"}}>
          <DataGrid sx={{ width:"100%"}} columns={columns} rows={rows} pageSizeOptions={[10,20,50,100]}/>
        </Box>

       {/* add user modal */}
         <Modal open={openAddUserModal} onClose={handleCloseAddUserModel} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box style={{width:"600px" }} sx={modalStyles}>
                  <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
                     <Typography id="modal-modal-title" sx={{fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Add New User</Typography>
                     <IconButton onClick={handleCloseAddUserModel}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
                  </Box>
        
                 <form onSubmit={handleCreateUser} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"start" ,marginTop:"20px"}}>

                    <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                          <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                             <FormLabel  htmlFor="role" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937"}}>Role</FormLabel>
                             <Select value={userFormData.role} onChange={handleSelectRole} sx={{width:'100%', borderRadius:"8px"}}>
                              {roles.map((role)=>(<MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>)) }
                             </Select>
                          </FormControl>
                     </Box>

                     <Box sx={{ width:"100%", display:"flex",gap:"10px"}}>
                        <Box sx={{ width:"50%",display:"flex" , gap:"8px"}}>
                          <FormControl fullWidth sx={{ display:"flex",flexDirection:"column", gap:"8px", width:"100%"}}>
                             <FormLabel  htmlFor="firstName" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>First Name</FormLabel>
                             <TextField type="text"  name="firstName" value={userFormData.firstName} onChange={handleAddUserChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                          </FormControl>
                     </Box>
                       <Box sx={{ width:"50%",display:"flex" , gap:"8px"}}>
                          <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                             <FormLabel  htmlFor="lastName" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Last Name</FormLabel>
                             <TextField type="text"  name="lastName" value={userFormData.lastName} onChange={handleAddUserChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                          </FormControl> 
                     </Box>
                     </Box>


                       <Box sx={{ width:"100%", display:"flex",gap:"10px"}}>
                        <Box sx={{ width:"50%",display:"flex" , gap:"8px"}}>
                          <FormControl fullWidth sx={{ display:"flex",flexDirection:"column", gap:"8px", width:"100%"}}>
                             <FormLabel  htmlFor="email" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>User Email</FormLabel>
                             <TextField type="text"  name="email" value={userFormData.email} onChange={handleAddUserChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                          </FormControl>
                     </Box>
                       <Box sx={{ width:"50%",display:"flex" , gap:"8px"}}>
                          <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                             <FormLabel  htmlFor="phoneNumber" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Phone Number</FormLabel>
                             <TextField type="text"  name="phoneNumber" value={userFormData.phoneNumber} onChange={handleAddUserChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                          </FormControl> 
                     </Box>
                     </Box>

                        <Box sx={{ width:"100%",}}>
                         <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                             <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                             <Select  value={userFormData.status} onChange={handleSelectUserStatus} sx={{width:"100%"}} >
                               {userStatus.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                             </Select>
                        </FormControl>
                        </Box> 
        
                        <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                          <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                            <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937"}}>Description</FormLabel>
                            <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={userFormData.description} onChange={handleAddUserChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                          </FormControl>
                      </Box>
        
                      <Button type='submit' loading={isSubmiting} variant='contained' disabled={!userFormData.firstName || !userFormData.lastName || !userFormData.description || !userFormData.email || !userFormData.phoneNumber || !userFormData.role || !userFormData.status || isSubmiting } sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
                 </form>
        
                </Box>
              </Modal>

      </Paper>

    </Box>
  )
}

export default Users
