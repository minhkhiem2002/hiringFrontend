import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { UserInfo,UserProfileSkill, UserPasswordUpdate, UserInfoUpdate, UserProfileSkillUpdate } from '../interfaces/authInterface';
import { getInfoApi, updateInfoApi,updateCustomerSkillApi,getCustomerSkillDetailApi, updatePasswordApi, updateAvatarApi } from '../api/authApi';

type UserStoreState = {
  userInfo: UserInfo | null;
  loading: boolean;
  putSuccess: boolean;
  customerDetail: UserProfileSkill | null,
  getInfo: (userId: string | null) => Promise<UserInfo | null>;
  getSkill: (customerId: string | null) => Promise<UserProfileSkill | null>;
  setInfo: (userData: UserInfo | null) => void;
  updateInfo: (userData: UserInfoUpdate) => Promise<void>;
  updateSkill: (data: UserProfileSkill) => Promise<void>;
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
      loading: false,
      putSuccess: false,
      customerDetail: null,
      getInfo: async (userId: string | null) => {
        set({ loading: true });
        try {
          const userInfo = await getInfoApi(userId);
          if (userInfo) {
            set({ userInfo });
            return userInfo;
          }
        } catch (error) {
          console.error('Failed to fetch user data', error);
          set({ userInfo: null });
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
            const userId = sessionStorage.getItem('userId');
            const userInfo = await getInfoApi(userId);
          if (userInfo) {
            set({ userInfo });
            
          }
            set({ putSuccess: true });
          }
          return updatedUserInfo;
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
            const userId = sessionStorage.getItem('userId');
            const userInfo = await getInfoApi(userId);
          if (userInfo) {
            set({ userInfo });
            
          }
            set({ putSuccess: true });
          }
          return updatedAvatar;
        } catch (error) {
          console.error('Failed to update avatar', error);
          set({ putSuccess: false });
        } finally {
          set({ loading: false });
        }
      },

      updatePassword: async (userData: UserProfileSkillUpdate) => {
        set({ loading: true });
        try {
          const updatedPassword = await updatePasswordApi(userData);
          if (updatedPassword) {
            console.log('Password updated successfully');
          }
        } catch (error) {
          console.error('Failed to update user password', error);
        } finally {
          set({ loading: false });
        }
      },

      // Fetch Customer Detail
      getSkill: async (customerId: string) => {
        set({ loading: true });
        try {
          const customerDetail = await getCustomerSkillDetailApi(customerId);
          set({ customerDetail });
        } catch (error) {
          console.error('Failed to fetch customer detail', error);
        } finally {
          set({ loading: false });
        }
      },

      // Update Customer
      updateSkill: async (data: UserProfileSkill) => {
        set({ loading: true, updateSuccess: false });
        try {
          const response = await updateCustomerSkillApi(data);
          if (response) {
            const userId = sessionStorage.getItem('roleId');
            const customerDetail = await getCustomerSkillDetailApi(userId);
            if (customerDetail) {
              set({ customerDetail });
            }
          set({ updateSuccess: true });
          }
          return response;
        } catch (error) {
          console.error('Failed to update customer information', error);
        } finally {
          set({ loading: false });
        }
      },

      setState: (newState: boolean) => {
        // You can repurpose this method as needed since isLogin is removed.
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
);
