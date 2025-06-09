import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, IconButton, MenuItem, Modal, Paper, Select, TextField, Typography,type SelectChangeEvent } from '@mui/material'
import React, { useState,} from 'react'
import dropdownGreyIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown Icon grey.svg"
import {useTheme } from '@mui/material';
import { getModalStyle } from '../theme';
import cancelIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/cancel Icon.svg"
import type {ICreateRolePayload ,ICreatePermissionPayload } from "../types/types"
import { createRole } from '../components/services/roleService';
import { createPermission } from '../components/services/permissionServices';


const Setups:React.FC = () => {
  const [formData,setFormData] = useState<ICreateRolePayload>({roleName:"",description:"", status:""})
  const [permissionFormData, setPermissionFormData] = useState<ICreatePermissionPayload>({ permissionName: "", status:"", description:"" })
  const [isSubmiting,setIsSubmitting] = React.useState<boolean>(false)
  const theme = useTheme()
  const modalStyles =  getModalStyle(theme.palette.mode)

  const [openAddRoleModal, setOpenAddRoleModal] = React.useState(false);
  const handleOpenAddRoleModal = () => setOpenAddRoleModal(true);
  const handleCloseAddRoleModal = () =>{
    setOpenAddRoleModal(false);
    setFormData({ roleName:"", description:"",status:""})
  };

  const [openAddPermissionModal, setOpenAddPermissionModal] = React.useState(false);
  const handleOpenAddPermissionModal = () => setOpenAddPermissionModal(true);
  const handleCloseAddPermissionModal = () =>{
    setOpenAddPermissionModal(false);
    setPermissionFormData({permissionName:"", status:"", description:""})
  }


  interface sidebarItem {
    id:number,
    name:string,
  }


  const sidebarItems:sidebarItem[] = [
    {id:1,name:"Roles and Permissions "},
    {id:2,name:"Property types"},
    {id:3,name:"Property categories"},
    {id:4,name:"Property tags"},
    {id:5,name:"Support ticket types"},
    {id:6,name:"Email templates"},
    {id:7,name:"Sms templates"},
    {id:8,name:"Categories"},
    {id:9,name:"Tags"},
  ]

  const [selectedItem,setSelectedItem]  = React.useState<number>(1)

  const handleSidebarItemClick = (id: number) => {
    setSelectedItem(id);
  };


  const [permission,setPermission] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
   setPermission(event.target.value as string);
  };

  const [selectedRole,setSelectedRole] = React.useState('');
  const handleSelectRole = (event: SelectChangeEvent) => {
   setSelectedRole(event.target.value as string);
  };

  const roles = [
    {id:1, name:"SuperAdmin"},
    {id:2, name:"Admin"},
    {id:3, name:"Landlord"},
    {id:4, name:"Tenant"},
    {id:5, name:"user"},
  ]

   const permissions = [
    {id:1, name:"unfiltered_html"},
    {id:2, name:"delete_others_posts"},
    {id:3, name:"view_site_health_checks"},
    {id:4, name:"manage_categories"},
    {id:5, name:"edit_published_posts"},
    {id:6, name:"create_posts"},
    {id:7, name:"install_languages"},
    {id:8, name:"delete_published_posts"},
    {id:9, name:"unfiltered_upload"},
    {id:10, name:"edit_posts"},
    {id:11, name:"delete_private_posts"},
    {id:12, name:" edit_others_posts"},
    {id:13, name:" update_core"},
    {id:14, name:" delete_posts"},
    {id:15, name:"edit_dashboard"},
    {id:16, name:" publish_posts"},
  ]


    const handleChecked = ()=>{
  }

 const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target
  setFormData((prev)=>({...prev, [name]:value}))
 }

 const handleInputChangeForPermissions = (e:React.ChangeEvent<HTMLInputElement>) =>{
  const {name,value} = e.target
  setPermissionFormData((prev)=>({ ...prev,[name]:value}))
 }

 const roleStatus = [
  {id:1,name:"Active"},
  {id:2,name:"Inactive"},
 ]

 const handleCreateRole = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true)

    const roleData = {
      roleName:formData.roleName,
      description:formData.description,
      status:formData.status
    }
  try {
    const response = await createRole(roleData);
    console.log(response)

  } catch (error) {
    console.log(error)

  } finally{
    setIsSubmitting(false)
  }
 }

  const handleCreatePermission = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true)

    const permissionData = {
      permissionName:permissionFormData.permissionName,
      description:permissionFormData.description,
      status:permissionFormData.status
    }
  try {
    const response = await createPermission(permissionData);
    console.log(response)

  } catch (error) {
    console.log(error)

  } finally{
    setIsSubmitting(false)
  }
 }


 const handleStatusChange = (e:SelectChangeEvent) => {
  setFormData((prev)=>({...prev,status:e.target.value as string }))
 }

 const handleStatusChangeForPermission = (e:SelectChangeEvent)=>{
  setPermissionFormData((prev)=>({...prev, status:e.target.value as string}))
 }

  return (
    <Box sx={{ width:"100%" }}>
      <Box sx={{ display:"flex", justifyContent:"space-between",gap:"20px"}}>
      <Paper elevation={0} sx={{ display:"flex", flexDirection:"column", gap:"20px", padding:"24px", width:"24%", height:"372px", backgroundColor:"#fff",boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)" }}>
          <Box sx={{display:"flex", flexDirection:"column", gap:"16px"}}>
            {sidebarItems.map((item)=>(<Typography onClick={()=>handleSidebarItemClick(item.id)}  key={item.id} variant='body2' sx={{ cursor:"pointer",color: selectedItem === item.id ? "#2563EB" :"#111827", fontSize:"16px" , fontWeight:"500"}}>{item.name}</Typography>))}        
         </Box>
      </Paper>

      { selectedItem === 1 && <Paper elevation={0} sx={{ display:"flex", flexDirection:"column", gap:"20px", padding:"24px", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",width:"76%", height:"auto", backgroundColor:"#fff" }}>
        <Typography sx={{color:"#1F2937", fontSize:"20px", fontWeight:"700", textAlign:"start"}}>User Role and  Permission Editor</Typography>
        <Divider sx={{borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1",}}/>
        <Box sx={{ display:"flex", gap:"20px",alignItems:"center" }}>
          <Typography variant='body2' sx={{ fontSize:"18px", fontWeight:"500",color:"#374151"}}>Select Role and change its Permissions</Typography>
        <Box sx={{width:"24%",}}>
        <FormControl fullWidth>
          <Select id="demo-simple-select" value={selectedRole} onChange={handleSelectRole} sx={{ height:"48px", width:"100%"}} >
            {roles.map((role)=>(<MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>))}
         </Select>
        </FormControl>
        </Box>
        </Box>
        <Divider sx={{ width:"100%", borderWidth:"1px", backgroundColor:"#DDDFE1"}}/>

        <Box sx={{ display:"flex",width:"100%",justifyContent:"space-between" }}>
          <Box sx={{ width:"24%", display:"flex", flexDirection:"column",gap:"10px"}}>
            <Typography sx={{fontSize:"18px", fontWeight:"600", color:"#1F2937", textAlign:"start" }}>Group <span style={{ fontSize:"14px", fontWeight:"400", color:"#4B5563" }}>(Granted/Total)</span></Typography>
            <Divider sx={{width:"100%", borderWidth:"1px", backgroundColor:"#EDF2F6)" }} />
            <Box sx={{display:"flex", flexDirection:"column", gap:"10px"}}>
              <Typography sx={{color:"#4B5563", fontSize:"16px", fontWeight:"600", textAlign:"start"}}>All (125/39)</Typography>
              <Box sx={{marginLeft:"10px",display:"flex", flexDirection:"column", gap:"10px"}}>
                <Typography sx={{color:"#4B5563", fontSize:"14px", fontWeight:"400", textAlign:"start"}}>- Agents (35/65)</Typography>
                <Typography sx={{color:"#4B5563", fontSize:"14px", fontWeight:"400", textAlign:"start"}}>- General (7/10)</Typography>
              </Box>
            </Box>
          </Box>
            <Divider  orientation='vertical' sx={{ height:"100%", borderWidth:"1px",}}/>

           <Box sx={{ width:"52%", display:"flex", flexDirection:"column",gap:"10px",}}>
             <Box sx={{marginTop:"-13px", width:"100%", paddingX:"24px", display:"flex", alignItems:"center",gap:"20px"}}>
              <Box sx={{ alignItems:"center", gap:"10px", width:"100%", display:"flex"}}>
                <Typography sx={{color:"#4B5563" , fontSize:"14px", fontWeight:"400", textAlign:"start" }}>Quick filter:</Typography>
                <Box sx={{ width:"40%",}}>
                 <FormControl fullWidth>
                     <Select id="demo-simple-select" value={permission} onChange={handleChange} sx={{ height:"40px", width:"100%"}} >
                       {permissions.map((permission)=>(<MenuItem key={permission.id} value={permission.id}>{permission.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

                 <Box sx={{ marginLeft:"20px" }}>
                   <FormControlLabel label="Granted" sx={{ "& .MuiFormControlLabel-label":{
                      fontSize:"14px", color:"#4B5563", fontWeight:"400"
                     }}}  control={<Checkbox size='small' onChange={handleChecked}/>}/> 
                  </Box>
                  <Box sx={{ justifyContent:"center", border: "1px solid  #D1D5DB", width:"84px",height:"40px", borderRadius:"8px", display:"flex", alignItems:"center"}}>
                    <Typography sx={{color:"#6B7280", fontSize:"16px", fontWeight:"400", paddingX:"10px" }}>10</Typography>
                    <img src={dropdownGreyIcon} alt={dropdownGreyIcon} style={{width:"24px", height:"24px"}} />
                  </Box>

              </Box>
            
            </Box>
            <Divider sx={{width:"100%", borderWidth:"1px", backgroundColor:"#EDF2F6)" }} />

            <Box sx={{display:"flex", flexDirection:"column", gap:"10px", paddingX:"24px"}}>
              <Box sx={{marginLeft:"10px",display:"flex", flexDirection:"column", gap:"10px"}}>
                 <Box sx={{display:"flex",flexDirection:"column",}}>
                   {permissions.map((permission)=>(<FormControlLabel key={permission.id} label={permission.name} sx={{ "& .MuiFormControlLabel-label":{
                      fontSize:"14px", color:"#4B5563", fontWeight:"400"
                     }}}  control={<Checkbox size='small' key={permission.id} onChange={handleChecked}/>}/> )) }
                  </Box>
              </Box>
            </Box>

          </Box>

            <Divider  orientation='vertical' sx={{ height:"100%", borderWidth:"1px"}}/>
           <Box sx={{ width:"24%", display:"flex", flexDirection:"column",gap:"10px"}}>
            <Typography sx={{fontSize:"18px", fontWeight:"600", color:"#1F2937", textAlign:"start", visibility:"hidden"}}>Navigations</Typography>
            <Divider  sx={{width:"100%", borderWidth:"1px", backgroundColor:"#EDF2F6)" }} />
            <Box sx={{marginTop:"20px", width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
              <Box sx={{height:"auto",backgroundColor:"#F5F5F5", padding:"24px", display:"flex", flexDirection:"column", gap:"10px",borderRadius:"4px", width:"80%"}}>
                <Button variant='contained' sx={{height:"48px" , backgroundColor:"#2563EB", color:"#fff", borderRadius:"8px", fontSize:"14px", fontWeight:"500" , boxShadow:"none",":hover":{ boxShadow:"none"}}}>Update</Button>
                <Button onClick={handleOpenAddRoleModal} variant='contained' sx={{height:"48px" , backgroundColor:"#FFF", color:"#344054", borderRadius:"8px", fontSize:"14px", fontWeight:"500" , boxShadow:"none", ":hover":{boxShadow:"none"}}}>Add role</Button>
                <Button variant='contained' sx={{height:"48px" , backgroundColor:"#FFF", color:"#344054", borderRadius:"8px", fontSize:"14px", fontWeight:"500" ,boxShadow:"none", ":hover":{boxShadow:"none"} }}>Rename Role</Button>
                <Button onClick={handleOpenAddPermissionModal} variant='contained' sx={{height:"48px" , backgroundColor:"#FFF", color:"#344054", borderRadius:"8px", fontSize:"14px", fontWeight:"500" , boxShadow:"none" ,":hover":{boxShadow:"none"} }}>Add permission</Button>
                <Button variant='contained' sx={{height:"48px" , backgroundColor:"#FFF", color:"#344054", borderRadius:"8px", fontSize:"14px", fontWeight:"500" , boxShadow:"none", ":hover":{ boxShadow:"none"} }}>Delete permission</Button>
              </Box>
            </Box>
          </Box>

        </Box>
        <Divider sx={{ marginBottom:"30px", borderWidth:"1px", backgroundColor:"#F6F7F7"}}/>

        {/* add role modal */}


        <Modal open={openAddRoleModal} onClose={handleCloseAddRoleModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyles}>
          <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
             <Typography id="modal-modal-title" sx={{fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Create new role</Typography>
             <IconButton onClick={handleCloseAddRoleModal}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
          </Box>

         <form onSubmit={handleCreateRole} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"start" ,marginTop:"20px"}}>
            <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                     <FormLabel  htmlFor="roleName" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Role Name</FormLabel>
                     <TextField type="text"  name="roleName" value={formData.roleName} onChange={handleInputChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>

                <Box sx={{ width:"100%",}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select  value={formData.status} onChange={handleStatusChange} sx={{width:"100%"}} >
                       {roleStatus.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Description</FormLabel>
                    <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={formData.description} onChange={handleInputChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
              </Box>

              <Button type='submit' loading={isSubmiting} variant='contained' disabled={!formData.roleName || !formData.status || !formData.description} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
         </form>

        </Box>
      </Modal>


        {/* add permission modal */}
       <Modal open={openAddPermissionModal} onClose={handleCloseAddPermissionModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyles}>
          <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
             <Typography id="modal-modal-title" sx={{fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Create permission</Typography>
             <IconButton onClick={handleCloseAddPermissionModal}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
          </Box>

         <form onSubmit={handleCreatePermission} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"start" ,marginTop:"20px"}}>
            <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                     <FormLabel  htmlFor="PermissionName" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Permission Name</FormLabel>
                     <TextField type="text"  name="permissionName" value={permissionFormData.permissionName} onChange={handleInputChangeForPermissions} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>

                <Box sx={{ width:"100%",}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select  value={permissionFormData.status} onChange={handleStatusChangeForPermission} sx={{width:"100%"}} >
                       {roleStatus.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Description</FormLabel>
                    <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={permissionFormData.description} onChange={handleInputChangeForPermissions} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
              </Box>

              <Button type='submit' loading={isSubmiting} variant='contained' disabled={!permissionFormData.permissionName || !permissionFormData.status || !permissionFormData.description} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
         </form>

        </Box>
      </Modal>

    </Paper>}

      </Box>
    </Box>
  )
}

export default Setups
