export interface ICreateAccountFormData {
  username: string;
  email: string;
  password: string;
  acceptTermsAndConditions: boolean;
}

export interface ICreateAccountResponse {
  accessToken: string;
  refreshToken: string;
}