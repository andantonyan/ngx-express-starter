import { IUser } from './user';

/**
 * Path /api/auth/login
 */
export interface ILoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface ILoginResponse extends IUser {
}

