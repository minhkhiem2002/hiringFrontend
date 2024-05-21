import {create} from 'zustand';
import { User, SignUpUser } from '../interfaces/authInterface';
import { loginApi, refreshaccess_token, registerApi } from '../api/authApi';

type State = {
  user: User | null;
};

type Action = {
  login: (email: string, password: string) => Promise<void>;
  // startTokenRefresh: () => void;
};

type SUpState = {
  signUpUser: SignUpUser | null; 
}

type SUpAction = {
  register: (Fname: string,Lname: string, email: string,phone: string, password: string, confirmPassword: string) => Promise<void>;
}

export const useAuthStore = create<State & Action>((set, get) => ({
  user: null,
  login: async (email: string, password: string) => {
    try {
      console.log('Here 2', email, password);
      const response = await loginApi(email, password);
      console.log('Here 3', response);
      const { access_token, refresh_token } = response;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      set({ user: { access_token, refresh_token } });

      // if (access_token) {
      //   get().startTokenRefresh();
      // }
    } catch (error) {
      console.error('Login failed', error);
    }
  },
  // startTokenRefresh: () => {
  //   const intervalId = setInterval(async () => {
  //     try {
  //       const user = get().user;
  //       if (!user || !user.refresh_token) return;

  //       const newaccess_token = await refreshaccess_token(user.refresh_token);
  //       console.log('New Access Token:', newaccess_token);
  //       console.log('Type of newaccess_token:', typeof newaccess_token);

  //       if (typeof newaccess_token === 'string') {
  //         localStorage.setItem('access_token', newaccess_token);
  //         set({
  //           user: {
  //             ...user,
  //             access_token: newaccess_token,
  //           },
  //         });
  //       } else {
  //         console.error('newaccess_token is not a string:', newaccess_token);
  //       }
  //     } catch (error) {
  //       console.error('Failed to refresh access token', error);
  //     }
  //   }, 30000); 

  //   return () => clearInterval(intervalId);
  // },
}));

export const useSignUpStore = create<SUpState & SUpAction>((set) => ({
  signUpUser: null,
  register: async (Fname: string,Lname: string, email: string,phone: string, password: string, confirmPassword: string) => {
    try {
      const response = await registerApi(Fname,Lname,email,phone, password,confirmPassword);
      console.log(response)
    } 
    catch (error) {
      console.error('Register failed', error);
    }
  }
}))


type AuthStore = {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  toggleLoginModal: () => void;
  toggleRegisterModal: () => void;
};

export const useToggleAuthStore = create<AuthStore>((set) => ({
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  toggleLoginModal: () => set((state) => ({ isLoginModalOpen: !state.isLoginModalOpen })),
  toggleRegisterModal: () => set((state) => ({ isRegisterModalOpen: !state.isRegisterModalOpen })),
}));