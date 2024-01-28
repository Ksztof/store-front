export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export interface LoginCredentials {
    email: string;
    password: string;
  }

export interface RegisterCredentials {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  loading: boolean;
  userData: any; 
  error: string | null;
  isLoggedIn: boolean;
}