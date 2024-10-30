export interface User {
    id: string;
    userRoleId: string;
    email: string;
    token: string;
    role: string;
  }
  
  export interface SignUpUser {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    confirmPassword: string;
  }
  
  export interface UserInfo {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    location: string;
    dateOfBirth: string;
    gender: string;
    role: string;
    avatar: string;
  }

  
  export interface UserPasswordUpdate {
    password: string;
    confirmPassword: string;
  }
  
  export interface StateLogin {
    isLogin: boolean;
  }
  
  export interface LoginApiResponse {
    status: number;
    access_token: string;
    userId: string;
    refresh_token: string;
    message?: string;
  }
  