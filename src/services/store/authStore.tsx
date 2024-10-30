import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, SignUpUser } from '../interfaces/authInterface';
import { loginApi, registerApi } from '../api/authApi';

type State = {
  user: User | null;
};

type Action = {
  login: (email: string, password: string) => Promise<User | null>;
};

type SUpState = {
  signUpUser: SignUpUser | null;
};

type SUpAction = {
  register: (email: string, password: string, confirmPassword: string, firstName: string, lastName: string) => Promise<void>;
};

export const useAuthStore = create<State & Action>(
  persist(
    (set) => ({
      user: null,

      login: async (email: string, password: string) => {
        try {
          const response = await loginApi(email, password);
          if (response) {
            const { id, userRoleId, email, token, role } = response;

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userId', id);

            set({
              user: { id, userRoleId, email, token, role },
            });

            return response;
          }
        } catch (error) {
          console.error('Login failed', error);
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

      register: async (email: string, password: string, confirmPassword: string, firstName: string, lastName: string) => {
        try {
          const response = await registerApi(firstName, lastName, email, password, confirmPassword);
          if (response == true)
          {return response}
          else return null
        } catch (error) {
          console.error('Register failed', error);
          return null
        }
      },
    }),
    {
      name: 'signup-storage',
      getStorage: () => localStorage,
    }
  )
);
