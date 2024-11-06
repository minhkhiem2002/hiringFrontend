import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, SignUpUser } from '../interfaces/authInterface';
import { loginApi, registerApi } from '../api/authApi';

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

            set({
              user: { id, userRoleId, email, token, role },
              isLogin: true,
            });

            return response;
          }
        } catch (error) {
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
