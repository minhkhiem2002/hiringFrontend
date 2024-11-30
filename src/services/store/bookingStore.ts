import { create } from 'zustand';
import { Booking, GetBookingByCustomer, GetBookingByCustomerParams } from '../interfaces/bookingInterface';
import { createBookingApi, getBookingByCustomerApi } from '../api/bookingApi';

interface BookingState {
  booking: Booking | null;
  bookings: GetBookingByCustomer[]; // Thêm state cho danh sách booking của khách hàng
  loading: boolean;
  error: string | null;
  fetchBookingData: (booking: Booking | null) => Promise<void>;
  fetchBookingsByCustomer: (params: GetBookingByCustomerParams) => Promise<void>; // Phương thức mới để lấy dữ liệu booking
}

export const useBookingStore = create<BookingState>((set) => ({
  booking: null,
  bookings: [], // Khởi tạo mảng booking trống
  loading: false,
  error: null,
  fetchBookingData: async (booking) => {
    set({ loading: true, error: null });
    try {
      const bookingData = await createBookingApi(booking);
      set({ booking: bookingData, loading: false });
      return bookingData;
    } catch (error) {
      set({ error: 'Failed to fetch booking data', loading: false });
    }
  },
  fetchBookingsByCustomer: async (params: GetBookingByCustomerParams) => { // Hàm mới
    set({ loading: true, error: null });
    try {
      const bookingsData = await getBookingByCustomerApi(params);
      set({ bookings: bookingsData, loading: false });
      return bookingsData;
    } catch (error) {
      set({ error: 'Failed to fetch bookings for customer', loading: false });
    }
  },
}));
