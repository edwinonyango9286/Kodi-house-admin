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



export interface Invoice {
  _id: string;
  createdBy: {
    userName: string;
  };
  invoiceNumber: string;
  description: string;
  allowedMethodOfPayment: string;
  recurringStatus: string;
  invoiceCategory: string;
  amount: number;
  tenant: {
    userName: string;
  };
  property: {
    name: string;
  };
  unit: {
    unitNumber?: string;
  };
  invoiceDate: Date;
  dueDate: Date;
  status: string;
}

export interface RenameRolePayload {
   roleId:string
   name: string;
}

export interface Role {
  _id: string;
  name: string;
  status: string;
}

export interface SupportTicketType {
  _id: string;
  name: string;
  description: string;
  status: string;
  createdBy: {
    userName: string;
  };
  createdAt: Date;
}

export interface PropertyTypeTag {
  _id: string;
  createdBy: {
    userName: string;
  };
  name: string;
  status: string;
  description: string;
  slug: string;
  createdAt: Date;
}

export interface Category {
  _id: string;
  createdBy: {
    userName: string;
  };
  categoryName: string;
  status: string;
  description: string;
  parentCategory: string;
  createdAt: Date;
}

export interface Tag {
  _id: string;
  createdBy: {
    userName: string;
  };
  tagName: string;
  description: string;
  parentTag: string;
  status: string;
  createdAt: Date;
}

export interface PropertyCategory {
  _id: string;
  createdBy: {
    userName: string;
  };
  name: string;
  status: string;
  description: string;
  slug: string;
  createdAt: Date;
}



export interface Permission {
  _id:string,
  permissionName:string,
  status:string,
 }
