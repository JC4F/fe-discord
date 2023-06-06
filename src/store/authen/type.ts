export interface IAuthenResponse {
  userId: string;
  username: string | null;
  email: string;
  isVerified: boolean;
  dob: string;
  imageUrl: string;
  phone: string | null;
  joinDate: string;
  accessToken: string;
}

export interface IAuthenSyncParams {
  type: "REGISTER" | "LOGIN" | "SSO_GOOGLE" | "SSO_FACEBOOK";
  submitData: Record<string, any>;
}

export interface IAuthenErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export type IUserState = "ACTIVE" | "INACTIVE" | "BUSY" | "WAIT";

export interface IUserSettings {
  isMicOn: boolean;
  isHeadPhoneOn: boolean;
  isDarkMode: boolean;
  userState: IUserState;
}
