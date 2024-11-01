import axios from 'axios';
import { UserInfo, UserPasswordUpdate } from '../interfaces/authInterface';

const API_URL = 'https://sportappdemo.azurewebsites.net/api/User';

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
export const getInfoApi = async (userId: string) => {
  const response = await axios.get(`${API_URL}/GetUser?UserId=${userId}`);
  return response.data;
};

// UPDATE-INFO (PUT)
export const updateInfoApi = async (data: UserInfo) => {
  const userId = sessionStorage.getItem('userId');
  if (!userId) return;
  
  const response = await axios.put(`${API_URL}/UpdateUser`, data);
  return response.data;
};

// UPDATE PASSWORD (PUT)
export const updatePasswordApi = async (data: UserPasswordUpdate) => {
  const userId = sessionStorage.getItem('userId');
  if (!userId) return;

  const response = await axios.put(`${API_URL}/resetPassword/${userId}`, data);
  return response.data;
};

// UPDATE AVATAR (PATCH)
export const updateAvatarApi = async (avatarData: FormData) => {
  const userId = sessionStorage.getItem('userId');
  if (!userId) return;

  const response = await axios.patch(`${API_URL}/UpdateAvatar`, avatarData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
};
