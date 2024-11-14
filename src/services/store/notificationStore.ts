import { create } from 'zustand';
import { Notification } from '../interfaces/notificationInterface';
import { getCountNotifyApi, getNotifyApi, NotificationParams } from '../api/notificationApi';

interface NotificationsState {
  notifications: Notification[]; // List of notifications
  notificationCount: number; // Total count of notifications
  count: number;
  loading: boolean; // Loading state for notifications
  error: string | null; // Error message, if any
  fetchNotifications: (params: NotificationParams) => Promise<void>;
  fetchNotificationCount: (userId: string | null) => Promise<void>;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  notificationCount: 0,
  loading: false,
  error: null,

  // Fetch the notifications list
  fetchNotifications: async (params) => {
    set({ loading: true, count: 0, error: null });
    try {
      const notificationsData = await getNotifyApi(params);
      set({ notifications: notificationsData.notifications, count: notificationsData.count,  loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch notifications', loading: false });
    }
  },

  // Fetch the count of unread notifications
  fetchNotificationCount: async (userId) => {
    set({ loading: true, error: null });
    try {
      const countData = await getCountNotifyApi(userId);
      set({ notificationCount: countData, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch notification count', loading: false });
    }
  },
}));
