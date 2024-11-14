import axios from 'axios';
import { Notification } from '../interfaces/notificationInterface';

export interface NotificationParams {
  UserId: string | null,
  PageNumber: number,
  PageSize: number
}

export const getCountNotifyApi = async (userId: string | null) => {
    try {
        const response = await axios.get(
            `https://sportappdemo.azurewebsites.net/api/Notification/GetCountNotify`, {
              params: {
                UserId: userId, 
              },
            }
          )
      return response.data;
    } catch (error) {
      console.error("Error get notify:", error);
      throw error;
    }
  }

  export const getNotifyApi = async (params: NotificationParams) => {
    try {
        const response = await axios.get(
            `https://sportappdemo.azurewebsites.net/api/Notification/GetByUser`, {
              params: {
                UserId: params.UserId,
                PageNumber: params.PageNumber,
                PageSize: params.PageSize
              },
            }
          )
      return response.data;
    } catch (error) {
      console.error("Error get notify:", error);
      throw error;
    }
  }