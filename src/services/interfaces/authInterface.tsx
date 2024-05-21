export interface User {
    access_token: string;
    refresh_token: string;
}

export interface SignUpUser {
    Fname: string, 
    Lname: string, 
    email: string,
    phone: string,
    password: string, 
    confirmPassword: string
}

export interface UserInfo {
    Fname: string, 
    Lname: string, 
    email: string,
    phone: string,
    password: string, 
    role: string,
    avatar: string
}

export interface StateLogin {
    isLogin: boolean;
}