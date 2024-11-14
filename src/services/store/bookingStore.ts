import { create } from 'zustand';
import { Booking } from '../interfaces/bookingInterface';
import { createBookingApi } from '../api/bookingApi';

interface BookingState {
    booking: Booking | null;
    loading: boolean;
    error: string | null;
    fetchBookingData: (booking: Booking | null) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
    booking: null,
    loading: false,
    error: null,
    fetchBookingData: async (booking) => {
      set({ loading: true, error: null });
      try {
        const bookingData = await createBookingApi(booking);
        set({ booking: bookingData, loading: false });
        return bookingData
      } catch (error) {
        set({ error: 'Failed to fetch booking data', loading: false });
      }
    },
  }));