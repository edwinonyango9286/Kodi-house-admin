export interface CreateAccountPayload {
  userName: string;
  email: string;
  password: string;
  termsAndConditionsAccepted: boolean;
}

export interface Transaction {
  _id?: string;
  transactionDate: string;
  transactionName: string;
  amount: string;
  status: "pending" | "completed" | "failed" | "refunded";
  transactionId: string;
  currency?: string;
  description?: string;
  transactionBy: {
    userName: string;
  };
}

export interface AppBarProps {
  open?: boolean;
  toggleDrawer?: () => void;
  handleLogout: () => Promise<void>;
  loggingOut: boolean;
}
export interface DrawerProps {
  open: boolean;
  toggleDrawer?: () => void;
  children?: React.ReactNode;
  navItems?: DrawerItem[];
  handleLogout: () => Promise<void>;
  loggingOut: boolean;
}

export interface DrawerItem {
  id: string;
  text: React.ReactElement;
  icon?: React.ReactNode;
  path?: string;
  children?: DrawerItem[];
  divider?: boolean;
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
  roleId: string;
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
  _id: string;
  permissionName: string;
  status: string;
}

export interface User {
  _id: string;
  avatar: {
    secure_url: string;
    public_id: string;
  };
  userName: string;
  email: string;
  role: {
    _id: string;
    name: string;
  };
  status: string;
}

export interface features {
  swimmingPool: boolean;
  airConditioning: boolean;
  internet: boolean;
  terrace: boolean;
  coffeePot: boolean;
  towels: boolean;
  radio: boolean;
  balcony: boolean;
  roofTerrace: boolean;
  grill: boolean;
  computer: boolean;
  gym: boolean;
  tvCable: boolean;
  parquet: boolean;
  oven: boolean;
}

export interface Image {
  secure_url: string;
  public_id: string;
  asset_id: string;
  _id: string;
}
export interface Property {
  features: features;
  _id: string;
  createdBy: User;
  updatedAt: string;
  type: string;
  category: string;
  currentOccupant: string;
  name: string;
  users: User[];
  occupiedUnits: number;
  vacantUnits: number;
  rent: number;
  briefDescription: string;
  googleMap: string;
  images: Image[];
  numberOfBedRooms: number;
  numberOfBathRooms: number;
  location: string;
  currentStatus: string;
  isDeleted: string;
  deletedAt: string | null;
  videos: [];
  createdAt: string;
}
