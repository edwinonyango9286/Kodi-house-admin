import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, MenuItem, Modal, Paper, Select, TextField, Typography, type SelectChangeEvent } from '@mui/material'
import React, { useState, type FormEvent,} from 'react'
import dropdownGreyIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown Icon grey.svg"
import {useTheme } from '@mui/material';
import { getModalStyle } from '../theme';
import cancelIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/cancel Icon.svg"
import type {ICreateRolePayload ,ICreatePermissionPayload, ICreatePropertyTypePayload, ICreatePropertyCategoryPayload, ICreatePropertyTagPayload, ICreateSupportTicketPayload } from "../types/types"
import { createRole } from '../components/services/roleService';
import { createPermission } from '../components/services/permissionServices';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import refreshIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/refresh icon.svg"
import filterIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/filter icon.svg"
import deleteIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon.svg"
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import printerIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import { createPropertyCategory, createPropertyTag, createPropertyType } from '../components/services/propertyTypeServices';
import { createSupportTicket } from '../components/services/supportTicketService';


const Setups:React.FC = () => {
  const [formData,setFormData] = useState<ICreateRolePayload>({roleName:"",description:"", status:""})
  const [permissionFormData, setPermissionFormData] = useState<ICreatePermissionPayload>({ permissionName: "", status:"", description:"" });
  const [propertyTypeData,setPropertyTypeData] = useState<ICreatePropertyTypePayload>({ propertyTypeName:"", status:"", description:"", })
  const [isSubmiting,setIsSubmitting] = useState<boolean>(false)
  const theme = useTheme()
  const modalStyles =  getModalStyle(theme.palette.mode)

  const [openAddRoleModal, setOpenAddRoleModal] = useState<boolean>(false);
  const handleOpenAddRoleModal = () => setOpenAddRoleModal(true);
  const handleCloseAddRoleModal = () =>{
    setOpenAddRoleModal(false);
    setFormData({ roleName:"", description:"",status:""})
  };

  const [openAddPermissionModal, setOpenAddPermissionModal] = useState<boolean>(false);
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

 const [creatingPermission,setCreatingPermission] = useState<boolean>(false)
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

  try {
    const response = await createRole(formData);
    console.log(response)

  } catch (error) {
    console.log(error)

  } finally{
    setIsSubmitting(false)
  }
 }

  const handleCreatePermission = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setCreatingPermission(true)

  try {
    const response = await createPermission(permissionFormData);
    console.log(response)

  } catch (error) {
    console.log(error)

  } finally{
    setCreatingPermission(false)
  }
 }


 const handleStatusChange = (e:SelectChangeEvent) => {
  setFormData((prev)=>({...prev,status:e.target.value as string }))
 }

 const handleStatusChangeForPermission = (e:SelectChangeEvent)=>{
  setPermissionFormData((prev)=>({...prev, status:e.target.value as string}))
 }


//  property type 
  const [creatingPropertyType, setCreatingPropertyType] = useState<boolean>(false)
  const [openPropertyTypeModal,setOpenPropertyTypeModal] = useState<boolean>(false);
  const handleOpenPropertyTypeModal = ()=> setOpenPropertyTypeModal(true)
  const handleClosePropertyTypeModal = ()=>{
    setOpenPropertyTypeModal(false)
    setPropertyTypeData({ propertyTypeName:"",status:"",description:"" })
  }

  const handlePropertyTypeChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    setPropertyTypeData((prev)=>({...prev,[name]:value}))
  }

 const handlePropertyTypeStatusChange = (e:SelectChangeEvent) =>{
  setPropertyTypeData((prev)=>({...prev,status:e.target.value as string}))
 }

   const handleCreatePropertyType = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setCreatingPropertyType(true)
    try {
      const response = await createPropertyType(propertyTypeData)
      return response 
    } catch (error) {
      console.log(error)
    }finally{
      setCreatingPropertyType(false)
    }
   }


  //  property category
  const [propertyCategoryData,setPropertyCategoryData] = useState<ICreatePropertyCategoryPayload>({propertyCategoryName:"", status:"", description:"" })
  const [creatingPropertyCategory, setCreatingPropertyCategory] = useState<boolean>(false)
  const [openPropertyCategoryModal,setOpenPropertyCategoryModal] = useState<boolean>(false);
  const handleOpenPropertyCategoryModal = ()=> setOpenPropertyCategoryModal(true)
  const handleClosePropertyCategoryModal = ()=>{
    setOpenPropertyCategoryModal(false)
    setPropertyCategoryData({ propertyCategoryName:"",status:"",description:"" })
  }

  const handlePropertyCategoryChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    setPropertyCategoryData((prev)=>({...prev,[name]:value}))
  }

 const handlePropertyCategoryStatusChange = (e:SelectChangeEvent) =>{
  setPropertyCategoryData((prev)=>({...prev,status:e.target.value as string}))
 }

   const handleCreatePropertyCategory = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setCreatingPropertyCategory(true)
    try {
      const response = await createPropertyCategory(propertyCategoryData)
      return response 
    } catch (error) {
      console.log(error)
    }finally{
      setCreatingPropertyCategory(false)
    }
   }


    //  property Tag
  const [propertyTagData,setPropertyTagData] = useState<ICreatePropertyTagPayload>({propertyTagName:"", status:"", description:"" })
  const [creatingPropertyTag, setCreatingPropertyTag] = useState<boolean>(false)
  const [openPropertyTagModal,setOpenPropertyTagModal] = useState<boolean>(false);
  const handleOpenPropertyTagModal = ()=> setOpenPropertyTagModal(true)
  const handleClosePropertyTagModal = ()=>{
    setOpenPropertyTagModal(false)
    setPropertyTagData({ propertyTagName:"",status:"",description:"" })
  }

  const handlePropertyTagChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    setPropertyTagData((prev)=>({...prev,[name]:value}))
  }

 const handlePropertyTagStatusChange = (e:SelectChangeEvent) =>{
  setPropertyTagData((prev)=>({...prev,status:e.target.value as string}))
 }

   const handleCreatePropertyTag = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setCreatingPropertyTag(true)
    try {
      const response = await createPropertyTag(propertyTagData)
      return response 
    } catch (error) {
      console.log(error)
    }finally{
      setCreatingPropertyTag(false)
    }
   }



   // support Ticket
  const [supportTicketData,setSupportTicketData] = useState<ICreateSupportTicketPayload>({supportTicketName:"", status:"", description:"" })
  const [creatingSupportTicket, setCreatingSupportTicket] = useState<boolean>(false)
  const [openSupportTicketModal,setOpenSupportTicketModal] = useState<boolean>(false);

  const handleOpenSupportTicketModal = ()=> setOpenSupportTicketModal(true)
  const handleCloseSupportTicketModal = ()=>{
    setOpenSupportTicketModal(false)
    setSupportTicketData({ supportTicketName:"",status:"",description:"" })
  }

  const handleSupportTicketChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    setSupportTicketData((prev)=>({...prev,[name]:value}))
  }

 const handleSupportTicketStatusChange = (e:SelectChangeEvent) =>{
  setSupportTicketData((prev)=>({...prev,status:e.target.value as string}))
 }

   const handleCreateSupportTicket = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setCreatingSupportTicket(true)
    try {
      const response = await createSupportTicket(supportTicketData)
      return response 
    } catch (error) {
      console.log(error)
    }finally{
      setCreatingSupportTicket(false)
    }
   }


 const columns:GridColDef[] = []
 const rows:[] = []


  return (
    <Box sx={{ width:"100%" }}>
      <Box sx={{ display:"flex", justifyContent:"space-between",gap:"20px"}}>
      <Paper elevation={0} sx={{ display:"flex", flexDirection:"column", gap:"20px", padding:"24px", width:"24%", height:"372px", backgroundColor:"#fff",boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)" }}>
          <Box sx={{display:"flex", flexDirection:"column", gap:"16px"}}>
            {sidebarItems.map((item)=>(<Typography onClick={()=>handleSidebarItemClick(item.id)}  key={item.id} variant='body2' sx={{ cursor:"pointer",color: selectedItem === item.id ? "#2563EB" :"#111827", fontSize:"16px" , fontWeight:"500"}}>{item.name}</Typography>))}        
         </Box>
      </Paper>

      { selectedItem === 1 && 

      <Paper elevation={0} sx={{ borderRadius:'8px', display:"flex", flexDirection:"column", gap:"20px", padding:"24px", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",width:"76%", height:"auto", backgroundColor:"#fff" }}>
        <Typography sx={{color:"#1F2937", fontSize:"20px", fontWeight:"700", textAlign:"start"}}>User Role and  Permission Editor</Typography>
        <Divider sx={{borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1",}}/>
        <Box sx={{ display:"flex", gap:"20px",alignItems:"center" }}>
          <Typography variant='body2' sx={{ fontSize:"18px", fontWeight:"500",color:"#374151"}}>Select Role and change its Permissions</Typography>
        <Box sx={{width:"24%",}}>
        <FormControl fullWidth>
          <Select id="role-select" value={selectedRole} onChange={handleSelectRole} sx={{ height:"48px", width:"100%"}} >
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
                     <Select id="permission-select" value={permission} onChange={handleChange} sx={{ height:"40px", width:"100%"}} >
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
                     <Select id='status-select'  value={formData.status} onChange={handleStatusChange} sx={{width:"100%"}} >
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

              <Button type='submit' loading={isSubmiting} variant='contained' disabled={!formData.roleName || !formData.status || !formData.description || isSubmiting} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
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

              <Button type='submit' loading={creatingPermission} variant='contained' disabled={!permissionFormData.permissionName || !permissionFormData.status || !permissionFormData.description || creatingPermission} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
         </form>

        </Box>
      </Modal>

      </Paper>}



    { selectedItem === 2 && 
      <Paper elevation={0} sx={{ borderRadius:"8px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",width:"76%", height:"auto", backgroundColor:"#fff" }}>
        <Button onClick={handleOpenPropertyTypeModal} variant='contained' sx={{ alignSelf:"start", backgroundColor:"#2563EB", fontSize:"14px", fontWeight:"500", borderRadius:"4px", height:"40px", textAlign:"start"}}>+ New property type</Button>

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

        {/* add property modal */}

      <Modal open={openPropertyTypeModal} onClose={handleClosePropertyTypeModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyles}>
          <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
             <Typography id="modal-modal-title" sx={{fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Create property type</Typography>
             <IconButton onClick={handleClosePropertyTypeModal}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
          </Box>

         <form  onSubmit={handleCreatePropertyType} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"start" ,marginTop:"20px"}}>
            <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                     <FormLabel  htmlFor="propertyTypeName" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Property Type Name</FormLabel>
                     <TextField type="text"  name="propertyTypeName" value={propertyTypeData.propertyTypeName} onChange={handlePropertyTypeChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>

                <Box sx={{ width:"100%",}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='status-select'  value={propertyTypeData.status} onChange={handlePropertyTypeStatusChange} sx={{width:"100%"}} >
                       {roleStatus.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Description</FormLabel>
                    <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={propertyTypeData.description} onChange={handlePropertyTypeChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
              </Box>

              <Button type='submit' loading={creatingPropertyType} variant='contained' disabled={!propertyTypeData.propertyTypeName || !propertyTypeData.status || !propertyTypeData.description || creatingPropertyType} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
         </form>

        </Box>
      </Modal>
    </Paper>
    }

    { selectedItem === 3 &&
     <Paper elevation={0} sx={{ borderRadius:"8px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",width:"76%", height:"auto", backgroundColor:"#fff" }}>
        <Button onClick={handleOpenPropertyCategoryModal} variant='contained' sx={{ alignSelf:"start", backgroundColor:"#2563EB", fontSize:"14px", fontWeight:"500", borderRadius:"4px", height:"40px", textAlign:"start"}}>+ New property categories</Button>

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

        {/* add property category modal */}

      <Modal open={openPropertyCategoryModal} onClose={handleClosePropertyCategoryModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyles}>
          <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
             <Typography id="modal-modal-title" sx={{fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Create property category</Typography>
             <IconButton onClick={handleClosePropertyCategoryModal}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
          </Box>

         <form  onSubmit={handleCreatePropertyCategory} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"start" ,marginTop:"20px"}}>
            <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                     <FormLabel  htmlFor="propertyCategoryName" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Property Category Name</FormLabel>
                     <TextField type="text"  name="propertyCategoryName" value={propertyCategoryData.propertyCategoryName} onChange={handlePropertyCategoryChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>

                <Box sx={{ width:"100%",}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='status-select'  value={propertyCategoryData.status} onChange={handlePropertyCategoryStatusChange} sx={{width:"100%"}} >
                       {roleStatus.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Description</FormLabel>
                    <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={propertyCategoryData.description} onChange={handlePropertyCategoryChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
              </Box>

              <Button type='submit' loading={creatingPropertyCategory} variant='contained' disabled={!propertyCategoryData.propertyCategoryName || !propertyCategoryData.status || !propertyCategoryData.description || creatingPropertyCategory} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
         </form>

        </Box>
      </Modal>
    </Paper>
    }


      { selectedItem === 4 &&
     <Paper elevation={0} sx={{ borderRadius:"8px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",width:"76%", height:"auto", backgroundColor:"#fff" }}>
        <Button onClick={handleOpenPropertyTagModal} variant='contained' sx={{ alignSelf:"start", backgroundColor:"#2563EB", fontSize:"14px", fontWeight:"500", borderRadius:"4px", height:"40px", textAlign:"start"}}>+ New property tag</Button>

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

        {/* add property tag */}

      <Modal open={openPropertyTagModal} onClose={handleClosePropertyTagModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyles}>
          <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
             <Typography id="modal-modal-title" sx={{fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Create property tag</Typography>
             <IconButton onClick={handleClosePropertyTagModal}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
          </Box>

         <form  onSubmit={handleCreatePropertyTag} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"start" ,marginTop:"20px"}}>
            <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                     <FormLabel  htmlFor="propertyTagName" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Property Tag Name</FormLabel>
                     <TextField type="text"  name="propertyTagName" value={propertyTagData.propertyTagName} onChange={handlePropertyTagChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>

                <Box sx={{ width:"100%",}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='status-select'  value={propertyTagData.status} onChange={handlePropertyTagStatusChange} sx={{width:"100%"}} >
                       {roleStatus.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Description</FormLabel>
                    <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={propertyTagData.description} onChange={handlePropertyTagChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
              </Box>

              <Button type='submit' loading={creatingPropertyTag} variant='contained' disabled={!propertyTagData.propertyTagName || !propertyTagData.status || !propertyTagData.description || creatingPropertyTag} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
         </form>

        </Box>
      </Modal>
    </Paper>
    }



    { selectedItem === 5 &&
     <Paper elevation={0} sx={{ borderRadius:"8px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",width:"76%", height:"auto", backgroundColor:"#fff" }}>
        <Button onClick={handleOpenSupportTicketModal} variant='contained' sx={{ alignSelf:"start", backgroundColor:"#2563EB", fontSize:"14px", fontWeight:"500", borderRadius:"4px", height:"40px", textAlign:"start"}}>+ New Support ticket type</Button>

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

        {/* add support ticket modal */}

      <Modal open={openSupportTicketModal} onClose={handleCloseSupportTicketModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyles}>
          <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
             <Typography id="modal-modal-title" sx={{fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Create new support ticket type</Typography>
             <IconButton onClick={handleCloseSupportTicketModal}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
          </Box>

         <form  onSubmit={handleCreateSupportTicket} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"start" ,marginTop:"20px"}}>
            <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                     <FormLabel  htmlFor="supportTicketName" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Support Ticket Type Name</FormLabel>
                     <TextField type="text"  name="supportTicketName" value={supportTicketData.supportTicketName} onChange={handleSupportTicketChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>

                <Box sx={{ width:"100%",}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='status-select'  value={supportTicketData.status} onChange={handleSupportTicketStatusChange} sx={{width:"100%"}} >
                       {roleStatus.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Description</FormLabel>
                    <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={supportTicketData.description} onChange={handleSupportTicketChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
              </Box>

              <Button type='submit' loading={creatingSupportTicket} variant='contained' disabled={!supportTicketData.supportTicketName || !supportTicketData.status || !supportTicketData.description || creatingSupportTicket} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
         </form>

        </Box>
      </Modal>
    </Paper>
    }

      </Box>
    </Box>
  )
}

export default Setups
