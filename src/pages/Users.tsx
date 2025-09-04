import { Box, Button, Divider, FormControl, FormLabel, IconButton, InputAdornment, Menu, MenuItem, Modal, Paper, Select, TextField, Typography, useTheme, type SelectChangeEvent } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import dropdownGreyIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown Icon grey.svg"
import refreshIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/refresh icon.svg"
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import filterIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/filter icon.svg"
import deleteIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon.svg"
import printerIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/printer icon.svg"
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import type { AddUserPayload } from '../interfaces/interfaces'
import { getModalStyle } from '../theme'
import cancelIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/cancel Icon.svg"
import { addUser, listSystemUsers } from '../components/services/userServices'
import deleteIconSmall from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon small.svg"
import editIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/edit icon.svg"
import dotsVertical from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dots vertical icon.svg"
import { showErrorToast, showInfoToast } from '../utils/toast'
import { listRoles } from '../components/services/roleService'
import { dateFormatter } from '../utils/dateFormatter'
import type { AxiosError } from 'axios'
import { useDebounce } from '../hooks/useDebounce'

const Users = () => {
  interface User {
    _id:string
    firstName:string,
    lastName:string,
    email:string,
    role:{
      name:string,
    },
    description:string,
    createdAt:Date,
    status:string,
    createdBy:{
      userName:string
    }
  }

  const [userFormData,setUserFormData] = useState<AddUserPayload>({firstName:"", lastName:"", status:"", role:"",email:"",phoneNumber:"",description:"" })
  const [isSubmiting,setIsSubmitting] = React.useState<boolean>(false)
  const [usersList,setUsersList] = useState<User[]>([]);
  const [fetchingUsers,setFetchingUser] = useState<boolean>(false)


  const theme = useTheme();
  const modalStyles = getModalStyle(theme.palette.mode);

  const [openAddUserModal,setOpenAddUserModal] = React.useState(false);

  const handleOpenAddUserModal =()=> setOpenAddUserModal(true);
  const handleCloseAddUserModal = () => {
    setOpenAddUserModal(false);
    setUserFormData({ firstName:"", lastName:"", status:"", role:"", email:"", description:"", phoneNumber:""}) 
  }
  const [usersCount,setUsersCount] =  useState(0);
  const [paginationModel,setPaginationModel] = useState({ page:0, pageSize:10});
  const [searchQuery,setSearchQuery] = useState("");
  const [sortOption,setSortOption] = useState("-createdAt");
  const debouncedSearchQuery = useDebounce(searchQuery,500);
  

  const listAllUser =  useCallback(async () => { 
    setFetchingUser(true)
    try {

      const params: Record<string, string | number > = {
        page:paginationModel.page +1,
        limit:paginationModel.pageSize,
        sort: sortOption
      }

      if (debouncedSearchQuery.trim()) {
      params.search = debouncedSearchQuery.trim();
      }

      const response =  await listSystemUsers(params)
      if(response.status === 200){
        setUsersList(response.data.data)
        setUsersCount(response.data.totalCount)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setFetchingUser(false)
    }
  },[paginationModel, debouncedSearchQuery, sortOption])

  useEffect(()=>{
  listAllUser()
  },[listAllUser])

  const handleCreateUser = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await addUser(userFormData)
      if(response.status === 201){
        showInfoToast(response.data.message)
        handleCloseAddUserModal()
        listAllUser()
      }
    } catch (err) {
      const error = err as AxiosError<{message?:string}>
      showErrorToast(error?.response?.data?.message || error.message)
    }finally{
      setIsSubmitting(false)
    }
  }

  const userStatus = [
    {id:1,name:"Active"},
    {id:2, name:"Disabled"}
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
    console.log(userFormData.role,"userRole")
  }

  const usersColumns:GridColDef[] = [
    {field:"name",headerName:"Name", flex:1},
    {field:"email", headerName:"Email", flex:1},
    {field:"role", headerName:"Role", flex:1},
    {field:"description", headerName:"Description",flex:1},
    {field:"createdAt", headerName:"Date Added", flex:1},
    {field:"createdBy",headerName:"Added By", flex:1},
    {field:"status",headerName:"Status", flex:1 , renderCell:(params)=>(
      <Typography sx={{ borderRadius:"16px", width: params.value === "Active" ? "62px" :"80px", padding:"2px 8px", backgroundColor: params.value === "Active" ? "#ECFDF3" :"#F2F4F7", marginTop:"10px", color: params.value === "Active" ? "#027A48" : "#344054" }}>{params.value}</Typography>
  )},

    {field:"action", headerName:"Action",flex:1, renderCell:(()=>(
      <Box sx={{ display:"flex",gap:"10px"}}>
        <IconButton> <img src={editIcon} alt="editIcon" style={{ width:"24px", height:"24px"}}/></IconButton>
        <IconButton> <img src={deleteIconSmall} alt="deleteIconSmall" style={{ width:"24px", height:"24px"}} /></IconButton>
        <IconButton> <img src={dotsVertical} alt="deleteIconSmall" style={{ width:"24px", height:"24px"}} /></IconButton>
      </Box>
    ))}
  ]

  const usersRows = usersList.map((user)=>({
    id:user?._id,
    name:`${user?.firstName}  ${user?.lastName}`,
    email:user?.email,
    role:user?.role?.name,
    description:user.description,
    createdAt:dateFormatter(user?.createdAt),
    status:user?.status,
    createdBy:user?.createdBy?.userName
  }))

  // list user roles 
  interface Role{
    _id:string,
    name:string,
    status:string,
  }

  const [assignableRoles,setAssignableRoles] = useState<Role[]>([])
  const listAllRoles = useCallback( async ()=>{
    try {
      const response = await listRoles();
      if(response.status === 200){
        const roles = response.data.data;
        const filteredRoles = roles.filter((role:Role)=>role.name !=="Admin" && role.name !== "Tenant" && role.name !=="User" && role.name !== "Landlord" );
        setAssignableRoles(filteredRoles)
      }
    } catch (error) {
      console.log(error)
    }
  },[])

useEffect(()=>{
listAllRoles()
},[listAllRoles])


const sortOptions = [
  { value: '-createdAt', label: 'Newest' },
  { value: 'createdAt', label: 'Oldest' },
]


const handleSortChange = (e: SelectChangeEvent) => {
    setSortOption(e.target.value as string)
    setPaginationModel({ ...paginationModel, page: 0 }) 
  }

  const handleRefresh = () => {
    setSearchQuery('');
    setSortOption('-createdAt');
    setPaginationModel({ page: 0, pageSize: 10 });
  };


    const [anchorElPageSizeMenu,setAnchorElPageSizeMenu] = useState<null | HTMLElement>(null);
    const openPageSizeMenu = Boolean(anchorElPageSizeMenu);

   const handleOpenPageSizeMenu = ( event:React.MouseEvent<HTMLButtonElement>)=>{
    setAnchorElPageSizeMenu(event.currentTarget)
   }
  
   const handleClosePageSizeMenu = ()=>{
    setAnchorElPageSizeMenu(null);
   }

  const handlePageSizeSelection = (size:number) =>{
    setPaginationModel({ page:0, pageSize:size})
    handleClosePageSizeMenu();
  }

  return (
     <Box sx={{width:"100%",}}>
      <Paper elevation={0} sx={{ borderRadius:"4px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", width:"100#", backgroundColor:"#fff", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"}}>
        <Typography sx={{fontSize:"18px", fontWeight:"600",textAlign:"start", color:"#2C2E3E"}}>Users  Overview</Typography>
         <Button onClick={handleOpenAddUserModal} variant='contained' sx={{backgroundColor:"#2563EB",height:"48px", width:"120px", fontSize:"14px", fontWeight:"500"}}>+ Add user</Button>

        <Divider sx={{ borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1"}}/>
        <Box sx={{ width:"100%", display:"flex", justifyContent:"space-between"}}>

          <Box sx={{height:"42px", alignItems:"center", padding:"8px", width:"100px", borderRadius:"8px", border:"1px solid #D1D5DB", display:"flex", justifyContent:"space-between"}}>
             <Box onClick={handleOpenPageSizeMenu} component={"button"} sx={{ border:"none", backgroundColor:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"4px"}}>
              <Typography variant='body2' sx={{ color:"#4B5563",fontSize:"14px", fontWeight:"500", textAlign:"start"}}>{paginationModel.pageSize}</Typography>
              <img src={dropdownGreyIcon} alt="dropdownGreyIcon" />
            </Box>
              <Menu id="basic-menu" anchorEl={anchorElPageSizeMenu} open={openPageSizeMenu} onClose={handleClosePageSizeMenu} MenuListProps={{ 'aria-labelledby': 'basic-button'}} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                  {[10, 20, 50, 100].map((size) => (
                    <MenuItem key={size} onClick={() => handlePageSizeSelection(size)}>
                      {size}
                    </MenuItem>
                  ))}
              </Menu>
            <Divider orientation='vertical' sx={{height:"42px", backgroundColor:"#9CA3AF",borderWidth:"1px"}}/>
            <Box onClick={handleRefresh} sx={{ cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <img src={refreshIcon} alt="refreshIcon" />
            </Box>
          </Box>
          <Box sx={{ display:"flex", gap:"20px"}}>
            <TextField value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder='Search users by name,email,phone number....' sx={{ width:"190px"}} InputProps={{ startAdornment:(<InputAdornment position='start'><img src={searchIcon} alt="searchIcon" style={{width:"20px", height:"20px"}} /></InputAdornment>),sx:{width:"200px", height:"42px"} }}/>
             <Box sx={{ height: "42px", width: "140px", borderRadius: "8px", border: "1px solid #D1D5DB", display: "flex", alignItems: "center", justifyContent: "space-between", paddingX: "10px" }}>
              <Select
                value={sortOption}
                onChange={handleSortChange}
                variant="standard"
                disableUnderline
                sx={{ color: "#4B5563", fontSize: "14px", fontWeight: "500", border: "none", width: "100%" }}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
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
          <DataGrid sx={{ width:"100%"}} rowCount={usersCount} loading={fetchingUsers} columns={usersColumns} rows={usersRows} paginationMode='server' paginationModel={paginationModel} onPaginationModelChange={setPaginationModel} pageSizeOptions={[10,20,50,100]}/>
        </Box>

       {/* add user modal */}
         <Modal open={openAddUserModal} onClose={handleCloseAddUserModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box style={{width:"600px" }} sx={modalStyles}>
                  <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
                     <Typography id="modal-modal-title" sx={{fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Add New User</Typography>
                     <IconButton onClick={handleCloseAddUserModal}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
                  </Box>
        
                 <form onSubmit={handleCreateUser} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"start" ,marginTop:"20px"}}>

                    <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                          <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                             <FormLabel  htmlFor="role" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937"}}>Role</FormLabel>
                             <Select value={userFormData.role} onChange={handleSelectRole} sx={{width:'100%', borderRadius:"8px"}}>
                              {assignableRoles.map((role)=>(<MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>)) }
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
