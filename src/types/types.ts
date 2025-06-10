export interface ICreateAccountPayload {
  username: string;
  email: string;
  password: string;
  acceptTermsAndConditions: boolean;
}

export interface ICreateAccountResponse {
  accessToken: string;
  refreshToken: string;
}

// create role
export interface ICreateRolePayload {
  roleName:string,
  status:string,
  description:string,
}

export interface ICreateRoleResponse {
  status: boolean;
  message: string;
}

export interface ICreatePermissionPayload {
  permissionName:string,
  status:string,
  description:string
}

export interface ICreatePermissionResponse {
  status:boolean,
  message:string
}

export interface  IAddUserPayload {
  role:string,
  firstName:string,
  lastName:string,
  email:string,
  status:string,
  phoneNumber:string,
  description:string
}

export interface IAddUserResponse {
  status:boolean,
  message:string,
}

export interface IUpdatePasswordPayload {
  currentPassword:string,
  newPassword:string,
  confirmNewPassword:string
}

export  interface IUpdatePasswordResponse {
  status:boolean,
  message:string,
}

export interface IUpdateUserInfoPayload {
   email:string,
   phoneNumber:string,
   firstName:string,
   secondName:string, 
   lastName:string, 
   nationalId:string, 
   address:string
}

export interface IUpdateUserInfoResponse {
  status:string,
  message:string,
}

export interface ICreatePropertyTypePayload {
  propertyTypeName:string,
  status:string,
  description:string,
}

export interface ICreatePropertyTypeResponse {
  status:string,
  message:string,
}

export interface ICreatePropertyCategoryPayload {
  propertyCategoryName:string,
  status:string,
  description:string,
}

export interface ICreatePropertyCategoryResponse {
  status:string,
  message:string
}

export interface ICreatePropertyTagPayload {
  propertyTagName:string,
  description:string,
  status:string,
}

export interface ICreatePropertyTagResponse {
  status:string,
  message:string,
}

export interface ICreateSupportTicketPayload {
  supportTicketName:string,
  status:string,
  description:string
}

export interface ICreateSupportTicketResponse {
  status:string,
  message:string
}