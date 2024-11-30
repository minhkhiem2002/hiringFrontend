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

export interface UserInfoUpdate {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  location?: string;
  dateOfBirth?: string;
  gender?: string;
  avatar?: string;
  role? : string;
}

export interface UserPasswordUpdate {
  password: string;
  confirmPassword: string;
}

export interface UserProfileSkill {
  interest: string;
  height: string;
  weight: string;
  skills: string;
  address: string;
  time: string
}

export interface UserProfileSkillUpdate {
  customerId: string;
  interest: string;
  height: number;
  weight: number;
  skills: string;
  address: string;
  time: string
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


export interface ForgetPassword {
  email: string;
}

export interface SendMail {
  toEmail: string;
  subject: string;
  body: string;
}

export interface ResetPassword {
  email: string;
  decodedToken: string;
  password: string;
}