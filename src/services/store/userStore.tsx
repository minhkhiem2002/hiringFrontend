import {create} from 'zustand';
import {UserInfo, StateLogin} from '../interfaces/authInterface'
import {getInfoApi} from '../api/authApi'

type getInfoState = {
    userInfo: UserInfo | null,
}

type getInfoAction = {
    getInfo: () => Promise<UserInfo>;
}

type setInfoAction = {
    setInfo: (userData: UserInfo) => void;
};

type setStateLogin = {
    isLogin: StateLogin | false | true,
}

type setActionLogin = {
    setState: (newState: StateLogin) => void;
}

export const useUserStore = create<getInfoState & getInfoAction & setInfoAction>((set) => ({
    userInfo: null,
    getInfo: async () => {
        try {
            const access_token = localStorage.getItem('access_token');
            console.log('Get here', access_token)
            if (!access_token) {
                console.error('No access token found in localStorage');
                return; 
            }
            const userInfo = await getInfoApi(access_token)
            set({ userInfo: userInfo.data });
            return userInfo.data
        }
        catch (error) {
            console.error('Failed to fetch user data', error);
        }
    },
    setInfo: (userData: UserInfo) => {
        set({ userInfo: userData });
    },
}))

export const useStateLoginStore = create<setStateLogin & setActionLogin>((set) => ({
    isLogin: false,
    setState: async (newState: StateLogin) => {
        try {
            set({isLogin: newState})
        }
        catch (error) {
            console.error('Failed to set state', error);
        }
    }
}))