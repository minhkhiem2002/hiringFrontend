import axios from 'axios';

const API_URL = 'http://localhost:3001'


//LOGIN

export const loginApi = async (email: string, password: string) => {
    const response = await axios.post(API_URL + '/api/user/login', { email, password });
    return response.data; 
  };
  
export const refreshaccess_token = async (refreshToken: string) => {
    const response = await axios.post(API_URL +  '/api/auth/refresh', { refreshToken });
    return response.data.access_token; 
};

//REGISTER 

export const registerApi = async(Fname: string,Lname: string, email: string,phone: string, password: string, confirmPassword: string) => {
  const response = await axios.post(API_URL + '/api/user/signup', {Fname,Lname, email, phone, password, confirmPassword});
  return response.data
}

//GET-INFO

export const getInfoApi = async (access_token: string) => {
  console.log(`Bearer ${access_token}`)
  console.log()
  const response = await axios.get(API_URL + '/api/user/get-info', { 
    headers: {
      token: `Bearer ${access_token}`, 
    }
   })
  return response.data
}