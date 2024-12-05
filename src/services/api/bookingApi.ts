import axios from 'axios';
import { Booking, GetBookingByCustomer, GetBookingByCustomerParams, GetOrderByCustomer, GetOrderByCustomerParams } from '../interfaces/bookingInterface';

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

  export const getOrderByCustomerApi = async (params: GetOrderByCustomerParams) => {
    try {
      const response = await axios.get(
        `https://sportappdemo.azurewebsites.net/api/Order/GetOrderByUser`,
        {
          params: {
            Email: params.Email,
            Status: params.Status || null,
            PageSize: params.PageSize,
            PageNumber: params.PageNumber,
          },
        }
      );
      return response.data as GetOrderByCustomer[];
    } catch (error) {
      console.error("Error fetching orders by user:", error);
      throw error;
    }
  };