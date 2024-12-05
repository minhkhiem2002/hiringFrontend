import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, SignUpUser, ResetPassword, SendMail } from '../interfaces/authInterface';
import { loginApi, registerApi } from '../api/authApi';
import { forgetPasswordApi, resetPasswordApi, sendEmailApi } from '../api/authApi';
import { toast } from 'react-toastify';

type State = {
  user: User | null;
  isLogin: boolean;
};

type Action = {
  login: (email: string, password: string) => Promise<User | null>;
};

type SUpState = {
  signUpUser: SignUpUser | null;
  isLogin: boolean;
};

type SUpAction = {
  register: (firstName: string, lastName: string, email: string, password: string, confirmPassword: string) => Promise<void>;
};

export const useAuthStore = create<State & Action>(
  persist(
    (set) => ({
      user: null,
      isLogin: false,

      login: async (email: string, password: string) => {
        try {
          const response = await loginApi(email, password);
          if (response) {
            const { id, userRoleId, email, token, role } = response;

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userId', id);
            sessionStorage.setItem('roleId',userRoleId)
            sessionStorage.setItem('email',email)

            set({
              user: { id, userRoleId, email, token, role },
              isLogin: true,
            });

            return response;
          }
        } catch (error) {
          toast.error(error.response.data.message, { autoClose: 1500 });
          console.error('Login failed', error);
          set({ isLogin: false });
          return null;
        }
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export const useSignUpStore = create<SUpState & SUpAction>(
  persist(
    (set) => ({
      signUpUser: null,
      isLogin: false,  // Always keep isLogin false for registration store

      register: async (firstName: string, lastName: string, email: string, password: string, confirmPassword: string) => {
        try {
          const response = await registerApi(firstName, lastName, email, password, confirmPassword);
          if (response) {
            set({ signUpUser: response });  // Only set signUpUser
            return response;
          } else {
            return null;
          }
        } catch (error) {
          toast.error(error.response.data.message, { autoClose: 1500 });
          console.error('Register failed', error);
          return null;
        }
      },
    }),
    {
      name: 'signup-storage',
      getStorage: () => localStorage,
    }
  )
);

interface ForgetPassword {
  data: string | null;
  isLoading: boolean;
  isError: boolean;
  forgetPassword: (email: string) => Promise<boolean>;
  resetPassword: (reset: ResetPassword) => Promise<boolean>;
  sendEmail: (sendMail: SendMail) => Promise<boolean>;
}

export const useForgetPasswordStore = create<ForgetPassword>((set, get) => ({
  data: null,
  isLoading: false,
  isError: false,
  forgetPassword: async (email: string) => {
    if (!email) return;
    set({ isLoading: true, isError: false})
    try { 
      const forgetData = await forgetPasswordApi(email)
      if (forgetData) {
        set({ data: forgetData ,isLoading: false, isError: false})
      } else {
        set({ data: forgetData ,isLoading: false, isError: true})
      }
      return forgetData;
    } catch (err) {
      toast.error(err.response.data.message, { autoClose: 1500 });
      console.error('failed', err);
      return false;;
    }
  },
  resetPassword: async (reset: ResetPassword) => {
    if (!reset) return;
    set({ isLoading: true, isError: false})
    try { 
      const resetData = await resetPasswordApi(reset)
      if (resetData) {
        set({ data: resetData ,isLoading: false, isError: false})
      } else {
        set({ data: resetData ,isLoading: false, isError: true})
      }
      return resetData;
    } catch (err) {
      toast.error(err.response.data.message, { autoClose: 1500 });
      console.error('failed', err);
      return false;;
    }
  },
  sendEmail: async (sendMail: SendMail) => {
    if (!sendMail) return;
    set({ isLoading: true, isError: false})
    try { 
      const sendMailData = await sendEmailApi(sendMail)
      if (sendMailData) {
        set({ data: sendMailData ,isLoading: false, isError: false})
      } else {
        set({ data: sendMailData ,isLoading: false, isError: true})
      }
      return sendMailData;
    } catch (err) {
      toast.error(err.response.data.message, { autoClose: 1500 });
      console.error('failed', err);
      return false;;
    }
  }
}))