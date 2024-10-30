import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserInfo, UserPasswordUpdate } from '../interfaces/authInterface';
import { getInfoApi, updateInfoApi, updatePasswordApi, updateAvatarApi } from '../api/authApi';

type getInfoState = {
  userInfo: UserInfo | null;
  loading: boolean;
};

type getInfoAction = {
  getInfo: (userId: string | null) => Promise<UserInfo | null>;
};

type setInfoAction = {
  setInfo: (userData: UserInfo | null) => void;
};

type UpdateInfoAction = {
  updateInfo: (userData: UserInfo | null) => Promise<void>;
};

type UpdateAvatarAction = {
  updateAvatar: (avatarData: FormData) => Promise<void>;
};

type updatePasswordAction = {
  updatePassword: (userData: UserPasswordUpdate) => Promise<void>;
};

type setStateLogin = {
  isLogin: boolean;
};

type setActionLogin = {
  setState: (newState: boolean) => void;
};

export const useUserStore = create<
  getInfoState & getInfoAction & setInfoAction & setStateLogin & setActionLogin & UpdateInfoAction & UpdateAvatarAction & updatePasswordAction
>(
  persist(
    (set) => ({
      userInfo: null,
      isLogin: false,
      loading: false, 

      getInfo: async (userId: string) => {
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

      setInfo: (userData: UserInfo) => {
        set({ userInfo: userData });
      },

      updateInfo: async (userData: UserInfoUpdate) => {
        set({ loading: true });
        try {
          const updatedUserInfo = await updateInfoApi(userData);
          if (updatedUserInfo) {
            set({ userInfo: updatedUserInfo, isLogin: true });
            return true
          }
        } catch (error) {
          console.error('Failed to update user data', error);
          return false
        } finally {
          set({ loading: false });
        }
      },

      updateAvatar: async (avatarData: FormData) => {
        set({ loading: true });
        try {
          const updatedAvatar = await updateAvatarApi(avatarData);
          if (updatedAvatar) {
            set((state) => ({
              userInfo: { ...state.userInfo, avatar: updatedAvatar } as UserInfo,
            }));
          }
          return updatedAvatar.data;
        } catch (error) {
          console.error('Failed to update avatar', error);
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
