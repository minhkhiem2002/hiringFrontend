import axios from 'axios';
import { ResetPassword, SendMail, UserInfo, UserPasswordUpdate, UserProfileSkillUpdate } from '../interfaces/authInterface';

const API_URL = 'https://sportappdemo.azurewebsites.net/api/User';
const API_URL_2 = 'https://sportappdemo.azurewebsites.net/api/Customer';

// LOGIN
export const loginApi = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/SignIn`, { email, password });
  return response.data;
};

// REGISTER
export const registerApi = async (
  firstName: string, 
  lastName: string, 
  email: string, 
  password: string, 
  confirmPassword: string
) => {
  const response = await axios.post(
    `${API_URL}/SignUp`, 
    { 
      firstName: firstName, 
      lastName: lastName, 
      email: email, 
      password: password, 
      confirmPassword: confirmPassword 
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
};

// GET-INFO
export const getInfoApi = async (userId: string | null) => {
  const response = await axios.get(`${API_URL}/GetUser?UserId=${userId}`);
  return response.data;
};

// UPDATE-INFO (PUT)
export const updateInfoApi = async (data: UserInfo | null) => {
  let userId = "";
  if (typeof window !== "undefined") {
    userId = sessionStorage.getItem('userId') || "";
  if (!userId) return;
  }
  const response = await axios.put(`${API_URL}/UpdateUser`, data);
  return response.data;
};

// UPDATE PASSWORD (PUT)
export const updatePasswordApi = async (data: UserPasswordUpdate) => {
  let userId = "";
  if (typeof window !== "undefined") {
    userId = sessionStorage.getItem('userId') || "";
  if (!userId) return;
  }
  const response = await axios.put(`${API_URL}/resetPassword/${userId}`, data);
  return response.data;
};

// UPDATE AVATAR (PATCH)
export const updateAvatarApi = async (avatarData: FormData) => {
  let userId = "";
  if (typeof window !== "undefined") {
    userId = sessionStorage.getItem('userId') || "";
  if (!userId) return;
  }
  const response = await axios.patch(`${API_URL}/UpdateAvatar`, avatarData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
};


export const forgetPasswordApi = async (email: string) => {
  const response = await axios.post(`${API_URL}/ForgetPassword`, { email });
  return response.data;
};

export const resetPasswordApi = async (reset: ResetPassword) => {
  const response = await axios.post(`${API_URL}/ResetPassword`,reset);
  return response.data;
};

export const sendEmailApi = async (sendEmail: SendMail) => {
  const response = await axios.post(`${API_URL}/ForgetPassword`,sendEmail);
  return response.data;
};


export const updateCustomerSkillApi = async (data: UserProfileSkillUpdate) => {
  const response = await axios.patch(`${API_URL_2}/UpdateCustomer`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const getCustomerSkillDetailApi = async (customerId: string) => {
  const response = await axios.get(`${API_URL_2}/GetCustomerDetail`, {
    params: { CustomerId: customerId },
  });
  return response.data;
};
