export interface IAuthenResponse {
  userId: string;
  username: string | null;
  email: string;
  isVerified: boolean;
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
