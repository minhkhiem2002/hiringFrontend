import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { UserInfo, UserPasswordUpdate, UserInfoUpdate } from '../interfaces/authInterface';
import { getInfoApi, updateInfoApi, updatePasswordApi, updateAvatarApi } from '../api/authApi';

type UserStoreState = {
  userInfo: UserInfo | null;
  loading: boolean;
  isLogin: boolean;
  putSuccess: boolean;
  getInfo: (userId: string | null) => Promise<UserInfo | null>;
  setInfo: (userData: UserInfo | null) => void;
  updateInfo: (userData: UserInfoUpdate) => Promise<void>;
  updateAvatar: (avatarData: FormData) => Promise<void>;
  updatePassword: (userData: UserPasswordUpdate) => Promise<void>;
  setState: (newState: boolean) => void;
};

type PersistedState = (
  config: (set: any, get: any, api: any) => UserStoreState,
  options: PersistOptions<UserStoreState>
) => (set: any, get: any, api: any) => UserStoreState;

export const useUserStore = create<UserStoreState>(
  (persist as PersistedState)(
    (set) => ({
      userInfo: null,
      isLogin: false,
      loading: false,
      putSuccess: false,

      getInfo: async (userId: string | null) => {
        set({ loading: true });
        try {
          const userInfo = await getInfoApi(userId);
          if (userInfo) {
            set({ userInfo, isLogin: true });
            return userInfo;
          }
        } catch (error) {
          console.error('Failed to fetch user data', error);
        } finally {
          set({ loading: false });
        }
        return null;
      },

      setInfo: (userData: UserInfo | null) => {
        set({ userInfo: userData });
      },

      updateInfo: async (userData: UserInfoUpdate) => {
        set({ loading: true, putSuccess: false });
        try {
          const updatedUserInfo = await updateInfoApi(userData);
          if (updatedUserInfo) {
            set({ userInfo: updatedUserInfo, isLogin: true, putSuccess: true });
          }
        } catch (error) {
          console.error('Failed to update user data', error);
          set({ putSuccess: false });
        } finally {
          set({ loading: false });
        }
      },

      updateAvatar: async (avatarData: FormData) => {
        set({ loading: true, putSuccess: false });
        try {
          const updatedAvatar = await updateAvatarApi(avatarData);
          if (updatedAvatar) {
            set((state: any) => ({
              userInfo: { ...state.userInfo, avatar: updatedAvatar } as UserInfo,
              putSuccess: true
            }));
          }
        } catch (error) {
          console.error('Failed to update avatar', error);
          set({ putSuccess: false });
        } finally {
          set({ loading: false });
        }
      },

      updatePassword: async (userData: UserPasswordUpdate) => {
        set({ loading: true });
        try {
          const updatedPassword = await updatePasswordApi(userData);
          if (updatedPassword) {
            set({ isLogin: true });
          }
        } catch (error) {
          console.error('Failed to update user password', error);
        } finally {
          set({ loading: false });
        }
      },

      setState: (newState: boolean) => {
        set({ isLogin: newState });
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
);
