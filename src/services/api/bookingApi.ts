import axios from 'axios';
import { Booking, GetBookingByCustomer, GetBookingByCustomerParams } from '../interfaces/bookingInterface';

export const createBookingApi = async (booking: Booking | null) => {
    try {
      const response = await axios.post('https://sportappdemo.azurewebsites.net/api/Booking/CreateBooking', booking)
      return response.data;
    } catch (error) {
      console.error("Error booking:", error);
      throw error;
    }
  }

  export const getBookingByCustomerApi = async (params: GetBookingByCustomerParams) => {
    try {
      const response = await axios.get(
        `https://sportappdemo.azurewebsites.net/api/Booking/GetBookingByCustomer`, {
          params: {
            CustomerId: params.CustomerId,
            PageSize: params.PageSize,
            PageNumber: params.PageNumber
          }
        }
      );
      return response.data as GetBookingByCustomer[]; 
    } catch (error) {
      console.error("Error get booking by customer:", error);
      throw error;
    }
  };