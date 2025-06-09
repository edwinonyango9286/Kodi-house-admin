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

