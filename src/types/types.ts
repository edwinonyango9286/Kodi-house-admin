export interface ICreateAccountPayload {
  userName: string;
  email: string;
  password: string;
  termsAndConditionsAccepted: boolean;
}

export interface IVerifyCodePayload {
  activationToken:string,
  activationCode:string
}

export interface ISignInPayload {
  email:string,
  password:string,
}

// create role
export interface ICreateRolePayload {
  name:string,
  status:string,
  description:string,
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
  name:string,
  status:string,
  description:string,
}

export interface ICreatePropertyTypeResponse {
  status:string,
  message:string,
}

export interface ICreatePropertyCategoryPayload {
  name:string,
  status:string,
  description:string,
}

export interface ICreatePropertyCategoryResponse {
  status:string,
  message:string
}

export interface ICreatePropertyTagPayload {
  name:string,
  description:string,
  status:string,
}

export interface ICreatePropertyTagResponse {
  status:string,
  message:string,
}

export interface ICreateSupportTicketPayload {
  name:string,
  status:string,
  description:string
}

export interface ICreateSupportTicketResponse {
  status:string,
  message:string
}

export interface ICreateCategoryPayload {
  categoryName:string,
  parentCategory:string,
  status:string,
  options:string,
  description:string
}

export interface ICreateCategoryResponse {
  message:string,
  status:string,
}

export interface ICreateTagPayload {
  tagName:string,
  parentTag:string,
  status:string,
  options:string,
  description:string
}

export interface ICreateTagResponse {
  message:string,
  status:string,
}

export interface IRequestResetPasswordEmail {
  email:string
}

export interface  IResetPasswordPayload {
  password:string,
  confirmPassword:string
  token?:string
}
