import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, MenuItem, Modal, Paper, Select, TextField, Typography, type SelectChangeEvent } from '@mui/material'
import React, { useCallback, useEffect, useState, type FormEvent,} from 'react'
import dropdownGreyIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dropdown Icon grey.svg"
import {useTheme } from '@mui/material';
import { getModalStyle } from '../theme';
import cancelIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/cancel Icon.svg"
import type {CreateRolePayload ,CreatePermissionPayload, CreatePropertyCategoryPayload, CreatePropertyTagPayload, CreateSupportTicketPayload, CreateCategoryPayload, CreateTagPayload, RenameRolePayload, Role, SupportTicketType, PropertyTypeTag, Category, Tag, PropertyCategory, Permission } from "../interfaces/interfaces"
import { createRole, listRoles, renameRole } from '../components/services/roleService';
import { createPermission, deleteAPermission, listPermissions } from '../components/services/permissionServices';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import refreshIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/refresh icon.svg"
import filterIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/filter icon.svg"
import deleteIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/delete Icon.svg"
import searchIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/search icon.svg"
import printerIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/printer icon.svg"
import {createPropertyType, listPropertyTypes, updatePropertyType } from '../components/services/propertyTypesServices';
import { createSupportTicket, listSupportTickets } from '../components/services/supportTicketService';
import { createCategory, listCategories } from '../components/services/categoryService';
import { createTag, listTags } from '../components/services/tagServices';
import { showErrorToast, showInfoToast } from '../utils/toast';
import type { AxiosError } from 'axios';
import { dateFormatter } from '../utils/dateFormatter';
import editIcon from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/edit icon.svg"
import deleteIconGrey from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/deleted Icon grey.svg"
import dotsVertical from "../assets/logos and Icons-20230907T172301Z-001/logos and Icons/dots vertical icon.svg"
import { createPropertyCategory, listPropertyCategories } from '../components/services/propertyCategoryService';
import { createPropertyTag, listPropertyTags } from '../components/services/propertyTagService';
import NoRowsOverlay from '../components/common/NoRowsOverlay';
import type { PropertyType, PropertyTypePayload } from '../interfaces/propertyType';


const Setups:React.FC = () => {
  const [formData,setFormData] = useState<CreateRolePayload>({name:"",description:"", status:""})
  const [permissionFormData, setPermissionFormData] = useState<CreatePermissionPayload>({ permissionName: "", status:"", description:"" });
  const [propertyTypeData,setPropertyTypeData] = useState<PropertyTypePayload>({ name:"", status:"", description:"", })
  const [isSubmiting,setIsSubmitting] = useState<boolean>(false)
  const theme = useTheme()
  const modalStyles =  getModalStyle(theme.palette.mode)

  const [openAddRoleModal, setOpenAddRoleModal] = useState<boolean>(false);
  const handleOpenAddRoleModal = () => setOpenAddRoleModal(true);
  const handleCloseAddRoleModal = () =>{
    setOpenAddRoleModal(false);
    setFormData({ name:"", description:"",status:""})
  };

  // rename role
const [openRenameRoleModal,setOpenRenameRoleModal] = useState<boolean>(false);
const [renameRoleFormData,setRenameRoleFormData] = useState<RenameRolePayload>({name:"" , roleId:""});
const [renamingRole,setRenamingRole] = useState(false)
const handleOpenRenameRoleModal = ()=>{
  setOpenRenameRoleModal(true);
}
const handleCloseRenameRoleModal = ()=>{
  setOpenRenameRoleModal(false);
  setRenameRoleFormData({ name:"", roleId:"" })
}

const handleSelectRoleToRename = (e:SelectChangeEvent) => {
  const value = e.target.value as string
  setRenameRoleFormData((prev)=>({...prev, roleId:value }))
}

const handleInputChangeRenameRole = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const { name , value} = e.target;
  setRenameRoleFormData((prev)=>({...prev,[name]:value as string}));
  console.log(renameRoleFormData,"renameRoleFormdata")
}

const handleRenameRole = async (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  try {
    setRenamingRole(true)
    const response = await renameRole(renameRoleFormData);
    if(response.status === 200){
    showInfoToast(response.data.message)
    listAllRoles();
    handleCloseRenameRoleModal()
    }
  } catch (error) {
    console.log(error)
  }finally{
    setRenamingRole(false)
  }
}

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

  const [selectedItem,setSelectedItem]  = useState<number>(()=>{
    const localStorageSelectedItem =  localStorage.getItem("selectedItem")
    return localStorageSelectedItem ? parseInt(localStorageSelectedItem) : 1
  })

  const handleSidebarItemClick = (id: number) => {
    setSelectedItem(id);
    localStorage.setItem("selectedItem",id.toString())
  };

  const [selectedRole,setSelectedRole] = React.useState('');
  const handleSelectRole = (event: SelectChangeEvent) => {
   setSelectedRole(event.target.value as string);
  };

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


 const statuses = [
  {id:1,name:"Active"},
  {id:2,name:"Disabled"},
 ]

//  role functionalities
 const [roles,setRoles] = useState<Role[]>([])
 const listAllRoles  = useCallback(async ()=>{
  try {
    const response = await listRoles();
    if(response.status === 200){
      const listOfRoles = response.data.data;
      const filteredListOfRoles = listOfRoles.filter((role:Role)=>role.name !== "Admin");
      setRoles(filteredListOfRoles)
    }
  } catch (error) {
    console.log(error)
  }
 },[])

 useEffect(()=>{
 listAllRoles()
 },[listAllRoles])

  const handleCreateRole = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true)
  try {
    const response = await createRole(formData);
    if(response.status === 201){
      showInfoToast(response.data.message);
      listAllRoles()
      handleCloseAddRoleModal()
    }
  } catch (err) {
    const error = err as AxiosError<{message?:string}>
    showErrorToast(error?.response?.data?.message || error.message)
  } finally{
    setIsSubmitting(false)
  }
 }

//  permission functionalities
  const handleCreatePermission = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setCreatingPermission(true)

  try {
    const response = await createPermission(permissionFormData);
    if(response.status === 201){
      handleCloseAddPermissionModal()
      showInfoToast(response.data.message)
      listAllPermissions();
    }
  } catch (err) {
    const error = err as AxiosError<{message?:string}>
    showErrorToast(error.response?.data.message || error.message)
  } finally{
    setCreatingPermission(false)
  }
 }

 const [permissionsList, setPermissionsList] = useState<Permission[]>([])

 const listAllPermissions = useCallback(async()=>{
  try {
    const response = await listPermissions()
    if(response.status === 200){
      setPermissionsList(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
 },[])

 useEffect(()=>{ 
  listAllPermissions()
 },[listAllPermissions])


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
    setPropertyTypeData({ name:"",status:"",description:"" })
  }

  const handlePropertyTypeChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    setPropertyTypeData((prev)=>({...prev,[name]:value}))
  }

 const handlePropertyTypeStatusChange = (e:SelectChangeEvent) =>{
  setPropertyTypeData((prev)=>({...prev,status:e.target.value as string}))
 }

  const [propertyTypes,setPropertyTypes] = useState<PropertyType[]>([])
  const [loadingPropertyTypes,setLoadingPropertyTypes] = useState<boolean>(false)

  // list all property types 
   const listAllPropertyTypes = useCallback(async () =>  {
    setLoadingPropertyTypes(true);
    try {
      const response = await listPropertyTypes();
      setPropertyTypes(response.data.data);
    } catch (error) {
      console.log(error)
    }finally{
      setLoadingPropertyTypes(false)
    }
   },[])

   useEffect(()=>{
    listAllPropertyTypes()
   },[listAllPropertyTypes])

   const handleCreatePropertyType = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setCreatingPropertyType(true)
    try {
      const response = await createPropertyType(propertyTypeData)
       if(response.status === 201){
          listAllPropertyTypes()
        showInfoToast(response.data.message)
        handleClosePropertyTypeModal()
       }
    } catch (err) {
      const error = err as AxiosError<{ message?:string}>
      showErrorToast(error?.response?.data?.message || error.message)
    }finally{
      setCreatingPropertyType(false)
    }
   }


   const propertyTypeColumns: GridColDef[] = [
    {field:"name", headerName: "Type Name" , flex:1},
    {field:"slug", headerName: "Slug" , flex:1,},
    {field:"createdAt", headerName: "Date Added" , flex:1},
    {field:"createdBy", headerName: "Added By" , flex:1},
    {field:"status",headerName:"Status", flex:1},
    {field:"actions", headerName: "Actions" , flex:1 , renderCell:((params)=>(
      <Box sx={{display:"flex", gap:"10px", alignItems:"center"}}>
        <IconButton>
          <img onClick={()=>(handleOpenUpdatePropertyTypeModal(params.row))} src={editIcon} style={{ width:"24px", height:"24px"}} alt="editIcon" />
        </IconButton>
         <IconButton >
          <img src={deleteIconGrey} style={{ width:"24px", height:"24px"}} alt="deleteIcon" />
        </IconButton>
         <IconButton >
          <img src={dotsVertical} style={{ width:"24px", height:"24px"}} alt="dotsVertical" />
        </IconButton>
      </Box>
     ))},
   ]  


   const  propertyTypeRows =  propertyTypes.map((propertyType)=>({
    id:propertyType?._id,
    name:propertyType?.name,
    slug:propertyType?.slug,
    createdAt: dateFormatter(propertyType?.createdAt),
    createdBy:propertyType.createdBy?.userName,
    status:propertyType?.status,
    description:propertyType?.description
   }))


  //  property category
  const [propertyCategoryData,setPropertyCategoryData] = useState<CreatePropertyCategoryPayload>({name:"", status:"", description:"" })
  const [creatingPropertyCategory, setCreatingPropertyCategory] = useState<boolean>(false)
  const [openPropertyCategoryModal,setOpenPropertyCategoryModal] = useState<boolean>(false);
  const [propertyCategories,setPropertyCategories]  = useState<PropertyCategory[]>([])
  const [loadingPropertyCategories,setLoadingPropertyCategories] = useState<boolean>(false)
   

  const handleOpenPropertyCategoryModal = ()=> setOpenPropertyCategoryModal(true)
  const handleClosePropertyCategoryModal = ()=>{
    setOpenPropertyCategoryModal(false)
    setPropertyCategoryData({ name:"",status:"",description:"" })
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
      if(response.status === 201) {
        showInfoToast(response.data.message)
        listAllPropertyCategories();
        handleClosePropertyCategoryModal();
      }
    } catch (err) {
      const error = err as AxiosError<{message?:string}>
      showErrorToast(error.response?.data.message || error.message)
      console.log(error)
    }finally{
      setCreatingPropertyCategory(false)
    }
   }


   const listAllPropertyCategories = async () =>{
    try {
      setLoadingPropertyCategories(true)
      const response = await listPropertyCategories();
      if(response.status === 200){
        setPropertyCategories(response.data.data);
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoadingPropertyCategories(false)
    }
   }

   useEffect(()=>{
   listAllPropertyCategories()
   },[])

   const propertyCategoryColumns:GridColDef[] = [
    {field:"name", headerName:"Category Name", flex:1},
    {field:"description", headerName:"Description", flex:1},
    {field:"slug", headerName:"Slug", flex:1},
    {field:"createdAt", headerName:"Date Added", flex:1},
    {field:"createdBy", headerName:"Created By", flex:1},
    {field:"status", headerName:"Status", flex:1},
    {field:"action",headerName:"Action", flex:1, renderCell:(()=>(
      <Box sx={{ display:"flex", gap:"10px"}}>
        <IconButton><img src={editIcon} alt="editIcon"/></IconButton>
        <IconButton><img src={deleteIconGrey} alt="editIcon"/></IconButton>
        <IconButton><img src={dotsVertical} alt="editIcon"/></IconButton>
      </Box>
    ))}
   ] 

   const propertyCategoryRows = propertyCategories.map((propertyCategory)=>({
    id:propertyCategory?._id,
    name:propertyCategory?.name,
    description:propertyCategory?.description,
    slug:propertyCategory?.slug,
    createdAt:dateFormatter(propertyCategory?.createdAt),
    status:propertyCategory?.status,
    createdBy:propertyCategory?.createdBy.userName
   }))

   // support Ticket type
  const [supportTicketData,setSupportTicketData] = useState<CreateSupportTicketPayload>({name:"", status:"", description:"" })
  const [creatingSupportTicket, setCreatingSupportTicket] = useState<boolean>(false)
  const [openSupportTicketModal,setOpenSupportTicketModal] = useState<boolean>(false);
  const [loadingSupportTickets,setLoadingSupportTickets] = useState<boolean>(false)

  const handleOpenSupportTicketModal = ()=> setOpenSupportTicketModal(true)
  const handleCloseSupportTicketModal = ()=>{
    setOpenSupportTicketModal(false)
    setSupportTicketData({ name:"",status:"",description:"" })
  }

  const handleSupportTicketChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    setSupportTicketData((prev)=>({...prev,[name]:value}))
  }

 const handleSupportTicketStatusChange = (e:SelectChangeEvent) =>{
  setSupportTicketData((prev)=>({...prev,status:e.target.value as string}))
 }
 const [supportTicketList,setSupportTicketList] = useState<SupportTicketType[]>();


 const listAllSupportTickets = async ()=>{
  setLoadingSupportTickets(true)
  try {
    const response = await listSupportTickets()
    if(response.status === 200){
      setSupportTicketList(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }finally{
    setLoadingSupportTickets(false)
  }
 }

 useEffect(()=>{
  listAllSupportTickets()
 },[])


   const handleCreateSupportTicket = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setCreatingSupportTicket(true)
    try {
      const response = await createSupportTicket(supportTicketData)
      if(response.status === 201){
        showInfoToast(response.data.message)
        handleCloseSupportTicketModal();
        listAllSupportTickets();
      }
    } catch (err) {
      const error = err as AxiosError<{message?:string}> 
      showErrorToast(error?.response?.data.message || error?.message)
      console.log(error)
    }finally{
      setCreatingSupportTicket(false)
    }
   }

   const supportTicketColumns:GridColDef[] = [
    {field:"name",headerName:"Name", flex:1},
    {field:"description", headerName:"Description" , flex:1},
    {field:"createdAt", headerName:"Date Added", flex:1},
    {field:"createdBy", headerName:"Added By", flex:1},
    {field:"status", headerName:"Status", flex:1},
    {field:"action",headerName:"Action", flex:1, renderCell:(()=>(
      <Box sx={{ display:"flex", gap:"10px"}}>
        <IconButton><img src={editIcon} alt="editIcon"/></IconButton>
        <IconButton><img src={deleteIconGrey} alt="editIcon"/></IconButton>
        <IconButton><img src={dotsVertical} alt="editIcon"/></IconButton>
      </Box>
    ))}
   ]

   const supportTicketRows = supportTicketList?.map((supportTicket)=>({
    id:supportTicket?._id,
    name:supportTicket?.name,
    description:supportTicket?.description,
    createdAt:dateFormatter(supportTicket?.createdAt),
    createdBy:supportTicket?.createdBy.userName,
    status:supportTicket?.status
   }))


    // property type tag
  
  const [propertyTagData,setPropertyTagData] = useState<CreatePropertyTagPayload>({name:"", status:"", description:"" })
  const [creatingPropertyTag, setCreatingPropertyTag] = useState<boolean>(false)
  const [openPropertyTagModal,setOpenPropertyTagModal] = useState<boolean>(false);
  const handleOpenPropertyTagModal = ()=> setOpenPropertyTagModal(true)

  const handleClosePropertyTagModal = ()=>{
    setOpenPropertyTagModal(false)
    setPropertyTagData({ name:"",status:"",description:"" })
  }

  const handlePropertyTagChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    setPropertyTagData((prev)=>({...prev,[name]:value}))
  }

 const handlePropertyTagStatusChange = (e:SelectChangeEvent) =>{
  setPropertyTagData((prev)=>({...prev,status:e.target.value as string}))
 }

 const [propertyTagsList,setPropertyTagList] = useState<PropertyTypeTag[]>([])
 const [loadingPropertyTags,setLoadingPropertyTags] = useState<boolean>(false)


 const listAllPropertyTags = async ()=>{
  try {
    setLoadingPropertyTags(true)
    const response = await listPropertyTags()
    if(response.status === 200){
      setPropertyTagList(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }finally{
    setLoadingPropertyTags(false)
  }
 }

 useEffect(()=>{
  listAllPropertyTags();
 },[])

    const handleCreatePropertyTag = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setCreatingPropertyTag(true)
    try {
      const response = await createPropertyTag(propertyTagData)
      if(response.status === 201){
        showInfoToast(response.data.message)
        handleClosePropertyTagModal()
        listAllPropertyTags()
      }
    } catch (err) {
      const error = err as AxiosError<{message?:string}>
      showErrorToast(error.response?.data.message || error.message)
      console.log(error)
    }finally{
      setCreatingPropertyTag(false)
    }
   }

 const propertyTagColumns:GridColDef[] = [
    {field:"name", headerName:"Property Tag Name", flex:1},
    {field:"description", headerName:"Description", flex:1},
    {field:"slug", headerName:"Slug", flex:1},
    {field:"createdAt", headerName:"CreatedAt", flex:1},
    {field:"createdBy", headerName:"Created By", flex:1},
    {field:"status", headerName:"Status", flex:1},
    {field:"action",headerName:"Action", flex:1, renderCell:(()=>(
      <Box sx={{ display:"flex", gap:"10px"}}>
        <IconButton><img src={editIcon} alt="editIcon"/></IconButton>
        <IconButton><img src={deleteIconGrey} alt="editIcon"/></IconButton>
        <IconButton><img src={dotsVertical} alt="editIcon"/></IconButton>
      </Box>
    ))}
   ] 

   const propertyTagRows = propertyTagsList.map((propertyTag)=>({
    id:propertyTag?._id,
    name:propertyTag?.name,
    description:propertyTag?.description,
    slug:propertyTag?.slug,
    createdAt:dateFormatter(propertyTag?.createdAt),
    status:propertyTag?.status,
    createdBy:propertyTag?.createdBy.userName
   }))


   // category
  const [categoryData,setCategoryData] = useState<CreateCategoryPayload>({categoryName:"", parentCategory:"", options:"", status:"", description:"" });
  const [creatingCategory, setCreatingCategory] = useState<boolean>(false);
  const [openCategoryModal,setOpenCategoryModal] = useState<boolean>(false);
  const [categoriesList,setCategoriesList] = useState<Category[]>([])

  const handleOpenCategoryModal = ()=> setOpenCategoryModal(true)
  const handleCloseCategoryModal = ()=>{
    setOpenCategoryModal(false)
    setCategoryData({ categoryName:"",parentCategory:"", options :"" , status:"",description:"" })
  }

  const handleCategoryInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    setCategoryData((prev)=>({...prev,[name]:value}))
  }

 const handleCategoryStatusChange = (e:SelectChangeEvent) =>{
  setCategoryData((prev)=>({...prev,status:e.target.value as string}))
 }
 const handleParentCategoryChange = (e:SelectChangeEvent )=>{
  setCategoryData((prev)=>({ ...prev, parentCategory:e.target.value }))

 }
 const handleCategoryOptionChange = (e:SelectChangeEvent)=>{
  setCategoryData((prev)=>({ ...prev,options:e.target.value}))
 }

  const listAllCategories =  async () => {
    try {
      const response = await listCategories()
      if(response.status === 200){
        setCategoriesList(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    listAllCategories();
  },[])


   const handleCreateCategory = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setCreatingCategory(true)
    try {
      const response = await createCategory(categoryData)
      if(response.status === 201){
        showInfoToast(response.data.message);
        handleCloseCategoryModal();
        listAllCategories();
      }
    } catch (err) {
      const error = err as AxiosError<{message?:string}>;
      showErrorToast(error.response?.data.message || error.message)
      console.log(error)
    }finally{
      setCreatingCategory(false)
    }
   }


const categoryColumns:GridColDef[] = [
    {field:"categoryName", headerName:"Category Name", flex:1},
    {field:"description", headerName:"Description", flex:1},
    {field:"parentCategory", headerName:"Parent Category", flex:1},
    {field:"createdAt", headerName:"Created At", flex:1},
    {field:"createdBy", headerName:"Created By", flex:1},
    {field:"status", headerName:"Status", flex:1},
    {field:"action",headerName:"Action", flex:1, renderCell:(()=>(
      <Box sx={{ display:"flex", gap:"10px"}}>
        <IconButton><img src={editIcon} alt="editIcon"/></IconButton>
        <IconButton><img src={deleteIconGrey} alt="editIcon"/></IconButton>
        <IconButton><img src={dotsVertical} alt="editIcon"/></IconButton>
      </Box>
    ))}
   ] 

   const categoryRows = categoriesList.map((category)=>({
    id:category?._id,
    categoryName:category?.categoryName,
    description:category?.description,
    parentCategory:category?.parentCategory,
    createdAt:dateFormatter(category?.createdAt),
    status:category?.status,
    createdBy:category?.createdBy?.userName
   }))


  const [tagData,setTagData] = useState<CreateTagPayload>({tagName:"", parentTag:"", options:"", status:"", description:"" });
  const [creatingTag, setCreatingTag] = useState<boolean>(false);
  const [openTagModal,setOpenTagModal] = useState<boolean>(false);
  const [tagList,setTagList] = useState<Tag[]>([]);
  const [fetchingTags,setFetchingTags] = useState<boolean>(false)

  const handleOpenTagModal = ()=> setOpenTagModal(true)
  const handleCloseTagModal = ()=>{
    setOpenTagModal(false)
    setTagData({ tagName:"",parentTag:"", options :"" , status:"",description:"" })
  }

  const handleTagInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    setTagData((prev)=>({...prev,[name]:value}))
  }

 const handleTagStatusChange = (e:SelectChangeEvent) =>{
  setTagData((prev)=>({...prev,status:e.target.value as string}))
 }
 const handleParentTagChange = (e:SelectChangeEvent )=>{
  setTagData((prev)=>({ ...prev, parentTag:e.target.value }))
 }
 const handleTagOptionsChange = (e:SelectChangeEvent)=>{
  setTagData((prev)=>({ ...prev,options:e.target.value}))
 }

  const listAllTags = async ()=>{
    try {
      setFetchingTags(true)
      const response = await listTags();
      if(response.status === 200){
        setTagList(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setFetchingTags(false)
    }
   }

   useEffect(()=>{
    listAllTags();
   },[])


   const handleCreateTag = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setCreatingTag(true)
    try {
      const response = await createTag(tagData)
      if(response.status === 201){
        showInfoToast(response.data.message)
        handleCloseTagModal();
        listAllTags();
      }
    } catch (err) {
      const error = err as AxiosError<{message?:string}>
      showErrorToast(error?.response?.data?.message || error?.message)
    }finally{
      setCreatingTag(false)
    }
   }

  
    const tagColumns:GridColDef[] = [
    {field:"tagName", headerName:"Tag Name", flex:1},
    {field:"description", headerName:"Description", flex:1},
    {field:"parentTag", headerName:"Parent Tag", flex:1},
    {field:"createdAt", headerName:"CreatedAt", flex:1},
    {field:"createdBy", headerName:"Created By", flex:1},
    {field:"status", headerName:"Status", flex:1},
    {field:"action",headerName:"Action", flex:1, renderCell:(()=>(
      <Box sx={{ display:"flex", gap:"10px"}}>
        <IconButton><img src={editIcon} alt="editIcon"/></IconButton>
        <IconButton><img src={deleteIconGrey} alt="editIcon"/></IconButton>
        <IconButton><img src={dotsVertical} alt="editIcon"/></IconButton>
      </Box>
    ))}
   ] 

   const tagRows = tagList.map((tag)=>({
    id:tag?._id,
    tagName:tag?.tagName,
    description:tag?.description,
    parentTag:tag?.parentTag,
    createdAt:dateFormatter(tag?.createdAt),
    status:tag?.status,
    createdBy:tag?.createdBy.userName
   }))




  //  delete permission logic 
  const [openDeletePermissionModal,setOpenDeletePermissionModal] = useState<boolean>(false);
  const [permissionToDeleteId,setPermissionToDeleteId] = useState<string>("")
  const [deletingPermission,setDeletingPermission] = useState<boolean>(false)


  const handleOpenDeletePermissionModal = () =>{
    setOpenDeletePermissionModal(true)
  }

  const handleCloseDeletePermissionModal = () =>{
    setOpenDeletePermissionModal(false)
    setPermissionToDeleteId("");
  }

  const handleSelectPermissionToDelete = (e:SelectChangeEvent)=>{
    setPermissionToDeleteId(e.target.value)
  }


  const handleDeletePermission = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setDeletingPermission(true)
    try {
      const response = await deleteAPermission(permissionToDeleteId)
      if(response?.status === 200){
        handleCloseDeletePermissionModal();
        showInfoToast(response.data.message);
        listAllPermissions()
      }
    } catch (err) {
      const error = err as AxiosError<{message?:string}>;
      showErrorToast(error.response?.data.message || error.message)
    }finally{
      setDeletingPermission(false)
    }
  }

  const [filterValue,setFilterValue] = useState<string>("");

  // update Property type functionality
  const [updatePropertyTypeFormData,setUpdatePropertyTypeFormData] = useState<PropertyTypePayload>({ _id:"", name:"", status:"", description:"" });
  const [updatingPropertyType,setUpdatingPropertyType] = useState<boolean>(false)

  const handleUpdatePropertyType = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      setUpdatingPropertyType(true)
      const response = await updatePropertyType({_id:updatePropertyTypeFormData._id, name:updatePropertyTypeFormData.name, status:updatePropertyTypeFormData.status, description:updatePropertyTypeFormData.description });
      if(response.status === 200){
        showInfoToast(response.data.message);
        listAllPropertyTypes();
        handleCloseUpdatePropertyTypeModal()
      }
    } catch (error) {
      const err = error as AxiosError<{message?:string}>
      showErrorToast(err.response?.data.message || err.message)
    }finally{
      setUpdatingPropertyType(false)
    }
  }

  const [openUpdatePropertyType,setOpenUpdatePropertyType] = useState<boolean>(false);

  const handleOpenUpdatePropertyTypeModal = (propertyType:PropertyType)=>{
    setUpdatePropertyTypeFormData({_id:propertyType.id, name:propertyType.name, description:propertyType.description, status:propertyType.status })
    setOpenUpdatePropertyType(true)
  }

  const handleCloseUpdatePropertyTypeModal = ()=>{
    setOpenUpdatePropertyType(false);
    setUpdatePropertyTypeFormData({ _id:"", name:"", description:"", status:""});
  }

  const handleUpdatePropertyTypeStatusChange = (e:SelectChangeEvent)=>{
    setUpdatePropertyTypeFormData((prev)=>({...prev,status:e.target.value as string}))
  }

  const handleUpdatePropertyTypeChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setUpdatePropertyTypeFormData((prev)=>({...prev,[name]:value}))
  }


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
          <Select id="role-select" value={selectedRole} onChange={handleSelectRole} sx={{ height:"44px", width:"100%"}} >
            {roles?.map((role)=>(<MenuItem key={role?._id} value={role?._id}>{role?.name}</MenuItem>))}
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
                <Box sx={{ width:"40%"}}>
                 <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                     <TextField type="text"  name="name"  value={filterValue} onChange={(e)=>setFilterValue(e.target.value)} fullWidth variant="outlined"  sx={{ height:"32px", "& .MuiOutlinedInput-root":{height:"44px"}, width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
                </Box> 

                 <Box sx={{ marginLeft:"20px" }}>
                   <FormControlLabel label="Granted" sx={{ "& .MuiFormControlLabel-label":{
                      fontSize:"14px", color:"#4B5563", fontWeight:"400"
                     }}}  control={<Checkbox size='small' onChange={handleChecked}/>}/> 
                  </Box>

                  <Box sx={{ cursor:"pointer", justifyContent:"center", border: "1px solid  #D1D5DB", width:"84px",height:"40px", borderRadius:"8px", display:"flex", alignItems:"center"}}>
                    <Typography sx={{color:"#6B7280", fontSize:"16px", fontWeight:"400", paddingX:"10px" }}>10</Typography>
                    <img src={dropdownGreyIcon} alt={dropdownGreyIcon} style={{width:"24px", height:"24px"}} />
                  </Box>

              </Box>
            
            </Box>
            <Divider sx={{width:"100%", borderWidth:"1px", backgroundColor:"#EDF2F6)" }} />

            <Box sx={{display:"flex", flexDirection:"column", gap:"10px", paddingX:"24px"}}>
              <Box sx={{marginLeft:"10px",display:"flex", flexDirection:"column", gap:"10px"}}>
                 <Box sx={{display:"flex",flexDirection:"column",}}>
                   {permissionsList?.map((permission)=>(<FormControlLabel key={permission?._id} label={permission?.permissionName} sx={{ "& .MuiFormControlLabel-label":{
                      fontSize:"14px", color:"#4B5563", fontWeight:"400"
                     }}}  control={<Checkbox size='small' key={permission._id} onChange={handleChecked}/>}/> )) }
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
                <Button onClick={handleOpenRenameRoleModal} variant='contained' sx={{height:"48px" , backgroundColor:"#FFF", color:"#344054", borderRadius:"8px", fontSize:"14px", fontWeight:"500" ,boxShadow:"none", ":hover":{boxShadow:"none"} }}>Rename Role</Button>
                <Button onClick={handleOpenAddPermissionModal} variant='contained' sx={{height:"48px" , backgroundColor:"#FFF", color:"#344054", borderRadius:"8px", fontSize:"14px", fontWeight:"500" , boxShadow:"none" ,":hover":{boxShadow:"none"} }}>Add permission</Button>
                <Button onClick={handleOpenDeletePermissionModal} variant='contained' sx={{height:"48px" , backgroundColor:"#FFF", color:"#344054", borderRadius:"8px", fontSize:"14px", fontWeight:"500" , boxShadow:"none", ":hover":{ boxShadow:"none"} }}>Delete permission</Button>
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
                     <FormLabel  htmlFor="name" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Role Name</FormLabel>
                     <TextField type="text"  name="name" value={formData.name} onChange={handleInputChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>

                <Box sx={{ width:"100%",}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='status-select'  value={formData.status} onChange={handleStatusChange} sx={{width:"100%"}} >
                       {statuses.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Description</FormLabel>
                    <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={formData.description} onChange={handleInputChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
              </Box>

              <Button type='submit' loading={isSubmiting} variant='contained' disabled={!formData.name || !formData.status || !formData.description || isSubmiting} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
         </form>

        </Box>
      </Modal>

          {/* rename role modal */}
       <Modal open={openRenameRoleModal} onClose={handleCloseRenameRoleModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyles}>
          <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
             <Typography id="modal-modal-title" sx={{fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Select role to rename</Typography>
             <IconButton onClick={handleCloseRenameRoleModal}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
          </Box>

         <form onSubmit={handleRenameRole} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"start" ,marginTop:"20px"}}>

           <Box sx={{ width:"100%",}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Select Role </FormLabel>
                     <Select id='status-select'  value={renameRoleFormData.roleId} onChange={handleSelectRoleToRename} sx={{width:"100%"}} >
                       {roles.map((role)=>(<MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

                 <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                     <FormLabel  htmlFor="name" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}> New Role Name</FormLabel>
                     <TextField type="text"  name="name" value={renameRoleFormData.name} onChange={handleInputChangeRenameRole} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>
              

              <Button type='submit' loading={renamingRole} variant='contained' disabled={!renameRoleFormData.name  || renamingRole} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
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
                       {statuses.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
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

        {/* delete permission modal */}
       <Modal open={openDeletePermissionModal} onClose={handleCloseDeletePermissionModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyles}>
          <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
             <Typography id="modal-modal-title" sx={{fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Delete permission</Typography>
             <IconButton onClick={handleCloseDeletePermissionModal}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
          </Box>

         <form onSubmit={handleDeletePermission} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"start" ,marginTop:"20px"}}>

                <Box sx={{ width:"100%",}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="deletePermission" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Select Permission </FormLabel>
                     <Select  value={permissionToDeleteId} onChange={handleSelectPermissionToDelete} sx={{width:"100%"}} >
                       {permissionsList.map((permission)=>(<MenuItem key={permission._id} value={permission._id}>{permission.permissionName}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

               { permissionToDeleteId && <Box sx={{ width:"100%", display:"flex", flexDirection:"column",}}>
                  <Typography  sx={{ fontSize:"14px", fontWeight:"600"}}>Deleting this permission will:</Typography>
                  <Box sx={{ width:"100%", display:"flex", flexDirection:"column", gap:"10px"}}>
                    <Typography sx={{ fontSize:"12" , fontWeight:"", color:" #666"}}>🚫 Immediately revoke access for all users and roles assigned to it. </Typography>
                    <Typography sx={{ fontSize:"12" , fontWeight:"", color:" #666"}}>🚫 Require manual reconfiguration to restore access. </Typography>
                  </Box>
                </Box>}

              <Button type='submit' loading={deletingPermission} variant='contained' disabled={!permissionToDeleteId || deletingPermission } sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Confirm</Button>
         </form>

        </Box>
      </Modal>
    </Paper>}



    { selectedItem === 2 && 
      <Paper elevation={0} sx={{ borderRadius:"8px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",width:"76%", height:"auto", backgroundColor:"#fff" }}>
        <Button onClick={handleOpenPropertyTypeModal} variant='contained' sx={{ alignSelf:"start", backgroundColor:"#2563EB", fontSize:"14px", fontWeight:"500", borderRadius:"4px", height:"40px", textAlign:"start"}}>+ New property type</Button>

        <Divider sx={{ borderWidth:"1px", width:"100%", backgroundColor:"#DDDFE1"}}/>
        <Box sx={{ width:"100%", display:"flex", justifyContent:"space-between"}}>

          <Box sx={{  cursor:"pointer", height:"42px", alignItems:"center", padding:"8px", width:"100px", borderRadius:"8px", border:"1px solid #D1D5DB", display:"flex", justifyContent:"space-between"}}>
            <Typography variant='body2' sx={{ color:"#4B5563",fontSize:"14px", fontWeight:"500", textAlign:"start"}}>10</Typography>
            <img src={dropdownGreyIcon} alt="dropdownGreyIcon" />
            <Divider orientation='vertical' sx={{height:"42px", backgroundColor:"#9CA3AF",borderWidth:"1px"}}/>
            <img onClick={()=>{listAllPropertyTypes()}} src={refreshIcon} alt="refreshIcon" />
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
          <DataGrid slots={{noRowsOverlay:NoRowsOverlay}} sx={{ width:"100%"}} loading={loadingPropertyTypes} columns={propertyTypeColumns} rows={propertyTypeRows} pageSizeOptions={[10,20,50,100]}/>
        </Box>


        {/* add property type modal */}
      <Modal open={openPropertyTypeModal} onClose={handleClosePropertyTypeModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyles}>
          <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
             <Typography id="modal-modal-title" sx={{fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Create property type</Typography>
             <IconButton onClick={handleClosePropertyTypeModal}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
          </Box>

         <form  onSubmit={handleCreatePropertyType} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"start" ,marginTop:"20px"}}>
            <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                     <FormLabel  htmlFor="name" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Property Type Name</FormLabel>
                     <TextField type="text"  name="name" value={propertyTypeData.name} onChange={handlePropertyTypeChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>

                <Box sx={{ width:"100%",}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='status-select'  value={propertyTypeData.status} onChange={handlePropertyTypeStatusChange} sx={{width:"100%"}} >
                       {statuses.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Description</FormLabel>
                    <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={propertyTypeData.description} onChange={handlePropertyTypeChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
              </Box>

              <Button type='submit' loading={creatingPropertyType} variant='contained' disabled={!propertyTypeData.name || !propertyTypeData.status || !propertyTypeData.description || creatingPropertyType} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
         </form>

        </Box>
      </Modal>
       {/*update property type  */}
      <Modal open={openUpdatePropertyType} onClose={handleCloseUpdatePropertyTypeModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyles}>
          <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
             <Typography id="modal-modal-title" sx={{fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Update property type</Typography>
             <IconButton onClick={handleCloseUpdatePropertyTypeModal}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
          </Box>

         <form  onSubmit={handleUpdatePropertyType} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"start" ,marginTop:"20px"}}>
            <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                     <FormLabel  htmlFor="name" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Property Type Name</FormLabel>
                     <TextField type="text"  name="name" value={updatePropertyTypeFormData.name} onChange={handleUpdatePropertyTypeChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>

                <Box sx={{ width:"100%",}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='status-select'  value={updatePropertyTypeFormData.status} onChange={handleUpdatePropertyTypeStatusChange} sx={{width:"100%"}} >
                       {statuses.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Description</FormLabel>
                    <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={updatePropertyTypeFormData.description} onChange={handleUpdatePropertyTypeChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
              </Box>

              <Button type='submit' loading={updatingPropertyType} variant='contained' disabled={!updatePropertyTypeFormData.name || !updatePropertyTypeFormData.status || !updatePropertyTypeFormData.description || updatingPropertyType} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Update</Button>
         </form>

        </Box>
      </Modal>
      </Paper>
    }

   {/* Property category */}
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
          <DataGrid slots={{noRowsOverlay:NoRowsOverlay}} loading={loadingPropertyCategories} sx={{ width:"100%"}} columns={propertyCategoryColumns} rows={propertyCategoryRows} pageSizeOptions={[10,20,50,100]}/>
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
                     <FormLabel  htmlFor="name" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Property Category Name</FormLabel>
                     <TextField type="text"  name="name" value={propertyCategoryData.name} onChange={handlePropertyCategoryChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>

                <Box sx={{ width:"100%",}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='status-select'  value={propertyCategoryData.status} onChange={handlePropertyCategoryStatusChange} sx={{width:"100%"}} >
                       {statuses.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Description</FormLabel>
                    <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={propertyCategoryData.description} onChange={handlePropertyCategoryChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
              </Box>

              <Button type='submit' loading={creatingPropertyCategory} variant='contained' disabled={!propertyCategoryData.name || !propertyCategoryData.status || !propertyCategoryData.description || creatingPropertyCategory} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
         </form>

        </Box>
      </Modal>
     </Paper>
    }

    {/* Property tags */}
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
          <DataGrid slots={{ noRowsOverlay:NoRowsOverlay }} loading={loadingPropertyTags} sx={{ width:"100%"}} columns={propertyTagColumns} rows={propertyTagRows} pageSizeOptions={[10,20,50,100]}/>
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
                     <FormLabel  htmlFor="name" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Property Tag Name</FormLabel>
                     <TextField type="text"  name="name" value={propertyTagData.name} onChange={handlePropertyTagChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>

                <Box sx={{ width:"100%",}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='status-select'  value={propertyTagData.status} onChange={handlePropertyTagStatusChange} sx={{width:"100%"}} >
                       {statuses.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Description</FormLabel>
                    <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={propertyTagData.description} onChange={handlePropertyTagChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
              </Box>

              <Button type='submit' loading={creatingPropertyTag} variant='contained' disabled={!propertyTagData.name || !propertyTagData.status || !propertyTagData.description || creatingPropertyTag} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
         </form>

        </Box>
      </Modal>
     </Paper>
      }

    {/* support ticket types */}
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
          <DataGrid slots={{ noRowsOverlay:NoRowsOverlay }} loading={loadingSupportTickets} sx={{ width:"100%"}} columns={supportTicketColumns} rows={supportTicketRows} pageSizeOptions={[10,20,50,100]}/>
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
                     <FormLabel  htmlFor="name" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Support Ticket Type Name</FormLabel>
                     <TextField type="text"  name="name" value={supportTicketData.name} onChange={handleSupportTicketChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>

                <Box sx={{ width:"100%",}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='status-select'  value={supportTicketData.status} onChange={handleSupportTicketStatusChange} sx={{width:"100%"}} >
                       {statuses.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box> 

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Description</FormLabel>
                    <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={supportTicketData.description} onChange={handleSupportTicketChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
              </Box>

              <Button type='submit' loading={creatingSupportTicket} variant='contained' disabled={!supportTicketData.name || !supportTicketData.status || !supportTicketData.description || creatingSupportTicket} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
         </form>

        </Box>
      </Modal>
     </Paper>
    }

    { selectedItem === 6 && 
     <Paper elevation={0} sx={{ borderRadius:"8px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",width:"76%", height:"auto", backgroundColor:"#fff" }}>
         <Button variant='contained' sx={{ alignSelf:"start", backgroundColor:"#2563EB", fontSize:"14px", fontWeight:"500", borderRadius:"4px", height:"40px", textAlign:"start"}}>+ New email template</Button>
         <Divider sx={{borderWidth:"1px", width:'100%' }}/>
         <Box sx={{display:"flex", width:"100%", justifyContent:"space-between", backgroundColor:"#F3F4F6", alignItems:"center", height:"40px"}}>
            <Typography sx={{paddingLeft:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400"}}>Tickets  templates</Typography>
            <Typography sx={{ paddingRight:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400",}}>Enable All  Disable All</Typography>
         </Box>

         <Box sx={{ marginX:"24px", widht:"100%", border:"1px solid #D1D5DB", height:"290px"}}>
            <Typography sx={{ padding:"20px", fontSize:"15px", fontWeight:"400", color:"#4B5563"}}>Template Name</Typography>
            <Divider sx={{borderWidth:"1px", width:"100%" }} />
            <Box sx={{display:"flex", justifyContent:"space-between", marginX:'20px', marginY:"10px"}}>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>New Ticket Opened (Opened by User, Sent to Tenant)</Typography>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>Disable</Typography>
            </Box>
         </Box>

          <Box sx={{display:"flex", width:"100%", justifyContent:"space-between", backgroundColor:"#F3F4F6", alignItems:"center", height:"40px"}}>
            <Typography sx={{paddingLeft:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400"}}>Leases/Agreement templates</Typography>
            <Typography sx={{ paddingRight:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400",}}>Enable All  Disable All</Typography>
         </Box>

         <Box sx={{ marginX:"24px", widht:"100%", border:"1px solid #D1D5DB", height:"290px"}}>
            <Typography sx={{ padding:"20px", fontSize:"15px", fontWeight:"400", color:"#4B5563"}}>Template Name</Typography>
            <Divider sx={{borderWidth:"1px", width:"100%" }} />
            <Box sx={{display:"flex", justifyContent:"space-between", marginX:'20px', marginY:"10px"}}>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>New Ticket Opened (Opened by User, Sent to Tenant)</Typography>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>Disable</Typography>
            </Box>
         </Box>

          <Box sx={{display:"flex", width:"100%", justifyContent:"space-between", backgroundColor:"#F3F4F6", alignItems:"center", height:"40px"}}>
            <Typography sx={{paddingLeft:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400"}}>Invoices templates</Typography>
            <Typography sx={{ paddingRight:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400",}}>Enable All  Disable All</Typography>
         </Box>

         <Box sx={{ marginX:"24px", widht:"100%", border:"1px solid #D1D5DB", height:"290px"}}>
            <Typography sx={{ padding:"20px", fontSize:"15px", fontWeight:"400", color:"#4B5563"}}>Template Name</Typography>
            <Divider sx={{borderWidth:"1px", width:"100%" }} />
            <Box sx={{display:"flex", justifyContent:"space-between", marginX:'20px', marginY:"10px"}}>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>New Ticket Opened (Opened by User, Sent to Tenant)</Typography>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>Disable</Typography>
            </Box>
         </Box>

           <Box sx={{display:"flex", width:"100%", justifyContent:"space-between", backgroundColor:"#F3F4F6", alignItems:"center", height:"40px"}}>
            <Typography sx={{paddingLeft:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400"}}>Tasks templates</Typography>
            <Typography sx={{ paddingRight:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400",}}>Enable All  Disable All</Typography>
         </Box>

         <Box sx={{ marginX:"24px", widht:"100%", border:"1px solid #D1D5DB", height:"290px"}}>
            <Typography sx={{ padding:"20px", fontSize:"15px", fontWeight:"400", color:"#4B5563"}}>Template Name</Typography>
            <Divider sx={{borderWidth:"1px", width:"100%" }} />
            <Box sx={{display:"flex", justifyContent:"space-between", marginX:'20px', marginY:"10px"}}>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>New Ticket Opened (Opened by User, Sent to Tenant)</Typography>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>Disable</Typography>
            </Box>
         </Box>

     </Paper>
    }


    { selectedItem === 7 && 
     <Paper elevation={0} sx={{ borderRadius:"8px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",width:"76%", height:"auto", backgroundColor:"#fff" }}>
         <Button variant='contained' sx={{ alignSelf:"start", backgroundColor:"#2563EB", fontSize:"14px", fontWeight:"500", borderRadius:"4px", height:"40px", textAlign:"start"}}>+ New sms template</Button>
         <Divider sx={{borderWidth:"1px", width:'100%' }}/>
         <Box sx={{display:"flex", width:"100%", justifyContent:"space-between", backgroundColor:"#F3F4F6", alignItems:"center", height:"40px"}}>
            <Typography sx={{paddingLeft:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400"}}>Tickets  templates</Typography>
            <Typography sx={{ paddingRight:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400",}}>Enable All  Disable All</Typography>
         </Box>

         <Box sx={{ marginX:"24px", widht:"100%", border:"1px solid #D1D5DB", height:"290px"}}>
            <Typography sx={{ padding:"20px", fontSize:"15px", fontWeight:"400", color:"#4B5563"}}>Template Name</Typography>
            <Divider sx={{borderWidth:"1px", width:"100%" }} />
            <Box sx={{display:"flex", justifyContent:"space-between", marginX:'20px', marginY:"10px"}}>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>New Ticket Opened (Opened by User, Sent to Tenant)</Typography>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>Disable</Typography>
            </Box>
         </Box>

          <Box sx={{display:"flex", width:"100%", justifyContent:"space-between", backgroundColor:"#F3F4F6", alignItems:"center", height:"40px"}}>
            <Typography sx={{paddingLeft:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400"}}>Leases/Agreement templates</Typography>
            <Typography sx={{ paddingRight:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400",}}>Enable All  Disable All</Typography>
         </Box>

         <Box sx={{ marginX:"24px", widht:"100%", border:"1px solid #D1D5DB", height:"290px"}}>
            <Typography sx={{ padding:"20px", fontSize:"15px", fontWeight:"400", color:"#4B5563"}}>Template Name</Typography>
            <Divider sx={{borderWidth:"1px", width:"100%" }} />
            <Box sx={{display:"flex", justifyContent:"space-between", marginX:'20px', marginY:"10px"}}>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>New Ticket Opened (Opened by User, Sent to Tenant)</Typography>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>Disable</Typography>
            </Box>
         </Box>

          <Box sx={{display:"flex", width:"100%", justifyContent:"space-between", backgroundColor:"#F3F4F6", alignItems:"center", height:"40px"}}>
            <Typography sx={{paddingLeft:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400"}}>Invoices templates</Typography>
            <Typography sx={{ paddingRight:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400",}}>Enable All  Disable All</Typography>
         </Box>

         <Box sx={{ marginX:"24px", widht:"100%", border:"1px solid #D1D5DB", height:"290px"}}>
            <Typography sx={{ padding:"20px", fontSize:"15px", fontWeight:"400", color:"#4B5563"}}>Template Name</Typography>
            <Divider sx={{borderWidth:"1px", width:"100%" }} />
            <Box sx={{display:"flex", justifyContent:"space-between", marginX:'20px', marginY:"10px"}}>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>New Ticket Opened (Opened by User, Sent to Tenant)</Typography>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>Disable</Typography>
            </Box>
         </Box>

           <Box sx={{display:"flex", width:"100%", justifyContent:"space-between", backgroundColor:"#F3F4F6", alignItems:"center", height:"40px"}}>
            <Typography sx={{paddingLeft:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400"}}>Tasks templates</Typography>
            <Typography sx={{ paddingRight:"24px", color:"#4B5563", fontSize:"16px", fontWeight:"400",}}>Enable All  Disable All</Typography>
         </Box>

         <Box sx={{ marginX:"24px", widht:"100%", border:"1px solid #D1D5DB", height:"290px"}}>
            <Typography sx={{ padding:"20px", fontSize:"15px", fontWeight:"400", color:"#4B5563"}}>Template Name</Typography>
            <Divider sx={{borderWidth:"1px", width:"100%" }} />
            <Box sx={{display:"flex", justifyContent:"space-between", marginX:'20px', marginY:"10px"}}>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>New Ticket Opened (Opened by User, Sent to Tenant)</Typography>
                <Typography sx={{ color:"#2563EB", fontSize:"12px", fontWeight:"400" }}>Disable</Typography>
            </Box>
         </Box>
         
     </Paper>
    }

  { selectedItem === 8 &&
     <Paper elevation={0} sx={{ borderRadius:"8px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",width:"76%", height:"auto", backgroundColor:"#fff" }}>
        <Button onClick={handleOpenCategoryModal} variant='contained' sx={{ alignSelf:"start", backgroundColor:"#2563EB", fontSize:"14px", fontWeight:"500", borderRadius:"4px", height:"40px", textAlign:"start"}}>+ New category</Button>

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
          <DataGrid slots={{ noRowsOverlay:NoRowsOverlay }} sx={{ width:"100%"}} columns={categoryColumns} rows={categoryRows} pageSizeOptions={[10,20,50,100]}/>
        </Box>

        {/* add support ticket modal */}

      <Modal open={openCategoryModal}  onClose={handleCloseCategoryModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyles} style={{ width:"600px"}} >
          <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
             <Typography id="modal-modal-title" sx={{fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Create new category</Typography>
             <IconButton onClick={handleCloseCategoryModal}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
          </Box>

         <form  onSubmit={handleCreateCategory} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"start" ,marginTop:"20px"}}>
            <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                     <FormLabel  htmlFor="categoryName" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Category Name</FormLabel>
                     <TextField type="text"  name="categoryName" value={categoryData.categoryName} onChange={handleCategoryInputChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>

                <Box sx={{ width:"100%", display:"flex", gap:"10px"}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="parentCategory" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Parent Category</FormLabel>
                     <Select id='parent-category-select'  value={categoryData.parentCategory} onChange={handleParentCategoryChange} sx={{width:"100%"}} >
                       {propertyCategories.map((category)=>(<MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>))}
                     </Select>
                </FormControl>

                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="options" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Options</FormLabel>
                     <Select id='options-select'  value={categoryData.options} onChange={handleCategoryOptionChange} sx={{width:"100%"}} >
                       {statuses.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>

                </Box> 

                <Box sx={{ width:"100%" }}>
                    <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='status-select'  value={categoryData.status} onChange={handleCategoryStatusChange} sx={{width:"100%"}} >
                       {statuses.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box>

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Description</FormLabel>
                    <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={categoryData.description} onChange={handleCategoryInputChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
              </Box>

              <Button type='submit' loading={creatingCategory} variant='contained' disabled={!categoryData.categoryName || !categoryData.status || !categoryData.description ||  !categoryData.options || !categoryData.parentCategory || creatingCategory} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
         </form>

        </Box>
      </Modal>
    </Paper>
  }

    { selectedItem === 9 &&
     <Paper elevation={0} sx={{ borderRadius:"8px", display:"flex", flexDirection:"column", gap:"20px", padding:"24px", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",width:"76%", height:"auto", backgroundColor:"#fff" }}>
        <Button onClick={handleOpenTagModal} variant='contained' sx={{ alignSelf:"start", backgroundColor:"#2563EB", fontSize:"14px", fontWeight:"500", borderRadius:"4px", height:"40px", textAlign:"start"}}>+ New Tag</Button>

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
          <DataGrid slots={{ noRowsOverlay:NoRowsOverlay }} loading={fetchingTags} sx={{ width:"100%"}} columns={tagColumns} rows={tagRows} pageSizeOptions={[10,20,50,100]}/>
        </Box>

        {/* add support ticket modal */}

      <Modal open={openTagModal}  onClose={handleCloseTagModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyles} style={{ width:"600px"}} >
          <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
             <Typography id="modal-modal-title" sx={{fontSize:"20px",fontWeight:"700", color:"#1F2937" }} variant="body2">Create new tag</Typography>
             <IconButton onClick={handleCloseTagModal}><img src={cancelIcon} alt="cancelIcon" style={{width:"24px", height:"24px"}} /></IconButton>
          </Box>

         <form  onSubmit={handleCreateTag} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"start" ,marginTop:"20px"}}>
            <Box sx={{ width:"100%",display:"flex", gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                     <FormLabel  htmlFor="tagName" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Tag Name</FormLabel>
                     <TextField type="text"  name="tagName" value={tagData.tagName} onChange={handleTagInputChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
             </Box>
             

                <Box sx={{ width:"100%", display:"flex", gap:"10px"}}>
                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="parentTag" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Parent Tag</FormLabel>
                     <Select id='parent-tag-select'  value={tagData.parentTag} onChange={handleParentTagChange} sx={{width:"100%"}} >
                       {propertyTagsList.map((tag)=>(<MenuItem key={tag._id} value={tag.name}>{tag.name}</MenuItem>))}
                     </Select>
                </FormControl>

                 <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="options" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Options</FormLabel>
                     <Select id='options-select' value={tagData.options} onChange={handleTagOptionsChange} sx={{width:"100%"}} >
                       {statuses.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>

                </Box> 

                <Box sx={{ width:"100%" }}>
                    <FormControl fullWidth sx={{display:"flex", flexDirection:"column", gap:"8px" , width:"100%"}}>
                     <FormLabel  htmlFor="status" sx={{fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Status</FormLabel>
                     <Select id='status-select'  value={tagData.status} onChange={handleTagStatusChange} sx={{width:"100%"}} >
                       {statuses.map((status)=>(<MenuItem key={status.id} value={status.name}>{status.name}</MenuItem>))}
                     </Select>
                </FormControl>
                </Box>

                <Box sx={{ width:"100%",display:"flex" , gap:"8px"}}>
                  <FormControl fullWidth sx={{ display:"flex", flexDirection:"column", gap:"8px", width:"100%"}}>
                    <FormLabel  htmlFor="description" sx={{ fontWeight:"500", fontSize:"14px", textAlign:"start", color:"#1F2937" }}>Description</FormLabel>
                    <TextField type="text"  multiline rows={4} maxRows={4} name="description" value={tagData.description} onChange={handleTagInputChange} fullWidth variant="outlined" sx={{ width:"100%", borderRadius:"8px"}}/>
                  </FormControl>
              </Box>

              <Button type='submit' loading={creatingTag} variant='contained' disabled={!tagData.tagName || !tagData.status || !tagData.description ||  !tagData.options || !tagData.parentTag || creatingTag} sx={{backgroundColor:"#2563EB",fontSize:"16px", fontWeight:"500", color:"#fff"}}>Submit</Button>
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
