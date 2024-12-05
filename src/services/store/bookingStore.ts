import { create } from 'zustand';
import { Booking, GetBookingByCustomer,GetOrderByCustomer, GetBookingByCustomerParams, GetOrderByCustomerParams } from '../interfaces/bookingInterface';
import { createBookingApi, getBookingByCustomerApi, getOrderByCustomerApi  } from '../api/bookingApi';

interface BookingState {
  booking: Booking | null;
  bookings: GetBookingByCustomer[]; 
  orders: GetOrderByCustomer[];
  loading: boolean;
  error: string | null;
  fetchBookingData: (booking: Booking | null) => Promise<void>;
  fetchBookingsByCustomer: (params: GetBookingByCustomerParams) => Promise<void>; 
  fetchOrdersByCustomer: (params: GetOrderByCustomerParams) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
  booking: null,
  bookings: [], 
  orders: [],
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
  fetchOrdersByCustomer: async (params) => {
    set({ loading: true, error: null });
    try {
      const ordersData = await getOrderByCustomerApi(params);
      set({ orders: ordersData, loading: false });
      return ordersData;
    } catch (error) {
      set({ error: 'Failed to fetch orders for customer', loading: false });
    }
  },
}));
