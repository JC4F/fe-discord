export interface IRegisterResponse {
  userId: string;
  username: string | null;
  email: string;
  isVerified: boolean;
  accessToken: string;
}

export interface IAuthenErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}
