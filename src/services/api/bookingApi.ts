import axios from 'axios';
import { Booking } from '../interfaces/bookingInterface';

export const createBookingApi = async (booking: Booking | null) => {
    try {
      const response = await axios.post('https://sportappdemo.azurewebsites.net/api/Booking/CreateBooking', booking)
      return response.data;
    } catch (error) {
      console.error("Error booking:", error);
      throw error;
    }
  }