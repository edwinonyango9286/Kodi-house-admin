export interface CreateAccountPayload {
  userName: string;
  email: string;
  password: string;
  termsAndConditionsAccepted: boolean;
}

export interface VerifyCodePayload {
  activationToken: string;
  activationCode: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

// create role
export interface CreateRolePayload {
  name: string;
  status: string;
  description: string;
}

export interface CreatePermissionPayload {
  permissionName: string;
  status: string;
  description: string;
}

export interface AddUserPayload {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  phoneNumber: string;
  description: string;
}

export interface AddUserResponse {
  status: boolean;
  message: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UpdateUserInfoPayload {
  email: string;
  phoneNumber: string;
  firstName: string;
  secondName: string;
  lastName: string;
  idNumber: string;
  address: string;
}

export interface CreatePropertyTypePayload {
  name: string;
  status: string;
  description: string;
}

export interface CreatePropertyTypeResponse {
  status: string;
  message: string;
}

export interface CreatePropertyCategoryPayload {
  name: string;
  status: string;
  description: string;
}

export interface CreatePropertyTagPayload {
  name: string;
  description: string;
  status: string;
}

export interface CreatePropertyTagResponse {
  status: string;
  message: string;
}

export interface CreateSupportTicketPayload {
  name: string;
  status: string;
  description: string;
}

export interface CreateSupportTicketResponse {
  status: string;
  message: string;
}

export interface CreateCategoryPayload {
  categoryName: string;
  parentCategory: string;
  status: string;
  options: string;
  description: string;
}

export interface CreateTagPayload {
  tagName: string;
  parentTag: string;
  status: string;
  options: string;
  description: string;
}

export interface RequestResetPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  password: string;
  confirmPassword: string;
  token?: string;
}

export interface Payments {
  _id: string;
}

export interface Receipts {
  _id: string;
}

export interface Landlord {
  _id: string;
  userName: string;
  email: string;
  status: string;
  phoneNumber?: string;
}

export interface User {
  userName: string;
  email: string;
  role: {
    name: string;
  };
  avatar: {
    secure_url: string;
  };
}

export interface Property {
  _id: string;
  createdBy: {
    userName: string;
  };
  name: string;
  type: string;
  numberOfUnits: number;
  occupiedUnits: number;
  currentStatus: string;
  category: string;
  images: Array<{
    secure_url: string;
    public_id: string;
    _id: string;
  }>;
}
